# `Object.values()`

Este o metodă introdusă de ECMAScript 2017. Fiindu-i pasat un obiect, metoda va returna un array cu toate proprietățile enumerabile ale unui obiect. Aceste proprietăți vor fi cele ale obiectului, nu și cele moștenite.

```javascript
var obi = {a: 10, b: true};
console.log(Object.values(obi)); // [10,true]
var arr = [10, true];
console.log(Object.values(arr)); // [10,true]
Object.values('ceva'); // ["c","e","v","a"]
```
