-- SportUnion Database Schema
-- Run this in your Supabase SQL Editor

-- =============================================================================
-- PROFILES TABLE
-- =============================================================================
-- Create profiles table to store user profile data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- =============================================================================
-- TRIGGER: Auto-create profile on user signup
-- =============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- TRIGGER: Update updated_at timestamp
-- =============================================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================================
-- ANALYSES TABLE (for expert analyses)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  read_time TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- Analyses policies
CREATE POLICY "Published analyses are viewable by everyone"
  ON public.analyses
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Users can view their own analyses"
  ON public.analyses
  FOR SELECT
  USING (auth.uid() = author_id);

CREATE POLICY "Users can insert their own analyses"
  ON public.analyses
  FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own analyses"
  ON public.analyses
  FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete their own analyses"
  ON public.analyses
  FOR DELETE
  USING (auth.uid() = author_id);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_analyses_updated_at ON public.analyses;
CREATE TRIGGER update_analyses_updated_at
  BEFORE UPDATE ON public.analyses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================================
-- LEAGUES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.leagues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  country TEXT NOT NULL,
  sport TEXT NOT NULL DEFAULT 'football',
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.leagues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leagues are viewable by everyone"
  ON public.leagues FOR SELECT USING (true);

-- =============================================================================
-- TEAMS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  logo_emoji TEXT DEFAULT '⚽',
  logo_url TEXT,
  league_id UUID REFERENCES public.leagues(id),
  city TEXT,
  stadium TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teams are viewable by everyone"
  ON public.teams FOR SELECT USING (true);

-- =============================================================================
-- MATCHES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  home_team_id UUID REFERENCES public.teams(id) NOT NULL,
  away_team_id UUID REFERENCES public.teams(id) NOT NULL,
  league_id UUID REFERENCES public.leagues(id) NOT NULL,
  home_score INTEGER,
  away_score INTEGER,
  match_date TIMESTAMPTZ NOT NULL,
  venue TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'finished', 'postponed')),
  minute INTEGER,
  round TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Matches are viewable by everyone"
  ON public.matches FOR SELECT USING (true);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_matches_updated_at ON public.matches;
CREATE TRIGGER update_matches_updated_at
  BEFORE UPDATE ON public.matches
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================================
-- SEED DATA: Leagues
-- =============================================================================
INSERT INTO public.leagues (name, short_name, country, sport) VALUES
  ('Ligue 1', 'L1', 'France', 'football'),
  ('Premier League', 'PL', 'England', 'football'),
  ('La Liga', 'LL', 'Spain', 'football'),
  ('Serie A', 'SA', 'Italy', 'football'),
  ('Bundesliga', 'BL', 'Germany', 'football'),
  ('Champions League', 'UCL', 'Europe', 'football')
ON CONFLICT DO NOTHING;

-- =============================================================================
-- INDEXES
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_analyses_author ON public.analyses(author_id);
CREATE INDEX IF NOT EXISTS idx_analyses_category ON public.analyses(category);
CREATE INDEX IF NOT EXISTS idx_analyses_published ON public.analyses(is_published);
CREATE INDEX IF NOT EXISTS idx_matches_date ON public.matches(match_date);
CREATE INDEX IF NOT EXISTS idx_matches_status ON public.matches(status);
CREATE INDEX IF NOT EXISTS idx_matches_league ON public.matches(league_id);
CREATE INDEX IF NOT EXISTS idx_teams_league ON public.teams(league_id);
-- =============================================================================
-- COMPETITIONS TABLE (Enhanced)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.competitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT,
  logo TEXT,
  country TEXT,
  description TEXT,
  season TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  total_teams INTEGER DEFAULT 0,
  total_matches INTEGER DEFAULT 0,
  total_goals INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Competitions are viewable by everyone"
  ON public.competitions FOR SELECT USING (true);

DROP TRIGGER IF EXISTS update_competitions_updated_at ON public.competitions;
CREATE TRIGGER update_competitions_updated_at
  BEFORE UPDATE ON public.competitions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================================
-- STANDINGS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.standings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  competition_id UUID REFERENCES public.competitions(id) ON DELETE CASCADE NOT NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  position INTEGER NOT NULL,
  played INTEGER DEFAULT 0,
  won INTEGER DEFAULT 0,
  drawn INTEGER DEFAULT 0,
  lost INTEGER DEFAULT 0,
  goals_for INTEGER DEFAULT 0,
  goals_against INTEGER DEFAULT 0,
  goal_difference INTEGER GENERATED ALWAYS AS (goals_for - goals_against) STORED,
  points INTEGER DEFAULT 0,
  form TEXT, -- Last 5 results: 'WDWLW'
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(competition_id, team_id)
);

ALTER TABLE public.standings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Standings are viewable by everyone"
  ON public.standings FOR SELECT USING (true);

DROP TRIGGER IF EXISTS update_standings_updated_at ON public.standings;
CREATE TRIGGER update_standings_updated_at
  BEFORE UPDATE ON public.standings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_standings_competition ON public.standings(competition_id);
CREATE INDEX IF NOT EXISTS idx_standings_position ON public.standings(position);
CREATE INDEX IF NOT EXISTS idx_competitions_active ON public.competitions(is_active);

-- =============================================================================
-- FAN ZONES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.fan_zones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  team_name TEXT,
  team_logo TEXT,
  description TEXT,
  capacity INTEGER,
  amenities TEXT[], -- e.g. ['screen', 'bar', 'food', 'terrace']
  opening_hours TEXT,
  image_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.fan_zones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fan zones are viewable by everyone"
  ON public.fan_zones FOR SELECT USING (is_active = true);

DROP TRIGGER IF EXISTS update_fan_zones_updated_at ON public.fan_zones;
CREATE TRIGGER update_fan_zones_updated_at
  BEFORE UPDATE ON public.fan_zones
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_fan_zones_city ON public.fan_zones(city);
CREATE INDEX IF NOT EXISTS idx_fan_zones_team ON public.fan_zones(team_id);
CREATE INDEX IF NOT EXISTS idx_fan_zones_location ON public.fan_zones(lat, lng);
CREATE INDEX IF NOT EXISTS idx_fan_zones_active ON public.fan_zones(is_active);
