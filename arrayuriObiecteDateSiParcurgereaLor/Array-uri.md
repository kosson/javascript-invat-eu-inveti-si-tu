# Generalități

Array-urile conțin mai multe valori numite elemente.
Indexarea internă a elementelor atunci când nu este explicită, pornește de la 0.

| valoare | el1 | el2 | el3 |
|---------|:---:|:---:|:---:|
| index   |  0  |  1  |  2  |

## Crearea array-urilor

### Folosind constructorul: ```new Array()```
```js
var tablou = new Array();
```

### Cu declararea simplă prin paranteze drepte: array literal
```js
var tablou = [];
```

## Mantre

- Array-urile sunt obiecte.

### Metode aplicabile obiectului array

| to               | încărcare/descărcare | extragere | identificare  | iterare       | altele       |
|:-----------------|:---------------------|:----------|:--------------|:--------------|--------------|
| toSource()       | push()               | splice()  | lastIndexOf() | map()         | copyWithin() |
| toString()       | pop()                | slice()   | indexOf()     | reduce()      | fill()       |
| toLocaleString() | shift()              | concat()  | find()        | reduceRight() | entries()    |
|                  | unshift()            |           | findIndex()   | filter()      | includes()   |
|                  |                      |           | keys()        | some()        |              |
|                  |                      |           |               | every()       |              |
