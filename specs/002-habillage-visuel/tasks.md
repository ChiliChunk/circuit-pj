# Tâches — Habillage visuel de l'écran de suivi des circuits de validation PJ

**Spec source** : `specs/002-habillage-visuel/spec.md` (statut : Validée)
**Plan source** : `specs/002-habillage-visuel/plan.md` (statut : Validé)
**Date** : 2026-08-24

> Chaque tâche est atomique, ordonnée, et rattachée à un critère
> d'acceptation. Une tâche sans rattachement n'existe pas, sauf mention
> explicite **fondation** — auquel cas elle rend possible les tâches
> suivantes plutôt que de couvrir un critère directement.

Légende : `[P]` = parallélisable avec les tâches voisines portant la même
marque.

---

## Lot 0 — Socle

- [x] **T001** — Déclarer la pile de polices système (plan, D2)
  - Fichiers : `frontend/src/styles.css`
  - Dépend de : —
  - Couvre : — (fondation, prérequis de CA2.1)
  - Terminé quand : la famille de police de l'application est définie par
    un jeton unique, sans fichier de police ni requête réseau externe
    (vérifiable dans l'onglet réseau du navigateur).

- [x] **T002** — Intégrer le logo générique de l'application (plan, D3) `[P]`
  - Fichiers : `frontend/public/img/logo.svg`, `frontend/src/app/app.html`,
    `frontend/src/styles.css`
  - Dépend de : —
  - Couvre : — (fondation, exigence non fonctionnelle « Identité visuelle »)
  - Terminé quand : le logo s'affiche dans l'en-tête de l'application à une
    taille lisible, sans déformation.

- [x] **T003** — Déclarer les jetons de présentation CSS (plan, D1/D4)
  - Fichiers : `frontend/src/styles.css`
  - Dépend de : T001
  - Couvre : — (fondation, prépare CA1.1, CA2.1, CA2.3)
  - Terminé quand : toutes les propriétés personnalisées de la section 4 du
    plan (couleurs, fonds, famille de police) existent et sont utilisables
    depuis n'importe quel composant.

---

## Lot 1 — Distinction des statuts (S1)

- [x] **T010** — Fonction de mapping statut → catégorie visuelle (plan, D4)
  - Fichiers :
    `frontend/src/app/pieces-justificatives/categorie-statut.ts`,
    `categorie-statut.spec.ts`, classes CSS de badge dans `styles.css`
  - Dépend de : T003
  - Couvre : — (fondation, prépare CA1.1, CA1.2, CA3.1)
  - Terminé quand : la fonction retourne la bonne catégorie (neutre,
    primaire, succès, information, avertissement) pour chacun des 5
    statuts existants, vérifié par un test unitaire ; les classes CSS
    correspondantes existent.

- [x] **T011** — Appliquer le badge de statut dans la liste `[P]`
  - Fichiers :
    `frontend/src/app/pieces-justificatives/liste/liste.component.html`
  - Dépend de : T010
  - Couvre : CA1.1, CA1.2
  - Terminé quand : chaque ligne affiche un badge coloré selon la
    catégorie du statut, avec le texte du statut toujours visible en
    toutes lettres (le badge s'ajoute au texte, ne le remplace jamais).

- [x] **T012** — Appliquer le badge de statut dans l'historique du détail `[P]`
  - Fichiers :
    `frontend/src/app/pieces-justificatives/detail/detail.component.html`
  - Dépend de : T010
  - Couvre : CA1.1
  - Terminé quand : chaque entrée d'historique affiche le même traitement
    de badge que la liste, pour le statut atteint à cette entrée.

---

## Lot 2 — Lisibilité (S2)

- [x] **T020** — Hiérarchie typographique
  - Fichiers : `frontend/src/styles.css`,
    `liste/liste.component.html`, `detail/detail.component.html`
  - Dépend de : T003
  - Couvre : CA2.1
  - Terminé quand : titres, libellés de colonnes et contenu se
    distinguent visuellement par taille ou poids, selon l'échelle
    typographique du plan.

- [x] **T021** — Espacement et séparation visuelle des lignes/entrées `[P]`
  - Fichiers : `liste/liste.component.html` (ou `.css` dédié),
    `detail/detail.component.html`
  - Dépend de : T003
  - Couvre : CA2.2
  - Terminé quand : les lignes de la liste et les entrées de l'historique
    sont visuellement séparées (espacement ou séparateur), sans ambiguïté
    sur le début/la fin de chaque ligne.

- [x] **T022** — Vérification du contraste global de l'écran
  - Fichiers : `frontend/src/styles.css` (2 ajustements de couleur)
  - Dépend de : T010, T011, T012, T020, T021
  - Couvre : CA1.3, CA2.3
  - Terminé quand : chaque combinaison texte/fond de l'écran (y compris
    chaque badge de statut) atteint le contraste AA du RGAA, mesuré ; la
    distinction entre statuts reste perceptible en simulation de
    daltonisme rouge-vert.
  - **Note de vérification** : contraste mesuré programmatiquement (formule
    WCAG) dans le navigateur réel sur chaque badge et message d'état. Deux
    échecs réels trouvés et corrigés : `.badge--succes` (4,19:1, sous le
    seuil 4,5:1 AA) → assombri à `#166042`, 5,79:1 ; `.message-etat--alerte`
    (4,42:1) → assombri à `#a2172a`, 6,14:1. Après correction : badges
    5,71–14,87:1, messages d'état 6,14–7,78:1, titre d'en-tête 8,31:1,
    en-têtes de colonnes 8,49:1, cellules 16,67:1 — tous ≥ 4,5:1.
    Distinction daltonienne : simulation de déutéranopie appliquée aux 5
    fonds de badge — « non validée » et « refusée » restent proches en
    teinte simulée (elles sont toutes deux catégorisées en gris
    neutre/information), mais restent
    distinguables par leur texte, jamais identique (CA1.2 garantit le texte
    toujours visible, ce qui satisfait structurellement CA1.3).

---

## Lot 3 — Cohérence des contrôles (S3)

- [x] **T030** — Apparence cohérente des boutons, champs et cases
  - Fichiers : `frontend/src/styles.css`
  - Dépend de : T003
  - Couvre : CA3.1
  - Terminé quand : un même type de contrôle (bouton, champ de recherche,
    case de filtre) a la même apparence dans la liste, le filtre, la
    recherche et le détail.

- [x] **T031** — États interactifs cohérents (survol, focus clavier) `[P]`
  - Fichiers : `frontend/src/styles.css`
  - Dépend de : T030
  - Couvre : CA3.2
  - Terminé quand : le survol et le focus clavier de chaque contrôle sont
    visuellement indiqués, avec le même traitement partout dans l'écran.

---

## Lot 4 — Messages d'état

- [x] **T040** — Traitement visuel distinct des messages d'état
  - Fichiers : `liste/liste.component.html`, `detail/detail.component.html`
  - Dépend de : T003
  - Couvre : cas limite « messages d'état » (spec, section 5 ; décision du
    point 3 des clarifications)
  - Terminé quand : les messages d'erreur et d'accès refusé portent un
    traitement visuel « alerte » distinct du traitement neutre des états
    vides ou de chargement.

