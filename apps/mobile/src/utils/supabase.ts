import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Custom storage implementation using Expo SecureStore
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types (these would be generated from your Supabase schema)
export interface Database {
  public: {
    Tables: {
      users_profile: {
        Row: {
          id: string;
          locale: string;
          consent_analytics: boolean;
          subscription_status: 'free' | 'pro' | 'lifetime';
          subscription_expires_at: string | null;
          islamic_content_enabled: boolean;
          prayer_reminders_enabled: boolean;
          location_lat: number | null;
          location_lng: number | null;
          timezone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          locale?: string;
          consent_analytics?: boolean;
          subscription_status?: 'free' | 'pro' | 'lifetime';
          subscription_expires_at?: string | null;
          islamic_content_enabled?: boolean;
          prayer_reminders_enabled?: boolean;
          location_lat?: number | null;
          location_lng?: number | null;
          timezone?: string | null;
        };
        Update: {
          locale?: string;
          consent_analytics?: boolean;
          subscription_status?: 'free' | 'pro' | 'lifetime';
          subscription_expires_at?: string | null;
          islamic_content_enabled?: boolean;
          prayer_reminders_enabled?: boolean;
          location_lat?: number | null;
          location_lng?: number | null;
          timezone?: string | null;
        };
      };
      journal_entries: {
        Row: {
          id: string;
          user_id: string;
          mood_valence: number | null;
          mood_arousal: number | null;
          tags: string[];
          body: string | null;
          cbt_thought: string | null;
          cbt_distortion: string | null;
          cbt_reframe: string | null;
          is_encrypted: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          mood_valence?: number | null;
          mood_arousal?: number | null;
          tags?: string[];
          body?: string | null;
          cbt_thought?: string | null;
          cbt_distortion?: string | null;
          cbt_reframe?: string | null;
          is_encrypted?: boolean;
        };
        Update: {
          mood_valence?: number | null;
          mood_arousal?: number | null;
          tags?: string[];
          body?: string | null;
          cbt_thought?: string | null;
          cbt_distortion?: string | null;
          cbt_reframe?: string | null;
        };
      };
      sessions_log: {
        Row: {
          id: string;
          user_id: string;
          kind: 'panic' | 'breath' | 'lesson' | 'sleep' | 'grounding' | 'cbt';
          duration_sec: number | null;
          completed: boolean;
          metadata: Record<string, any>;
          started_at: string;
          completed_at: string | null;
        };
        Insert: {
          user_id: string;
          kind: 'panic' | 'breath' | 'lesson' | 'sleep' | 'grounding' | 'cbt';
          duration_sec?: number | null;
          completed?: boolean;
          metadata?: Record<string, any>;
        };
        Update: {
          duration_sec?: number | null;
          completed?: boolean;
          metadata?: Record<string, any>;
          completed_at?: string | null;
        };
      };
    };
  };
}
