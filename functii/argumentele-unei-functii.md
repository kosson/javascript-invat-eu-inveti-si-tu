# Argumentele și parametrii funcțiilor

Pentru a face o analogie utilă poți să-ți imaginezi că o funcție este un port la mare. Portul are dane. Fiecare dană are un nume sau un număr. Poți trimite câte o navă (argument) în fiecare dană (parametru), dar pot fi mult mai multe nave în rada portului (arity). Evidența navelor din radă o ține căpitănia (obiectul arguments). Fiecare navă conține bunuri (valori) pe care le vom prelucra în oraș (funcție). Poți chiar să întrebi o funcție câți parametri are prin utilizarea proprietății `length` (în limba engleză, `length` înseamnă dimensiune, lungime).

```javascript
function facCeva (x, y) {
  return x + y;
};
facCeva.length; // 2
```

De fapt, poți să spui că **arity**, adică totalitatea parametrilor menționați între parantezele rotunde, anunță programatorii ce este așteptat ca număr de valori necesare evaluării codul. Dimensiunea acestui **arity** poate să fie raportată diferit în funcție de valorile pasate.

```javascript
function fac1 (x, y) {}; fac1.length; // 2
function fac2 (x, y = 10) {}; fac2.length; // 1
function fac3 ({x, y}) {}; fac3.length; // 1
function fac4 (x, ...y) {}; fac4.length; // 1
```

Fiecare argument trebuie pasat funcției în ordinea corectă pentru că valoarea sa se va *lega* de numele desemnat de programator între parantezele rotunde. Aceste nume, de fapt identificatori, se numesc parametri. Ca să clarificăm, valorile pasate unei funcții se numesc argumente, iar identificatorii menționați între paranteze (headerul funcției), de care se leagă aceste valori, se numesc parametri. O funcție poate primi mult mai multe argumente față de ceea ce este precizat ca parametri. Valorile acestea nu se pierd în neant. Ele vor putea fi regăsite în obiectul special `arguments`, dar dacă vei trimite mai puține argumente, restul parametrilor vor avea valoarea `undefined`. Parametrii vor face parte din mediul lexical al funcției.

Toate aceste detalii sunt utile pentru că la un moment dat este necesară executarea unei funcții în funcție de numărul parametrilor săi. Poate să existe și cazul în care dorești un anumit parametru să stea întotdeauna pe ultima poziție pentru că, de fapt, acesta este la rândul său o funcție cu rol de callback (va fi apelată in interiorul funcției).

```javascript
let x = 10, y = function init () { return `Salut, ${x}!` };
function fac1 (x) { return ++x; };
function fac2 (x, y) { return y() };
if (fac1.length == 1) {
  fac1(x);
};
// să presupunem că vrem y pe ultima poziție
if (fac2.length == 2) {
  fac2(undefined, y);
}; // "Salut, 10!"
```

Amintește-ți mereu faptul că proprietatea `length` este una poate fi doar citită - *read-only*. Și acum că am aflat cum că numărăm parametrii, sunt absolut convins că mă vei întreba cum să numărăm și argumentele. Nimic mai simplu: obiectul `arguments` are la rândul său o proprietate `length` care poate fi folosită pentru a afla câte argumente au fost pasate funcției: `arguments.length`. Spunem despre o funcție care primește mai multe argumente decât numărul parametrilor că este una `variadică`.

## O imagine în adâncime

Mai jos este dat un exemplu întărește afirmația: **o funcție este o rutină aplicată pe argumentele sale**. Exemplul se bazează pe funcționalitatea metodei `apply()` oferită prin moștenire din obiectul prototip al obiectului intern `Function`. (`Function.prototype.apply()`).

```javascript
function oFunctie (x, y, z) {
  // transformă obiectul arguments într-un array
  console.log([].slice.call(arguments)); // Array [ 0, 1, 2 ]
  console.log(...arguments); // 0 1 2
};
let argumentele = [0, 1, 2];
oFunctie.apply(null, argumentele); // argumentele sunt aplicate literalmente funcției.
```

Acest exemplu ilustrează în adâncime ceea ce se petrece cu argumentele unei funcții. Am folosit soluția practică `Array.prototype.slice.call(arguments)` pentru a transforma obiectul `arguments` într-un array.

### Ce este `arguments`?

Este un obiect care este disponibil funcției la momentul execuției. Acesta permite accesul la toți parametrii. Atunci când pasăm unei funcții același număr de argumente câți parametri sunt, lucrurile sunt foarte clare. Ce te faci atunci când sunt pasați mult mai mulți parametri? Trebuie să fie o structură capabilă să înmagazineze surplusul. Pentru funcțiile variadice, această structură este obiectul `arguments`.

