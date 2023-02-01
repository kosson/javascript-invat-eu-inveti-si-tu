# Compilare și execuție

Războiul se terminase. Este anul 1950. Computerele treceau în faza comercială. Pe coridor ne întâlnim din nou cu Grace Hopper, doamna care găsise primul **bug** - molie - în măruntaiele lui **Harvard Mark I**.

![Grace Hopper și UNIVAC](images/Grace_Hopper_and_UNIVAC.jpg)

Anii 50 și 60 sunt ani de mare efervescență în domeniul computerelor. Stimabila doamnă, care este și un personaj hâtru, pune un accent pe viteza de dezvoltare:

> Înainte de Al Doilea Război Mondial, viața era simplă. După aceea am avut sisteme.

Acum lucrează la primul computer comercial, *UNIVAC I* și conduce departamentul de programare Automatic Programming Development pentru compania Remington Rand. Este tare necăjită că mașinile de calcul nu înțeleg limba engleză, dar prin '53 va publica un articol științific despre compilatoare. Bine, deja exista un compilator încă din 1952, dar, stupoare: *nimeni nu-l atingea*, rememora dânsa ceva mai târziu, pentru că *mi se spusese că un computer face doar aritmetică*. De fapt, *nimeni nu credea* că se poate acest lucru.

În acel moment, un compilator *traducea limbajul matematic în cod mașină*. Doamna Grace sau *bunica COBOL* așa cum este alintată, argumenta necesitatea ca persoanele care manipulează date, să nu fie forțate să manipuleze simboluri așa cum o fac matematicienii. Dorința sa a fost să fie posibilă folosirea de *enunțuri în engleză*. Acestea au fost începuturile compilatoarelor și a limbajului de programare COBOL (COmmon Business-Oriented Language).

Compilatoarele preiau codul sursă redactat într-un limbaj de programare și îl transformă în **cod obiect** pe care procesorul îl înțelege, fiind executat direct de mașină.

## Compilarea în JavaScript

**Moment ZEN**: codul JavaScript este compilat la momentul execuției.

Motorul de JavaScript când încarcă codul sursă, face două treceri peste cod:

**1** Este faza unei așa-zise compilării, când citește codul sursă linie cu linie (*parsing*), îl transformă în atomi lexicali (`tokens`), face recensământul identificatorilor și îi inițializează cu `undefined`, constituindu-se un Arbore Sintactic Abstract - Abstract Syntax Tree. După constituirea AST, codul este transformat într-o formă numită **bytecode** (înșiruirea de 0 și 1 pe care computerul o înțelege). În cazul funcțiilor, abia la momentul apelării lor se va proceda la constituirea unui mediu lexical propriu acelei funcții în care vor fi sub evidență identificatorii găsiți în corpul funcției. Pe scurt, compilarea lor se face la momentul apelării.

**2** Este faza de execuție. Identificatorii capătă valori și expresiile sunt evaluate.

Trebuie specificat faptul că operațiunile nu decurg liniar, ci într-un mod care să permită cei mai buni timpi de execuție. Adică, se face puțin parsing, urmat de compilare, rulare, optimizare și reoptimizare. Apoi se mai ia un fragment și se repetă pașii și tot așa pentru a realiza per global cei mai buni timpi de rulare pentru cod. Pentru că acest comportament este cel real și actual, spunem că JavaScript beneficiază de compilare în timp real - JIT (Just In Time). Înțelegerea modului în care funcținează JIT-ul, conduce la o execuție performantă a codului.

Ceea ce trebuie adăugat ca detaliu important este faptul că spre deosebire de C și C++, unde trebuie să eliberezi memoria de variabilele setate, un fel de a duce gunoiul la pubelă după ce ai lucrat, în JavaScript, **garbage collecting**, căci așa se numește în programare, este făcut automat.

## Faza de compilare

În faza de compilare codul este parcurs linie cu linie. Există o fază preliminară numită **parsare** a codului (poți traduce ca parcurgere sau lecturare a codului), moment în care codul sursă este procesat pentru a produce o formă care să poată fi folosită de interpretor. Abia apoi urmează o fază de compilare care este cuplată și cu o fază de optimizare a rezultatelor.

