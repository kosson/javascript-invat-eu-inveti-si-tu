# Argumentele și parametrii funcțiilor

Pentru a face o analogie utilă poți să-ți imaginezi că o funcție este un port la mare. Portul are dane. Fiecare dană are un nume sau un număr. Poți trimite câte o navă (argument) în fiecare dană (parametru). Chiar dacă ai un număr limitat de dane, pot fi mult mai multe nave în rada portului, adică în cazul în care funcția primește mai multe argumente, le va primi, ținând o evidență a acestora. Evidența navelor din radă o ține căpitănia (obiectul `arguments` al funcției). Fiecare navă conține bunuri (valorile) pe care le vom prelucra în oraș (corpul funcției). Poți chiar să întrebi o funcție câți parametri așteaptă pentru a executa corect codul din corp prin interogarea proprietății `length` (în limba engleză, `length` înseamnă dimensiune, lungime).

```javascript
// argumentele sunt ceea ce pasezi funcției la invocare.
// parametrii sunt declarațiile din headerul funcției
function facCeva (x, y) {
  return x + y;
};
facCeva.length; // 2
```

De fapt, poți să spui că **arity**, adică totalitatea parametrilor menționați între parantezele rotunde, anunță programatorii ce este așteptat ca număr de valori necesare evaluării codul. Dimensiunea acestui **arity** poate să fie raportată diferit în funcție de valorile pasate. Fiecare argument trebuie pasat funcției în ordinea corectă pentru că valoarea sa se va *lega* de numele (identificatorul) desemnat de programator între parantezele rotunde (în headerul funcției). Valorile pasate unei funcții se numesc **argumente**, iar identificatorii menționați între paranteze (*headerul funcției*), de care se leagă aceste valori, se numesc **parametri**. Parametrii preiau valorile pasate prin intermediul argumentelor.

Amintește-ți mereu faptul că proprietatea `length` poate fi doar citită; este *read-only*. Spunem despre o funcție care primește mai multe argumente decât numărul parametrilor că este una `variadică`.

```javascript
function fac1 (x, y) {};      fac1.length; // 2 (decșarea simplă a parametrilor)
function fac2 (x, y = 10) {}; fac2.length; // 1 (y primește valoare din oficiu)
function fac3 ({x, y}) {};    fac3.length; // 1 (folosești destructurarea)
function fac4 (x, ...y) {};   fac4.length; // 1 (folosește sintaxa spread pentru restul argumentelor primite)
```

La nevoie poți specifica strict numărul argumentelor acceptate:

```javascript
function faCeva (a, b) {
  if (arguments.length !== 2) { // sintaxa spread
    throw new Error('Trebuie musai doar două argumente');
  };
};
faCeva(1, 3, 4); // Error: Trebuie musai doar două argumente
```

Am menționat deja faptul că o funcție poate primi mult mai multe argumente față de ceea ce este precizat ca parametri. Valorile acestea nu se pierd în neant. Ele vor putea fi regăsite în obiectul special `arguments`, dar dacă vei trimite mai puține argumente, restul parametrilor vor avea valoarea `undefined`. Parametrii vor face parte din mediul lexical al funcției.

Toate aceste detalii sunt utile, pentru că uneori este necesară executarea unei funcții în funcție de numărul parametrilor săi. Poți avea cazul în care dorești un anumit parametru să stea întotdeauna pe ultima poziție pentru că, de fapt, acesta este la rândul său o funcție cu rol de callback. Aceasta va fi apelată in corpul funcției după ce toate evaluările se vor fi încheiat.

```javascript
let x = 10, y = function init () { return `Salut, ${x}!` };
function fac1 (x) { return ++x; };
function fac2 (x, y) { return y(); };
if (fac1.length == 1) {
  fac1(x);
};
// să presupunem că vrem y pe ultima poziție
if (fac2.length == 2) {
  fac2(undefined, y);
}; // "Salut, 10!"
```

## Pasarea prin referință

Există o situație interesantă care ține de modul în care sunt pasate valorile ca argumente. De exemplu, valorile care sunt pasate ca referințe așa cum sunt obiectele, reflectă valorile proprietăților așa cum era la momentul în care funcția începe să fie evaluată.

```javascript
const valori = [45, 87, 14, 62, 9];

function incrementeazaCuVal (arr, coeficient) {
  let i;
  for (i = 0; i < arr.length; ++i) {
    arr[i] += coeficient;
  }
};

incrementeazaCuVal(valori, 5);
console.log(valori);
```

