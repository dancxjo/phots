import { Phoneme } from "./Phoneme";
import { PhonemicString } from "./PhonemicString";
import { PhoneticString, phots } from "./PhoneticString";

export class Variant {
  constructor(
    readonly name: string,
    readonly phonemeInventory: Phoneme[] = []
  ) {}

  phoneme(phone: PhoneticString): Phoneme {
    const phonemeFromInventory = this.phonemeInventory.find((phoneme) => phoneme.phone === phone);
    if (phonemeFromInventory) {
      return phonemeFromInventory;
    }

    const phoneme = new Phoneme(this, phone);
    this.phonemeInventory.push(phoneme);
    return phoneme;
  }

  ph(phones: TemplateStringsArray): Phoneme {
    return this.phoneme(phots(phones));
  }

  phoms(phonemes: TemplateStringsArray): PhonemicString {
    // Sort the inventory by longest strings first so we match the longest first
    // TODO: Memoize this
    const sortedInventory = [...this.phonemeInventory].sort((a, b) => b.phone.toString().length - a.phone.toString().length);

    // Decompose the phonemic string into phonemes
    const phonemicString: PhonemicString = [];
    let remaining = phonemes.join();
    while (remaining.length > 0) {
      const phoneme = sortedInventory.find((phoneme) => remaining.startsWith(phoneme.phone.toString()));
      if (!phoneme) {
        throw new Error(`No phoneme found for ${remaining}`);
      }
      phonemicString.push(phoneme);
      remaining = remaining.slice(phoneme.phone.toString().length);
    }

    return phonemicString;
  }

  realize(phonemes: PhonemicString): PhoneticString {
    const before: PhonemicString = [];
    const after: PhonemicString = [...phonemes];
    const realized: PhoneticString = phots``;
    for (const phoneme of phonemes) {
      if (!this.phonemeInventory.includes(phoneme)) {
        throw new Error(
          `Phoneme ${phoneme} is not in the variant ${this.name}`
        );
      }
      const current = after.shift();
      if (current) {
        realized.push(current.realize({ before, after }));
      }
      before.push(phoneme);
    }
    return realized;
  }
}
