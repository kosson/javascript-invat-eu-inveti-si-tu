# Set

Set este răspunsul la necesitatea de a gestiona obiecte care să aibă chei - valori unice indiferent de tipul acestora.

Într-un `Set`, `null` este tratat ca `undefined`.

Dacă este pasat un obiect iterabil, toate elementele vor fi adăugate la noul `Set`.

```javascript
const colectie = new Set([0, 1, 2, 3]);
```

## Metode

### Set.prototype.add(valoare)

Valoarea nu este opțională, dar acest lucru este logic pentru că vrei să introduci noi elemente în setul unic.

```javascript
const colectieValoriUnice = new Set();
colectieValoriUnice.add('unu');
// metoda permite înlănțuirea
colectieValoriUnice.add(1).add('I');
console.log(colectieValoriUnice);
// Set [ "unu", 1, "I" ]
```

Reține faptul că un `Set` este o colecție de elemente unice. Încercarea de a introduce un element care deja există va avea drept efect ignorarea lui. Se pot adăuga chiar și obiecte. Reține faptul că poți adăuga orice.

```javascript
const colectieUnica = new Set();
colectieUnica.add({a: 'este a', b: true}).add({x: 10});
console.log(colectieUnica); // Set [ Object, Object ]
```

### Set.prototype.size

Această proprietate va oferi un număr care spune câte elemente sunt în set.

### Set.prototype.delete(valoare)

Metoda `delete()` are nevoie de valoare. Returnează valoarea `true` dacă elementul există și a fost eliminat. În caz contrar, va fi returnat `false`. În cazul în care dorești să ștergi un obiect care există în set, se poate aplica `forEach()` pe set.

```javascript
colectieUnica.forEach(function (element) {
  if(element.x === 10){
    colectieUnica.delete(element);
  }
});
```

### Set.prototype.forEach(callbackFn\[, thisArg])

Această metodă va executa o funcție cu rol de callback pentru fiecare element din `Set`. Opțional se poate trimite un al doilea argument și anume un obiect care să fie considerat a fi `this` de fiecare dată când funcția se execută.

Funcția callback se va apela cu următoarele argumente:

-   valoarea element din set,
-   cheia elementului și
-   setul care va fi traversat.

Într-un obiect `Set` nu există chei, dar pentru a fi asigurată compatibilitatea cu `forEach`, intern există un mecanism de evidență folosit în mod similar lui `Map` și lui `Array`.

Dacă nu este pasat un obiect care să fie folosit drept `this`, atunci este pasat automat `undefined`.

### Set.prototype.clear()

Șterge tot conținutul setului.

### Set.prototype.entries()

Folosirea acestei metode are drept rezultat un iterator care conține un array cu toate valorile din `Set` în ordinea în care au fost introduse de forma \[valoare, valoare].

```javascript
var setNou = new Set(['unu', 1, true]);
var iteratorObj = setNou.entries();
console.log(iteratorObj.next().value); // Array [ "unu", "unu" ]
console.log(iteratorObj.next().value); // Array [ 1, 1 ]
console.log(iteratorObj.next().value); // Array [ true, true ]
```

### Set.prototype.has(valoare)

Metoda este folosită pentru a verifica dacă există o valoare în setul țintit. Este returnat `true`, în caz contrar este returnat `false`.

### Set.prototype.values()

Fiecare `next()` va aduce rând pe rând elementele din set.

```javascript
const iteratorObjNou = setNou.values();
console.log(iteratorObjNou.next().value); // unu
```

## Cazuri de utilizare

### Transformarea într-un array

Folosind `Array.from(setVizat)` se poate obține un array dintr-un `Set`.

```javascript
const unice = new Set(['ceva', 'altceva']);
const arr = Array.from(unice);
```

### Generarea unui array cu valori unice

În cazul în care ai un array care poate avea și elemente duplicat, poți genera un nou array doar cu elementele unice.

```javascript
const ArrayUnic = [...new Set(unArray)];
```

### Array ca subset al altuia

Acest exemplu se folosește de dimensiunea lui `Set`. Dacă array-ul de control există în cel țintit, dimensiunea nu se va modifica.

