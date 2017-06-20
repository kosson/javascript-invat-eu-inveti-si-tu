# `this`

În JavaScript, vorbim despre obiecte. Funcțiile sunt niște obiecte speciale în sensul că pot fi apelate, ceea ce conduce la executarea codului. Dar reține faptul că tot niște obiecte sunt. Și acum să ne gândim la o funcție ca la o persoană care privește bolta celestă într-o noapte înstelată. Cum ar putea povesti despre toate constelațiile văzute? Cum le-ar putea referenția printr-o singură expresie? Hai, nu e greu, am zis deja... da, da, ai remarcat perfect: **bolta cerească**! Persoana care întrupează o funcție privește **bolta cerească** ca identificator pentru contextul în care constelațiile strălucesc doar pentru ea. Așa este și cuvântul cu înțeles special `this`. Este legătura cu obiectul în al cărui context a fost invocată funcția, iar pentru funcția apelată care tocmai a creat un obiect, `this` este o proprietate pe care nu o poate modifica, dar prin care poate accesa proprietăți și metode ale obiectului în contextul căruia a fost apelată.

Pentru a avea un prim contact cu `this` poți încerca în consola browserului să scrii `this.window`. Va fi returnat chiar obiectul global `Window`. De ce s-a întâmplat acest lucru? Pentru că obiectul global ține o referință către sine. În cazul browserelor aceasta este `window`.

This este un obiect pasat automat unei funcții și care se formează în funcție de contextul de execuție. `this` este strict legat de „locul” în care a fost apelată, nu de „locul” unde a fost declarată.

**Spune standardul**:
`this` se leagă de evaluarea codului, adică la momentul evaluării codului `this` este rezultatul operațiunii abstracte `ResolveThisBinging()`. Se leagă strâns de Lexical Environment pentru `contextul de execuție curent` - `current execution context`.

## Mantre

TODO: sortează mantrele la this

- Prin `this`, de fapt accesezi starea obiectului cu care lucrezi.
- Legătura la obiectul reprezentat de cuvântul cheie `this` se realizează la momentul execuției codului, nu la momentul scrierii lui.
- **this** este o referință către contextul de execuție curent în timp ce funcția se execută.
- `this` nu se referă în niciun caz la **lexical scope**.
- `this` este un binding pentru fiecare invocare a unei funcții care se bazează pe de-antregul pe call-site.
- Funcțiile și obiectele sunt REFERENȚIATE, nu sunt deținute atunci când atribui IDENTIFICATORUL într-o expresie sau ca valoarea a unei metode.
- Call-site (locul din cod unde este apelată o funcție) determină formarea lui `this`.
- Modul de invocare influiențează felul în care obiectul este constituit (către care face referință `this`).
- Toate funcțiile au la dispoziția lor un set de utilități preexistent, care poate fi apelat prin `[[Prototype]]`. Cele mai evidente sunt `call()` și `apply()`.
- Atunci când există un obiect-context (folosit de o funcție prin apelare cu `apply()` sau `call()`), regula de bază a binding-ului spune că obiectul-context va fi cel la care se face bindingul `this`.
- În contextul de execuție tot ce este cu `this.ceva` devine membru al obiectului generat.
  - Bindingul primar se face la obiectul global.
- Bindingul implicit se face la contextul de execuție al unei funcții sau al unei metode.
- o funcție poate fi invocată în patru moduri: (1) ca funcție (this e window); (2) ca metodă (this e obiectul); (3) ca și constructor (this e obiectul abia construit); (4) cu `apply()` și `call()` (this e primul obiect introdus).
- `this` este cuvânt cheie rezervat.
- `this` este o referință la obiectul care se creează în funcție de contextul de execuție.
- `this` este o referință către un obiect-context: pentru funcțiile din global scope este `window`, pentru metode este obiectul în care se execută iar pentru noile obiecte create este chiar noul obiect generat.
- în interiorul unui obiect, apelezi metodele folosind `this`, pentru că este o referință către proprietățile și metodele interne.
- dacă o funcție a fost invocată în interiorul altei funcții sau a unui obiect, atunci `this` este o referință către obiectul în contextul în care a fost invocată. Pentru a înțelege, adu-ți aminte faptul că o funcție este un obiect, de fapt, dar nu uita că primește `this` automat, nu-l formează. Doar obiectele formează `this`.
- Referința `this` va fi folosită pe durata execuției funcției.
- în cazul funcțiilor`this` nu este o referință către funcția în sine. Reține faptul că unei funcții îi sunt pasate tacit `this` și `arguments`.
- `this` NU ESTE O REFERINȚĂ CĂTRE SCOPE-ul LEXICAL AL FUNCȚIEI.

