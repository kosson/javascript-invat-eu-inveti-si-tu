# Obiecte

**Un obiect este un membru al tipului built-in Object** al limbajului.

Pentru a realiza natura limbajului de programare JavaScript, care este unul orientate pe obiecte, vom cita standardul care spune:

> ECMAScript este bazat pe obiecte: limbajul de bază și toate funcționalitățile sunt oferite de obiecte iar un program ECMAScript este un ciorchine de obiecte care comunică.

Standardul spune că obiectele sunt

> colecții de zero sau mai multe proprietăți fiecare având atribute care determină cum poate fi folosită.

Proprietățile trebuie înțelese ca niște

> containere care pot conține alte obiecte, valori primitive sau funcții.

Atunci când un obiect este creat, toate caracteristicile sale sunt moștenite de la un alt obiect cu rol de prototip. Să nu vi se pară ciudat că un prototip este un obiect, iar acesta la rândul lui are un prototip. E ca un lanț care are drept limită superioară obiectul intern `Object`.

Pentru că ești nerăbdătoare am să-ți dau două indicii privind crearea obiectelor. Poți folosi notația literală folosind acoladele ca în `{a:1}` sau poți apela cu operatorul `new` funcții cu rol de constructor. Aceste două metode sunt și cele mai des întâlnite. Am menționat constructorii deja?

## Ce sunt constructorii?

Sunt funcții-obiect. Să detaliem.

După cum am văzut în capitolul dedicat genezei Tărâmului, atunci când s-au format **intrinsics**, a fost creat și obiectul prototip al tuturor obiectelor, care o fracțiune mai târziu a fost folosit pentru crearea obiectului-funcție ce va juca rolul de prototip al tuturor funcțiilor.

JavaScript este un univers al obiectelor care sunt generate de constructori sau prin folosirea notației literale așa cum deja am văzut la capitolul dedicat valorilor. Dacă avem deja o ideea despre notația literală, trebuie să lămurim natura constructorilor. Aceștia sunt pur și simplu niște funcții care au o proprietate numită `prototype`. Această proprietate este un obiect care prin însăși existența sa face posibilă moștenirea prototipală. De ce există această proprietate în funcția-obiect care este constructorul? Pentru că în cazul apelării folosind operatorul `new`, se va genera legătura prototipală.

Este astfel asigurat accesul la proprietăți pe care obiectul creat la apelararea funcției constructor cu operatorul `new` le pune la dispoziție de la bun început fără a fi fost setate la nomentul creării.

Ceea ce mai trebuie să știi din start despre constructori este că la apelarea cu operatorul `new`, generează obiectul și apoi execută codul; nu uita că este totuși o funcție. Execuția codului dintr-un constructor are ca efect asignarea proprietăților inițiale ale obiectului nou creat. Invocarea unui constructor fără operatorul `new` are efecte diferite pentru fiecare dintre aceștia.

**Spune standardul**: *Fiecare obiect creat de un constructor are o referință implicită (numită prototipul obiectului) către valoarea proprietății «prototype» a constructorului*.

Mai mult de atât fiecare `prototype` poate avea drept referință un alt `prototype`, realizându-se ceea ce se numește *lanț prototipal*. Modul de funcționare a lanțului prototipal se bazează pe un mecanism de delegare atunci când se caută o proprietate a unui obiect. De exemplu, dacă cauți o proprietate într-un obiect iar ea nu este a obiectului, există o bună șansă să fie moștenită prin lanțul prototipal de la constructorul pe baza căruia a fost instanțiat așa că se face căutarea mai departe din obiect în obiect până când proprietatea este găsită sau nu.

## Componența obiectelor

Obiectele au **proprietăți** și **metode**.
Proprietățile sunt valori primitive - numere, boolean-uri, șiruri de caractere, funcții sau chiar obiecte. Proprietățile ***sunt ceva***.
Metodele ***fac ceva***. Metodele sunt de fapt niște funcții. Un aspect care vă va face viața ușoară odată înțeles este acela că toate funcțiile definite în obiectul global, de fapt, devin automat metode ale acestuia, adică lui `window` în cazul browserelor.

Hai să facem un obiect. Vă mai aduceți aminte de la valori că valoarea obiect poate fi exprimată literal prin precizarea pur și simplu a unei perechi de acolade.

```javascript
// un object literal
var obi = {a: 10, b: 20};
```

Începând cu ECMAScript 2015 se poate folosi și notația prescurtată.

