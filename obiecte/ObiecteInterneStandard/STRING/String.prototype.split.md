# `String.prototype.split()`

Metoda pur și simplu sparge șirul construind un array cu fragmentele șirului. Poate accepta doi parametri: un separator și o limită. Această limită este, de fapt un număr care menționează de câte ori să se facă „tăierea” șirului. ATENȚIE! Operațiunea inversă este `concat()`.

Metoda returnează un array de substringuri care au fost „tăiate” acolo unde a fost găsit separatorul, dar separatorul este „șters” din subșirul care este introdus în array.

Separatorul este un caracter sau o **expresie regulată**.

Dacă este omis separatorul, arrayul returnat va conține un singur element care va fi întregul șir.
Dacă separatorul este un șir vid, atunci șirul este convertit la un array de caractere.
Dacă separatorul este o expresie regulată care conține paranteze de captură, atunci de fiecare dată când când se face identificare, rezultatele (chiar și undefined) sunt introduce prin slicing în arrayul rezultat.

Setarea limitei este opțională. Este un număr întreg, care indică de câte ori va fi spart șirul.

```js
var arr = "unu,doi,trei,patru,cinci".split(",");
console.log(arr); // Array [ "unu", "doi", "trei", "patru", "cinci" ]
```

Dacă separatorul este o expresie regulată care conține paranteze, atunci, ori de câte ori se pace regăsirea după criteriile menționate de regex, rezultatele (plus cele undefined), dictate de paranteze, vor fi incluse în array-ul rezultat.

```js
var unsir = 'Acesta este un șir de test'
    altsir = 'Dac\'aterizezi, Pe o planetă, Unde-i frig, Și n-ai jachetă';

unsir.split(); // Array [ "Acesta este un șir de test" ]
unsir.split(' '); // Array [ "Acesta", "este", "un", "șir", "de", "test" ]
altsir.split(','); // Array [ "Dac'aterizezi", " Pe o planetă", " Unde-i frig", " Și n-ai jaketă" ]
altsir.split(',', 2); // Array [ "Dac'aterizezi", " Pe o planetă" ]
```

Folosirea unui regex pentru a extrage subșiruri.

```js
var sir = 'Gina ;Răzvan; Andrei ; Angela';
var reg = /\s*;\s*/; // dacă întâlnești oricare dintre situațiile spațiu punct și virgulă și spațiu
var arr = sir.split(reg); // taie după oricare dintre potriviri
console.log(arr); // Array [ "Gina", "Răzvan", "Andrei", "Angela" ]
```

Folosirea unui regex cu paranteze pentru a extrage.

```js
var sir = 'Obiectivul 1 este atins. Dar ce este la 2 poate întârzia.';
var reg = /(\d)/;
console.log(sir.split(reg)); // Array [ "Obiectivul ", "1", " este atins. Dar ce este la ", "2", " poate întârzia." ]
```

Simpatică este inversarea caracterelor dintr-un șir. Pur și simplu, generezi un array dintr-un cuvânt nemenționând la delimitator vreun caracter, apoi aplici un reverse() (vezi Array.proptotype.reverse), după care faci un join (vezi Array.prototype.join).

```js
var sir = 'Abracadabra';
var inversat = sir.split('').reverse().join();
console.log(inversat); // a,r,b,a,d,a,c,a,r,b,A
```
