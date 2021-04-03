# NaN

Această proprietate a obiectului global este o valoare care reprezintă Not-A-Number. Comparearea lui `NaN` cu `NaN` va conduce la un rezultat `false`.

```javascript
NaN === NaN;        // false
Number.NaN === NaN; // false
isNaN(NaN);         // true
isNaN(Number.NaN);  // true
Number.isNaN(NaN);  // true

function valueIsNaN(v) { return v !== v; }
valueIsNaN(1);          // false
valueIsNaN(NaN);        // true
valueIsNaN(Number.NaN); // true
```

Pentru a determina dacă o valoare este `NaN` se va folosi `Number.isNaN()` sau `isNaN`.

```javascript
isNaN('salut');        // true
Number.isNaN('salut'); // false
```

Detectarea unui `NaN` într-un array poate avea următoarele cazuri.

```javascript
let arr = [2, NaN, 34];
arr.indexOf(NaN);                      // -1 (false)
arr.includes(NaN);                     // true
arr.findIndex(n => Number.isNaN(n));   // 2
```
