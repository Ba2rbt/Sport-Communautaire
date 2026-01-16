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

-- =============================================================================
-- COMMUNITY THREADS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.threads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL CHECK (char_length(title) >= 3 AND char_length(title) <= 200),
  content TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category TEXT DEFAULT 'general',
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.threads ENABLE ROW LEVEL SECURITY;

-- Everyone can view threads
CREATE POLICY "Threads are viewable by everyone"
  ON public.threads FOR SELECT USING (true);

-- Only authenticated users can create threads
CREATE POLICY "Authenticated users can create threads"
  ON public.threads FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Users can update their own threads
CREATE POLICY "Users can update own threads"
  ON public.threads FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Users can delete their own threads
CREATE POLICY "Users can delete own threads"
  ON public.threads FOR DELETE USING (auth.uid() = author_id);

DROP TRIGGER IF EXISTS update_threads_updated_at ON public.threads;
CREATE TRIGGER update_threads_updated_at
  BEFORE UPDATE ON public.threads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================================
-- THREAD POSTS (REPLIES) TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.thread_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id UUID REFERENCES public.threads(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL CHECK (char_length(content) >= 1 AND char_length(content) <= 5000),
  is_solution BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.thread_posts ENABLE ROW LEVEL SECURITY;

-- Everyone can view posts
CREATE POLICY "Posts are viewable by everyone"
  ON public.thread_posts FOR SELECT USING (true);

-- Only authenticated users can create posts
CREATE POLICY "Authenticated users can create posts"
  ON public.thread_posts FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Users can update their own posts
CREATE POLICY "Users can update own posts"
  ON public.thread_posts FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete own posts"
  ON public.thread_posts FOR DELETE USING (auth.uid() = author_id);

DROP TRIGGER IF EXISTS update_posts_updated_at ON public.thread_posts;
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.thread_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================================
-- LIKES/UPVOTES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  thread_id UUID REFERENCES public.threads(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.thread_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  -- Either thread_id or post_id must be set, but not both
  CONSTRAINT likes_target_check CHECK (
    (thread_id IS NOT NULL AND post_id IS NULL) OR
    (thread_id IS NULL AND post_id IS NOT NULL)
  ),
  -- One like per user per target
  UNIQUE(user_id, thread_id),
  UNIQUE(user_id, post_id)
);

ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- Everyone can view likes count
CREATE POLICY "Likes are viewable by everyone"
  ON public.likes FOR SELECT USING (true);

-- Only authenticated users can like
CREATE POLICY "Authenticated users can like"
  ON public.likes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can remove their own likes
CREATE POLICY "Users can remove own likes"
  ON public.likes FOR DELETE USING (auth.uid() = user_id);

-- =============================================================================
-- INDEXES
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_threads_author ON public.threads(author_id);
CREATE INDEX IF NOT EXISTS idx_threads_category ON public.threads(category);
CREATE INDEX IF NOT EXISTS idx_threads_created ON public.threads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_threads_pinned ON public.threads(is_pinned DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_thread ON public.thread_posts(thread_id);
CREATE INDEX IF NOT EXISTS idx_posts_author ON public.thread_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created ON public.thread_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_likes_thread ON public.likes(thread_id);
CREATE INDEX IF NOT EXISTS idx_likes_post ON public.likes(post_id);
CREATE INDEX IF NOT EXISTS idx_likes_user ON public.likes(user_id);

-- =============================================================================
-- EXPERT ARTICLES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.expert_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL CHECK (char_length(title) >= 5 AND char_length(title) <= 200),
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT CHECK (char_length(excerpt) <= 300),
  content_md TEXT NOT NULL,
  cover_image TEXT,
  category TEXT DEFAULT 'analysis',
  read_time INTEGER, -- in minutes
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.expert_articles ENABLE ROW LEVEL SECURITY;

-- Everyone can view published articles
CREATE POLICY "Published articles are viewable by everyone"
  ON public.expert_articles FOR SELECT
  USING (is_published = true);

-- Authors can view their own articles (including drafts)
CREATE POLICY "Authors can view own articles"
  ON public.expert_articles FOR SELECT
  USING (auth.uid() = author_id);

-- Only experts can create articles
CREATE POLICY "Experts can create articles"
  ON public.expert_articles FOR INSERT
  WITH CHECK (
    auth.uid() = author_id AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'expert'
    )
  );

-- Authors can update their own articles
CREATE POLICY "Authors can update own articles"
  ON public.expert_articles FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Authors can delete their own articles
CREATE POLICY "Authors can delete own articles"
  ON public.expert_articles FOR DELETE
  USING (auth.uid() = author_id);

DROP TRIGGER IF EXISTS update_expert_articles_updated_at ON public.expert_articles;
CREATE TRIGGER update_expert_articles_updated_at
  BEFORE UPDATE ON public.expert_articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add role column to profiles if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user';
  END IF;
END $$;

-- =============================================================================
-- INDEXES
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_expert_articles_author ON public.expert_articles(author_id);
CREATE INDEX IF NOT EXISTS idx_expert_articles_slug ON public.expert_articles(slug);
CREATE INDEX IF NOT EXISTS idx_expert_articles_published ON public.expert_articles(is_published);
CREATE INDEX IF NOT EXISTS idx_expert_articles_featured ON public.expert_articles(is_featured);
CREATE INDEX IF NOT EXISTS idx_expert_articles_category ON public.expert_articles(category);
CREATE INDEX IF NOT EXISTS idx_expert_articles_created ON public.expert_articles(created_at DESC);

-- =============================================================================
-- PLAYERS TABLE (for MVP system)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  team_name TEXT NOT NULL,
  team_logo_url TEXT,
  photo_url TEXT,
  position TEXT, -- 'GK', 'DEF', 'MID', 'FWD'
  nationality TEXT,
  jersey_number INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Players are viewable by everyone" ON public.players FOR SELECT USING (true);

DROP TRIGGER IF EXISTS update_players_updated_at ON public.players;
CREATE TRIGGER update_players_updated_at
  BEFORE UPDATE ON public.players
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================================
-- SEASON MVP VOTES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.season_mvp_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  competition_id TEXT REFERENCES public.competitions(id) ON DELETE CASCADE NOT NULL,
  match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE,
  player_id UUID REFERENCES public.players(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  -- One vote per user per match (if match_id provided) or per competition per week
  UNIQUE (competition_id, match_id, user_id)
);

ALTER TABLE public.season_mvp_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Votes are viewable by everyone"
  ON public.season_mvp_votes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can vote"
  ON public.season_mvp_votes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own vote"
  ON public.season_mvp_votes FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================================================
-- MVP LEADERBOARD VIEW (Aggregation)
-- =============================================================================
CREATE OR REPLACE VIEW public.mvp_leaderboard AS
SELECT 
  p.id AS player_id,
  p.name AS player_name,
  p.team_name,
  p.team_logo_url,
  p.photo_url,
  p.position,
  p.nationality,
  p.jersey_number,
  v.competition_id,
  COUNT(v.id) AS total_votes,
  COUNT(DISTINCT v.user_id) AS unique_voters,
  COUNT(DISTINCT v.match_id) AS matches_voted,
  ROUND(
    COUNT(v.id)::NUMERIC / NULLIF(
      (SELECT COUNT(*) FROM public.season_mvp_votes WHERE competition_id = v.competition_id), 
      0
    ) * 100, 
    2
  ) AS vote_percentage
FROM public.players p
LEFT JOIN public.season_mvp_votes v ON p.id = v.player_id
WHERE v.competition_id IS NOT NULL
GROUP BY 
  p.id, p.name, p.team_name, p.team_logo_url, p.photo_url, 
  p.position, p.nationality, p.jersey_number, v.competition_id
ORDER BY total_votes DESC;

-- =============================================================================
-- INDEXES
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_players_team ON public.players(team_name);
CREATE INDEX IF NOT EXISTS idx_players_position ON public.players(position);
CREATE INDEX IF NOT EXISTS idx_season_mvp_votes_competition ON public.season_mvp_votes(competition_id);
CREATE INDEX IF NOT EXISTS idx_season_mvp_votes_player ON public.season_mvp_votes(player_id);
CREATE INDEX IF NOT EXISTS idx_season_mvp_votes_user ON public.season_mvp_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_season_mvp_votes_match ON public.season_mvp_votes(match_id);

-- =============================================================================
-- USER FAVORITES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  favorite_type TEXT NOT NULL CHECK (favorite_type IN ('team', 'player', 'competition')),
  favorite_id TEXT NOT NULL, -- team_name, player_id, or competition_id
  favorite_name TEXT NOT NULL,
  favorite_logo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (user_id, favorite_type, favorite_id)
);

ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON public.user_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites"
  ON public.user_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove favorites"
  ON public.user_favorites FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================================================
-- UPDATE PROFILES TABLE (add bio, location)
-- =============================================================================
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'bio'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN bio TEXT;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'location'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN location TEXT;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'favorite_team'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN favorite_team TEXT;
  END IF;
END $$;

-- =============================================================================
-- USER STATS VIEW
-- =============================================================================
CREATE OR REPLACE VIEW public.user_stats AS
SELECT 
  p.id AS user_id,
  p.full_name,
  p.avatar_url,
  p.created_at AS member_since,
  (SELECT COUNT(*) FROM public.season_mvp_votes WHERE user_id = p.id) AS total_mvp_votes,
  (SELECT COUNT(*) FROM public.user_favorites WHERE user_id = p.id) AS total_favorites,
  (SELECT COUNT(*) FROM public.thread_posts WHERE author_id = p.id) AS total_posts,
  (SELECT COUNT(*) FROM public.threads WHERE author_id = p.id) AS total_threads,
  (SELECT COUNT(*) FROM public.match_comments WHERE author_id = p.id) AS total_comments
FROM public.profiles p;

-- =============================================================================
-- INDEXES
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_user_favorites_user ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_type ON public.user_favorites(favorite_type);
