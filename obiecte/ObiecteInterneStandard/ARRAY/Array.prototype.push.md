# Array.prototype.push() - afectează definitiv

Adaugă la finalul array-ului unu sau mai multe elemente.
ATENȚIE! Returnează noul `length` al array-ului.

Același efect îl poți obține folosind `apply()`.

## Merging de array

```js
var tabel1 = ['veverita', 'liliac'];
var tabel2 = ['fluture', 'cărăbuș'];

Array.prototype.push.apply(tabel1, tabel2);
console.log(tabel1); // Array [ "veverita", "liliac", "fluture", "cărăbuș" ]
```
