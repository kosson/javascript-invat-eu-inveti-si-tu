# Operatorul virgulă

Evaluarea se face de la stânga la dreapta. Vorbim despre asociativitate stângă. Evaluează operandul dinainte și cel de după. Va returna valoarea celui din RHS (***right hand side***), a celui din dreapta.

```javascript
// Aceste expresii returnează erori la evaluarea cu `use strict`
1, 2, 3; // 3
x = y = 5, z = 10; // 10
x = (z += 1, z); // 11
```
Se remarcă faptul că înainte să fie returnată valoarea celui mai din dreapta operator, expresiile anterioare din înșiruire sunt evaluate și ele.

Evaluează operanzii de la stânga la dreapta.
Returnează valoarea ultimului de la dreapta.

```javascript
1,2; // 2
(15 - 1, 10 +3); // 13
(1 + 3, 4 - 2, 5 + 5); // 10
(() => (2 + 2, 4 - 3))(); // 1; am folosit un fat arrow pentru a evalua
```

Operatorul virgulă permite evaluarea multiplelor expresii într-o singură afirmație și este returnat rezultatul ultimei expresii.

## Referințe

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators](Operatorul virgulă)
