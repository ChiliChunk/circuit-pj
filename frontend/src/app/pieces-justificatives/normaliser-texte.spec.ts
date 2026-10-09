import { normaliserTexte } from './normaliser-texte';

describe('normaliserTexte', () => {
  it('ignore la casse', () => {
    expect(normaliserTexte('Facture')).toBe(normaliserTexte('FACTURE'));
  });

  it('ignore les accents', () => {
    expect(normaliserTexte('électricité')).toBe(normaliserTexte('electricite'));
  });

  it('ignore casse et accents combinés', () => {
    expect(normaliserTexte('ÉLECTRICITÉ')).toBe('electricite');
  });
});
