# Array.length

Este proprietarea unui obiect `Array` care returnează numărul de elemente din array, dar poate să și seteze numărul de elemente. Numărul de elemente returnat nu poate fi decât un număr întreg pe 32 de biți. Poți seta numărul de elemente al array-ului cu această proprietate, trunchiindu-l sau setându-l din start cu un număr predefinit de elemente.

```javascript
var arr = [10, 20, 30, 40];
arr.length = 2; console.log(arr);
// [10,20]
```
