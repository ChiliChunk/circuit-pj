export type StatutPJ = 'NonValidee' | 'EnCoursValidation' | 'Validee' | 'Refusee' | 'Suspendue';

export interface HistoriqueEntree {
  date: string;
  statut: StatutPJ;
  auteur: string;
  motif?: string;
}

export interface PieceJustificative {
  reference: string;
  libelle: string;
  dateDepot: string | null;
  statut: StatutPJ;
}

export interface PieceJustificativeDetail extends PieceJustificative {
  historique: HistoriqueEntree[];
}

/**
 * Jeu de données fixe (plan, décision D2). Couvre volontairement : les 5
 * statuts, une PJ sans date de dépôt (PJ-2026-0003), une PJ sans historique
 * (PJ-2026-0003), une entrée d'historique avec motif et une sans.
 */
const PIECES_JUSTIFICATIVES: PieceJustificativeDetail[] = [
  {
    reference: 'PJ-2026-0001',
    libelle: 'Facture fourniture de bureau — Papeterie Centrale',
    dateDepot: '2026-08-01',
    statut: 'Validee',
    historique: [
      { date: '2026-08-01T09:12:00Z', statut: 'NonValidee', auteur: 'M. Dupont' },
      { date: '2026-08-02T10:00:00Z', statut: 'EnCoursValidation', auteur: 'Mme Rossi' },
      { date: '2026-08-05T14:30:00Z', statut: 'Validee', auteur: 'M. Lefevre' },
    ],
  },
  {
    reference: 'PJ-2026-0002',
    libelle: 'Mandat de paiement — Entretien des espaces verts',
    dateDepot: '2026-08-03',
    statut: 'EnCoursValidation',
    historique: [
      { date: '2026-08-03T08:00:00Z', statut: 'NonValidee', auteur: 'M. Dupont' },
      { date: '2026-08-04T09:00:00Z', statut: 'EnCoursValidation', auteur: 'Mme Rossi' },
    ],
  },
  {
    reference: 'PJ-2026-0003',
    libelle: 'Facture énergie — Éclairage public',
    dateDepot: null,
    statut: 'NonValidee',
    historique: [],
  },
  {
    reference: 'PJ-2026-0004',
    libelle: 'Facture prestation — Nettoyage des locaux municipaux',
    dateDepot: '2026-07-20',
    statut: 'Refusee',
    historique: [
      { date: '2026-07-20T09:00:00Z', statut: 'NonValidee', auteur: 'M. Dupont' },
      { date: '2026-07-22T11:00:00Z', statut: 'EnCoursValidation', auteur: 'Mme Rossi' },
      {
        date: '2026-07-25T16:45:00Z',
        statut: 'Refusee',
        auteur: 'M. Lefevre',
        motif: 'Pièce jointe manquante',
      },
    ],
  },
  {
    reference: 'PJ-2026-0005',
    libelle: 'Mandat de paiement — Fournitures scolaires',
    dateDepot: '2026-08-10',
    statut: 'Suspendue',
    historique: [
      { date: '2026-08-10T08:30:00Z', statut: 'NonValidee', auteur: 'M. Dupont' },
      { date: '2026-08-11T09:15:00Z', statut: 'EnCoursValidation', auteur: 'Mme Rossi' },
      {
        date: '2026-08-12T13:00:00Z',
        statut: 'Suspendue',
        auteur: 'M. Lefevre',
        motif: 'En attente de pièce complémentaire',
      },
    ],
  },
];

export function listerPiecesJustificatives(): PieceJustificative[] {
  return PIECES_JUSTIFICATIVES.map(({ historique: _historique, ...resume }) => resume);
}

export function trouverPieceJustificative(reference: string): PieceJustificativeDetail | undefined {
  return PIECES_JUSTIFICATIVES.find((piece) => piece.reference === reference);
}
