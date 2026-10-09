import { Component, input, output } from '@angular/core';
import { LIBELLE_STATUT, type StatutPJ } from '../pieces-justificative.schema';

const STATUTS_ORDONNES: StatutPJ[] = [
  'NonValidee',
  'EnCoursValidation',
  'Validee',
  'Refusee',
  'Suspendue',
];

@Component({
  selector: 'app-filtre-statut',
  standalone: true,
  templateUrl: './filtre-statut.component.html',
})
export class FiltreStatutComponent {
  readonly statuts = STATUTS_ORDONNES;
  readonly libelle = LIBELLE_STATUT;

  readonly selection = input<ReadonlySet<StatutPJ>>(new Set());
  readonly selectionChange = output<ReadonlySet<StatutPJ>>();

  estSelectionne(statut: StatutPJ): boolean {
    return this.selection().has(statut);
  }

  basculer(statut: StatutPJ, coche: boolean): void {
    const prochaine = new Set(this.selection());
    if (coche) {
      prochaine.add(statut);
    } else {
      prochaine.delete(statut);
    }
    this.selectionChange.emit(prochaine);
  }
}
