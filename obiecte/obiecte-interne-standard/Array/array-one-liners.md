# Expresii eficiente pe o singură linie pentru array-uri

## Medie aritmetică

```javascript
const media = arr => arr.reduce((a, b) => a + b) / arr.length;
```

## Elimină dublurile valorilor unui array

```javascript
const eliminaDuplicate = (arr) => [...new Set(arr)];
```

## Convertește string-uri la numere

```javascript
// varianta 1
const toNumbers = (arr) => arr.map(Number);
// varianta 2
const toNumbers = (arr) => arr.map((x) => +x);
```

## Compară două array-uri

```javascript
// a și b sunt două array-uri
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
```

Sau următoarea soluție

```javascript
const isEqual = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
```

Compară array-uri a căror elemente nu sunt sortate și pe care le poți reduce la seturi.

```javascript
const isEqual = (a, b) => JSON.stringify([...new Set(a)].sort()) === JSON.stringify([...new Set(b)].sort());
```

## Convertește array de obiecte la un singur obiect

```javascript
const toObject = (arr, key) => arr.reduce((a, b) => ({ ...a, [b[key]]: b }), {});
```

Altă soluție:

```javascript
const toObject = (arr, key) => Object.fromEntries(arr.map((it) => [it[key], it]));

// Exemplu
toObject([
{ id: '1', name: 'Alpha', gender: 'Male' },
{ id: '2', name: 'Bravo', gender: 'Male' },
{ id: '3', name: 'Charlie', gender: 'Female' }],
'id');
/*
{
'1': { id: '1', name: 'Alpha', gender: 'Male' },
'2': { id: '2', name: 'Bravo', gender: 'Male' },
'3': { id: '3', name: 'Charlie', gender: 'Female' }
}
*/
```

## Verifică dacă ai elemente

```javascript
const isNotEmpty = (arr) => Array.isArray(arr) && Object.keys(arr).length > 0;

isNotEmpty([]); // false
isNotEmpty([1, 2, 3]); // true
```

## Elimină valorile falsy din array

```javascript
const removeFalsy = (arr) => arr.filter(Boolean);
removeFalsy([0, 'a string', '', NaN, true, 5, undefined, 'another string', false]);
// ['a string', true, 5, 'another string']
```

## Verifică dacă array-ul este gol

```javascript
const isEmpty = (arr) => Array.isArray(arr) && !arr.length;
```

## Clonează un array

```javascript
const clone = (arr) => arr.slice(0);  // varianta 1
const clone = (arr) => [...arr];  // varianta 2
const clone = (arr) => Array.from(arr); // varianta 3
const clone = (arr) => arr.map((x) => x); // varianta 4
const clone = (arr) => JSON.parse(JSON.stringify(arr)); // varianta 5
const clone = (arr) => arr.concat([]);   // varianta 6
```

## Află de câte ori apare o valoare într-un array

```javascript
// prima metodă
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
// a doua metodă
const countOccurrences = (arr, val) => arr.filter((item) => item === val).length;
countOccurrences([1, 1, 1, 5, 5, 9], 1); // 3
```

## Constituie un sumator al aparițiilor unui element

```javascript
const countOccurrences = (arr) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});

// exemple
countOccurrences([1, 1, 3, 3, 2, 2]); // { '1': 2, '2': 2, '3': 2}
countOccurrences(['a', 'a', 'a', 'b', 'b', 'c']); // { 'a': 3, 'b': 2, 'c': 1 }
```

## Crearea unei liste de numere dintre două limite

```javascript
// prima metodă
const range = (min, max) => [...Array(max - min + 1).keys()].map((i) => i + min);
// a doua metodă
const range = (min, max) => Array(max - min + 1).fill(0).map((_, i) => min + i);
// a treia metodă
const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

range(11, 19); // [11, 12, 13, 14, 15, 16, 17, 18, 19]
```

## Realizarea produsului cartezian

```javascript
const cartesian = (...sets) => sets.reduce((acc, set) => acc.flatMap((x) => set.map((y) => [...x, y])), [[]]);

cartesian([5, 8], [5, 2]); // [ [5, 5], [5, 2], [8, 5], [8, 2] ]
```

## Găsește indexul valorii celei mai mari

```javascript
const indexOfMax = (arr) => arr.reduce((prev, curr, i, a) => (curr > a[prev] ? i : prev), 0);

indexOfMax([2, 4, 11, 8, 9]); // 2
```

## Găsește indexul valorii celei mai mici

```javascript
const indexOfMin = (arr) => arr.reduce((prev, curr, i, a) => (curr < a[prev] ? i : prev), 0);

indexOfMin([6, 4, 8, 2, 10]); // 3
```

## Găsește lungimea celui mai mare șir de caractere

```javascript
const findLongest = (words) => Math.max(...words.map((el) => el.length));

findLongest(['ceva', 'altceva', 'undeva']); // 7
```

## Caută o valoare maximă a unei proprietăți

```javascript
const maxBy = (arr, key) => arr.reduce((a, b) => (a[key] >= b[key] ? a : b), {});

const obi = [
  {nume: 'Alina', tokens: 10},
  {nume: 'Titi', tokens: 1},
  {nume: 'Vica', tokens: 32}
];
maxBy(obi, 'tokens'); // {nume: 'Vica', tokens: 32}
```

## Caută valoarea minimă a unei proprietăți

