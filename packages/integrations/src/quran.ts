/**
 * Quran API Integration
 * Provides Quranic verses, translations, and recitations
 * Uses multiple APIs: Quran.com API and Al-Quran Cloud API
 */

export interface QuranVerse {
  id: number;
  verse_number: number;
  verse_key: string; // e.g., "1:1"
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number?: number;
  text_uthmani: string; // Arabic text in Uthmani script
  text_uthmani_simple: string; // Simplified Arabic text
  text_imlaei: string; // Arabic text in Imlaei script
  text_indopak: string; // Arabic text in Indo-Pak script
  juz_number: number;
  page_number: number;
  audio?: {
    url: string;
    reciter: string;
    format: string;
  };
}

export interface QuranTranslation {
  id: number;
  language_name: string;
  translated_name: {
    name: string;
    language_name: string;
  };
  text: string;
  resource_name: string;
  resource_id: number;
}

export interface QuranChapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface QuranReciter {
  id: number;
  name: string;
  arabic_name: string;
  relative_path: string;
  format: string;
  files_size: number;
}

export interface VerseOfTheDay {
  verse: QuranVerse;
  translation: QuranTranslation;
  chapter: QuranChapter;
  context?: string;
  theme?: string;
}

export interface QuranSearchResult {
  verses: Array<{
    verse: QuranVerse;
    translations: QuranTranslation[];
    highlighted_text: string;
  }>;
  total_count: number;
  current_page: number;
  total_pages: number;
}

export class QuranAPI {
  private baseUrl = 'https://api.quran.com/api/v4';
  private cloudUrl = 'https://api.alquran.cloud/v1';

  /**
   * Get a specific verse by chapter and verse number
   */
  async getVerse(
    chapterNumber: number,
    verseNumber: number,
    translationIds: number[] = [131] // Default: Dr. Mustafa Khattab, The Clear Quran
  ): Promise<{
    verse: QuranVerse;
    translations: QuranTranslation[];
  }> {
    const verseKey = `${chapterNumber}:${verseNumber}`;
    
    // Get Arabic verse
    const verseResponse = await fetch(`${this.baseUrl}/verses/by_key/${verseKey}?words=false&audio=true`);
    if (!verseResponse.ok) {
      throw new Error(`Quran API error: ${verseResponse.status}`);
    }
    const verseData = await verseResponse.json();

    // Get translations
    const translationsResponse = await fetch(
      `${this.baseUrl}/verses/by_key/${verseKey}?translations=${translationIds.join(',')}`
    );
    if (!translationsResponse.ok) {
      throw new Error(`Quran API error: ${translationsResponse.status}`);
    }
    const translationsData = await translationsResponse.json();

    return {
      verse: verseData.verse,
      translations: translationsData.verse.translations,
    };
  }

  /**
   * Get multiple verses from a chapter
   */
  async getVerses(
    chapterNumber: number,
    verseRange?: { from: number; to: number },
    translationIds: number[] = [131]
  ): Promise<{
    verses: QuranVerse[];
    translations: QuranTranslation[][];
  }> {
    let url = `${this.baseUrl}/verses/by_chapter/${chapterNumber}?words=false&audio=true&translations=${translationIds.join(',')}`;
    
    if (verseRange) {
      url += `&verse_start=${verseRange.from}&verse_end=${verseRange.to}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Quran API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      verses: data.verses.map((v: any) => v.verse || v),
      translations: data.verses.map((v: any) => v.translations || []),
    };
  }

  /**
   * Get chapter information
   */
  async getChapter(chapterNumber: number): Promise<QuranChapter> {
    const response = await fetch(`${this.baseUrl}/chapters/${chapterNumber}`);
    if (!response.ok) {
      throw new Error(`Quran API error: ${response.status}`);
    }

    const data = await response.json();
    return data.chapter;
  }

  /**
   * Get all chapters
   */
  async getChapters(): Promise<QuranChapter[]> {
    const response = await fetch(`${this.baseUrl}/chapters`);
    if (!response.ok) {
      throw new Error(`Quran API error: ${response.status}`);
    }

    const data = await response.json();
    return data.chapters;
  }

  /**
   * Search for verses containing specific text
   */
  async searchVerses(
    query: string,
    translationId: number = 131,
    page: number = 1,
    perPage: number = 20
  ): Promise<QuranSearchResult> {
    const params = new URLSearchParams({
      q: query,
      translation: translationId.toString(),
      page: page.toString(),
      size: perPage.toString(),
    });

    const response = await fetch(`${this.baseUrl}/search?${params}`);
    if (!response.ok) {
      throw new Error(`Quran API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      verses: data.search.results,
      total_count: data.search.total_count,
      current_page: data.search.current_page,
      total_pages: data.search.total_pages,
    };
  }

  /**
   * Get available reciters
   */
  async getReciters(): Promise<QuranReciter[]> {
    const response = await fetch(`${this.baseUrl}/resources/recitations`);
    if (!response.ok) {
      throw new Error(`Quran API error: ${response.status}`);
    }

    const data = await response.json();
    return data.recitations;
  }

  /**
   * Get audio URL for a specific verse and reciter
   */
  async getVerseAudio(
    chapterNumber: number,
    verseNumber: number,
    reciterId: number = 7 // Default: Mishary Rashid Alafasy
  ): Promise<string> {
    const verseKey = `${chapterNumber}:${verseNumber}`;
    const response = await fetch(`${this.baseUrl}/verses/by_key/${verseKey}?audio=${reciterId}`);
    
    if (!response.ok) {
      throw new Error(`Quran API error: ${response.status}`);
    }

    const data = await response.json();
    return data.verse.audio.url;
  }

