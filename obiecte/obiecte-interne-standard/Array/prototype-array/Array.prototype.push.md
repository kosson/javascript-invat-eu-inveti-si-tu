# `Array.prototype.push()` - afectează definitiv

Adaugă la finalul array-ului unu sau mai multe elemente.
ATENȚIE! Returnează noul `length` al array-ului.

## Formula `push.apply(arr1, arr2)`

Același efect îl poți obține folosind `apply()`.

## Fuzionarea a două array-uri al doilea în continuarea primlui

```javascript
var tabel1 = ['veverita', 'liliac'];
var tabel2 = ['fluture', 'cărăbuș'];

Array.prototype.push.apply(tabel1, tabel2);
console.log(tabel1); // Array [ "veverita", "liliac", "fluture", "cărăbuș" ]
```

Aceeași operațiune poate fi împlinită folosind operatorul spread:

```javascript
var tabel1 = ['veverita', 'liliac'];
var tabel2 = ['fluture', 'cărăbuș'];
tabel1.push(...tabel2);
console.log(tabel1); // Array [ "veverita", "liliac", "fluture", "cărăbuș" ]
```