## Aplicarea pe argumente

Aceasta este o perspectivă asupra relației dintre codul funcției și argumentele primite. Spunem că facem o **aplicare** a unei funcții argumentelor sale pentru a produce o valoare care să fie returnată.

Profesorul Christopher Strachey spune:

> Aplicarea unei funcții argumentelor sale implică evaluarea expresiei care o definește după ce au fost date valori variabilelor conectate la acestea din lista argumentelor.
> Astfel, valoarea-R a funcției conține două părți: o regulă pentru evaluarea expresiei și un mediu care să-i ofere variabilele libere.

Să ne amintim mereu faptul că o funcție este aplicată argumentelor sale și că, la momentul apelării acesteia, se creează și un mediu lexical nou. În acest nou **mediu lexical** (un inventar al identificatorilor disponibili la momentul în care a fost invocată), parametrii identifică expresii ce vor fi *rezolvate/evaluate/reduse* la o valoare (funcții sau obiecte) sau sunt legături simple la valori scalare. Pentru exemplificare vom folosi funcții autoexecutabile, plasându-le între paranteze rotunde, fapt care va declanșa evaluarea codului intern.

```javascript
((x) => x)(2 + 3); // expresia pasată funcției autoexecutabilă este expresia `2 + 3` care se reduce la 5
```

Valoarea este obținută prin evaluare mai înainte ca funcția să se execute. Abia după această etapă, funcția anonimă și autoexecutabilă se aplică valorii primite ca argument.
Acum începe executarea funcției pe argumentul al cărui valoare rezultată în urma evaluării este `5`. Următorul pas este generarea unui mediu lexical nou pentru funcție în care valoarea `5` este *legată* de identificatorul cu rol de parametru denumit `x`. La final, valoarea identificatorului `x` aflat acum în scope-ul intern funcției (**mediul lexical**), este returnată.

```javascript
// #1 Folosirea unei funcții anonime autoexecutabile
((diametru) => diametru * 3.1415)(2); // 6.283
// #2 Cu atribuirea unui identificator funcției anonime
let circumferinta = (diametru) => diametru * 3.1415; circumferinta(2);
/* 6.283, adică Tau (curios? vezi The Tau Manifesto) */
// #3 Sintaxă convențională cu `function () {}` în paranteze rotunde, transformându-se astfel în autoexecutabilă datorită efectului `()`
(function (diametru) { return diametru * 3.1415; })(2);
```

Mai jos este dat un exemplu care întărește afirmația: **o funcție este o rutină aplicată pe argumentele sale**. Exemplul se bazează pe funcționalitatea metodei `apply()` oferită prin moștenire din obiectul prototip al obiectului intern `Function`. (`Function.prototype.apply()`).

```javascript
function oFunctie (x, y, z) {
  // transformă obiectul arguments într-un array
  console.log([].slice.call(arguments)); // Array [ 0, 1, 2 ]
  console.log(...arguments); // 0 1 2
};
let argumentele = [0, 1, 2];
oFunctie.apply(null, argumentele); // literalmente, argumentele sunt aplicate funcției (vezi efectele lui .apply()).
```

Acest exemplu ilustrează în adâncime ceea ce se petrece cu argumentele unei funcții. Am folosit soluția practică `Array.prototype.slice.call(arguments)` pentru a transforma obiectul `arguments` într-un array. Trebuie menționat faptul că `arguments` este un obect care seamănă cu un array, dar nu este. Din acest motiv, este nevoie să-l transformi într-unul, dacă dorești să prelucrezi valorile sale fără a lucra direct cu valorile pasate prin argumente. Începând cu ECMAScript 2015 (**ES6**), unui parametru îi poți atribui direct o valoare din oficiu la momentul definirii:

```javascript
function facCeva(a, b = "o valoare"){
  return b;
};
facCeva(); // "o valoare"
```

Fiecare valoare primită va fi introdusă și atribuită parametrilor în ordinea în care aceștia au fost precizați (umul după altul separați prin virgulă).

La invocarea unei funcții se formează legătura la `this`, un obiect care este contextul de execuție al acesteia. În același momentu este creat și `arguments`, care este un obiect în care găsești toate valorile argumentellor pasate. Obiectul `arguments` seamănă cu array-urile prin faptul că pot fi accesate valorile în mod similar, dar nu este un array. Adu-ți mereu aminte că o funcție nu se execută în gol. Are un context, care este un obiect ce furnizează valorile la care se leagă o parte din identificatorii din **mediul lexical**. Acest obiect care se formează ad-hoc la momentul execuției poartă numele de `this`.

