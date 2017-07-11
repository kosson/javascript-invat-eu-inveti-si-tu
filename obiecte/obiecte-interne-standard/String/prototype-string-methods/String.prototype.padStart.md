# `String.prototype.padStart()`

În limba română **pad** s-ar traduce ca „umplutură” și în metoda noastră chiar așa se și comportă. Această metodă a fost introdusă în ES8 sau ECMAScript 2017.

Metoda introduce spații sau un șir de caractere specificat la începutul unui șir pentru a ajunge la o dimensiune dorită. Implicit, caracterul care va fi „injectat” la începutul șirului va fi caracterul SPACE.

```javascript
'ceva'.padStart(5); // " ceva"
```

Ceea ce se petrece este că vor fi luate în calcul doar valorile care depășesc lungimea șirului. Dacă numărul întreg este mai mic decât `șir.length`, nu se va observa nicio modificare.

```javascript
'ceva'.padStart(5, 'xXx'); // "xceva"
```

Opțional, se poate preciza un alt șir de caractere, care să constituie fragmentele ce vor fi înjectate la început. Pe măsură ce numărul elementelor din padding este crescut, spațiul creat, va acomoda comfortabil șirul care se dorește a fi injectat. Iar dacă spațiul creat depășește numărul caracterelor din șirul de injectat, acesta va începe se se repete până la **umplerea** completă a spațiului creat

```javascript
'ceva'.padStart(7, 'xXx'); //  "xXxceva"
'ceva'.padStart(10, 'xXx'); // "xXxxXxceva"
'ceva'.padStart(10, '#'); // "######ceva"
```
