import type { StatutPJ } from './pieces-justificative.schema';

export type CategorieVisuelle = 'neutre' | 'primaire' | 'succes' | 'info' | 'avertissement';

/** Catégorie sémantique de chaque statut (plan, décision D4). */
const CATEGORIE_PAR_STATUT: Record<StatutPJ, CategorieVisuelle> = {
  NonValidee: 'neutre',
  EnCoursValidation: 'primaire',
  Validee: 'succes',
  Refusee: 'info',
  Suspendue: 'avertissement',
};

export function categorieStatut(statut: StatutPJ): CategorieVisuelle {
  return CATEGORIE_PAR_STATUT[statut];
}
