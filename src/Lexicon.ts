import { Lexeme } from "./Lexeme";
import { Variant } from "./Variant";

export class Lexicon {
  constructor(
    readonly variant: Variant,
    readonly lexemes: Lexeme[] = [],
  ) {}

  add(lexeme: Lexeme) {
    this.lexemes.push(lexeme);
  }
}
