# Operatorul exponent **

Până la apariția acestui operator (ES6), era folosit `Math.pow(bază, exponent)`.

Pentru că este nevoie de a calcula rapid ridicarea la putere, vom folosi acest operator dedicat. Iată cum ar arăta ridicarea la puterea a treia pentru doi: 2<sup>3</sup>:

```javascript
2 ** 3; // 8
```

Primul operand, cel din LHS este baza, iar cel din dreapta este exponentul.

Câteva cazuri particulare la care trebuie să avem grijă când facem calcule.

| bază                | exponent                           | rezultat |
| ------------------- | ---------------------------------- | -------- |
| expresie            | `NaN`                              | `NaN`    |
| expresie            | +0 / -0                            | 1        |
| `NaN`               | nonzero                            | `NaN`    |
| dacă abs(base) > 1  | +∞                                 | +∞       |
| dacă abs(base) < 1  | -∞                                 | +∞       |
| dacă abs(base) > 1  | -∞                                 | +0       |
| dacă abs(base) = 1  | +∞                                 | `NaN`    |
| dacă abs(base) = 1  | -∞                                 | `NaN`    |
| dacă abs(base) < 1  | +∞                                 | +0       |
| +∞                  | > 0                                | +∞       |
| +∞                  | < 0                                | +0       |
| -∞                  | > 0 și este nr întreg impar        | -∞       |
| -∞                  | > 0 și NU este nr întreg impar     | +∞       |
| -∞                  | < 0 și este nr întreg impar        | -0       |
| -∞                  | < 0 și NU este nr întreg impar     | +0       |
| +0                  | > 0                                | +0       |
| +0                  | < 0                                | +∞       |
| -0                  | > 0 și este nr întreg impar        | -0       |
| -0                  | > 0 și NU este nr întreg impar     | +0       |
| -0                  | < 0 și este nr întreg impar        | -∞       |
| -0                  | < 0 și NU este nr întreg impar     | +∞       |
| < 0 ȘI este definit | este finit și nu este un nr întreg | `NaN`    |

Atenție, calculul cu bază 1 și -1, cu exponent +/-Infinity, vom avea un rezultat diferit de ce prevede standardul IEEE 754-2008.
