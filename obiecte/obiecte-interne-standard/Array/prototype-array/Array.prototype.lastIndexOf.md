# Array.prototype.lastIndexOf()

Returnează ultimul index al unui element căutat în array. Returnează `-1` dacă elementul nu există. Opțional se poate menționa un al doilea parametru care indică indexul de unde să se facă căutarea pornind dinspre coadă. Din start acest parametru opțional este lungimea array-ului `-1`.

```javascript
var array = [2, 5, 9, 2];
array.lastIndexOf(2);     // 3
array.lastIndexOf(7);     // -1
array.lastIndexOf(2, 3);  // 3
array.lastIndexOf(2, 2);  // 0
array.lastIndexOf(2, -2); // 0
array.lastIndexOf(2, -1); // 3
```

### Găsirea tuturor indicilor la care apare valoarea căutată

```javascript
var indici = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.lastIndexOf(element);
while (idx != -1) {
  indici.push(idx);
  idx = (idx > 0 ? array.lastIndexOf(element, idx - 1) : -1);
};
console.log(indici); // [4, 2, 0]
```
