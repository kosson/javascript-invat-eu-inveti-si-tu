# Array.prototype.find()

Returnează valoarea căutată într-un array, dacă un element al array-ului satisface condițiile unei funcții de test. Dacă nu este găsit, este returnat undefined.

Funcția de test poate primi trei argumente:
- elementul care este procesat,
- indexul elementului care este procesat,
- array-ul pentru care ``find`` a fost invocat.

Pe lângă argumente, poate seta ``this`` diferit.

Nu modifică array-ul pentru care este apelată metoda.

```js
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
