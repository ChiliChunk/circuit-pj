# Spécification — Habillage visuel de l'écran de suivi des circuits de validation PJ

**Identifiant** : 002-habillage-visuel
**Statut** : Validée
**Date** : 2026-08-24

> Ce document décrit **ce que** le système doit faire et **pourquoi**.
> Il ne contient aucun choix technique : pas de librairie, pas d'architecture,
> pas de nom de fonction. Ces sujets appartiennent à `plan.md`.

---

## 1. Problème

L'écran de suivi livré par la fonctionnalité 001 est fonctionnellement
complet mais visuellement à l'état brut (mise en forme minimale). Un
gestionnaire comptable qui l'utilise au quotidien a du mal à repérer
rapidement les statuts dans une liste dense, et l'aspect non fini nuit à la
confiance dans l'outil. Cette fonctionnalité habille visuellement les écrans
existants sans changer leur comportement.

## 2. Utilisateurs visés

Les mêmes gestionnaires comptables que la fonctionnalité 001 : usage
quotidien, poste de travail bureau, non informaticiens.

## 3. Périmètre exclu

- Ne modifie aucun comportement fonctionnel de la fonctionnalité 001 : pas de
  nouveau champ, pas de nouvelle action, pas de nouvel écran. Toute
  régression sur les critères d'acceptation de la 001 est un défaut de cette
  fonctionnalité.
- Ne couvre pas de thème sombre configurable.
- Ne couvre pas d'adaptation à un écran mobile ou tablette : le contexte
  d'usage reste le poste de travail bureau (comme la fonctionnalité 001).

## 4. Scénarios utilisateur

### S1 — Repérer un statut sans lire le texte en entier · Priorité : Haute

**En tant que** gestionnaire comptable, **je veux** que chaque statut soit
visuellement distinct des autres, **afin de** repérer en un coup d'œil
l'état d'un dossier dans une liste dense, sans devoir lire chaque libellé en
entier.

Critères d'acceptation :
- [ ] CA1.1 — Chaque statut porte un traitement visuel qui lui est propre
      (au moins deux statuts ne se distinguent jamais uniquement par leur
      position dans la liste), selon une catégorie sémantique standard
      (neutre pour non validée, catégorie « en cours » pour en cours de
      validation, catégorie « succès » pour validée, catégorie « information »
      pour refusée, catégorie « avertissement » pour suspendue).
- [ ] CA1.2 — Le texte du statut reste affiché en toutes lettres dans tous
      les cas (aucune régression sur la fonctionnalité 001, article IV de la
      constitution) : le traitement visuel s'ajoute au texte, il ne le
      remplace jamais.
- [ ] CA1.3 — La distinction entre deux statuts reste perceptible pour une
      personne daltonienne (rouge-vert notamment) : elle ne peut pas
      reposer sur la couleur comme seul canal de différenciation.

### S2 — Lire la liste et le détail sans fatigue visuelle · Priorité : Haute

**En tant que** gestionnaire comptable, **je veux** une mise en page
lisible (espacement, hiérarchie du texte, alignement des colonnes),
**afin de** parcourir rapidement de nombreuses pièces justificatives sans
effort de lecture supplémentaire.

Critères d'acceptation :
- [ ] CA2.1 — Les titres, les libellés de colonnes et le contenu des
      cellules se distinguent visuellement par leur taille ou leur poids
      (hiérarchie typographique).
- [ ] CA2.2 — Les lignes de la liste et les entrées de l'historique du
      détail sont visuellement séparées (espacement ou séparateur), sans
      que le regard doive deviner où commence et finit chaque ligne.
- [ ] CA2.3 — Le contraste entre le texte et son arrière-plan atteint au
      minimum le niveau AA du RGAA partout dans l'écran (constitution,
      article V).

### S3 — Percevoir une interface cohérente · Priorité : Moyenne

