# Object.keys()

Returnează un array care conține numele tuturor proprietăților `deținute` de un obiect. ATENȚIE! Aceste proprietăți trebuie să fie setate ca `enumerable`.

```javascript
var obi = {a: true, b: 1};
Object.keys(obi); //["a","b"]
```

Metoda `Object.keys` extrage toate cheile proprii (nu cele moștenite) ale unui obiect iterabil.

Această metodă ne oferă un array de chei, care poate fi iterat prin metode așa cum este `Array.prototype.forEach`.
Performanțele folosind această metodă sunt net superioare lui `hasOwnProperty`.

```javascript
"use strict";
var obiect = { unu: "primul", doi: "al doilea" };

Object.keys(obiect).forEach(function(cheie){
  console.log( cheie, obiect[cheie] );
});
```
