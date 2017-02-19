# Operatorul virgulă `,`

Evaluarea se face de la stânga la dreapta. Asociativitate stângă

Evaluează operanzii de la stânga la dreapta.
Returnează valoarea ultimului de la dreapta.

```javascript
// Aceste expresii returnează erori la evaluarea cu `use strict`
1, 2, 3; // 3
x = y = 5, z = 10; // 10
x = (z += 1, z); // 11
```

Se remarcă faptul că înainte să fie returnată valoarea celui mai din dreapta operator, expresiile anterioare din înșiruire sunt evaluate și ele.
