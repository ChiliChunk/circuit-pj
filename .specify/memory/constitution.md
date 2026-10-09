# Constitution — CircuitPJ

> Principes non négociables du projet. Toute spec, tout plan, toute tâche et
> tout code doivent s'y conformer. En cas de conflit entre ce document et une
> demande ponctuelle, ce document l'emporte — ou la constitution doit être
> amendée explicitement (section Amendements).

**Version** : 1.0.0
**Dernière révision** : 2026-08-24

---

## I. La spécification fait foi

Aucune ligne de code n'est écrite avant qu'une spec validée n'existe pour la
fonctionnalité concernée. Le code est une projection de la spec, jamais
l'inverse.

Si l'implémentation révèle que la spec est fausse ou incomplète : on **arrête
d'implémenter**, on corrige la spec, on régénère. On ne « rattrape » pas dans
le code un besoin qui n'est pas écrit.

## II. Aucun accès sans habilitation explicite

Toute action de validation, rejet ou consultation d'une pièce justificative
est soumise à une habilitation nommée (ex. « valider une PJ », « consulter le
circuit »), jamais à une simple présomption de rôle.

Corollaire : une spec qui introduit une action sensible doit nommer
l'habilitation requise. Un plan qui l'implémente doit vérifier cette
habilitation côté serveur, jamais côté client seul.

## III. Toute action est historisée et non falsifiable

Chaque changement de statut d'une pièce justificative (validation, rejet,
suspension, actualisation) est enregistré avec son auteur, sa date et son
motif. Cet historique n'est jamais purgé ni modifiable après coup.

## IV. Le statut d'une pièce n'est jamais ambigu

- L'état d'une pièce justificative est toujours affiché explicitement (jamais
  déduit implicitement d'une couleur ou d'une icône seule).
- Une action indisponible dans l'état courant est visiblement désactivée,
  jamais simplement absente sans explication.
- L'absence de donnée se distingue visuellement d'une valeur à zéro.

## V. Accessibilité RGAA obligatoire

Toute interface livrée respecte le RGAA (niveau AA minimum), au même titre
qu'un logiciel réel destiné à des agents de collectivités territoriales :
contrastes suffisants, navigation clavier complète, libellés explicites pour
les lecteurs d'écran. Ce n'est pas une amélioration différée.

## VI. Typage strict, données validées aux frontières

TypeScript en mode `strict` sur le frontend et le backend. `any` interdit hors
justification écrite en commentaire.

Toute donnée entrant dans l'application (requête HTTP, réponse d'API,
paramètre d'URL) est validée par un schéma à la frontière. À l'intérieur du
domaine, les types sont tenus pour acquis.

## VII. La logique métier est testée, l'interface est vérifiée

Sont couverts par des tests unitaires, sans exception : les règles de
transition de statut, les calculs de délai, les contrôles d'habilitation.

L'interface n'exige pas de couverture exhaustive, mais aucune règle métier ne
réside dans un composant de rendu.

## VIII. Frugalité des dépendances

Toute nouvelle dépendance runtime est justifiée dans le plan : ce qu'elle
apporte, son poids, et pourquoi la réécrire coûterait plus cher. Les
micro-utilitaires remplaçables par dix lignes sont refusés.

---

## Amendements

Toute modification de ce document est datée, versionnée (semver : majeur =
principe retiré ou inversé, mineur = principe ajouté, patch = reformulation)
et accompagnée de sa justification.

| Version | Date       | Nature              |
|---------|------------|----------------------|
| 1.0.0   | 2026-08-24 | Rédaction initiale. |
