# Operatorul egal `=`

Acest operator este și primul cu care ai luat contact. Operatorul este folosit pentru a asigna o valoare de inițializare a unei variabile. În cazul evaluării unei expresii aflate în partea din dreapta, operatorul egal va asigna o valoare operandului din partea stângă. Această atribuire se face în funcție de rezultatul la care s-a ajuns în urma evaluării operandului din partea dreaptă.

Operatorul egal poate fi implicat în înlănțuiri de atribuiri. În acest caz, toți identificatorii vor trimite către valoarea rezultată din evaluarea expresiei din extremitatea dreaptă.

```javascript
let a = 1, b = 2, c = 3;
a = b = c; // a, b și c vor avea 3
```

Mai sunt operatorii compuși care fac o operațiune aritmetică și atribuie valoarea imediat. Pentru simplificare și învățarea prin comparație, am ales să-i poziționez împreună cu cei aritmetici.

Momentul declararării trebuie detașat de cel al asignării valorii. Atenție, chiar dacă la declarare am pus egal valoarea, variabila nu va fi instanțiată la momentul compilării. Motorul JavaScript ridică (în limba engleză *hoisting*) în capul codului scris de tine toate declarațiile de variabile cu `var`, nu și cele declarate cu `let` sau `const`. Atribuirea nu se face decât la momentul când execuția ajunge în locul în care s-a făcut declararea din punct de vedere al redactării în momentul în care se pornește execuția codului prin evaluarea expresiilor. Acest lucru este valabil și pentru expresiile de funcții - inițializarea cu valoarea funcției se face în locul declarării. Reține faptul că atribuirea valorilor pentru variabile declarate cu `let` sau folosind `const`, nu declanșează mecanismul de *hoisting*.

Acest comportament este cel vinovat de faptul că atunci când în consolă scrii o declarație de variabilă, atunci când dai enter pentru a o introduce în execuție, mai întâi primești răspunsul `undefined`. Când ai dat enter, mai întâi codul introdus a fost compilat. S-a făcut o rezervare de nume, dacă vrei, dar nu a fost făcută legătura cu valoarea. Acest pas se va face la momentul când expresia va fi evaluată pentru a fi **rezolvată**.

**Spune standardul**:

> `undefined` este pasat mediului pentru a arăta că operațiunea PutValue ar trebui să fie folosită pentru a asigna valoarea de inițializare. Acesta este cazul variabilelor **var** și al listei de parametri formali ai unor funcții non-stricte. În acele cazuri legătura lexicală este hoisted și preinițializată înainte de evaluarea inițializatorilor săi. [12.1.5 Runtime Semantics: BindingInitialization](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-functiondeclarationinstantiation)
