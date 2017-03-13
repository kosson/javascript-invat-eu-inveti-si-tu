# `String.prototype.startsWith()`

Această metodă determină dacă un șir începe cu un anume caracter parte a unui subșir. Metoda acceptă un al doilea argument, fiind poziția indexului de unde ar trebui să pornească căutarea.

Returnează `true` sau `false`.

```javascript
var sir = 'Acesta este un text pentru a servi demonstrației.';
console.log(sir.startsWith('un text')); // false
console.log(sir.startsWith('Acesta este')); // true
console.log(sir.startsWith('a servi', 27)); // true
```

Această metodă realizează o complementaritate cu `Array.prototype.indexOf`.
