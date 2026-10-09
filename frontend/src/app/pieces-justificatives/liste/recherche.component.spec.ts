import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ListeComponent } from './liste.component';
import type { PieceJustificative } from '../pieces-justificative.schema';

// La recherche (S2) est intégrée dans ListeComponent (le conteneur combine
// filtre de statut et recherche pour un seul état "aucun résultat" — voir
// liste.component.ts). Ces tests exercent donc ListeComponent, pas
// RechercheComponent isolément, qui ne porte aucune logique de filtrage.

const PIECES: PieceJustificative[] = [
  { reference: 'PJ-A', libelle: 'Facture électricité', dateDepot: '2026-08-01', statut: 'Validee' },
  {
    reference: 'PJ-B',
    libelle: 'Mandat travaux',
    dateDepot: '2026-08-05',
    statut: 'EnCoursValidation',
  },
];

describe('Recherche (via ListeComponent)', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListeComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  function creerComposant() {
    const fixture = TestBed.createComponent(ListeComponent);
    httpMock.expectOne('/api/pieces-justificatives').flush(PIECES);
    fixture.detectChanges();
    return fixture;
  }

  it('filtre en temps réel, insensible à la casse et aux accents (CA2.1, CA2.2, CA2.3)', () => {
    const fixture = creerComposant();
    fixture.componentInstance.changerTexteRecherche('ELECTRICITE');
    fixture.detectChanges();

    const lignes = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');
    expect(lignes.length).toBe(1);
    expect(lignes[0].textContent).toContain('PJ-A');
  });

  it('affiche un message explicite sans résultat (CA2.4)', () => {
    const fixture = creerComposant();
    fixture.componentInstance.changerTexteRecherche('texte-qui-ne-correspond-a-rien');
    fixture.detectChanges();

    const texte = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(texte).toContain('Aucun résultat');
    expect((fixture.nativeElement as HTMLElement).querySelector('table')).toBeNull();
  });
});
