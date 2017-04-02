# Array.prototype.find()

Returnează valoarea căutată într-un array. Dacă un element al array-ului satisface condițiile unei funcții de test (callback), elementul căutat este returnat. Dacă nu este găsit, este returnat `undefined`.

Funcția de test poate primi trei argumente:
- elementul care este procesat,
- indexul elementului care este procesat,
- array-ul pentru care `find` a fost invocat.

Pe lângă argumente, poate seta legătura la un alt context (`this`).

Nu modifică array-ul pentru care este apelată metoda.

```javascript
var inventory = [
  {name: 'apples', quantity: 2},
  {name: 'bananas', quantity: 0},
  {name: 'cherries', quantity: 5}
];

function findCherries(fruit) {
  return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }
```

Un alt exemplu foarte simplu:

```javascript
let colectie = [23, 43, 123, 93, 234, 964];

let pesteLimitaPrimul = colectie.find(element => element > 93);     // cauta primul element conform criteriului
let pesteLimitaIndex = colectie.findIndex(element => element > 93); // aduce indexul primului element conform criteriului
console.log(pesteLimita, pesteLimitaIndex);                         // 123 2
```

Mozilla MDN propune spre exemplificare un tester pentru prime:

```javascript
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].find(isPrime)); // undefined, not found
console.log([4, 5, 8, 12].find(isPrime)); // 5
```
