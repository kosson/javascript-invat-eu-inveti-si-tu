# String.prototype.padStart

În limba română **pad** s-ar traduce ca *umplutură* și în metoda noastră chiar așa se și comportă. Această metodă a fost introdusă în ES8 sau ECMAScript 2017.

Metoda introduce spații sau un șir de caractere specificat la începutul unui șir pentru a ajunge la o dimensiune dorită. Dacă nu este specificat un anume caracter, cel care va fi *injectat* la începutul șirului va fi SPACE.

```javascript
'ceva'.padStart(5); // " ceva"
```

Ceea ce se petrece este că vor fi luate în calcul doar valorile care depășesc lungimea șirului. Dacă numărul întreg este mai mic decât `șir.length`, nu se va observa nicio modificare.

```javascript
'ceva'.padStart(5, 'xXx'); // "xceva"
```

Opțional, se poate preciza un alt șir de caractere, care să constituie fragmentele ce vor fi înjectate la început. Pe măsură ce numărul elementelor din *padding* este crescut, spațiul creat, va acomoda comfortabil șirul care se dorește a fi injectat. Iar dacă spațiul creat depășește numărul caracterelor din șirul de injectat, acesta va începe se se repete până la **umplerea** completă a spațiului creat

```javascript
'ceva'.padStart(7, 'xXx'); //  "xXxceva"
'ceva'.padStart(10, 'xXx'); // "xXxxXxceva"
'ceva'.padStart(10, '#'); // "######ceva"
```

## Normalizarea unor date de aceeași lungime

Această metodă este foarte utilă atunci când avem un fragment de date care trebuie să fie de o anumită lungime fixă. Pentru a nu fi observabile *umpluturile*, putem face un padding cu spații, dar poți să pui zerouri sau oricare caracter, care în opinia celui care contruiește baza de date, poate juca rolul de caracter de control (control al dimensiunii, bineînțeles). Cuplat cu un `map`, acest lucru se poate face pentru toate elementele unei colecții.

```javascript
const colecție = [1, 3, 12, 45];
let normalizat = colecție.map(element => element.toString().padStart(5, '0'));
console.log(normalizat.valueOf());
// [ "00001", "00003", "00012", "00045" ]
```
