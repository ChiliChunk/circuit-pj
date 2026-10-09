# Spécification — Suivi des pièces justificatives d'un circuit de validation

**Identifiant** : 001-suivi-circuit-pj
**Statut** : Validée
**Date** : 2026-08-24

> Ce document décrit **ce que** le système doit faire et **pourquoi**.
> Il ne contient aucun choix technique : pas de librairie, pas d'architecture,
> pas de nom de fonction. Ces sujets appartiennent à `plan.md`.

---

## 1. Problème

Aujourd'hui, un gestionnaire comptable n'a aucune vue consolidée de l'état des
pièces justificatives (PJ) engagées dans un circuit de validation. Pour savoir
où en est un dossier, il doit interroger un collègue ou rechercher l'information
dossier par dossier. Cette fonctionnalité donne au gestionnaire une vue unique,
à jour, de toutes les PJ dont il a la charge et de leur statut courant.

## 2. Utilisateurs visés

Gestionnaires comptables d'une collectivité territoriale, en poste de travail
bureau, consultant cet écran plusieurs fois par jour dans le cadre du suivi
courant de leurs dossiers. Niveau d'expertise : utilisateurs métier réguliers
de l'outil, non informaticiens.

## 3. Périmètre exclu

- Cette fonctionnalité ne permet pas de valider, rejeter ou suspendre une PJ
  depuis cet écran — action prévue dans une fonctionnalité ultérieure.
- Elle ne couvre pas le dépôt ou la création d'une nouvelle PJ.
- Elle ne couvre pas le passage par un parapheur électronique.
- Elle ne permet pas de modifier l'historique d'une PJ (l'historique est
  strictement en lecture, conformément à l'article III de la constitution).
- Elle ne couvre pas l'export des données affichées (CSV, PDF, etc.).
- Elle suppose un seul circuit de validation, pour une seule collectivité,
  par gestionnaire : aucun sélecteur de circuit ou de collectivité n'est
  prévu dans cette version.

## 4. Scénarios utilisateur

### S1 — Consulter la liste des PJ et leur statut · Priorité : Haute

**En tant que** gestionnaire comptable, **je veux** voir la liste des pièces
justificatives d'un circuit de validation avec leur statut actuel, **afin de**
savoir où en est chaque dossier sans avoir à interroger quelqu'un.

Déroulé nominal :
1. Le gestionnaire ouvre l'écran de suivi.
2. Le système affiche la liste des pièces justificatives du circuit, si le
   gestionnaire dispose de l'habilitation « Consultation des circuits de
   validation PJ », avec pour chacune : sa référence, son libellé, sa date
   de dépôt et son statut courant.
3. Le gestionnaire filtre la liste par un ou plusieurs statuts.
4. Le gestionnaire trie la liste par date de dépôt, croissante ou décroissante.

Critères d'acceptation :
- [ ] CA1.1 — Chaque ligne affiche au minimum : référence, libellé, date de
      dépôt, statut courant.
- [ ] CA1.2 — Le statut est toujours affiché en toutes lettres ; il n'est
      jamais porté uniquement par une couleur ou une icône.
- [ ] CA1.3 — Un filtre permet de n'afficher que les PJ dont le statut fait
      partie d'un ou plusieurs statuts sélectionnés.
- [ ] CA1.4 — Un tri par date de dépôt (croissant ou décroissant) est
      disponible et modifie l'ordre affiché sans rechargement de page complet.
- [ ] CA1.5 — Une PJ sans date de dépôt renseignée affiche une mention
      explicite d'absence de donnée (jamais une date par défaut telle que
      « 01/01/1970 » ni une cellule vide sans explication).
- [ ] CA1.6 — Sans l'habilitation « Consultation des circuits de validation
      PJ », aucune PJ n'apparaît, même transitoirement.

### S2 — Rechercher une pièce justificative précise · Priorité : Moyenne

**En tant que** gestionnaire comptable, **je veux** rechercher une PJ par
référence ou libellé, **afin de** la retrouver rapidement sans parcourir
toute la liste.

Déroulé nominal :
1. Le gestionnaire saisit un texte dans un champ de recherche.
2. La liste ne montre plus que les PJ dont la référence ou le libellé
   correspond au texte saisi.

Critères d'acceptation :
- [ ] CA2.1 — La recherche filtre la liste en temps réel, à chaque caractère
      saisi, sans action de validation supplémentaire.
- [ ] CA2.2 — La recherche filtre sur la référence et sur le libellé.
- [ ] CA2.3 — La recherche est insensible à la casse et aux accents.
- [ ] CA2.4 — Une recherche sans résultat affiche un message explicite
      (jamais un tableau vide sans explication).

### S3 — Consulter le détail d'une pièce justificative · Priorité : Moyenne

**En tant que** gestionnaire comptable, **je veux** ouvrir le détail d'une PJ
depuis la liste, **afin de** voir son historique de statuts sans changer
d'écran de travail.

Déroulé nominal :
1. Le gestionnaire clique sur une ligne de la liste.
2. Le système affiche la référence, le libellé, le statut courant et
   l'historique des changements de statut de la PJ (date, statut atteint,
   auteur du changement).

Critères d'acceptation :
- [ ] CA3.1 — Le détail affiche au minimum : référence, libellé, statut
      courant, historique des changements de statut avec date, statut et
      auteur pour chaque entrée.
