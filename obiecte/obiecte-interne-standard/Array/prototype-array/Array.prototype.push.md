# Array.prototype.push()

Această metodă modifică array-ul original. Adaugă la finalul array-ului unu sau mai multe elemente. Atenție, returnează noul `length` al array-ului.

Același efect îl poți obține folosind formula `push.apply(arr1, arr2)`.

Fuzionarea a două array-uri al doilea în continuarea primului

```javascript
var tabel1 = ['veverita', 'liliac'];
var tabel2 = ['fluture', 'cărăbuș'];

Array.prototype.push.apply(tabel1, tabel2);
console.log(tabel1); // Array [ "veverita", "liliac", "fluture", "cărăbuș" ]
```

Aceeași operațiune poate fi îndeplinită folosind operatorul spread:

```javascript
var tabel1 = ['veverita', 'liliac'];
var tabel2 = ['fluture', 'cărăbuș'];
tabel1.push(...tabel2);
console.log(tabel1); // Array [ "veverita", "liliac", "fluture", "cărăbuș" ]
```
