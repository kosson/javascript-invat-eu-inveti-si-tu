## Evaluarea unei expresii care conține valori delimitate prin virgulă

```js
var x = 1;
var y = 2;
var z = x + y; // 3

console.log( y = (x = y,z) ); // evaluează la 3
```

// x va fi 2 pentru că va primi valoarea pe care o are y
// y va fi 3 pentru că evaluarea unei înșiruiri delimitate de virgulă returnează ultima valoare din înșiruire.