```javascript
(function adunare () {
  let cumulator = 0, i;
  for(i = 0; i < arguments.length; i++){
    cumulator += arguments[i];
  };
  return cumulator;
})(2, 3); // 5
```

## Natura obiectului arguments

Este un obiect disponibil funcției la momentul execuției. Acesta permite accesul la toți parametrii. Atunci când pasăm unei funcții același număr de argumente câți parametri sunt, lucrurile sunt foarte clare. Ce te faci atunci când sunt pasate mult mai multe argumente? Trebuie să fie o structură capabilă să înmagazineze surplusul. Pentru funcțiile *variadice*, această structură este obiectul `arguments`.

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

Unui obiect `arguments` i se pot seta proprietăți: `arguments[3] = 'trei'` în caz că acest lucru este necesar. Așa cum menționam, ceea ce faci cu bună știință este să modifici valoarea existentă. Această practică se poate dovedi motivul unor funcționări defectuoase a codului și ar trebui evitată.

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

## Efectul rulării sub "use strict"

Pentru că un parametru poate fi modificat (valoarea acestuia), obiectul `arguments` este și el actualizat. Avem acest comportament când evaluarea se face fără regula `"use strict";`. Folosind `"use strict"`, ai garanția că valorile inițiale din `arguments` rămân neschimbate.

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

În cazul în care ai dori să modifici datele primite prin argumente în interiorul funcției, atunci când codul rulează sub regula `"use strict"`, nu este posibil.

```javascript
function test1 (x, y) {
  arguments[0] = 10;
  return x + y;
};
function test2 (x, y) {
  "use strict";
  arguments[0] = 10;
  return x + y;
};
console.log(test1(1,1)); // 11
console.log(test2(1,1)); // 2
```

## Transformă arguments în array

De multe ori apare necesitatea de a transforma `arguments` într-un array. Pentru acest lucru, practica de acum câțiva ani în urmă folosea metoda `slice()` invocată în contextul obiectului `arguments`. Aceasta este o practică de dinaintea actualizării standardului la ES5.

```javascript
function convertireArgs (a, b) {
  let arr1 = Array.prototype.slice.call(arguments);
  console.log(arr1);
  // sau
  let arr2 = [].slice.call(arguments);
  console.log(arr2);
  // mai nou se poate folosi și Array.from()
  let arr3 = Array.from(arguments);
  console.log(arr3);
  // dar și spread operator
  let arr4 = [...arguments];
  console.log();
}; convertireArgs(10, 11);
```

Uneori era nevoie să trimiți obiectul argumentelor altei funcții pe care o apelai din cea care primea datele în `arguments`.

```javascript
function convertireArgs (a, b) {
  let arr = Array.prototype.slice.call(arguments);
  preiaSiPrelucreaza.apply(null, arr);
};
```

Fă o vizită operatorului `...` (rest / spread) pentru mai multe exemple și lucruri potențial foarte utile pentru a înțelege simplitatea oferită prin abstractizarea pe care ES6 a introdus-o cu astfel de sintaxă.

În acest moment, pentru a obține un array din obiectul `arguments` se poate folosi confortabil metoda `from` precum în `Array.from(arguments)`.

## Numărul argumentelor

Acest lucru este posibil pentru că `arguments` este *array-like* și astfel, oferă o proprietate `length` pe care orice array o oferă.

```javascript
function cateSunt () {
  return arguments['length'];
};
cateSunt(1); // 1
cateSunt(23, 10, 5, 'aha'); // 4
```

### Numărul la invocare vs. la declarare

Argumentele pasate unei funcții la momentul invocării trebuie să se potrivească numărului de parametri specificați în declarația funcției și în acceași ordine.
Sunt cazuri în care numărul argumentelor este mai mare decât cel al parametrilor menționați, precum și cazuri în care numărul argumentelor este mai mic decât cel al parametrilor. Trebuie reținut faptul că JavaScript nu va da vreo eroare atunci când sunt diferențe.

### Argumente care variază ca număr

