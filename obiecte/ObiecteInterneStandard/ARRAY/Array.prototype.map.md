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

Opțional se mai poate pasa o valoare care să reprezinte `this` la executarea callback-ului.

## Mantre

- `map()` construiește un array nou din rezultate
- Callback-ul este invocat doar pentru indexurile care au valori chiar dacă sunt `undefined`
- Callbackul poate fi și o metodă a unui obiect intern standard al JavaScript

## Construcția unui mapper de la 0

Pentru a înțelege felul în care funcționează intern funcția map, este foarte util să construim de la 0 un utilitar care să facă exact același lucru precum map din prototipul lui Array.

```js
var colectie = ["prima", "a doua", "a treia", "a doua", "prima"];

function mapper(array, callback){
  var mapate = [];                        // array-ul care va conține datele prelucrate
  for(var i = 0; i < array.length; i++){  // pentru fiecare element al array-ului pasat ca parametru
    mapate.push(callback(array[i]));      // trimite în array-ul nou valoarea rezultată din prelucrarea făcută în callback
  };
  return mapate;                          // returnează array-ul
};

var rezultatMapat = mapper(colectie, function(element){ // ia o colecție și un callback
  return element + ' prelucrare';                       // returnează valoarea prelucrată
});

console.log(rezultatMapat);

// Array [ "prima prelucrare", "a doua prelucrare", "a treia prelucrare", "a doua prelucrare", "prima prelucrare" ]
```

## Exemplificare a posibilităților de prelucrare

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