### Momentul 0: declararea variabilelor, a funcțiilor și recensământul identificatorilor

Este momentul când mediul lexical (scope) este creat și se face inventarul identificatorilor.

Dacă funcțiile au în scope o variabilă care nu a fost declarată (folosind `var`) în scope-ul funcției respective, se va ieși din scope-ul local al funcției și se va căuta în scope-ul imediat de deasupra. Dacă acesta nu există iar funcția a fost declarată în global scope, atunci motorul JavaScript va crea acea variabilă din oficiu. Doar dacă se folosește `'use strict';`, se poate ocoli acest comportament. Atenție, acest lucru se petrece la faza de execuție, nu la cea de compilare.

### Legături și identificatori

Să analizăm următoarea secvență de cod.

```javascript
function ceva () {};
var ceva = 0;
console.log(typeof ceva); // number
```

Este întrebat global scope dacă există declarații de variabile și de funcții.

Rând pe rând, linie cu linie sunt notate (**registered**) în mediul lexical global (global scope) variabilele și funcțiile. Este ca un recensământ. Dar este un recensământ în urma căruia se vor atribui valori creându-se *legături*. Reține că de fapt, aceste legături sunt cele care sunt contabilizate.

## Mantre

* Faza de compilare este distinctă de faza de execuție a codului.
* Înainte de evaluare este creat un `realm` pentru codul sursă.
* La fiecare evaluare a codului sursă este recreat `lexical environment`.
* În faza de compilare, variabilele și funcțiile sunt *înregistrate* în global scope, adică sunt create referințe în memorie pe baza identificatorilor lor.
* În compilare sunt create doar referințe în ceea ce standardul numește `environment record` - registrul mediului pe care îl creează `lexical environment`.
* Conținutul funcțiilor nu este procesat la compilare.
* Execuția pornește imediat după această fază de *înregistrare*.
* La momentul execuției, entitățile deja există și relaționează.

### Cazul funcțiilor

În JavaScript ordinea definirii funcțiilor nu contează (vezi hoisting - poți apela funcția înainte de a o defini). Acest lucru se întâmplă pentru că *lexical environment* (scope) se constituie înainte de execuție. Funcțile deja există la momentul în care codul începe să fie executat. Acest lucru este valabil doar pentru declarațiile de funcții (*function declaration*). Function expression și arrow functions nu fac parte din această secvență, acestea fiind create la momentul în care **execuția** ajunge la declararea lor.

La prima fază a compilării, corpul funcțiilor nu este parcurs de compilator. Acestea pur și simplu sunt doar inventariate și se *notează* referințe către ele. Abia la faza execuției, atunci când funcția este invocată, funcția intră în propria fază de compilare:

* declară și inițializează argumentele funcției;
* fiecare argument al unei funcții este de fapt o variabilă locală;
* declară variabilele locale (din interiorul funcției), încluzând aici și funcțiile anonime care sunt atribuite unei variabile locale, de neinițializându-le;
* declară și inițializează funcțiile.

Atenție, funcțiile sunt înregistrate, dar conținutul lor este stocat în memorie fără a fi compilat deocamdată. Adu-ți mereu aminte că funcțiile sunt valori. Acesta este și momentul în care sunt create obiectele-funcții care conțin codul funcției, plus alte proprietăți. Funcția pe lângă proprietățile sale, va stabili tacit legătura la context, identificând-o prin `this`, va constitui obiectul `arguments` și o altă proprietate internă (`[[Environment]]`), care este scope-ul preexistent la momentul declarării. Dacă declarăm o funcție în Global Object, **scope** va fi chiar *Global Object*.

Reține că fiecare funcție declarată stabilește propriul scope (*mediu lexical*), care la momentul apelării, va porni compilarea cu înregistrarea variabilelor proprii și a parametrilor. La rândul lor aceștia sunt tot variabile înregistrate în scope-ul creat de acea funcție.