```javascript
var unu = 1, este = true;
// în loc de
var obi = {unu: unu, este: este};
// putem scrie mai concis
var obi = {unu, este};
// efectul este același
console.log(obi); // {"unu":1,"este":true}
```

**Moment ZEN**: Obiectele pot fi considerate ca array-uri asociative pentru că poți accesa valoarea folosind notația cu paranteze drepte: `obi['b']`.

Proprietățile pot fi adăugate dinamic unui obiect deja existent fără a fi nevoie să mergi la constructorul său și să le adaugi acolo.

```javascript
function Constructorul () {
  this.ceva = 1;
};
var obi = new Constructorul();
console.log(obi); // {"ceva":1}
obi.altceva = 10;
console.log(obi); // {"ceva":1,"altceva":10}
```

Acest mod de a adăuga proprități noi fără a interveni asupra constructorului este unic și este o marcă a JavaScript-ului.

## Categorii de obiecte

În textul standardului, obiectele se încadrează următoarelor categorii:

- „Ordinary object” (*obiecte comune*), care au comportamentul comun tuturor obiectelor în JavaScript.
- „Exotic object” (*obiecte exotice*), care au comportamentul comun obiectelor în JS, dar cu mici diferențe.
- „Standard objects” (*obiecte standard*) sunt toate obiectele JS. Obiectele „ordinary” și cele „exotice” fac parte din setul obiectelor standard.
- „Built-in objects” (*obiecte interne*) sunt toate obiectele pe care le expune din start motorul de JavaScript. Toate obiectele comune (*ordinary*) fac parte din setul celor interne.

## Obiecte interne (*built-in*)

Am menționat că JavaScript vine din start cu obiectele care se numesc „built-in object” și pe care le-am tradus ca **obiecte interne** limbajului. Pentru a avea acces la ele nu-i nevoie să faci ceva. Pur și simplu ele sunt acolo deja, gata de a fi folosite. Există un detaliu pe care aș dori să-l remarcați cu atenție. `Obiectul global` este parte a obiectelor interne. Am putea concluziona că `obiectul global` plus `obiectele standard` constituie setul mare al celor `interne`. O distincție pe care trebuie să o fi realizat deja este că obiectul global nu este containerul tuturor obiectelor oricât de tentant ar fi să-l gândim astfel. Dar este „containerul”, dacă vrei să-l închipui astfel, al întregului cod pe care-l scrii tu și al entităților care se formează la momentul evaluării acestuia.

## Mantre

- ECMAScript vine cu obiectele sale din start care se numesc obiecte `built-in` în care este inclus și `global object` - obiectul global.
- JavaScript nu are clase! Atenție, nu vă lăsați amăgiți de formula sintactică introdusă de ES6 pentru a face codul scris să pară că JavaScript are clase.
- Totul în JavaScript are comportamentul unui obiect cu două excepții: `null` și `undefined`.
- În clientul care rulează codul mai întâi de orice există obiectul window.
- Obiectul window are o metodă numită Object [ function Object() ]. Motorul Javascript construiește automat metoda Obiect în obiectul window (window.Object returnează function `Object()`).
- Toate obiectele în JavaScript descind din Object, adică își au originea în Object. Toate obiectele moștenesc metode și proprietăți din `Object.prototype`. Acestea pot fi suprascrise.
- `Object.prototype` este un obiect în care poți adăuga propriile proprietăți și metode.
- Modificările aduse obiectului `Object.prototype` se propagă către toate obiectele. Singura excepție este atunci când proprietățile și metodele supuse modificărilor nu sunt ele la rândul lor modificate mai departe în lanțul prototipal.
- În cazul tuturor funcțiilor, motorul JavaScript generează un obiect prototype (numeFunctie.prototype). Acest obiect (prototype), este gol și este creat de constructorul lui `Object()`.
- Funcțiile sunt legate de obiectul prototip prin metoda .constructor. Acest lucru înseamnă că poți afla în orice moment care este funcția care generează prototipul prin apelarea constructorului cu ***dunder-dunder-proto***: `obiect.__proto__.constructor`
- Fiecare funcție obiect are un obiect prototip diferit.
- Obiectele pot invoca orice funcție publică indiferent de lanțul prototipal.
- Un obiect poate fi creat cu `new Object()`:
  1. acestă modalitate **nu va crea și constructor**.
  2. Accesarea `numeObiect.__proto__.constructor` răspunde cu `function Obiect()` la care s-a ajuns prin delegare.
