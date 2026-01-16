# n8n Workflow - SportUnion Sync

Workflow n8n pour synchroniser les données de matchs depuis API-Football vers Supabase.

## 📋 Fonctionnalités

- ⏰ **Cron 30min** : Exécution automatique toutes les 30 minutes
- ⚽ **6 championnats** : Ligue 1, Premier League, La Liga, Serie A, Bundesliga, National
- 🔄 **Upsert intelligent** : Mise à jour ou création des données
- 📊 **Parse complet** : Matches, équipes, compétitions
- 🔔 **Notifications Discord** : Succès et erreurs

## 🚀 Installation

### 1. Importer le workflow

1. Ouvrir n8n
2. Aller dans **Workflows** → **Import from File**
3. Sélectionner `sportunion-sync-workflow.json`

### 2. Configurer les credentials

#### API-Football

1. Créer un compte sur [api-football.com](https://www.api-football.com/)
2. Dans n8n : **Credentials** → **New** → **Header Auth**
3. Configurer :
   - **Name**: `API-Football`
   - **Header Name**: `x-apisports-key`
   - **Header Value**: `VOTRE_API_KEY`

#### Supabase

1. Dans n8n : **Credentials** → **New** → **Supabase API**
2. Configurer :
   - **Name**: `Supabase SportUnion`
   - **Host**: `https://votre-projet.supabase.co`
   - **Service Role Key**: Votre clé `service_role` (pas anon!)

#### Discord Webhook

1. Dans Discord : **Paramètres serveur** → **Intégrations** → **Webhooks** → **Nouveau webhook**
2. Copier l'URL du webhook
3. Dans n8n : **Credentials** → **New** → **Query Auth**
4. Configurer :
   - **Name**: `Discord Webhook`
   - **Parameter Name**: `webhookUrl`
   - **Parameter Value**: `URL_DU_WEBHOOK`

### 3. Mettre à jour les IDs de credentials

Dans le workflow importé, remplacer :
- `API_FOOTBALL_CREDENTIAL_ID` → ID de votre credential API-Football
- `SUPABASE_CREDENTIAL_ID` → ID de votre credential Supabase
- `DISCORD_WEBHOOK_CREDENTIAL_ID` → ID de votre credential Discord

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

| Championnat | ID |
|------------|-----|
| Ligue 1 | 61 |
| Premier League | 39 |
| La Liga | 140 |
| Serie A | 135 |
| Bundesliga | 78 |
| National | 63 |

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
