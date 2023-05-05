# Array.prototype.findLastIndex

Este o metodă iterativă care parcurge un array în sens invers returnând valoarea elementului care este satisface condițiile menționate într-o funcție cu rol de callback. În cazul în care niciun element nu este găsit, metoda returnează valoarea `-1`.

```javascript
let arr = [1,2,3,4];
let ultimulIndex = arr.findLastIndex((element) => element > 2); // 3
```

## Parametrii

Primul parametru este funcția cu rol de callback. Dacă rezultatul evaluării este o valoare *truthy*, atunci va fi returnată valoarea din array care a corespuns criteriilor din corpul funcției. La rândul său, funcția cu rol de callback primește trei posibile argumente. Primul este chiar elementul din array care va fi investigat, al doilea este indexul elementului, iar cel de-al treilea este însuși array-ul care este prelucrat.

Al doilea parametru este un obiect la care se dorește să se facă legătura `this`.

## Resurse

- [findLastIndex | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)