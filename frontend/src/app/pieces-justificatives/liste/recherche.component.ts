import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-recherche',
  standalone: true,
  templateUrl: './recherche.component.html',
})
export class RechercheComponent {
  readonly texte = input<string>('');
  readonly texteChange = output<string>();

  onSaisie(evenement: Event): void {
    const valeur = (evenement.target as HTMLInputElement).value;
    this.texteChange.emit(valeur);
  }
}
