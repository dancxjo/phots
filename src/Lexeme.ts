import { Morpheme } from "./Morpheme";
import { Variant } from "./Variant";

export class Lexeme {
  constructor(
    readonly variant: Variant,
    readonly lemma: Morpheme,
    readonly inflections: Morpheme[] = [],
  ) {}

  expandsTo(orthographic: string): Lexeme {
    throw new Error("Method not implemented.");
  }
}
