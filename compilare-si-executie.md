# Compilare și execuție

**Moment ZEN**: codul JavaScript este compilat la momentul execuției.

Motorul de JavaScript când încarcă codul sursă, face două treceri peste cod:

1. Este faza unei așa-zise compilării, când citește codul sursă linie cu linie (*parsing*), îl transformă în atomi lexicali (`tokens`), face recensământul identificatorilor și inițializează cu `undefined` și se constituie un Arbore Sintactic Abstract - Abstract Syntax Tree. După constituirea AST, codul este transformat într-o formă numită bytecode (înșiruirea de 0 și 1 pe care computerul o înțelege). În cazul funcțiilor, abia la momentul apelării lor se va proceda la constituirea unui mediu lexical propriu acelei funcții în care vor fi sub evidență identificatorii găsiți în corpul funcției.
2. Este faza de execuție. Identificatorii capătă valori iar expresiile sunt evaluate.

Trebuie specificat faptul că operațiunile nu decurg liniar, ci într-un mod care să permită cei mai buni timpi de execuție. Adică, se face puțin, parsing, urmat de compilare, rulare, optimizare și reoptimizare, apoi se mai ia un fragment și se repetă pașii și tot așa pentru a realiza per global cei mai buni timpi de rulare pentru cod. Pentru că acest comportament este cel real și actual, spunem că JavaScript beneficiază de compilare în timp real - JIT (Just In Time). Înțelegerea modului în care funcținează JIT-ul, conduce la o execuție performantă a codului.

Ceea ce trebuie adăugat ca detaliu important este faptul că spre deosebire de C și C++, unde trebuie să eliberezi memoria de variabilele setate, un fel de a duce gunoiul la pubelă după ce ai lucrat, în JavaScript, **garbage collecting**, căci așa se numește în programare, este făcut automat.

## Faza de compilare

În faza de compilare codul este parcurs linie cu linie. Există o fază preliminară numită parsare a codului, moment în care codul sursă este procesat pentru a produce o formă care să poată fi folosită de interpretor. Abia apoi urmează o fază de compilare care este cuplată și cu o fază de optimizare a rezultatelor.

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

## Context de execuție

TODO: Integrează mai bine materialul privind contextul de execuție.

Contextul de execuție este un mecanism pentru a ține evidența evaluării codului la momentul în care acesta este rulat. La oricare moment în timp ceea ce rulează când arunci privirea se numește „running execution context” - contextul de execuție în efect sau care rulează, mai pe scurt **ce rulează pe moment**.

### Spune standardul

În oricare moment există cel mult un singur context de execuție per agent, care execută cod.

Un context de execuție conține tot ce este necesar pentru a urmări evoluția execuției și a codului său asociat. Tot înseamnă orice este caracteristic motorului care implementează ECMAScript și necesar urmăririi execuției codului.

O stare are următoarele componente:
- starea de execuție a codului, care este starea necesară pentru a executa, suspenda sau relua evaluarea codului asociat cu acest context de execuție
- Function. Dacă contextul de execuție evaluează codul dintr-o funcție obiect, atunci valoarea acestei componente este chiar acea funcție obiect. Dacă contextul evaluează codul dintr-un **Script** sau dintr-un **Module**, atunci, valoarea componentei **Function** este `null`. Valoarea pentru Function în `running execution context` este numită și `active function object`.
- Realm. Este registrul de tărâmuri (***Realm Record***) prin care codul asociat accesează resurse ECMAScript. Tărâmul asociat contextului de execuție este numit `current Realm Record`.
- ScriptOrModule. Este o înregistrare care identifică un Module sau un Script în care își are originea codul rulat.
-  LexicalEnvironment. Identifică `Lexical Environment` - scope-ul care este folosit pentru a referințele pe care le fac identificatorii din codul care rulează în contextul de execuție curent.
- VariableEnvironment. Identifică scope-ul (`Lexical Environment`) al cărui EnvironmentRecord conține legăturile create de `VariableStatements` din contextul de execuție curent. Când se creează un context de execuție nou, LexicalEnvironment și VariableEnvironment au aceeași valoare.

### Mecanismul

Pentru a ține evidența a ceea ce se rulează este nevoie de un „răboj” pe care să poți aduna și scădea ce intră și se termină de rulat - contextele de execuție. Un astfel de mecanism este organizat ca o stivă și se numește „execution context stack” - stiva contextelor de execuție.

`Running execution context` este întotdeauna în vârful stivei.

