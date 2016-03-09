# Obiecte

***JavaScript este un limbaj bazat pe moștenire prototipală - prototypal inheritance***

În JavaScript neexistând clase (cod care se comportă ca un plan pentru construcția obiectelor), pentru a reutiliza cod, se creează obiecte care se bazează pe cele existente.

Astfel, între aceste obiecte se creează o legătură. Această legătură se numește „legătură prototipală”. Aceste legături realizează „moștenirea prototipală” - prototypal inheritance. Obiectul preexistent constituie prototipul pentru cel nou creat care poate adăuga noi membri, noi comportamente.

---
## Mantre
- Mai întâi de orice este obiectul window.
- Obiectul window are o metodă numită Object [ function Object() ].
- Object.prototype este un obiect în care poți adăuga propriile proprietăți și metode.
- Nu există clase!
- Motorul Javascript construiește automat o metodă Obiect în obiectul window. Această metodă are un obiect foarte important care se numește prototype.
- În cazul tuturor funcțiilor, motorul JavaScript generează un obiect prototype (numeFunctie.prototype).
- Funcțiile sunt legate de obiectul prototip prin metoda .constructor.
- ***Funcțiile nu sunt cele care generează obiectul prototype***.
- Fiecare funcție are un obiect prototip diferit.
- Un obiect poate fi creat cu ```new Object()```:
  1. acestă modalitate **nu va crea și constructor**.
  2. Accesarea numeObiect.__proto__.constructor răspunde cu Obiect() la care s-a ajuns prin delegare.
- JavaScript are și obiecte deja în limbaj precum String(), Array(), Math(), Date() (```var test = new Date()```).
- O funcție apelată cu ```new``` în fața sa este un constructor:
  1. Punct contructor (.constructor) este o proprietate.
  2. apelarea unei funcții cu ```new``` în față este un constructor.
  3. metoda .constructor realizează legătura prototipală cu obiectul
  4. Funcție.prototype.constructor răspunde cu Funcție().
- Obiectele pot moșteni alte proprietăți direct din alte obiecte
- [[Prototype]], adică proprietatea .prototype este o legătură care se stabilește de la un obiect la altul.
- Legătura prototipală se obține legătura prin Object.create() și are două efecte:
  1. **creează un obiect**,
  2. **stabilește legătura prototipală**.
- Legătura prototipală se obține și prin efectul al doilea al folosirii cuvântului cheie ```new```.
- Legătura prototipală creează un lanț de delegare pentru cazurile în care nu găsești o proprietate sau o metodă într-un anumit context de execuție.
- Mecanismul pe care-l realizează .prototype este unul de delegare a cererii pentru referința unei proprietăți sau metode către un oiect mai sus pe lanțul prototipal către un alt obiect.
- Obiecte cu un prototip și proprietăți prestabilite, se pot contrui cu Object.create(UnObiect, {exemplu: 'proprietate'}):
  1. se realizează legătura prototipală la obiectul UnObiect.

---

## Crearea obiectelor prin funcție constructor

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

Atenție! Aici există ceva foarte important de lămurit. Proprietatea `prototype` aparține funcției constructor. În afară de această legătură vizibilă, care poate fi „întrebată”, mai există o legătură internă referită de standard ca [[Prototype]].

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

## Crearea unui obiect printr-o declarație literală

Un obiect poate fi creat foarte simplu astfel:

```js
var obiectNou = {};
```

Ce s-a întâmplat chiar în acest moment este o legătură prototipală la Object.

```js
var obiectNou = {};
obiectNou.__proto__.constructor // returnează: function Object()
```

## Crearea obiectelor cu Object.create()

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
  bar: "bar",
  foo: "foo"
},
instanta = Object.create( prototip );
```
