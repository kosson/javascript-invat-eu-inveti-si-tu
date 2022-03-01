# Object.prototype.hasOwnProperty()

Este o metodă folosită în cazul în care dorești să utilizezi proprietățile care aparțin obiectului exceptându-le pe cele moștenite prin legătura prototipală. Este returnată o valoare boolean `true` dacă proprietatea aparține obiectului și nu a fost moștenită. Valoarea `false` este returnată dacă proprietatea este moștenită sau nu a fost declarată (nu există).

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

Orice obiect care *descinde* din `Object` moștenește și metoda `hasOwnProperty()`.

O problemă apare în moștenirea acestei metode dacă un obiect este creat cu `Object.create()`. Această metodă are nevoie de un obiect care să fie obiectul prototipal al celui creat. În cazul în care obiectul cu rol de prototip este `null`, atunci această metodă nu este disponibilă obiectului nou creat.

```javascript
let obi = Object.create(null);
```

O alternativă este folosirea noii metode ES2022 `Object.hasOwn()`, care va putea fi folosită și în cazul în care folosești obiecte cu moștenirea tăiată.