- JavaScript are și obiecte globale existente deja în limbaj precum `String()`, `Array()`, `Math()`, `Date()` (`var test = new Date()`).
- O funcție apelată cu `new` în fața sa este un constructor:
  1. Se creează un obiect nou.
  2. Se creează o legătură la obiectul prototype al funcției a cărui identificator a fost folosit cu `new`. Se creează legătura prototipală.
  3. Obiectul generat automat este pasat funcției cu rol de constructor ca fiind parametrul `this` și astfel, devine contextul de execuție a funcției constructor invocate (`this` este pasat ca parametru împreună cu `arguments`).
  4. Dacă funcția nu returnează ceva, atunci înainte de a se închide blocul („}”), `this` va fi returnat automat.
- `this` este un obiect-context: pentru funcții simple este `window`, pentru metode este obiectul în care se execută iar pentru noile obiecte create este chiar noul obiect generat.
- Obiectele pot moșteni alte proprietăți direct din alte obiecte.
- Când introduci o proprietate nouă într-un obiect care generează prototipul pentru alte obiecte, obiectele legate prin lanțul prototipal, vor moșteni noile proprietăți.
- [[Prototype]], adică proprietatea `prototype` este o legătură internă, care se stabilește de la un obiect la altul. Pentru aflarea prototipului se apelează `Object.getPrototypeOf(obiect)`.
- Un obiect literal are prototype `undefined`. Cu toate acestea la interogare cu instanceof trimite la Object.
- Legătura prototipală se obține legătura prin `Object.create()` și are două efecte:
  1. **creează un obiect**,
  2. **stabilește legătura prototipală**.
- Legătura prototipală se obține și prin efectul al doilea al folosirii cuvântului cheie `new`.
- Legătura prototipală creează un lanț de delegare pentru cazurile în care nu găsești o proprietate sau o metodă într-un anumit context de execuție.
- Mecanismul pe care-l realizează `.prototype` este unul de delegare a cererii pentru referința unei proprietăți sau metode către un obiect mai sus pe lanțul prototipal către un alt obiect.
- Obiecte cu un prototip și proprietăți prestabilite, se pot contrui cu `Object.create(obi, {exemplu: 'proprietate'})`. Se realizează o legătura prototipală la obiectul obi.
- Obiectele atunci când au metode, nu „dețin” sau „conțin” acele funcții, ci doar referințe către funcțiile pe post de metode. Funcțiile (metodele) nu fac parte din obiect; referința către acestea este parte a obiectului.
- În obiecte numele proprietăților sunt întotdeauna stringuri.
- Relațiile prototipale pot cauza probleme atunci când este nevoie de enumerarea proprietăților obiectelor. Douglas Crockford recomandă „ambalarea” conținutului buclei de ciclare într-o funcție de verificare `hasOwnPropery()`;
- Dacă dorești „înghețarea” obiectelor pentru a nu fi modificate, se va folosi `Object.freeze()` iar în cazul Node.js, modulul `deep-freeze`.

## Crearea obiectelor

Obiectele pot fi create în două feluri: prin declararea acestora sau prin construirea lor.

1. `var newObj = new Object();` se respectă cele patru reguli: (1)crearea obiectului; (2)stabilirea lanțului prototipal; (3)bindingul lui `this` la noul obiect; (4)obiectul nou creat este returnat.
2. `var newObj = Object.create(null);` prototype este setat la `null`. Supranumit `dict pattern`
3. `var newObj = Object.create(Object.prototype);` echivalentă cu `var newObj = {}`.
4. `var newObj = {};` echivalentă cu `new Object()`.
5. `function x(){return{a:1}}; var y = x();`

## Crearea obiectelor cu valori deja computate

Această metodă este introdusă de ECMAScript 2015. De fapt, creezi obiecte literale, dar de această dată se pot introduce valori computate (computed property names) chiar la momentul în care este constituit obiectul.

```javascript
// cel mai simplu exemplu
const a = 10;
const b = 20;
const obi = {a, b};

// un alt exemplu
const namespace = 'moz';
const webObi = {
  [namespace + 'box-sizing']: 'border-box',
  [namespace + 'box-shadow']: '25px25px10px #888888'
};
```

## Atributele proprietăților unui obiect

Atributele sunt folosite pentru a defini și a explica starea proprietăților unui obiect.

<img src="ProprietatePentruDate.png" width="300">

Atributele unei proprietăți folosite pentru date.

