export class PhoneticString {
  constructor(protected ipaRepresentation: string) {}
  toString(): string {
    return this.ipaRepresentation;
  }
  push(phones: PhoneticString): PhoneticString {
    this.ipaRepresentation += phones.toString();
    return this;
  }
}

export function phonetic(ipaRepresentation: TemplateStringsArray): PhoneticString {
  return new PhoneticString(ipaRepresentation.join(''));
}

/// phots is a shorthand for phonetic string
export function phots(ipaRepresentation: TemplateStringsArray): PhoneticString {
  return phonetic(ipaRepresentation);
}
