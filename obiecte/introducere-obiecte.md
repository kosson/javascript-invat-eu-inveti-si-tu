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
- O funcție apelată cu ```new``` în fața sa este un constructor:
  1. `contructor` (numeObiect.constructor) este o proprietate.
  2. apelarea unei funcții cu ```new``` în față este un constructor.
  3. metoda .constructor realizează legătura prototipală cu obiectul
  4. Funcție.prototype.constructor răspunde cu Funcție().
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
- Obiectele create cu `new Fnc()` și `Object.create(...)` nu li se atașează un `.constructor`. `.constructor` va trimite la funcția la care a fost atașat prototype la momentul declarării.
- Obiectele atunci când au metode, nu „dețin” sau „conțin” acele funcții, ci doar referințe către funcțiile pe post de metode. Funcțiile (metodele) nu fac parte din obiect; referința către acestea este parte a obiectului.


---

## Crearea obiectelor

1. var newObj = new Object();
2. var newObj = Object.create(null);
3. var newObj = Object.create(Object.prototype);
4. var newObj = {};

### Crearea obiectelor printr-o funcție cu rol de constructor și instanțiezi cu `new`

Mai este numită de o parte a programatorilor „moștenire clasică”. De fapt, este vorba tot despre moștenire prototipală, dar care face uz de un constructor (vezi și [Șablonul Constructor](../patterns/SabloaneDeCreare/Module/ModulePattern.md) ).

Acesta este modelul cel mai des întâlnit și acceptat ca practică istorică:
1. Creezi o funcție constructor (este o practică acceptată ca funcțiile constructor să aibă numele începând cu literă mare).
2. Adaugi metode la proprietatea `prototype` a funcției constructor.
3. Instanțiezi obiectul folosind cuvântul cheie `new`.

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

instanta.prop2();

instanta.salutNou = function(){
  console.log('Te ' + this.prop1 + ' iar');
};
```
