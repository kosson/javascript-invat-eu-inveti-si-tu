# `RegExp.prototype.exec()`

Metoda face o căutare pentru a găsi un fragment de text specificat. Returnează un array sau `null`.

```javascript
var unText = 'Acesta este o poveste cu 0 pitici';
var sablon = /este o Poveste/ig;
var rezultat = sablon.exec(unText); //Array [ "este o poveste" ]
rezultat.index; // 7
```

Este returnat un array care conține următoarele chei:
- 0: 'este o poveste',
- index: 7,
- input: 'Acesta este o poveste cu 0 pitici',
- length: 1

Prima cheie, de la index 0 are drept valoare șirul tuturor caracterelor potrivite.
Cheia `index` indică unde a apărut subșirul potrivit pentru prima oară.

Rezultatul array-ului returnat este determinat de ceea ce este căutat, de felul în care este structurat șablonul.

Ceea ce nu variază este ceea valoarea cheii `input`, care permite accesul la șirul analizat.

Mai există o informație importantă și aceasta este lungimea array-ului.
