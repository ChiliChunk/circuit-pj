import { z } from 'zod';

export const StatutPJSchema = z.enum([
  'NonValidee',
  'EnCoursValidation',
  'Validee',
  'Refusee',
  'Suspendue',
]);
export type StatutPJ = z.infer<typeof StatutPJSchema>;

export const LIBELLE_STATUT: Record<StatutPJ, string> = {
  NonValidee: 'Non validée',
  EnCoursValidation: 'En cours de validation',
  Validee: 'Validée',
  Refusee: 'Refusée',
  Suspendue: 'Suspendue',
};

export const PieceJustificativeSchema = z.object({
  reference: z.string(),
  libelle: z.string(),
  dateDepot: z.string().nullable(),
  statut: StatutPJSchema,
});
export type PieceJustificative = z.infer<typeof PieceJustificativeSchema>;

export const PiecesJustificativesSchema = z.array(PieceJustificativeSchema);
