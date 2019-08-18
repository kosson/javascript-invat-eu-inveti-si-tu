# String.prototype.matchAll

Metoda este folosită pentru a aduce toate fragmentele care se potrivesc criteriilor menționate într-un șablon chiar dacă acesta are și grupuri de captură, dar și fanionul `g` adăugat.

Metoda returnează un iterator.

```javascript
var text = var txt = 'Ceva\u{1F5D1} cu \u{1F5D2} și &#36;&#38; plus HaHa&#36;XOx&#38; &lt;';
var entity = /&(?:#x[a-f0-9]+|#[0-9]+|[a-z0-9]+);?/igu;

let array = [...str.matchAll(entity)];
console.log(array);
```