**Spune standardul**:

> Majoritatea funcțiilor ECMAScript pun la dispoziția propriului cod un obiect `arguments`.

```javascript
function ceva (unu, doi) {
  return arguments.toString();
};
ceva(); // "[object Arguments]"
```

Scenariul comun în care este folosit acest obiect este cel al funcțiilor care primesc un număr variabil de argumente.

**Sfatul lui Crockford**:

> tratează `arguments` ca pe o structură read-only (pe care doar o citești), pentru că, altfel, poți modifica fără să-ți dorești valorile și ordinea parametrilor funcției.

```javascript
function testX (unu, doi) {
  console.log(typeof arguments);      // object
  console.log(arguments.constructor); // function Object()
  console.log(arguments.__proto__);   // Object { , 15 more… }
  console.log(arguments.prototype);   // undefined
};
testX(10, 1000);
```

Unui obiect `arguments` i se pot seta proprietăți: `arguments[3] = 'trei'` în caz că acest lucru este necesar.

```javascript
function ex (unu, doi) {
  console.log(this);  // Window
  this.trei = 3;      // se creează prop trei: window.trei care este 3
  console.log(ex.arguments); // Arguments {0:1,1:2,calee:ex(),length:2,__proto__:Object}
  function intern (patru, cinci) {
    console.log(this.trei);    // 3
    console.log(ex.arguments); // Arguments {0:1,1:2,calee:ex(),length:2,__proto__:Object}
  };
  intern();
};
ex(1,2);
console.log(window.trei);
```

### Efectul rulării sub "use strict"

În interiorul unei funcții, pentru că un parametru poate fi modificat, acesta fiind parte din mediul lexical format la execuția funcției, obiectul `arguments` este și el actualizat. Avem acest comportament când evaluarea se face fără regula `"use strict";`. În caz contrar, valorile inițiale din `arguments` rămân neschimbate.

```javascript
function demoArgs (unu) {
  console.log(unu === arguments[0]); // true
  unu = 100;
  console.log(unu === arguments[0]); // true
};
demoArgs(10);
// față de
function demoArgs (unu) {
  "use strict";
  console.log(unu === arguments[0]); // true
  unu = 100;
  console.log(unu === arguments[0]); // false
  console.log(arguments[0]); // 10
};
demoArgs(10);
```

## Operatorul spread

Am văzut deja mai sus metoda prin care putem transforma `arguments` într-un array, dar există și alte metode pentru a gestiona argumentele pasate unei funcții, dar și parametrii.

Noua sintaxă ES6 a introdus operatorul (trei puncte), care în funcție de cazul de utilizare, poate **colecta** într-un array argumentele care nu au fost asociate cu un parametru sau la invocarea unei funcții, poate **desface** un array și fiecare valoare a acelui array va fi un argument trimis funcției.

```javascript
// adunarea într-un array a argumentelor neasociate parametrilor
function facCeva (x, y, ...z) {};
// spargerea unui array în argumentele necesare unei functii
let colectie = [2, 4, 10];
prelucrezNr(...colectie);
```

Hai să vedem același exemplu folosind acest nou operator:

```javascript
function oFunctie (x, y, z) {
  console.log([].slice.call(arguments));
};
let argumente = [4, 5, 6];
oFunctie(...argumente); // Array [ 4, 5, 6 ]
```

Parametrii preiau valorile pasate prin intermediul argumentelor.

```javascript
function demo (param1, param2) {
  return param1 + param2;
};
// parametrii sunt declarațiile din funcție
demo(1, 2); // argumentele este ceea ce pasezi funcției la invocare.
```

La nevoie poți specifica strict numărul argumentelor primite:

```javascript
function faCeva (a, b) {
  if (arguments.length !== 2) { // sintaxa spread
    throw new Error('Trebuie musai doar două argumente');
  };
};
faCeva(1, 3, 4); // Error: Trebuie musai doar două argumente
```

## Transformarea lui arguments într-un array

De multe ori se ivește necesitatea de a tranforma `arguments` într-un array. Pentru acest lucru se folosea utilitarul `slice()` invocat în contextul obiectului `arguments`. Aceasta este o practică de dinaintea actualizării standardului la ES5.

