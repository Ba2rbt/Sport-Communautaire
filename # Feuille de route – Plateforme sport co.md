# Feuille de route – Plateforme sport communautaire

Stack : Next.js + TypeScript + Tailwind + Supabase + n8n + Vercel

## 1. Vision

- Plateforme multisport (foot, basket, MMA, etc.) centrée sur la communauté, gratuite.[web:160]
- Gestion des matchs/combats, stats détaillées, votes MVP (match + saison), zone expert, zone communautaire, carte fan zones (France d’abord).[web:160]
- Stack moderne, full custom :
  - Frontend : Next.js + TypeScript + Tailwind CSS.[web:189][web:181]
  - Backend de données : Supabase (Postgres, Auth, Realtime, Storage).[web:160][web:193]
  - Automatisation & intégrations : n8n.[web:182][web:191]
  - Hébergement : Vercel (Next), Supabase (DB), VPS (n8n).[web:171][web:162]

## 2. Architecture technique

### 2.1 Frontend

- **Next.js (App Router) + TypeScript + Tailwind CSS** pour toutes les pages.[web:189][web:181]
- Pages principales :
  - `/` : accueil (actus, matchs/combats à venir, top MVP, articles experts).
  - `/matches` : liste filtrable par sport, compétition, date.
  - `/match/[id]` : détail match/combat (stats, votes MVP, discussions).
  - `/competitions/[id]` : classement, calendrier.
  - `/experts` + `/experts/[slug]` : zone expert (articles).
  - `/community` + `/community/[threadId]` : zone communautaire.
  - `/fan-zones` : carte + liste fan zones.
  - `/profile` : profil utilisateur (favoris, votes, badges).
- Design system avec Tailwind :
  - Couleurs : `primary`, `secondary`, `accent`, `accentOrange`, `muted`.[web:189]
  - Composants : `Button`, `CardMatch`, `CardFight`, `BadgeMVP`, `TagSport`, `TableStats`, `ThreadCard`.
  - Layout : container `max-w-6xl mx-auto px-4 md:px-6`, grilles responsives (`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4`).[web:189]

### 2.2 Backend : Supabase

- Base Postgres + Auth gérée par Supabase.[web:160][web:193]
- Tables clés (exemples) :
  - `users`, `profiles`.
  - `sports`, `competitions`, `teams`, `players`.
  - `matches`, `fights`.
  - `match_stats`, `fight_stats`.
  - `votes_match_mvp`, `votes_season_mvp`, `trophies`.
  - `threads`, `posts` (commentaires), `expert_articles`.
  - `fan_zones`.
- RLS et policies pour :
  - Restreindre l’écriture aux utilisateurs connectés.
  - Limiter l’édition à l’auteur ou à des rôles (admin, expert).[web:160]
- Realtime pour :
  - Notifications live (scores ou commentaires) si nécessaire.[web:160][web:158]

### 2.3 Automatisation : n8n

- n8n auto-hébergé sur un petit VPS.[web:161][web:164]
- Workflows principaux :
  - **Ingestion données sport** (APIs sport gratuites) :
    - Cron (toutes les X minutes ou heures).
    - HTTP request vers API sports.
    - Mapping des données → Supabase (upsert).[web:182][web:191]
  - **Emails & notifications** :
    - Cron journalier/hebdo.
    - Envoi récap matchs, votes MVP, nouveaux articles experts.
  - Intégration Supabase via nœud dédié ou via HTTP + clés API.[web:191][web:194]

## 3. Mini design system Tailwind

### 3.1 Palette

- `primary`: `#050816` (fond principal).
- `secondary`: `#0f172a` (cards, panels).
- `accent`: `#22c55e` (état live, CTA).
- `accentOrange`: `#f97316` (MVP, trophées).
- `muted`: `#64748b` (texte secondaire).[web:189][web:177]

Usages fréquents :

- Fond général : `bg-primary text-slate-100`.
- Card : `bg-secondary/80 rounded-xl border border-slate-800 shadow-md`.
- Tag live : `bg-accent text-black text-[10px] font-semibold rounded-full px-2 py-0.5 uppercase`.
- Titre section : `text-xl md:text-2xl font-semibold tracking-tight`.

