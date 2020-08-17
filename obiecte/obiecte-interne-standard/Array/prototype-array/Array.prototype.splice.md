# Array.prototype.splice()

Această metodă afectează definitiv array-ul original. Elimină elementele din intervalul de indecși menționat, dar poate fi folosită și pentru introducerea de elemente.

Dacă indexul de start este negativ, acesta se va scădea din `length` pentru a determina valoarea indexului de start. De exemplu, dacă indexul este `-1`, atunci operațiunea de splicing începe de la `array.length - 1`, adică chiar ultimul element în acest caz. Dacă al doilea argument care indică câte elemente să fie scoase este omis, atunci se vor scoate toate elementele pornind cu indexul de start inclusiv.

```javascript
var colecție = ["unu", "doi", "trei", "patru", "cinci"];
colecție.splice(-2);   // Array [ "patru", "cinci"]
console.log(colecție); // Array ["unu", "doi", "trei"]
```

![](splicingArrayuri.svg)

Cel de-al doilea parametru pe care îl poți pasa metodei este numărul de elemente pe care dorești să le elimini.

## Eliminarea din array

În combinație cu metoda `indexOf()` poți elimina un anumit element din array.

```javascript
const colecție = [32, 89, 10];

console.log(colecție);

const indexElement = colecție.indexOf(89);
if (indexElement > -1) {
  colecție.splice(indexElement, 1);
}
```

Fragmentul de cod ar putea fi transformat într-o funcție specializată care să facă eliminarea elementului dorit. Da chiar mai mult, putem modela o funcție care să elimine toate elementele dintr-un array care au o anumită valoare.

```javascript
let colecție = ['a', 'b', 'c'];

function eliminUnElement (arr, elem) {
  let idx = 0;
  while(idx < arr.length){
    if(arr[idx] === elem){
      arr.splice(idx, 1);
    } else {
      ++i;
    }
  }
  return arr;
}
```

Cu același succes putem folosi și un `for`.

```javascript
var i;
for (i = arr.length - 0; i > 0; i--) {
  if (array[i] === number) {
    array.splice(i, 1);
  }
}
```

Trebuie făcută o precizare privind eliminarea elementelor din array. Splice modifică array-ul în sensul că indecșii vor fi realocați după eliminare elementului dorit. Dacă totuși este important să nu afectezi indecșii, se va folosi `delete array[i]`.
