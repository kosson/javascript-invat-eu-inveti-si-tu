# String.prototype.startsWith()

Stabilește dacă un șir de caractere începe cu un anumit subșir specificat. Metoda acceptă un al doilea argument, fiind poziția indexului de unde ar trebui să pornească căutarea. Dacă da este returnat `true`, dacă nu `false`.
Poate primi si numărul de caractere de la care să stabilească o nouă falsă dimensiune a șirului pe care să facă căutarea.

```javascript
var continut = "Acesta este o mostră de test";
console.log(continut.startsWith("Acesta")); // true
console.log(continut.startsWith("este", 7)); // true
```

Această metodă realizează o complementaritate cu metoda `Array.prototype.indexOf()`.
