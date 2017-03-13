# Array.prototype.fill()

Umple un array cu o valoare fixă specificată pornind de la un index menționat până la alt index ce marchează limita dar nu o include.

Dacă indexul de start este un număr negativ, se va trata ca lungimea arrray-ului plus valoarea negativă a startului. Dacă limita este un număr negativ este tratat ca lungimea array-ului plus valoarea negativă.

```js
[1, 2, 3].fill(4);               // [4, 4, 4]
[1, 2, 3].fill(4, 1);            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
[1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
[1, 2, 3].fill(4, -3, -2);       // [4, 2, 3] length este 3. 3 - 3 este 0, deci pornești de la index 0 până la index 3 - 2 = 1
[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
Array(3).fill(4);                // [4, 4, 4]
[].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}
```
