# Array

Este o funcție Constructor existentă în limbaj.

## Mantre

- Atunci când Array este apelat ca funcție și nu ca un constructor, va creea și va inițializa un nou obiect Array

Crearea de array-uri de dimensiuni prestabilite:

```js
var prestabilit = Array(5); // este echivalent cu [,,,,]
```

Are ca efect crearea unui array cu elemente goale.

## Metode aplicabile obiectului Array

| to               | încărcare/descărcare | extragere/încărcare | identificare    | parcurgere/mutații | altele         | creare       |
|:-----------------|:---------------------|:--------------------|:----------------|:-------------------|:---------------|:------------ |
| toSource()       | push()               | splice()            | lastIndexOf()   | map()              | copyWithin()   | Array.from() |
| toString()       | pop()                | slice()             | indexOf()       | reduce()           |                | Array.of()   |
| toLocaleString() | shift()              | concat()            | find()          | reduceRight()      | entries()      | |
|                  | unshift()            |                     | findIndex()     | filter()           | includes()     | |
|                  | fill()               |                     | keys()          | some()             |                | |
|                  |                      |                     | Array.isArray() | every()            |                | |
|                  |                      |                     | sort()          | copyWithin()       | [@@iterator]() | |

![](operatiuniArrayuri.svg)


## Menționarea resurselor folosite pentru documentare:
[MDN>Web technology for developers>JavaScript>JavaScript reference>Standard built-in objects>Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray)
