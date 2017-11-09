# `String.prototype.normalize()`

Această metodă normalizează secvențe care sunt diferite, dar pe care Unicode le vede echivalente sau compatibile și returnează o valoare normalizată.

Există patru forme de normalizare pe care Unicodul le oferă:

- NFC — Normalization Form Canonical Composition.
- NFD — Normalization Form Canonical Decomposition.
- NFKC — Normalization Form Compatibility Composition.
- NFKD — Normalization Form Compatibility Decomposition.

```javascript
var sir = 'șțăî';
var sirCodePoint = '\u0219';
// Canonically-composed form (NFC)
sir.normalize('NFC'); // 'șțăî'
sirCodePoint.normalize('NFC'); // ș
```

În ceea ce privește compararea a două șiruri, este nevoie mai întâi să fie trecute prin normalize().

```javascript
var baza = 'javascript';
var comp1 = 'JavaScript';
var comp2 = '𝒥𝒶𝓋𝒶𝓈𝒸𝓇𝒾𝓅𝓉';

console.log(baza.normalize('NFD'));
console.log(comp1.normalize());
console.log(comp2.normalize());
```