### 3.2 Typographie et layout

- Titre page : `text-3xl md:text-4xl font-bold`.
- Sous-titre : `text-xl font-semibold`.
- Texte courant : `text-sm md:text-base text-slate-200`.
- Meta : `text-xs uppercase tracking-wide text-slate-400`.[web:189]

- Container : `max-w-6xl mx-auto px-4 md:px-6`.
- Grille matchs : `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4`.
- Grille articles : `grid grid-cols-1 md:grid-cols-3 gap-6`.

### 3.3 Composants (classes)

- Bouton principal :  
  `inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition`

- Bouton secondaire :  
  `inline-flex items-center justify-center rounded-lg border border-slate-600 bg-secondary px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 transition`

- Card match/combat (wrapper) :  
  `bg-secondary/80 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 hover:border-accent/60 transition`

- Tags sports :
  - Foot : `bg-green-500/10 text-green-400 text-[11px] rounded-full px-2 py-0.5`
  - Basket : `bg-orange-500/10 text-orange-400`
  - MMA : `bg-red-500/10 text-red-400`

- Badge MVP :  
  `inline-flex items-center gap-1 rounded-full bg-accentOrange/10 text-accentOrange px-2 py-0.5 text-[11px] font-semibold uppercase`

- Table stats :  
  Table : `w-full text-xs md:text-sm text-slate-200`  
  Header : `border-b border-slate-700 text-slate-400 uppercase text-[11px]`  
  Row : `border-b border-slate-800/60`.[web:189]

## 4. Fonctionnalités MVP (inspirées FotMob / StatMuse)

- Multi-sport : foot (5 grands championnats + National), basket, MMA.[web:160]
- Scores & calendriers :
  - Matches à venir, résultats récents par ligue.
- Pages match/combat :
  - Fiche avec participants, compétion, date, heure, lieu.
  - Statistiques principales (buts, tirs, possession, KO, rounds…).[web:160]
  - Discussion (fil de commentaires).
  - Vote MVP du match (1 vote par utilisateur).
- MVP saison :
  - Aggregation des votes par joueur/combattant.
  - Classement MVP par championnat/sport avec trophées.[web:160]
- Communauté :
  - Threads, réponses, likes simples.
- Zone expert :
  - Articles sur joueurs/championnats.
- Fan zones :
  - Carte Leaflet (OpenStreetMap) + liste.
- Auth & profils :
  - Login/register + profil (favoris, historique de votes).[web:193]

## 5. Phases & planning

### Phase 0 – Préparation (3–5 jours)

- Créer repo Git avec .gitignore approprié.
- **Configurer ESLint + Prettier + Husky** pour qualité de code.
- Créer projet Supabase et configurer auth de base.[web:193]
- Créer projet Next.js + TypeScript + Tailwind (ou utiliser un starter Next + Supabase + Tailwind).[web:181][web:184][web:189]
- **Configurer Sentry** pour tracking erreurs.
- **Déployer un "Hello world" sur Vercel** pour valider la pipeline CI/CD.[web:171][web:162]
- **Configurer GitHub Actions** (lint + tests sur PR).
- Mettre en place un VPS pour n8n.
- **Créer .env.example** avec toutes les variables d'environnement nécessaires.

### Phase 1 – Modèle Supabase & squelette UI (1–2 semaines)

- Définir schéma minimal (sports, competitions, teams, matches, users, votes).[web:160]
- **Créer diagramme de base de données** (dbdiagram.io ou Mermaid).
- Créer tables + RLS de base + **documentation des policies**.
- **Écrire migrations Supabase versionnées** dans `/supabase/migrations/`.
- Intégrer Tailwind dans le projet et configurer la palette.[web:189]
- Coder le layout global (navbar, footer) et une page d'accueil simplifiée.
- **Mettre en place Storybook** pour catalogue de composants.
- **Premiers tests unitaires** pour composants de base (Button, Card).
- **Configurer métadonnées SEO de base** (layout.tsx).