Până la standardul ECMAScript 2015 (ES6), JavaScript nu permitea colectarea unui număr variabil de argumente într-un singur parametru. Asta înseamnă că uneori ai nevoie să pasezi unei funcții mai multe valori printr-un singur argument. Pentru a face acest lucru, se apela la un truc care exploata argumentul pasat automat lui `arguments`. Dar acest truc depinde de tratarea obiectului `arguments` ca un array, fiind necesară transformarea lui în array. În următorul exemplu, vom *fixa* primul parametru, iar restul, le vom captura într-un array creat prin metoda mai veche de aplicarea a metodei `slice()` pentru a realiza transformarea automată într-un array și *decuparea* celor necesari.

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

După cum se observă, este cazul în care ai mai multe argumente decât parametri. Valorile *în plus* nu vor fi atribuite identificatorilor parametrilor deja menționați. Acestea vor putea fi regăsite în `arguments`.

### Mai puține argumente decât parametri

Valorile corespondente vor fi atribuite, iar parametrii care nu au valori, vor fi setați la `undefined`.

## Valoare din oficiu pentru un argument

În anumite cazuri este nevoie de a inițializa un parametru cu o anumită valoare prestabilită și nu cu `undefined` așa cum este comportamentul standard al limbajului.

Până la versiunea ES6 a lui ECMAScript, mai întâi se verifica în funcție dacă un anumit parametru este `undefined`. Dacă da, se inițializa cu o valoare. Acest lucru este posibil, dacă ne readucem aminte faptul că și parametrii sunt identificatori în scope-ul funcției (*lexical environment*).

```javascript
let test = function (ceva) {
  return ceva || 'Valoare din oficiu';
};
console.log(test('CEVA')); // CEVA
console.log(test());       // Valoare din oficiu

// Sau se mai proceda astfel:
function faCeva (a, b) {
  if (typeof b === 'undefined') { b = 5 };
  return a * b;
};
faCeva(1);

// o altă alternativă mai era următoarea:
function faCeva (a, b) {
  b = (typeof b !== 'undefined') ? b : 10; // folosește un ternar
  return a * b;
};
faCeva(12);
```

Acesta este un șablon de lucru foarte important care permite utilizarea de valori prestabilite atunci când nimic nu este pasat funcției. Acest mic șablon se schimbă odată cu folosirea ES6, când vei putea seta valoarea din oficiu chiar la pasarea argumentelor:

```javascript
function test (ceva = "Valoare din oficiu") {
  return ceva;
};
test();
```

## Valori din oficiu opționale

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

Pentru cei care vor să fie ultracorecți, idiomul de setare a unei valori din oficiu ar trebui să fie acesta: `inaltime = inaltime !== undefined ? x : 100`.

```javascript
function x (a) {
  a = typeof a === 'undefined' ? 100 : a;
  // cod
};
```

Folosirea lui `typeof` returnează tipul valorii. Dacă un parametru nu primește argument, `undefined` este atribuit automat de motor. Odată detectată valoarea `undefined` se poate seta o nouă valoare din oficiu pentru parametru.

În acest mod poți pasa și valori care s-ar reduce la falsitate (*falsey*), așa cum sunt `0`, `undefined` sau `null`. Mai este o posibilitate care se reduce la testarea tipului valorii pasate pentru a determina valoarea din oficiu (*default* îi spun englezii) în funcție de rezultat. În exemplul de mai sus, pentru ultima valoare, care este una validă pentru `timpCoacere` (`0`), motorul a redus-o la *falsey*, alegând valoarea din oficiu.

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

În exemplul oferit mai sus, această verificare a existenței unei valori este des întâlnită în practica de zi cu zi conform versiunilor mai noi ale standardului limbajului nostru. Poate fi considerat idiomul preferat pentru valori din oficiu. Acesta reflectă o manieră imperativă în ceea ce privește setarea valorilor *default*.

ES6 permite introducerea valorilor din oficiu direct în zona argumentelor transformând un obicei imperativ într-o abordare declarativă chiar din zona argumentelor. Atenție, sunt permise numai expresii, nu instrucțiuni.

```javascript
function masoaraTimp (timpCoacere = 85000, rasuceste = function () { alert('') }) {
  // cod funcție
};
```

În cazul parametrilor cu valori din oficiu, obiectul `arguments` are comportamentul rulării conform ES5 cu `"use strict";`. Când motorul *vede* parametri cu valori din oficiu, pur și simplu aplică comportamentul de izolare asupra obiectului `arguments`. Acesta va rămâne insensibil la valorile din oficiu păstrând valoarea `undefined`.

