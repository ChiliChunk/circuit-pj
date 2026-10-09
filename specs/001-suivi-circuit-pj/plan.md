# Plan technique — Suivi des pièces justificatives d'un circuit de validation

**Spec source** : `specs/001-suivi-circuit-pj/spec.md` (statut : Validée)
**Statut** : Validé
**Date** : 2026-08-24

> Ce document répond au **comment**. Il ne réinvente aucun besoin : tout ce
> qu'il construit doit se rattacher à un critère d'acceptation de la spec.

---

## 1. Conformité à la constitution

| Article | Respecté | Justification si non |
|---------|----------|-----------------------|
| I — Spec fait foi | Oui | — |
| II — Habilitation explicite | Oui, avec réserve | Le contrôle serveur de l'habilitation « Consultation des circuits de validation PJ » est réel (403 si absente). Mais l'identité de l'utilisateur courant est simulée en v1, faute de fonctionnalité d'authentification spécifiée — voir D3 et section Risques. |
| III — Historisation non falsifiable | Oui | La fonctionnalité est strictement en lecture : aucune action d'écriture sur l'historique n'est exposée (conforme au périmètre exclu de la spec). |
| IV — Statut jamais ambigu | Oui | Statut toujours affiché en texte (CA1.2), absence de date explicite (CA1.5), absence d'historique explicite (CA3.3). |
| V — Accessibilité RGAA | Oui | Voir section 7 (stratégie de test) et section 6 (décision D4). |
| VI — Typage strict | Oui | TypeScript strict front et back ; validation de schéma aux frontières (section 5). |
| VII — Logique testée | Oui | Voir section 7. |
| VIII — Frugalité | Oui | Deux dépendances évitées explicitement : Angular Material (D4) et un moteur de base de données (D2). |

## 2. Vue d'ensemble

```
[Angular SPA] --HTTP JSON--> [API Express]
                                   |
                         jeu de données fixe
                        (fichier JSON en mémoire)
```

Une application Angular (une seule page, pas de routage complexe requis pour
3 scénarios) appelle une API Express minimale. Aucune base de données en v1
(voir D2) : le serveur charge un jeu de données fixe au démarrage.

L'identification du circuit et de l'habilitation du gestionnaire est
entièrement portée par le serveur (aucun paramètre de circuit ou de
collectivité n'est envoyé par le client, conformément au périmètre exclu de
la spec — un seul circuit par gestionnaire).

## 3. Stack et dépendances

| Dépendance | Rôle | Poids | Alternative écartée et pourquoi |
|------------|------|-------|----------------------------------|
| Angular (CLI, dernière LTS) | Framework frontend | Imposé par le contexte technique du projet (`CLAUDE.md`) | — |
| Express | Serveur HTTP backend | Faible | Node `http` natif écarté : réécrire le routage à la main coûterait plus cher que la dépendance pour ce périmètre. |
| Zod | Validation des données aux frontières (article VI) | Faible | Validation manuelle écrite à la main écartée : source d'erreurs répétitive dès qu'un champ change. |
| — (aucune librairie de composants UI) | — | — | Angular Material écarté pour cette version (voir D4) : 4 zones d'interface simples (tableau, recherche, filtre, panneau détail) ne justifient pas son poids. |
| — (aucun ORM / moteur de base de données) | — | — | Voir D2 : anticiperait un besoin non spécifié. |
| Runner de test intégré à Node.js (`node:test`) | Tests backend | Aucune dépendance ajoutée | Jest écarté pour le backend : le runner intégré suffit pour la surface de test de cette fonctionnalité. |
| Vitest (outillage par défaut du builder `@angular/build:unit-test` en Angular 22) | Tests frontend | Déjà fourni par Angular CLI | Écart constaté à l'implémentation (T003) : ce plan prévoyait initialement Jasmine/Karma, outillage historique d'Angular. La version 22 générée par le CLI utilise Vitest par défaut. Pas d'alternative introduite : éviter une dépendance de test supplémentaire (article VIII). |

## 4. Modèle de données

### PieceJustificative (résumé, utilisé dans la liste — S1)

| Champ | Type | Obligatoire | Source |
|-------|------|-------------|--------|
| reference | string | Oui (identifiant unique) | Jeu de données fixe |
| libelle | string | Oui | Jeu de données fixe |
| dateDepot | string (date ISO 8601) \| null | Non — `null` explicite si absente (CA1.5) | Jeu de données fixe |
| statut | énumération : `NonValidee` \| `EnCoursValidation` \| `Validee` \| `Refusee` \| `Suspendue` | Oui | Jeu de données fixe |

### PieceJustificativeDetail (S3, étend le résumé)

| Champ | Type | Obligatoire | Source |
|-------|------|-------------|--------|
| historique | `HistoriqueEntree[]` | Oui (tableau vide si aucun changement — CA3.3) | Jeu de données fixe |

### HistoriqueEntree

| Champ | Type | Obligatoire | Source |
|-------|------|-------------|--------|
| date | string (date-heure ISO 8601) | Oui | Jeu de données fixe |
| statut | même énumération que ci-dessus | Oui | Jeu de données fixe |
| auteur | string | Oui | Jeu de données fixe |
| motif | string \| absent | Non — absent (pas `null`) quand aucun motif n'existe (CA3.2) | Jeu de données fixe |

## 5. Contrats d'interface

### `GET /api/pieces-justificatives`

- Réponse `200` : `PieceJustificative[]` — l'ensemble des PJ du circuit du
  gestionnaire authentifié. Aucun paramètre de filtre/tri/recherche : ces
  opérations sont faites côté client (D1).
