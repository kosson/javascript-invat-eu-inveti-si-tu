# Operatorul virgulă

Este un operator care evaluează operandul dinainte și cel de după. Va returna valoarea celui din RHS (***right hand side***), a celui din dreapta.

```javascript
1,2; // 2
(15 - 1, 10 +3); // 13
(1 + 3, 4 - 2, 5 + 5); // 10
(() => (2 + 2, 4 - 3))(); // 1; am folosit un fat arrow pentru a evalua
```

Operatorul virgulă permite evaluarea multiplelor expresii într-o singură afirmație și este returnat rezultatul ultimei expresii.

## Referințe

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators](Operatorul virgulă)