### Phase 2 – Frontend core (2–3 semaines)

- Pages :
  - `/` : **avec métadonnées SEO complètes, Schema.org pour événements sportifs**.
  - `/matches` (liste + filtres simples).
  - `/match/[id]` (fiche match/combat avec CardMatch, TableStats, BadgeMVP).
  - `/competitions/[id]` (classement, calendrier) **avec ISR (revalidate 60s)**.
  - `/fan-zones` (liste + carte Leaflet).
- Intégrer l'auth Supabase dans Next.js (login/logout/profil).[web:193]
- Poser les pages `/community` et `/experts` avec leur layout.
- **Optimiser toutes les images** avec next/image.
- **Audit accessibilité initial** (contraste, navigation clavier, ARIA).
- **Tests d'intégration** pour flux auth (signup/login).
- **Sitemap.xml dynamique** pour SEO.
- **Configurer Vercel Analytics** ou alternative.

### Phase 3 – Automatisation & données réelles (2 semaines)

- Installer et configurer n8n sur VPS.[web:161][web:191]
- **Sécuriser n8n** (authentification, SSL).
- Workflow "Ingestion données sport" :
  - Cron → API sport → transformation → upsert Supabase.
  - **Gestion d'erreurs** (retry, alertes email si échec).
  - **Logs structurés** pour debugging.
- Alimenter les pages `/matches`, `/competitions/[id]` avec ces données.
- **Tester performance** avec données réelles (temps de chargement).
- **Configurer rate limiting** sur webhooks n8n.
- **Backup initial** de la base de données.

### Phase 4 – Communauté & MVP features (2 semaines)

- Implémenter threads et posts (zone communauté).
- **Système de modération** :
  - Bouton "Signaler" sur threads/commentaires.
  - Dashboard admin basique pour modération.
  - Rate limiting (max posts par utilisateur/jour).
- **Captcha** sur formulaire création thread.
- Implémenter votes MVP :
  - Formulaire sur `/match/[id]`.
  - Page de classement MVP par championnat/sport.
  - **Rate limiting** : 1 vote par match par utilisateur.
- Implémenter la zone expert (CRUD simplifié pour articles).
- **Recherche globale** (matchs, équipes, articles).
- Raffiner l'UI avec Tailwind (hover, transitions, badges).
- **Tests E2E critiques** (Playwright : vote MVP, création thread).
- **Notification email** pour nouveaux commentaires (optionnel).

### Phase 5 – Finitions & lancement (1–2 semaines)

- **Pages légales** :
  - `/mentions-legales` : éditeur, hébergeur, contact.
  - `/politique-confidentialite` : RGPD, données collectées.
  - `/cgu` : conditions d'utilisation.
  - **Banner consentement cookies**.
- **PWA** :
  - Manifest.json (icônes, couleurs).
  - Service Worker basique (cache offline).
- Tester RLS/auth, vérifier les accès.
- **Audit final** :
  - Accessibilité (WAVE, axe DevTools).
  - Performance (Lighthouse : >90 sur toutes les pages clés).
  - SEO (Lighthouse, Search Console setup).
  - Sécurité (headers HTTP, CSP).
