# Set

Set este răspunsul la necesitatea de a gestiona obiecte care să aibă *chei - valori* unice indiferent de tipul acestora. Privind printre ploapele aproape strânse, am putea aprecia că este un array în care toate elementele trebuie să fie unice.

Într-un `Set`, `null` este tratat ca `undefined`.

## Crearea unui obiect Set

Dacă este pasat un obiect iterabil, toate elementele vor fi adăugate la noul `Set`.

```javascript
const colectie = new Set([0, 1, 2, 3]);
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
