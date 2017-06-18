# Comanda `throw`

Această comandă indică faptul că există o excepție, o stare de eroare, care trebuie să fie instrumentată de o funcție dedicată cu tratarea acestora (exception handler).

Înainte de a lămuri comanda `throw`, o vom traduce în limba română cu termenul de „a raporta”.

```javascript
function ix(condition){
  if(condition !== true){
    throw new Error('Este falsă valoarea');
  }
}; ix(false); // Error: Este falsă valoarea
```
