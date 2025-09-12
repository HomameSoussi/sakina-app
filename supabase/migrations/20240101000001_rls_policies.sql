-- Enable Row Level Security on all tables
ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE ice_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE quranic_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_times_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_resources ENABLE ROW LEVEL SECURITY;

-- Users Profile Policies
CREATE POLICY "Users can view own profile" ON users_profile
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users_profile
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users_profile
    FOR INSERT WITH CHECK (auth.uid() = id);

-- ICE Contacts Policies
CREATE POLICY "Users can manage own ICE contacts" ON ice_contacts
    FOR ALL USING (auth.uid() = user_id);

-- Sessions Log Policies
CREATE POLICY "Users can manage own sessions" ON sessions_log
    FOR ALL USING (auth.uid() = user_id);

-- Journal Entries Policies
CREATE POLICY "Users can manage own journal entries" ON journal_entries
    FOR ALL USING (auth.uid() = user_id);

-- Content Lessons Policies (public read for published content)
CREATE POLICY "Anyone can view published lessons" ON content_lessons
    FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());

CREATE POLICY "Service role can manage lessons" ON content_lessons
    FOR ALL USING (auth.role() = 'service_role');

-- Audio Tracks Policies (public read for published content)
CREATE POLICY "Anyone can view published audio" ON audio_tracks
    FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());

CREATE POLICY "Service role can manage audio" ON audio_tracks
    FOR ALL USING (auth.role() = 'service_role');

-- Quranic Content Policies (public read)
CREATE POLICY "Anyone can view quranic content" ON quranic_content
    FOR SELECT USING (true);

CREATE POLICY "Service role can manage quranic content" ON quranic_content
    FOR ALL USING (auth.role() = 'service_role');

-- Prayer Times Cache Policies
CREATE POLICY "Users can manage own prayer times" ON prayer_times_cache
    FOR ALL USING (auth.uid() = user_id);

-- User Progress Policies
CREATE POLICY "Users can manage own progress" ON user_progress
    FOR ALL USING (auth.uid() = user_id);

-- Crisis Resources Policies (public read)
CREATE POLICY "Anyone can view crisis resources" ON crisis_resources
    FOR SELECT USING (true);

CREATE POLICY "Service role can manage crisis resources" ON crisis_resources
    FOR ALL USING (auth.role() = 'service_role');

-- Create helper functions for user management
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users_profile (id, locale, consent_analytics)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'locale', 'en'),
        COALESCE((NEW.raw_user_meta_data->>'consent_analytics')::boolean, false)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get user's current subscription status
CREATE OR REPLACE FUNCTION public.get_user_subscription_status(user_uuid UUID)
RETURNS subscription_status AS $$
DECLARE
    user_status subscription_status;
    expires_at TIMESTAMPTZ;
BEGIN
    SELECT subscription_status, subscription_expires_at
    INTO user_status, expires_at
    FROM users_profile
    WHERE id = user_uuid;
    
    -- Check if subscription has expired
    IF user_status = 'pro' AND expires_at IS NOT NULL AND expires_at < NOW() THEN
        -- Update to free if expired
        UPDATE users_profile 
        SET subscription_status = 'free' 
        WHERE id = user_uuid;
        RETURN 'free';
    END IF;
    
    RETURN COALESCE(user_status, 'free');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has access to premium content
CREATE OR REPLACE FUNCTION public.user_has_premium_access(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    status subscription_status;
BEGIN
    status := public.get_user_subscription_status(user_uuid);
    RETURN status IN ('pro', 'lifetime');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's mood trends
CREATE OR REPLACE FUNCTION public.get_mood_trends(
    user_uuid UUID,
    days_back INTEGER DEFAULT 30
)
RETURNS TABLE(
    date DATE,
    avg_valence DECIMAL,
    avg_arousal DECIMAL,
    entry_count INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        DATE(created_at) as date,
        ROUND(AVG(mood_valence), 2) as avg_valence,
        ROUND(AVG(mood_arousal), 2) as avg_arousal,
        COUNT(*)::INTEGER as entry_count
    FROM journal_entries
    WHERE user_id = user_uuid 
        AND created_at >= NOW() - INTERVAL '1 day' * days_back
        AND mood_valence IS NOT NULL 
        AND mood_arousal IS NOT NULL
    GROUP BY DATE(created_at)
    ORDER BY date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's session statistics
CREATE OR REPLACE FUNCTION public.get_session_stats(
    user_uuid UUID,
    days_back INTEGER DEFAULT 30
)
RETURNS TABLE(
    kind session_kind,
    total_sessions INTEGER,
    total_duration_min INTEGER,
    avg_duration_min DECIMAL,
    completion_rate DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.kind,
        COUNT(*)::INTEGER as total_sessions,
        ROUND(SUM(COALESCE(s.duration_sec, 0)) / 60.0)::INTEGER as total_duration_min,
        ROUND(AVG(COALESCE(s.duration_sec, 0)) / 60.0, 2) as avg_duration_min,
        ROUND(AVG(CASE WHEN s.completed THEN 1.0 ELSE 0.0 END) * 100, 2) as completion_rate
    FROM sessions_log s
    WHERE s.user_id = user_uuid 
        AND s.started_at >= NOW() - INTERVAL '1 day' * days_back
    GROUP BY s.kind
    ORDER BY total_sessions DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
