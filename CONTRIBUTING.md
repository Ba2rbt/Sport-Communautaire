# Contribution Guidelines

Merci de votre intérêt pour contribuer à la Plateforme Sport Communautaire ! 🏆

## 🚀 Comment contribuer

### 1. Fork et Clone

```bash
git clone https://github.com/votre-username/sport-communautaire.git
cd sport-communautaire
git remote add upstream https://github.com/original/sport-communautaire.git
```

### 2. Créer une branche

Toujours partir de `develop` :

```bash
git checkout develop
git pull upstream develop
git checkout -b feature/ma-nouvelle-fonctionnalite
```

**Convention de nommage des branches :**
- `feature/description` - Nouvelles fonctionnalités
- `fix/description` - Corrections de bugs
- `docs/description` - Documentation
- `refactor/description` - Refactoring

### 3. Développer

- Suivre les conventions de code (ESLint + Prettier)
- Ajouter des tests si nécessaire
- Mettre à jour la documentation

### 4. Commits

Utiliser les [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: ajouter le vote MVP en temps réel
fix: corriger l'affichage des scores sur mobile
docs: mettre à jour le README
style: formater le code avec Prettier
refactor: simplifier la logique de calcul des stats
test: ajouter tests pour le composant CardMatch
chore: mettre à jour les dépendances
```

### 5. Pull Request

1. Push votre branche
2. Créer une PR vers `develop`
3. Remplir le template de PR
4. Attendre la review

## 📋 Checklist avant PR

- [ ] Les tests passent (`npm run test`)
- [ ] Le linting passe (`npm run lint`)
- [ ] Le code est formaté (`npm run format`)
- [ ] Le type-check passe (`npm run type-check`)
- [ ] La PR est descriptive

## 🎯 Code Style

- TypeScript strict
- Composants fonctionnels React
- Tailwind CSS pour le styling
- Zod pour la validation
- TanStack Query pour le data fetching

## 💬 Questions ?

Ouvrir une issue ou rejoindre les discussions GitHub.
