# Ce face motorul JavaScript când „vede” codul
## Acumulări rapide:

Faza de compilare este distinctă de faza de execuție a codului. În faza de compilare codul este parcurs linie cu linie. La execuție, entitățile deja există și relaționează.

Motorul JavaScript stochează variabilele ca atribute ale unui obiect care se numește EXECUTION CONTEXT OBJECT.

Motorul de JavaScript face două treceri peste cod:
1. Este faza compilării. Citește codul sursă și înregistrează variabilele și ia act de funcțiile existente, construind o listă a declarațiilor de variabile și de parametrii din funcții
2. Este faza de execuție. Execută codul.

## Prima trecere: DECLARAREA variabilelor și a funcțiilor
Este întrebat global scope (perimetrul global) dacă există declarații de variabile și de funcții. Rând pe rând, linie cu linie sunt notate (registered) în global scope variabilele și funcțiile. Este ca un recensământ.

Fiecare funcție declarată stabilește propriul scope (perimetru) în care sunt notate variabilele proprii și parametrii care la rândul lor sunt de fapt tot variabile înregistrate în perimetrul acelei funcții. Compilatorul coboară recursiv în funcție pentru a face înregistrarea variabilelor și a altor funcții dacă acestea există.

Dacă funcțiile au în perimetru o variabilă care nu a fost declarată în perimetrul funcției respective, se va ieși din perimetrul local al funcției și se va căuta în perimetrul imediat de deasupra. Dacă acesta nu există iar funcția a fost declarată în global scope, atunci motorul JavaScript va crea acea variabilă din oficiu. Doar dacă se folosește 'use strict', se poate ocoli acest comportament.

### Cazul variabilelor
- sunt declarate variabilele acestea devin proprietăți ale lui EXECUTION CONTEXT OBJECT
### Cazul funcțiilor
- declară și inițializează argumentele funcției
- declară variabilele locale (din interiorul funcției), încluzând aici și funcțiile anonime care sunt atribuite unei variabile locale, de neinițializându-le
- declară și inițializează funcțiile

## A doua trecere: EXECUȚIA
- valorile sunt atribuite (asigned) variabilelor locale

În cazul:

```js
var test = "ceva";
```

avem două lucruri diferite:
- A. Partea din stânga
- B. Partea din dreapta

Motorul întreabă perimetrul (local sau global scope) în care a găsit referința din „**partea stângă**", dacă există declarat. Perimetrul răspunde că este declarat și chiar în acel moment se face atribuirea (assignment) valorii din „**partea dreaptă**".

În cazul în care avem o funcție, de exemplu:

```js
function faceva(param){
    param = "o valoare";
    ex = "altceva";
};

faceva();
```

La momentul în care motorul ajunge la execuție, adică la `faceva()` trebuie înțeles faptul că `faceva()` este doar o „parte din dreapta" și atât pentru că în cazul acesta nu vorbim de o atribuire a ceva din partea dreaptă ca în cazul variabilelor, ci vorbim despre folosirea referinței în sine pentru că, în fapt, este vorba despre execuția unei funcții.

Când perimetrul va fi întrebat dacă există o variabilă faceva, acesta va răspunde pozitiv și va aduce o referință pentru acea variabilă care este un obiect, o funcție. Orice funcție în JavaScript este un obiect.
