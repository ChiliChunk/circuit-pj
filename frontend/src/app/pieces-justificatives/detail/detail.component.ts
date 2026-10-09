import { Component, OnInit, inject, input, output, signal } from '@angular/core';
import { LIBELLE_STATUT } from '../pieces-justificative.schema';
import { categorieStatut } from '../categorie-statut';
import type { PieceJustificativeDetail } from '../piece-justificative-detail.schema';
import { PiecesJustificativesService, type ErreurApi } from '../pieces-justificatives.service';

@Component({
  selector: 'app-detail-piece-justificative',
  standalone: true,
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  private readonly service = inject(PiecesJustificativesService);

  readonly reference = input.required<string>();
  readonly fermer = output<void>();

  readonly libelleStatut = LIBELLE_STATUT;
  readonly categorieStatut = categorieStatut;

  protected readonly detail = signal<PieceJustificativeDetail | null>(null);
  protected readonly erreur = signal<ErreurApi | null>(null);

  ngOnInit(): void {
    this.service.obtenirDetail(this.reference()).subscribe({
      next: (detail) => this.detail.set(detail),
      error: (erreur: ErreurApi) => this.erreur.set(erreur),
    });
  }
}
