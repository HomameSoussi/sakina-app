/** @type {import('jest').Config} */
module.exports = {
  // Use multiple projects for different parts of the monorepo
  projects: [
    // Packages tests
    {
      displayName: 'packages',
      testMatch: ['<rootDir>/packages/**/src/**/*.test.{js,ts,tsx}'],
      testEnvironment: 'node',
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: '<rootDir>/packages/tsconfig.json',
        }],
      },
      moduleNameMapping: {
        '^@sakina/(.*)$': '<rootDir>/packages/$1/src',
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.packages.js'],
    },
    
    // Mobile app tests
    {
      displayName: 'mobile',
      testMatch: ['<rootDir>/apps/mobile/**/*.test.{js,ts,tsx}'],
      preset: 'jest-expo',
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: '<rootDir>/apps/mobile/tsconfig.json',
        }],
      },
      moduleNameMapping: {
        '^@sakina/(.*)$': '<rootDir>/packages/$1/src',
        '^@/(.*)$': '<rootDir>/apps/mobile/src/$1',
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.mobile.js'],
      transformIgnorePatterns: [
        'node_modules/(?!(react-native|@react-native|@expo|expo|@tamagui|@supabase)/)',
      ],
    },
    
    // Web app tests
    {
      displayName: 'web',
      testMatch: ['<rootDir>/apps/web/**/*.test.{js,ts,tsx}'],
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: '<rootDir>/apps/web/tsconfig.json',
        }],
      },
      moduleNameMapping: {
        '^@sakina/(.*)$': '<rootDir>/packages/$1/src',
        '^@/(.*)$': '<rootDir>/apps/web/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.web.js'],
    },
  ],
  
  // Global configuration
  collectCoverageFrom: [
    'packages/**/src/**/*.{ts,tsx}',
    'apps/**/src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/build/**',
    '!**/*.config.{js,ts}',
    '!**/coverage/**',
  ],
  
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
    // Higher standards for core packages
    './packages/ui/': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './packages/integrations/': {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  
  // Global setup and teardown
  globalSetup: '<rootDir>/jest.global-setup.js',
  globalTeardown: '<rootDir>/jest.global-teardown.js',
  
  // Test timeout
  testTimeout: 10000,
  
  // Verbose output
  verbose: true,
  
  // Watch plugins
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
