# `String.prototype.startsWith()`

Stabilește dacă un șir de caractere începe cu un anumit subșir specificat. Dacă da este returnat `true`, dacă nu `false`.
Poate primi si numărul de caractere de la care să stabilească o nouă falsă dimensiune a șirului pe care să facă căutarea.

```javascript
var continut = "Acesta este o mostră de test";
console.log(continut.startsWith("Acesta")); // true
console.log(continut.startsWith("este", 7)); // true
```
