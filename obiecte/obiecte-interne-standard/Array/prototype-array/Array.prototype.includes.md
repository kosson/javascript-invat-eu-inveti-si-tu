# `Array.prototype.includes()`

Metoda verifică dacă într-un array există un anume element returnând `true` sau `false `după caz.
Se poate menționa și indexul de la care să se facă căutarea.

```javascript
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
```
