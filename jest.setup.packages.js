// Jest setup for packages
import 'jest-extended';

// Mock environment variables
process.env.NODE_ENV = 'test';

// Mock fetch for API tests
global.fetch = jest.fn();

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to ignore specific log levels
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Setup for integration tests
beforeEach(() => {
  // Reset all mocks before each test
  jest.clearAllMocks();
  
  // Reset fetch mock
  if (global.fetch) {
    global.fetch.mockClear();
  }
});

// Global test utilities
global.testUtils = {
  // Helper to create mock API responses
  mockApiResponse: (data, status = 200) => ({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  }),
  
  // Helper to create mock prayer times
  mockPrayerTimes: () => ({
    fajr: '05:30',
    sunrise: '07:00',
    dhuhr: '12:30',
    asr: '15:45',
    maghrib: '18:15',
    isha: '19:45',
  }),
  
  // Helper to create mock Quran verse
  mockQuranVerse: () => ({
    id: 1,
    verse_number: 1,
    verse_key: '1:1',
    text_uthmani: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    text_uthmani_simple: 'بسم الله الرحمن الرحيم',
    juz_number: 1,
    page_number: 1,
  }),
  
  // Helper to wait for async operations
  waitFor: (ms = 0) => new Promise(resolve => setTimeout(resolve, ms)),
};
