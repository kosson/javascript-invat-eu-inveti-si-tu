### Set.prototype.entries()

Folosirea acestei metode are drept rezultat un iterator care conține un array cu toate valorile din `Set` în ordinea în care au fost introduse de forma \[valoare, valoare].

```javascript
var setNou = new Set(['unu', 1, true]);
var iteratorObj = setNou.entries();
console.log(iteratorObj.next().value); // Array [ "unu", "unu" ]
console.log(iteratorObj.next().value); // Array [ 1, 1 ]
console.log(iteratorObj.next().value); // Array [ true, true ]
```