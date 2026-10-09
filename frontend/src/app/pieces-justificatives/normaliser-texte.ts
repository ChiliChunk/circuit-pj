const DIACRITIQUES = /\p{Diacritic}/gu;

/** Normalise un texte pour une comparaison insensible à la casse et aux accents (CA2.3). */
export function normaliserTexte(texte: string): string {
  return texte.normalize('NFD').replace(DIACRITIQUES, '').toLowerCase().trim();
}
