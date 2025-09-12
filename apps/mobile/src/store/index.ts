import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { User } from '@supabase/supabase-js';

// Secure storage for Zustand
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

// Auth Store
interface AuthState {
  user: User | null;
  session: any | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: any | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),
      signOut: () => set({ user: null, session: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({ user: state.user, session: state.session }),
    }
  )
);

// User Profile Store
interface UserProfile {
  id: string;
  locale: string;
  consent_analytics: boolean;
  subscription_status: 'free' | 'pro' | 'lifetime';
  islamic_content_enabled: boolean;
  prayer_reminders_enabled: boolean;
  location_lat?: number;
  location_lng?: number;
  timezone?: string;
}

interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  setProfile: (profile: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setLoading: (loading: boolean) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,
      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) => {
        const currentProfile = get().profile;
        if (currentProfile) {
          set({ profile: { ...currentProfile, ...updates } });
        }
      },
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);

// App Settings Store
interface AppSettings {
  locale: string;
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  prayerRemindersEnabled: boolean;
  islamicContentEnabled: boolean;
  onboardingCompleted: boolean;
}

interface SettingsState extends AppSettings {
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: AppSettings = {
  locale: 'en',
  theme: 'system',
  notificationsEnabled: true,
  prayerRemindersEnabled: false,
  islamicContentEnabled: true,
  onboardingCompleted: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      ...defaultSettings,
      updateSettings: (settings) => set({ ...get(), ...settings }),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);

// Panic Session Store (for active panic relief sessions)
interface PanicSession {
  isActive: boolean;
  currentStep: 'grounding' | 'breathing' | 'dhikr' | 'contact' | null;
  startTime: Date | null;
  stepProgress: number;
  totalSteps: number;
}

interface PanicState extends PanicSession {
  startSession: () => void;
  nextStep: () => void;
  endSession: () => void;
  setProgress: (progress: number) => void;
}

export const usePanicStore = create<PanicState>((set, get) => ({
  isActive: false,
  currentStep: null,
  startTime: null,
  stepProgress: 0,
  totalSteps: 4,
  startSession: () =>
    set({
      isActive: true,
      currentStep: 'grounding',
      startTime: new Date(),
      stepProgress: 0,
    }),
  nextStep: () => {
    const { currentStep, stepProgress, totalSteps } = get();
    const steps: Array<PanicSession['currentStep']> = [
      'grounding',
      'breathing',
      'dhikr',
      'contact',
    ];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex < steps.length - 1) {
      set({
        currentStep: steps[currentIndex + 1],
        stepProgress: stepProgress + 1,
      });
    } else {
      // Session complete
      set({
        isActive: false,
        currentStep: null,
        stepProgress: totalSteps,
      });
    }
  },
  endSession: () =>
    set({
      isActive: false,
      currentStep: null,
      startTime: null,
      stepProgress: 0,
    }),
  setProgress: (stepProgress) => set({ stepProgress }),
}));

// Journal Store (for mood tracking and CBT)
interface JournalEntry {
  id: string;
  mood_valence?: number;
  mood_arousal?: number;
  tags: string[];
  body?: string;
  cbt_thought?: string;
  cbt_distortion?: string;
  cbt_reframe?: string;
  created_at: string;
}

interface JournalState {
  entries: JournalEntry[];
  isLoading: boolean;
  addEntry: (entry: Omit<JournalEntry, 'id' | 'created_at'>) => void;
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void;
  setEntries: (entries: JournalEntry[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useJournalStore = create<JournalState>((set, get) => ({
  entries: [],
  isLoading: false,
  addEntry: (entry) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(), // Temporary ID until synced
      created_at: new Date().toISOString(),
    };
    set({ entries: [newEntry, ...get().entries] });
  },
  updateEntry: (id, updates) => {
    const entries = get().entries.map((entry) =>
      entry.id === id ? { ...entry, ...updates } : entry
    );
    set({ entries });
  },
  setEntries: (entries) => set({ entries }),
  setLoading: (isLoading) => set({ isLoading }),
}));