```javascript
function convertireArgs (a, b) {
  let arr1 = Array.prototype.slice.call(arguments);
  console.log(arr1);
  // sau
  let arr2 = [].slice.call(arguments);
  console.log(arr2);
  // se poate folosi și Array.from()
  let arr3 = Array.from(arguments);
  console.log(arr3);
  // dar și spread operator
  let arr4 = [...arguments];
  console.log();
}; convertireArgs(10, 11);
```

Uneori era nevoie să trimiți obiectul argumentelor altei funcții pe care o apelai din cea care primea datele și le avea în `arguments`.

```javascript
function convertireArgs (a, b) {
  let arr = Array.prototype.slice.call(arguments);
  preiaSiPrelucreaza.apply(null, arr);
};
```

Fă o vizită operatorului `...` (rest / spread) pentru mai multe exemple și lucruri potențial foarte utile pentru a înțelege simplitatea oferită prin abstractizarea pe care ES6 a introdus-o cu astfel de sintaxe.

În acest moment, pentru a obține un array din obiectul `arguments` se poate folosi și noul utilitar `Array.from(arguments)`.

## Câte argumente sunt?

Acest lucru este posibil pentru că `arguments` este array-like și astfel, oferă o proprietate `length` pe care orice array o oferă.

```javascript
function cateSunt () {
  return arguments['length'];
};
cateSunt(1); // 1
cateSunt(23, 10, 5, 'aha'); // 4
```

### Numărul la invocare vs. la declarare

Argumentele pasate unei funcții la momentul invocării trebuie să se potrivească numărului de parametri specificați în declarația funcției și în acceași ordine.
Sunt cazuri în care numărul argumentelor este mai mare decât cel al parametrilor, precum și cazuri în care numărul argumentelor este mai mic decât cel al parametrilor. Trebuie reținut faptul că JavaScript nu va da vreo eroare atunci când sunt diferențe.

### Argumente care variază ca număr

Până la standardul ECMAScript 2015 (ES6), JavaScript nu permitea colectarea unui număr variabil de argumente într-un singur parametru. Pentru a face acest lucru, se apela la un truc care exploata argumentul pasat automat lui `arguments`. Dar acest truc depinde de tratarea obiectului `arguments` ca un array, fiind necesară transformarea lui în array.

```javascript
function test () {
  var primulArg = arguments[0],
      alDoileaA = [].slice.call(arguments, 1);
  // restul codului
};

// alternativa oferită de ECMAScript 2015 - ES6
function test (primulArg, ...restulArgs) {
  // cod
  console.log(restulArgs); // Array [ 2, 3, 4, 5 ]
};
```

### Numărul argumentelor este mai mare decât al parametrilor

Valorile *în plus* nu vor fi atribuite identificatorilor parametrilor deja menționați. Acestea vor putea fi regăsite în `arguments`.

### Numărul argumentelor este mai mic decât al parametrilor

Valorile corespondente vor fi atribuite iar parametrii care nu au valori, vor fi setați la `undefined`.

## Setarea unei valori implicite pentru un argument

În anumite cazuri este nevoie de a inițializa un parametru cu o anumită valoare prestabilită și nu `undefined` așa cum este comportamentul standard al ECMAScript.

Până la noua versiune a ECMAScript, mai întâi se verifica în funcție dacă un anumit parametru este `undefined`. Dacă da, se inițializa cu o valoare. Acest lucru este posibil, dacă ne readucem aminte faptul că și parametrii sunt identificatori în scope-ul funcției (*lexical environment*).

```javascript
let test = function (ceva) {
  return ceva || 'Valoare implicită';
};
console.log(test('CEVA')); // CEVA
console.log(test());       // Valoare implicită

// Sau se mai proceda așa
function faCeva (a, b) {
  if(typeof b === 'undefined'){ b = 5 };
  return a * b;
};
faCeva(1);

// o altă alternativă mai era
function faCeva (a, b) {
  b = (typeof b !== 'undefined') ? b : 10;
  return a * b;
};
faCeva(12);
```

Acesta este un șablon de lucru foarte important care permite utilizarea de valori prestabilite atunci când nimic nu este pasat funcției. Acest mic șablon se schimbă odată cu folosirea ES6, când vei putea seta valoarea implicită chiar la pasarea argumentelor:

```javascript
function test (ceva = "Valoare implicită") {
  return ceva;
};
test();
```

## Valori inițiale opționale

Odată cu apariția noii versiuni a standardului - ES6, parametrii pot avea valori inițiale. În ES5, acest lucru se putea face folosind operatorul `||`. În acest caz, nu se puteau pasa valori care prin evaluarea cu operatorul `||` se reduceau la o valoare *falsey*.