Legătura (binding-ul) la `this` DEPINDE DE OBIECTUL specificat la call-site.

```javascript
function faCeva (){
  console.log(this);      // Răspunde cu obiectul context Object { actiune: faCeva() }
  console.log(this.ceva); // răspunde cu undefined pentru că obiectul context nu are o proprietatea ceva
};

var obj = {
  faCeva: faCeva
};

// ES6, dacă ai denumit cheia metodei la fel cu numele funcției,
// se poate menționa simplu numele
var obj = {
  faCeva
};

obj.faCeva(); // this este chiar obiectul menționat la stânga metodei
```

Folosit pentru a lua un obiect și pentru a-i îmbogăți și/sau prelucra valorile membrilor după care poate fi returnat și folosit mai departe.

## Dependințe cognitive

- scope
- funcții
- arguments
- call-site
- constructori
- Function.prototype.apply()
- Function.prototype.bind()
- Function.prototype.call()

## Mică anatomie pentru `this`

Cazul funcțiilor simple. Ceea ce se va observa rapid este faptul că în cazul folosirii lui var pentru declarații, obiectul `this` va fi însuși obiectul global. Am introdus cazul funcțiilor simple pentru că au, de fapt un context de execuție, acesta fiind obiectul global a cărui proprietăți pot fi accesate prin legătura pe care o face obiectul this.

```javascript
var x = 10;
function container (){
  var x = 1000;
  this.y = function interna(){
    var x = 10000;
    console.log(this.x);
  };
  this.z = function interna2(){
    var x = 10001;
    console.log(this.x);
  };
  console.log(this);              // Window
  console.log(this.x);            // 10 pentru că var a creat automat o prop. în global
  console.log(this.y);            // function interna()
  console.log(this.z);            // function interna2()
  console.log(typeof this);       // object
  console.log(this.constructor);  // function ()
  console.log(this.__proto__);    // Window
  this.y();                       // 10
  this.z();                       // 10
}; container();
```

Un lucru interesant este că poți folosi `this` pentru a testa instanțierea unui constructor cu ajutorul lui `instanceOf`. Dincolo de faptul că poți face acest lucru, de fapt ceea se observă este faptul că `this` este un obiect.

Cazul folosirii declarării variabilelor cu `let`. Valoarea lui x nu poate fi accesată din scope-ul funcției pentru că este declarată în global scope.

```javascript
let x = 10;
function container (){
  let x = 1000;
  this.y = function interna(){
    let x = 10000;
    console.log(this);  // este Window
    console.log(x);     // 10000
    console.log(this.x);// undefined pentru că în global let nu creeaza proprietati
  };
  console.log(x);       // 1000
  console.log(this);    // Window
  console.log(this.x);  // undefined
  console.log(this.y);  // function interna()
  this.y();             // 10000 și undefined
}; container();
```

Evaluările se soldează cu `undefined` pentru cazul global scope pentru că `let` și `const` sunt blocked scoped. Spre deosebire de `var`, `let` nu creează o proprietate nouă în global scope.

## Cazurile lui `this`

În cazul obiectelor, atunci când apelezi o funcție (care joacă rolul de metodă), folosind `.` sau `[]`, vei avea un obiect drept context, altfel, vei avea global environment.

Un exemplu pentru cazul în care o funcție este metoda unui obiect:

```javascript
var obiect = {
  getThis: function(){
    return this;
  }
};

obiect.getThis() === obiect; // true
var cineEsteThis = obiect.getThis(); // este apelată o metodă
var doarOFunctieOarecare = obiect.getThis; // o referință către o funcție.
console.log(cineEsteThis); // Object { getThis: obiect.getThis() }
console.log(doarOFunctieOarecare); // function obiect.getThis()
console.log(doarOFunctieOarecare()); // Window → about:newtab
var functiaLegata = obiect.getThis.bind(obiect); // reatasarea funcției ca metodă
console.log(functiaLegata()); // Object { getThis: obiect.getThis() }
```

Ceea ce remarcă este că invocarea funcției ca metodă a obiectului conduce la executarea acesteia în contextul obiectului, iar atunci când se face o referință, ceea ce se întâmplă este că funcția pierde rolul de metodă și odată cu acest fapt și legătura la `this` al obiectului în favoarea celui global.

### Cazul lui `this` pentru un constructor

