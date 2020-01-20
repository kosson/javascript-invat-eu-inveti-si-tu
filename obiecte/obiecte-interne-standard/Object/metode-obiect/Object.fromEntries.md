# Object.fromEntries()

Metoda va transforma un array ale cărui elemente sunt array-uri ce conțin drept prim element numele viitoarei chei, iar cel de-al doilea fiind valoarea, într-un obiect.

```javascript
const elemente = new Map([
  ['a', 10],
  ['b', 20]
]);
const obi = Object.fromEntries(elemente);
```
