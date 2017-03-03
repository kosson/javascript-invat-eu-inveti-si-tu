# `Array.prototype.entries()`

Returnează un obiect care poate fi iterat. Poți obține pentru fiecare `next()` câte un array care conține indexul elementului din array-ul original și valoarea sa.

```js
var arr = ['a', 'b', 'c'];
var eArr = arr.entries(); // acesta este un Iterator

console.log(eArr.next().value); // [0, 'a']
console.log(eArr.next().value); // [1, 'b']
console.log(eArr.next().value); // [2, 'c']
```
