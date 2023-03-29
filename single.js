System.register("PhoneticString", [], function (exports_1, context_1) {
    "use strict";
    var PhoneticString;
    var __moduleName = context_1 && context_1.id;
    function phonetic(ipaRepresentation) {
        return new PhoneticString(ipaRepresentation.join(''));
    }
    exports_1("phonetic", phonetic);
    /// phots is a shorthand for phonetic string
    function phots(ipaRepresentation) {
        return phonetic(ipaRepresentation);
    }
    exports_1("phots", phots);
    return {
        setters: [],
        execute: function () {
            PhoneticString = class PhoneticString {
                constructor(ipaRepresentation) {
                    this.ipaRepresentation = ipaRepresentation;
                }
                toString() {
                    return this.ipaRepresentation;
                }
                push(phones) {
                    this.ipaRepresentation += phones.toString();
                    return this;
                }
            };
            exports_1("PhoneticString", PhoneticString);
        }
    };
});
System.register("Variant", ["Phoneme", "PhoneticString"], function (exports_2, context_2) {
    "use strict";
    var Phoneme_1, PhoneticString_1, Variant;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (Phoneme_1_1) {
                Phoneme_1 = Phoneme_1_1;
            },
            function (PhoneticString_1_1) {
                PhoneticString_1 = PhoneticString_1_1;
            }
        ],
        execute: function () {
            Variant = class Variant {
                constructor(name, phonemeInventory = []) {
                    this.name = name;
                    this.phonemeInventory = phonemeInventory;
                }
                phoneme(phone) {
                    const phonemeFromInventory = this.phonemeInventory.find((phoneme) => phoneme.phone === phone);
                    if (phonemeFromInventory) {
                        return phonemeFromInventory;
                    }
                    const phoneme = new Phoneme_1.Phoneme(this, phone);
                    this.phonemeInventory.push(phoneme);
                    return phoneme;
                }
                ph(phones) {
                    return this.phoneme(PhoneticString_1.phots(phones));
                }
                phoms(phonemes) {
                    // Sort the inventory by longest strings first so we match the longest first
                    // TODO: Memoize this
                    const sortedInventory = [...this.phonemeInventory].sort((a, b) => b.phone.toString().length - a.phone.toString().length);
                    // Decompose the phonemic string into phonemes
                    const phonemicString = [];
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
                realize(phonemes) {
                    const before = [];
                    const after = [...phonemes];
                    const realized = PhoneticString_1.phots ``;
                    for (const phoneme of phonemes) {
                        if (!this.phonemeInventory.includes(phoneme)) {
                            throw new Error(`Phoneme ${phoneme} is not in the variant ${this.name}`);
                        }
                        const current = after.shift();
                        if (current) {
                            realized.push(current.realize({ before, after }));
                        }
                        before.push(phoneme);
                    }
                    return realized;
                }
            };
            exports_2("Variant", Variant);
        }
    };
});
System.register("Phoneme", [], function (exports_3, context_3) {
    "use strict";
    var Phoneme;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            Phoneme = class Phoneme {
                constructor(variant, phone, allophones = []) {
                    this.variant = variant;
                    this.phone = phone;
                    this.allophones = allophones;
                }
                realize(context) {
                    const realizedAllophone = this.allophones.find((allophone) => allophone.realizedWhen(context));
                    return realizedAllophone !== null && realizedAllophone !== void 0 ? realizedAllophone : this.phone;
                }
            };
            exports_3("Phoneme", Phoneme);
        }
    };
});
System.register("PhonemicString", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Condition", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Allophone", ["PhoneticString"], function (exports_6, context_6) {
    "use strict";
    var PhoneticString_2, Allophone;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (PhoneticString_2_1) {
                PhoneticString_2 = PhoneticString_2_1;
            }
        ],
        execute: function () {
            Allophone = class Allophone extends PhoneticString_2.PhoneticString {
                constructor(allophoneOf, realization, realizedWhen) {
                    super(realization.toString());
                    this.allophoneOf = allophoneOf;
                    this.realizedWhen = realizedWhen;
                }
            };
            exports_6("Allophone", Allophone);
        }
    };
});
System.register("Phoneme.test", ["Allophone", "PhoneticString", "Variant"], function (exports_7, context_7) {
    "use strict";
    var Allophone_1, PhoneticString_3, Variant_1;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (Allophone_1_1) {
                Allophone_1 = Allophone_1_1;
            },
            function (PhoneticString_3_1) {
                PhoneticString_3 = PhoneticString_3_1;
            },
            function (Variant_1_1) {
                Variant_1 = Variant_1_1;
            }
        ],
        execute: function () {
            describe('Phoneme', () => {
                const english = new Variant_1.Variant('English');
                const p = english.ph `p`;
                const i = english.ph `ɪ`;
                const t = english.ph `t`;
                const s = english.ph `s`;
                const pits = english.phoms `pɪts`;
                const spit = english.phoms `spɪt`;
                // This rule is very simplified. It will only work on monosyllabic words.
                const aspiratedP = new Allophone_1.Allophone(p, PhoneticString_3.phots `pʰ`, (context) => { var _a; return ((_a = context.before) === null || _a === void 0 ? void 0 : _a.length) === 0; });
                p.allophones.push(aspiratedP);
                it('should realize an allophone under the right conditions', () => {
                    const realization = english.realize(pits);
                    expect(realization.toString()).toBe('pʰɪts');
                });
                it('should realize the default allophone elsewhere', () => {
                    const realization = english.realize(spit);
                    expect(realization.toString()).toBe('spɪt');
                });
            });
        }
    };
});
System.register("PhoneticString.test", ["PhoneticString"], function (exports_8, context_8) {
    "use strict";
    var PhoneticString_4;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (PhoneticString_4_1) {
                PhoneticString_4 = PhoneticString_4_1;
            }
        ],
        execute: function () {
            describe('PhoneticString', () => {
                it('should work using tag template', () => {
                    const pot = PhoneticString_4.phots `pʰɔːt`;
                    expect(pot instanceof PhoneticString_4.PhoneticString).toBe(true);
                    expect(pot.toString() === 'pʰɔːt').toBe(true);
                });
            });
        }
    };
});
System.register("index", ["Phoneme", "PhonemicString", "PhoneticString", "Variant", "Condition", "Allophone"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_9(exports);
    }
    return {
        setters: [
            function (Phoneme_2_1) {
                exportStar_1(Phoneme_2_1);
            },
            function (PhonemicString_1_1) {
                exportStar_1(PhonemicString_1_1);
            },
            function (PhoneticString_5_1) {
                exportStar_1(PhoneticString_5_1);
            },
            function (Variant_2_1) {
                exportStar_1(Variant_2_1);
            },
            function (Condition_1_1) {
                exportStar_1(Condition_1_1);
            },
            function (Allophone_2_1) {
                exportStar_1(Allophone_2_1);
            }
        ],
        execute: function () {
        }
    };
});