Evaluarea codului care se face într-un „context de execuție în efect” în plină desfășurare, se poate suspenda din diferite motive. În acest moment este posibil ca un alt context de execuție să devină „context de execuție în efect” și să pornească evaloarea propriului cod. Trebuie înțeles acest moment ca un moment în care codul care rulează transferă controlul unei alte secvențe de cod care își începe execuția. Acest nou context de execuție trece direct în vârful stivei. Mai târziu, codul suspendat poate deveni la rândul său „contextul de execuție în efect” și să reia evaluara codului de la momentul de unde s-a oprit. Această succesiune a contextelor de execuție în efect este gestionată cu ajutorul unei stive care funcționează pe principiul FIFO - first in, first out.

Contextul de execuție se leagă organic de **lexical environment**, adică de scope.

### Global Execution Context - contextul de execuție a codului

Tot codul JavaScript rulează în Global Execution Context (GEC). Este un wrapper pentru cod.
Este creat un **Global Object** și **this**, o variabilă specială. De regulă, pentru codul top-level este `window`.
Execution Context este inițiat la executarea codului și este unul per pagină web.

Conține:
- Global object
- this
- stiva variabilelor
- Outer environment (pentru cazul funcțiilor. Global env nu are outer env)
- codul js

ATENȚIE, toate acestea sunt create de motorul JavaScript.

## Mantre

- Pentru orice program există un **global execution context** (activat spre exemplu când declari `<script>`)
- Invocarea unei funcții generează un nou CONTEXT de EXECUȚIE. **Acesta nu este un obiect, ATENȚIE!**
- Un context de execuție are un „lexical environment” asociat, adică un scope, care conține toți identificatorii definiți în acel context.
- Contextul de execuție este parte a scope-ului.
- Contextul de execuție este constituit din TOT ce se întâmplă atunci când funcția se execută, adică toate variabilele și funcțiile. O variabilă este considerată a fi „în scope - in-scope", dacă este accesibilă în contextul de execuție curent.
- O metodă are drept **function context** însuși obiectul „în care” este invocată și poate fi accesat prin `this`.
- **Function context** nu este **execution context**.
- Pentru că JavaScript are un singur fir de execuție, trebuie reținut faptul că de fiecare dată când o funcție este invocată, contextul de execuție a celui care a invocat funcția la momentul acela este înghețat urmând să se creeze un altul pentru evaluarea noii funcții. După ce funcția invocată și-a încheiat execuția, contextul de execuție a funcției care a făcut apelul este restaurat. Evidența apelurilor și a operațiunilor privind înghețarea și restaurarea contextelor de execuție este făcută de **call stack**.
- Ori de câte ori este invocată o funcție, se creează un nou context execuție (TOT ce se întâmplă atunci când funcția se execută).
- Variabilele și funcțiile care fac parte din contextul de execuție, sunt memorate în EXECUTION CONTEXT OBJECT, care este un obiect al motorului JavaScript.
- contextul e execuție este parte a scope (format la faza de compilare).
- Context este valoarea lui `this`
- toate variabilele și funcțiile definite într-o funcție sunt considerate parte a contextului de execuție

### Cazul obiectelor

În cazul obiectelor, atunci când apelezi o funcție (care joacă rolul de metodă), folosind `.` sau `[]`, vei avea un obiect drept context, altfel, vei avea global environment.

Vorbim de faptul că funcțiile, atunci când sunt apelate, generează un context. `this` este legat la acest context iar acesta este setat după modul în care este apelată funcția. Reginald Braithwaite chiar exprima regretul că `this` nu a fost numit `context` direct.

Contextul unei funcții nu poate fi determinat examinând strict codul.

```javascript
var obiect = {
  getThis: function(){
    return this;
  }
};

obiect.getThis() === obiect; // true
```

Care ar fi contextul pentru funcția obiect.getThis()? Să investigăm:

```javascript
var getThis = obiect.getThis; // getThis este doar o referință către aceeași funcție

getThis === obiect.getThis; // true
getThis(); // window
```

## Referințe

[Arindam Paul - JavaScript VM internals, EventLoop, Async and ScopeChains](https://www.youtube.com/watch?v=QyUFheng6J0 "Este un material fantastic pentru a înțelege mai bine faza de compilare și cea de execuție")

[Lin Clark - An Abridged Cartoon Introduction To WebAssembly](https://www.smashingmagazine.com/2017/05/abridged-cartoon-introduction-webassembly/)
