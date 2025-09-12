-- API Integration Tables
-- These tables support caching and tracking for external API integrations

-- Prayer times cache table
CREATE TABLE prayer_times_cache (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    date DATE NOT NULL,
    method INTEGER NOT NULL DEFAULT 2,
    school INTEGER NOT NULL DEFAULT 0,
    timings JSONB NOT NULL,
    meta JSONB,
    cached_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for efficient prayer times lookups
CREATE INDEX idx_prayer_times_cache_user_date ON prayer_times_cache(user_id, date);
CREATE INDEX idx_prayer_times_cache_location ON prayer_times_cache(latitude, longitude, date);
CREATE INDEX idx_prayer_times_cache_cached_at ON prayer_times_cache(cached_at);

-- Quran content cache table
CREATE TABLE quran_cache (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cache_key TEXT UNIQUE NOT NULL,
    content JSONB NOT NULL,
    cached_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for efficient Quran cache lookups
CREATE INDEX idx_quran_cache_key ON quran_cache(cache_key);
CREATE INDEX idx_quran_cache_cached_at ON quran_cache(cached_at);

-- Quran usage tracking table
CREATE TABLE quran_usage (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    chapter INTEGER NOT NULL,
    verse INTEGER NOT NULL,
    type TEXT NOT NULL DEFAULT 'verse', -- 'verse', 'verse-of-day', 'anxiety-relief', 'random'
    translations INTEGER[] DEFAULT ARRAY[131],
    accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for Quran usage analytics
CREATE INDEX idx_quran_usage_user ON quran_usage(user_id);
CREATE INDEX idx_quran_usage_chapter_verse ON quran_usage(chapter, verse);
CREATE INDEX idx_quran_usage_type ON quran_usage(type);
CREATE INDEX idx_quran_usage_accessed_at ON quran_usage(accessed_at);

-- Subscription events table (for Stripe webhook tracking)
CREATE TABLE subscription_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    stripe_subscription_id TEXT,
    status TEXT NOT NULL,
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    event_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for subscription events
CREATE INDEX idx_subscription_events_user ON subscription_events(user_id);
CREATE INDEX idx_subscription_events_stripe_sub ON subscription_events(stripe_subscription_id);
CREATE INDEX idx_subscription_events_type ON subscription_events(event_type);
CREATE INDEX idx_subscription_events_created_at ON subscription_events(created_at);

-- Payment events table (for payment tracking)
CREATE TABLE payment_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    stripe_invoice_id TEXT NOT NULL,
    stripe_subscription_id TEXT,
    amount INTEGER NOT NULL, -- Amount in cents
    currency TEXT NOT NULL DEFAULT 'usd',
    status TEXT NOT NULL, -- 'succeeded', 'failed', 'pending'
    event_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for payment events
CREATE INDEX idx_payment_events_user ON payment_events(user_id);
CREATE INDEX idx_payment_events_invoice ON payment_events(stripe_invoice_id);
CREATE INDEX idx_payment_events_subscription ON payment_events(stripe_subscription_id);
CREATE INDEX idx_payment_events_status ON payment_events(status);
CREATE INDEX idx_payment_events_created_at ON payment_events(created_at);

-- API usage tracking table (for rate limiting and analytics)
CREATE TABLE api_usage (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    api_name TEXT NOT NULL, -- 'aladhan', 'quran', 'stripe'
    endpoint TEXT NOT NULL,
    method TEXT NOT NULL DEFAULT 'GET',
    status_code INTEGER,
    response_time_ms INTEGER,
    cached BOOLEAN DEFAULT FALSE,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for API usage tracking
CREATE INDEX idx_api_usage_user ON api_usage(user_id);
CREATE INDEX idx_api_usage_api_name ON api_usage(api_name);
CREATE INDEX idx_api_usage_created_at ON api_usage(created_at);
CREATE INDEX idx_api_usage_status_code ON api_usage(status_code);

-- Add Stripe-related columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT UNIQUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT UNIQUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_current_period_start TIMESTAMP WITH TIME ZONE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_current_period_end TIMESTAMP WITH TIME ZONE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_cancel_at_period_end BOOLEAN DEFAULT FALSE;

-- Create indexes for Stripe-related columns
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer ON profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_subscription ON profiles(stripe_subscription_id);

-- Function to clean up old cache entries
CREATE OR REPLACE FUNCTION cleanup_old_cache()
RETURNS void AS $$
BEGIN
    -- Clean up prayer times cache older than 7 days
    DELETE FROM prayer_times_cache 
    WHERE cached_at < NOW() - INTERVAL '7 days';
    
    -- Clean up Quran cache older than 30 days
    DELETE FROM quran_cache 
    WHERE cached_at < NOW() - INTERVAL '30 days';
    
    -- Clean up API usage logs older than 90 days
    DELETE FROM api_usage 
    WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to run cleanup daily (requires pg_cron extension)
-- This would typically be set up separately in production
-- SELECT cron.schedule('cleanup-cache', '0 2 * * *', 'SELECT cleanup_old_cache();');

-- RLS Policies for new tables

-- Prayer times cache policies
ALTER TABLE prayer_times_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own prayer times cache" ON prayer_times_cache
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own prayer times cache" ON prayer_times_cache
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prayer times cache" ON prayer_times_cache
    FOR UPDATE USING (auth.uid() = user_id);

-- Quran cache policies (shared cache, read-only for users)
ALTER TABLE quran_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read Quran cache" ON quran_cache
    FOR SELECT USING (true);

-- Only service role can modify Quran cache
CREATE POLICY "Service role can manage Quran cache" ON quran_cache
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Quran usage policies
ALTER TABLE quran_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own Quran usage" ON quran_usage
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Quran usage" ON quran_usage
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Subscription events policies
ALTER TABLE subscription_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription events" ON subscription_events
    FOR SELECT USING (auth.uid() = user_id);

-- Only service role can manage subscription events
CREATE POLICY "Service role can manage subscription events" ON subscription_events
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Payment events policies
ALTER TABLE payment_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payment events" ON payment_events
    FOR SELECT USING (auth.uid() = user_id);

-- Only service role can manage payment events
CREATE POLICY "Service role can manage payment events" ON payment_events
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- API usage policies
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own API usage" ON api_usage
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage API usage" ON api_usage
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
