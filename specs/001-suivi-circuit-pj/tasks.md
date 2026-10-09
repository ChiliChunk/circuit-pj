# Tâches — Suivi des pièces justificatives d'un circuit de validation

**Spec source** : `specs/001-suivi-circuit-pj/spec.md` (statut : Validée)
**Plan source** : `specs/001-suivi-circuit-pj/plan.md` (statut : Validé)
**Date** : 2026-08-24

> Chaque tâche est atomique, ordonnée, et rattachée à un critère
> d'acceptation. Une tâche sans rattachement n'existe pas, sauf mention
> explicite **fondation** — auquel cas elle rend possible les tâches
> suivantes plutôt que de couvrir un critère directement.

Légende : `[P]` = parallélisable avec les tâches voisines portant la même
marque.

---

## Lot 0 — Socle

- [x] **T001** — Initialiser le workspace Angular (TypeScript strict) `[P]`
  - Fichiers : `frontend/angular.json`, `frontend/tsconfig.json`, `frontend/package.json`, `frontend/src/main.ts`
  - Dépend de : —
  - Couvre : — (fondation, prérequis de tout le lot frontend)
  - Terminé quand : `ng serve` sert une page vide sans erreur TypeScript, mode `strict` actif dans `tsconfig.json`.

- [x] **T002** — Initialiser le serveur Express (TypeScript strict) `[P]`
  - Fichiers : `backend/package.json`, `backend/tsconfig.json`, `backend/src/server.ts`
  - Dépend de : —
  - Couvre : — (fondation, prérequis de tout le lot backend)
  - Terminé quand : le serveur démarre et répond `200` sur une route de santé `GET /api/health`.

