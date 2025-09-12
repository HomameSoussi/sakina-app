/**
 * Aladhan API Integration
 * Provides prayer times and Islamic calendar data
 * API Documentation: https://aladhan.com/prayer-times-api
 */

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  imsak: string;
  midnight: string;
}

export interface PrayerTimesResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimes;
    date: {
      readable: string;
      timestamp: string;
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
          ar: string;
        };
        month: {
          number: number;
          en: string;
          ar: string;
        };
        year: string;
        designation: {
          abbreviated: string;
          expanded: string;
        };
        holidays: string[];
      };
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
        };
        month: {
          number: number;
          en: string;
        };
        year: string;
        designation: {
          abbreviated: string;
          expanded: string;
        };
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
        params: Record<string, any>;
        location: {
          latitude: number;
          longitude: number;
        };
      };
      latitudeAdjustmentMethod: string;
      midnightMode: string;
      school: string;
      offset: Record<string, number>;
    };
  };
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface PrayerTimesOptions {
  method?: number; // Calculation method (1-15)
  school?: number; // Juristic school (0=Shafi, 1=Hanafi)
  midnightMode?: number; // Midnight mode (0=Standard, 1=Jafari)
  latitudeAdjustmentMethod?: number; // High latitude adjustment
  adjustment?: number; // Adjustment for all prayer times in minutes
  iso8601?: boolean; // Return times in ISO8601 format
}

export class AladhanAPI {
  private baseUrl = 'https://api.aladhan.com/v1';

