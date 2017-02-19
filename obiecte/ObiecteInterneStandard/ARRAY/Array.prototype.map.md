# Array.prototype.map()

Metoda creează un nou array care cuprinde valorile rezultate din executarea unei funcții callback pentru fiecare dintre elementele unui array căruia i se aplică.
Pentru fiecare element din array, se execută funcția iar rezultatul devine un element al unui nou array. `map()` împreună cu `filter()` și `reduce()` sunt baza programării funcționale (stil de programare bazat pe folosirea funcțiilor).

`map()` are doi parametri:
- callback-ul și
- `this`

Callback-ul primește trei argumente:
- currentValue - elementul procesat,
- index,
- și array-ul în sine.

Noul array constituit are fix același număr de obiecte precum cel prelucrat.

## Anatomie

```js
let colectie = [1, 'primul', true];
colectie.map(function test(elem, index, array){
  console.log(typeof elem + ' ' + 'index: ' + index + ' ' + array + this);
});

/*
number index: 0 1,primul,true[object Window]
string index: 1 1,primul,true[object Window]
boolean index: 2 1,primul,true[object Window]
 */
```

```js
let obi = {id: 'obiect 1', colectie: [1, 'primul', true]};
obi.colectie.map(function test(elem, index, array){
  console.log('context: ' + this.id + ' ' + typeof elem + ' ' + 'index: ' + index + ' ' + array + this);
});
/*
context: undefined number index: 0 1,primul,true[object Window]
context: undefined string index: 1 1,primul,true[object Window]
context: undefined boolean index: 2 1,primul,true[object Window]
 */
 let obi = {id: 'primo', colectie: [1, 'primul', true]};
 let obix = {id: 'secundo', colectie: ['ceva', 1000, true]};
 obi.colectie.map(function test(elem, index, array){
   console.log('context: ' + this.id + ' ' + typeof elem + ' ' + 'index: ' + index + ' ' + array + this);
 }, obix);
/*
context: secundo number index: 0 1,primul,true[object Object]
context: secundo string index: 1 1,primul,true[object Object]
context: secundo boolean index: 2 1,primul,true[object Object]
 */
```

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

O variantă mai simplă de mapper:

```javascript
function mapper(functie, array){
  let rezultat = [];
  for(let element of array){
    rezultat.push(functie(element));
  };
  return rezultat;
};
```

Și ceva mai avansat care folosește recursivitatea:

```javascript
let arr = [1, 2, 3], func = (el) => ++el ;
function mapper(func, arr){
  if(arr.length === 0){return [];};
  return [func([arr[0]])].concat(mapper(func, arr.slice(1)));
}; mapper(func, arr); // [ 2, 3, 4 ]
```

## Exemplificare a posibilităților de prelucrare

### Transformarea unui obiect într-un șir url-encoded

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

### Transformarea unor primitive

Callbackul poate fi și o metodă a unui obiect intern standard:

```js
var numereIntregi = [-2, 4, -23, 34];
console.log(numereIntregi.map(Math.abs)); //Array [ 2, 4, 23, 34 ]
```

### Extragerea unui array dintr-o colecție de obiecte.

```js
var colectie = [
  {"nume": "Iulius", "id": 1},
  {"nume": "Alequin", "id": 2}
];

var nume = colectie.map(element => element.nume);
console.log(nume); // Array [ "Iulius", "Alequin" ]
```

### Folosirea metodelor obiectelor interne operând valori din obiecte

```js
var colectie = [
  {"nume": "Iulius", "id": 1},
  {"nume": "Alequin", "id": 2}
];
var nume = colectie.map(element => element.nume);
console.log(nume.map(String.toLowerCase)); // Array [ "iulius", "alequin" ]
// echivalentul ar fi fost declararea callback-ului astfel: console.log(nume.map(unNume => unNume.toLowerCase()));
```

`console.log(nume.map(String.toLowerCase));` funcționează pentru că metodei map nu-i pasă cum îi pasezi funcția.

### Maparea valoare cu valoare din două array-uri diferite

Metoda map trimite trei argumente callback-ului:
- elementul curent pe care se lucrează
- cheia elementului
- și array-ul întreg.

Pentru acest fapt se poate realiza o împerechiere a elementelor din două array-uri diferite:

```js
var stanga  = ['Ileana', 'Anca'],
    dreapta = [21, 43];

// în acest moment luăm array-ul stânga,
// îl parcurgem element cu element și pentru fiecare element,
// vom crea un obiect a cărui valori pentru proprietăți sunt chiar valorile din array-urile mapate.
var colectie = stanga.map( (elem, index) => ({nume: elem, varsta: dreapta[index]}) );

console.log(JSON.stringify(colectie)); // [{"nume":"Ileana","varsta":21},{"nume":"Anca","varsta":43}]
// s-au folosit paranteze pentru că altfel `{}` ar fi indicat blocul de cod
```

### Aplicarea unei funcții pentru fiecare element dintr-un array
