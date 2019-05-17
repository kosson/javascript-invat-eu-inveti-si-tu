# Object.values()

Este o metodă introdusă de ECMAScript 2017. Fiindu-i pasat un obiect, metoda va returna un array cu toate valorile proprietăților enumerabile ale unui obiect. Aceste proprietăți vor fi cele ale obiectului, nu și cele moștenite. Trebuie să fii avertizat de faptul că toate cheile simbol, dacă există vor fi ignorate neapărând în array-ul rezultat.

```javascript
const obi = {a: 10, b: true};
console.log(Object.values(obi)); // [10,true]
const arr = [10, true];
console.log(Object.values(arr)); // [10,true]
Object.values('ceva'); // ["c","e","v","a"]
```

Cu ajutorul acestei metode înlănțuită cu `entries()` vei obține un iterator pe care-l poți prelucra cu metodele specifice.

```javascript
var colectie = {unu: 1, doi: 2};
let iterator = Object.values(colectie).entries();
console.log(typof(iterator));
console.log(iterator.next()); // { value: [ 0, 1 ], done: false }
for ([key, val] of iterator) {
    console.log(val);    
}; // 2 (doar 2 petru că deja cursorul intern a trecut de prima valoare)
```