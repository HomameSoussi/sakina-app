import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PrayerTimesRequest {
  latitude: number
  longitude: number
  method?: number
  school?: number
  date?: string
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

    // Parse request body
    const { latitude, longitude, method = 2, school = 0, date }: PrayerTimesRequest = await req.json()

    if (!latitude || !longitude) {
      throw new Error('Latitude and longitude are required')
    }

    // Format date for Aladhan API
    const targetDate = date ? new Date(date) : new Date()
    const dateString = targetDate.toLocaleDateString('en-GB').split('/').reverse().join('-')

    // Call Aladhan API
    const aladhanUrl = new URL('https://api.aladhan.com/v1/timings')
    aladhanUrl.searchParams.set('latitude', latitude.toString())
    aladhanUrl.searchParams.set('longitude', longitude.toString())
    aladhanUrl.searchParams.set('date', dateString)
    aladhanUrl.searchParams.set('method', method.toString())
    aladhanUrl.searchParams.set('school', school.toString())

    const response = await fetch(aladhanUrl.toString())
    if (!response.ok) {
      throw new Error(`Aladhan API error: ${response.status}`)
    }

    const data = await response.json()

    // Cache the result in Supabase
    await supabaseClient
      .from('prayer_times_cache')
      .upsert({
        user_id: user.id,
        latitude,
        longitude,
        date: targetDate.toISOString().split('T')[0],
        method,
        school,
        timings: data.data.timings,
        meta: data.data.meta,
        cached_at: new Date().toISOString(),
      })

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          timings: data.data.timings,
          date: data.data.date,
          meta: data.data.meta,
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Prayer times error:', error)
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
