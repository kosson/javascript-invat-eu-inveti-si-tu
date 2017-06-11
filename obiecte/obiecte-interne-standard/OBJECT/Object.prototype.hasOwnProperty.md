# `Object.prototype.hasOwnProperty`

Pentru a testa doar cheile care aparțin obiectului contruit fără proprietățile moștenite prin prototip se va testa dacă obiectul are proprietăți ale sale folosind `Object.prototype.hasOwnProperty`. Este returnat un boolean.
Orice obiect care descinde din `Object` moștenește și metoda `hasOwnProperty`.

```javascript
"use strict";
var obiect = { unu: "primul", doi: "al doilea" },
    cheie;
Object.prototype.trei = "al treilea";
for( cheie in obiect ){
  if(obiect.hasOwnProperty(cheie)){       // verificarea se face pentru fiecare cheie. Taxează performanța
    console.log( cheie, obiect[cheie] );
  }
};
/*
unu primul
doi al doilea
 */
```