```javascript
var Dorel = function dorel(){
  this.nume = "Dorel";
  this.ego = function ego(){
    console.log(`Sunt constructorul ${this.nume}`);
  };
  setInterval(this.ego(), 5000);
};
Dorel();
// Sunt constructorul Dorel (afișat o singură dată)
```

#### `setInterval(this.ego(), 1000);` - pierderea contextului de execuție prin încheierea execuției în sine.

Efectul execuției:
* Mesajul este afișat o singură dată,
* this este obiectul global care este pasat la execuția funcției Dorel() și se va îmbogăți automat cu `nume` (`window.nume`) și `ego` (`window.ego`)
* `window` va sta îmbogățit cât timp funcția este executată.
* După execuție, va fi afișat `undefined` pentru că funcția și-a terminat execuția, contextul de execuție a dispărut, valorile lui `nume` și cea rezultată din evaluarea lui `ego` au fost ***colectate la gunoi*** (garbage collected) iar `this`, care, de fapt era `window` revine la forma anterioară.

Explicație:

Mesajul va fi afișat o singură dată pentru că funcția `ego` este invocată ca metodă: `this.ego()` a obiectului Dorel. Imediat ce execuția funcției Dorel() s-a încheiat, contextul creat de funcția Dorel a și dispărut.
Acest lucru se întâmplă pentru că `setInterval()` interpretează `this.ego` ca referință către o funcție pe care o și execută în contextul obiectului global. Vezi că obiectul global a fost îmbogățit și cu proprietatea nume. Drept dovadă, se pot apela direct `window.nume` și se poate executa `this.ego()`.

REȚINE: **`this` al unui callback indică întotdeauna către obiectul global. Pentru a fixa `this` la funcția gazdă se va folosi `call()`, `apply()` sau `bind()`**.

#### `setInterval(function(){this.ego()}, 1000);` - menținerea legăturii la contextul de execuție corect

```javascript
var Dorel = function dorel(){
  this.nume = "Dorel";
  this.ego = function ego(){
    console.log(`Sunt constructorul ${this.nume}`);
  };
  setInterval(function(){this.ego()}, 5000);
};
Dorel();
```

Explicație:

Împachetând apelul către metoda obiectului într-o funcție, ne asigurăm că nu pierdem legătura la `this`.
Acest lucru se întâmplă pentru că funcția setInterval nu a fost declarată în interiorul funcției noastre.
Noi doar îi setăm un nou context de execuție. În schimb, declarăm o funcție, ce-i drept, ca parametru și în acest mod ca valoare internă în scope-ul creat de funcția `dorel`.
La execuție, ceea ce se îmtâmplă este că împrumutăm funcționalitatea lui setInterval, dar contextul de execuție va fi setat la scope-ul și this-ul funcției dorel pentru care funcția callback face closure.
This-ul este chiar `window`, cel care a fost primit automat la invocarea lui dorel și care a fost îmbogățit deja cu proprietatea nume și metoda ego.

## Manifestarea legăturii la `this` în funcție de vecinătate

Atenție! Legătura la `this` se manifestă la cel mai apropiat membru al unui obiect la care se face referință:

```javascript
var token = 1000;

var obi = {
  token: 10
};

function faCeva(){
  console.log(this.token);
};

obi.faCeva = faCeva;

obi.adancit = {altceva: faCeva, token: 10000}; // deci, faCeva, va primi implicit this, care este obiectul (adancit) membru a lui obi

obi.faCeva();           // 10
faCeva();               // 1000, dacă ai token declarat în global.
obi.adancit.altceva();  // 10000
```

## `this` pe lanțul prototipal al obiectului

Dacă metoda este definită în lanțul prototipal al obiectului, `this` face referință către obiectul în care s-a invocat metoda ca și cum metoda ar face parte din obiect.

```javascript
var alfa = {
  primo: function(){
    return this.ceva + this.altceva;
  }
};
var beta = Object.create(alfa); // s-a făcut legătura prototipală la alfa
beta.ceva = 10;
beta.altceva = 10;

console.log(beta.primo()); // 20
```

## Regulile de binding - de generare a obiectului `this`

Douglas Crockford spune despre `this` că este un parametru bonus și mai spune un lucru la care trebuie să reflectăm: `this` este motivul pentru care avem mecanismul de moștenire.

Pe scurt cazurile în care se face legătura la `this` și cine este `this` pentru fiecare caz.

