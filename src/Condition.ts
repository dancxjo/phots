import { PhonemicString } from "./PhonemicString";

export interface Context {
  before?: PhonemicString;
  after?: PhonemicString;
}

export type Condition = (context: Context) => boolean;
