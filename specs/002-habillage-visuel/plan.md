# Plan technique — Habillage visuel de l'écran de suivi des circuits de validation PJ

**Spec source** : `specs/002-habillage-visuel/spec.md` (statut : Validée)
**Statut** : Validé
**Date** : 2026-08-24

> Ce document répond au **comment**. Il ne réinvente aucun besoin : tout ce
> qu'il construit doit se rattacher à un critère d'acceptation de la spec.

---

## 1. Conformité à la constitution

| Article | Respecté | Justification si non |
|---------|----------|-----------------------|
| I — Spec fait foi | Oui | — |
| II — Habilitation explicite | Sans objet | Aucune action ni donnée nouvelle ; cette fonctionnalité ne touche que la présentation. |
| III — Historisation non falsifiable | Sans objet | Aucun changement à l'historique ou à sa lecture. |
| IV — Statut jamais ambigu | Oui | CA1.1/CA1.2 : la couleur s'ajoute au texte du statut, elle ne le remplace jamais. |
| V — Accessibilité RGAA | Oui | Central à cette fonctionnalité — voir CA1.3, CA2.3 et section 7. |
| VI — Typage strict | Oui | Aucune nouvelle logique TypeScript ; le peu de code de présentation ajouté (classes utilitaires) reste typé comme le reste du frontend. |
| VII — Logique testée | Oui | Aucune nouvelle règle métier. La suite de tests existante (T012, T026, T032, T044 de la fonctionnalité 001) sert de garde de non-régression. |
| VIII — Frugalité | Oui | Voir D1 : pas de paquet de charte graphique importé, pas de librairie de composants ajoutée (prolonge la décision D4 de la fonctionnalité 001). |

## 2. Vue d'ensemble

Un fichier de jetons de présentation (couleurs, typographie) centralisé,
appliqué en CSS aux composants déjà livrés par la fonctionnalité 001. Aucun
changement de structure HTML des composants au-delà de l'ajout de classes
CSS ; aucun changement de logique TypeScript, de route API ou de modèle de
données.

## 3. Stack et dépendances

| Dépendance | Rôle | Poids | Alternative écartée et pourquoi |
|------------|------|-------|----------------------------------|
| — (CSS natif, aucune dépendance npm ajoutée) | Jetons de couleur en propriétés personnalisées CSS (`--nom: valeur`) | Nul | SCSS écarté : aucune fonctionnalité de préprocesseur (imbrication, mixins) n'est nécessaire pour un jeu de jetons plat ; ajouter un préprocesseur pour ce seul besoin violerait l'article VIII. |
| — (pile de polices système, aucun fichier) | Typographie de l'application (D2) | Nul | Police web (auto-hébergée ou CDN) écartée : fichier ou dépendance réseau supplémentaire sans critère d'acceptation qui l'exige (article VIII). |
| `logo.svg`, fichier statique | Logo générique dans l'en-tête (D3) | < 1 Ko | Logo de marque écarté : l'interface doit rester neutre (spec, section 6). |

## 4. Modèle de données

Aucun changement au modèle de données métier (le backend n'est pas modifié
par cette fonctionnalité). Nouveaux jetons de présentation, sans lien avec
le domaine :

| Jeton | Valeur | Usage |
|-------|--------|-------|
| `--couleur-primaire` | `#1F4E8C` | Accents, focus, catégorie « en cours de validation » |
| `--couleur-succes` | `#1B7852` | Catégorie « validée » |
| `--couleur-avertissement` | `#F3A209` | Catégorie « suspendue » |
| `--couleur-danger` | `#CA1D34` | Messages d'erreur / accès refusé |
| `--couleur-neutre` | `#E0E0E0` | Catégorie « non validée » et éléments neutres |
| `--fond-primaire` | `#DBE7F6` | Fond du badge « en cours de validation » |
| `--fond-succes` | `#C5EAD8` | Fond du badge « validée » |
| `--fond-avertissement` | `#FFDEB2` | Fond du badge « suspendue » |
| `--fond-info` | `#EDEDED` | Fond du badge « refusée » |
| `--famille-police` | `system-ui, -apple-system, 'Segoe UI', Arial, sans-serif` | Texte de l'application (voir D2) |

## 5. Contrats d'interface

Aucun changement : les endpoints, formats de requête/réponse et paramètres
définis par la fonctionnalité 001 restent inchangés.

## 6. Décisions d'architecture

### D1 — Jetons CSS locaux, pas de paquet de charte graphique

- **Contexte** : l'interface doit rester neutre et générique (spec,
  section 6). L'article VIII interdit une dépendance non justifiée.
