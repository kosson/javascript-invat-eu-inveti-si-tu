# for... in

Parcurge cheile unui obiect.

```js
var obj = {name: 'Ionel', varsta: 23, meserie: 'zugrav', creativ: true};
// var obj = ['Valeriu', 43, 'arhitect', true];

for (var prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log(obj[prop]);
  }
};
/**
 * Ionel
 * 23
 * zugrav
 * true
 */

```

Funcționează și cu array-urile pentru că, de fapt și array-urile sunt tratate ca niște obiecte.
