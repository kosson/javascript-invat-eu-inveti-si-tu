# `Object.getOwnPropertySymbols(obiectul)`

Returnează un array cu toate simbolurile setate pentru un obiect. Primește la parametri obiectul pentru care se face interogarea.

Este singura metodă prin care poți genera un array ce conține simbolurile care servesc drept chei pentru anumite proprietăți care se doresc a fo protejate și care să servească doar obiectului a cărui membru sunt.

```javascript
var obi = {},
    propPrivata = Symbol('stauPitita');

console.log(Object.getOwnPropertyNames(obi)); //=> []
console.log(Object.getOwnPropertySymbols(obi)); // [Symbol(stauPitita)]
```