|Cazul de invocare a funcției|Cine este `this`|
|:-|:-|
|funcție simplă|obiectul global, iar în „strict” este „undefined”|
|metodă|obiectul pentru care funcția joacă rol de metodă|
|funcția este folosită ca și constructor|`this` este însuși obiectul returnat de invocarea cu `new`|
|folosirea cu `apply()`, `call()` și `bind()`|`this` este pur și simplu obiectul specificat în primul parametru.|

### 1. Binding primar

Bindingul primar se face la global object (Window).

Este prima regulă și este și cazul simplei invocării a funcției. Atunci când nicio altă regulă nu se aplică, aceasta se aplică din start. Funcționează dacă nu este rulat codul sub „use strict”.

```javascript
var test = 2;

function faceva(){
  console.log(this.test); // this.test rezolvă la variabila globală test
}

faceva(); // 2
```

### 2. Binding implicit sau *atașat*

Îi spun *atașat* pentru că binding-ul se face la obiectul în care este invocată funcția (call site), ca metodă.
Bindingul implicit constă într-o funcție pe care o „împrumuți” contextului unui obiect.

Regula: obiectul în contextul căruia se execută funcția ca metodă este folosit de către funcție pentru a face binding la `this`.

```javascript
var obiectLiteral = {
  ceva: 2,
  metoda: faceva
};

function faceva(){
  this.test = 1001; // introduce în obj test
  this.ceva = 50;   // modifica existent
  console.log( this.ceva ); // 50
}

obiectLiteral.metoda();
console.log(obiectLiteral.test); // 1001
console.log(obiectLiteral.ceva); // 50
```

Pentru că obiectLiteral este `this` pentru invocarea faceva(), atunci **this.ceva** este fix același lucru cu cu **obj.ceva**.

Următoarea secvență de cod este asemănătoare.

```javascript
var obiectLiteral = {
  proprietate: "ceva",
  metoda: function(){
    console.log(this.proprietate);
  }
};

obiectLiteral.metoda(); // ceva

var obiectLiteral2 = {
  proprietate: "altceva",
  metoda: obiectLiteral.metoda
}

obiectLiteral2.metoda(); // altceva

var proprietate = "valoarea proprietății obiectului global";  // prop. a obi. global
var metoda = obiectLiteral.metoda;                            // metodă a obi. global
metoda(); // => valoarea proprietății obi. global; echivalent cu window.metoda()
```

Bindingul implicit poate fi pierdut atunci când faci referință către metodă, când nu o și execuți. De fapt, nu faci referința către metodă, căci însăși metoda este o referință către funcția care joacă rol de metodă.

```javascript
var obiectStudiu = {
  ceva: 1001,
  metoda: function special(){
    console.log(this.ceva);
  }
};

var ceva = 2002;

var referinta = obiectStudiu.metoda; // e doar o referință, nu este valoarea funcției.

referinta(); // 2002  call-site pentru care se aplică regula 1 - binding primar.
```

Ceea ce s-a întâmplat, de fapt este că a fost „împrumutată” (invocată) funcția în contextul obiectului global. În acest caz se aplică regula bindingului primar. Dacă funcția nu ar fi fost numită, în call stack ar fi apărut cu numele referinței (obiectStudiu.metoda).

### 3. Binding explicit

`call()` și `apply()` sunt utilități disponibile prin `[[Prototype]]` tuturor funcțiilor, care sunt de fapt la rândul lor obiecte (funcțiile sunt obiecte `Function`, care moștenesc metodele din prototipul său).

Bindingul explicit se realizează prin intermediul lui call() și apply(). Ambele iau ca prim parametru un obiect care va fi folosit pentru `this` și apoi va invoca funcția cu acel `this` deja specificat. Pentru că este afirmat în mod direct unde dorești să fie this, numim aceasta binding explicit.

O chestie interesantă este că de vei pasa valoarea unei primitive simple de tip string, boolean sau number, atunci primitiva va fi „impachetată” în forma de obiect corespondentă (`new String(..)`, `new Boolean(..)`, or `new Number(..)`) și abia la acesta se va face binding-ul `this`. Acest lucru se numește "boxing".

#### Mecanismul oferit de apply() și call()

Ceea ce permite acest mecanism, de fapt este posibilitatea de a scrie o funcție cu rol de metodă, care să poată fi folosită în alt obiect fără a fi necesară rescrierea metodei pentru un nou obiect.

```javascript
var proprietate = "ceva din global"; // este proprietate a obiectului global

var obiectLiteral = {
  proprietate: "ceva"
};

var faceva = function maner(){
  console.log(this.proprietate);
}

faceva.call(obiectLiteral); // Spune: foloseste objectLiteral ca this. => ceva
faceva(); // => ceva din global
```

