# `String.prototype.includes()`

Este o metodă introdusă recent. Înainte de aceasta era folosită `String.prototype.indexOf()`.

Determină dacă un șir căutat se află într-un altul. Dacă nu găsește șirul este returnat `false`.
Poate primi un număr de caractere care indică de unde se va începe căutarea.

```js
var continut = "Acesta este o mostră de test";
console.log(continut.includes("test")); // true
console.log(continut.includes("este", 7)); // true
```
