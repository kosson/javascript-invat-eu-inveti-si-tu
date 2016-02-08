# Ce face motorul JavaScript când „vede” codul
## Acumulări rapide:

Faza de compilare este distinctă de faza de execuție a codului. În faza de compilare codul este parcurs linie cu linie. La execuție, entitățile deja există și relaționează.

Motorul JavaScript stochează variabilele ca atribute ale unui obiect care se numește EXECUTION CONTEXT OBJECT.

Motorul de JavaScript face două treceri peste cod:
1. Este faza compilării. Citește codul sursă și înregistrează variabilele și ia act de funcțiile existente, construind o listă a declarațiilor de variabile și de parametrii din funcții
2. Este faza de execuție. Execută codul.

## Prima trecere: DECLARAREA variabilelor și a funcțiilor
Este întrebat global scope dacă există declarații de variabile și de funcții. Rând pe rând, linie cu linie sunt notate (registered) în global scope variabilele și funcțiile. Este ca un recensământ.

## Mantre
- în faza de compilare, variabilele și funcțiile sunt „înregistrate” în global scope, adică sunt create referințe în memorie pentru acestea.
- este o fază în care sunt create doar referințe.
- conținutul funcțiilor nu este procesat deocamdată.
- execuția pornește imediat după această fază de „înregistrare”.

ATENȚIE!
Pentru funcții, acestea sunt înregistrate, dar conținutul lor este stocat undeva în memorie fără a fi compilat deocamdată.

Fiecare funcție declarată stabilește propriul scope (perimetru) în care sunt notate variabilele proprii și parametrii care la rândul lor sunt de fapt tot variabile înregistrate în perimetrul acelei funcții. Compilatorul coboară recursiv în funcție pentru a face înregistrarea variabilelor și a altor funcții dacă acestea există.

Dacă funcțiile au în perimetru o variabilă care nu a fost declarată în perimetrul funcției respective, se va ieși din perimetrul local al funcției și se va căuta în perimetrul imediat de deasupra. Dacă acesta nu există iar funcția a fost declarată în global scope, atunci motorul JavaScript va crea acea variabilă din oficiu. Doar dacă se folosește 'use strict', se poate ocoli acest comportament. ATENȚIE! acest lucru se petrece la faza de execuție, nu la cea de compilare.

### Cazul variabilelor
- sunt declarate variabilele acestea devin proprietăți ale lui EXECUTION CONTEXT OBJECT
- dacă este declarată o referință, care mai târziu la faza de execuție i se atribuie o valoare, dacă nu este folosit „use strict”, motorul va crea din oficiu acea variabilă.

În cazul:

```js
var test = "ceva";
```

avem două lucruri diferite:
- A. Partea din stânga
- B. Partea din dreapta

Motorul întreabă perimetrul (local sau global scope) în care a găsit referința din „**partea stângă**", dacă există declarat. Perimetrul răspunde că este declarat și chiar în acel moment se face atribuirea (assignment) valorii din „**partea dreaptă**".

### Cazul funcțiilor
La prima fază a compilării, funcțiile nu sunt parcurse de compilator, ci doar se face o referință către conținutul lor. Abia la faza execuției, atunci când funcția este invocată, funcția intră din nou într-o fază de compilare.

- declară și inițializează argumentele funcției.
- fiecare argument al unei funcții este de fapt o variabilă locală.
- declară variabilele locale (din interiorul funcției), încluzând aici și funcțiile anonime care sunt atribuite unei variabile locale, de neinițializându-le
- declară și inițializează funcțiile

## A doua trecere: EXECUȚIA
- valorile sunt atribuite (asigned) variabilelor locale
- dacă există declarații precum a = 1; fără ca „a” să fie declarată variabilă, dacă ne aflăm în global scope, atunci o variabilă este creată pentru a.
- Invocarea unei funcții conduce la alocarea unei zone de memorie numită „heap memory” în care se pregătește un context de execuție pentru funcție.

## Analiză

