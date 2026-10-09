import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DetailComponent } from './detail.component';
import type { PieceJustificativeDetail } from '../piece-justificative-detail.schema';

describe('DetailComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  function creerComposant(reference: string, detail: PieceJustificativeDetail) {
    const fixture = TestBed.createComponent(DetailComponent);
    fixture.componentRef.setInput('reference', reference);
    fixture.detectChanges();
    httpMock.expectOne(`/api/pieces-justificatives/${reference}`).flush(detail);
    fixture.detectChanges();
    return fixture;
  }

  it('affiche le motif quand il existe, sans placeholder sinon (CA3.2)', () => {
    const fixture = creerComposant('PJ-2026-0004', {
      reference: 'PJ-2026-0004',
      libelle: 'Facture prestation',
      dateDepot: '2026-07-20',
      statut: 'Refusee',
      historique: [
        { date: '2026-07-20T09:00:00Z', statut: 'NonValidee', auteur: 'M. Dupont' },
        {
          date: '2026-07-25T16:45:00Z',
          statut: 'Refusee',
          auteur: 'M. Lefevre',
          motif: 'Pièce jointe manquante',
        },
      ],
    });

    const texte = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(texte).toContain('Pièce jointe manquante');

    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('li');
    expect(items[0].textContent).not.toContain('motif');
    expect(items[1].textContent).toContain('motif');
  });

  it('indique explicitement l’absence d’historique (CA3.3)', () => {
    const fixture = creerComposant('PJ-2026-0003', {
      reference: 'PJ-2026-0003',
      libelle: 'Facture énergie',
      dateDepot: null,
      statut: 'NonValidee',
      historique: [],
    });

    const texte = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(texte).toContain('Aucun changement de statut enregistré');
    expect((fixture.nativeElement as HTMLElement).querySelector('ul')).toBeNull();
  });
});