```javascript
const minBy = (arr, key) => arr.reduce((a, b) => (a[key] < b[key] ? a : b), {});

const obi = [
  {nume: 'Alina', tokens: 10},
  {nume: 'Titi', tokens: 1},
  {nume: 'Vica', tokens: 32}
];
minBy(obi, 'tokens'); // {nume: 'Titi', tokens: 1}
```

## Obține elementul după ce sari peste n

```javascript
const getNthItems = (arr, nth) => arr.filter((_, i) => i % nth === nth - 1);

// exemple
getNthItems([1, 2, 3, 4, 5, 6, 7, 8, 9], 2); // [2, 4, 6, 8]
getNthItems([1, 2, 3, 4, 5, 6, 7, 8, 9], 3); // [3, 6, 9]
```

## Obține valorile indicilor unei valori din array

```javascript
// prima metodă
const indices = (arr, value) => arr.reduce((acc, v, i) => (v === value ? [...acc, i] : acc), []);
// a doua metodă
const indices = (arr, value) => arr.map((v, i) => (v === value ? i : false)).filter(Boolean);

// exemple
indices(['h', 'e', 'l', 'l', 'o'], 'l'); // [2, 3]
indices(['h', 'e', 'l', 'l', 'o'], 'w'); // []
```

## Intersecția array-urilor cu valori numerice

```javascript
const getIntersection = (a, ...arr) => [...new Set(a)].filter((v) => arr.every((b) => b.includes(v)));

// exemple
getIntersection([1, 2, 3], [2, 3, 4, 5]); // [2, 3]
getIntersection([1, 2, 3], [2, 3, 4, 5], [1, 3, 5]); // [3]
```

## Obține union

```javascript
const union = (...arr) => [...new Set(arr.flat())];

union([1, 2], [2, 3], [3]); // [1, 2, 3]
```

## Generează ranking în funcție de valorile din array-uri

```javascript
const ranking = (arr) => arr.map((x, y, z) => z.filter((w) => w > x).length + 1);

// exemple
ranking([80, 65, 90, 50]); // [2, 3, 1, 4]
ranking([80, 80, 70, 50]); // [1, 1, 3, 4]
ranking([80, 80, 80, 50]); // [1, 1, 1, 4]
```

## Intrețeserea între elemente a unora noi

```javascript
const intersperse = (a, s) => [...Array(2 * a.length - 1)].map((_, i) => (i % 2 ? s : a[i / 2]));

intersperse(['A', 'B', 'C'], '/'); // ['A', '/', 'B', '/', 'C']
intersperse([<li>A</li>, <li>B</li>, <li>C</li>], <li>/</li>); // [<li>A</li>, <li>/</li>, <li>B</li>, <li>/</li>, <li>C</li>]
```

## Spargerea unui array în subseturi

```javascript
const chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);

chunk([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]
chunk([1, 2, 3, 4, 5, 6, 7, 8], 4); // [[1, 2, 3, 4], [5, 6, 7, 8]]
```

## Transpunerea unei matrice

```javascript
// metoda 1
const transpose = (matrix) => matrix[0].map((col, i) => matrix.map((row) => row[i]));
// metoda 2
const transpose = (matrix) => matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
// metoda 3
const transpose = (matrix) => matrix.reduce((prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i])), []);

transpose([
  [1, 2, 3], // [1, 4, 7],
  [4, 5, 6], // [2, 5, 8],
  [7, 8, 9], // [3, 6, 9],
]);
```

## Înlocuirea valorilor de la două indexuri

```javascript
// se presupune că `i` este mai mic decât `j`
const swapItems = (a, i, j) => (a[i] && a[j] && [...a.slice(0, i), a[j], ...a.slice(i + 1, j), a[i], ...a.slice(j + 1)]) || a;

swapItems([1, 2, 3, 4, 5], 1, 4); // [1, 5, 3, 4, 2]
```

## Unzip al array-urilor de array-uri

```javascript
const unzip = (arr) => arr.reduce((acc, c) => (c.forEach((v, i) => acc[i].push(v)), acc),Array.from({ length: Math.max(...arr.map((a) => a.length)) }, (_) => []));

unzip([['a', 1],['b', 2],['c', 3],['d', 4],['e', 5],]);
// [['a', 'b', 'c', 'd', 'e'], [1, 2, 3, 4, 5]]
```

## Zipping pe multiple array-uri

```javascript
const zip = (...arr) => Array.from({ length: Math.max(...arr.map((a) => a.length)) }, (_, i) => arr.map((a) => a[i]));

zip(['a', 'b', 'c', 'd', 'e'], [1, 2, 3, 4, 5]);
// [['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]
```

## Amestecarea elementelor - shuffling

Se folosește metoda `Math.random()` care întoarce un număr aleator în intervalul 0 - 1. În cazul în care metoda `random` returnează un număr mai mic decât 0.5, vei obține un număr negativ, iar dacă e peste, vei obține un număr pozitiv. Intervalul de lucru este -0.5 și +0.5.

```javascript
const shuffle = array => array.sort(() => 0.5-Math.random());
```

## Resurse

- [50 Essential Array Manipulation Methods for JS Devs (2022) | Jatin | Feb 24, 2022](https://javascript.plainenglish.io/50-essential-array-methods-for-js-devs-2022-b3bfbbb7013e)
