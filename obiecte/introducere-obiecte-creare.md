# Obiecte

***JavaScript este un limbaj bazat pe moștenire prototipală - prototypal inheritance***

În JavaScript neexistând clase (cod care se comportă ca un plan pentru construcția obiectelor), pentru a reutiliza cod, se creează obiecte care se bazează pe cele existente.

Astfel, între aceste obiecte se creează o legătură. Această legătură se numește „legătură prototipală”. Aceste legături realizează „moștenirea prototipală” - prototypal inheritance. Obiectul preexistent constituie prototipul pentru cel nou creat care poate adăuga noi membri, noi comportamente.

---
## Mantre

- JavaScript nu are clase!
- În clientul care rulează codul mai întâi de orice există obiectul window.
- Obiectul window are o metodă numită Object [ function Object() ]. Motorul Javascript construiește automat metoda Obiect în obiectul window (window.Object returnează function Object()).
- Toate obiectele în JavaScript descind din Object, își au originea în Object. Toate obiectele moștenesc metode și proprietăți din Object.prototype. Acestea pot fi suprascrise.
- Object.prototype este un obiect în care poți adăuga propriile proprietăți și metode.
- Modificările aduse obiectului Object.prototype se propagă către toate obiectele. Singura excepție este atunci când proprietățile și metodele supuse modificărilor nu sunt ele la rândul lor modificate mai departe în lanțul prototipal.
- În cazul tuturor funcțiilor, motorul JavaScript generează un obiect prototype (numeFunctie.prototype). Acest obiect (prototype), este gol și este creat de constructorul lui Object()
- Funcțiile sunt legate de obiectul prototip prin metoda .constructor.
- Fiecare funcție are un obiect prototip diferit.
- Obiectele pot invoca orice funcție publică indiferent de lanțul prototipal.
- Un obiect poate fi creat cu `new Object()`:
  1. acestă modalitate **nu va crea și constructor**.
  2. Accesarea numeObiect.__proto__.constructor răspunde cu Obiect() la care s-a ajuns prin delegare.
- JavaScript are și obiecte globale existente deja în limbaj precum String(), Array(), Math(), Date() (```var test = new Date()```).
- O funcție apelată cu `new` în fața sa este un constructor:
  1. Se creează un obiect nou.
  2. Se creează o legătură la obiectul prototype al funcției a cărui identificator a fost folosit cu ```new```. Se creează legătura prototipală.
  3. Obiectul generat automat este pasat funcției cu rol de constructor ca fiind parametrul `this` și astfel, devine contextul de execuție a funcției constructor invocate (`this` este pasat ca parametru împreună cu `arguments`).
  4. Dacă funcția nu returnează ceva, atunci înainte de a se închide blocul („}”), ```this``` va fi returnat automat.
- `this` este un obiect-context: pentru funcții simple este `window`, pentru metode este obiectul în care se execută iar pentru noile obiecte create este chiar noul obiect generat. 
- Obiectele pot moșteni alte proprietăți direct din alte obiecte.
- Când introduci o proprietate nouă într-un obiect care generează prototipul pentru alte obiecte, obiectele legate prin lanțul prototipal, vor moșteni noile proprietăți.
- [[Prototype]], adică proprietatea `prototype` este o legătură internă, care se stabilește de la un obiect la altul. Pentru aflarea prototipului se apelează la __proto__ (dunder-dunder proto) sau sse va folosi Object.getPrototypeOf(obiect).
- Legătura prototipală se obține legătura prin Object.create() și are două efecte:
  1. **creează un obiect**,
  2. **stabilește legătura prototipală**.
- Legătura prototipală se obține și prin efectul al doilea al folosirii cuvântului cheie ```new```.
- Legătura prototipală creează un lanț de delegare pentru cazurile în care nu găsești o proprietate sau o metodă într-un anumit context de execuție.
- Mecanismul pe care-l realizează .prototype este unul de delegare a cererii pentru referința unei proprietăți sau metode către un obiect mai sus pe lanțul prototipal către un alt obiect.
- Obiecte cu un prototip și proprietăți prestabilite, se pot contrui cu Object.create(UnObiect, {exemplu: 'proprietate'}):
  1. se realizează legătura prototipală la obiectul UnObiect.
- o = {}; este echivalent cu o = Object.create(Object.prototype);
- Obiectele create cu `new Fnc()` și `Object.create(...)` nu li se atașează un `.constructor`. `.constructor` va trimite la funcția la care a fost atașat prototype la momentul declarării.
- Obiectele atunci când au metode, nu „dețin” sau „conțin” acele funcții, ci doar referințe către funcțiile pe post de metode. Funcțiile (metodele) nu fac parte din obiect; referința către acestea este parte a obiectului.
- În obiecte numele proprietăților sunt întotdeauna stringuri.
- relațiile prototipale pot cauza probleme atunci când este nevoie de enumerarea proprietăților obiectelor. Crockford recomandă „ambalarea” conținutului buclei de ciclare într-o funcție de verificare hasOwnPropery();

