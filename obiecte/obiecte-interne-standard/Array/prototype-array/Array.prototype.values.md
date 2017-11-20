# `Array.prototype.values()`

Returnează un nou obiect `Array Iterator`, care conține valorile pentru fiecare index din array.
La momentul redactării materialului spuportul este limitat. Doar Chrome.

```javascript
// testează doar în Chrome
var colectie = ["unu", "doi", "24", {unu: 1}];
var iterabil = colectie.values();

for(let elem of iterabil){
  console.log(elem);
};
```
