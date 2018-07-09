# Array.prototype.toLocaleString()

Toate obiectele în JavaScript moștenesc din obiectul prototipal al obiectului fundamental `Object` această metodă. Dar fiecare dintre obiectele care moștenesc această metodă (`Array`, `Number` și `Date`), o modifică.

Este o metodă care returnează un șir de caractere ce reprezintă elementele din array. În șirul nou constituit, elementele din array vor fi concatenate, urmând unul celuilalt în ordinea indecșilor din array, fiind despărțite prin virgulă.

```javascript
var colectie = ['ceva', 'de', 'concatenat'];
colectie.toLocaleString(); // 'ceva,de,concatenat'
```

Această metodă strălucește abia când se aplică nevoilor de internaționalizare.

```javascript
var colectie = [2.4,1.3,2];
colectie.toLocaleString('ro-RO'); // "2,4,1,3,2" :))
// testat în Firefox Quantum
Number(2.4).toLocaleString(); // 2,4
```

După cum se observă, am aplicat o transformare a unui număr real a cărei delimitare a căror zecimale sunt delimitate de punct, în forma canonică proprii limbii române, în care delimitarea se face cu virgulă.

Această metodă poate avea două argumente:

-   localizare, care este un șir de caractere care denumește o limbă conform standardului BCP 47 (Best Current Practice 47). Poți introduce o singură limbă de localizare, sau poți introduce într-un array, mai multe, dacă acest lucru este necesar. Dacă nu este menționat sau dacă este undefined, este folosit mediul local al motorului JavaScript.
-   opțiuni care sunt introduse ca un obiect. Aceste opțiuni diferă de la un implementator la altul. Dacă nu este menționat sau este `undefined`, se vor folosi valorile implicite.

Și pentru că am ajuns aici, merită amintit efortul ECMA TC 39 (Comisia Tehnică 39 pentru ECMA) de a da un răspuns nevoilor de internaționalizare pentru JavaScript. Acest standard a fost aprobat în 2012 și facem referire la el ca ECMA 402.

Acest standard a fost gândit ca o extensie a standardului JavaScript (ECMAScript Language Specification), care să reglementeze felul în care sunt reprezentate numerele, datele calendaristice, modul în care se fac comparațiile între șirurile de caractere. A fost necesar un astfel de standard pentru că metodele `String.prototype.localeCompare`, `Number.prototype.toLocaleString` și `Date.prototype.toLocaleString` nu aveau mecanisme de control asupra reprezentării datelor în funcție de parametrii locali ai limbii, variantei de limbă, etc. Până la acest standard, posibilitățile de lucru în cadrul limbilor sistemelor din diferitele părți ale lumii era extrem de limitată și din acest motiv, diferite biblioteci de cod au abordar fiecare în felul său aceste probleme. În acest context, a fost nevoie de acest standard, care să realizeze o interfațare a JavaScript cu bibliotecile sistemelor de operare pe care se face evaluarea codului pentru a obține o localizare mai eficientă fără a apela la terți (servicii online specializate în asistența privind localizarea).
În afară de BCP 47 pe care deja l-am amintit, standardul se construiește și pe ISO 4217 (codurile numerice și alfabetice pentru diferitele monede).

## Resurse

-   [toLocaleString in Object and Array](https://esdiscuss.org/topic/tolocalestring-in-object-and-array)
-   [The ECMAScript Internationalization API](http://norbertlindenberg.com/2012/12/ecmascript-internationalization-api/index.html)
-   [ECMAScript Internationalization API Specification](http://www.ecma-international.org/ecma-402/1.0/)
