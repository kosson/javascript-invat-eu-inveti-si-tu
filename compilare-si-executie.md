# Compilare și execuție

Motorul de JavaScript când încarcă codul sursă, face două treceri peste cod:

1. Este faza unei așa-zise compilării, când citește codul sursă linie cu linie, îl transformă în atomi lexicali (`tokens`), face recensământul identificatorilor și inițializează cu `undefined`. În cazul funcțiilor, abia la momentul apelării lor se va proceda la constituirea unui mediu lexical propriu acelei funcții în care vor fi sub evidență identificatorii găsiți în corpul funcției.
2. Este faza de execuție. Identificatorii capătă valori iar expresiile sunt evaluate.

## Faza de compilare

În faza de compilare codul este parcurs linie cu linie.

### Momentul 0: declararea variabilelor și a funcțiilor și recensământul identificatorilor

Este momentul când mediul lexical (scope) este creat și se face inventarul identificatorilor.

Dacă funcțiile au în scope o variabilă care nu a fost declarată în scope-ul funcției respective, se va ieși din scope-ul local al funcției și se va căuta în scope-ul imediat de deasupra. Dacă acesta nu există iar funcția a fost declarată în global scope, atunci motorul JavaScript va crea acea variabilă din oficiu.

Doar dacă se folosește 'use strict', se poate ocoli acest comportament. ATENȚIE! acest lucru se petrece la faza de execuție, nu la cea de compilare.

### Problema suprascrierii prin folosirea aceluiași identificator

```javascript
function ceva(){};
var ceva = 0;
console.log(typeof ceva); // number
```

Este întrebat global scope dacă există declarații de variabile și de funcții.

Rând pe rând, linie cu linie sunt notate (**registered**) în mediul lexical global (global scope) variabilele și funcțiile. Este ca un recensământ. Dar este un recensământ în urma căruia se vor atribui valori creându-se „legături”. Reține că de fapt, aceste legături sunt cele care sunt contabilizate.

## Mantre

- Faza de compilare este distinctă de faza de execuție a codului.
- Înainte de evaluare este creat un `realm` pentru codul sursă.
- La fiecare evaluare a codului sursă este recreat `lexical environment` - scope-ul.
- În faza de compilare, variabilele și funcțiile sunt „înregistrate” în global scope, adică sunt create referințe în memorie pentru acestea pe baza identificatorilor lor.
- În compilare sunt create doar referințe în ceea ce standardul numește `environment record` - registrul mediului pe care îl creează `lexical environment` (scope-ul).
- Conținutul funcțiilor nu este procesat deocamdată.
- Execuția pornește imediat după această fază de „înregistrare”.
- La momentul execuției, entitățile deja există și relaționează.

### Cazul funcțiilor

În JavaScript ordinea definirii funcțiilor nu contează (vezi hoisting - poți apela funcția înainte de a o defini). Acest lucru se întâmplă pentru că **lexical environment** (scope) se constituie înainte de execuție. Funcțile deja există la momentul în care codul începe să fie executat. Acest lucru este valabil doar pentru declarațiile de funcții (**function declaration**). Function expression și arrow functions nu fac parte din această secvență, acestea fiind create la momentul în care **execuția** ajunge la declararea lor.

La prima fază a compilării, funcțiile nu sunt parcurse de compilator, ci doar se face o referință către conținutul lor. Abia la faza execuției, atunci când funcția este invocată, funcția intră din nou într-o fază de compilare:

- declară și inițializează argumentele funcției.
- fiecare argument al unei funcții este de fapt o variabilă locală.
- declară variabilele locale (din interiorul funcției), încluzând aici și funcțiile anonime care sunt atribuite unei variabile locale, de neinițializându-le
- declară și inițializează funcțiile.

ATENȚIE! Pentru funcții, acestea sunt înregistrate, dar conținutul lor este stocat undeva în memorie fără a fi compilat deocamdată. Este momentul în care sunt create obiectele funcții care conțin codul funcției plus alte proprietăți. Funcția pe lângă proprietățile sale, va primi tacit `this`, `arguments` și o altă proprietate internă (`[[Environment]]`) care este scope-ul preexistent la momentul declarării. Dacă declarăm o funcție în Global Object, **scope** va fi chiar <u>Global Object</u>.

Reține că fiecare funcție declarată stabilește propriul scope (mediu lexical), care la momentul apelării, va porni compilarea cu înregistrarea variabilelor proprii și a parametrilor care la rândul lor sunt de fapt tot variabile înregistrate în scope-ul acelei funcții.