|Numele atributului|Valoare|Descriere|
|:-----------------|:------|:--------|
|`value`|oricare tip ECMAScript|Este valoarea obținută prin accesarea proprietății|
|`writable`|Boolean|Dacă este setat la `false`, atributul `value` nu va putea fi scris folosind `set`|
|`enumerable`|Boolean|Dacă este setat la `true`, proprietatea va putea fi enumerată într-un `for-in`|
|`configurable`|Boolean|Dacă este setat la `false`, orice încercare de a modifica atributele, de a șterge proprietate, va fi destinată eșecului. Tot ce permite este modificarea lui `value` și setarea lui `writable` la `false`.|

Atributele unei proprități de tip Accessor

<img src="ProprietateAccesor.png" width="300">

|Numele atributului|Valoare|Descriere|
|:-----------------|:------|:--------|
|`get`|Obiect sau undefined|Dacă valoarea este un obiect acesta este o funcție-obiect|
|`set`|Obiect sau undefined|Dacă valoarea este un obiect acesta este o funcție-obiect|
|`enumerable`|Boolean|Dacă este setat la `true`, proprietatea va putea fi enumerată într-un `for-in`|
|`configurable`|Boolean|Dacă este setat la `false`, orice încercare de a a modifica să fie o proprietate de date sau să-i schimbi atributele, va eșua|

Un exemplu practic:

```javascript
var newObj = {};              // Creează obiectul

Object.defineProperty(newObj, 'numeCheieNoua', {
  value: 'Salutare',
  writable: true,
  enumerable: true,
  configurable: true
});
```

## Crearea metodelor

O funcție care este declarată într-un obiect, devine metodă a acelui obiect. Atenție! este totuși o funcție în sine.

```javascript
var obi = {
  token: 10,
  faCeva: function faCeva(){
    console.log(this.token);
  }
};
obi.faCeva(); // 10
faCeva(); // faCeva is not defined
```

`faCeva` este o metodă a obiectului obi. `faCeva` este de fapt o referință către funcția anonimă care afișează în consolă valoare lui token. `obi.faCeva` poate fi considerată o referință către funcție. Nu uita faptul că oricărei funcții îi este pasat `this` automat.

Modalitatea de a crea o metodă într-un obiect este perfect echivalentă cu următoarea alternativă.

```javascript
var obi = {
  token: 10
};

obi.faCeva = function faCeva(){
  console.log(this.token);
};

obi.faCeva(); // 10
faCeva(); // faCeva is not defined
```

Dar și această alternativă este perfect identică cu următoarea:

```javascript
var token = 1000;

var obi = {
  token: 10
};

function faCeva(){
  console.log(this.token);
};

obi.faCeva = faCeva;

obi.faCeva(); // 10
faCeva(); // undefined (e undefined pentru că JS creează automat variabila token in global, dar nu are valoare pentru ea)
          //sau 1000, dacă ai token declarat în global.
```

Aici este un element în plus. Funcția `faCeva` a fost declarată în global, ceea ce înseamnă că `scope`-ul său lexical se află în `global scope`.
În cazul în care în global scope ar fi fost declarată valoarea token, la invocarea funcției în sine, nu ca metodă, valoarea acesteia ar fi fost adusă.

Odată cu apariția noii versiuni ECMAScript, metodele au fost definite în mod formal. Standardul definește o metodă ca fiind o funcție care au o proprietate internă `[[HomeObject]]`. Această proprietate conține obiectul căruia îi aparține metoda.

```javascript
var obi = {
  x: 10,
  faCeva(){
    console.log(this.x);
  }
}; obi.faCeva();
```

Observați faptul că declararea metodei faCeva, nu mai folosește cuvântul cheie function urmat de două puncte, cheia de identificare în obiect fiind îndeajuns urmată de capul și corpul funcției.

## Metode interne ale obiectelor

Modul în înțelegem un obiect este determinat și de un set de algoritmi care sunt oferiți de orice motor care implementează standardul ECMAScript. Acești algoritmi sunt numiți `metode interne`.
Metodele interne definesc comportamentul la momentul în care este rulat codul pentru acel obiect. Reține faptul că aceste metode interne cad în responsabilitatea celor care fac o implementare, un motor de JavaScript.

În scopul exemplificării vom folosi un obiect literal care are câteva proprietăți și un alt obiect creat folosind `Object.create` pentru care setăm lanțul prototipal la primul creat.

```javascript
let obi = {
  prop1: 10,
  prop2: function(){console.log("Salut");}
};

let obi2 = Object.create(obi);
obi2.stare = 100;
```

