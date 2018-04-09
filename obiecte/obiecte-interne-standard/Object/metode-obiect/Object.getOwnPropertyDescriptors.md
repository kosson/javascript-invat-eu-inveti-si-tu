# Object.getOwnPropertyDescriptors(obiectul)

Metoda este introdusă de versiunea standardului ECMAScript din 2017.

Este o metodă care returnează toți descriptorii pentru toate proprietățile unui anume obiect. Aici ne referim doar la proprietățile care aparțin obiectului care nu au fost moștenite prin lanțul prototipal.
Primește ca parametru obiectul în sine pentru care returnează un obiect descriptiv care include cheile și drept proprietăți, un alt obiect cu descrierea fiecăreia dintre acestea: `value`, `writable`, `enumerable` și `configurable`.

```javascript
function faCeva () {
  console.log("referință");
};

const obi = {
  prima: 10,
  aDoua: function () {console.log("Salut!");},
  aTreia: faCeva
};

Object.getOwnPropertyDescriptors(obi);
//{"prima":{"value":10,"writable":true,"enumerable":true,"configurable":true},"aDoua":{"writable":true,"enumerable":true,"configurable":true},"aTreia":{"writable":true,"enumerable":true,"configurable":true}}
```

Dacă dorești să obții detaliile pestru o singură proprietate, vei folosi proprietatea soră `Object.getOwnPropertyDescriptor` căruie îi poți pasa numele cheii drept al doilea parametru.

```javascript
Object.getOwnPropertyDescriptor(obi, 'aDoua');
// Object { value: aDoua(), writable: true, enumerable: true, configurable: true }
```

Fiecare dintre obiectele indicate conțin proprietăți ce **descriu** proprietățile obiectului.
De exemplu, în `prima: Object`. Object va conține: `Object { value: 10, writable: true, enumerable: true, configurable: true }`.

Unul din avantajele utilizării acestei metode este că vor fi indicați și getterii/setterii dacă obiectul are accesori.

```javascript
const obi = {
  a: 1,
  get ceva () {
    return this.a;
  },
  set ceva (valoare) {
    this.a = valoare;
  }
};
Object.getOwnPropertyDescriptors(obi);
/*
​a: Object { value: 1, writable: true, enumerable: true, … }
ceva: {​​
  configurable: true​​
  enumerable: true​​
  get: function ceva()​​
  set: function ceva()
}
 */
```

## Copierea unui obiect

Împreună cu `getPrototypeOf` instrumentat de `Object.create()`, se poate face o copie *subțire* (*shallow copy*) a unui obiect.

```javascript
Object.create(
  Object.getPrototypeOf(obi),
  Object.getOwnPropertyDescriptors(obi)
);
```
