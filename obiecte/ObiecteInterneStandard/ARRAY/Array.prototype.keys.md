# Array.prototype.keys()

Această metodă returnează un Array Iterator care conține cheile array-ului.

```js
var colectie = ["a", "z", "ceva"];
var iterator = colectie.keys();

console.log(iterator.next()); // { value: 0, done: false }
```
