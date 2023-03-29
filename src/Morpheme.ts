import { PhonemicString } from "./PhonemicString";
import { Variant } from "./Variant";

export class Morpheme {
  constructor(
    readonly variant: Variant,
    readonly orthographic: string,
    readonly phonemic?: PhonemicString,
  ) {
    // TODO: If no phonemic representation is provided, derive it from the orthographic representation
  }
}