  /**
   * Get curated verses for anxiety and calm
   */
  async getAnxietyReliefVerses(): Promise<VerseOfTheDay[]> {
    const anxietyVerses = [
      { chapter: 13, verse: 28, theme: 'Peace through remembrance' },
      { chapter: 2, verse: 286, theme: 'Allah does not burden beyond capacity' },
      { chapter: 65, verse: 3, theme: 'Trust in Allah' },
      { chapter: 94, verse: 5, theme: 'With hardship comes ease' },
      { chapter: 8, verse: 2, theme: 'Hearts find rest in remembrance' },
      { chapter: 39, verse: 53, theme: 'Never despair of Allah\'s mercy' },
      { chapter: 2, verse: 153, theme: 'Seek help through patience and prayer' },
      { chapter: 3, verse: 139, theme: 'Do not lose hope' },
    ];

    const verses = await Promise.all(
      anxietyVerses.map(async ({ chapter, verse, theme }) => {
        const verseData = await this.getVerse(chapter, verse);
        const chapterData = await this.getChapter(chapter);
        
        return {
          verse: verseData.verse,
          translation: verseData.translations[0],
          chapter: chapterData,
          theme,
          context: `This verse from Surah ${chapterData.name_simple} provides comfort and guidance for those experiencing anxiety.`,
        };
      })
    );

    return verses;
  }

  /**
   * Get verse of the day (rotates based on date)
   */
  async getVerseOfTheDay(date?: Date): Promise<VerseOfTheDay> {
    const anxietyVerses = await this.getAnxietyReliefVerses();
    const targetDate = date || new Date();
    const dayOfYear = Math.floor((targetDate.getTime() - new Date(targetDate.getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % anxietyVerses.length;
    
    return anxietyVerses[index];
  }

  /**
   * Get Ayat al-Kursi (Verse of the Throne) - commonly recited for protection
   */
  async getAyatAlKursi(): Promise<{
    verse: QuranVerse;
    translations: QuranTranslation[];
  }> {
    return this.getVerse(2, 255); // Quran 2:255
  }

  /**
   * Get the last two verses of Surah Al-Baqarah (for protection)
   */
  async getLastTwoVersesOfBaqarah(): Promise<{
    verses: QuranVerse[];
    translations: QuranTranslation[][];
  }> {
    return this.getVerses(2, { from: 285, to: 286 });
  }

  /**
   * Get Surah Al-Fatiha (The Opening)
   */
  async getSurahFatiha(): Promise<{
    verses: QuranVerse[];
    translations: QuranTranslation[][];
    chapter: QuranChapter;
  }> {
    const [versesData, chapterData] = await Promise.all([
      this.getVerses(1),
      this.getChapter(1),
    ]);

    return {
      verses: versesData.verses,
      translations: versesData.translations,
      chapter: chapterData,
    };
  }

  /**
   * Get short surahs commonly used for comfort (Al-Ikhlas, Al-Falaq, An-Nas)
   */
  async getProtectiveSurahs(): Promise<Array<{
    verses: QuranVerse[];
    translations: QuranTranslation[][];
    chapter: QuranChapter;
  }>> {
    const surahNumbers = [112, 113, 114]; // Al-Ikhlas, Al-Falaq, An-Nas
    
    return Promise.all(
      surahNumbers.map(async (surahNumber) => {
        const [versesData, chapterData] = await Promise.all([
          this.getVerses(surahNumber),
          this.getChapter(surahNumber),
        ]);

        return {
          verses: versesData.verses,
          translations: versesData.translations,
          chapter: chapterData,
        };
      })
    );
  }

  /**
   * Get random verse for reflection
   */
  async getRandomVerse(): Promise<VerseOfTheDay> {
    // Use a curated list of meaningful verses instead of truly random
    const meaningfulVerses = [
      { chapter: 2, verse: 152, theme: 'Remember Allah' },
      { chapter: 3, verse: 200, theme: 'Patience and perseverance' },
      { chapter: 7, verse: 56, theme: 'Hope and fear' },
      { chapter: 11, verse: 88, theme: 'Trust in Allah' },
      { chapter: 25, verse: 74, theme: 'Righteous prayer' },
      { chapter: 29, verse: 69, theme: 'Striving for Allah' },
      { chapter: 42, verse: 36, theme: 'Worldly life perspective' },
      { chapter: 67, verse: 2, theme: 'Test of life' },
    ];

    const randomIndex = Math.floor(Math.random() * meaningfulVerses.length);
    const selectedVerse = meaningfulVerses[randomIndex];
    
    const verseData = await this.getVerse(selectedVerse.chapter, selectedVerse.verse);
    const chapterData = await this.getChapter(selectedVerse.chapter);
    
    return {
      verse: verseData.verse,
      translation: verseData.translations[0],
      chapter: chapterData,
      theme: selectedVerse.theme,
      context: `A verse for reflection from Surah ${chapterData.name_simple}.`,
    };
  }
}

// Export singleton instance
export const quranAPI = new QuranAPI();

// Helper functions for common use cases
export const getVerseOfTheDay = (date?: Date) => quranAPI.getVerseOfTheDay(date);

export const getAyatAlKursi = () => quranAPI.getAyatAlKursi();

export const getAnxietyReliefVerses = () => quranAPI.getAnxietyReliefVerses();

export const searchQuranVerses = (query: string, translationId?: number) =>
  quranAPI.searchVerses(query, translationId);

export const getSurahFatiha = () => quranAPI.getSurahFatiha();

export const getProtectiveSurahs = () => quranAPI.getProtectiveSurahs();

export const getRandomVerse = () => quranAPI.getRandomVerse();
