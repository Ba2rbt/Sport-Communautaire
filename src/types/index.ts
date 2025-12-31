// ==========================================
// SPORT COMMUNAUTAIRE - Type Definitions
// ==========================================

// Base types
export type Sport = 'football' | 'basketball' | 'mma';

export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled';

export type UserRole = 'user' | 'expert' | 'admin';

// Database entities
export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  role: UserRole;
  favorite_sport?: Sport;
  locale: 'fr' | 'en';
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string;
  name: string;
  logo_url?: string;
  sport: Sport;
  competition_id?: string;
  created_at: string;
}

export interface Player {
  id: string;
  name: string;
  photo_url?: string;
  team_id?: string;
  sport: Sport;
  position?: string;
  nationality?: string;
  created_at: string;
}

export interface Competition {
  id: string;
  name: string;
  logo_url?: string;
  sport: Sport;
  country?: string;
  season?: string;
  created_at: string;
}

export interface Match {
  id: string;
  sport: Sport;
  competition_id: string;
  home_team_id: string;
  away_team_id: string;
  home_score?: number;
  away_score?: number;
  status: MatchStatus;
  match_date: string;
  venue?: string;
  created_at: string;
  updated_at: string;
  // Relations (optional, populated by joins)
  home_team?: Team;
  away_team?: Team;
  competition?: Competition;
}

export interface Fight {
  id: string;
  competition_id: string;
  fighter1_id: string;
  fighter2_id: string;
  winner_id?: string;
  method?: string;
  round?: number;
  status: MatchStatus;
  fight_date: string;
  weight_class?: string;
  created_at: string;
  updated_at: string;
}

// MVP Voting
export interface VoteMatchMVP {
  id: string;
  match_id: string;
  user_id: string;
  player_id: string;
  created_at: string;
}

export interface MVPRanking {
  player_id: string;
  player: Player;
  vote_count: number;
  competition_id?: string;
}

// Community
export interface Thread {
  id: string;
  title: string;
  content: string;
  author_id: string;
  sport?: Sport;
  match_id?: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  // Relations
  author?: Profile;
  posts_count?: number;
}

export interface Post {
  id: string;
  thread_id: string;
  author_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  // Relations
  author?: Profile;
}

export interface ExpertArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image_url?: string;
  author_id: string;
  sport?: Sport;
  category?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  // Relations
  author?: Profile;
}

export interface FanZone {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  description?: string;
  sports: Sport[];
  created_at: string;
}

// Badges & Gamification
export interface Trophy {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
}

export interface UserTrophy {
  id: string;
  user_id: string;
  trophy_id: string;
  awarded_at: string;
  trophy?: Trophy;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}
