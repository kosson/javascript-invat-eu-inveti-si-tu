## O analiză

Fragmentul de cod analizat este ceva mai complex, dar acoperă și un caz mai dificil al funcțiilor.

```javascript
var duda = "o dudă";              // 0
altaDuda = "o altă dudă";         // 1
ex = 0;                           // modificabila

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

-   **\# 0** Variabila „duda” este *înregistrată* și este inițializată cu *undefined*.
-   **\# 1** Identificatorul „**altaDuda**”
    1.  *Compilatorul întreabă*: cine este identificatorul „**altaDuda**”?
    2.  *Răspuns*: nu știu, nu este o declarație de variabilă. Bine, bine, vedem mai târziu ce-i cu el.
    3.  *Efect*: `altaDuda` este ignorat (deocamdată).

-   **\# 2** Funcția `faceva` este înregistrată și este inițializată cu *undefined*. Conținutul funcției nu este parcurs de compilator. Deocamdată este stocat în memorie. Așa cum un șir sau un număr poate fi valoarea unei variabile, la fel corpul unei funcții este valoarea acesteia.

### EXECUȚIE

-   **\# 0** Valoarea „o dudă” este atribuită identificatorului `duda`.
-   **\# 1** Problema cu `altaDuda`
    1.  *Contextul de execuție*: <u>Global scope</u> (mediul lexical global).
    2.  *Motorul întreabă*: știi cumva ce este `altaDuda`?
    3.  *Răspuns*: Nu, nu știu ce este, dar regula este ca eu să creez un identificator cu acest nume.
    4.  *Efect*: `altaDuda` devine o variabilă în <u>global scope</u>. Valoarea `o altă dudă` este atribuită.
    5. Condițiile pentru ca această regulă să se aplice: să fii în <u>Global scope</u> și să nu fie invocat `'use strict';`.

-   **\# 13** Este invocată funcția `faceva()`. Funcția intră în faza de execuție și ca urmare, scenariul se repetă. Mai întâi, se va intra într-o nouă fază de compilare.

### COMPILARE:

-   Parametrii funcției sunt declarați ca variabile locale în funcție, mai exact în mediul lexical pe care funcția îl generează. Aceasta este regula.
-   **\# 5** compilatorul trece peste `ex` pentru că nu este o declarație și nu intră în compilare
-   declară funcția internă `sarcinaInterna`.
-   `ex` este declarată și este hoisted. Atenție, chiar dacă `ex` are mai sus o atribuire, în această fază sunt două lucruri distincte.

### EXECUȚIE (se creează automat contextul de execuție).

-   variabilei locale param îi este atribuită valoarea 2
-   variabilei param îi este modificată valoarea.
    -   **\# 5** Cine este *ex*?
    -   **Context**: local scope
    -   **Motorul întreabă**: știi ce este `ex`?
    -   **Răspuns**: Nu, nu știu, dar mă duc pe „scope chain” și caut în container până în Global Scope dacă este nevoie.
    -   **Efect**: dacă o variabilă cu același nume este găsită pe lanțul de scope în Global scope valoarea din funcție modifică valoarea variabilei din Global scope. - **Dacă**: nu este găsită o variabilă cu același nume *mai sus*, atunci va crea una din oficiu. Dacă se folosește „use strict”, va fi returnată o eroare ReferenceError
-   **\#11** se returnează funcția internă `sarcinaInterna` ceea ce conduce la invocarea acesteia.

### COMPILARE

-   **\#7** este declarată variabila `ex`. Dacă există o variabilă cu același nume în funcția container, variabila acestuia nu va fi suprascrisă, ci întotdeauna se va referenția cea din scope-ul existent. Așa funcționează „scope resolution” iar această stare de lucruri se numește variable shadowing.
-   este declarată variabila locală `fruct`.
-   **\# 9** Cine este *masura*?
-   **Context**: local scope
-   **Motorul întreabă**: știi ce este masura?
-   **Răspuns**: Nu, nu știu, dar mă duc pe „scope chain” și caut în funcția container până în Global Scope dacă este nevoie.

### EXECUȚIE

-   variabilei `ex` îi este atribuită valoarea „din interior”.
-   variabilei `fruct` îi este atribuită valoarea 0.
-   valiabila măsura va fi modificată în contextul local fiind înmulțită cu 2 și atribuită ei înseși
-   valoarea măsurii este returnată în contextul de mai sus, adică valoarea 24.
