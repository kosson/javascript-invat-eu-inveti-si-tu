# JavaScript este un limbaj bazat pe moștenire prototipală - prototypal inheritance
---
## Mantre
- Mai întâi de orice este obiectul window.
- Obiectul window are o metodă numită Object [ function Object() ].
- Object.prototype este un obiect în care poți adăuga propriile proprietăți și metode.
- Nu există clase!
- Motorul Javascript construiește automat o metodă Obiect în obiectul window. Această metodă are un obiect foarte important care se numește prototype.
- În cazul tuturor funcțiilor, motorul JavaScript generează un obiect prototype (numeFunctie.prototype).
- Funcțiile sunt legate de obiectul prototip prin metoda .constructor. Funcție.prototype.constructor răspunde cu Funcție().
- Funcțiile nu sunt cele care generează obiectul prototype.
- Fiecare funcție are un prototype object diferit.
- Un obiect poate fi creat cu ```new Object()```. Acestă modalitate **nu va crea și construtor**. Accesarea numeObiect.__proto__.constructor răspunde cu Obiect() la care s-a ajuns prin delegare.
- JavaScript are și obiecte deja în limbaj precum String(), Array(), Math(), Date() (```var test = new Date()```).
- O funcție apelată cu ```new``` în fața sa este un constructor. Punct contructor (.constructor) este o proprietate, dar apelarea unei funcții cu ```new``` în față este un constructor.
- Obiectele pot moșteni alte proprietăți direct din alte obiecte
- [[Prototype]], adică proprietatea .prototype este o legătură care se stabilește de la un obiect la altul.
- Legătura prototipală se obține legătura prin Object.create() și are două efecte:
  1. **creează un obiect**,
  2. **stabilește legătura prototipală**.
- Legătura prototipală se obține și prin efectul al doilea al folosirii cuvântului cheie ```new```.
- Legătura prototipală creează un lanț de delegare pentru cazurile în care nu găsești o proprietate sau o metodă într-un anumit context de execuție.
- Mecanismul pe care-l realizează .prototype este unul de delegare a cererii pentru referința unei proprietăți sau metode către un oiect mai sus pe lanțul prototipal către un alt obiect.

## Model

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

## Object.create()

Este o metodă a lui Object introdusă de ES5.
Permite atribuirea directă a unui prototip unui obiect eliberând prototipul de legătura cu, constructorul.
