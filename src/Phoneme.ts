import { Allophone } from "./Allophone";
import { Context } from "./Condition";
import { PhonemicString } from "./PhonemicString";
import { PhoneticString } from "./PhoneticString";
import { Variant } from "./Variant";

export class Phoneme {
  constructor(readonly variant: Variant, readonly phone: PhoneticString, readonly allophones: Allophone[] = []) { }

  realize(context: Context): PhoneticString {
    const realizedAllophone = this.allophones.find((allophone) => allophone.realizedWhen(context));
    return realizedAllophone ?? this.phone;
  }
}
