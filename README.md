# SportUnion

Un portail sportif communautaire inspiré du style éditorial du New York Times, construit avec Next.js 15, TypeScript, Tailwind CSS et Supabase.

## 🚀 Stack Technique

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (Auth + Database + RLS)
- **Fonts**: Playfair Display (éditorial) + Source Sans 3 (corps)

## 🎨 Design System

### Palette de couleurs (NYTimes Sport)

| Couleur      | Hex       | Usage                      |
| ------------ | --------- | -------------------------- |
| Primary      | `#0a0a0a` | Texte principal, fond hero |
| Secondary    | `#f8f9fa` | Fond de page               |
| Accent Live  | `#00b140` | Indicateurs live           |
| Accent MVP   | `#ff6200` | Badges MVP, highlights     |
| Accent Sport | `#0066cc` | CTA, liens, catégories     |
| Muted        | `#666666` | Texte secondaire           |

## 📁 Structure du Projet

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/      # Page de connexion
│   │   ├── signup/     # Page d'inscription
│   │   └── actions.ts  # Server actions auth
│   ├── auth/callback/  # OAuth callback
│   ├── profile/        # Page profil (protégée)
│   ├── community/      # Page communauté (protégée)
│   ├── experts/create/ # Créer analyse (protégée)
│   ├── layout.tsx      # Layout global
│   ├── page.tsx        # Page d'accueil
│   └── globals.css     # Styles globaux
├── components/
│   ├── Navbar.tsx      # Navigation (server)
│   ├── NavbarClient.tsx # Navigation (client)
│   ├── UserMenu.tsx    # Menu utilisateur
│   ├── HeroMatch.tsx   # Hero match du jour
│   ├── MatchCard.tsx   # Carte de match
│   ├── MVPCard.tsx     # Carte MVP
│   └── ExpertCard.tsx  # Carte analyse
├── lib/supabase/
│   ├── client.ts       # Client browser
│   ├── server.ts       # Client server
│   └── middleware.ts   # Client middleware
├── types/
│   ├── index.ts        # Types métier
│   └── supabase.ts     # Types Supabase
└── middleware.ts       # Next.js middleware
```

## 🏃 Démarrage

### 1. Configuration Supabase

Créez un projet sur [supabase.com](https://supabase.com) et exécutez le schéma SQL:

```bash
# Copiez le contenu de supabase/schema.sql dans l'éditeur SQL de Supabase
```

### 2. Variables d'environnement

Créez un fichier `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Installation & Lancement

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev

# Build production
npm run build

# Démarrage en production
npm start
```

## 🌐 Déploiement Vercel

Le projet est prêt pour le déploiement sur Vercel:

1. Connectez votre repository GitHub à Vercel
2. Le déploiement se fait automatiquement

## 📱 Responsive Design

- **Mobile**: Grille 1 colonne, navigation hamburger
- **Tablet**: Grille 2 colonnes
- **Desktop**: Grille 3 colonnes, navigation complète

## ✨ Fonctionnalités

- ⚽ **Match du Jour** - Hero massif avec score en direct
- 📅 **Matches à Venir** - Grille responsive des prochains matchs
- 🏆 **Top MVP** - Classement des meilleurs joueurs de la semaine
- 📝 **Analyses Experts** - Articles et analyses approfondies
- 🔴 **Indicateurs Live** - Animation pulse pour les matchs en cours
- 🔐 **Authentification** - Connexion/Inscription email/password
- 👤 **Profil utilisateur** - Espace membre personnalisé
- 🛡️ **Routes protégées** - Middleware de protection des pages

## 🔐 Sécurité (RLS)

Les politiques Row Level Security sont configurées pour:

- **Profiles**: Lecture publique, modification par le propriétaire
- **Analyses**: Lecture publique si publiée, CRUD pour l'auteur

Routes protégées par le middleware:

- `/profile` - Page profil
- `/community` - Espace communauté
- `/experts/create` - Création d'analyses

## 📄 License

MIT