### Metoda `Object.getPrototypeOf()`

Returnează un obiect sau null și indică obiectul care oferă proprietăți care sunt moștenite și de cel asupra căruia se face interogarea cu `getPrototypeOf`. `null` indică faptul că obiectul curent nu moștenește nicio proprietate.

```javascript
Object.getPrototypeOf(obi2);
// Object { prop1: 10, prop2: obi.prop2() }
```

Celelalte proprietăți sunt: `setPrototypeOf` și `isExtensible`.

Acestea pot fi consultate în detaliu la secțiunea dedicată obiectului intern `Object`.

## Crearea obiectelor printr-o funcție cu rol de constructor și instanțierea cu `new`

Mai este numită de o parte a programatorilor „moștenire clasică”. De fapt, este vorba tot despre moștenire prototipală, dar care face uz de un constructor.

Acesta este modelul cel mai des întâlnit și acceptat ca practică istorică:
1. Creezi o funcție constructor (este o practică acceptată ca funcțiile constructor să aibă numele începând cu literă mare).
2. Adaugi metode în obiectul `prototype` al funcției cu rol de constructor.
3. Instanțiezi obiectul folosind cuvântul cheie `new`.

```javascript
var Ceva = function (info) { this.info = info; };
Ceva.prototype.difuzor = function () { console.log(this.info); };
var instanta = new Ceva('Salve!');
instanta.difuzor(); // Salve
```

Odată cu evoluția standardului avem acces și la `Object.create`, cu ajutorul căreia putem evita instanțierea cu `new`.

```javascript
var Ceva = function (info) { this.info = info; };
Ceva.prototype.difuzor = function () { console.log(this.info); };
var instanta = Object.create(Ceva.prototype, {
  info: {
    value: 'Salut!',
    writable: true
  }
});
instanta.difuzor(); // Salut!
```

### Standardul spune

Un constructor, de fapt o funcție constructor, este un obiect funcție care suportă metoda internă `[[Construct]]`.

### Ce se întâmplă când folosești `new`

1. Se creează un obiect nou.
2. Se creează o legătură la obiectul prototype al funcției a cărui identificator a fost folosit cu `new`. Se creează legătura prototipală.
3. Obiectul generat automat este pasat funcției cu rol de constructor ca fiind parametrul `this` și astfel, devine contextul de execuție a funcției constructor invocate (`this` este pasat ca parametru împreună cu obiectul `arguments`). `this` va fi obiectul nou construit
4. Dacă funcția nu returnează ceva, atunci înainte de a se închide blocul („}”) se va returna automat obiectul constituit la pasul 1.

Cel mai simplu exemplu:

```javascript
var Salut = function(){};                 // function Salut()

Salut.prototype.glas = function(vorbe){
  console.log(vorbe);
};                                        // Salut.prototype returnează: Object{  glas: Salut.prototype.glas(), constructor: Salut() }
                                          // Salut.__proto__ returnează: function ()
var unObiect = new Salut();               // unObiect returnează: Object {}
                                          // unObiect.__proto__              returnează: Object{  glas: Salut.prototype.glas(), constructor: Salut() }
                                          // Object.getPrototypeOf(unObiect) returnează: Object{  glas: Salut.prototype.glas(), constructor: Salut() }
unObiect.glas('o vorbă să-ți mai spun');  // unObiect.__proto__.constructor returnează: function Salut()
```

Atenție! Aici există ceva foarte important de lămurit. Proprietatea `prototype` aparține funcției constructor (`Function.prototype`). Această legătură vizibilă, care poate fi „întrebată”, expune o legătură internă referită de standard ca [[Prototype]].

La nevoie, poți adăuga în prototipul funcției proprietăți pe care îți dorești să fie moștenite mai târziu de obiectele create. Să spunem că avem o funcție cu rol de constructor după care se instanțiază un obiect. Dar mai târziu, pentru că este nevoie de o proprietate care să fie moștenită de toate obiectele generate, se poate introduce direct în obiectul `prototype` al funcției.

```javascript
function TestInstantiere(){
  this.x = 100;
};
var obi = new TestInstantiere();
console.log(obi.x);
// acum ne-am dat seama că mai e nevoie de o valoare de 1000.
TestInstantiere.prototype.y = 1000;
console.log(obi.y);
```

Cum testezi, cum întrebi care este prototipul unui obiect? Există două metode echivalente ca rezultat returnat (obiectul prototype):

1. `Object.getPrototypeOf(obiectulTestat)`,
2. `obiectulTestat.__proto__`