- [ ] CA3.2 — Quand un changement de statut a un motif associé (par exemple
      un rejet), ce motif est affiché avec l'entrée d'historique
      correspondante. Un changement sans motif associé n'affiche pas de
      placeholder à sa place (le motif n'est pas un champ obligatoire pour
      chaque changement).
- [ ] CA3.3 — Si aucun changement de statut n'a encore eu lieu, le détail
      l'indique explicitement plutôt que d'afficher une zone vide.
- [ ] CA3.4 — Fermer le détail ramène le gestionnaire à la liste dans l'état
      où il l'avait laissée (filtre, tri et recherche conservés).

## 5. Cas limites et erreurs

| Situation | Comportement attendu |
|-----------|----------------------|
| Aucune PJ dans le périmètre du gestionnaire | Message explicite « aucune pièce justificative » plutôt qu'un tableau vide sans explication. |
| Utilisateur sans l'habilitation « Consultation des circuits de validation PJ » | Accès à l'écran refusé explicitement, avec message clair — jamais une liste vide silencieuse laissant croire qu'il n'y a rien à voir. |
| Erreur de chargement (réseau ou serveur indisponible) | Message d'erreur explicite et action pour réessayer — jamais un écran qui reste vide ou qui charge indéfiniment sans retour. |
| Deux PJ partagent une même valeur sur un champ affiché autre que la référence (ex. un même tiers identifié sur deux PJ différentes) | Comportement normal, ne nécessite aucun traitement particulier : seule la référence est garantie unique et sert d'identifiant. |
| Volume de PJ dans un circuit | Le volume attendu est faible — quelques pièces justificatives au maximum par circuit. Aucune pagination ni chargement progressif n'est nécessaire pour cette version. |

## 6. Exigences non fonctionnelles

- **Accessibilité** : l'écran (liste, filtre, recherche, détail) est
  entièrement utilisable au clavier et respecte le RGAA niveau AA
  (constitution, article V).
- **Confidentialité** : aucune PJ hors du périmètre d'habilitation du
  gestionnaire n'est visible, y compris transitoirement pendant un
  chargement (constitution, article II).
- **Performance** : aucun seuil chiffré n'est imposé pour cette version — le
  faible volume attendu (section 5) rend cette exigence non bloquante.
  L'affichage doit rester perceptiblement instantané en usage normal, sans
  garantie chiffrée à ce stade.
- **Historisation** : la vue détail (S3) ne fait qu'afficher un historique
  déjà constitué ; elle ne modifie ni ne recalcule jamais cet historique
  (constitution, article III).

## 7. Points à clarifier

| # | Question | Décision | Date |
|---|----------|----------|------|
| 1 | La recherche (S2) doit-elle filtrer la liste en temps réel à la frappe, ou seulement après validation (bouton ou touche Entrée) ? | En temps réel, à chaque caractère saisi (CA2.1). | 2026-08-24 |
| 2 | Une référence de PJ est-elle garantie unique dans le système, ou la liste doit-elle savoir afficher des doublons sans les fusionner ? | La référence est garantie unique et sert d'identifiant. D'autres champs affichés peuvent se répéter entre PJ, sans traitement particulier requis. | 2026-08-24 |
| 3 | Quel volume de PJ par circuit est réaliste en usage réel ? Une pagination ou un chargement progressif est-il nécessaire dès cette version ? | Volume faible attendu (quelques PJ max par circuit). Pas de pagination ni de chargement progressif en v1. | 2026-08-24 |
| 4 | Quel est le seuil de temps d'affichage cible pour la liste initiale (exigence non fonctionnelle « Performance ») ? | Aucun seuil chiffré imposé — cohérent avec le faible volume attendu (point 3). Affichage attendu quasi instantané en usage normal, sans garantie chiffrée. | 2026-08-24 |
| 5 | Le périmètre de consultation d'un gestionnaire est-il limité à un seul circuit/une seule collectivité, ou doit-il pouvoir choisir parmi plusieurs ? | Un seul circuit, une seule collectivité par gestionnaire. Pas de sélecteur en v1 (voir section 3, périmètre exclu). | 2026-08-24 |
| 6 | Quelle est l'habilitation exacte requise pour consulter cet écran — une habilitation dédiée à la consultation des PJ, ou une habilitation plus large déjà existante dans le système ? | Une habilitation dédiée : « Consultation des circuits de validation PJ ». La validation/le rejet (hors périmètre ici) auront leur propre habilitation dans une fonctionnalité future. | 2026-08-24 |
| 7 | Quand un changement de statut a un motif associé (par exemple un refus), ce motif doit-il apparaître dans l'historique du détail (S3), ou seulement le statut atteint ? | Oui, le motif est affiché quand il existe (CA3.2). Pas de placeholder quand il n'y en a pas. | 2026-08-24 |

## 8. Définition de terminé

La fonctionnalité est livrée quand tous les critères d'acceptation du
scénario S1 (priorité Haute) sont satisfaits et vérifiés. Les scénarios S2 et
S3 (priorité Moyenne) font partie du périmètre de cette version mais ne
bloquent pas la livraison si un arbitrage explicite les reporte — un tel
arbitrage doit alors être tracé ici avant la clôture.