## Crearea obiectelor

Obiectele pot fi create în două feluri: prin declararea acestora sau prin construirea lor.

1. var newObj = new Object();
// se respectă cele patru reguli:
// 1.crearea obiectului; 2. stabilirea lanțului prototipal; 3. bindingul lui this la noul obiect; 4. obiectul nou creat este returnat
2. var newObj = Object.create(null);             // prototype este setat la null
3. var newObj = Object.create(Object.prototype); // echivalentă cu var newObj = {};
4. var newObj = {};                              // echivalentă cu new Object();

### Crearea obiectelor printr-o funcție cu rol de constructor și instanțiezi cu `new`

Mai este numită de o parte a programatorilor „moștenire clasică”. De fapt, este vorba tot despre moștenire prototipală, dar care face uz de un constructor (vezi și [Șablonul Constructor](../patterns/SabloaneDeCreare/Module/ModulePattern.md) ).

Acesta este modelul cel mai des întâlnit și acceptat ca practică istorică:
1. Creezi o funcție constructor (este o practică acceptată ca funcțiile constructor să aibă numele începând cu literă mare).
2. Adaugi metode la proprietatea `prototype` a funcției constructor.
3. Instanțiezi obiectul folosind cuvântul cheie `new`.

#### Ce se întâmplă când folosești `new`

1. Se creează un obiect nou.
2. Se creează o legătură la obiectul prototype al funcției a cărui identificator a fost folosit cu ```new```. Se creează legătura prototipală.
3. Obiectul generat automat este pasat funcției cu rol de constructor ca fiind parametrul `this` și astfel, devine contextul de execuție a funcției constructor invocate (`this` este pasat ca parametru împreună cu `arguments`).
4. Dacă funcția nu returnează ceva, atunci înainte de a se închide blocul („}”), ```this``` va fi returnat automat.

Cel mai simplu exemplu:

```js
var Salut = function(){};                 // din consola browserului> Salut returnează: function Salut()

Salut.prototype.glas = function(vorbe){
  console.log(vorbe);
};                                        // Salut.prototype returnează: Object{  glas: Salut.prototype.glas(), constructor: Salut() }
                                          // Salut.__proto__ returnează: function ()
var unObiect = new Salut();               // unObiect returnează: Object {}
                                          // unObiect.__proto__              returnează: Object{  glas: Salut.prototype.glas(), constructor: Salut() }
                                          // Object.getPrototypeOf(unObiect) returnează: Object{  glas: Salut.prototype.glas(), constructor: Salut() }
unObiect.glas('o vorbă să-ți mai spun');  // unObiect.__proto__.constructor returnează: function Salut()

```

Atenție! Aici există ceva foarte important de lămurit. Proprietatea `prototype` aparține funcției constructor. Această legătură vizibilă, care poate fi „întrebată”, expune o legătură internă referită de standard ca [[Prototype]].

Cum testezi, cum întrebi care este prototipul unui obiect? Există două metode echivalente ca rezultat returnat (obiectul prototype):
1. Object.getPrototypeOf(obiectulTestat),
2. obiectulTestat.__proto__

Un exemplu ceva mai dezvoltat.

```js
function Foo(who){
  this.me = who;
}

Foo.prototype.identify = function(){
  return "I'm " + this.me;
}

var a1 = new Foo("a1");
var a2 = new Foo("a2");

a2.speak = function(){
  alert("Hello, " + this.identify() + ".");
};

a1.constructor === Foo;
a1.constructor === a2.constructor;
a1.__proto__ === Foo.prototype;
a1.__proto__ === a2.__proto_;
```

!["Moștenire clasică cu new"](Prototype.svg)

### Crearea unui obiect printr-o declarație literală

Un obiect poate fi creat foarte simplu folosind acoladele:

```js
var obiectNou = {};
```

Ce s-a întâmplat chiar în acest moment este o legătură prototipală la Object.

```js
var obiectNou = {};
obiectNou.__proto__.constructor // returnează: function Object()
```

### Crearea obiectelor cu Object.create()

Este o metodă a lui Object introdusă de ES5.
Permite atribuirea directă a unui prototip unui obiect eliberând prototipul de legătura cu, constructorul.

```js
var obiect;

obiect = Object.create(null);   // pasarea lui null conduce la crearea unui obiect nou

obiect = {};
// declararea unui obiect cu forma literală este echivalent cu expresia de mai jos care are același efect:
obiect = Object.create(Object.prototype);
```

Construirea unui prototip care să stea la baza unui nou obiect construit.

```js
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

```js
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

Object.create permite o implementare simplă a conceputului de „moștenire diferențială” în care obiectele sunt capabile să moștenească direct din alte obiecte. Vezi șablonul Objects Linked to Other Objects (OLOO) a lui Kyle Simpson.

Object.create are posibilitatea de a adăuga și în același timp configura proprietăți ale obiectului. Este de fapt un caz de șablon Prototype.

```js
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