Compilatorul „coboară” în funcție pentru a face înregistrarea variabilelor și a altor funcții dacă acestea există. Dacă alte funcții sunt descoperite în interiorul funcției, se va proceda la același pas dacă acestea sunt invocate în interior. Dacă în interiorul unei funcții este declarată o altă funcție și aceasta este returnată, avem de-a face cu cel mai interesant mecanism pe care JavaScript îl pune la cingătoarea programatorului: un closure (tradus ar fi „țarc”, dar în cazul nostru putem să-i spunem „instantaneu” pentru acesta este comportamentul).

Ce se întâmplă este pasionant. Se face „instantaneul” pe care l-am menționat a contextului de execuție (obiectul generat de funcția gazdă), adică a funcției în care funcția internă a fost apelată.

Și urmează **mecanismul miraculos**: chiar dacă funcția gazdă și-a încheiat execuția, referința returnată, dacă este apelată se va bucura de tot ce conținea funcția gazdă la momentul returnării.

Puțin amețit? Nu-ți fă griji, totul va fi explicat și în mai mare detaliu la momentul potrivit.

Dacă funcțiile au în scope o variabilă care nu a fost declarată în scope-ul funcției respective, se va ieși din scope-ul local al funcției și se va căuta în scope-ul imediat de deasupra. Dacă acesta nu există, iar funcția a fost declarată în global scope, atunci motorul JavaScript va crea acea variabilă din oficiu.

Doar dacă se folosește 'use strict', se poate ocoli acest comportament. ATENȚIE! acest lucru se petrece la faza de execuție, nu la cea de compilare.

#### Problema suprascrierii prin folosirea aceluiași identificator

```javascript
function ceva(){};
var ceva = 0;
console.log(typeof ceva); // number
```

Se pierde referința către funcție.

### Cazul variabilelor

- sunt declarate variabilele iar acestea devin proprietăți ale lui unui obiect special care este generat la momentul execuției.
- dacă este declarată o referință, care mai târziu la faza de execuție i se atribuie o valoare, când nu este folosit „use strict”, motorul va crea din oficiu acea variabilă.
- pentru fiecare variabilă găsită a cărui identificator nu este înregistrat, îi este înregistrat identificatorul iar valoarea este inițilizată cu `undefined`. Dacă este găsit acesta își păstrează valoarea.

### Left Hand Side și Right Hand Side

În cazul folosirii operatorului `=` pentru atribuirea unei valori unui identificator, lucrăm cu două zone aflate de o parte și de alta a operatorului: *partea din stânga* cunoscută sub denumirea de „left hand side - LHS” și *partea din dreapta* sau „right hand side - RHS”.

```javascript
var test = "ceva";
```

Mai întâi, motorul întreabă mediul lexical (local sau global scope) în care a găsit referința din „**partea stângă**" (LHS - Left Hand Side), dacă aceasta a fost declarată: `var test`.

Dacă nu a fost declarat și apare ca și `test = 'ceva'`, la etapa compilării, `test` ar fi ignorat, dar, din oficiu, la etapa execuției, motorul va genera un identificator `test`. Asta respectând condiția de a nu fi folosit `use strict` și să te afli în global scope.

În cazul nostru, scope-ul răspunde că este declarat și chiar în acel moment se face atribuirea (assignment) valorii din „**partea dreaptă**" (RHS - Right Hand Side).

## Execuția

- Este momentul când valorile sunt atribuite (*assigned*) variabilelor locale. De fapt, ceea ce se întâmplă este constituirea legăturii dintre identificator și valoarea sa. Îți poți închipui că un filament leagă o etichetă de o valoare. ADEVĂRUL este că aceste „filamente” sunt cele care sunt „memorate” de mediul lexical (scope).
- Dacă există declarații precum `a = 1;` fără ca `a` să fie declarată variabilă, dacă ne aflăm în global scope, atunci o variabilă este creată pentru `a`.
- Invocarea unei funcții conduce la alocarea unei zone de memorie numită „heap memory” în care se pregătește un context de execuție pentru funcție.

Pentru că JavaScript are un singur fir de execuție, trebuie reținut faptul că de fiecare dată când o funcție este invocată, contextul de execuție a celui care a invocat funcția la momentul acela este înghețat urmând să se creeze un altul pentru evaluarea noii funcții. După ce funcția invocată și-a încheiat execuția, contextul de execuție a funcției care a făcut apelul este restaurat.

Evidența apelurilor și a operațiunilor privind înghețarea și restaurarea contextelor de execuție este făcută de **call stack**. Tradus în română, *call stack* este **stiva de apeluri**. Acest mecanism de evidență a ceea ce se execută la un moment dat este prezent pentru a fi inspectat în Debugger.

La invocarea funcției se creează un nou obiect scope care moștenește proprietăți din cel care era deja format la momentul declarării.

## Referințe

[Arindam Paul - JavaScript VM internals, EventLoop, Async and ScopeChains](https://www.youtube.com/watch?v=QyUFheng6J0 "Este un material fantastic pentru a înțelege mai bine faza de compilare și cea de execuție")
