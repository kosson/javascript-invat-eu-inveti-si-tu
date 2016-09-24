# String.prototype.split()

Această metodă subîmparte un obiect String, în părți componente (substring-uri), care sunt delimitate de un separator care este menționat. Se poate menționa chiar și o limită pentru care se face subîmpărțirea. Această limită este, de fapt un număr care menționează de câte ori să se facă „tăierea” șirului.

Separatorul poate fi un caracter, un string sau o expresie regulată.
Dacă separatorul este omis, array-ul va conține un singur element compus din șirul original.
Dacă avem ca și separator un șir gol, stringul care se dorește a fi subîmpărțit, va fi convertit la un array de caractere în loc de array de subșiruri.

Metoda returnează un array de substringuri care au fost „tăiate” acolo unde a fost găsit separatorul, dar separatorul este „șters” din subșirul care este introdus în array.

Dacă separatorul este o expresie regulată care conține paranteze, atunci, ori de câte ori se pace regăsirea după criteriile menționate de regex, rezultatele (plus cele undefined), dictate de paranteze, vor fi incluse în array-ul rezultat.

```js
var unsir = 'Acesta este un șir de test'
    altsir = 'Dac\'aterizezi, Pe o planetă, Unde-i frig, Și n-ai jaketă';

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
