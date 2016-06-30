# Array.prototype.entries()

Returnează un obiect care poate fi iterat.

```js
var arr = ['a', 'b', 'c'];
var eArr = arr.entries(); // acesta este un Iterator

console.log(eArr.next().value); // [0, 'a']
console.log(eArr.next().value); // [1, 'b']
console.log(eArr.next().value); // [2, 'c']
```
