# Expresii pe o singură linie

## Verifică dacă două obiecte au aceleași proprietăți

Pentru a verifica dacă obiectele au aceleași proprietăți, obiectele sunt reduse la șiruri de caractere create folosind `JSON.stringify`.

```javascript
let isEqual = (...objects) => obiecte.every((obj) => {
  JSON.stringify(obj) === JSON.stringify(objects[0]);
});

isEqual({a:1},{a:1}); //true
```

## Obiect din array de array-uri

```javascript
// prima opțiune
const toObj = (arr) => Object.fromEntries(arr);
// a doua opțiune
const toObj = (arr) => arr.reduce((a, c) => ((a[c[0]] = c[1]), a), {});

toObj([
  ['a', true],
  ['b', 10]
]); // {a: true, b: 10}
```

## Extragerea unei valori dintr-un array de obiecte

În cazul în care este nevoie să creezi un array cu valorile extrase dintr-un array de obiecte, care conțin o proprietate a cărui valoare este dorită, se va face mapping pe fiecare obiect din array.

```javascript
const pluck = (objs, property) => objs.map((obj) => obj[property]);
pluck([
  {ceva: 1},
  {ceva: true},
  {ceva: 'undeva'}
], 'ceva'); // [1, true, 'undeva']
```

## Redenumirea cheilor unui obiect

Pentru a redenumi cheile unui obiect, trebuie să ai contituit un obiect cu numele noilor chei drept valori ale celor existente care stau drept chei. Cheia redenumirii este folosirea operatorului spread care prepopulează obiectul returnat cu toate valorile pentru fiecare iterație anterioară, plus înlocuirea pe cheia curentă.

```javascript
const renameKeys = (keysMap, obj) => Object.keys(obj).reduce((acc, key) => ({
   ...acc,
   ...{ [keysMap[key] || key]: obj[key] }
}), {});

const obj = { a: 1, b: 2, c: 3 };
const keysMap = { a: 'd', b: 'e', c: 'f' };
renameKeys(keysMap, obj); // { d: 1, e: 2, f: 3 }
```

## Inversarea cheilor cu valorile

```javascript
// prima modalitate
const invert = (obj) => Object.keys(obj).reduce((res, k) => Object.assign(res, { [obj[k]]: k }), {});
// a doua
const invert = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));

invert({ a: '1', b: '2', c: '3' }); // { 1: 'a', 2: 'b', 3: 'c' }
```

## Omiterea unui subset de proprietăți

```javascript
const omit = (obj, keys) => Object.keys(obj).filter((k) => !keys.includes(k)).reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {});

omit({ a: '1', b: '2', c: '3' }, ['a', 'b']); // { c: '3' }
```

## Extrage un subset de proprietăți

```javascript
const pick = (obj, keys) => Object.keys(obj).filter((k) => keys.includes(k)).reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {});

pick({ a: '1', b: '2', c: '3' }, ['a', 'b']); // { a: '1', b: '2' }
```

## Elimină proprietățile care au valori null sau undefined

```javascript
// method 1
const removeNullUndefined = (obj) => Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});
// method 2
const removeNullUndefined = (obj) => Object.entries(obj).filter(([_, v]) => v != null).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
// method 3
const removeNullUndefined = (obj) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
```

## Sortare după numele proprietății

```javascript
const sort = (obj) => Object.keys(obj).sort().reduce((p, c) => ((p[c] = obj[c]), p), {});
```

## Sumarizează numărul obiectelor în funcție de o proprietate

```javascript
const countBy = (arr, prop) => arr.reduce((prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev), {});

// Exemplu
countBy([
{ branch: 'audi', model: 'q8', year: '2019' },
{ branch: 'audi', model: 'rs7', year: '2020' },
{ branch: 'ford', model: 'mustang', year: '2019' },
{ branch: 'ford', model: 'explorer', year: '2020' },
{ branch: 'bmw', model: 'x7', year: '2020' },
],
'branch');
// { 'audi': 2, 'ford': 2, 'bmw': 1 }
```

## Grupează un array de obiecte după o cheie comună specificată

```javascript
const groupBy = (arr, key) => arr.reduce((acc, item) => ((acc[item[key]] = [...(acc[item[key]] || []), item]), acc), {});

groupBy([
  { brand: 'iphone', model: '11 pro', year: '2019' },
  { brand: 'samsung', model: 's11', year: '2019' },
  { brand: 'iphone', model: '13 pro', year: '2021' },
  { brand: 'samsung', model: 's5', year: '2015' },
  { brand: 'blackberry', model: 'radar', year: '2021' }
], 'brand');
/*
{
  iphone: [
    { brand: 'iphone', model: '11 pro', year: '2019' },
    { brand: 'iphone', model: '13 pro', year: '2021' }
  ],
  blackberry: [
    { brand: 'blackberry', model: 'radar', year: '2021' }
  ],
  samsung: [
    { brand: 'samsung', model: 's11', year: '2019' },
    { brand: 'samsung', model: 's5', year: '2015' }
  ]
}
*/
```

## Sortarea unui array după o valoare

```javascript
const sortBy = (arr, k) => arr.concat().sort((a, b) => (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0));

const people = [
  { name: 'James', age: 42 },
  { name: 'Charlie', age: 24 },
  { name: 'Fiona', age: 36 },
  { name: 'Buzz', age: 32 }
];
```

## Resurse

- [50 Essential Array Manipulation Methods for JS Devs (2022) | Jatin | Feb 24, 2022](https://javascript.plainenglish.io/50-essential-array-methods-for-js-devs-2022-b3bfbbb7013e)
