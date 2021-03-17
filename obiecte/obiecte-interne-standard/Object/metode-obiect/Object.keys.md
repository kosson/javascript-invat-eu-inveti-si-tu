# Object.keys()

Returnează un array care conține numele tuturor proprietăților *deținute* de un obiect. Atenție, aceste proprietăți trebuie să fie setate ca `enumerable`. Trebuie să fii avertizat de faptul că toate cheile simbol, dacă există vor fi ignorate neapărând în array-ul rezultat.

```javascript
var obi = {a: true, b: 1};
Object.keys(obi); //["a","b"]
```

Metoda `Object.keys()` extrage toate cheile proprii (nu cele moștenite) ale unui obiect iterabil. Această metodă ne oferă un array de chei, care poate fi iterat prin metode așa cum este `Array.prototype.forEach(cb)`. Performanțele folosind această metodă sunt net superioare lui `hasOwnProperty()`.

```javascript
"use strict";
var obiect = { unu: "primul", doi: "al doilea" };

// ES2015
var chei = [];
for (var cheie in obiect) {
  if (obiect.hasOwnProperty(cheie)){
    chei.push(cheie);
  }
}

// ES2017
Object.keys(obiect).forEach(function (cheie) {
  console.log( cheie, obiect[cheie] );
}); // unu primul, doi al doilea
```