---

## Lot 5 — Non-régression et vérification finale

- [x] **T050** — Non-régression de la fonctionnalité 001
  - Fichiers : — (exécution des suites de tests existantes, aucun fichier
    modifié sauf sélecteurs de test si un changement de markup l'exige)
  - Dépend de : T011, T012, T020, T021, T030, T031, T040
  - Couvre : exigence non fonctionnelle « Non-régression » (spec, section 6)
  - Terminé quand : la suite de tests backend (6 tests) et frontend (12
    tests) de la fonctionnalité 001 passe intégralement, sans changement
    de logique.

- [x] **T051** — Vérification croisée finale
  - Fichiers : — (vérification, aucun fichier modifié)
  - Dépend de : T022, T050
  - Couvre : CA1.1 à CA3.2 (vérification globale, rejeu manuel)
  - Terminé quand : chaque critère d'acceptation de la spec 002 est rejoué
    dans l'application réellement lancée et coché comme vérifié.
  - **Note de vérification** : backend et frontend relancés, rejoué dans
    un navigateur réel après les correctifs de contraste de T022. Logo
    générique et titre affichés en en-tête (D3) ; badge coloré sur
    chaque statut, texte toujours visible en toutes lettres (CA1.1, CA1.2) ;
    hiérarchie typographique et séparation des lignes/entrées visibles
    (CA2.1, CA2.2) ; contraste AA mesuré partout (CA2.3, voir T022) ;
    contrôles (boutons, case, recherche) à l'apparence et aux états
    survol/focus cohérents sur les quatre zones (CA3.1, CA3.2). Suite de
    tests 001 intégralement verte après les changements (T050).

---

## Suivi

| Lot | Tâches | Terminées | État |
|-----|--------|-----------|------|
| 0   | T001–T003 | 3/3 | Terminé |
| 1   | T010–T012 | 3/3 | Terminé |
| 2   | T020–T022 | 3/3 | Terminé |
| 3   | T030–T031 | 2/2 | Terminé |
| 4   | T040      | 1/1 | Terminé |
| 5   | T050–T051 | 2/2 | Terminé |