**En tant que** gestionnaire comptable, **je veux** que les boutons, champs
de recherche et cases de filtre aient une apparence cohérente d'un endroit à
l'autre de l'écran, **afin d'**avoir confiance dans le fait qu'il s'agit
d'un outil professionnel unique, pas d'un assemblage de fragments non liés.

Critères d'acceptation :
- [ ] CA3.1 — Un même type de contrôle (bouton, champ de texte, case à
      cocher) a la même apparence partout où il apparaît dans l'écran (liste,
      filtre, recherche, détail).
- [ ] CA3.2 — L'état interactif d'un contrôle (survol, focus au clavier) est
      visuellement indiqué, de façon cohérente sur tous les contrôles.

## 5. Cas limites et erreurs

| Situation | Comportement attendu |
|-----------|----------------------|
| Les messages d'état (chargement, erreur, accès refusé, aucun résultat) déjà présents dans la fonctionnalité 001 | Reçoivent le même traitement visuel cohérent que le reste de l'écran — ne restent pas en texte brut alors que le contenu normal est habillé. Les messages d'erreur ou d'accès refusé portent un traitement distinct (catégorie « alerte »), différent du traitement neutre d'un état simplement vide, cohérent avec la convention usuelle succès/erreur/avertissement. |
| Une pièce justificative avec un libellé très long | Le texte s'affiche entièrement lisible (retour à la ligne ou troncature explicite), sans casser l'alignement des colonnes voisines. |

## 6. Exigences non fonctionnelles

- **Identité visuelle** : l'interface est volontairement neutre et
  générique — aucune marque ni charte d'organisation particulière : un
  logo simple, une seule couleur d'accent, des couleurs de statut
  conventionnelles. Elle doit pouvoir être présentée telle quelle à
  n'importe quelle collectivité territoriale. À vérifier explicitement dans
  `plan.md`.
- **Accessibilité** : contraste AA (RGAA) partout, distinction des statuts
  non exclusivement par la couleur (constitution, article V ; voir CA1.3,
  CA2.3).
- **Non-régression** : aucun critère d'acceptation de la fonctionnalité 001
  ne doit être invalidé par cette fonctionnalité.
- **Frugalité** : cette fonctionnalité s'appuie sur la décision déjà prise en
  001 de ne pas introduire de librairie de composants tierce (constitution,
  article VIII) — elle en assume la conséquence visuelle plutôt que de la
  remettre en cause dans son périmètre.

## 7. Points à clarifier

| # | Question | Décision | Date |
|---|----------|----------|------|
| 1 | Y a-t-il une palette de couleurs ou une identité visuelle existante (même approximative) à respecter, ou carte blanche pour cette fonctionnalité ? | Aucune identité existante à respecter : interface neutre et générique, sans marque. Exigence non fonctionnelle « Identité visuelle » ajoutée en section 6. | 2026-08-24 |
| 2 | Une couleur dédiée par statut est-elle attendue (ex. rouge pour refusée), ou une différenciation plus neutre (icône, forme, poids typographique) suffit-elle ? | Pas de préférence exprimée par le demandeur ; tranché par défaut avec une catégorisation sémantique standard des statuts (CA1.1), cohérent avec la décision du point 1. | 2026-08-24 |
| 3 | Le traitement visuel des messages d'état (cas limite, section 5) doit-il distinguer les erreurs (couleur d'alerte) du simple état vide, ou un traitement neutre unique suffit-il pour les deux ? | Pas de préférence exprimée par le demandeur ; tranché par défaut pour un traitement distinct (alerte vs neutre), cohérent avec la convention usuelle succès/erreur/avertissement (section 5). | 2026-08-24 |

## 8. Définition de terminé

La fonctionnalité est livrée quand tous les critères d'acceptation des
scénarios S1 et S2 (priorité Haute) sont satisfaits et vérifiés, et
qu'aucune régression n'est constatée sur les critères d'acceptation de la
fonctionnalité 001.
