import { Condition } from "./Condition";
import { Phoneme } from "./Phoneme";
import { PhoneticString } from "./PhoneticString";

export class Allophone extends PhoneticString {
  constructor(readonly allophoneOf: Phoneme, realization: PhoneticString, readonly realizedWhen: Condition) {
    super(realization.toString());
  }
}
