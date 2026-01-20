# n8n Workflow - SportUnion Sync

Workflow n8n pour synchroniser les données de matchs depuis API-Football vers Supabase.

## 📁 Fichiers disponibles

| Fichier | Description |
|---------|-------------|
| `sportunion-sync-simple.json` | ✅ **Recommandé** - Version simple, clés directement dans les nœuds |
| `sportunion-sync-workflow.json` | Version avancée avec credentials séparés + Discord |

## 📋 Fonctionnalités

- ⏰ **Cron 30min** : Exécution automatique toutes les 30 minutes
- ⚽ **6 championnats** : Ligue 1, Premier League, La Liga, Serie A, Bundesliga, National
- 🔄 **Upsert intelligent** : Mise à jour ou création des données
- 📊 **Parse complet** : Matches, compétitions

## 🚀 Installation (Version Simple)

### 1. Importer le workflow

1. Ouvrir n8n
2. **Workflows** → **Import from File**
3. Sélectionner `sportunion-sync-simple.json`

### 2. Configurer (3 valeurs à remplacer)

Ouvrir chaque nœud et remplacer les valeurs :

#### 🔑 API-Football (6 nœuds API)

Remplacer `VOTRE_API_KEY_ICI` par votre clé API-Football.

**Obtenir la clé** : https://www.api-football.com/ → Dashboard → API Key

#### 🗄️ Supabase (2 nœuds Upsert)

Remplacer dans l'URL et les headers :
- `VOTRE_PROJECT_ID` → votre project ID (ex: `abcdefghijk`)
- `VOTRE_SERVICE_ROLE_KEY` → votre clé `service_role`

**Obtenir les infos** : Supabase Dashboard → Project Settings → API
- Project URL : `https://abcdefghijk.supabase.co`
- Service Role Key : `eyJhbGci...` (la longue clé, PAS anon!)

### 3. Tester

1. Cliquer sur **Execute Workflow** (bouton play)
2. Vérifier que les données arrivent dans Supabase

### 4. Activer

1. Cliquer sur **Active** (toggle en haut à droite)
2. Le workflow s'exécutera automatiquement toutes les 30 minutes

## 📊 Données synchronisées

### Table `matches`

```sql
id, team1, team2, score1, score2, status, league, image, date, time, stadium
```

### Table `competitions`

```sql
id, name, logo_url, country, current_season
```

## 🏆 Championnats (League IDs API-Football)

| Championnat    | ID  |
| -------------- | --- |
| Ligue 1        | 61  |
| Premier League | 39  |
| La Liga        | 140 |
| Serie A        | 135 |
| Bundesliga     | 78  |
| National       | 63  |

## ⚙️ Personnalisation

### Ajouter un championnat

1. Dupliquer un nœud "API xxx"
2. Changer le `league` ID dans les query parameters
3. Connecter au nœud "Merge All Leagues"

### Changer la fréquence

1. Ouvrir le nœud "Cron 30min"
2. Modifier l'intervalle (ex: `15` pour 15 minutes)

### Étendre la plage de dates

Dans les nœuds API, modifier :

- `from`: `$now.minus({ days: X })`
- `to`: `$now.plus({ days: Y })`

## 🔧 Dépannage

### Erreur "Rate limit"

- API-Football a des limites selon votre plan
- Réduire la fréquence du cron ou le nombre de championnats

### Erreur Supabase "permission denied"

- Utiliser la clé `service_role`, pas `anon`
- Vérifier les policies RLS

### Pas de données

- Vérifier que la saison est correcte (2024 = saison 2024-25)
- Certains championnats peuvent être en trêve

## 📝 Logs Discord

### Succès

```
✅ SportUnion Sync Complete
📊 Matches: 45
🏟️ Competitions: 6
⏰ 16/01/2026 14:30
```

### Erreur

```
❌ SportUnion Sync Error
🔴 Node: Upsert Matches
💬 Error: duplicate key value violates unique constraint
⏰ 16/01/2026 14:30
```
