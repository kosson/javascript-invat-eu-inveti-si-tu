# `Array.of()`

Este o metodă introdusă de ECMAScript 6 și lucrează ca și constructorul `Array` dar fără restricții de constituire. Metoda creează un array cu un număr variabil de argumente indiferent de numărul sau tipul acestora.

Diferența dintre metoda `Array.of()` și constructorul Array este în felul în care sunt gestionate argumentele ca numere întregi. `Array.of(42)` creează un array cu un singur element în vreme ce `Array(42)` creează un array cu 42 de elemente.

Poți construi o funcție specializată în constituirea de array-uri prin pasarea metodei.

```javascript
function unArray (metodaCaValoare, valori) {
  return metodaCaValoare(valori);
};
let colectie = unArray(Array.of, valoare);
```
