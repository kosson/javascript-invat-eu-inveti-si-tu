## Instrucțiunea `while`

While ca instrucțiune în JavaScript se traduce în limba română prin `câtă vreme`. Verbalizarea acestei comenzi ar fi „câtă vreme la evaluarea expresiei dintre paranteze este returnată o valoare de adevăr, execută codul dintre acolade”.

```javascript
var x = 0;
while (x < 10) {
  console.log(x); // execută funcția log
  x++;            // modifică valoarea
};
```

While își are locul său dar practica înclină către folosirea instrucțiunii `for` care în condiția de test permite introducerea a trei expresii. Evaluarea tuturor acestor trei expresii va determina continuarea iterării sau nu.

Folosește while acolo unde condiția de test este simplă.

Când vorbim de simplă nu înseamnă să te limitezi la o singură expresie, cu poți avea una care să fie o combinație destul de elaborată care să exprime condiția.

```javascript
var a = 5, b = 4;
while (a < 10 && b > 3) {
  console.log(a);
  a++; b++;
};
```