```javascript
function faUnBloc (inaltime, latime, lungime, timpCoacere) {
  inaltime = inaltime || 100;
  latime = latime || 80;
  timpCoacere = timpCoacere || 85000;
  console.log(inaltime, latime, lungime, timpCoacere);
};
faUnBloc('', '', 150, 0); // 100 80 150 85000
```

Pentru cei care vor să fie ultracorecți, idiomul de setare a unei valori de start ar trebui să fie acesta: `inaltime = inaltime !== undefined ? x : 100`.

```javascript
function x (a) {
  a = typeof a === 'undefined' ? 100 : a;
  // cod
};
```

Folosirea lui `typeof` returnează tipul valorii. Dacă un parametru nu primește argument, `undefined` este atribuit automat de motor. Odată detectată valoarea `undefined` se poate seta o nouă valoare din oficiu pentru parametru.

În acest mod poți pasa și valori care s-ar reduce la o valoarea ce exprimă falsitatea (*falsey*), precum `0`, `undefined` sau `null`. Mai este o posibilitate care se reduce la testarea tipului valorii pasate pentru a determina valoarea de start (default îi spun englezii) în funcție de rezultat. În exemplul de mai sus, pentru ultima valoare, care este una validă pentru timp (`0`), motorul a redus-o la o valoare `falsey` și a preferat valoarea inițială.

```javascript
function masoaraTimp (timpCoacere, rasuceste) {
  timpCoacere = (typeof timpCoacere !== 'undefined') ? timpCoacere : 85000;
  rasuceste = (typeof rasuceste !== 'undefined') ? rasuceste : (function () {
    if(timpCoacere > 100000){
      alert('Răsucesc!');
    } else {
      alert('Mai coc!');
    };
  })(); // o funcție care se execută automat dacă nu este oferită altă funcție.
  console.log(timpCoacere);
};
masoaraTimp(0); // Mai coc! Comportamentul este corect de această dată.
masoaraTimp(150000); // Răsucesc!
```

În exemplul oferit mai sus, această verificare a existenței unei valori este des întâlnită în practica de zi cu zi a codului conform ES5. Poate fi considerat idiomul preferat pentru valori inițiale. Acesta reflectă o manieră imperativă în ceea ce privește setarea valorilor default.

### Default values începând cu ES6

ES6 permite introducerea valorilor inițiale direct în zona argumentelor transformând un obicei imperativ într-o abordare declarativă chiar din zona argumentelor. Atenție, sunt permise numai expresii, nu instrucțiuni.

```javascript
function masoaraTimp (timpCoacere = 85000, rasuceste = function () { alert('') }) {
  // cod funcție
};
```

Obiectul `arguments` în cazul parametrilor presetați are comportamentul rulării conform ES5 cu `"use strict";`. Pur și simplu, când motorul *vede* parametri cu valori inițiale, aplică comportamentul de izolare asupra obiectului `arguments`.

```javascript
function demoArgs (unu, doi = 2) {
  console.log(doi === arguments[1]); // false
  doi = 10; console.log(doi == arguments[1]); // false
  console.log(arguments[0]); // 1000
}; demoArgs(1000);
```

Expresia `console.log(doi === arguments[1]);` returnează `false` pentru că doar un singur argument a fost pasat funcției. Acest lucru poate fi demonstrat prin valoarea `1` data lui `arguments.length`, iar în acest moment `arguments[1]` va fi `undefined`, ceea ce este și firesc pentru că doar un singur argument a fost pasat.

Reține faptul că `arguments` reflectă starea inițială și că trebuie să fie numai valori primitive, chiar dacă acestea sunt rezultatul evaluării unei alte funcții (care este o expresie) - trebuie să invoci funcție, nu să pasezi o referință către aceasta.

```javascript
function doi () { return 2; };
function demoArgs (unu, doi = doi()) {};
```

Mai există un lucru care trebuie reținut în cazul asignării unei funcții unui parametru. Această funcție nu va fi invocată înainte de a fi apelată însăși funcția în sine. Pe scurt, expresia de funcție nu este evaluată până în momentul în care chiar este nevoie de valoarea la care se reduce. Dacă apelezi funcția cu un argument, iarăși, funcția nu va fi apelată și expresia astfel evaluată pentru că a fost primită valoarea așteptată. Dacă se invocă fără argument, ei bine, doar atunci va fi invocată funcția.

O utilitate imediată și cu un impact imediat este aceea de a trimite o eroare în cazul în care funcția chiar are nevoie să primească o valoare la parametru.

