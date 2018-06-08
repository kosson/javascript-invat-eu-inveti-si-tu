# Enunțul while

While se traduce în limba română prin `câtă vreme`. Verbalizarea acestei comenzi ar fi „de câte ori evaluarea expresiei conduce la o valoare ce poate fi redusă la un boolean `true`, execută codul dintre acolade”.

```javascript
var x = 0;
while (x < 10) {
  console.log(x); // execută funcția log
  x++;            // modifică valoarea
};
```

Remarcă faptul că testul condiției se face la începutul fiecărei iterații. Acest lucru înseamnă că în caz de valoare `false`, codul nu se va executa nici măcar pentru o singură iterație.

While își are locul său, dar practica înclină către folosirea instrucțiunii `for`, care în condiția de test permite introducerea a trei expresii. Evaluarea acestor trei expresii va determina continuarea iterării sau nu.

Folosește `while` acolo unde condiția de test este simplă.

Când vorbim de simplă nu înseamnă să te limitezi la o singură expresie, ci poți avea una care să fie o combinație destul de elaborată ca și condiție.

```javascript
var a = 5, b = 4;
while (a < 10 && b > 3) {
  console.log(a);
  a++; b++;
};
```
