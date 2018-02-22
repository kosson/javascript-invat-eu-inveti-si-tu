# Hoisting - ridicarea în „capul blocului”

Hoistingul trebuie privit ca un comportament al motorului JavaScript, care ia identificatorii și îi face omniprezenți pentru blocul de cod în care au fost declarați poziționându-i în „capul blocului” de cod.

**Spune standardul**:

> `undefined` este pasat mediului pentru a arăta că operațiunea PutValue ar trebui să fie folosită pentru a asigna valoarea de inițializare. Acesta este cazul variabilelor **var** și al listei de parametri formali ai unor funcții non-stricte ( [Vezi 9.2.12](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-functiondeclarationinstantiation) ). În acele cazuri legătura lexicală este hoisted și preinițializată înainte de evaluarea inițializatorilor săi. [12.1.5 Runtime Semantics: BindingInitialization](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-functiondeclarationinstantiation)

Atașarea unui varibile la mediul lexical al unei funcții în interiorul căreia a fost declarată la momentul compilării este cel mai rapid exemplu de „hoisting” - de ridicare. Hoisting ca și termen sau procedură nu există în standard. Este mai degrabă o explicație pentru comportamentul motorului la momentul compilării vis-a-vis de ceea ce se petrece cu identificatorii la momentul compilării.
Această omniprezență permite disponibilitatea variabilelor și a funcțiilor înainte ca acestea să capete și valorile lor.

Acest lucru se petrece deoarece mai întâi de a fi executat programul, codul sursă trece printr-o fază de compilare în care motorul JavaScript se uită să vadă mai întâi de toate care sunt identificatorii. Apoi motorul trece la execuție, moment în care toți identificatorii primesc și valorile.

Există un mic truc care trebuie stăpânit pentru a înțelege hoisting: declararea trebuie detașată de asignarea valorii. Nu cădea în capcana celui care văzând operatorul de atribuire `=` crede că valoarea a fost și atribuită la momentul în care ai declarat variabila.

**Moment Zen**: declararea unei variabile și atribuirea variabilei (construirea legăturii dintre identificator și valoare) sunt două operațiuni diferite în timp. Declararea are drept efect constituirea mediului lexical prin popularea sa cu identificatori legați doar la `undefined`.

În cazul funcțiilor, declarația variabilei este **hoisted** în capul funcției gazdă, iar locul unde se face asignare rămâne nemodificat.

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

Din acest motive este cel mai bine ca variabilele să fie declarate în capul funcției de la bun început.

Hoistingul se manifestă la fel ca și în cazul variabilelor declarate cu `var`, atunci când ai o expresie de funcție. Este hoistată declarația, dar asignarea se face când motorul ajunge la atribuire. Deci, nu vei putea apela înainte de a o inițializa cu valoarea de funcție.

Cel mai evident exemplu este să scrii o funcție care să returneze după ce ai declarat variabila. Surpriza mare este returnarea valorii `undefined` deoarece declarația a hoistat variabila, dar nu a mai apucat să facă și „legătura” la valoare.

```javascript
(function () {
  return x;
  var x = 10;
})(); // undefined
```

## Mantre

- JavaScript creează un **scope lexical**.
- „Săltarea” - oistingul se face la momentul compilării, nu la faza de execuție.
- Declararea variabilelor și funcțiilor este „săltată" - hoisted la vârful scope-ului funcțional indiferent de poziția lor în cod.
- Funcțiile sunt săltate înaintea variabilelor.
- Variabila primește valoarea `undefined`. Pentru că se întâmplă acest lucru, cel mai bine este să declari variabilele în capul funcției și de preferat într-o singură declarație var.
- Hoistingul are un rol funamental în cazurile de recursiviate și recursivitate mutuală (o funcție o cheamă pe alta până când o condiție rupe lanțul).
- Folosirea noului cuvânt cheie `let` pentru a declara variabilele, are ca efect limitarea scope-ului la nivelul blocului `{}` (block scoping).
- Excepția pentru care JavaScript face block scope este contrucția `try... catch`.

În contextul tuturor celor deja acumulate despre hoisting, următorul exemplu este ușor de înțeles. Faptul că putem invoca chiar de la bun început funcția unu, nu mai este o mare surpriză.

```javascript
unu(1);
function unu(ceva){
    if(ceva > 20) return ceva;  // verifica valoarea sa nu fie mai mare de 20
    return doi(ceva + 2);       // 7+2
};
function doi(ceva){
    return trei(ceva) + 1;      // 7
};
function trei(ceva){
    return unu(ceva*2);         // 6
};
```

- unu este invocat cu valoarea 1
- f unu testeaza daca parametrul este mai mare decat 2; nu este
- doi este invocat trei cu valoarea 1+2 = 3
- trei este invocat cu valoarea 3 ; se adaugă în stivă 1 pentru această iterație
- f trei invoca unu cu valoarea 3*2 = 6
- unu verifica daca voaloarea param este mai mare de 20; nu este
- unu invoca doi cu valoarea 6+2 = 8
- doi invoca trei cu valoarea 8 ; se adaugă în stivă 1 pentru această iterație
- trei invoc unu cu valoarea 16
- unu evalueaza daca param este mai mare de 20; nu este
- unu invoca doi cu valoarea 16+2 = 18
- doi invocă trei cu valoarea 18 ; se adaugă în stivă 1 pentru această iterație
- trei invocă unu cu valoarea 18*2 = 36
- la 36 se adaugă valoarea din stivă 3
- Rezultat returnat: 39.

## Marcajul sintactic și hoisting-ul

Să examinăm cazurile în care declarăm variabile în interiorul unor enunțuri precum `if` sau `for`. De ce facem acest lucru când suntem perfect conștienți că aceste variabile vor fi disponibile întregului cod, nu doar blocului decizional sau buclei `for`? Răspunsul rezidă din necesitatea umană de a semnala celorlalți programatori faptul că acele variabile, acei identificatori nu trebuie folosiți în altă parte în afara zonei în intenție pentru care au fost declarați.

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

Felul de a declara, ca și loc în care facem declararea, implică faptul că semnalizăm cui vrem noi să „aparțină” fiecare variabilă definită.

Concluzia este că hoistingul este doar o explicație oferită pentru felul în care este constituit mediul lexical la momentul complilării și comportamentul vis-a-vis de inventarierea identificatorilor.

Ceva s-a întâmplat între timp odată cu apariția versiunii ES6. Folosirea lui `let`, forțează la nivelul compilatorului ca variabila declarată să fie atașată doar enunțului respectiv.

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

Încercarea de a accesa varibilele declarate cu `let` în afara enunțurilor, se va solda cu o eroare.