De fapt, `call()` schimbă contextul.
Dacă vrei să pasezi argumente funcției, acestea vor urma referința către noul context.

De exemplu:

```javascript
var obiect = {
  proprietate: 1000,
  metoda: function(unu, doi, trei){
    console.log(this.proprietate);
  }
}

var proprietate = 4000;

obiect.metoda(); // => 1000

obiect.metoda.call(window); // 4000

obiect.metoda.call(window, 1, 2, 3);
obiect.metoda.apply(window, [1,2,3]); //acelasi lucru ca si call numai ca paseaza params ca array
```

##### Pierderea bindingului

Chiar și când se face un binding explicit, se poate pierde bindingul la `this`. Soluția ar fi „îmbrăcarea” într-o funcție „gazdă”.

##### Restabilirea contextului

`apply()` și `call()` oferă posibilitatea de a specifica direct contextul dorit. O altă metodă este de a folosi arrow functions. Funcțiile săgeată - arrow function au drept caracteristică faptul că mențin legătura la `this` care exista la momentul definirii sale.
ATENȚIE! Dacă funcția arrow este definită într-un object literal, valoarea lui this pe care o referențiază arrow function este obiectul global `window`.

```javascript
var fix = 1000;
var faCeva = function(){
  console.log(this);
  console.log(this.fix);
};
var faAltceva = () => {
  console.log(this);
  console.log(this.fix);
};
var centru = {
  fix: 10,
  faCeva: faCeva,
  faAltceva: faAltceva
};

centru.faCeva();    // Object { fix: 10, faCeva: faCeva(), faAltceva: faAltceva() } // 10
centru.faAltceva(); // Window → about:newtab // 1000
```

## 4. Binding puternic (hard binding)

Este modul în care te asiguri întotdeauna că `this` este predictibil și nu alunecă în global scope.

```javascript
var a = 101;
function faCeva(){ console.log(this.a); };
var obi = { a: 1010 };
var gazda = function(){ faCeva.call(obi); };
gazda(); //1010
// functia gazda întărește legătura lui this la obi.
gazda.call(window); // 1010
```

Hardbinding `this` în obiectul care se dorește a fi contextul. Este un cuplaj forțat între o funcție care trebuie să ruleze musai în contextul unui anumit  obiect.

Împachetarea într-o funcție gazdă creează și comunicare înspre și dinspre hard binding:

```javascript
// o funcție care se va executa în contextul unui obiect
// 1. acceptă date prin parametri
// 2. returnează date prelucrate
var activitate = function activ(date){
  console.log(this.a, date);
  return this.a + date;
};

// un obiect care oferă contextul de lucru pentru activitate()
// 1. conține date și sau metode necesare prelucrărilor pe care le face activitate()
var obiectGazda = {
  a: 1000
};

// o funcție gazdă care „întărește” bindingul this la obiect
// returnează o valoare, care este ceea ce a returnat activitate după ce a prelucrat datele
var modificaGazda = function (){
  return activitate.apply(obiect, arguments); // arguments este un array like
};

// introdu date in gazdă, pe care le va folosi activitate
var rezultat = modificaGazda(100);
console.log(rezultat); // 1100
```

## Hard binding cu `bind()`

Începând cu ES5 `bind()` a fost introdusă ca metodă în prototipul oricărei funcții - `Function.prototype.bind()`.

```javascript
// o funcție care se va executa în contextul unui obiect
var activitate = function activ(date){
  console.log(this.a, date);
  return this.a + date;
};

// un obiect care oferă contextul de lucru pentru activitate()
var obiect = { a: 1000 };

// realizarea hard binding-ului
var binding = activitate.bind(obiect);

// folosirea șablonului cu date
var rezultat = binding(4000); console.log(rezultat); // 5000
```

Rolul lui `bind()` este acela de a returna o funcție care setează `this` la obiectul context.

```javascript
var obi = {
  prop1: 10,
  metho: function ex(){
    setTimeout(function(){
      console.log(this.prop1);
    }.bind(this), 1500);
  }
};
obi.metho();
```

O mulțime de funcții built-in ale limbajului oferă un parametru opțional numit „context”, care are rolul de a evita folosirea lui `bind()`, asigurând faptul că funcția callback folosește un anume `this`.

