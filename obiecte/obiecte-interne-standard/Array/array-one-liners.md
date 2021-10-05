# Expresii eficiente pe o singură linie pentru array-uri

## Medie aritmetică

```javascript
const media = arr => arr.reduce((a, b) => a + b) / arr.length;
```

## Elimină dublurile valorilor unui array

```javascript
const eliminaDuplicate = (arr) => [...new Set(arr)];
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

## Verifică dacă lista este goală

```javascript
const isNotEmpty = (arr) => Array.isArray(arr) && Object.keys(arr).length > 0;

isNotEmpty([]); // false
isNotEmpty([1, 2, 3]); // true
```
