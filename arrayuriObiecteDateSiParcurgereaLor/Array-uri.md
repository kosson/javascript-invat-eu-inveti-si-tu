# Generalități

Array-urile conțin mai multe valori numite elemente.
Indexarea internă a elementelor atunci când nu este explicită, pornește de la 0.

| valoare | el1 | el2 | el3 |
|---------|:---:|:---:|:---:|
| index   |  0  |  1  |  2  |

## Crearea array-urilor

### Folosind constructorul: ```new Array()```
```js
var tablou = new Array();
```

### Cu declararea simplă prin paranteze drepte: array literal
```js
var tablou = [];
```

## Mantre

- ``Array`` este un obiect global. Acesta este folosit pentru crearea array-urilor
- Array este un obiect iterabil pentru că obiectul prototip are o metodă @@iterator (precum String, TypedArray, Map și Set).

### Metode aplicabile obiectului array

| to               | încărcare/descărcare | extragere/încărcare | identificare    | parcurgere/mutații | altele       | creare       |
|:-----------------|:---------------------|:--------------------|:----------------|:-------------------|:-------------|:------------ |
| toSource()       | push()               | splice()            | lastIndexOf()   | map()              | copyWithin() | Array.from() |
| toString()       | pop()                | slice()             | indexOf()       | reduce()           |              | Array.of()   |
| toLocaleString() | shift()              | concat()            | find()          | reduceRight()      | entries()    | |
|                  | unshift()            |                     | findIndex()     | filter()           | includes()   | |
|                  | fill()               |                     | keys()          | some()             |              | |
|                  |                      |                     | Array.isArray() | every()            |              | |
|                  |                      |                     |                 | copyWithin()       |              | |

![](operatiuniArrayuri.svg)

#### Metoda slice

![](slicingArrayuri.svg)

#### Metoda splice

![](splicingArrayuri.svg)

#### Array.from()

Creează o instanță ``new Array`` din orice obiect care arată ca un array sau care iterabil.
Obiectele din care se creează array-urile trebuie să aibe o lungime și elemente indexate.

```js
function f() {
  return Array.from(arguments);
}

f(1, 2, 3);
// [1, 2, 3]

// String
Array.from("foo");                      
// ["f", "o", "o"]
```

#### Array.isArray()

Este testat un obiect pentru a vedea dacă este un array.

```js
var test = ['unu', 'doi', 'trei', 'patru'];
Array.isArray(test); // true
```

#### Array.of()

Metoda creează o instanță ``new Array`` cu un număr variabil de argumente indiferent de numărul sau tipul argumentelor.

Diferența dintre metoda Array.of() și constructorul Array este în felul în care sunt gestionate argumentele ca numere întregi. Array.of(42) creează un array cu un singur element în vreme ce Array(42) creează un array cu 42 de elemente.

#### Array.prototype.concat()

Realizează o „copie simplă” (shallow copy) formată din elementele array-ului asupra căruia se invocă metoda și elementele care se doresc a fi adăugate.

Elementele array-urilor originale sunt copiate în noul array format respectându-se următoarele reguli:
- în cazul obiectelor sunt copiate referințe către acestea, nu obiectele în sine. Dacă un obiect referențiat este modificat, se va reflecta în array-ul original și cel nou format.
- în cazul șirurilor și numerelor, acestea vor fi copiate în noul array. Modificarea valorilor din array-urile originale nu se vor răsfrânge în cel nou constituit.

![Array.prototype.concat()](ArrayConcat.svg)

#### Array.prototype.copyWithin()

Această metodă copiază o secvență de elemente din array și le inserează în același array la o poziție specificată suprascriind valorile existente.
Obiectele vor fi copiate începând de la indexul specificat de al doilea parametru cu limita menționată de cel de-al treilea parametru.
Cel de-al treilea argument este opțional și în lipsa lui secvența de valori va conține tot restul array-ului.

![Array.prototype.copyWithin() exemplificat](ArrayCopyWithin.svg)

#### Array.prototype.entries()

Returnează un obiect care poate fi iterat.

```js
var arr = ['a', 'b', 'c'];
var eArr = arr.entries();

console.log(eArr.next().value); // [0, 'a']
console.log(eArr.next().value); // [1, 'b']
console.log(eArr.next().value); // [2, 'c']
```

#### Array.prototype.every()

Metoda testează dacă elementele din array trec un test care e face printr-un callback.

Funcția de test poate primi trei argumente:
- valoarea curentă (obligatoriu) - elementul care este procesat,
- indexul (opțional) - indexul elementului care este procesat,
- array-ul pentru care ``every`` a fost invocat.

Pe lângă argumente, poate seta ``this`` diferit.

Metoda every execută callback-ul pentru fiecare element al array-ului până când returnează o valoare cu valoare de fals (falsy - valoare care transformată în Boolean este false). Odată întâlnit un astfel de element, every va returna ``false`` imediat. Callback-ul va fi invocat doar pentru elementele care au valori.

``every`` nu modifică array-ul pentru care este apelată.

