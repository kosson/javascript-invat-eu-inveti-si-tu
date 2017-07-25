# `Array.prototype.indexOf()`

Returnează primul index pentru primul element care se potrivește cu cel căutat.
**Dacă nu este găsit, este returnat `-1`**.
Căutarea se face folosind egalitatea strictă ( === ).
Se poate menționa și indexul de la care să se facă căutarea.

```javascript
var array = [2, 9, 9];
array.indexOf(2);     // 0  --> este returnat indexul 0
array.indexOf(7);     // -1 --> nu a fost găsit, returnează -1
array.indexOf(9, 2);  // 2
array.indexOf(2, -1); // -1
array.indexOf(2, -3); // 0
```

## Caută și elimină elementul acolo unde apare și se repetă.

```javascript
var indices = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.indexOf(element);
while (idx != -1) {
  indices.push(idx);
  idx = array.indexOf(element, idx + 1);
}
console.log(indices);
// [0, 2, 4]
```

## Căutarea unui element în array, iar dacă nu există, introducerea acestuia

```javascript
function adaugLaArray(arrayDeOrigine, elementDeIntegrat){
  if(arrayDeOrigine.indexOf(elementDeIntegrat) === -1){
    arrayDeOrigine.push(elementDeIntegrat);
  } else if (arrayDeOrigine.indexOf(elementDeIntegrat) > -1){
    console.log(elementDeIntegrat + ' deja există în colecție');
  }
};

var unelte = ["ciocan", "nicovală", "clești", "foarfeci"];

adaugLaArray(unelte, 'foale');
adaugLaArray(unelte, 'ciocan');

unelte; // Array [ "ciocan", "nicovală", "clești", "foarfeci", "foale" ]
```