- **Options envisagées** : (a) importer un paquet de thème ou une
  bibliothèque de composants ; (b) déclarer quelques jetons CSS locaux
  (une couleur d'accent, des couleurs de statut conventionnelles).
- **Décision** : (b).
- **Conséquences acceptées** : aucune charte externe à suivre ; les valeurs
  se changent en un seul endroit (`styles.css`) si une collectivité veut sa
  propre identité.

### D2 — Typographie : pile de polices système

- **Contexte** : aucun critère d'acceptation n'exige une police
  particulière ; CA2.1 demande seulement une hiérarchie par taille et par
  poids.
- **Options envisagées** : (a) télécharger et auto-héberger une police web
  (fichiers `.woff2` à ajouter au dépôt) ; (b) pile de polices système,
  sans fichier ni téléchargement.
- **Décision** : (b).
- **Conséquences acceptées** : le rendu varie légèrement d'un système à
  l'autre (Segoe UI sous Windows, San Francisco sous macOS) ; sans
  incidence sur les critères d'acceptation.

### D3 — Logo générique ; aucune police d'icônes

- **Contexte** : l'en-tête doit porter une identité minimale (un logo et le
  nom de l'application) sans renvoyer à une organisation particulière.
- **Options envisagées** : (a) logo d'une organisation existante ; (b) logo
  générique dessiné pour l'application (un document validé), en SVG ;
  (c) pas de logo.
- **Décision** : (b) — `logo.svg`, décoratif (`alt` vide : le nom de
  l'application s'affiche en texte juste à côté). Aucune police d'icônes :
  aucun scénario ne demande d'icônes, l'ajouter introduirait un besoin non
  spécifié, contraire à la règle « le plan n'ajoute aucun besoin ».
- **Conséquences acceptées** : le logo est un simple pictogramme, à
  remplacer par celui de la collectivité si besoin.

### D4 — Couleur de statut selon une catégorisation sémantique standard

- **Contexte** : CA1.1 exige une catégorie visuelle propre à chaque
  statut, selon des conventions courantes (neutre, accent, succès,
  information, avertissement).
- **Options envisagées** : (a) icône ou forme seule, sans couleur ; (b) un
  couple fond/texte par catégorie, avec le texte du statut toujours
  affiché (CA1.2).
- **Décision** : (b).
- **Correspondance retenue** (statut de la fonctionnalité 001 → catégorie →
  jetons de la section 4) :
  | Statut | Catégorie | Fond | Accent texte |
  |--------|-----------|------|--------------|
  | Non validée | Neutre | `--couleur-neutre` | — |
  | En cours de validation | Primaire | `--fond-primaire` | `--couleur-primaire` |
  | Validée | Succès | `--fond-succes` | `--couleur-succes` |
  | Refusée | Information | `--fond-info` | — |
  | Suspendue | Avertissement | `--fond-avertissement` | `--couleur-avertissement` |
- **Conséquences acceptées** : les fonds retenus sont clairs (pastel) ; le
  texte reste en couleur sombre standard par-dessus (jamais de texte blanc
  sur ces fonds), à vérifier au contraste (CA2.3).

## 7. Stratégie de test

**Non-régression (priorité)** : la suite de tests existante de la
fonctionnalité 001 (6 tests backend, 12 tests frontend) doit continuer à
passer sans modification de logique — seuls des ajustements de sélecteurs
CSS/markup non structurels sont attendus si nécessaire.

**Vérifié manuellement** :
- Contraste texte/fond mesuré pour chaque combinaison de la table D4
  (CA2.3, RGAA AA).
- Distinction des statuts perceptible en simulation de daltonisme
  rouge-vert (CA1.3).
- Cohérence visuelle des contrôles (boutons, champs, cases) sur les quatre
  zones de l'écran (CA3.1, CA3.2).

**Non couvert, explicitement** :
- Audit d'accessibilité automatisé ou outil de mesure de contraste
  dédié : aucun introduit, par frugalité (article VIII) — mesure manuelle
  uniquement.

## 8. Risques

| Risque | Probabilité | Impact | Parade |
|--------|-------------|--------|--------|
| Une couleur de statut ou d'accent échoue au contraste AA une fois combinée à son fond (D1, D4) | Moyenne | Moyen (article V) | Contraste mesuré pour chaque combinaison en T022 ; assombrir la couleur de texte, à teinte égale, en cas d'échec. |
| Le logo générique ressemble à celui d'un produit existant (D3) | Faible | Faible | Pictogramme volontairement simple (document + coche) ; à remplacer en cas de doute. |
