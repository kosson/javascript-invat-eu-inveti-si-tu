# `throw`

Înainte de a lămuri comanda `throw`, o vom traduce în limba română cu termenul de „a raporta”, dar acolo.

```javascript
function ix(condition){
  if(condition !== true){
    throw new Error('Este falsă valoarea');
  }
}; ix(false); // Error: Este falsă valoarea
```