```js
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
```

#### Array.prototype.fill()

Umple un array cu o valoare fixă.

```js
[1, 2, 3].fill(4);               // [4, 4, 4]
[1, 2, 3].fill(4, 1);            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
[1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
[1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
Array(3).fill(4);                // [4, 4, 4]
```

#### Array.prototype.find()

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

#### Array.prototype.findIndex()

Este returnat indexul unui element al array-ului dacă elementul din array satisface anumite condiții de test.
În caz contrar, adică elementul nu este găsit, este returnat -1.

```js
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].findIndex(isPrime)); // -1, not found
console.log([4, 6, 7, 12].findIndex(isPrime)); // 2
```

#### Array.prototype.lastIndexOf()

Returnează ultimul index al unui element căutat în array. Returnează -1 dacă elementul nu există.
Opțional se poate menționa un al doilea parametru care indică indexul de unde să se facă căutarea pornind dinspre coadă.
Din start acest parametru opțional este lungimea array-ului -1.

```js
var array = [2, 5, 9, 2];
array.lastIndexOf(2);     // 3
array.lastIndexOf(7);     // -1
array.lastIndexOf(2, 3);  // 3
array.lastIndexOf(2, 2);  // 0
array.lastIndexOf(2, -2); // 0
array.lastIndexOf(2, -1); // 3
```

Găsirea tuturor indicilor la care apare valoarea căutată

```js
var indices = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.lastIndexOf(element);
while (idx != -1) {
  indices.push(idx);
  idx = (idx > 0 ? array.lastIndexOf(element, idx - 1) : -1);
}

console.log(indices);
// [4, 2, 0]
```

#### Array.prototype.forEach()

Execută o funcție pentru fiecare element din array.
Funcția care va fi executată poate avea trei argumente:
- currentValue; elementul din array care este procesat,
- index; indexul elementului din array care este procesat,
- array; array-ul pentru care se aplică forEach().

Opțional se mai poate pasa o valoare care să reprezinte ``this`` la executarea callback-ului.

Metoda nu poate fi înlănțuită (chainable).
Spre deosebire de map() și reduce() returnează întotdeauna ``undefined``.

```js
function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element);
}

// Notice that index 2 is skipped since there is no item at
// that position in the array.
[2, 5, , 9].forEach(logArrayElements);
// logs:
// a[0] = 2
// a[1] = 5
// a[3] = 9
```

#### Array.prototype.includes()

Metoda verifică dacă într-un array există un anume element returnând true sau false după caz.
Se poate menționa și indexul de la care să se facă căutarea.

```js
[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
```

#### Array.prototype.indexOf()

Returnează primul index pentru primul element care se potrivește cu cel căutat.
Dacă nu este găsit, este returnat -1.
Căutarea se face folosind egalitatea strictă ( === ).
Se poate menționa și indexul de la care să se facă căutarea.

```js
var array = [2, 9, 9];
array.indexOf(2);     // 0
array.indexOf(7);     // -1
array.indexOf(9, 2);  // 2
array.indexOf(2, -1); // -1
array.indexOf(2, -3); // 0
```

Caută și scoate unde apare și se repetă un element.

```js
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

Căutarea unui element în array, iar dacă nu există, introducerea acestuia

```js
function updateVegetablesCollection (veggies, veggie) {
    if (veggies.indexOf(veggie) === -1) {
        veggies.push(veggie);
        console.log('New veggies collection is : ' + veggies);
    } else if (veggies.indexOf(veggie) > -1) {
        console.log(veggie + ' already exists in the veggies collection.');
    }
}

var veggies = ['potato', 'tomato', 'chillies', 'green-pepper'];

updateVegetablesCollection(veggies, 'spinach'); // New veggies collection is : potato,tomato,chillies,green-papper,spinach
updateVegetablesCollection(veggies, 'spinach'); // spinach already exists in the veggies collection.
```

#### Array.prototype.join()

Concatenează elementele unui array într-un string a cărui carater de separare poate fi setat.

```js
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();      // assigns 'Wind,Rain,Fire' to myVar1
var myVar2 = a.join(', ');  // assigns 'Wind, Rain, Fire' to myVar2
var myVar3 = a.join(' + '); // assigns 'Wind + Rain + Fire' to myVar3
var myVar4 = a.join('');    // assigns 'WindRainFire' to myVar4
```

#### Array.prototype.map()

Metoda creează un nou array care cuprinde rezultatele rezultate din executarea unei funcții callback pentru fiecare dintre elementele acestuia.

Callback-ul primește trei argumente:
- currentValue - elementul procesat,
- index,
- array.

Opțional se mai poate pasa o valoare care să reprezinte ``this`` la executarea callback-ului.

``map()`` construiește un array nou din rezultate.

Callback-ul este invocat doar pentru indexurile care au valori chiar dacă sunt `undefined`.


## Menționarea resurselor folosite pentru documentare:
[MDN>Web technology for developers>JavaScript>JavaScript reference>Standard built-in objects>Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray)