```javascript
function atentionare () {
  throw "Prietene, pasează valoarea";
};
function faCeva ( a = atentionare() ) {
  console.log(a);
};
faCeva(); // Error: Prietene, pasează valoarea
faCeva('ceva'); // "ceva"
```

### Parametrare presetată cu argumente ca modificatori

ES6 permite introducerea unui obiect cu proprietăți cu valori presetate. Acestea pot fi modificate prin argumentele funcției. Astfel, putem identifica eleganța pe care destructurarea o oferă.

```javascript
function faCeva ({prim = 1, secund = 2, tert = 3} = {}) {
  console.log(prim, secund, tert);
  console.log(...arguments);
}; // 1 2 3
faCeva({secund: 'ceva'}); // 1 ceva 3
faCeva(10); // 1 2 3
faCeva({tert: true}, 10); // 1 2 true
faCeva({secund: 'ceva', test: true});
faCeva({secund: 'doi', tert: false, prim: 9});
```

Oricare alt argument pasat poate fi găsit în `arguments` dacă se dorește. Și în cazul obiectelor, trebuie să se respecte identificatorii proprietăților, dacă valorile acestora se doresc să treacă ca parametri. Alte proprietăți vor fi regăsite în `arguments`.

Mai este ceva interesant care merită evidențiat. La momentul presetării valorilor prin `{prim = 1, secund} = {}`, dacă o proprietate are aceeași valoare literală ca și valoarea, nu mai este necesară asignarea. Pur și simplu scrii doar cheia.

```javascript
const persoana = ({nume, prenume, id}) => {
  return `${nume} ${prenume} ${id}`;
};
let prima = persoana({
  nume: 'Elena',
  prenume: 'Văcărescu',
  id: 47
});
console.log(prima);
```

Mai observăm un lucru foarte important: parametrii pot fi introduși în oricare ordine. Nu mai suntem limitați de *poziție*, precum în cazul standardelor până la ES5. Vă reamintesc că trebuia să introduci argumentele în ordine fixă pentru a se face legăturile corecte în obiectul `arguments`.

## Parametrii cu valori inițiale pot servi valori celor care urmează

```javascript
function demoArgs (unu, doi = unu + 1) {
  console.log(doi);
};
demoArgs(10); // 11
```

Mai mult, chiar poți pasa un parametru anterior ca argument în evaluarea unei funcții ce va returna o valoare penru un altul care-i urmează. Este exact ceea ce ai face în interiorul funcției cu diferența că o faci în zona argumentelor. Atenție, nu poți folosi un parametru înainte ca acesta să fi fost inițializat. Este același caz ca și pentru `let`. Fii atent!

## Evaluarea parametrilor se face la momentul invocării funcției

Trebuie să ne aducem aminte faptul că de fiecare dată când este invocată o funcție, un nou obiect este creat. La invocare abia este evaluat codul din funcție și se generează și scope-ul (lexical environment-ul) local, adică cel al funcției. Parametrii fac parte din acest scope local. Un exemplu în acest sens este următorul:

```javascript
function adaugaInColectie (valoare, array = []) {
  array.push(valoare);
  return array;
};
adaugaInColectie(10);
```

Este valabil și pentru funcții, care sunt evaluate la rândul lor și rezultatul devine valoarea parametrului la momentul invocării.

```javascript
function oFunctie () {
  return "ceva din funcția pasată ca argument";
};
function exemplu (x = oFunctie()) {
  return x;
};
exemplu();
```

Pe măsură ce parametrii sunt evaluați, aceștia se fac disponibili parametrilor evaluați ulterior ca în cazul următor:

```javascript
function exemplu (una, alta = una + 2, cateva = alta + ' mere') {
  return [ alta, cateva ];
};
exemplu(2); // Array [ 4, "4 mere" ]
```

## Rest și destructurare

Folosirea operatorului `...` generează un array adevărat, nu un *array-like* așa cum este `arguments`. Parametrii rest generează o colecție a tuturor argumentelor care nu au primit identificatori. Totuși `arguments` îi conține pe toți.

Intenția introducerii prin ES6 a **parametrilor rest**, a fost accea de a înlocui `arguments`. Motivul a fost necesitatea de a putea introduce un număr nelimitat de argumente.

Sintaxa este reprezentată prin operatorul `...` urmat de un identificator. Regula privind *rest parameters* este că identificatorul precedat de operatorul rest, trebuie să fie ultimul parametru introdus în headerul funcției.

