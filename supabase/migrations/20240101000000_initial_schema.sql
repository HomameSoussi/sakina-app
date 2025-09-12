-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE session_kind AS ENUM ('panic', 'breath', 'lesson', 'sleep', 'grounding', 'cbt');
CREATE TYPE audio_kind AS ENUM ('quran', 'ruqyah', 'story', 'nature', 'dhikr');
CREATE TYPE subscription_status AS ENUM ('free', 'pro', 'lifetime');

-- Users profile table (extends Supabase auth.users)
CREATE TABLE users_profile (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    locale VARCHAR(10) DEFAULT 'en' NOT NULL,
    consent_analytics BOOLEAN DEFAULT false NOT NULL,
    subscription_status subscription_status DEFAULT 'free' NOT NULL,
    subscription_expires_at TIMESTAMPTZ,
    islamic_content_enabled BOOLEAN DEFAULT true NOT NULL,
    prayer_reminders_enabled BOOLEAN DEFAULT false NOT NULL,
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    timezone VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ICE (In Case of Emergency) contacts
CREATE TABLE ice_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone_e164 VARCHAR(20) NOT NULL,
    relationship VARCHAR(100),
    is_primary BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Session logs for analytics and insights
CREATE TABLE sessions_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
    kind session_kind NOT NULL,
    duration_sec INTEGER,
    completed BOOLEAN DEFAULT false NOT NULL,
    metadata JSONB DEFAULT '{}' NOT NULL,
    started_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    completed_at TIMESTAMPTZ
);

-- Journal entries for mood tracking and CBT
CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
    mood_valence INTEGER CHECK (mood_valence >= 1 AND mood_valence <= 5),
    mood_arousal INTEGER CHECK (mood_arousal >= 1 AND mood_arousal <= 5),
    tags TEXT[] DEFAULT '{}' NOT NULL,
    body TEXT,
    cbt_thought TEXT,
    cbt_distortion TEXT,
    cbt_reframe TEXT,
    is_encrypted BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Content lessons (psycho-education)
CREATE TABLE content_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    body_md TEXT NOT NULL,
    lang VARCHAR(10) DEFAULT 'en' NOT NULL,
    category VARCHAR(100),
    difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level >= 1 AND difficulty_level <= 3),
    estimated_read_time_min INTEGER,
    is_premium BOOLEAN DEFAULT false NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Audio tracks for calm library
CREATE TABLE audio_tracks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    kind audio_kind NOT NULL,
    url TEXT NOT NULL,
    duration_sec INTEGER NOT NULL,
    file_size_bytes BIGINT,
    lang VARCHAR(10) DEFAULT 'en' NOT NULL,
    reciter VARCHAR(255),
    surah_number INTEGER,
    ayah_start INTEGER,
    ayah_end INTEGER,
    is_premium BOOLEAN DEFAULT false NOT NULL,
    download_count INTEGER DEFAULT 0 NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Quranic verses and duas for panic relief
CREATE TABLE quranic_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL, -- 'ayah', 'dua', 'dhikr'
    arabic_text TEXT NOT NULL,
    transliteration TEXT,
    translation_en TEXT,
    translation_ar TEXT,
    translation_fr TEXT,
    surah_number INTEGER,
    ayah_number INTEGER,
    category VARCHAR(100), -- 'anxiety', 'peace', 'protection', etc.
    audio_url TEXT,
    is_featured BOOLEAN DEFAULT false NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Prayer times cache (to reduce API calls)
CREATE TABLE prayer_times_cache (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    fajr TIME NOT NULL,
    dhuhr TIME NOT NULL,
    asr TIME NOT NULL,
    maghrib TIME NOT NULL,
    isha TIME NOT NULL,
    qibla_direction DECIMAL(5, 2),
    location_lat DECIMAL(10, 8) NOT NULL,
    location_lng DECIMAL(11, 8) NOT NULL,
    timezone VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, date)
);

-- User progress tracking
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES content_lessons(id) ON DELETE CASCADE,
    audio_id UUID REFERENCES audio_tracks(id) ON DELETE CASCADE,
    progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    completed_at TIMESTAMPTZ,
    last_accessed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, lesson_id),
    UNIQUE(user_id, audio_id)
);

-- Crisis resources by country/region
CREATE TABLE crisis_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_code VARCHAR(2) NOT NULL,
    region VARCHAR(100),
    organization_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    sms_number VARCHAR(50),
    chat_url TEXT,
    website_url TEXT,
    description TEXT,
    languages TEXT[] DEFAULT '{}' NOT NULL,
    is_24_7 BOOLEAN DEFAULT true NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_users_profile_locale ON users_profile(locale);
CREATE INDEX idx_ice_contacts_user_id ON ice_contacts(user_id);
CREATE INDEX idx_sessions_log_user_id ON sessions_log(user_id);
CREATE INDEX idx_sessions_log_kind ON sessions_log(kind);
CREATE INDEX idx_sessions_log_started_at ON sessions_log(started_at);
CREATE INDEX idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX idx_journal_entries_created_at ON journal_entries(created_at);
CREATE INDEX idx_content_lessons_lang ON content_lessons(lang);
CREATE INDEX idx_content_lessons_published_at ON content_lessons(published_at);
CREATE INDEX idx_audio_tracks_kind ON audio_tracks(kind);
CREATE INDEX idx_audio_tracks_lang ON audio_tracks(lang);
CREATE INDEX idx_quranic_content_type ON quranic_content(type);
CREATE INDEX idx_quranic_content_category ON quranic_content(category);
CREATE INDEX idx_prayer_times_cache_user_date ON prayer_times_cache(user_id, date);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_crisis_resources_country ON crisis_resources(country_code);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_profile_updated_at BEFORE UPDATE ON users_profile FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ice_contacts_updated_at BEFORE UPDATE ON ice_contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON journal_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_lessons_updated_at BEFORE UPDATE ON content_lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_audio_tracks_updated_at BEFORE UPDATE ON audio_tracks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
