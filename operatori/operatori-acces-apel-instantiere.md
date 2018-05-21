## Operator de acces: punct

Banalul punct este folosit de JavaScript ca operator ce oferă acces la proprietățile unui obiect. Accesul se face menționând numele obiectului punct și numele sau cheia ce identifică o valoare: `obiect.oProprietate`. Același operator poate fi folosit pentru a introduce o valoare într-un obiect.

În cazul în care valoarea este o metodă, adică o expresie, aceasta trebuie evaluată pentru a ajunge la un rezultat care să fie util mai departe.

```javascript
let obi = {
  a: 10,
  b: function () {return this.a + 10;}
};
obi.b();
obi.a += 1; // a este 11
```

Același operator poate fi folosit pentru a introduce o valoare în obiect.

## Operatorul de apelare al funcțiilor - `()`

Două paranteze rotunde au drept efect invocarea unei funcții. Între paranteze pot fi introduse valorile așteptate de parametrii funcției.

```javascript
function facCeva (a, b) {
  return a + b;
};
facCeva(1, 2);  // 3
```
