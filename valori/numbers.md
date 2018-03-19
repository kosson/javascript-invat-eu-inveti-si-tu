# Number

Această valoare este o primitivă.

Valorile numerice în JavaScript sunt reflectate în formatul binar, iar JavaScript folosește un număr limitat de biți pentru a reprezenta numerele. O valoarea numerică în JavaScript este de 64 de biți ceea ce oferă o dimensiune de 2 la puterea 64, adică aproximativ 18 cvintilioane. Dintre acestea, trebuie folosite o parte pentru a reprezenta numerele pe axa negativă și iarăși o parte trebuie folosite pentru a marca semnul minus ce indică faptul că un număr e la stânga lui 0.
Reprezentarea numerelor în JavaScript respectă standardul IEEE 754.
Numerele întregi pot fi reprezentate cu o acuratețe de 53 de biți. Concluzia este că JavaScript poate reprezenta numere întregi chiar dacă nu are un tip de primară `integer` așa cum are, de exemplu, Java.

Sunt date numerice. Aceste pot fi numere întregi sau zecimale.

```javascript
typeof 5;     // "number"
typeof 10.1;  // "number"
```

Numerele fracționare sunt scrise folosind notația cu punct.

Atenție la mecanismul automat de transformare (*coercion*):

```javascript
3 + 1;    // 4
3 + true; // 4
3 + "1";  // "31"
3 + 1 + "1";  // "41"
3 + "1" + 1;  // "311"
```

Numerele pot fi și octale (în bază 8) sau hexazecimale (în baza 16).

```javascript
034; // 28 (octal), 3 de 8 plus 4
0xDF; // 223 (hexa)
```

Numerele foarte mari pot fi reprezentate cu ajutorul unui exponent, adică folosind  **notația științifică** a numerelor.

```javascript
3E3; // 3000
// poate fi rescris ca
3e+3; // 3000
```

Este 3 ori 10 la puterea a treia. Puterea poate fi specificată cu un număr negativ.

```javascript
2.1e+2; // 210
2.1e-2; // 0,021
```

Obiectul global oferă două metode foarte importante pentru lucrul cu valori numerice.

## Metoda `parseInt()` din obiectul global

Această metodă primește un argument de tip șir și returnează un număr întreg într-o anumită bază, dacă aceasta este menționată prin cel de-al doilea argument acceptat.
Dacă primul argument nu este un caracter șir, orice este, va fi convertit la șir mai întâi și apoi la număr. Dacă sunt introduse spații acestea vor fi complet ignorate. Dacă la convertire se ajunge la o valoare care nu este numerică, este returnat `NaN`, iar dacă primul caracter nu poate fi convertit într-un număr, tot NaN este returnat.

```javascript
var numar = '239'; typeof numar; // "string"
var întreg = parseInt(numar);
typeof întreg; // "number"
```

Dacă specifici al doilea argument acesta reprezintă baza și trebuie să fie un număr întreg cuprins între 2 și 36. Valoarea asumată inițial este baza 10.
Dacă metoda întâlnește un caracter care nu este un numeral în baza specificată, acesta este ignorat și este returnat numărul format până la acel caracter. Nu folosi șiruri de caractere care sunt de fapt numere în notație științifică.

Ce se întâmplă când nu specifici rădăcina?

-   Dacă șirul începe cu secvența 0x sau 0X, metoda spune că ar fi un număr în baza 16 (hexazecimal);
-   Dacă șirul începe cu 0, atunci se presupune că numărul este zecimal;
-   Dacă șirul începe cu orice altceva, se presupune că rădăcina este 10 (zecimal).

Această metodă poate fi regăsită și ca membră a obiectului `Number`, fiind introdusă odată cu ECMAScript 2015.

## Metoda `parseFloat()` din obiectul global

Dacă primul caracter nu poate fi convertit la număr, atunci este returnat `NaN`.

```javascript
parseFloat('3.1415');
```

Această metodă este membru și a obiectului `Number` începând cu ECMAScript 2015.
