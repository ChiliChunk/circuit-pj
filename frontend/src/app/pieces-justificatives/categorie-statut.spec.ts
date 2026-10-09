import { categorieStatut } from './categorie-statut';

describe('categorieStatut', () => {
  it('associe une catégorie sémantique à chaque statut', () => {
    expect(categorieStatut('NonValidee')).toBe('neutre');
    expect(categorieStatut('EnCoursValidation')).toBe('primaire');
    expect(categorieStatut('Validee')).toBe('succes');
    expect(categorieStatut('Refusee')).toBe('info');
    expect(categorieStatut('Suspendue')).toBe('avertissement');
  });
});
