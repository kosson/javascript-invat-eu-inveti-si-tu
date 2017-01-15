# Array.prototype[@@iterator]()

Valoarea inițială a lui `@@iterator` este același obiect funcție ca și valoarea inițială a proprietății `values()`.

Este folosit de buclele făcute cu `for...of` și, de fapt, se face apel la `Symbol.iterator`.
Valoare care este returnată, este chiar funcția `values()`.

```javascript
var arr = ['unu', 'doi', 'trei'];
var arrayIterat = arr[Symbol.iterator](); // se obține un iterator

for(let element of arrayIterat){
  console.log(element);
}; // unu doi trei
```
