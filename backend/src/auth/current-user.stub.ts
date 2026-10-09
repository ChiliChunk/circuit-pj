/**
 * STUB TEMPORAIRE — à remplacer par une authentification réelle.
 *
 * Aucune fonctionnalité d'authentification n'a été spécifiée à ce jour
 * (plan.md, décision D3). Ce fichier simule un unique utilisateur courant
 * pour permettre de vérifier réellement le contrôle d'habilitation (CA1.6)
 * sans construire un système de connexion hors du périmètre de la spec 001.
 * Ne pas utiliser au-delà d'un usage pédagogique/démonstratif.
 */

export const HABILITATION_CONSULTATION_CIRCUIT_PJ = 'CONSULTATION_CIRCUIT_PJ';

export interface UtilisateurCourant {
  nom: string;
  habilitations: string[];
}

/**
 * Configurable via la variable d'environnement STUB_SANS_HABILITATION pour
 * simuler, en démonstration ou en test, un utilisateur sans l'habilitation
 * requise.
 */
export function utilisateurCourant(): UtilisateurCourant {
  const sansHabilitation = process.env.STUB_SANS_HABILITATION === 'true';
  return {
    nom: 'Gestionnaire de démonstration',
    habilitations: sansHabilitation ? [] : [HABILITATION_CONSULTATION_CIRCUIT_PJ],
  };
}

export function aHabilitationConsultationCircuitPJ(): boolean {
  return utilisateurCourant().habilitations.includes(HABILITATION_CONSULTATION_CIRCUIT_PJ);
}
