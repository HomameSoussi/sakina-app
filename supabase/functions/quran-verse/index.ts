import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface QuranVerseRequest {
  chapter: number
  verse: number
  translations?: number[]
  type?: 'verse' | 'verse-of-day' | 'anxiety-relief' | 'random'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Missing authorization header')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      throw new Error('Invalid token')
    }

    // Parse request
    const { chapter, verse, translations = [131], type = 'verse' }: QuranVerseRequest = await req.json()

    let verseData
    let cacheKey = `${type}-${chapter}-${verse}-${translations.join(',')}`

    // Check cache first
    const { data: cached } = await supabaseClient
      .from('quran_cache')
      .select('*')
      .eq('cache_key', cacheKey)
      .gte('cached_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // 24 hours
      .single()

    if (cached) {
      return new Response(
        JSON.stringify({
          success: true,
          data: cached.content,
          cached: true,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // Handle different request types
    if (type === 'verse-of-day') {
      // Get verse of the day based on current date
      const anxietyVerses = [
        { chapter: 13, verse: 28 }, // Peace through remembrance
        { chapter: 2, verse: 286 }, // Allah does not burden beyond capacity
        { chapter: 65, verse: 3 }, // Trust in Allah
        { chapter: 94, verse: 5 }, // With hardship comes ease
        { chapter: 8, verse: 2 }, // Hearts find rest in remembrance
        { chapter: 39, verse: 53 }, // Never despair of Allah's mercy
        { chapter: 2, verse: 153 }, // Seek help through patience and prayer
        { chapter: 3, verse: 139 }, // Do not lose hope
      ]

      const today = new Date()
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
      const selectedVerse = anxietyVerses[dayOfYear % anxietyVerses.length]
      
      chapter = selectedVerse.chapter
      verse = selectedVerse.verse
      cacheKey = `verse-of-day-${today.toISOString().split('T')[0]}`
    } else if (type === 'anxiety-relief') {
      // Return a curated verse for anxiety relief
      const anxietyVerses = [
        { chapter: 13, verse: 28 },
        { chapter: 2, verse: 286 },
        { chapter: 65, verse: 3 },
        { chapter: 94, verse: 5 },
      ]
      const randomVerse = anxietyVerses[Math.floor(Math.random() * anxietyVerses.length)]
      chapter = randomVerse.chapter
      verse = randomVerse.verse
    }

    if (!chapter || !verse) {
      throw new Error('Chapter and verse are required')
    }

    // Fetch from Quran.com API
    const verseKey = `${chapter}:${verse}`
    
    // Get Arabic verse
    const verseResponse = await fetch(`https://api.quran.com/api/v4/verses/by_key/${verseKey}?words=false&audio=true`)
    if (!verseResponse.ok) {
      throw new Error(`Quran API error: ${verseResponse.status}`)
    }
    const verseResult = await verseResponse.json()

    // Get translations
    const translationsResponse = await fetch(
      `https://api.quran.com/api/v4/verses/by_key/${verseKey}?translations=${translations.join(',')}`
    )
    if (!translationsResponse.ok) {
      throw new Error(`Quran API error: ${translationsResponse.status}`)
    }
    const translationsResult = await translationsResponse.json()

    // Get chapter info
    const chapterResponse = await fetch(`https://api.quran.com/api/v4/chapters/${chapter}`)
    if (!chapterResponse.ok) {
      throw new Error(`Quran API error: ${chapterResponse.status}`)
    }
    const chapterResult = await chapterResponse.json()

    verseData = {
      verse: verseResult.verse,
      translations: translationsResult.verse.translations,
      chapter: chapterResult.chapter,
      verse_key: verseKey,
      type,
    }

    // Cache the result
    await supabaseClient
      .from('quran_cache')
      .upsert({
        cache_key: cacheKey,
        content: verseData,
        cached_at: new Date().toISOString(),
      })

    // Track usage for analytics
    await supabaseClient
      .from('quran_usage')
      .insert({
        user_id: user.id,
        chapter,
        verse,
        type,
        translations,
        accessed_at: new Date().toISOString(),
      })

    return new Response(
      JSON.stringify({
        success: true,
        data: verseData,
        cached: false,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Quran verse error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
