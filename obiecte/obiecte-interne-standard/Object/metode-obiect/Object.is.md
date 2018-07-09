# Object.is

Compară două valori pentru a vedea dacă sunt egale. Nu este același lucru cu operatorii `==` și `===` care fac operațiuni de coerciție asupra operatorilor.

Verifică dacă valorile sunt ambele:

- `undefined`
- `null`
- `true` sau `false`
- șiruri de caractere cu aceeași lungime
- același obiect
- numere:
  - ambele numere sunt pozitive
  - ambele numere sunt negative
  - amble sunt NaN

```javascript
Object.is('text', 'text'); // true
Object.is(window, window); // true
Object.is([], []);         // false
Object.is(null, null);     // true

Object.is(0, -0);    // false
Object.is(-0, -0);   // true
Object.is(NaN, 0/0); // true

let obi = {
  prima: 10,
  aDoua: function(){console.log("Salut!");}
};

var obi2 = Object.create(
  Object.getPrototypeOf(obi),
  Object.getOwnPropertyDescriptors(obi)
);
Object.is(obi, obi2); // false
Object.is(obi, obi);  // true
```