#### Crearea și accesarea membrilor unui obiect creat cu un constructor

Funcțiile cu rol de constuctori pot defini întern metodele, iar acestea devin niște metode tip „accessor” sau „getter”, care te ajută să ajungi din scope-ul extern la valorile din constructor.

```javascript
function Sablon(){
  var cantitate = 10;

  this.getCantitate = function(){
    return cantitate;
  };

  this.incrementare = function(){
    cantitate++;
  };
};

var obiect = new Sablon();

obiect.getCantitate(); // 10
obiect.incrementare(); // undefined
obiect.getCantitate(); // 11
```

Pentru a ajunge la cantitate este nevoie de metode de acces („accessors”). Acesta este și unul din cazurile de realizare a unui closure.

### Crearea unui obiect printr-o declarație literală

Un obiect poate fi creat foarte simplu folosind acoladele:

```javascript
var obiectNou = {};
```

Ce s-a întâmplat chiar în acest moment este o legătură prototipală la `Object`.

```javascript
var obiectNou = {};
obiectNou.__proto__.constructor // returnează: function Object()
```

Ce se mai realizezi atunci când creezi un obiect printr-o declarație literală este un domeniu separat de restul codului. Un domeniu sub un nume, numele obiectului și care este cunoscut ca `namespace`.

```javascript
var aplicatie = {};
// tocmai s-a creat un namespace
```

Poți crea un namespace doar dacă acesta nu există.

```javascript
var aplicatie = aplicatie || {};
```

### Crearea obiectelor cu Object.create()

Este o metodă a lui `Object` introdusă de ES5.
Permite atribuirea directă a unui prototip unui obiect eliberând prototipul de legătura cu, constructorul.

```javascript
var obiect = Object.create(null);
// pasarea lui null conduce la
// crearea unui obiect nou fără
// legătură prototipală
obiect = {};
// echivalent cu
obiect = Object.create(Object.prototype);
```

Echivalența este evidentă pentru că un obiect literal este un obiect ordinar care stabilește imediat o legătură la obiectul prototip a lui Object identificat prin Object.prototype.

Construirea unui prototip care să stea la baza unui nou obiect construit.

```javascript
var prototip = {
  prop1: "salut",
  prop2: function(){
    console.log('Te ' + this.prop1);
  }
};                                          // prototip.__proto__.constructor răspunde: function Object()

var instanta = Object.create( prototip );   // instanta.__proto__.constructor răspunde: function Object()

instanta.prop2(); // Te salut

instanta.salutNou = function(){
  console.log('Te ' + this.prop1 + ' iar');
};

instanta.salutNou(); // Te salut iar
```

Object.create permite inițializarea proprietăților obiectului folosind un argument suplimentar.

Cu ajutorul lui Object.create() se poate realiza chiar și o moștenire prototipală „clasică”.

```javascript
var ObiectZero = function(){
  this.name = "Obiectul zero";
};

ObiectZero.prototype.actiune = function(){
  this.afirmatie = this.name + "are o acțiune";
};

function ObiectUnu (){
  ObiectZero.call(this);  // rulezi ObiectZero în contextul lui this stabilit de ObiectUnu
};

ObiectUnu.prototype = Object.create(ObiectZero.prototype); // declari explicit că prototipul lui ObiectUnu este prototipul lui ObiectZero
ObiectUnu.prototype.constructor = ObiectUnu;               // setezi constructorul să să spundă cu funcția ObiectUnu

var ObiectTrei = new ObiectUnu; // se constituie legătura prototipală clasică

ObiectTrei instanceof ObiectUnu;   // true
ObiectTrei instanceof ObiectZero;  // true
```

`Object.create` permite o implementare simplă a conceputului de „moștenire diferențială” în care obiectele sunt capabile să moștenească direct din alte obiecte. Vezi șablonul Objects Linked to Other Objects (OLOO) a lui Kyle Simpson.

`Object.create` are posibilitatea de a adăuga și în același timp configura proprietăți ale obiectului. Este de fapt un caz de șablon Prototype.

```javascript
var vehicul = {
  getModel: function () {
    console.log('Modelul este: ' + this.model);
  }
};

var car = Object.create(vehicul, {
  // Sintaxa este similară cu Object.defineProperties și Object.defineProperty
  'id': {
    value: 'ISS - 01',
    enumerable: true
    // writable:false, configurable:false by default
  },
  'model': {
    value: 'Stație spațială',
    enumerable: true
  }
});
```
