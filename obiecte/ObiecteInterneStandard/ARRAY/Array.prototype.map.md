# Array.prototype.map()

Metoda creează un nou array care cuprinde rezultatele rezultate din executarea unei funcții callback pentru fiecare dintre elementele acestuia.
Pentru fiecare element din array, se execută funcția iar rezultatul devine un element al unui nou array. `map()` împreună cu `filter()` și `reduce()` sunt baza programării funcționale (stil de programare bazat pe folosirea funcțiilor).

`map()` are doi parametri:
- callback-ul și
- `this`

Callback-ul primește trei argumente:
- currentValue - elementul procesat,
- index,
- array.

Opțional se mai poate pasa o valoare care să reprezinte ``this`` la executarea callback-ului.

## Mantre

- ``map()`` construiește un array nou din rezultate
- Callback-ul este invocat doar pentru indexurile care au valori chiar dacă sunt `undefined`
- Callbackul poate fi și o metodă a unui obiect intern standard al JavaScript

Un exemplu super privind ce se poate obține folosind metoda este construirea unui mic utilitar care să transforme valorile unui obiect într-un șir url-encoded.

```js
var obiect = {paraunu: "unu", paradoi: "doi trei"};

var stringCodat = Object.keys(obiect)
                        .map(function(key){
                          return key + "=" + window.encodeURIComponent(obiect[key]);
                        })
                        .join("&");

console.log(stringCodat); // paraunu=unu&paradoi=doi%20trei
```

Callbackul poate fi și o metodă a unui obiect intern standard:

```js
var numereIntregi = [-2, 4, -23, 34];
console.log(numereIntregi.map(Math.abs)); //Array [ 2, 4, 23, 34 ]
```