Nu uitați că odată cu ES6 se pot folosi „funcțiile săgeată” - arrow functions, care sunt legate de `this` automat. Folosirea lui `this` într-o astfel de funcție trimite la `this` al funcției context / gazdă.

### Parcurgerea unui array cu aplicarea unei funcții:

```javascript
function actiune (date){ console.log(date, this.a + date); };
var obiect = { a: 1000 };
[1, 2, 3].forEach(actiune, obiect);
```

### Evenimentele din API-ul browserului

Să închipuim cazul unui obiect care are metode construite special pentru a gestiona o pagină sau un fragment de pagină web prin manipularea evenimentelor.

```javascript
var obiExecutor = {
  codUnicObiect: '1035442',
  captura: function(){document.addEventListener('click', function(eveniment){
    this.prelucreaza(eveniment.type); // trimite tipul evenimentului
  }, false)},
  prelucreaza: function(tip){
    console.log(`Prelucrez acest ${tip} pentru ${codUnicObiect}`);
  }
};
```

Este nevoie de `bind(this)` pentru a păstra legătura la obiectul în cadrul căreia se execută metoda. Altfel, fără `bind(this)`, `this` se va stabili la obiectul DOM la care se atașează listener-ul (receptorul).

`bind(this)` leagă înapoi `this` la obiectul a cărui metodă este. Dar pentru ca acest lucru să se întâmple, se va folosi operatorul de grupare pentru a „repoziționa” legătura `this` la obiectul părinte, nu a elementului DOM.

```javascript
var obiExecutor = {
  captura: function(){document.addEventListener('click', (function(eveniment){
    this.prelucreaza(eveniment.type); // trimite tipul evenimentului
  }).bind(this), false)}
};
```

Pentru a rezolva elegant se poate folosi un arrow function:

```javascript
var obiExecutor = {
  captura: function(){document.addEventListener('click', eveniment => this.prelucreaza(eveniment.type), false)}
};
```

#### Mantre

- `bind()` creează o nouă funcție, care atunci când este apelată va avea `this` setat la valoarea introdusă ca paramentru împreună cu o serie de argumente.
- `bind()` nu modifică funcția originală cu nimic, pur și simplu construiește una nouă.

Exemplul de la MDN

```javascript
this.x = 9;

var modul = {
  x: 81,
  getX: function() { return this.x; }
};

modul.getX(); // 81

var retrieveX = modul.getX;

retrieveX(); // 9, deoarece "this" face referință la obiectul global. Funcția este doar „împrumutată” din metoda obiectului

// Creează o nouă funcție cu this bound la modul
var boundGetX = retrieveX.bind(modul);
boundGetX(); // 81
```

bind() va fi găsit în funcția __proto__ al oricărui obiect generat de o funcție alături de `call()` și `apply()` pentru că orice funcție este un obiect care are o legătură prototipală și astfel acces la obiectul `Function` (Function.prototype.apply(), Function.prototype.bind(), Function.prototype.call()).

## 5. Binding cu `new` - constructori

Poți pune în fața oricărei funcții `new` și o transformi astfel într-un apel către un Constructor. Atenție, aici trebuie precizat faptul că JavaScript nu are clase.

### Cum funcționează constructorii:

```javascript
function SuntUnConstructor (){
  // se creează proprietăți în this
  this.ceva = 100;

  // dacă se returnează un obiect, atunci obiectul va fi rezultatul apelării cu new
  // dacă nu returnează un obiect, atunci this va fi rezultatul apelării cu new.
};

var obi = new SuntUnConstructor();

console.log(obi.ceva); // 100
```

Și cazul în care se face returnare:

```javascript
function AltConstructor (){
  this.alfa = 10000;
  return {alfa: 1};
};

var obi = new AltConstructor();

console.log(obi.alfa); // 1
```

### Mantre

- O funcție apelată cu `new` în fața sa este un constructor.
- `new` este mai puternic decât hard binding-ului.
- Dacă funcția nu returnează ceva, atunci înainte de a se închide blocul („}”), `this` va fi returnat automat.

Ceea ce va face la instanțiere este exact ceea ce a fost proiectată funcția la care se adaugă patru comportamente nevăzute.

### Ce se întâmplă când pui cuvântul cheie rezervat `new` în fața oricărei funcții?

1. Se creează un obiect nou.
2. Se creează o legătură la obiectul prototype al funcției a cărui identificator a fost folosit cu `new`. Se creează legătura prototipală.
3. Obiectul generat automat este pasat funcției cu rol de constructor ca fiind parametrul `this` și astfel, devine contextul de execuție a funcției constructor invocate (`this` este pasat ca parametru împreună cu `arguments`).
4. Dacă funcția nu returnează ceva, atunci înainte de a se închide blocul („}”), `this` va fi returnat automat.

