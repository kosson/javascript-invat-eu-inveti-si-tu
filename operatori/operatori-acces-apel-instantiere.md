## Operator de acces cu punct (.)

Banalul punct este folosit de JavaScript ca operator ce oferă acces la proprietățile unui obiect. Accesul se face menționând numele obiectului punct și numele sau cheia ce identifică o valoare: `obiect.oProprietate`. Același operator poate fi folosit pentru a introduce o valoare într-un obiect.

## Accesarea proprietății concomitent cu evaluarea expresiei

Privind accesarea proprietăților unui obiect, în cazul în care valoarea este o metodă, adică o expresie, aceasta trebuie evaluată pentru a ajunge la un rezultat care să fie util mai departe.

```javascript
var obi = {
  a: 10,
  b: function () {return this.a + 10;}
};
obi.b();
obi['b']();
```

Același operator poate fi folosit pentru a introduce o valoare în obiect.

## Operatorul de apelare a funcțiilor
