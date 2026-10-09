import { Router } from 'express';
import {
  listerPiecesJustificatives,
  trouverPieceJustificative,
} from '../data/pieces-justificatives.js';
import { aHabilitationConsultationCircuitPJ } from '../auth/current-user.stub.js';

export const piecesJustificativesRouter = Router();

piecesJustificativesRouter.get('/api/pieces-justificatives', (_req, res) => {
  if (!aHabilitationConsultationCircuitPJ()) {
    res.status(403).json({
      code: 'HABILITATION_MANQUANTE',
      message: "L'habilitation « Consultation des circuits de validation PJ » est requise.",
    });
    return;
  }
  res.status(200).json(listerPiecesJustificatives());
});

piecesJustificativesRouter.get('/api/pieces-justificatives/:reference', (req, res) => {
  if (!aHabilitationConsultationCircuitPJ()) {
    res.status(403).json({
      code: 'HABILITATION_MANQUANTE',
      message: "L'habilitation « Consultation des circuits de validation PJ » est requise.",
    });
    return;
  }

  const piece = trouverPieceJustificative(req.params.reference);
  if (!piece) {
    res.status(404).json({
      code: 'PJ_INCONNUE',
      message: `Aucune pièce justificative avec la référence « ${req.params.reference} ».`,
    });
    return;
  }
  res.status(200).json(piece);
});
