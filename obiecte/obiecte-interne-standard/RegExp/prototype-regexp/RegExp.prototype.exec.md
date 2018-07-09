# RegExp.prototype.exec()

Metoda face o căutare pentru a găsi un fragment de text specificat. Returnează un array în caz că s-a găsit un fragment potrivit regulilor sau `null` în caz contrar.

```javascript
var unText = 'Acesta este o poveste cu 0 pitici';
var sablon = /este o Poveste/ig;
var rezultat = sablon.exec(unText); // [ "este o poveste" ]
rezultat.index; // 7
sablon.lastIndex; // 21
sablon.source; // "este o Poveste"
```

Înainte de toate reține faptul că identificatorul „sablon” din exemplu dat este referința către un obiect RegExp, care își va seta dinamic valorile proprietăților după cum scrii șablonul pe care-l vei folosi. După ce se va face căutarea, se va seta și valoarea lui `lastIndex` în funcție de rezultatul căutării în șir.

În cazul exemplului nostru vom avea următorul rezultat, adică un array. Array-ul returnat conține următoarele valori la indecși după cum urmează:

-   0: 'este o poveste',
-   index: 7,
-   input: 'Acesta este o poveste cu 0 pitici',
-   length: 1

Prima cheie, de la index 0 al array-ului returnat are drept valoare subșirul găsit în baza regulilor șablonului. Cheia `index` indică la ce index al șirului a apărut subșirul potrivit pentru prima oară. Cheia `input` permite accesul la șirul original.

Rezultatul array-ului returnat este determinat de ceea ce este căutat, de felul în care este structurat șablonul. Mai există o informație importantă și aceasta este lungimea array-ului. Valoarea proprietății `lastIndex` a obiectului `RegExp` generat de șablonul folosit este `21`, adică indexul la care s-a potrivit ultimul caracter din șir.

## Folosirea șablonului cu fanionul g menționat

Menționarea fanionului `g` la șablonul `RegExp`, permite căutări multiple într-un șir.

```javascript
var text = `Capra crapă piatra-n patru.
Crăpa-i-ar caprei capul,
cum a crăpat piatra-n patru.`;
var șablon = /cr[a|â]*/gi;
var rezultat = [];
while ((rezultat = șablon.exec(text)) !== null) {
  var gasit = `Am găsit ${rezultat[0]}`;
  gasit += ` la indexul ${șablon.lastIndex}`;
  console.log(gasit);
};
/*
Am găsit cra la indexul 9
Am găsit Cr la indexul 30
Am găsit cr la indexul 61
*/
```
