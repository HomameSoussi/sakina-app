/**
 * Sakina Integrations Package
 * External API integrations for prayer times, Quranic content, and payments
 */

// Aladhan API for prayer times and Islamic calendar
export * from './aladhan';
export type {
  PrayerTimes,
  PrayerTimesResponse,
  LocationCoordinates,
  PrayerTimesOptions,
} from './aladhan';

// Quran API for verses, translations, and recitations
export * from './quran';
export type {
  QuranVerse,
  QuranTranslation,
  QuranChapter,
  QuranReciter,
  VerseOfTheDay,
  QuranSearchResult,
} from './quran';

// Stripe for payments and subscriptions
export * from './stripe';
export type {
  SubscriptionPlan,
  PaymentIntent,
  Subscription,
  Customer,
} from './stripe';

// Common utilities and types
export interface APIError {
  code: string;
  message: string;
  details?: any;
}

export class IntegrationError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'IntegrationError';
  }
}

// Rate limiting and caching utilities
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  constructor(
    private maxRequests: number = 100,
    private windowMs: number = 60000 // 1 minute
  ) {}

  canMakeRequest(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    // Add current request
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return true;
  }

  getRemainingRequests(key: string): number {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    return Math.max(0, this.maxRequests - validRequests.length);
  }

  getResetTime(key: string): number {
    const requests = this.requests.get(key) || [];
    if (requests.length === 0) return 0;
    
    const oldestRequest = Math.min(...requests);
    return oldestRequest + this.windowMs;
  }
}

// Simple in-memory cache
export class MemoryCache<T> {
  private cache: Map<string, { data: T; expires: number }> = new Map();

  constructor(private defaultTTL: number = 300000) {} // 5 minutes default

  set(key: string, data: T, ttl?: number): void {
    const expires = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { data, expires });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    // Clean expired items first
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key);
      }
    }
    return this.cache.size;
  }
}

// Retry utility for failed API calls
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
  backoff: number = 2
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw new IntegrationError(
          'MAX_RETRIES_EXCEEDED',
          `Failed after ${maxRetries + 1} attempts: ${lastError.message}`,
          { originalError: lastError, attempts: attempt + 1 }
        );
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(backoff, attempt)));
    }
  }
  
  throw lastError!;
}

// Environment configuration
export interface IntegrationConfig {
  aladhan: {
    baseUrl?: string;
    defaultMethod?: number;
    defaultSchool?: number;
    rateLimitPerMinute?: number;
  };
  quran: {
    baseUrl?: string;
    cloudUrl?: string;
    defaultTranslationId?: number;
    rateLimitPerMinute?: number;
  };
  stripe: {
    secretKey: string;
    webhookSecret: string;
    publishableKey: string;
  };
  cache: {
    defaultTTL?: number;
    maxSize?: number;
  };
}

export const defaultConfig: Partial<IntegrationConfig> = {
  aladhan: {
    baseUrl: 'https://api.aladhan.com/v1',
    defaultMethod: 2, // Islamic Society of North America
    defaultSchool: 0, // Shafi
    rateLimitPerMinute: 100,
  },
  quran: {
    baseUrl: 'https://api.quran.com/api/v4',
    cloudUrl: 'https://api.alquran.cloud/v1',
    defaultTranslationId: 131, // Dr. Mustafa Khattab, The Clear Quran
    rateLimitPerMinute: 100,
  },
  cache: {
    defaultTTL: 300000, // 5 minutes
    maxSize: 1000,
  },
};

// Global instances (can be configured)
export const globalRateLimiter = new RateLimiter();
export const globalCache = new MemoryCache();

// Utility to validate environment variables
export function validateConfig(config: Partial<IntegrationConfig>): string[] {
  const errors: string[] = [];
  
  if (!config.stripe?.secretKey) {
    errors.push('Stripe secret key is required');
  }
  
  if (!config.stripe?.webhookSecret) {
    errors.push('Stripe webhook secret is required');
  }
  
  if (!config.stripe?.publishableKey) {
    errors.push('Stripe publishable key is required');
  }
  
  return errors;
}