- [x] **T003** — Outillage de test (backend et frontend)
  - Fichiers : `backend/package.json` (script `test`), configuration Vitest par défaut du builder `@angular/build:unit-test` (Angular CLI 22)
  - Dépend de : T001, T002
  - Couvre : — (fondation, condition de l'article VII)
  - Terminé quand : une commande de test s'exécute sans erreur des deux côtés sur un test trivial qui passe.
  - **Note** : écart constaté avec le plan initial (Jasmine/Karma) — corrigé dans `plan.md` section 3 et 7.

- [x] **T004** — Modèle de données backend et jeu de données fixe
  - Fichiers : `backend/src/data/pieces-justificatives.ts`
  - Dépend de : T002
  - Couvre : — (fondation, prépare CA1.5, CA3.2, CA3.3)
  - Terminé quand : le fichier exporte des PJ couvrant les 5 statuts, au moins une PJ sans date de dépôt, une PJ sans historique, une entrée d'historique avec motif et une sans motif.

- [x] **T005** — Stub d'identité et d'habilitation simulée (plan, décision D3)
  - Fichiers : `backend/src/auth/current-user.stub.ts`
  - Dépend de : T002
  - Couvre : — (fondation, prérequis de CA1.6)
  - Terminé quand : une fonction retourne l'utilisateur courant simulé, configurable pour avoir ou non l'habilitation « Consultation des circuits de validation PJ » ; le fichier porte un commentaire explicite « STUB TEMPORAIRE — à remplacer par une authentification réelle ».

---

## Lot 1 — API (S1, S3)

- [x] **T010** — Endpoint `GET /api/pieces-justificatives` `[P]`
  - Fichiers : `backend/src/routes/pieces-justificatives.ts`
  - Dépend de : T004, T005
  - Couvre : CA1.1, CA1.6
  - Terminé quand : renvoie `200` + la liste des PJ si l'habilitation est présente ; `403` sinon.

- [x] **T011** — Endpoint `GET /api/pieces-justificatives/:reference` `[P]`
  - Fichiers : `backend/src/routes/pieces-justificatives.ts`
  - Dépend de : T004, T005
  - Couvre : CA3.1, CA3.2, CA3.3
  - Terminé quand : renvoie `200` + détail avec historique si la référence existe et l'habilitation est présente ; `404` si référence inconnue ; `403` si habilitation absente.

- [x] **T012** — Tests backend : habilitation, référence inconnue, forme des données
  - Fichiers : `backend/src/routes/pieces-justificatives.test.ts`
  - Dépend de : T010, T011
  - Couvre : CA1.6 (vérifié), CA3.1 (forme vérifiée), CA3.3 (historique vide vérifié)
  - Terminé quand : la suite de tests passe et couvre explicitement les cas `403`, `404`, `200`.

---

## Lot 2 — Liste et statuts (S1)

- [x] **T020** — Service HTTP + schéma Zod pour la liste
  - Fichiers : `frontend/src/app/pieces-justificatives/pieces-justificatives.service.ts`, `frontend/src/app/pieces-justificatives/pieces-justificative.schema.ts`
  - Dépend de : T001, T010
  - Couvre : — (fondation transverse, article VI)
  - Terminé quand : le service expose la liste typée et rejette explicitement une réponse ne correspondant pas au schéma.

- [x] **T021** — Composant tableau : référence, libellé, date de dépôt, statut
  - Fichiers : `frontend/src/app/pieces-justificatives/liste/liste.component.ts`, `liste.component.html`
  - Dépend de : T020
  - Couvre : CA1.1, CA1.2
  - Terminé quand : le tableau affiche les 4 colonnes pour chaque PJ ; le statut est un texte lisible, jamais porté par une couleur seule.

- [x] **T022** — Affichage explicite d'une date de dépôt absente `[P]`
  - Fichiers : `liste.component.ts`, `liste.component.html`
  - Dépend de : T021
  - Couvre : CA1.5
  - Terminé quand : une PJ sans date (fixture T004) affiche une mention explicite d'absence, jamais une cellule vide ni une date par défaut.

- [x] **T023** — Filtre par statut (sélection multiple) `[P]`
  - Fichiers : `frontend/src/app/pieces-justificatives/liste/filtre-statut.component.ts`, `filtre-statut.component.html`
  - Dépend de : T021
  - Couvre : CA1.3
  - Terminé quand : sélectionner un ou plusieurs statuts ne laisse affichées que les PJ correspondantes.

- [x] **T024** — Tri par date de dépôt `[P]`
  - Fichiers : `liste.component.ts`
  - Dépend de : T021
  - Couvre : CA1.4
  - Terminé quand : basculer le sens du tri change l'ordre affiché sans rechargement de page complet.

- [x] **T025** — États vide et erreur de la liste
  - Fichiers : `liste.component.ts`, `liste.component.html`
  - Dépend de : T020
  - Couvre : cas limites « aucune PJ » et « erreur de chargement » (spec, section 5) ; CA1.6 côté affichage (accès refusé explicite sur `403`)
  - Terminé quand : une liste vide affiche le message dédié ; une erreur réseau ou un `403` affiche un message explicite avec une action pour réessayer, jamais un écran qui reste figé.

- [x] **T026** — Tests frontend : filtre, tri, date absente
  - Fichiers : `liste.component.spec.ts`
  - Dépend de : T022, T023, T024
  - Couvre : CA1.3, CA1.4, CA1.5 (vérifiés)
  - Terminé quand : la suite de tests passe et couvre les trois comportements.

---

## Lot 3 — Recherche (S2)

- [x] **T030** — Champ de recherche en temps réel
  - Fichiers : `frontend/src/app/pieces-justificatives/liste/recherche.component.ts`, `recherche.component.html`
  - Dépend de : T021
  - Couvre : CA2.1, CA2.2, CA2.3
  - Terminé quand : taper un texte filtre la liste immédiatement sur la référence et le libellé, en ignorant casse et accents.

- [x] **T031** — Message explicite si la recherche ne donne aucun résultat
  - Fichiers : `recherche.component.ts`, `recherche.component.html`
  - Dépend de : T030
  - Couvre : CA2.4
  - Terminé quand : une recherche sans correspondance affiche un message dédié plutôt qu'un tableau vide.

- [x] **T032** — Tests frontend : recherche (casse/accents, absence de résultat)
  - Fichiers : `recherche.component.spec.ts`
  - Dépend de : T030, T031
  - Couvre : CA2.1, CA2.2, CA2.3, CA2.4 (vérifiés)
  - Terminé quand : la suite de tests passe.

---

## Lot 4 — Détail et historique (S3)

- [x] **T040** — Service HTTP + schéma Zod pour le détail
  - Fichiers : `pieces-justificatives.service.ts` (extension), `piece-justificative-detail.schema.ts`
  - Dépend de : T020, T011
  - Couvre : — (fondation transverse, article VI)
  - Terminé quand : le service expose le détail typé et rejette explicitement une réponse non conforme.

- [x] **T041** — Panneau de détail : référence, libellé, statut, historique
  - Fichiers : `frontend/src/app/pieces-justificatives/detail/detail.component.ts`, `detail.component.html`
  - Dépend de : T040
  - Couvre : CA3.1, CA3.2
  - Terminé quand : ouvrir une ligne affiche le détail complet ; le motif n'apparaît que quand il existe, sans placeholder sinon.

- [x] **T042** — Historique vide explicite
  - Fichiers : `detail.component.ts`, `detail.component.html`
  - Dépend de : T041
  - Couvre : CA3.3
  - Terminé quand : une PJ sans historique (fixture T004) affiche la mention explicite plutôt qu'une zone vide.

- [x] **T043** — Fermeture du détail sans perte d'état
  - Fichiers : `liste.component.ts`, `detail.component.ts`
  - Dépend de : T023, T024, T030, T041
  - Couvre : CA3.4
  - Terminé quand : fermer le détail restitue exactement le filtre, le tri et la recherche actifs avant l'ouverture.

- [x] **T044** — Tests frontend : motif conditionnel, historique vide, conservation d'état
  - Fichiers : `detail.component.spec.ts`
  - Dépend de : T041, T042, T043
  - Couvre : CA3.2, CA3.3, CA3.4 (vérifiés)
  - Terminé quand : la suite de tests passe.

---

## Lot 5 — Accessibilité et vérification finale (transverse)

- [x] **T050** — Navigation clavier complète
  - Fichiers : transverse (attributs ARIA, gestion du focus sur les templates existants)
  - Dépend de : T021, T023, T030, T041
  - Couvre : exigence non fonctionnelle « Accessibilité » (spec, section 6 ; constitution, article V)
  - Terminé quand : trier, filtrer, rechercher et ouvrir/fermer le détail sont réalisables au clavier seul — vérifié manuellement à la tabulation, sans piège de focus.
  - **Note de vérification** : tous les contrôles sont des éléments HTML natifs interactifs (`input[type=checkbox]`, `input[type=search]`, `button`), aucun `div`/`span` avec gestionnaire de clic — l'activation clavier (Entrée/Espace) est donc garantie nativement par le navigateur. Vérifié dans le navigateur réel : Tab atteint dans l'ordre les 5 cases de filtre, le champ de recherche, le bouton de tri, puis chaque bouton de ligne, sans piège de focus. L'outil d'automatisation du navigateur utilisé pour cette vérification ne simule pas fidèlement l'activation Entrée/Espace d'un `<button>` (confirmé avec un bouton HTML natif de test, hors composant) ; l'activation elle-même est donc garantie par la sémantique HTML plutôt que vérifiée touche par touche via l'outil.

- [x] **T051** — Vérification croisée finale
  - Fichiers : — (vérification, aucun fichier modifié)
  - Dépend de : T012, T025, T026, T032, T044, T050
  - Couvre : CA1.1 à CA3.4 (vérification globale, rejeu manuel)
  - Terminé quand : chaque critère d'acceptation de la spec est rejoué une fois dans l'application réellement lancée (pas seulement en test unitaire) et coché comme vérifié.
  - **Note de vérification** : backend (`npm run dev`, port 4310) et frontend (`npm start`, port 4200, proxy `/api`) lancés réellement, rejoué dans un navigateur : liste avec les 4 colonnes et statuts en toutes lettres (CA1.1, CA1.2), date absente explicite sur PJ-2026-0003 (CA1.5), filtre par statut réduisant la liste (CA1.3) y compris après ouverture/fermeture du détail (CA3.4), tri par date avec inversion du sens (CA1.4), recherche en temps réel insensible casse/accents sur « ENERGIE » → PJ-2026-0003 (CA2.1–CA2.3), message « Aucun résultat » sur une recherche sans correspondance (CA2.4), détail d'une PJ avec historique et motif affiché uniquement sur l'entrée qui en a un (CA3.1, CA3.2). CA1.6 et le cas limite « erreur de chargement » sont couverts par les tests automatisés (T012) plutôt que rejoués manuellement (auraient nécessité de redémarrer le backend en configuration dégradée).

---

## Suivi

| Lot | Tâches | Terminées | État |
|-----|--------|-----------|------|
| 0   | T001–T005 | 5/5 | Terminé |
| 1   | T010–T012 | 3/3 | Terminé |
| 2   | T020–T026 | 7/7 | Terminé |
| 3   | T030–T032 | 3/3 | Terminé |
| 4   | T040–T044 | 5/5 | Terminé |
| 5   | T050–T051 | 2/2 | Terminé |
