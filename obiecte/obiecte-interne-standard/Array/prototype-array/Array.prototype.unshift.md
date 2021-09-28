# Array.prototype.unshift()

Această metodă modifică array-ul original, introducând un element sau mai multe începând de la indexul 0 al acestuia. Metoda `unshift()` poate fi aplicată pe orice structură de tip array folosind metodele `call` sau `apply`.

Pentru a introduce elemente în *capul* array-ului existent, se vor pasa drept parametru noile elemente. Metoda returnează lungimea noului array format.

```javascript
var arr1 = ['a', 'b', 'c'];
var lungimeaNoua = arr1.unshift(0, 1, 2);
console.log(arr1); // [0, 1, 2, 'a', 'b', 'c']
console.log(lungimeaNoua); // 6
```

Trebuie remarcat că ori de câte ori vom folosi metoda, indecșii elementelor array-ului nou vor fi modificați la momentul în care sunt adăugate elementele. Pur și simplu se petrece o deplasare a indecșilor astfel încât primul element va fi primul din setul introdus.

## Introducerea unui array întreg

În practică, înainte de apariția operatorui trei puncte (*spread*), această metodă era folosită pentru a introduce elementele unui array în capul unuia existent. Pentru a realiza acest lucru, se apela la metoda `apply`.

```javascript
var arr1 = ['a', 'b', 'c'];
var x = arr1;
var arr2 = ['x', 'y', 'z'];
Array.prototype.unshift.apply(arr1, arr2); // ['x', 'y', 'z', 'a', 'b', 'c']
console.log(arr1 === x); //true
```

Acest lucru este simplificat prin folosirea operatorului trei puncte (*spread*). Există o diferență între cele două metode. Folosirea metodei `unshift`, va modifica array-ul original, pe când operatorul trei puncte, va crea unul nou pe care îl va lega la identificatorul original. Acest lucru poate fi testat rapid, dacă vom face o altă referință către același array.

```javascript
var arr1 = ['a', 'b', 'c'];
var x = arr1; // fă o referință către același array
var arr2 = ['x', 'y', 'z'];
arr1 = [...arr2, ...arr1];
console.log(arr1); // ['x', 'y', 'z', 'a', 'b', 'c']
console.log(x); // ['a', 'b', 'c']
console.log(arr1 === x); // false
```

## Referințe:

- [A better way to concatenate arrays | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#A_better_way_to_concatenate_arrays)