```javascript
const isSubset = (a, b) => (new Set(b)).size === (new Set(b.concat(a))).size;
```

### Verifică dacă este superset

Un set poate fi considerat a fi un *superset* al altuia dacă acesta conține toate elementele celuilalt.

```javascript
function isSuperset(setVerificat, subset) {
  let element;
  for (element of subset) {
    if (!setVerificat.has(element)) {
      return false;
    }
  }
  return true;
}
let set1 = new Set([1, 2, 3]),
    set2 = new Set([2, 3]);
isSuperset(set1, set2); // true
```

### Intersecția seturilor

Uneori este util să afli care este intersecția seturilor.

```javascript
function setIntersectie (set1, set2) {
  let intersectie = new Set(set1);
  let element;
  for (element of set2) {
    intersectie.add(element);
  }
  return intersectie;
}
let set1 = new Set([1, 2, 3, 4, 5]),
    set2 = new Set(['a', 'b']);
setIntersectie(set1, set2); // Set { 1, 2, 3, 4, 5, 'a', 'b' }
```

### Diferența

Sunt multe ocaziile în care ai nevoie să afli care sunt elementele care nu sunt într-un set comparativ cu unul cu care faci comparația.

```javascript
function diferentaIntreSeturi (set1, set2) {
  let diferenta = new Set(set1);
  let element;
  for (element of set2) {
    diferenta.delete(element);
  }
  return diferenta;
}
let set1 = new Set([1, 2, 3, 4, 5]),
    set2 = new Set([2, 'a', 'b']);
diferentaIntreSeturi(set1, set2); //Set { 1, 3, 4, 5 }
```

## Parcurgerea unui Set

### Iterarea cu `for`

Este cel mai simplu mod de a afișa toate elementele:

```javascript
for (let element of setNou) {
  console.log(element);
}; // unu 1 true
```

O altă metodă de a parcurge setul este să te folosești de iterator:

```javascript
for (let element of setNou.values()) {
  console.log(element);
}; // unu 1 true
```

Poți transforma un un set într-un iterator folosid metoda `entries()`.

```javascript
let cheie, valoare;
for ([cheie, valoare] of setNou.entries()) {
  console.log(cheie)
}; // unu 1 true
```

### Set cu elemente unice dintr-un Array

Există posibilitatea ca la un moment dat să parcurgi programatic un text din care să extragi o submulțime de cuvinte după anumite criterii. Există posibilitatea ca aceste cuvinte să se repete în array-ul nou constituit. Ar fi nevoie în acest scenariu să se constituie un `Set` inițial de cuvinte la care în timp să se poată adăuga altele.
`Set` va excela la acest capitol.

```javascript
const subset = ['pădure', 'tăiere', 'inactivitate', 'pădure', 'inactivitate', 'deșertificare', 'tăiere'];
const unice = [...new Set(subset)];
console.log(unice);
// [ "pădure", "tăiere", "inactivitate", "deșertificare" ]
```

Acest caz conduce și la concluzia că în orice moment ai putea folosi un `Set` pentru a testa dacă toate valorile unui array sunt identice:

```javascript
const areEqual = arr => new Set(arr).size === 1;
```

## map / reduce / filter

Un `Set` nu oferă posibilitatea de a prelucra datele setului folosind `map`, `reduce` și `filter`, dar se poate transforma un set într-un array folosind operatorul spread.

```javascript
const setNou = new Set(['a', 10, 'altceva']);
const rez = [...setNou].filter(e => e == 10); // [10]
```

Pentru a transforma un `Set` într-un array pe care să se poată aplica metodele array-urilor, putem folosi și `Array.from(numeSet)`.

## Resurse

- [Check if all items in an array are equal](https://1loc.dev/#check-if-all-items-in-an-array-are-equal)
- [Check if an array is subset of other array](https://1loc.dev/#check-if-an-array-is-subset-of-other-array)
- [ES6 — Set vs Array — What and when?](https://medium.com/front-end-weekly/es6-set-vs-array-what-and-when-efc055655e1a)
