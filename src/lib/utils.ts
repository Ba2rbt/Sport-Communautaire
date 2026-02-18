/**
 * Génère un slug URL à partir d'un nom
 * Ex: "Paris Saint-Germain" => "paris-saint-germain"
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Retire les accents
    .replace(/[^a-z0-9]+/g, '-')     // Remplace les caractères spéciaux par des tirets
    .replace(/(^-|-$)/g, '')          // Retire les tirets en début/fin
}

/**
 * Mapping des noms d'équipes vers leurs IDs
 * En production, ces IDs viendraient de Supabase
 */
export const teamSlugs: Record<string, string> = {
  // France
  'Paris Saint-Germain': 'psg',
  'PSG': 'psg',
  'Olympique de Marseille': 'om',
  'OM': 'om',
  'Olympique Lyonnais': 'ol',
  'OL Lyon': 'ol',
  'AS Monaco': 'monaco',
  'LOSC Lille': 'lille',
  'OGC Nice': 'nice',
  'RC Lens': 'lens',
  'Stade Rennais': 'rennes',
  'Stade Brestois': 'brest',
  'FC Nantes': 'nantes',
  'Toulouse FC': 'toulouse',
  'Montpellier HSC': 'montpellier',
  'RC Strasbourg': 'strasbourg',
  'Stade de Reims': 'reims',
  'AJ Auxerre': 'auxerre',
  'Angers SCO': 'angers',
  'AS Saint-Étienne': 'saint-etienne',
  'Le Havre AC': 'le-havre',
  
  // Espagne
  'Real Madrid CF': 'real-madrid',
  'Real Madrid': 'real-madrid',
  'FC Barcelona': 'barcelona',
  'Atletico Madrid': 'atletico-madrid',
  'Sevilla FC': 'sevilla',
  'Real Sociedad': 'real-sociedad',
  'Valencia CF': 'valencia',
  'Athletic Bilbao': 'athletic-bilbao',
  'Real Betis': 'real-betis',
  'Villarreal CF': 'villarreal',
  
  // Angleterre
  'Manchester City': 'man-city',
  'Manchester United': 'man-united',
  'Liverpool FC': 'liverpool',
  'Chelsea FC': 'chelsea',
  'Arsenal FC': 'arsenal',
  'Tottenham Hotspur': 'tottenham',
  'Newcastle United': 'newcastle',
  'Aston Villa': 'aston-villa',
  
  // Allemagne
  'Bayern Munich': 'bayern-munich',
  'Borussia Dortmund': 'dortmund',
  'RB Leipzig': 'leipzig',
  'Bayer Leverkusen': 'leverkusen',
  
  // Italie
  'Juventus': 'juventus',
  'AC Milan': 'ac-milan',
  'Inter Milan': 'inter-milan',
  'AS Roma': 'roma',
  'SSC Napoli': 'napoli',
}

/**
 * Mapping des noms de joueurs vers leurs IDs
 * En production, ces IDs viendraient de Supabase
 */
export const playerSlugs: Record<string, string> = {
  'Kylian Mbappé': 'mbappe',
  'Bradley Barcola': 'barcola',
  'Ousmane Dembélé': 'dembele',
  'Vinícius Júnior': 'vinicius',
  'Jude Bellingham': 'bellingham',
  'Erling Haaland': 'haaland',
  'Rodrygo': 'rodrygo',
  'Gonçalo Ramos': 'ramos',
  'Vitinha': 'vitinha',
  'Achraf Hakimi': 'hakimi',
  'Mason Greenwood': 'greenwood',
  'Luis Henrique': 'luis-henrique',
  'Pierre-Emile Højbjerg': 'hojbjerg',
  'Jonathan David': 'jonathan-david',
}

/**
 * Obtient le slug d'une équipe à partir de son nom
 */
export function getTeamSlug(teamName: string): string {
  return teamSlugs[teamName] || slugify(teamName)
}

/**
 * Obtient le slug d'un joueur à partir de son nom
 */
export function getPlayerSlug(playerName: string): string {
  return playerSlugs[playerName] || slugify(playerName)
}
