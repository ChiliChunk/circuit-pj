# CircuitPJ

Application de suivi des **pièces justificatives (PJ)** d'une collectivité
territoriale : liste des PJ, filtre par statut, recherche, tri par date de
dépôt et détail avec historique. Projet fictif, utilisé en formation à la
méthode **Spec-Driven Development (SDD)**.

- Backend : Node.js / Express (TypeScript), port `4310`.
- Frontend : Angular (TypeScript strict), port `4200`.

## Prérequis

- Node.js 22 ou supérieur (npm 10 inclus)
- Git
- Claude Code

## Installation

```bash
cd backend && npm ci
cd ../frontend && npm ci
```

## Lancer l'application

Dans deux terminaux, le backend en premier :

```bash
cd backend && npm run dev
```

```bash
cd frontend && npm start
```

Puis ouvrir http://localhost:4200.

## Lancer les tests

```bash
cd backend && npm test
cd frontend && npx ng test --watch=false
```

## Travailler avec la méthode SDD

Le projet est déjà équipé : la constitution est dans
`.specify/memory/constitution.md`, les commandes dans `.claude/commands/`.
Le détail de la méthode et l'état du projet sont dans `CLAUDE.md`.

Cycle en quatre phases, chacune relue et validée avant la suivante :

| Phase | Commande     | Produit                       |
|-------|--------------|-------------------------------|
| 1     | `/specify`   | `specs/<NNN>-<slug>/spec.md`  |
| 2     | `/plan`      | `specs/<NNN>-<slug>/plan.md`  |
| 3     | `/tasks`     | `specs/<NNN>-<slug>/tasks.md` |
| 4     | `/implement` | le code                       |

Les fonctionnalités `001` et `002` sont livrées et leurs specs servent
d'exemples (`specs/`). Votre formateur vous indiquera la fonctionnalité `003`
à spécifier.

Créez une branche pour votre travail avant de commencer :

```bash
git switch -c feat/003-<votre-nom>
```
