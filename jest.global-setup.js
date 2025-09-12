// Global Jest setup
module.exports = async () => {
  // Set timezone for consistent date/time testing
  process.env.TZ = 'UTC';
  
  // Set test environment
  process.env.NODE_ENV = 'test';
  
  // Mock environment variables for testing
  process.env.SUPABASE_URL = 'https://test.supabase.co';
  process.env.SUPABASE_ANON_KEY = 'test-anon-key';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';
  process.env.STRIPE_SECRET_KEY = 'sk_test_123';
  process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_123';
  
  // Setup global test database if needed
  // This could include setting up a test Supabase instance
  
  console.log('🧪 Global test setup complete');
};