Compilatorul *coboară* în corpul funcțiilor pentru a face înregistrarea identificatorilor variabilelor și a altor funcții dacă acestea există. Dacă alte funcții sunt descoperite în interiorul funcției, se va proceda la același pas la momentul invocării lor. Dacă în interiorul unei funcții este declarată o altă funcție și aceasta este returnată, avem de-a face cu cel mai interesant mecanism pe care JavaScript îl pune la cingătoarea programatorului: un **closure**, mecanism care ține în viață întregul lanț de medii lexicale formate la momentul declarării. Acest mecanism este și logic pentru că o funcție are nevoie de datele de lucru specificate și trebuie să aibă cumva acces la ele chiar și în momentul în care funcția *gazdă* și-a încheiat execuția.

Pare aproape miraculos că în condițiile în care funcția gazdă și-a încheiat execuția, referința la funcția internă care a fost returnată, la momentul apelării va avea încă disponibile datele din mediul lexical al gazdei. Dar logica este simplă: trebuie să beneficieze de aceste date, altminteri nu se va putea executa.

Puțin amețită? Nu-ți fă griji, totul va fi explicat și în mai mare detaliu la momentul potrivit.

Dacă funcțiile au nevoie de o valoare a cărui identificator nu a fost declarat în mediul lexical al propriu, motorul va ieși din scope-ul local al funcției și va căuta în scope-ul imediat de deasupra, cel în care s-a declarat funcția. Dacă acesta nu există, iar funcția a fost declarată în global scope, atunci motorul JavaScript va crea acea variabilă din oficiu.

Dacă programul este rulat cu directiva *use strict*, acest comportament nu mai este valabil. Atenție, acest lucru se petrece la faza de execuție, nu la cea de compilare.

### Variabilele la compilare

Variabilele sunt declarate, devenind proprietăți ale unui obiect special care este generat la momentul execuției. Dacă este declarat un identificator fără `var`, căruia mai târziu, la faza de execuție i se atribuie o valoare, dacă nu este folosit *use strict*, motorul va crea din oficiu acea variabilă.
Pentru fiecare variabilă este înregistrat identificatorul, iar valoarea este inițilizată cu `undefined`. Dacă deja există își păstrează valoarea, dar dacă este redeclarat, valoarea este actualizată.

### LHS și RHS

Când folosim operatorului `=` pentru atribuirea unei valori unui identificator, lucrăm cu două zone aflate de o parte și de alta a operatorului: *partea din stânga* cunoscută sub denumirea de *left hand side - LHS* și *partea din dreapta* sau *right hand side - RHS*.

```javascript
var test = "ceva";
```

Mai întâi, motorul întreabă mediul lexical (local sau global scope) în care a găsit referința din **partea stângă** (LHS - Left Hand Side), dacă aceasta a fost declarată. De exemplu: `var test`.

Dacă nu a fost declarat și apare ca și `test = 'ceva'`, la etapa compilării, `test` ar fi ignorat, dar, din oficiu, la etapa execuției, motorul va genera un identificator `test`. Asta respectând condiția de a nu fi folosit `use strict` și să te afli în global scope.

În cazul nostru, scope-ul răspunde că este declarat și chiar în acel moment se face atribuirea (assignment) valorii din „**partea dreaptă**" (RHS - Right Hand Side).

## Execuția

Este momentul când valorile sunt atribuite (*assigned*) variabilelor locale. De fapt, ceea ce se întâmplă este constituirea legăturii dintre identificator și valoarea sa. Îți poți închipui că un filament leagă o etichetă de o valoare. Adevărul este că aceste *filamente* sunt cele care sunt *memorate* de mediul lexical (scope).

Dacă există declarații precum `a = 1;` fără ca `a` să fie declarată variabilă, dacă ne aflăm în global scope, atunci o variabilă este creată pentru `a`.

Invocarea unei funcții conduce la alocarea unei zone de memorie numită *heap memory* în care se pregătește un context de execuție pentru funcție.

Pentru că JavaScript are un singur fir de execuție, trebuie reținut faptul că de fiecare dată când o funcție este invocată, contextul de execuție este **înghețat** la forma în care era când a fost apelată funcția. Dacă această funcție rulează cod asincron în corp și are nevoie de mai mult timp să termine sau s-a apleat altă funcție din corp, pentru noua funcție apelată, se va crea un context de execuție nou-nouț necesar propriei execuții. Abia după ce funcția lansată între timp și-a încheiat propria execuție, contextul de execuție a primei este restaurat. Puteți să vă imaginați aceast mod de abordare a gestionării apelurilor precum o **stivă** în care cel mai recent apel este primul, va fi rezolvat și va dispărea totodată scoțînd la iveală apelul care aștepta cuminte dedesubt. Acest comportament ***sincron*** este folositor pentru programe care nu au nevoie să facă calcule intense sau să aducă resurse de la distanță. În cazul ultimelor, se va adopta o strategie asincronă pentru a nu bloca stiva apelurilor cu unul care are nevoie de timp mai îndelungat.