```javascript
function viitorObiect(data){
  this.x = "ceva din obiectul test2";
  this.y = data;
}

/* Se generează un obiect cu identificatorul obiectul
 * poți trimite date în noul obiect care devin membri ai this */
var obiectul = new viitorObiect('venit din afară');

/* Atunci ai acces la proprietatea x și y
*  pentru că este returnat obiectul */
console.log(obiectul.x, obiectul.y); // ceva din obiectul test2 venit din afară
```

### Restricționarea folosirii unei funcții doar ca și constructor

Restricția se aplică astfel:

```javascript
function VehiculSpatial(nume){
  if(this instanceof VehiculSpatial){
    this.nume = nume;
    this.tip = 'vehicul';
  } else {
    throw new Error('Funcția are rol de constructor! Invocă cu new');
  }
};
var obiectNou = new VehiculSpatial('ISS'); // { nume: "ISS", tip: "vehicul" }
var obiectEsuat = VehiculSpatial(); // Error: Funcția are rol de constructor! Invocă cu new
```

Această restricționare poate fi păcălită apelând funcția constructor în contextul unui obiect deja creat de funcția constructor fără a instanția cu new.

```javascript
var obiectPacalitor = VehiculSpatial.call(obiectNou, 'Soyuz');
// în acest moment, obiectNou este modificat la Object { nume: "Soyuz", tip: "vehicul" }
```

Ceea ce tocmai s-a petrecut este că s-a invocat constructorul în contextul unui obiect deja construit pe baza lui iar `this`, de fapt a devenit obiectul deja creat. Acest lucru conduce la rescrierea lui `nume` în obiectul gazdă (obiectNou). Aceast comportament nu este cel așteptat atâta vreme cât am dorit ca funcția constructor să permită invocarea dor cu `new`.

În ES6 această problemă este reglată prin `new.target`. Acestă proprietate, care este mai specială pentru că se adresează unui viitor obiect ce nu a fost creat încă, capătă o valoare atunci când metoda `[[Construct]]`. Valoarea este constructorul obiectului proaspăt generat, adică `this`. Dacă funcția constructor este apelată fără `new` asta înseamnă că este apleată cu `[[Call]]`, `new.target` va avea valoarea `undefined`.

```javascript
function VehiculSpatial(nume){
  if(typeof new.target !== "undefined"){
    this.nume = nume;
    this.tip = 'vehicul';
  } else {
    throw new Error('Funcția are rol de constructor! Invocă cu new');
  }
};
var obiectNou = new VehiculSpatial('ISS'); // { nume: "ISS", tip: "vehicul" }
var obiectPacalitor = VehiculSpatial.call(obiectNou, 'Soyuz'); // Error: Funcția are rol de constructor! Invocă cu new
```

## Precedența regulilor

În funcție de call-site pot activa una sau mai multe reguli de binding. Există modalități de a stabili care reguli de binding se aplică pentru `this`.

Întrebări de verificare cheie în call-site pentru a determina la ce este făcut bindingul prin `this`. Aceasta este și ordinea precedenței:

1. A fost chemată funcția cu `new`? Dacă da, `this` este chiar acel obiectul returnat (**binding cu new**).
2. A fost apelată prin `call()` sau `apply()`? Dacă da, folosește acel obiect pentru context - binding explicit.
3. A fost apelată funcția într-un obiect care conține referința sau o deține (context) - binding implicit.
4. Global object (cu excepția rulării în `use strict`)

Concluzie: Bindingul explicit are precedență asupra celui implicit.

## Studiu de caz: acțiunea lui new asupra bindingului lui `this`:

```javascript
function actiune(val1, val2){
  this.x = val1;
  this.y = val2;
};

var obiect = {
  y: 5000
};

var sudura = actiune.bind(obiect); // o referință către funcția actiune in contextului lui obiect
console.log(sudura);               // function bound actiune()

sudura('1000');
console.log(obiect.x);             // 1000
console.log(obiect.y);             // undefined

sudura('5000', '10000');
console.log(obiect.x);             // 5000
console.log(obiect.y);             // 10000

// constructor
var nou = new sudura(2000);        // se creează un nou obiect, având un nou binding
console.log(nou);                  // Object { x: 2000, y: undefined }
console.log(nou.x);                // 2000
console.log(JSON.stringify(nou));  // {"x":2000}
```