- Optimiser responsive sur mobiles/tablettes.
- Ajuster workflows n8n (gestion erreurs, logs).
- **Configurer alertes** Sentry pour erreurs critiques.
- **Documentation README complète** (installation, variables d'environnement, commandes).
- **Tests de charge** basiques (combien d'utilisateurs simultanés ?).
- Lancer une version bêta auprès d'un petit groupe d'utilisateurs (10-20 testeurs).
- **Préparer plan de communication** (réseaux sociaux, forums sports).

## 6. Temps & budget

### 6.1 Temps

- Environ 10–15 h / semaine → MVP en 12–15 semaines (avec améliorations).
- **Phase 0** : 5 jours.
- **Phase 1** : 2 semaines.
- **Phase 2** : 3 semaines.
- **Phase 3** : 2 semaines.
- **Phase 4** : 2-3 semaines.
- **Phase 5** : 2 semaines.
- **Total** : ~12-15 semaines pour un MVP robuste et production-ready.

### 6.2 Budget détaillé

**Coûts mensuels estimés** :

| Service                         | Plan                                           | Coût mensuel          |
| ------------------------------- | ---------------------------------------------- | --------------------- |
| Vercel                          | Hobby (gratuit) → Pro si besoin                | 0 € → 20 €/mois       |
| Supabase                        | Free (500 MB DB, 1 GB storage, 2 GB bandwidth) | 0 € → 25 €/mois (Pro) |
| VPS n8n                         | Hetzner CPX11 (2 vCPU, 2 GB RAM)               | 4,5 €/mois            |
| Domaine (.fr ou .com)           | Namecheap/OVH                                  | 10-15 €/an            |
| Sentry                          | Developer (gratuit 5k events/mois)             | 0 €                   |
| Analytics                       | Vercel Analytics ou Plausible                  | 0 € → 9 €/mois        |
| Email transactionnel            | Resend (gratuit 100 emails/jour)               | 0 € → 20 €/mois       |
| SSL                             | Let's Encrypt (gratuit)                        | 0 €                   |
| **Total mensuel initial**       |                                                | **~5 €/mois**         |
| **Total mensuel si croissance** |                                                | **~80-100 €/mois**    |

**Coûts ponctuels** :

- Design/branding (logo, charte) : 100-300 € (Fiverr/99designs) ou fait maison.
- Domaine (première année) : 10-15 €.

**Budget 2000 € couvre** :

- 15 ans d'hébergement au tarif initial gratuit/minimal.
- 2 ans au tarif croissance (~100 €/mois).
- Confortablement les 5 premières années avec marge pour imprévus.

## 7. Points d'amélioration & éléments manquants

### 7.1 Tests & Qualité

**Tests automatisés** :

- **Tests unitaires** : Jest + React Testing Library pour les composants.
- **Tests d'intégration** : Tester les flux complets (création de thread, vote MVP, etc.).
- **Tests E2E** : Playwright ou Cypress pour les parcours critiques (inscription, login, vote).
- **Tests API** : Valider les endpoints Supabase et les edge functions.

**Qualité de code** :

- Linter : ESLint configuré pour TypeScript + React.
- Formatter : Prettier pour une cohérence du code.
- Git hooks : Husky + lint-staged pour valider avant commit.

### 7.2 Monitoring & Observabilité

**Suivi d'erreurs** :

- **Sentry** (gratuit jusqu'à 5k events/mois) pour tracking erreurs frontend + backend.
- Intégration avec Vercel et Supabase edge functions.

**Analytics** :

- **Vercel Analytics** (intégré) ou **Plausible/Umami** (alternatives respectueuses de la vie privée).
- Métriques : pages vues, taux de rebond, conversions (inscriptions, votes).

**Logs** :

- Logs structurés dans n8n (pour debug workflows).
- Supabase logs pour surveiller les requêtes lentes.

### 7.3 SEO & Performance

**SEO critiques** :

- **Métadonnées** : Utiliser Next.js Metadata API pour title, description, Open Graph.
- **Sitemap dynamique** : `/sitemap.xml` généré avec matchs, articles, compétitions.
- **robots.txt** : Autoriser crawling des pages publiques.
- **Schema.org** : Markup structuré pour événements sportifs (SportsEvent, Person pour joueurs).
- **URLs canoniques** : Éviter duplicate content.

**Performance** :

- **Images** : Next.js Image component avec optimisation automatique.
- **Lazy loading** : Images et composants hors viewport.
- **Code splitting** : Dynamic imports pour pages lourdes.
- **Caching** :
  - ISR (Incremental Static Regeneration) pour pages statiques (compétitions, articles).
  - Edge caching Vercel pour données peu changeantes.
  - Client-side caching avec SWR ou React Query.
- **Web Vitals** : Surveiller LCP, FID, CLS via Vercel Analytics.

### 7.4 Accessibilité (A11y)

**Standards WCAG 2.1 niveau AA** :

- Contraste des couleurs (vérifier avec outils comme Contrast Checker).
- Navigation au clavier (focus visible, ordre logique).
- ARIA labels pour éléments interactifs (votes, boutons).
- Textes alternatifs pour toutes les images.
- Formulaires accessibles (labels, erreurs claires).
- Test avec lecteur d'écran (NVDA ou VoiceOver).

### 7.5 Sécurité & Protection

**Rate limiting** :

- Supabase : Limiter requêtes API par IP/utilisateur.
- n8n : Webhook rate limiting pour éviter abus.
- Vercel : Edge middleware pour bloquer trafic suspect.

**Modération contenu** :

- **Système de signalement** : Bouton "Signaler" sur threads/commentaires.
- **Liste de mots interdits** : Filtrage basique anti-spam.
- **Dashboard admin** : Interface pour modérer contenu signalé.
- **Email de modération** : Notifications pour admins.

**Protection anti-spam** :

- Captcha (hCaptcha ou Cloudflare Turnstile) sur formulaires publics.
- Limite de posts par utilisateur (ex: max 10 threads/jour).

### 7.6 Conformité légale (RGPD)

**Mentions légales** :

- Page `/mentions-legales` : Éditeur, hébergeur, contact.
- Page `/politique-confidentialite` : Collecte données, cookies, droits utilisateurs.
- Page `/cgu` : Conditions d'utilisation.

**Consentement cookies** :

- Banner de consentement (si analytics tiers).
- Opt-in explicite pour cookies non essentiels.

**Droits utilisateurs** :

- Export de données (JSON via profil).
- Suppression de compte (anonymisation des posts ou suppression complète).

### 7.7 Sauvegarde & Résilience

**Backups Supabase** :

- Backups quotidiens automatiques (inclus dans plan Supabase).
- Export manuel mensuel pour archives locales.
- Test de restauration trimestriel.

**Disaster recovery** :

- Documentation pour recréer l'infra (IaC si possible).
- Variables d'environnement versionnées (fichier .env.example).

### 7.8 CI/CD

**Pipeline automatisé** :

- **GitHub Actions** :
  - Lint + tests sur chaque PR.
  - Build preview Vercel automatique.
  - Déploiement production sur merge main.
- **Supabase migrations** :
  - Versionnées dans `/supabase/migrations/`.
  - Appliquées automatiquement via CLI.

### 7.9 Fonctionnalités additionnelles

**Recherche** :

- Barre de recherche globale (matchs, équipes, joueurs, articles).
- Supabase Full-Text Search ou intégration Algolia (gratuit jusqu'à 10k requêtes/mois).

**Notifications** :

- **Push notifications** : Service Worker + Web Push API pour résultats matchs.
- **Emails transactionnels** : Resend ou SendGrid (gratuit jusqu'à 100 emails/jour).
  - Confirmation inscription.
  - Récap hebdomadaire personnalisé.
  - Notification nouveau commentaire sur thread suivi.

**Gestion médias** :

- **Supabase Storage** pour images profils, photos fan zones, bannières articles.
- Validation côté serveur (taille, format).
- Compression images automatique.

**PWA (Progressive Web App)** :

- Manifest.json pour installation sur mobile.
- Service Worker pour cache offline des pages récentes.
- Add to Home Screen prompt.

**Internationalisation** :

- Préparer structure i18n (next-intl) même si v1 en français.
- Dates/heures en format local.

### 7.10 Analytics & Métriques Business

**KPIs à suivre** :

- Utilisateurs actifs (DAU, MAU).
- Taux de conversion visiteur → inscrit.
- Engagement : votes/user, posts/user.
- Rétention J1, J7, J30.
- Pages les plus vues (matchs/compétitions populaires).
- Taux de rebond par page.

**Outils** :

- Dashboard custom dans Supabase (requêtes SQL).
- Metabase ou Grafana pour visualisations avancées.

### 7.11 Documentation

**Documentation technique** :

- **README.md** : Setup local, commandes, architecture.
- **CONTRIBUTING.md** : Guidelines pour contributeurs (si open-source futur).
- **Storybook** : Catalogue de composants UI avec exemples.
- **Diagrammes** :
  - Architecture système (Mermaid ou draw.io).
  - Schéma base de données (dbdiagram.io).
  - Flow utilisateur (Figma ou Excalidraw).

**Documentation API** :

- Si exposition future d'API publique : Swagger/OpenAPI.

### 7.12 Stratégie de contenu

**Amorçage zone expert** :

- Identifier 3-5 experts/rédacteurs pour lancement.
- Calendrier éditorial (2-3 articles/semaine minimum).
- Thèmes : analyses tactiques, portraits joueurs, historiques compétitions.

**Modération initiale** :

- Admins actifs les premières semaines pour donner le ton.
- FAQ communauté.

### 7.13 Amélioration continue post-MVP

**Phase 6 – Après lancement** :

- Récolter feedback utilisateurs (formulaire, analytics comportemental).
- Itérer sur features les plus demandées.
- A/B testing (ex: formulations CTA, positions boutons).
- Optimiser conversion (inscription, engagement).

**Évolutions futures** :

- **Mobile app native** (React Native + Supabase).
- **API publique** pour développeurs tiers.
- **Gamification** : Badges, niveaux utilisateur, classements contributeurs.
- **Prédictions** : Pronostics matchs avec classement.
- **Direct live** : Fil de commentaires temps réel pendant matchs.
- **Partenariats** : Fan zones officielles, clubs, sponsors.

## 8. Stack technique complète (récapitulatif)

### Frontend

- **Framework** : Next.js 14+ (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Composants** : Headless UI / Radix UI (accessibilité)
- **Cartes** : Leaflet + React-Leaflet
- **State management** : React Context + SWR/React Query (cache)
- **Formulaires** : React Hook Form + Zod (validation)

### Backend

- **Database** : Supabase (PostgreSQL)
- **Auth** : Supabase Auth
- **Storage** : Supabase Storage
- **Realtime** : Supabase Realtime (optionnel)
- **Edge Functions** : Supabase Edge Functions (si besoin logique serveur)

### Automatisation

- **Workflow** : n8n (auto-hébergé)
- **APIs Sport** : API-Football, TheSportsDB, etc.

### DevOps & Tools

- **Hébergement** : Vercel (frontend) + Hetzner VPS (n8n)
- **CI/CD** : GitHub Actions
- **Monitoring** : Sentry (erreurs)
- **Analytics** : Vercel Analytics ou Plausible
- **Tests** : Jest + React Testing Library + Playwright
- **Qualité** : ESLint + Prettier + Husky
- **Documentation** : Storybook + diagrammes Mermaid

### Sécurité & Conformité

- **Rate limiting** : Supabase + Vercel Middleware
- **Captcha** : hCaptcha ou Cloudflare Turnstile
- **HTTPS** : Automatique (Vercel + Let's Encrypt)
- **RGPD** : Pages légales + banner consentement

## 9. Checklist pré-lancement

- [ ] Toutes les pages ont métadonnées SEO complètes
- [ ] Sitemap.xml et robots.txt configurés
- [ ] Schema.org markup pour événements sportifs
- [ ] Lighthouse score >90 (Performance, Accessibility, SEO)
- [ ] Tests E2E passent pour flux critiques
- [ ] RLS testées, aucune fuite de données
- [ ] Sentry configuré avec alertes email
- [ ] Backup automatique Supabase vérifié
- [ ] Pages légales publiées (mentions, confidentialité, CGU)
- [ ] Banner RGPD fonctionnel
- [ ] PWA manifest + service worker actif
- [ ] Dashboard admin modération opérationnel
- [ ] Rate limiting testé (votes, posts)
- [ ] n8n workflows stables avec gestion d'erreurs
- [ ] Documentation README complète
- [ ] Groupe bêta testeurs recruté (10-20 personnes)
- [ ] Plan communication préparé (posts sociaux, forums)
- [ ] Domaine configuré + email professionnel (contact@)
- [ ] Analytics configuré et testé