Evidența apelurilor și a operațiunilor privind înghețarea și restaurarea contextelor de execuție este gestionată de **call stack**. Putem afirma că **firul de execuție** unic al JavaScript este caracterizat de existența unei stive FIFO - First In, First Out (*Primul intrat, primul ieșit*) - **call stack**. Tradus în română, *call stack* este **stiva de apeluri**. Acest mecanism de evidență a ceea ce se execută la un moment dat este prezent pentru a fi inspectat în *Debugger*. Pentru fiecare funcție, motorul creează un obiect care *ține minte* toate referințele necesare execuției. Acest lucru este absolut necesar pentru realizarea de *closure*-uri. Motorul JavaScript (cazul V8) îl numește **obiect context**. În momentul în care dintr-o eroare de programare (recursivitate prost aplicată, de exemplu), stiva apelurilor se umple și depășește spațiul de memorie alocat, spunem că avem un **stack overflow**.

La invocarea funcției se creează un nou obiect al mediului lexical, care moștenește proprietăți din cel care era deja format la momentul declarării.

## Context de execuție

**Spune standardul**:

> Contextul de execuție este un mecanism pentru a ține evidența evaluării codului la momentul în care acesta este rulat. În oricare moment există cel mult un context de execuție pentru fiecare agent care rulează cod. Acesta este cunoscut a fi *running execution context*. [ECMAScript® 2017 Language Specification (ECMA-262, 8th edition, June 2017). 8.3 Execution Contexts](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-execution-contexts)

Am stabilit în acest moment că la momentul în care codul este evaluat, se va crea un **context de execuție** pentru un anumit fragment de cod. Nu putem avea mai mult de un **context de execuție în derulare** (*running execution context*), pentru că JavaScript are la dispoziție un singur fir de execuție (o singură stivă).

**Spune standardul**:

> Stiva executărilor contextelor este folosită pentru a urmări contextele de execuție. Contextul de execuție în derulare este întotdeauna primul element din stivă. De fiecare dată când este transferat controlul de la un cod executabil asociat contextului de execuție în derulare către unui cod executabil care nu este asociat cu acest context de execuție, se creează un nou context de execuție. Contextul de execuție nou este împins în capul stivei și devine noul context de execuție în derulare. [ECMAScript® 2017 Language Specification (ECMA-262, 8th edition, June 2017). 8.3 Execution Contexts](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-execution-contexts)

Un **context de execuție** (numit și **runtime environment**) conține **tot** ce este necesar unui **agent** pentru a urmări evoluția execuției. Lămurim faptul că un **agent** în litera standardului este un executant al codului, care pune la dispoziție stiva contextelor de execuție, un set al contextelor, un context de execuție în derulare, un set de cozi ale joburilor, o înregistrare de evidență necesară agentului și, cel mai important, un **fir de execuție**.

Standardul spune că vorbim propriu-zis de urmărirea unei stări de rulare a codului. Tot înseamnă orice este caracteristic motorului care implementează ECMAScript pentru a crea un runtime environment, adică *tot* ce este necesar urmăririi execuției codului.

O stare are cel puțin următoarele componente pe care motorul le urmărește:

* **starea de execuție a codului**, care este starea necesară pentru a executa, suspenda sau relua evaluarea codului asociat cu acest context de execuție
* `Function`. Dacă contextul de execuție evaluează codul dintr-o funcție obiect, atunci valoarea acestei componente este chiar acea funcție obiect. Dacă contextul evaluează codul dintr-un **Script** sau dintr-un **Module**, atunci, valoarea componentei **Function** este `null`. Valoarea pentru Function în `running execution context` este numită și `active function object`.
* `Realm` este registrul de tărâmuri (**Realm Record**) prin care codul asociat accesează resurse ECMAScript. Tărâmul asociat contextului de execuție este numit `current Realm Record`.
* `ScriptOrModule` este o înregistrare care identifică un `Module` sau un `Script` în care își are originea codul rulat.
* `LexicalEnvironment` identifică `Lexical Environment` - mediul care este folosit de referințele făcute prin identificatorii din codul rulat în contextul de execuție curent.
* `VariableEnvironment` identifică scope-ul (`Lexical Environment`) al cărui EnvironmentRecord conține legăturile create de `VariableStatements` din contextul de execuție curent. Când se creează un context de execuție nou, `LexicalEnvironment` și `VariableEnvironment` au aceeași valoare.

Atunci când avem de-a face cu mai multe contexte de execuție, pentru urmărirea tuturor acestora este utilizată o **stivă a contextelor**

### Mecanismul

Pentru a ține evidența a ceea ce se rulează este nevoie de un *răboj* pe care să poți aduna și scădea ce intră și se termină de rulat - contextele de execuție. Un astfel de mecanism este organizat ca o stivă și se numește *execution context stack* - stiva contextelor de execuție.

`Running execution context` este întotdeauna în vârful stivei.

Evaluarea codului care se face într-un *context de execuție în efect* aflat în plină desfășurare, care se poate suspenda din diferite motive. În acest moment este posibil ca un alt context de execuție să devină *context de execuție în efect* și să pornească evaluarea propriului cod. Trebuie înțeles acest moment ca un moment în care codul care rulează, transferă controlul unei alte secvențe de cod care își începe execuția. Acest nou context de execuție trece direct în vârful stivei. Mai târziu, codul suspendat poate deveni la rândul său *contextul de execuție în efect* și să reia evaluara codului de la momentul de unde s-a oprit. Această succesiune a contextelor de execuție în efect este gestionată cu ajutorul unei stive care funcționează pe principiul **FIFO - first in, first out**.

Contextul de execuție se leagă organic de **lexical environment**, adică de scope.

### Global Execution Context - contextul de execuție a codului

Tot codul JavaScript rulează în *Global Execution Context* (**GEC**). Este fundația, gazda, contextul dacă vrei a întregului cod.
Este creat un **Global Object** și **this**, identificatorului legăturii la obiectul context (global în cazul nostru). Pentru **agentul** cel mai utilizat, care este browserul, obiectul global este chiar `window`.
Execution Context este inițiat la executarea codului și este unul per per agent (pagină web).

Conține:

* Global object,
* `this`,
* stiva variabilelor,
* Outer environment (pentru cazul funcțiilor. Global env nu are outer env),
* codul JavaScript.

Atenție, toate acestea sunt create de motorul JavaScript mai puțin codul sursă.

## Mantre

* Pentru orice program există un **global execution context** (activat spre exemplu când declari `<script>`).
* Invocarea unei funcții generează un nou CONTEXT de EXECUȚIE. **Acesta nu este un obiect, ATENȚIE!**.
* Un context de execuție are un *lexical environment* asociat, adică un scope, care conține toți identificatorii definiți în acel context.
* Contextul de execuție este parte a scope-ului.
* Contextul de execuție este constituit din TOT ce se întâmplă atunci când funcția se execută, adică toate variabilele și funcțiile. O variabilă este considerată a fi *în scope* - *in-scope*, dacă este accesibilă în contextul de execuție curent.
* O metodă are drept **function context** însuși obiectul *în care* este invocată și poate fi accesat prin `this`.
* **Function context** nu este **execution context**.
* Pentru că JavaScript are un singur fir de execuție, trebuie reținut faptul că de fiecare dată când o funcție este invocată, contextul de execuție a celui care a invocat funcția la momentul acela este înghețat urmând să se creeze un altul pentru evaluarea noii funcții. După ce funcția invocată și-a încheiat execuția, contextul de execuție a funcției care a făcut apelul este restaurat. Evidența apelurilor și a operațiunilor privind înghețarea și restaurarea contextelor de execuție este făcută de **call stack**.
* Ori de câte ori este invocată o funcție, se creează un nou context execuție (TOT ce se întâmplă atunci când funcția se execută).
* Variabilele și funcțiile care fac parte din contextul de execuție, sunt memorate în EXECUTION CONTEXT OBJECT, care este un obiect al motorului JavaScript.
* Contextul de execuție este parte a scope-ului (format la faza de compilare).
* Context este valoarea lui `this`.
* Toate variabilele și funcțiile definite într-o funcție sunt considerate parte a contextului de execuție.

