# Number

Această valoare este o primitivă.

Valorile numerice în JavaScript sunt înțelese în format binar, fiind folosit un număr limitat de biți pentru a le reprezenta. O valoarea numerică în JavaScript este de 64 de biți ceea ce oferă o dimensiune de 2 la puterea 64, adică aproximativ 18 cvintilioane (*double precision floating point numbers*). Dintre acestea, trebuie folosite o parte pentru a reprezenta numerele pe axa negativă și iarăși o parte trebuie folosite pentru a marca semnul minus ce indică faptul că un număr e la stânga lui `0`.

Reprezentarea numerelor în JavaScript respectă standardul [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision).
Numerele întregi pot fi reprezentate cu o acuratețe de 53 de biți (2^53, adică `Number.MAX_SAFE_INTEGER`). Concluzia este că JavaScript poate reprezenta numere întregi chiar dacă nu are un tip de primară `integer` așa cum au alte limbaje. Pentru a reprezenta numere mai mari, se va folosi constructorul `BigInt`.

Uneori ai nevoie să verifici dacă datele de lucru sunt numere. Aceste pot fi numere întregi sau zecimale.

```javascript
typeof 5;    // "number"
typeof 10.1; // "number"
```

Numerele fracționare sunt scrise folosind notația cu punct.

Atenție la mecanismul automat de transformare (*coercion*), pe care motorul îl angajează la momentul evaluării:

```javascript
3 + 1;       //  4
3 + true;    //  4
3 + "1";     // "31"
3 + 1 + "1"; // "41"
3 + "1" + 1; // "311"
```

Numerele pot fi și octale (în bază 8) sau hexazecimale (în baza 16).

```javascript
034;  // 28 (octal), 3 de 8 plus 4
0xDF; // 223 (hexa)
```

Numerele foarte mari pot fi reprezentate cu ajutorul unui exponent, adică folosind  **notația științifică** a numerelor. În loc să scrii o grămadă de zero-uri, mai bine adaugi un `e` și un număr care indică câte sunt. De exemplu, pentru un miliard, avem `1e9`.

```javascript
3E3;  // 3000
/* poate fi rescris ca ridicare la putere */
3e+3; // 3000
```

Este 3 ori 10 la puterea a treia. Puterea poate fi specificată cu un număr negativ.

```javascript
2.1e+2; // 210
2.1e-2; // 0,021
1e-6;   // 0.000001, adică 1/1000
```

Obiectul global oferă două metode foarte importante pentru lucrul cu valori numerice:
- `parseInt()`,
- `parseFloat()` și
- `Object.prototype.toString()`.

## Metoda `parseInt()` din obiectul global

Această metodă primește un argument de tip șir și returnează un număr întreg într-o anumită bază, dacă aceasta este menționată prin cel de-al doilea argument acceptat. Fii foarte atentă la următorul aspect: `parseInt()` mai întâi convertește valoarea primită la string. Numele cu zecimale mai mari de 6 (10^-6), vor fi scrise folosind notația cu exponent. Astfel, un număr cu zecimală precum `0.0000007`, va fi returnat de `parseInt` ca `7e-7` pentru că String(0.0000007) va returna "7e-7" și mai departe `parseInt()` îl va citi doar pe 7 din șirul prelucrat. În acest caz, cel mai bine ar fi să folosești `Math.floor()`.
Dacă primul argument nu este un caracter șir, orice este, va fi convertit la șir mai întâi și apoi la număr. Dacă sunt introduse spații acestea vor fi complet ignorate. Dacă la convertire se ajunge la o valoare care nu este numerică, este returnat `NaN`, iar dacă primul caracter nu poate fi convertit într-un număr, tot `NaN` este returnat.

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

Această metodă este membră a obiectului `Number`, fiind introdusă odată cu ECMAScript 2015.

## Metoda `parseFloat()` din obiectul global

Dacă primul caracter nu poate fi convertit la număr, atunci este returnat `NaN`.

```javascript
parseFloat('3.1415');
```

Această metodă este și membru a obiectului `Number` începând cu ECMAScript 2015.

## Separatoare

Pentru a fi mai ușor de citit numerele de mari dimensiuni, se poate folosi caracterul underscore pentru a separa mantisele.

```javascript
// numere zecimale
1_543.85
1_000_000
```

Același separator poate fi folosit și pentru numerele reprezentate octal, binar sau hexazecimal.

## Resurse

- [Numbers | JavaScript.info](https://javascript.info/number)
- [Why JavaScript is Bad At Math | Alexandra Langtom](https://javascript.plainenglish.io/why-javascript-is-bad-at-math-9b8247640caa)
- [Lexical grammer | Numeric separators | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar)