```js
var duda = "o dudă";                // 0
altaDuda = "o altă dudă";           // 1
ex = 0;                             // modificabila

function faceva(param){             // 2

    var masura = 12;                // 3
    param = "o valoare";            // 4
    ex = "altceva";                 // 5

    function sarcinaInterna() {     // 6
      var ex = "din interior";      // 7
      var fruct = 0;                // 8
      masura = masura * 2;          // 9
      return masura;                // 10
    }

    return sarcinaInterna();        // 11

    var ex;                         // 12
};  

faceva(2);                          // 13
```

### COMPILARE

- **// 0**
  - Variabila „duda” este *înregistrată*.
- **// 1**
  - *Compilatorul întreabă*: cine este „**altaDuda**”?
  - *Răspuns*: nu știu, nu este o declarație de variabilă.
  - *Efect*: altaDuda este ignorat (deocamdată).
- **// 2**
  - Funcția faceva este înregistrată. Conținutul funcției nu este parcurs de compilator, ci, este stocat în memorie (deocamdată).

### EXECUȚIE
- **// 0**
  - valoarea „o dudă” este atribuită lui duda.
- **// 1**
  - *Context*: Global scope
  - *Motorul întreabă*: știi cumva ce este „altaDuda”?
  - *Răspuns*: nu, nu știu ce este, dar uite, pentru că sunt băiat bun, voi crea o referință.
  - *Efect*: altaDuda devine variabilă. Valoarea "o altă dudă" este atribuită.
        Condiții: să fii în Global scope și să nu fie invocat ``use strict``
- **// 12** Este invocată funcția faceva() și se intră într-o nouă fază de compilare
 - #### COMPILARE:
   - parametrii funcției sunt declarați ca variabile locale.
   - **// 5** compilatorul trece peste ex pentru că nu este o declarație și nu intră în compilare
   - declară funcția internă sarcinaInterna.
   - ex este declarată și este hoisted. Atenție, chiar dacă ex are mai sus o atribuire, în această fază sunt două lucruri distincte.
 - #### EXECUȚIE (se creează automat contextul de execuție).
   - variabilei locale param îi este atribuită valoarea 2
   - variabilei param îi este modificată valoarea.
    - **// 5** Cine este *ex*?
     - **Context**: local scope
     - **Motorul întreabă**: știi ce este ex?
     - **Răspuns**: Nu, nu știu, dar mă duc pe „scope chain” și caut în container până în Global Scope dacă este nevoie.
     - **Efect**: dacă o variabilă cu același nume este găsită pe lanțul de scope în Global scope valoarea din funcție modifică valoarea variabilei din Global scope. - **Dacă**: nu este găsită o variabilă cu același nume *mai sus*, atunci va crea una din oficiu. Dacă se folosește „use strict”, va fi returnată o eroare ReferenceError
   - **//11** se returnează funcția internă ``sarcinaInterna`` ceea ce conduce la invocarea acesteia.
    - ##### COMPILARE
      - **//7** este declarată variabila ex. Dacă există o variabilă cu același nume în funcția container, variabila acestuia nu va fi suprascrisă, ci întotdeauna se va referenția cea din scope-ul existent. Așa funcționează „scope resolution” iar această stare de lucruri se numește variable shadowing.
      - este declarată variabila locală fruct.
      - **// 9** Cine este *masura*?
       - **Context**: local scope
       - **Motorul întreabă**: știi ce este masura?
       - **Răspuns**: Nu, nu știu, dar mă duc pe „scope chain” și caut în funcția container până în Global Scope dacă este nevoie.
    - #### EXECUȚIE
      - variabilei ex îi este atribuită valoarea „din interior”.
      - variabilei fruct îi este atribuită valoarea 0.
      - valiabila măsura va fi modificată în contextul local fiind înmulțită cu 2 și atribuită ei înseși
      - valoarea măsurii este returnată în contextul de mai sus, adică valoarea 24.

## Referințe

[Arindam Paul - JavaScript VM internals, EventLoop, Async and ScopeChains](https://www.youtube.com/watch?v=QyUFheng6J0 "Este un material fantastic pentru a înțelege mai bine faza de compilare și cea de execuție")
