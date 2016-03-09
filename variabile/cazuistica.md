## Mantre
- variabilele și funcțiile beneficiază de un proces al motorului JavaScript numit ***identifier lookup***. Este necesar pentru a discrimina între variabilele din local scope dintr-o funcție și una din global scope.  

## Evaluarea unei expresii care conține valori delimitate prin virgulă

```js
var x = 1;
var y = 2;
var z = x + y; // 3

console.log( y = (x = y,z) ); // evaluează la 3
```

// x va fi 2 pentru că va primi valoarea pe care o are y
// y va fi 3 pentru că evaluarea unei înșiruiri delimitate de virgulă returnează ultima valoare din înșiruire.
