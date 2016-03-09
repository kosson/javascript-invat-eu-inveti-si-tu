# Delegarea prototipală

JavaScript un mecanism clasic de moștenire așa cum este așteptat în cazul tipic al moștenirii unei clase copil a caracteristicilor clasei părinte, în fapt, o copiere a acestor caracteristici, după care se nu mai există nicio relație la instanțierea într-un obiect, nu există în JavaScript. De fapt, se poate vorbi de o „delegare comportamentală” și nu de o moștenire în sensul clasic. Obiectele stabilesc legături prototipale prin care se pot face delegări pe lanțul prototipal.

## Mantre

- [[Prototype]], adică proprietatea .prototype este o legătură care se stabilește de la un obiect la altul.
- Legătura prototipală se obține legătura prin Object.create() și are două efecte:
  1. **creează un obiect**,
  2. **stabilește legătura prototipală**.
- Legătura prototipală se obține și prin efectul al doilea al folosirii cuvântului cheie ```new```.
- Legătura prototipală creează un lanț de delegare pentru cazurile în care nu găsești o proprietate sau o metodă într-un anumit context de execuție.
- Mecanismul pe care-l realizează .prototype este unul de delegare a cererii pentru referința unei proprietăți sau metode către un obiect mai sus pe lanțul prototipal către un alt obiect.

```js
function Foo(who){
  this.me = who;
}

Foo.prototype.identify = function(){
  return "Eu sunt " + this.me;
}

function Bar(who){
  Foo.call(this, who);
}

Bar.prototype = Object.create(Foo.prototype);
// se creează legătura între prototipuri
// .constructor dispare și delegarea pentru .contructor se face la Foo()

Bar.prototype.speak = function(){
  alert("Salut " + this.identify() + ".");
}

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak();
b2.speak();
```

## Lanțul prototipal

![Delegare comportamentală simplă](Prototype.svg "Lanțul prototipal")

## Delegarea comportamentală

![Modelul delegării comportamentale](PrototypeExtindere.svg "Delegare comportamentală simplă")
