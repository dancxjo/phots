import assert from "assert";
import { Variant } from "..";

const pie = new Variant('Proto-Indo-European');
const pg = pie.makeDescendant('Proto-Germanic');
const gothic = pg.makeDescendant('Gothic');
const ohg = pg.makeDescendant('Old High German');
const german = ohg.makeDescendant('Standard German');
const pwg = pg.makeDescendant('Proto-West Germanic');
const oe = pwg.makeDescendant('Old English');
const me = oe.makeDescendant('Middle English');
const modE = me.makeDescendant('Modern English');

// ... add sound changes ...

const root = pie.hasWord('*ḱwṓ').expandsTo('*ḱuntós');

assert(modE.deriveWord(root).toString() === "haUnd");

assert(gothic.spell(gothic.deriveWord(root)) === "𐌷𐌿𐌽𐌳𐍃");
