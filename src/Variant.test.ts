import { Variant } from "./Variant";

describe('Variant', () => {
  const pg = new Variant('Proto-Germanic');
  const pwg = pg.makeDescendant('Proto-West Germanic');
  const pie = pg.makeAncestor('Proto-Indo-European');

  it('should create a descendant variant', () => {
    expect(pwg instanceof Variant).toBe(true);
    expect(pwg.name).toBe('Proto-West Germanic');
    expect(pwg.descendsFrom(pg)).toBe(true);
  });

  it('should create an immediate ancestor variant', () => {
    expect(pie instanceof Variant).toBe(true);
    expect(pie.name).toBe('Proto-Indo-European');
    expect(pg.descendsFrom(pie)).toBe(true);
  });
});