### Cazul obiectelor

În cazul obiectelor, atunci când apelezi o funcție cu rol de metodă, folosind `.` sau `[]`, vei avea un obiect drept context.

Vorbim de faptul că funcțiile, atunci când sunt apelate, generează un context. Este creată legătura `this` la acest context, fiind setat după modul în care este apelată funcția. Reginald Braithwaite chiar exprima regretul că `this` nu a fost numit `context` direct.

Contextul unei funcții nu poate fi determinat examinând codul.

```javascript
var obiect = {
  getThis: function(){
    return this;
  }
};
obiect.getThis() === obiect; // true
```

Care ar fi contextul pentru funcția `obiect.getThis()`? Să investigăm:

```javascript
var getThis = obiect.getThis; // getThis este doar o referință către aceeași funcție
getThis === obiect.getThis; // true
getThis(); // window
```

## O analiză

Fragmentul de cod analizat este ceva mai complex, dar acoperă și un caz mai dificil al funcțiilor.

```javascript
var duda = "o dudă",              // 0
    altaDuda = "o altă dudă",     // 1
    ex = 0;                       // modificabila

function faceva (param) {         // 2
    var masura = 12;              // 3
    param = "o valoare";          // 4
    ex = "altceva";               // 5

    function sarcinaInterna () {  // 6
      var ex = "din interior",    // 7
          fruct = 0;              // 8
      masura = masura * 2;        // 9
      return masura;              // 10
    };

    return sarcinaInterna();      // 11
};

faceva(2);                        // 12
```

### COMPILARE

Pas \# 0 Variabila `duda` este *înregistrată* și este inițializată cu *undefined*.
Pas \# 1 Identificatorul **altaDuda**
    1.  *Compilatorul întreabă*: cine este identificatorul **altaDuda**?
    2.  *Răspuns*: nu știu, nu este o declarație de variabilă. Bine, bine, vedem mai târziu ce-i cu el.
    3.  *Efect*: `altaDuda` este ignorat (deocamdată).

Pas \# 2 Funcția `faceva` este înregistrată și este inițializată cu *undefined*. Conținutul funcției nu este parcurs de compilator. Deocamdată este stocat în memorie. Așa cum un șir sau un număr poate fi valoarea unei variabile, la fel corpul unei funcții este valoarea acesteia.

### EXECUȚIE

Pas \# 0 Valoarea *o dudă* este atribuită identificatorului `duda`.
Pas \# 1 Problema cu `altaDuda`
    1.  *Contextul de execuție*: Global scope (mediul lexical global).
    2.  *Motorul întreabă*: știi cumva ce este `altaDuda`?
    3.  *Răspuns*: Nu, nu știu ce este, dar regula este ca eu să creez un identificator cu acest nume.
    4.  *Efect*: `altaDuda` devine o variabilă în global scope. Valoarea `o altă dudă` este atribuită.
    5.  Condițiile pentru ca această regulă să se aplice: să fii în Global scope și să nu fie invocat `'use strict';`.

Pas \# 13 Este invocată funcția `faceva()`. Funcția intră în faza de execuție și ca urmare, scenariul se repetă. Mai întâi, se va intra într-o nouă fază de compilare.

### COMPILARE

Parametrii funcției sunt declarați ca variabile locale în funcție, mai exact în mediul lexical pe care funcția îl generează. Aceasta este regula.
Pas \# 5 compilatorul trece peste `ex` pentru că nu este o declarație și nu intră în compilare
    - declară funcția internă `sarcinaInterna`;
    - `ex` este declarată și este hoisted. Atenție, chiar dacă `ex` are mai sus o atribuire, în această fază sunt două lucruri distincte.

### EXECUȚIE (se creează automat contextul de execuție)

variabilei locale `param` îi este atribuită valoarea 2
variabilei `param` îi este modificată valoarea:

* Pas \# 5 Cine este *ex*?
* **Context**: local scope.
* **Motorul întreabă**: știi ce este `ex`?
* **Răspuns**: Nu, nu știu, dar mă duc pe *scope chain* și caut în `container` până în Global Scope dacă este nevoie.
* **Efect**: dacă o variabilă cu același nume este găsită pe lanțul de scope în Global scope valoarea din funcție modifică valoarea variabilei din global scope.
* **Dacă**: nu este găsită o variabilă cu același nume *mai sus*, atunci va crea una din oficiu. Dacă se folosește `use strict`, va fi returnată o eroare `ReferenceError`.

Pas \# 11 se returnează funcția internă `sarcinaInterna` ceea ce conduce la invocarea acesteia.

### COMPILARE

* Pas \# 7 este declarată variabila `ex`. Dacă există o variabilă cu același nume în funcția `container`, variabila acestuia nu va fi suprascrisă, ci întotdeauna se va referenția cea din scope-ul existent. Așa funcționează *scope resolution*, iar această stare de lucruri se numește variable *shadowing*.
* este declarată variabila locală `fruct`.
* Pas \# 9 Cine este *masura*?
* **Context**: local scope.
* **Motorul întreabă**: știi ce este masura?
* **Răspuns**: Nu, nu știu, dar mă duc pe *scope chain* și caut în funcția container până în Global Scope dacă este nevoie.

### EXECUȚIE

* variabilei `ex` îi este atribuită valoarea *din interior*.
* variabilei `fruct` îi este atribuită valoarea `0`.
* valiabila `măsura` va fi modificată în contextul local fiind înmulțită cu `2` și atribuită ei înseși.
* valoarea `măsurii` este returnată în contextul de mai sus, adică valoarea `24`.

## Resurse

* [Arindam Paul - JavaScript VM internals, EventLoop, Async and ScopeChains](https://www.youtube.com/watch?v=QyUFheng6J0 "Este un material fantastic pentru a înțelege mai bine faza de compilare și cea de execuție")
* [Lin Clark - An Abridged Cartoon Introduction To WebAssembly](https://www.smashingmagazine.com/2017/05/abridged-cartoon-introduction-webassembly/)
* [Franziska Hinkelmann: JavaScript engines - how do they even? | JSConf EU 2017](https://www.youtube.com/watch?v=p-iiEDtpy6I)
* [Marja Hölttä: Parsing JavaScript - better lazy than eager? | JSConf EU 2017](https://www.youtube.com/watch?v=Fg7niTmNNLg)
* [Grace Hopper, Wikipedia în limba engleză](https://en.wikipedia.org/wiki/Grace_Hopper)
* [Hopper at the UNIVAC I console, c. 1960](https://en.wikipedia.org/wiki/Grace_Hopper#/media/File:Grace_Hopper_and_UNIVAC.jpg "SI Neg. 83-14878. Date: na...Grace Murray Hopper at the UNIVAC keyboard, c. 1960. Grace Brewster Murray: American mathematician and rear admiral in the U.S. Navy who was a pioneer in developing computer technology, helping to devise UNIVAC I. the first commercial electronic computer, and naval applications for COBOL (common-business-oriented language). This image, which was originally posted to Flickr, was uploaded to Commons using Flickr upload bot on 4 June 2012, 18:21 by Jan Arkesteijn. On that date, it was confirmed to be licensed under the terms of the license indicated Creative Commons Attribution 2.0 Generic license.")
* [The Wit and Wisdom of Grace Hopper. From The OCLC Newsletter, March/April, 1987, No. 167 (Editor and article author is Philip Schieber.)](http://www.cs.yale.edu/homes/tap/Files/hopper-wit.html)
* [Lin Clark. A crash course in memory management | Mozilla Hacks](https://hacks.mozilla.org/2017/06/a-crash-course-in-memory-management/)
* [Lin Clark. Calls between JavaScript and WebAssembly are finally fast | Mozilla Hacks](https://hacks.mozilla.org/2018/10/calls-between-javascript-and-webassembly-are-finally-fast-%F0%9F%8E%89/)
* [Parsing in JavaScript: Tools and Libraries](https://tomassetti.me/parsing-in-javascript/)
