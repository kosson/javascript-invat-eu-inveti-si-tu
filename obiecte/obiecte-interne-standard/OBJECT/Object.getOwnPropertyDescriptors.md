# Object.getOwnPropertyDescriptors()

Este o metodă care returnează toți descriptorii unui anume obiect.
Are un singur parametru, obiectul pentru care se face investigația.

```javascript
function faCeva(){
  console.log("Referențiată doar.");
};

let obi = {
  prima: 10,
  aDoua: function(){console.log("Salut!");},
  aTreia: faCeva
};

Object.getOwnPropertyDescriptors(obi);
// Object { prima: Object, aDoua: Object, aTreia: Object }
```

Fiecare dintre obiectele indicate pentru proprietăți, conțin proprietăți ce „descriu” proprietatea obiectului.
De exemplu: prima: Object. Object va conține: `Object { value: 10, writable: true, enumerable: true, configurable: true }`.

```javascript
let x = Object.getOwnPropertyDescriptors(obi);
console.log(x.prima);
// Object { value: 10, writable: true, enumerable: true, configurable: true }
```