Înainte de ES6, singura metodă de a transforma `arguments` într-un array era prin folosirea unui artificiu des întâlnit:

```javascript
function lucru (a, b) {
  Array.prototype.slice.call(arguments, lucru.length);
  // cod funcție
};
```

fiind echivalent cu:

```javascript
function lucru (a, b, ...argumente) {
  // cod funcție
};
```

Parametrii rest nu pot fi utilizați atunci când se creează obiecte a căror proprietăți sunt introduse folosind *object literal setters*. Acest lucru se petrece pentru că setarea în acest mod a proprietăților se poate face doar cu un singur argument, iar parametrii rest pot seta o mulțime de parametri.

```javascript
let x = {
  set facCeva(...argumente){}
};
```

### Modelul unui array

Putem pasa unei funcții toate argumentele folosind un array, dar felul în care vor fi preluate și asociate unor parametri poate fi modelat prin destructurare. Putem imagina cazul în care ai nevoie ca primul argument să fie asociat unui parametru.

```javascript
function facCeva ([x, ...restulArgumentelor] = []) {
  return ++x;
};
facCeva([1, 2]);
```

Ceea ce tocmai am transmis motorului JavaScript este că va face o asignare a parametrilor cu valori, iar pentru parametri, este dat un array în care vor fi introduși toți identificatorii pentru aceștia. Destructurarea va **desface** primul array și pentru fiecare valoare din acesta, va asigna o valoare din cel de-al doilea. În cazul nostru, pentru că am menționat numele primului identificator, acesta va primi valoarea 1 și așa va intra în mediul local al funcției. Valoarea 2 intră în `arguments` pentru că nu a fost precizat un alt identificator. Acest lucru este îndeplinit prin operatorul trei puncte. Acest lucru ar fi putut să fie obținut prin asignarea manuală a parametrilor.

```javascript
function facCeva (arrayValori) {
  var x = arrayValori[0];
};
```

### Modelul unui obiect

Obiectele sunt și ele bune candidate pentru destructurare.

```javascript
function facCeva ({a, b} = {}) {
  console.log(a, b);
};
facCeva({a: 1, b: 2});
```

În cazul obiectelor trebuie să fim atenți ca numele cheilor să fie același cu cel al obiectului parametrilor.

```javascript
function test({a, b}) {
  return `${a} și ${b}`;
};
var obi = {
  a: 10, b: true
};
test(obi); //"10 și true"
```

Spre deosebire de cazul array-urilor, utilizarea unui obiect în cazul destructurării, are avantajul introducerii în obiect a cheilor în orice ordine este dorită atâta vreme cât păstrăm convenția de echivalență a numelor cheilor în obiectul corespondent parametrilor.

Dacă trimitem unei funcții un argument care are drept valoare un obiect, putem constitui un alt obiect subset pe care să-l returnăm.

```javascript
var vehicul = {
  nume: 'Tesla S',
  masa: 1200,
  autonomie: 250
};

function peAlese (obi) {
  let transformat = {};

  for(let x = 1, lungime = arguments.length; x < lungime; x++ ){
    transformat[arguments[x]] = obi[arguments[x]];
  }; // pornești de la index pentru că la 0 este chiar obiectul

  return transformat;
};

let masina = peAlese(vehicul, 'nume', 'autonomie');
console.log(masina); // Object { nume: "Tesla S", autonomie: 250 }

// și varianta folosind rest parameters
function peAlese(obi, ...chei){
  var transformat = {};
  for(let x = 0, lungime = chei.length; x < lungime; x++){
    transformat[chei[x]] = obi[chei[x]];
  };
  return transformat;
}; // chei conține toți parametrii de după primul.
```

## Mantre

-   Valoarea parametrilor unei funcții este din start `undefined`.
-   Evaluarea parametrilor se face la momentul invocării funcției.
-   Argumentele pasate funcțiilor pot avea echivalență în numărul parametrilor declarați sau nu.
-   O funcție are o proprietate `length`, care nu trebuie confundată cu proprietatea cu același nume a parametrului `arguments`. `nume_funcție.length` returnează câți parametri care au un nume au fost declarați.
-   Obiectul `arguments` este actualizat în permanență când codul nu-i `strict` și poți modifica în interiorul funcției valoarea parametrilor.
-   `arguments` are caracteristicile unui array, zicem că este array-like.
-   Pentru o funcție poți vedea câți parametri au fost declarați (`nume_functie.length`) și câte argumente i-au fost pasate (`arguments.length`).