```javascript
function demoArgs (unu, doi = 2) {
  console.log(`valoarea lui doi este ${doi}, iar arguments[1] este ${arguments[1]}`); // valoarea lui doi este 2, iar arguments[1] este undefined
  console.log(doi === arguments[1]); // false
  doi = 10;
  console.log(`valoarea lui doi este ${doi}, iar arguments[1] este ${arguments[1]}`); // valoarea lui doi este 10, iar arguments[1] este undefined
  console.log(doi == arguments[1]); // false
  console.log(arguments[0]); // 1000
};
demoArgs(1000);
```

În acest moment `arguments[1]` va fi `undefined`, ceea ce este și firesc pentru că doar un singur argument a fost pasat.

Reține faptul că `arguments` reflectă starea inițială și că trebuie să fie numai valori primitive, chiar dacă acestea sunt rezultatul evaluării unei alte funcții (care este o expresie). Funcția trebuie invocată. Nu pasezi o referință către aceasta.

```javascript
function doi () { 
    return 2;
};
function demoArgs (unu, x = doi) {
    return unu + x();
};
demoArgs(1); // 3
```

Mai există un lucru care trebuie reținut în cazul pasării unei funcții drept valoare din oficiu unui parametru. Aceasta nu va fi invocată înainte de a fi evaluat corpul funcției în sine. Pe scurt, expresia de funcție nu este evaluată până în momentul în care chiar este nevoie de valoarea la care se reduce prin evaluarea codului din corpul său. Efectul realizat este emiterea unei erori în cazul în care funcția chiar are nevoie să primească o valoare la parametru.

```javascript
function atentionare () {
  throw "Prietene, pasează o valoare parametrului";
};
function faCeva ( a = atentionare() ) {
  console.log(a);
};
faCeva(); // Error: Prietene, pasează o valoare parametrului
faCeva('ceva'); // "ceva"
```

## Operatorul *spread* pe argumente

Am văzut deja mai sus metoda prin care putem transforma `arguments` într-un array, dar există și alte metode pentru a gestiona argumentele pasate unei funcții, dar și parametrii. Noua sintaxă ES6 a introdus operatorul (trei puncte), care în funcție de cazul de utilizare, poate **colecta** într-un array argumentele care nu au fost asociate cu un parametru sau la invocarea unei funcții.

```javascript
function operatiune (...argumente) {
  console.log(argumente.length);
};
operatiune(23, 145, 83); // 3
```

Operatorul trei puncte în ipostaza invocării unei funcții va **desface** un array și fiecare valoare a acelui array va fi un argument trimis funcției. Această nouă modalitate se numește `rest parameters`.

```javascript
function oFunctie (x, y, z) {
  console.log([].slice.call(arguments));
};
let argumente = [4, 5, 6];
oFunctie(...argumente); // Array [ 4, 5, 6 ]
```

Hai să vedem un exemplu similar cu efectele operatorului trei puncte în posturi diferite:

```javascript
// adunarea într-un array a argumentelor neasociate parametrilor
function facCeva (x, y, ...z) {}; // STRANGE restul argumentelor
// spargerea unui array în argumentele necesare unei functii
let colectie = [2, 4, 10];
prelucrezNr(...colectie); // DESFACE un array în valori pentru tot atâtea argumente
```

## Aplicarea parțială

Aplicarea parțială este procesul de aplicare a unei funcții doar pe o parte a argumentelor. Funcția este returnată pentru a fi folosită ulterior. Pe scurt, o funcție ia o funcție cu parametri multipli și returnează o funcție cu mai puțini parametri.

```javascript
const prima = (functie, arg) => function (...set) {
  return functie.call(this, arg, ...set);
};
const combinaArgs = (a, b) => `am combinat ${a} cu ${b}`;
const finalizare = prima(combinaArgs, ['ping', 'echo']);
finalizare('pong'); // "am combinat ping,echo cu pong"
```

În exemplu, avem `prima` care este o funcție **fat arrow**. Această funcție primește două argumente:

- o altă funcție și
- valoarea unui argument

Funcția `prima` returnează o funcție. Funcția returnată primește un set pe care-l **desface**, în engleză *spread*. Ce se petrece este crearea a doi identificatori la apelarea funcției pasată la primul argument. La rândul ei, această funcție returnată va calcula rezultatul aplicării sale pe al doilea argument trimis funcției gazdă (în cazul nostru un array).

## Argumente ca modificatori

ES6 permite introducerea unui obiect cu proprietăți având valori din oficiu. Acestea pot fi modificate prin argumentele funcției. Putem observa eleganța pe care *destructurarea* o oferă.

