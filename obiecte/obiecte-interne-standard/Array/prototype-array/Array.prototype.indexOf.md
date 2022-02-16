# Array.prototype.indexOf()

Returnează primul index pentru primul element care se potrivește cu cel căutat. Dacă nu este găsit elementul căutat, este returnată valoarea `-1`.
Căutarea se face folosind egalitatea strictă ( `===` ). Se poate menționa și indexul de la care să se pornească căutarea.

```javascript
const array = [2, 9, 9];
array.indexOf(2);     // 0
array.indexOf(7);     // -1
array.indexOf(9, 2);  // 2
array.indexOf(2, -1); // -1
array.indexOf(2, -3); // 0
```

## Eliminarea elementelor repetitive

```javascript
const indices = [];
const array = ['a', 'b', 'a', 'c', 'a', 'd'];

let element = 'a';
let idx = array.indexOf(element);

while (idx != -1) {
  indices.push(idx);
  // inițiază o nouă căutare de la valoarea
  // următorului index de după cel găsit
  idx = array.indexOf(element, idx + 1);
};

console.log(indices); // [0, 2, 4]
```

O variantă mai simplă este în combinație cu `filter()`. Metoda `index()` returnează **primul index** găsit pentru un element și vor trece doar elementele a căror index are aceeași valoare cu indexul elementului în cauză.

```javascript
var x = [1, 2, 2, 4];
x.filter((item, index) => {
  console.log(item, index,x.indexOf(item), x.indexOf(item) == index);
  return x.indexOf(item) == index;
});
```

## Căutarea unui element în array, iar dacă nu există, introducerea acestuia

```javascript
function adaugLaArray (arrayDeOrigine, elementDeIntegrat) {
  if(arrayDeOrigine.indexOf(elementDeIntegrat) === -1){
    arrayDeOrigine.push(elementDeIntegrat);
  } else if (arrayDeOrigine.indexOf(elementDeIntegrat) > -1){
    console.log(elementDeIntegrat + ' deja există în colecție');
  }
};

const unelte = ["ciocan", "nicovală", "clești", "foarfeci"];

adaugLaArray(unelte, 'foale');
adaugLaArray(unelte, 'ciocan');

unelte; // Array [ "ciocan", "nicovală", "clești", "foarfeci", "foale" ]
```
