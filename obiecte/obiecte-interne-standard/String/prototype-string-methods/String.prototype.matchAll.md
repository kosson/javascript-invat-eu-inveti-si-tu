# String.prototype.matchAll

Metoda este folosită pentru a aduce toate fragmentele care se potrivesc criteriilor menționate într-un șablon chiar dacă acesta are și grupuri de captură, dar și fanionul `g` adăugat.

Metoda returnează un iterator.

```javascript
let regexp = /(Salut)+/gi;
let fragment = "Salut prietene. Salutare, popor, salutări rudelor";
let matches = fragment.matchAll(regexp);

for (let match of matches) {
  console.log(match);
}
```