- Réponse `403` : habilitation « Consultation des circuits de validation PJ »
  absente pour l'utilisateur courant (couvre CA1.6 et le cas limite associé).

### `GET /api/pieces-justificatives/:reference`

- Réponse `200` : `PieceJustificativeDetail`.
- Réponse `404` : référence inconnue.
- Réponse `403` : même contrôle d'habilitation que ci-dessus.

Toute réponse est validée côté client avec un schéma Zod avant d'entrer dans
le domaine applicatif (article VI). Toute erreur réseau ou 5xx est traduite
en message explicite côté interface (cas limite « erreur de chargement »).

## 6. Décisions d'architecture

### D1 — Filtrage, tri et recherche côté client

- **Contexte** : le volume attendu est faible — quelques PJ au maximum par
  circuit (spec, section 5 et point 3 des clarifications).
- **Options envisagées** : (a) endpoints paramétrés côté serveur (filtre,
  tri, recherche en query params) ; (b) un seul appel récupère la liste
  complète, le traitement se fait côté client.
- **Décision** : (b).
- **Conséquences acceptées** : cette approche ne tiendrait pas si le volume
  augmentait significativement. À revoir si le point 3 de la spec est un
  jour amendé.

### D2 — Pas de base de données en v1

- **Contexte** : aucune fonctionnalité d'écriture n'existe encore (cette
  fonctionnalité est purement consultative). Introduire une base de données
  maintenant anticiperait un besoin non spécifié.
- **Options envisagées** : (a) base de données relationnelle dès
  maintenant ; (b) jeu de données fixe (fichier JSON) chargé en mémoire au
  démarrage du serveur.
- **Décision** : (b).
- **Conséquences acceptées** : les données ne survivent pas à un redémarrage
  du serveur. Ce point sera retravaillé dès qu'une fonctionnalité d'écriture
  (validation, rejet, etc.) sera spécifiée — non traité ici par anticipation.

### D3 — Identité et habilitation simulées

- **Contexte** : la spec exige un contrôle d'habilitation (CA1.6) mais aucune
  fonctionnalité d'authentification n'a été spécifiée à ce jour. Construire
  une authentification complète ici ajouterait un besoin non demandé par la
  spec 001.
- **Options envisagées** : (a) construire une authentification complète
  maintenant, hors périmètre de la spec ; (b) simuler un utilisateur courant
  fixe côté serveur (avec ou sans l'habilitation requise, au choix d'une
  configuration locale), pour permettre de vérifier réellement CA1.6 et le
  cas limite associé.
- **Décision** : (b), avec un marqueur explicite dans le code (nom de
  fichier et commentaire) indiquant que ceci est un stub temporaire à
  remplacer.
- **Conséquences acceptées** : gap volontairement non résolu, signalé aussi
  en section Risques. Une fonctionnalité d'authentification réelle devra
  être spécifiée séparément avant tout usage au-delà de la démonstration
  pédagogique.

### D4 — Pas de bibliothèque de composants UI tierce

- **Contexte** : l'interface se limite à un tableau, un champ de recherche,
  un filtre et un panneau de détail.
- **Options envisagées** : (a) Angular Material ; (b) HTML natif stylé,
  sans dépendance supplémentaire.
- **Décision** : (b) pour cette version.
- **Conséquences acceptées** : à réévaluer si le nombre d'écrans ou de
  composants grandit dans une fonctionnalité future (article VIII).

## 7. Stratégie de test

**Testé unitairement (backend, `node:test`)** :
- 403 quand l'habilitation est absente ; 200 quand elle est présente.
- 404 sur une référence de PJ inconnue.
- Forme des données renvoyées conforme au modèle (section 4).

**Testé unitairement (frontend, Vitest)** :
- Recherche insensible à la casse et aux accents (CA2.3).
- Filtre par statut, y compris sélection multiple (CA1.3).
- Tri par date de dépôt, croissant et décroissant (CA1.4).
- Affichage explicite d'une date de dépôt absente (CA1.5).
- Affichage conditionnel du motif dans l'historique (CA3.2).
- Conservation du filtre/tri/recherche à la fermeture du détail (CA3.4).

**Vérifié manuellement** :
- Rendu du statut en toutes lettres, jamais par une couleur seule (CA1.2).
- Navigation complète au clavier sur les 4 zones d'interface (article V).
- Message d'état vide (« aucune pièce justificative ») et message d'erreur
  réseau (cas limites, section 5 de la spec).

**Non couvert, explicitement** :
- Tests de charge/performance : aucun seuil chiffré n'est imposé par la spec
  (point 4 des clarifications).
- Audit d'accessibilité automatisé : aucun outil dédié introduit en v1 par
  frugalité (article VIII) ; vérification manuelle uniquement pour l'instant.

## 8. Risques

| Risque | Probabilité | Impact | Parade |
|--------|-------------|--------|--------|
| L'identité simulée (D3) est prise pour une vraie authentification et le stub reste en l'état au-delà de la démo | Moyenne | Élevé | Marqueur explicite dans le code et dans ce plan ; ne pas déployer au-delà d'un usage pédagogique sans fonctionnalité d'authentification réelle spécifiée séparément. |
| Le volume réel de PJ dépasse l'hypothèse « quelques unités par circuit » | Faible (contexte démo) | Moyen | Revoir D1 (passer le filtrage/tri/recherche côté serveur) si le point 3 de la spec est amendé. |
| Le jeu de données fixe (D2) ne reflète pas fidèlement un futur modèle de données réel | Moyenne | Moyen | Modèle de données (section 4) volontairement minimal et documenté pour faciliter une migration vers une vraie persistance. |
