// Jest setup for React Native mobile app
import 'jest-extended';
import 'react-native-gesture-handler/jestSetup';

// Mock React Native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock Expo modules
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      name: 'Sakina',
      slug: 'sakina-app',
    },
  },
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Link: ({ children, href, ...props }) => children,
  Stack: {
    Screen: ({ children, ...props }) => children,
  },
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
  isLoaded: jest.fn(() => true),
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

// Mock Tamagui
jest.mock('@tamagui/core', () => ({
  TamaguiProvider: ({ children }) => children,
  Theme: ({ children }) => children,
  createTamagui: jest.fn(),
  createTokens: jest.fn(),
  createTheme: jest.fn(),
}));

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn(() => Promise.resolve({ data: { session: null } })),
      getUser: jest.fn(() => Promise.resolve({ data: { user: null } })),
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(() => Promise.resolve({ data: null, error: null })),
    })),
  })),
}));

// Mock Zustand
jest.mock('zustand', () => ({
  create: (fn) => {
    const store = fn(() => ({}), () => ({}));
    return () => store;
  },
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock Haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

// Mock Audio
jest.mock('expo-av', () => ({
  Audio: {
    Sound: {
      createAsync: jest.fn(() => Promise.resolve({
        sound: {
          playAsync: jest.fn(),
          pauseAsync: jest.fn(),
          stopAsync: jest.fn(),
          unloadAsync: jest.fn(),
          setPositionAsync: jest.fn(),
          getStatusAsync: jest.fn(() => Promise.resolve({ isLoaded: true })),
        },
      })),
    },
    setAudioModeAsync: jest.fn(),
  },
}));

// Mock Notifications
jest.mock('expo-notifications', () => ({
  requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  scheduleNotificationAsync: jest.fn(),
  cancelScheduledNotificationAsync: jest.fn(),
  setNotificationHandler: jest.fn(),
}));

// Global test environment setup
beforeEach(() => {
  jest.clearAllMocks();
});

// Global test utilities for mobile
global.mobileTestUtils = {
  // Mock navigation
  mockNavigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
    setParams: jest.fn(),
  },
  
  // Mock user session
  mockUserSession: {
    user: {
      id: 'test-user-id',
      email: 'test@example.com',
      created_at: new Date().toISOString(),
    },
    access_token: 'mock-access-token',
  },
  
  // Helper to render with providers
  renderWithProviders: (component) => {
    // This would typically wrap with TamaguiProvider, etc.
    return component;
  },
};
