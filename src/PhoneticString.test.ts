import { PhoneticString, phots } from './PhoneticString';

describe('PhoneticString', () => {
  it('should work using tag template', () => {
    const pot = phots`pʰɔːt`;
    expect(pot instanceof PhoneticString).toBe(true);
    expect(pot.toString() === 'pʰɔːt').toBe(true);
  });
});
