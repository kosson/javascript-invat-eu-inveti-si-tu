# Folosirea operatorului rest (...)

```javascript
var [x, ...restop] = [1, 2, 3];
console.log(x, restop); // 1 și Array [ 2, 3 ]
```

Tot ce generează un array, folosindu-se această sintaxă, se poate transforma în legături la identificatori, adică valorile array-ului se pot atribui unor variabile ce sunt elementele unui alt array.
