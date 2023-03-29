# PhoTS

PhoTS (pronounced /fəts/) is a library for working with linguistic structures, such as phonetic and phonemic strings, as well as morphemes and lexemes. It provides a simple and flexible way to manipulate and analyze linguistic data in JavaScript/TypeScript projects.

This is still very much a work in progress.

## Features

- Phonetic and phonemic string manipulation
- Morpheme and lexeme handling
- Support for custom phoneme inventory and allophone rules
- Syllable stress and word boundaries (future update)

## Installation

To install Phots, run the following command:

```bash
npm install phots

## Usage

```typescript
import { Variant, phots } from 'phots';

const english = new Variant('English');

// Define phonemes and allophones
// ...

// Create phonemic and phonetic strings
const phonemicString = english.phoms`spɪt`;
const phoneticString = english.realize(phonemicString);

console.log(phoneticString.toString()); // Output: spɪt
```

## Credits
Phots is developed and maintained by Travis Reed, with substantial contributions from ChatGPT by OpenAI.

## License
Phots is licensed under the ISC License.
