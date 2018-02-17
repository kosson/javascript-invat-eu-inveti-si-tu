# Operatorii de atribuire

Au drept sarcină asignarea unei valori operandului din partea stângă iar această atribuire se face în funcție de rezultatul la care s-a ajuns în urma evaluării operandului din partea dreaptă.

## Operatorul egal `=`

Este operatorul de bază pentru atribuirea valorilor.
Operatorul egal poate fi implicat în înlănțuiri de atribuiri. În acest caz, toți identificatorii vor trimite către valoarea rezultată din evaluarea expresiei din extremitatea dreaptă.

```javascript
var a = 1, b = 2, c = 3;
a = b = c; // a, b și c vor avea 3
```

Mai sunt operatorii compuși care fac o operațiune aritmetică și atribuie valoarea totodată, dar pentru simplificare și învățarea prin comparație, am ales să-i poziționez împreună cu cei aritmetici.

Momentul declararării trebuie detașat de cel al asignării valorii. Motorul JavaScript ridică în capul codului (*hoisting*) scris de tine toate declarațiile de variabile cu `var`, dar atribuirea nu se face decât la momentul când execuția ajunge în locul în care s-a făcut declararea din punct de vedere a redactării. Acest lucru este valabil și pentru expresiile de funcții - inițializarea cu valoarea funcției se face în locul declarării. Reține faptul că atribuirea valorilor pentru variabile declarate cu `let` sau folosind `const`, nu declanșează mecanismul de *hoisting*.
