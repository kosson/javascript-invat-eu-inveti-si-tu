# `Object.getOwnPropertyDescriptors(obiectul)`

Metoda este introdusă de versiunea standardului ECMAScript din 2017.

Este o metodă care returnează toți descriptorii pentru toate proprietățile unui anume obiect. Aici ne referim doar la proprietățile care aparțin obiectului și nu au fost moștenite prin lanțul prototipal.
Primește ca parametru obiectul în sine pentru care returnează un obiect descriptiv care include cheile și drept proprietăți, un alt obiect cu descrierea fiecăreia dintre acestea: `value`, `writable`, `enumerable` și `configurable`.

```javascript
function faCeva(){
  console.log("referință");
};

var obi = {
  prima: 10,
  aDoua: function(){console.log("Salut!");},
  aTreia: faCeva
};

Object.getOwnPropertyDescriptors(obi);
//{"prima":{"value":10,"writable":true,"enumerable":true,"configurable":true},"aDoua":{"writable":true,"enumerable":true,"configurable":true},"aTreia":{"writable":true,"enumerable":true,"configurable":true}}
```

Fiecare dintre obiectele indicate pentru proprietăți, conțin proprietăți ce „descriu” proprietatea obiectului.
De exemplu: prima: Object. Object va conține: `Object { value: 10, writable: true, enumerable: true, configurable: true }`.

```javascript
let x = Object.getOwnPropertyDescriptors(obi);
console.log(x.prima);
// { value: 10, writable: true, enumerable: true, configurable: true }
```

Împreună cu `getPrototypeOf` instrumentat de `Object.create`, se poate face o copie (*shallow copy*) a unui obiect.

```javascript
Object.create(
  Object.getPrototypeOf(obi),
  Object.getOwnPropertyDescriptors(obi)
);
```