Ce se întâmplă atunci când setezi valorile argumentelor:

```javascript
function actiune(val1, val2){
  this.x = val1;
  this.y = val2;
};

var obiect = {
  y: 5000
};

var sudura = actiune.bind(obiect, 'bau', 'miau'); // o referință către funcția actiune in contextului lui obiect
console.log(sudura);                              // function actiune()

sudura('1000');
console.log(obiect.x, obiect.y);                  // bau miau

var nou = new sudura(2000);        // se creează un nou obiect, având un nou binding
console.log(nou.x, nou.y);         // bau miau
console.log(JSON.stringify(nou));  // {"x":"bau","y":"miau"}
console.log(obiect.x, obiect.y);   // bau miau
```

Ceea ce se observă este că `new` are capacitatea de a suprascrie hard binding-ul. Motivul pentru care este permis un astfel de comportament este pentru că poți creea dintr-o funcție un obiect, care să ignore hard-binding-ul existent, dar care presetează o parte sau toate argumentele funcției.

## Comportamentul lui `this` în cazul fat arrows

Funcțiile arrow nu au propria valoare pentru parametrul `this`. Pur și simplu îl constituie la momentul creării acestora.
Funcțiile fat arrows sunt legate de scope-ul lexical, asta însemând că `this` va fi același ca și cel din blocul părintelui.

```javascript
var nume = 'Auraș din Global Scope';

function ciao(nume){
  this.nume = nume;
};

ciao.prototype.urare = function(){
  setTimeout(function callback(){     // this care este pasat automat este cel al global scope (window)
    console.log('Ciao '+ this.nume);
  }, 500);
};

var intalnire = new ciao('Grigoras');
intalnire.urare();
// Ciao undefined (asta daca nume nu este declarat în Global Scope)
// Când este declarată o variabilă în global scope, va fi afișat în consolă: Ciao Auraș din Global Scope
```

Pentru a face un binding la obiectul generat de ciao, se va face un bind cu metoda `bind()`.

```javascript
var nume = 'Auraș din Global Scope';

function ciao(nume){
  this.nume = nume;
};

ciao.prototype.urare = function(){
  setTimeout((function callback(){     // this care este pasat automat este cel al global scope (window)
    console.log('Ciao '+ this.nume);
  }).bind(this), 500);
};

var intalnire = new ciao('Grigoras');
intalnire.urare(); // Ciao Grigoras
```

Datorită faptului că fat arrows este legat la scope-ul lexical, nu mai trebuie făcut un binding apeland la `bind()`.

```javascript
var nume = 'Auraș din Global Scope';

function ciao(nume){
  this.nume = nume;
};

ciao.prototype.urare = function(){
  setTimeout(() => console.log('Salutare ' + this.nume), 500);
};

var intalnire = new ciao('Grigoraș');
intalnire.urare(); // Ciao Grigoraș
```

### `forEach` după felul în care se face binding-ul la `this`

În cazul fat arrows, this este legat de mediul lexical al obiectului. `forEach` nu alunecă în global.

```javascript
this.array.forEach((el) => {
  if(true){
    this.prelucrat.push(++el);
  };
});
```
Pentru a realiza acelasi lucru, înainte de ES6 erau mai multe rețete.

#### Prima: constituirea unei punți lexicale

Este vorba despre legendara soluție `var self = this;`.

```javascript
var self = this;
this.array.forEach(function (el) => {
  if(true){
    self.prelucrat.push(++el);
  };
});
```

#### A doua: pasarea lui `this` ca al doilea parametru lui `forEach`

```javascript
this.array.forEach(function (el) => {
  if(true){
    this.prelucrat.push(++el);
  };
}, this);
```

#### A treia este un bind(this) pentru a forța execuția în contextul necesare

```javascript
this.array.forEach(function (el) => {
  if(true){
    this.prelucrat.push(++el);
  };
}, bind(this));
```

### Lucruri la care să fii atent

În cazul în care folosești forEach(), trebuie să știi că poți pasa și `this`, ca al doilea argument. Deci, nu face „punte lexicală” de genul `var that = this` pentru a adăuga rezultatele iterării la this. (vezi [MDN>Web technology for developers>JavaScript>JavaScript reference>Standard built-in objects>Array>Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach))

## Alonje

- înțelegerea programării funcționale

## Resurse:

[MDN Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
[MDN this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
[Crockford on Javascript - Functions](https://www.youtube.com/watch?v=lVnnxfdLdlM)
