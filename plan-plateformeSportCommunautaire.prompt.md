## Plan : Développement Plateforme Sport Communautaire

Plateforme multisport gratuite (foot, basket, MMA) avec gestion des matchs, stats détaillées, votes MVP, zone expert et communautaire. Stack : Next.js + TypeScript + Tailwind + Supabase + n8n sur Vercel. Inclut le Realtime dès le MVP et l'internationalisation dès le départ.

---

### Phase 0 – Préparation de l'environnement (3-5 jours)

1. **Initialisation du dépôt Git** : Créer le repo GitHub avec structure de branches (main, develop, feature/*), configurer les GitHub Actions pour CI/CD.

2. **Projet Supabase** : Créer le projet, configurer l'authentification (email/password, OAuth Google/Discord), activer Realtime sur les tables clés.

3. **Projet Next.js + i18n** : Initialiser avec `create-next-app` + TypeScript + Tailwind, configurer `next-intl` ou `next-i18next` pour le multi-langue (FR par défaut, EN en second).

4. **Design system Tailwind** : Configurer la palette (`primary: #050816`, `secondary: #0f172a`, `accent: #22c55e`, `accentOrange: #f97316`, `muted: #64748b`).

5. **Déploiement Vercel** : Connecter le repo, valider le pipeline avec une page "Hello World" multilingue.

6. **VPS n8n** : Provisionner un VPS (Hetzner ~4€/mois), installer n8n avec Docker Compose.

7. **Qualité code** : Configurer ESLint + Prettier + Husky (pre-commit hooks), structure des dossiers (`/components`, `/lib`, `/hooks`, `/types`).

8. **Gestion des environnements** : Fichiers `.env.local`, `.env.staging`, `.env.production` avec variables sécurisées.

---

### Phase 1 – Modèle de données & Squelette UI (1-2 semaines)

1. **Schéma base de données Supabase** :
   - Core : `users`, `profiles`, `sports`, `competitions`, `teams`, `players`
   - Événements : `matches`, `fights`, `match_stats`, `fight_stats`
   - Engagement : `votes_match_mvp`, `votes_season_mvp`, `trophies`
   - Communauté : `threads`, `posts`, `expert_articles`, `fan_zones`
   - Audit : `activity_logs` (traçabilité des actions importantes)

2. **Indexes & Performance DB** : Créer des indexes sur les colonnes fréquemment filtrées (`sport_id`, `competition_id`, `match_date`, `created_at`).

3. **Soft delete** : Ajouter colonne `deleted_at` sur les tables modifiables (threads, posts, articles) plutôt que suppression définitive.

4. **Activer Realtime** : Configurer les subscriptions sur `matches` (scores live), `posts` (nouveaux commentaires), `votes_match_mvp`.

5. **Politiques RLS** : Restreindre l'écriture aux utilisateurs connectés, l'édition aux auteurs/admins/experts.

6. **Validation Zod** : Créer les schémas de validation (`/lib/validations/`) pour toutes les entrées utilisateur (votes, posts, profils).

7. **Structure i18n** : Créer les fichiers de traduction (`/locales/fr.json`, `/locales/en.json`), wrapper `useTranslation` pour tous les textes.

8. **Layout global** : Navbar (logo, navigation, sélecteur de langue, auth), footer, container responsive.

9. **Composants réutilisables** : `Button`, `CardMatch`, `CardFight`, `BadgeMVP`, `TagSport`, `TableStats`, `ThreadCard`, `SkeletonLoader`, `Toast`.

---

### Phase 2 – Frontend Core (2-3 semaines)

1. **Installation TanStack Query** : Configurer React Query pour la gestion du cache, invalidation intelligente, optimistic updates sur les votes.

2. **États de chargement** : Implémenter les skeleton loaders sur toutes les listes et cards, toast notifications (sonner) pour le feedback utilisateur.

3. **Page d'accueil `/`** : Actus, matchs à venir (avec indicateur live), top MVP, articles experts récents.

4. **Pages Matchs** :
   - `/matches` : Liste filtrable par sport, compétition, date avec grille responsive
   - `/match/[id]` : Fiche détaillée avec stats temps réel (Realtime Supabase), discussion live, vote MVP avec optimistic update

5. **Pages Compétitions** :
   - `/competitions/[id]` : Classement, calendrier, stats globales (ISR avec revalidation toutes les 5 min)

6. **Page Fan Zones `/fan-zones`** : Carte Leaflet (OpenStreetMap) + liste des fan zones France, géolocalisation.

7. **Authentification Supabase** : Pages login/register multilingues, middleware de protection, gestion de session, rate limiting sur les endpoints auth.

8. **Page profil `/profile`** : Favoris, historique de votes, badges, préférence de langue.

9. **Sanitization** : Intégrer DOMPurify pour nettoyer le contenu HTML des posts et articles.

---

### Phase 3 – Automatisation & Données Réelles (2 semaines)

1. **Configuration n8n** : Sécuriser l'accès HTTPS, configurer credentials Supabase.

2. **Sélection APIs gratuites** :
   - **Foot** : TheSportsDB (gratuit) ou API-Football tier gratuit (100 req/jour)
   - **Basket** : TheSportsDB ou balldontlie (gratuit)
   - **MMA** : TheSportsDB ou scraping léger de sources publiques

3. **Workflow Ingestion Sport** :
   - Cron toutes les 5-15 min (matchs live) / toutes les heures (calendrier)
   - HTTP Request → Mapping JSON → Upsert Supabase
   - Trigger Realtime automatique sur update

4. **Workflow Notifications** :
   - Cron journalier : récap matchs, rappels votes MVP
   - Cron hebdo : newsletter nouveaux articles experts

5. **Connexion données** : Alimenter `/matches` et `/competitions/[id]` avec données live.

---

### Phase 4 – Communauté & Fonctionnalités MVP (2 semaines)

1. **Zone Communauté avec Realtime** :
   - `/community` : Liste threads filtrable par sport
   - `/community/[threadId]` : Discussion live (nouveaux posts en temps réel via subscription)
   - CRUD threads/posts avec RLS

2. **Système de votes MVP** :
   - Formulaire vote sur `/match/[id]` (1 vote/utilisateur/match)
   - Compteur de votes en temps réel
   - Classement MVP par championnat avec trophées

3. **Zone Expert** :
   - `/experts` : Liste articles par catégorie/sport
   - `/experts/[slug]` : Article complet avec commentaires
   - Interface d'édition pour rôle "expert"

4. **Badges & Gamification** : Attribution automatique de badges (premier vote, 10 votes, contributeur actif).

---

### Phase 5 – Finitions & Lancement Beta (1-2 semaines)

1. **Tests automatisés** :
   - Tests unitaires : Vitest pour les utilitaires, hooks et schémas Zod
   - Tests composants : Testing Library pour les composants critiques
   - Tests E2E : Playwright pour les parcours clés (login, vote, post)

2. **Tests sécurité** : Audit RLS, vérification des accès par rôle, tests d'intrusion basiques, validation CSRF.

3. **Error tracking** : Intégrer Sentry pour capturer les erreurs frontend/backend, configurer les alertes.

4. **Optimisation performance** :
   - Lazy loading images (Next.js Image) + compression Sharp
   - Pagination/infinite scroll sur les listes
   - Cache des traductions
   - Edge Functions Vercel pour les endpoints critiques

5. **PWA basique** : Configurer next-pwa pour installation mobile, manifest.json, icônes, mode offline minimal.

6. **SEO multilingue** : Meta tags dynamiques, sitemap XML par langue, balises hreflang.

7. **Monitoring & Analytics** :
   - Logs n8n avec gestion d'erreurs
   - Alertes Supabase
   - Analytics Vercel ou Plausible (RGPD-friendly)
   - Endpoint `/api/health` pour health checks

8. **Beta launch** : Déploiement production, invitation groupe test (50-100 utilisateurs), collecte feedback.

---

### Récapitulatif des choix techniques

| Aspect | Choix |
|--------|-------|
| **APIs Sport** | TheSportsDB (gratuit), API-Football tier gratuit, balldontlie |
| **Realtime** | Activé dès le MVP (scores live, commentaires, votes) |
| **i18n** | Dès le départ avec `next-intl` (FR + EN) |
| **State Management** | TanStack Query (cache, optimistic updates) |
| **Validation** | Zod (client + serveur) |
| **Tests** | Vitest + Testing Library + Playwright |
| **Monitoring** | Sentry + Plausible/Vercel Analytics |
| **PWA** | next-pwa (installation mobile, offline basique) |
| **Qualité code** | ESLint + Prettier + Husky |
| **Budget estimé** | ~50-100€/an (VPS n8n + domaine), tiers gratuits Vercel/Supabase |

---

### Évolutions post-MVP

| Fonctionnalité | Description |
|----------------|-------------|
| **Push notifications** | Web Push API pour alertes matchs live |
| **Mode clair/sombre** | Toggle avec `next-themes` |
| **Views matérialisées** | Classements MVP pré-calculés (refresh périodique) |
| **Animations avancées** | Framer Motion pour transitions de pages |
| **App mobile native** | React Native ou Capacitor si besoin |

---

### Prochaines étapes immédiates

1. Créer le repo Git et initialiser le projet Next.js avec i18n
2. Créer le projet Supabase et définir le schéma des tables principales
3. Configurer le VPS et installer n8n