```javascript
function faCeva ({prim = 1, secund = 2, tert = 3} = {}) {
  console.log(prim, secund, tert);
  console.log(...arguments);
}; // 1 2 3
faCeva({secund: 'ceva'}); // 1 ceva 3
faCeva(10); // 1 2 3
faCeva({tert: true}, 10); // 1 2 true
faCeva({secund: 'ceva', tert: true});
faCeva({secund: 'doi', tert: false, prim: 9});
```

Oricare alt argument pasat poate fi găsit în `arguments` dacă se dorește. Și în cazul obiectelor, trebuie să se respecte identificatorii proprietăților, dacă valorile acestora sunt dorite ca parametri. Alte proprietăți vor fi regăsite în `arguments`.

Mai este ceva interesant care merită evidențiat. La momentul presetării valorilor prin `{prim = 1, secund} = {}`, dacă o proprietate a obiectului pasat drept argument are aceeași valoare literală cu a parametrului, nu mai este necesară atribuirea. Pur și simplu scrii doar cheia.

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

Mai observăm un lucru foarte important: parametrii pot fi introduși în oricare ordine. Nu mai suntem limitați de *poziție*, precum în cazul standardelor până la ES5. Vă reamintesc că înainte de ES5 trebuia să introduci argumentele în ordine fixă pentru a se face legăturile corecte în obiectul `arguments`. Parametrii pot servi valori următorilor, dacă este nevoie.

```javascript
function demoArgs (unu, doi = unu + 1) {
  console.log(doi);
};
demoArgs(10); // 11
```

Mai mult, chiar poți pasa un parametru anterior ca argument în evaluarea unei funcții ce va returna o valoare pentru un altul care-i urmează. Este exact ceea ce ai face în interiorul funcției cu diferența că o faci în zona argumentelor. Atenție, nu poți folosi un parametru înainte ca acesta să fi fost inițializat. Este același caz ca și pentru `let`. Fii atent!

## Evaluarea parametrilor la momentul invocării

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

Pe măsură ce parametrii sunt evaluați, aceștia se fac disponibili celor evaluați ulterior:

```javascript
function exemplu (una, alta = una + 2, cateva = alta + ' mere') {
  return [ alta, cateva ];
};
exemplu(2); // Array [ 4, "4 mere" ]
```

## Parametrii rest și destructurarea obiectelor

Folosirea operatorului `...` generează un array adevărat, nu un *array-like* așa cum este `arguments`. Parametrii rest generează o colecție a tuturor argumentelor care nu au primit identificatori. Totuși `arguments` îi conține pe toți.
Intenția introducerii prin ES6 a **parametrilor rest**, a fost aceea de a înlocui `arguments`. Motivul a fost necesitatea de a putea introduce un număr nelimitat de argumente.

Sintaxa este reprezentată prin operatorul `...` urmat de un identificator. Regula privind *rest parameters* este că identificatorul precedat de operatorul rest, trebuie să fie ultimul parametru introdus în header-ul funcției.
Înainte de ES6, singura metodă de a transforma `arguments` într-un array era prin folosirea unui artificiu des întâlnit. Să ni-l reamintim.

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

### Cazul unui array

Putem pasa unei funcții toate argumentele folosind un array, dar felul în care vor fi preluate și asociate unor parametri poate fi modelat prin destructurare. Putem imagina cazul în care ai nevoie ca primul argument să fie asociat unui parametru.

```javascript
function facCeva ([x, ...restulArgumentelor] = []) {
  return ++x;
};
facCeva([1, 2]);
```

Ceea ce tocmai am transmis motorului JavaScript este că va face o atribuire a parametrilor cu valori, iar pentru parametri, este dat un array în care vor fi introduși toți identificatorii pentru aceștia. Destructurarea va **desface** primul array și pentru fiecare valoare din acesta, va atribui o valoare din cel de-al doilea. În cazul nostru, pentru că am menționat numele primului identificator, acesta va primi valoarea 1 și așa va intra în mediul lexical al funcției. Valoarea 2 intră în `arguments` pentru că nu a fost precizat un alt identificator. Acest lucru este îndeplinit prin operatorul trei puncte (*rest parameter*). Acest lucru ar fi putut să fie obținut prin atribuirea manuală a parametrilor.

```javascript
function facCeva (arrayValori) {
  var x = arrayValori[0];
};
```

