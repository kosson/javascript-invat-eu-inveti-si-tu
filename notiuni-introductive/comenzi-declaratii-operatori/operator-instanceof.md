# `instanceof`

Acest operator testează dacă în lanțul prototipal al unui obiect se află proprietatea `prototype` a unui constructor.

```javascript
function EX(){};
var obiX = new EX();

Object.getPrototypeOf(obiX); // prototype este Object
console.log(EX.prototype); // prototype este tot Object

Object.getPrototypeOf(obiX) === EX.prototype; // true

obiX instanceof EX;     // true
obiX instanceof Object; // true

EX.prototype instanceof Object; // true
EX.prototype; // răspunde cu Object, dar, atenție, nu este Object.prototype
EX.prototype instanceof Object.prototype; // false
```

Dacă este nevoie poți seta proprietatea `prototype` la un obiect diferit de cel implicit care este `Object` ce conține doar constructorul.

```javascript
EX.prototype = {};
```

Nu uita că portotipul unui obiect se mai poate seta și cu `Object.setPrototypeOf(obiectul)`.

## Mantre

- Un obiect literal are prototype `undefined`. Cu toate acestea la interogare cu instanceof trimite la Object.
