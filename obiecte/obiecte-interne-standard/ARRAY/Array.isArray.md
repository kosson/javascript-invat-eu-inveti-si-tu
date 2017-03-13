# Array.isArray()

Metoda este folosită pentru a vedea dacă valoarea pasată este un array.

```js
var test = ['unu', 'doi', 'trei', 'patru'];
Array.isArray(test); // true
```

Returnează true dacă valoarea pasată este array și false dacă nu.

```js
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
// Array.prototype este în sine un array
Array.isArray(Array.prototype);
```