Destructurarea array-urilor este un instrument foarte puternic atunci când valorile array-ului sunt funcții. În acest caz, putem executa funcțiile din array de la stânga la dreapta cu particularitatea foarte utilă că rezultatul uneia devine datele de input ale celei care urmează. Putem realiza astfel adevărate fluxuri de prelucrare a datelor. O experiență similară este cea a utilizării simbolului pipe în cazul comenzilor în sistemele Unix/Linux. pentru a realiza acest model, ne vom ajuta de metoda `reduce()` disponibilă din oficiu pentru orice obiect de tip array.

```javascript
  function pipe (...functiile) {
      return function (valoare) {
          return functiile.reduce((valoareaCurenta, fn) => {
              return fn(valoareaCurenta);
          }, valoare);
      };
  };
  function a (valoare = 2) {
    return valoare*2 ;
  };
  function b (valoare) {
      return ++valoare;
  }
  let final = pipe(a, b)();
  console.log(final);
```

O astfel de abordare ce vizează includerea într-un flux de prelucrare a funcțiilor, îndeamnă la extinderea cazurilor și astfel realizarea unor beneficii pe care combinarea cu destructurarea le oferă. În articolul [Elegant patterns in modern JavaScript: RORO](https://www.freecodecamp.org/news/elegant-patterns-in-modern-javascript-roro-be01e7669cbd/) a lui Bill Sourour din februarie 2018 avem explicate aceste beneficii într-un exemplu care vizează crearea unui flux de prelucrare a datelor unui utilizator. Vom folosi funcția cu rol de pipe pentru a compune execuțiile unor funcții pentru fiecare etapă. Această propunere își are originile în explicațiile lui Eric Elliot.

```javascript
// mai întâi construim o funcție care validează un argument pe care dorim să-l verificăm că există
function requiredParam (param) {  
    const requiredParamError = new Error(`Required parameter, "${param}" is missing.`);
    // păstrăm stack trace-ul original  
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(requiredParamError, requiredParam);  
    }
    throw requiredParamError;
};
// apoi o funcție ipotetică care va căuta într-o bază de date un utilizator returnat ca obiect
// dacă se dorește setarea unor valori de inițializare pentru obiect, putem aplica o destructurare pe un obiect gol
function findUsersByRole({role = requiredParam('role'), withContactInfo: true, includeInactive: true} = {}) {
    role = role.toLowerCase();
};
```

În exemplul de mai sus, dacă se va apela funcția `findUsersByRole` fiindu-i pasat un obiect care nu are o proprietate numită `role`, vom avea drept rezultat o eroare prin care acest lucru este solicitat.

Bill Sourour oferă și un exemplu de compunere care vine să contureze toate explicațiile anterioare.

```javascript
// operațiune de validare a unui utilizator
function validate({  id, firstName, lastName, email = requiredParam(), username = requiredParam(), pass = requiredParam(), address, ...rest}) {  
    // aici sunt operațiunile de validare 
    return {id, firstName, lastName, email, username, pass, address, ...rest};
};
// normalizare date
function normalize({ email, username, ...rest}) {
    // normalizează datele aici și returnează obiectul actualizat
    return {email, username, ...rest};
};
// salvează datele în DB
async function persist({upsert = true,...info}) {
    // operațiunile de salvare în baza de date
    return {operation, status, saved: info}
};

// creează pipe-ul care tratează datele 
function saveUser(userInfo) { 
    return pipe( validate, normalize, persist )(userInfo);
};
```

Avantajul este că vor fi folosite doar datele de care este nevoie a fiecărui obiect pasat care este destructurat la nivelul argumentelor fiecărei funcții care este introdusă în fluxul de prelucrare. Apoi obiectul este returnat și folosit la următorul pas, până la parcurgerea tuturor etapelor dorite. Destructurarea ajută la extragerea doar a proprietăților necesare, lăsând restul obiectului neatins. Totuși, în cazul proprietăților array sau obiect, acestea or fi modificate, pentru că, până la urmă, lucrăm cu un *shallow copy*.

### Cazul obiectelor

Obiectele pot fi destructurate cu efecte foarte importante în economia rulării codului unei funcții.

```javascript
function facCeva ({a, b} = {}) {
  console.log(a, b);
};
facCeva({a: 1, b: 2});
```

În cazul obiectelor trebuie să fim atenți ca numele cheilor obiectului ce va fi destructurat (`{a: 1, b: 2}`) să fie identice cu cel al obiectului parametrilor (`{a, b} = {}`).

```javascript
function test ({a, b}) {
  return `${a} și ${b}`;
};
var obi = {
  a: 10, 
  b: true
};
test(obi); //"10 și true"
```

Spre deosebire de cazul array-urilor, utilizarea unui obiect în cazul destructurării are avantajul introducerii în obiectul parametrilor a cheilor în ordinea dorită câta vreme păstrăm convenția de echivalență a numelor cheilor. Acesta este un avantaj major față de atenția pe care trebuia să o acordăm ordinii introducerii argumentelor în scenariile clasice care nu implică destructurarea.

Un alt mare avantaj este faptul că prin destructurare se creează un set nou de identificatori în mediul lexical al funcției fapt care evită modificarea obiectului original pasat spre destructurare. Această tehnică nu va *modifica* obiectul original atunci când modificăm valorile la momentul execuției funcției. Reține faptul că acest avantaj se menține doar pentru valori scalare ale obiectului destructurat. Modificarea stării obiectului original apare totuși în cazul în care obiectul pasat este complex având drept valori array-uri și/sau obiecte. Copia pe care o realizăm, de fapt este o copie a referințelor pentru aceste proprietăți non-scalare (*shallow copy*).

Dacă trimitem unei funcții un argument care are drept valoare un obiect, putem constitui un alt obiect sub forma unui subset pe care să-l returnăm.

```javascript
var vehicul = {
  nume: 'Tesla S',
  masa: 1200,
  autonomie: 250
};

function peAlese (obi) {
  let transformat = {};

  for (let x = 1, lungime = arguments.length; x < lungime; x++ ) {
    transformat[arguments[x]] = obi[arguments[x]];
  }; // pornești de la index pentru că la 0 este chiar obiectul

  return transformat;
};

let masina = peAlese(vehicul, 'nume', 'autonomie');
console.log(masina); // Object { nume: "Tesla S", autonomie: 250 }

// și varianta folosind rest parameters
function peAlese(obi, ...chei){
  var transformat = {};

  for (let x = 0, lungime = chei.length; x < lungime; x++){
    transformat[chei[x]] = obi[chei[x]];
  };

  return transformat;
}; // chei conține toți parametrii de după primul.
```

Revenind la posibilitatea de a introduce valori din oficiu, în cazul destructurării obiectelor, acest lucru este posibil.

```javascript
try {
    function testDestructValOficiu ({a = 10, b, c = true, d}) {
        if (d == null) throw `Obiectul pasat trebuie să aibă o proprietate d`
        return `Valorile destructurate sunt ${a}, ${b}, ${c} și ${d}`;
    };
    testDestructValOficiu({b: 1000, d: 'ceva'}); // 'Valorile destructurate sunt 10, 1000, true și ceva'
    testDestructValOficiu({b: 1000}); // Obiectul pasat trebuie să aibă o proprietate d
} catch (error) {
    console.error(error);
}
```

Anterior spuneam că putem pasa invocarea unei funcții drept parametru din oficiu. Acesta se poate dovedi ca un mecanism de alarmare în cazul în care nu există o anumită valoare la invocare. Vom prelua exemplul și îl vom adapta pentru obiecte pasate pentru destructurare.

```javascript
function atentionare () {
  throw "Prietene, pasează o valoare parametrului";
};
function faCeva ( {a = atentionare(), b = 'din oficiu'} = {}) {
  console.log(a);
};
faCeva(); // Error: Prietene, pasează o valoare parametrului
faCeva({a: 'ceva'}); // "ceva"
```

## Mantre

- Valoarea parametrilor unei funcții este din start `undefined`.
- Evaluarea parametrilor se face la momentul invocării funcției.
- Argumentele pasate funcțiilor pot avea echivalență în numărul parametrilor declarați sau nu.
- O funcție are o proprietate `length`, care nu trebuie confundată cu proprietatea cu același nume a parametrului `arguments`. `nume_funcție.length` returnează câți parametri care au un nume au fost declarați.
- Obiectul `arguments` este actualizat în permanență când codul nu-i `strict` și poți modifica în interiorul funcției valoarea parametrilor.
- `arguments` are caracteristicile unui array, zicem că este array-like.
- Pentru o funcție poți vedea câți parametri au fost declarați (`nume_functie.length`) și câte argumente i-au fost pasate (`arguments.length`).

## Resurse

- [Elegant patterns in modern JavaScript: RORO | Bill Sourour | 2018](https://www.freecodecamp.org/news/elegant-patterns-in-modern-javascript-roro-be01e7669cbd/)
- [Reduce (Composing Software) | Eric Elliott | Mar 5, 2017](https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d)