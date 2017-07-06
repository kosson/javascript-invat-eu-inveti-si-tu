# `String.prototype.endsWith()`

Stabilește dacă un șir de caractere se încheie cu un alt șir specificat. Dacă da este returnat `true`, dacă nu `false`.
Poate primi și un număr de caractere care definește o falsă nouă dimensiune a șirului pe care să se facă căutarea.

```javascript
var continut = "Acesta este o mostră de test";
console.log(continut.endsWith("test")); // true
console.log(continut.endsWith("este", 11)); // true
```
