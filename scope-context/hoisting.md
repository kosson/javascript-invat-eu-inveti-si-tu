# Hoisting - omniprezență

Hoistingul trebuie privit ca un comportament al motorului JavaScript care ia identificatorii și îi face omniprezenți pentru blocul de cod în care au fost declarați poziționându-i în **capul blocului** de cod. De fapt, această *omniprezență* este realizată la compilarea codului sursă și totul este disponibil pentru execuție.

```javascript
console.log(a);
// înțelege faptul că identificatorul a deja există și are valoarea undefined
var a = 2;
console.log(a);
```

**Spune standardul**:

> `undefined` este pasat mediului pentru a arăta că operațiunea `PutValue` ar trebui să fie folosită pentru a atribui valoarea de inițializare. Acesta este cazul variabilelor **var** și al listei de parametri formali ai unor funcții non-stricte. În acele cazuri o legătură lexicală este hoisted și preinițializată înainte de evaluarea inițializatorului său.[12.1.5 Runtime Semantics: BindingInitialization](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-identifiers-runtime-semantics-bindinginitialization).

Pentru a înțelege mai bine, tot faza de compilare a codului sursă este responsabilă cu realizarea hoisting-ului. La momentul compilării sunt *culese* într-un inventar global toate variabilele și funcțiile. Abia după aceea este interpretat codul și în final este executat. În concluzie, la momentul execuției, deja sunt disponibile toate variabilele și funcțiile la nivel de identificatori. Ba chiar în cazul funcțiilor, acestea sunt disponibile chiar mai devreme de variabile.

Introducerea la momentul compilării a unei variabile în mediul lexical al funcției în interiorul căreia aceasta a fost declarată este cel mai rapid exemplu de hoisting - omniprezență. Acest mecanism pune la dispoziție variabilele funcției înainte să le fie atribuite valorile. Acest lucru se petrece deoarece, înainte de a fi executat programul, codul sursă trece printr-o fază de compilare, în care motorul JavaScript se uită să vadă mai întâi de toate care sunt identificatorii. Motorul trece apoi la execuție, moment în care toți identificatorii primesc valorile.

```javascript
facCeva(); // prima
var facCeva;
function facCeva () {
  console.log('prima');
};
facCeva = function () {
  console.log('secunda');
};
```

Există un mic truc care trebuie stăpânit pentru a înțelege hoisting-ul. Declararea trebuie detașată ca etapă separată de cea în care se face atribuirea valorii. Nu cădea în capcana operatorul `=`, crezând că valoarea a fost deja atribuită la momentul în care ai declarat variabila.

**Moment Zen**: declararea unei variabile și atribuirea variabilei (construirea legăturii dintre identificator și valoare) sunt două operațiuni diferite în timp. Declararea are drept efect constituirea mediului lexical prin popularea sa cu identificatori legați doar la `undefined`.

În cazul funcțiilor, declararea variabilelor cu `var` face ca acestea să fie disponibile în întreaga funcție, dar locul unde se face atribuirea valorii rămâne nemodificat. Asta înseamnă că unde apare operatorul de atribuire, abia acolo și atunci se face legătura cu valoarea.

```javascript
function faCeva () {
  var oValoare = 0;
};
```

Ceea ce se întâmplă poate fi ilustrat printr-o nouă reformulare a codului:

```javascript
function faCeva () {
  var oValoare; // oValoare este acum undefined
  oValoare = 0; // s-a făcut „legătura” la valoarea 0
};
```

Din aceste motive este cel mai bine ca variabilele să fie declarate în capul funcției de la bun început. Mai ales în cazul variabilelor definite cu `let`.

Hoistingul se manifestă la fel ca și în cazul variabilelor declarate cu `var`, atunci când ai o expresie de funcție. Este hoistată declarația, dar atribuirea valorii, care este funcția în sine, se face când motorul ajunge la evaluarea expresiei. Deci, nu vei putea apela înainte de a o inițializa cu valoarea de funcție.

Cel mai evident exemplu este să scrii o funcție care să returneze după ce ai declarat variabila. Surpriza mare este returnarea valorii `undefined` deoarece declarația a hoistat variabila, dar nu a mai apucat să facă și *legătura* la valoare.

