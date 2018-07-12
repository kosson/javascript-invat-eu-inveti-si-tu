# Object.prototype.hasOwnProperty()

Este o metodă folosită în cazul în care dorești să utilizezi proprietățile care aparțin obiectului construit fără cele moștenite prin legătura prototipală. Este returnat un boolean. Orice obiect care *descinde* din `Object` moștenește și metoda `hasOwnProperty()`.

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
