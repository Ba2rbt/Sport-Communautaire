export interface Team {
  name: string;
  logo: string;
  shortName: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  competition: string;
  venue: string;
  isLive: boolean;
  status: 'upcoming' | 'live' | 'finished';
}

export interface MVP {
  id: string;
  name: string;
  team: string;
  position: string;
  stats: string;
  image: string;
  rating: number;
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  image: string;
}

export interface Analysis {
  id: string;
  title: string;
  excerpt: string;
  expert: Expert;
  category: string;
  readTime: string;
  image: string;
  date: string;
}