  /**
   * Get prayer times for a specific date and location
   */
  async getPrayerTimes(
    coordinates: LocationCoordinates,
    date?: Date,
    options: PrayerTimesOptions = {}
  ): Promise<PrayerTimesResponse> {
    const targetDate = date || new Date();
    const dateString = this.formatDate(targetDate);
    
    const params = new URLSearchParams({
      latitude: coordinates.latitude.toString(),
      longitude: coordinates.longitude.toString(),
      date: dateString,
      method: (options.method || 2).toString(), // Default: Islamic Society of North America
      school: (options.school || 0).toString(), // Default: Shafi
      midnightMode: (options.midnightMode || 0).toString(),
      latitudeAdjustmentMethod: (options.latitudeAdjustmentMethod || 1).toString(),
      adjustment: (options.adjustment || 0).toString(),
      iso8601: (options.iso8601 || false).toString(),
    });

    const response = await fetch(`${this.baseUrl}/timings?${params}`);
    
    if (!response.ok) {
      throw new Error(`Aladhan API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get prayer times for current month
   */
  async getMonthlyPrayerTimes(
    coordinates: LocationCoordinates,
    year?: number,
    month?: number,
    options: PrayerTimesOptions = {}
  ): Promise<{ code: number; status: string; data: PrayerTimesResponse['data'][] }> {
    const now = new Date();
    const targetYear = year || now.getFullYear();
    const targetMonth = month || (now.getMonth() + 1);

    const params = new URLSearchParams({
      latitude: coordinates.latitude.toString(),
      longitude: coordinates.longitude.toString(),
      month: targetMonth.toString(),
      year: targetYear.toString(),
      method: (options.method || 2).toString(),
      school: (options.school || 0).toString(),
      midnightMode: (options.midnightMode || 0).toString(),
      latitudeAdjustmentMethod: (options.latitudeAdjustmentMethod || 1).toString(),
      adjustment: (options.adjustment || 0).toString(),
      iso8601: (options.iso8601 || false).toString(),
    });

    const response = await fetch(`${this.baseUrl}/calendar?${params}`);
    
    if (!response.ok) {
      throw new Error(`Aladhan API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get prayer times by city name
   */
  async getPrayerTimesByCity(
    city: string,
    country: string,
    state?: string,
    date?: Date,
    options: PrayerTimesOptions = {}
  ): Promise<PrayerTimesResponse> {
    const targetDate = date || new Date();
    const dateString = this.formatDate(targetDate);
    
    const params = new URLSearchParams({
      city,
      country,
      date: dateString,
      method: (options.method || 2).toString(),
      school: (options.school || 0).toString(),
      midnightMode: (options.midnightMode || 0).toString(),
      latitudeAdjustmentMethod: (options.latitudeAdjustmentMethod || 1).toString(),
      adjustment: (options.adjustment || 0).toString(),
      iso8601: (options.iso8601 || false).toString(),
    });

    if (state) {
      params.append('state', state);
    }

    const response = await fetch(`${this.baseUrl}/timingsByCity?${params}`);
    
    if (!response.ok) {
      throw new Error(`Aladhan API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get next prayer time from current time
   */
  getNextPrayer(prayerTimes: PrayerTimes, currentTime?: Date): {
    name: string;
    time: string;
    timeUntil: number; // minutes
  } | null {
    const now = currentTime || new Date();
    const prayers = [
      { name: 'Fajr', time: prayerTimes.fajr },
      { name: 'Sunrise', time: prayerTimes.sunrise },
      { name: 'Dhuhr', time: prayerTimes.dhuhr },
      { name: 'Asr', time: prayerTimes.asr },
      { name: 'Maghrib', time: prayerTimes.maghrib },
      { name: 'Isha', time: prayerTimes.isha },
    ];

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;
      
      if (prayerMinutes > currentMinutes) {
        return {
          name: prayer.name,
          time: prayer.time,
          timeUntil: prayerMinutes - currentMinutes,
        };
      }
    }

    // If no prayer found today, return Fajr of next day
    const [fajrHours, fajrMinutes] = prayerTimes.fajr.split(':').map(Number);
    const fajrTotalMinutes = fajrHours * 60 + fajrMinutes;
    const minutesUntilMidnight = (24 * 60) - currentMinutes;
    
    return {
      name: 'Fajr',
      time: prayerTimes.fajr,
      timeUntil: minutesUntilMidnight + fajrTotalMinutes,
    };
  }

  /**
   * Get Islamic date (Hijri calendar)
   */
  async getIslamicDate(date?: Date): Promise<{
    hijri: string;
    gregorian: string;
    weekday: { en: string; ar: string };
    month: { en: string; ar: string };
  }> {
    const targetDate = date || new Date();
    const dateString = this.formatDate(targetDate);
    
    const response = await fetch(`${this.baseUrl}/gToH/${dateString}`);
    
    if (!response.ok) {
      throw new Error(`Aladhan API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      hijri: data.data.hijri.date,
      gregorian: data.data.gregorian.date,
      weekday: data.data.hijri.weekday,
      month: data.data.hijri.month,
    };
  }

  /**
   * Get Qibla direction for a location
   */
  async getQiblaDirection(coordinates: LocationCoordinates): Promise<{
    latitude: number;
    longitude: number;
    direction: number; // degrees from North
  }> {
    const params = new URLSearchParams({
      latitude: coordinates.latitude.toString(),
      longitude: coordinates.longitude.toString(),
    });

    const response = await fetch(`${this.baseUrl}/qibla/${params}`);
    
    if (!response.ok) {
      throw new Error(`Aladhan API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  }

  /**
   * Format date for API (DD-MM-YYYY)
   */
  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}

// Export singleton instance
export const aladhanAPI = new AladhanAPI();

// Helper functions for common use cases
export const getPrayerTimesForLocation = (coordinates: LocationCoordinates, options?: PrayerTimesOptions) =>
  aladhanAPI.getPrayerTimes(coordinates, undefined, options);

export const getNextPrayerTime = (prayerTimes: PrayerTimes, currentTime?: Date) =>
  aladhanAPI.getNextPrayer(prayerTimes, currentTime);

export const getTodaysIslamicDate = () =>
  aladhanAPI.getIslamicDate();

export const getQiblaDirection = (coordinates: LocationCoordinates) =>
  aladhanAPI.getQiblaDirection(coordinates);
