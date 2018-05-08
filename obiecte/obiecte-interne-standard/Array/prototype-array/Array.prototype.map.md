# Array.prototype.map()

Metoda creează un nou array fără a-l modifica pe cel original. Noul array cuprinde valorile rezultate din executarea unei funcții callback pentru fiecare dintre elemente. Această metodă împreună cu `filter()` și `reduce()` sunt baza programării funcționale (stil de programare bazat pe folosirea funcțiilor).

Metoda `map()` are doi parametri:

-   callback-ul și
-   `this`

Callback-ul primește trei argumente:

-   currentValue - elementul procesat,
-   index,
-   și array-ul în sine.

Noul array constituit are fix același număr de elemente cu cel original.

## Anatomie

Vă mai aduceți aminte de rima copilăriei *cei patru Evangheliști erau trei: Luca și Matei*. Cam așa ai putea privi și aplicarea lui `map()` sau *maparea* așa cum au calchiat mulți programatori români. Sunt două mecanisme esențiale în lucru: funcția callback și setarea legăturii lui `this`. În jocul de-a *maparea*, lucrăm cu elementele din array pentru care facem niște operațiuni.

```javascript
// ceva foarte rapid
[2, 4, 6].map( (numar) => numar * 2 );
// [ 4, 8, 12 ]
```

Cel de-al doilea este `this` poate fi setat la alt obiect ale cărui date vrem să le folosim în contextul nostru de prelucrare.

```javascript
const obi = {id: 'primo', colectie: [1, 'primul', true]};
const obix = {id: 'secundo', colectie: ['ceva', 1000, true]};
obi.colectie.map( function test (elem, index, array) {
 console.log(`elem: ${elem}; context: ${this.id}`);
}, obix);
// Cu arrow function, nu poți seta this - va fi undefined
obi.colectie.map( (elem, index, array) => console.log(`elem: ${elem}; context: ${this.id}`), obix);
```

La executarea callback-ului, `this` a fost setat la cel de-al doilea obiect.

## Mantre

-   `map()` construiește un array nou din rezultate
-   Callback-ul este invocat doar pentru indexurile care au valori chiar dacă sunt `undefined`
-   Callback-ul poate fi și o metodă a unui obiect intern standard al JavaScript

## Construcția unui mapper de la 0

Pentru a înțelege felul în care funcționează intern funcția `map()`, este foarte util să construim de la 0 un utilitar care să facă exact același lucru precum map din prototipul lui Array.

```javascript
const colectie = ["prima", "a doua", "a treia", "a doua", "prima"];

function mapper (array, callback) {
  let mapate = [];                        // array-ul care va conține datele prelucrate
  for(let i = 0; i < array.length; i++){  // pentru fiecare element al array-ului pasat ca parametru
    mapate.push(callback(array[i]));      // trimite în array-ul nou valoarea rezultată din prelucrarea făcută în callback
  };
  return mapate;                          // returnează array-ul
};

const rezultatMapat = mapper (colectie, function(element) {
  // ia o colecție și un callback
  return element + ' prelucrare'; // returnează valoarea prelucrată
});

console.log(rezultatMapat);

// Array [ "prima prelucrare", "a doua prelucrare", "a treia prelucrare", "a doua prelucrare", "prima prelucrare" ]
```

O variantă mai simplă de mapper:

```javascript
function mapper (functie, array) {
  let rezultat = [];
  for(let element of array){
    rezultat.push( functie(element) );
  };
  return rezultat;
};
```

Și ceva mai avansat care folosește recursivitatea:

```javascript
let arr = [1, 2, 3], func = (el) => ++el ;
function mapper (func, arr) {
  if(arr.length === 0){
    return [];
  };
  return [func([arr[0]])].concat(mapper(func, arr.slice(1)));
}; mapper(func, arr); // [ 2, 3, 4 ]
```

## Exemplificarea posibilităților de prelucrare

### Transformarea unui obiect într-un șir url-encoded

Un exemplu super privind ce se poate obține folosind metoda este construirea unui mic utilitar care să transforme valorile unui obiect într-un șir url-encoded.

```javascript
const obiect = {paraunu: "unu", paradoi: "doi trei"};

const stringCodat = Object.keys(obiect)
                        .map( function (key) {
                          return key + "=" + window.encodeURIComponent(obiect[key]);
                        })
                        .join("&");

console.log(stringCodat); // paraunu=unu&paradoi=doi%20trei
```

### Transformarea unor primitive

Callbackul poate fi și o metodă a unui obiect intern standard:

```javascript
const numereIntregi = [-2, 4, -23, 34];
console.log(numereIntregi.map(Math.abs)); //Array [ 2, 4, 23, 34 ]
```

### Extragerea unui array dintr-o colecție de obiecte.

```javascript
const colectie = [
  {"nume": "Iulius", "id": 1},
  {"nume": "Alequin", "id": 2}
];

const nume = colectie.map(element => element.nume);
console.log(nume); // Array [ "Iulius", "Alequin" ]
```

### Folosirea metodelor obiectelor interne operând valori din obiecte

```javascript
const colectie = [
  {"nume": "Iulius", "id": 1},
  {"nume": "Alequin", "id": 2}
];
const nume = colectie.map(element => element.nume);
console.log(nume.map(String.toLowerCase)); // Array [ "iulius", "alequin" ]
// echivalentul ar fi fost declararea callback-ului astfel: console.log(nume.map(unNume => unNume.toLowerCase()));
```

`console.log(nume.map(String.toLowerCase));` funcționează pentru că metodei map nu-i pasă cum îi pasezi funcția.

### Maparea valoare cu valoare din două array-uri diferite

Metoda map trimite trei argumente callback-ului:

-   elementul curent pe care se lucrează
-   cheia elementului
-   și array-ul întreg.

Pentru acest fapt se poate realiza împerecherea elementelor din două array-uri diferite:

```javascript
const stanga  = ['Ileana', 'Anca'],
      dreapta = [21, 43];

// în acest moment luăm array-ul stânga,
// îl parcurgem element cu element și pentru fiecare element,
// vom crea un obiect a cărui valori pentru proprietăți sunt chiar valorile din array-urile mapate.
const colectie = stanga.map( (elem, index) => ({nume: elem, varsta: dreapta[index]}) );

console.log(JSON.stringify(colectie));
// [{"nume":"Ileana","varsta":21},{"nume":"Anca","varsta":43}]
// s-au folosit paranteze pentru că altfel `{}` ar fi indicat blocul de cod
```