```javascript
(function () {
  return x;
  var x = 10;
})(); // undefined
```

## Mantre

-   JavaScript creează un **scope lexical**.
-   Hoistingul se face la momentul compilării, nu la executare.
-   Declararea variabilelor cu `var` și funcțiilor beneficiază de mecanismul hoistingului indiferent de poziția lor în cod.
-   Funcțiile sunt săltate înaintea variabilelor.
-   Variabilele primesc automat valoarea `undefined`.
-   Hoistingul are un rol fundamental în cazurile de recursivitate și recursivitate mutuală (o funcție o cheamă pe alta până când o condiție rupe lanțul).
-   Folosirea noului cuvânt cheie `let` pentru a declara variabilele, are ca efect limitarea scope-ului la nivelul blocului `{}` (block scoping).
-   Excepția pentru care JavaScript face block scope este contrucția `try...catch`.

În contextul tuturor celor deja acumulate despre hoisting, următorul exemplu este ușor de înțeles. Faptul că putem invoca chiar de la bun început funcția unu, nu mai este o mare surpriză.

```javascript
unu(1);
function unu (ceva) {
    if(ceva > 20) return ceva;  // verifica valoarea sa nu fie mai mare de 20
    return doi(ceva + 2);       // 7+2
};
function doi (ceva) {
    return trei(ceva) + 1;      // 7
};
function trei (ceva) {
    return unu(ceva*2);         // 6
};
```

-   unu este invocat cu valoarea 1
-   funcția unu testeaza daca parametrul este mai mare decat 2; nu este
-   doi este invocat trei cu valoarea 1+2 = 3
-   trei este invocat cu valoarea 3 ; se adaugă în stivă 1 pentru această iterație
-   funcția trei invoca unu cu valoarea 3*2 = 6
-   unu verifică dacă valoarea param este mai mare de 20; nu este
-   unu invocă doi cu valoarea 6+2 = 8
-   doi invocă trei cu valoarea 8 ; se adaugă în stivă 1 pentru această iterație
-   trei invocă unu cu valoarea 16
-   unu evaluează dacă param este mai mare de 20; nu este
-   unu invocă doi cu valoarea 16+2 = 18
-   doi invocă trei cu valoarea 18 ; se adaugă în stivă 1 pentru această iterație
-   trei invocă unu cu valoarea 18*2 = 36
-   la 36 se adaugă valoarea din stivă 3
-   Rezultat returnat: 39.

## Marcajul sintactic și hoisting-ul

Să examinăm cazurile în care declarăm variabile în interiorul unor instrucțiuni precum `if` sau `for`. De ce facem acest lucru când suntem perfect conștienți că aceste variabile vor fi disponibile întregului cod, nu doar blocului decizional sau buclei `for`? Răspunsul vine din necesitatea umană de a semnala celorlalți programatori faptul că acele variabile, acei identificatori nu trebuie folosiți în altă parte în afara zonei în intenție pentru care au fost declarați.

```javascript
if (x == undefined) {
  var ceva = 10;
  // se întâmplă ceva
};

// sau

for (var i = 0; i < 100; i++) {
  // ce se va întâmpla la fiecare iterare
};
```

Felul de a declara, dacă ne uităm **unde** o facem, implică faptul că semnalizăm cui vrem noi să *aparțină* fiecare variabilă definită. Concluzia este că hoistingul este doar o explicație oferită pentru felul în care este constituit mediul lexical la momentul compilării și comportamentul vis-a-vis de inventarierea identificatorilor.

Ceva s-a întâmplat între timp odată cu apariția versiunii ES6. Folosirea lui `let`, forțează la nivelul compilatorului ca variabila declarată să fie atașată doar blocului în care apare.

```javascript
if (x == undefined) {
  let ceva = 10;
  // se întâmplă ceva
};

// sau

for (let i = 0; i < 100; i++) {
  // ce se va întâmpla la fiecare iterare
};
```

Încercarea de a accesa varibilele declarate cu `let` în afara enunțurilor, se va solda cu ridicarea unei excepții.
