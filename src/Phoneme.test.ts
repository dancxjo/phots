import { Allophone } from "./Allophone";
import { phots } from "./PhoneticString";
import { Variant } from "./Variant";

describe('Phoneme', () => {
  const english = new Variant('English');
  const p = english.ph`p`;
  const i = english.ph`ɪ`;
  const t = english.ph`t`;
  const s = english.ph`s`;

  const pits = english.phoms`pɪts`;
  const spit = english.phoms`spɪt`;

  // This rule is very simplified. It will only work on monosyllabic words.
  const aspiratedP = new Allophone(p, phots`pʰ`, (context) => context.before?.length === 0);
  p.allophones.push(aspiratedP);

  it('should realize an allophone under the right conditions', () => {
    const realization = english.realize(pits);
    expect(realization.toString()).toBe('pʰɪts');
  });

  it('should realize the default allophone elsewhere', () => {
    const realization = english.realize(spit);
    expect(realization.toString()).toBe('spɪt');
  });
});
