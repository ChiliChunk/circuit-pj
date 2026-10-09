import { z } from 'zod';
import { PieceJustificativeSchema, StatutPJSchema } from './pieces-justificative.schema';

export const HistoriqueEntreeSchema = z.object({
  date: z.string(),
  statut: StatutPJSchema,
  auteur: z.string(),
  motif: z.string().optional(),
});
export type HistoriqueEntree = z.infer<typeof HistoriqueEntreeSchema>;

export const PieceJustificativeDetailSchema = PieceJustificativeSchema.extend({
  historique: z.array(HistoriqueEntreeSchema),
});
export type PieceJustificativeDetail = z.infer<typeof PieceJustificativeDetailSchema>;
