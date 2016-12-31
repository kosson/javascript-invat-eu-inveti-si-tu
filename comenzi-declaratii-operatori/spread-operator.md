Este un operator ECMAScript 2015

Acest operator folosește protocolul de iterare ceea ce înseamnă că obiectele pe care dorim să le transformăm, trebuie să aibe implementat @@iterator prin intermediul lui Symbol.iterator. `arguments` are deja implementat protocolul de iterare în ECMAScript 2015.

Permite expadarea unei expresii în locuri în care argumente multiple sau elemente multiple sunt așteptate să existe.

```js
var obiecte = ['pixuri', 'creioane'];
var birou = ['lampă', ...obiecte, 'scaun', 'tușieră'];
birou; // Array [ "lampă", "pixuri", "creioane", "scaun", "tușieră" ]
```

Permite transformarea unor obiecte array-like precum `arguments` și `NodeList` în array-uri adevărate.
Anterior existenței acestui operator, aceste transformări se făceau cu prin aplicarea lui slice cu un call:

```js
Array.prototype.slice.call();
```

## Transformarea argumentelor unei funcții într-un array:

```js
function transforma(){
  return [...arguments];
};
transforma("unu","doi",3); // Array [ "unu", "doi", 3 ]

// alternativa este folosirea lui Array.from
function transforma(){
  return Array.from(arguments);
};
transforma("unu","doi",3); // Array [ "unu", "doi", 3 ]
```

## Constituirea unei colecții de elemente DOM

Acest lucru este posibil pentru că `NodeList` permite protocolul de iterare. Efectul este convertirea unui `NodeList` într-un Array.

```js
function colectDivs(){
  return [...document.querySelectorAll('div')];
};

// sau:
var divuri = [...document.querySelectorAll('div')];

// ca alternativă folosim Array.from
var divuri = Array.from(document.querySelectorAll('div'));
```

## Pasarea către metode ale obiectelor interne

```js
let numbers = [23, 400, 6, 1021];
Math.min(...numbers); // 6
```

## Alternative

Se poate folosi cu succes operatorul rest

```js
function genereazaUnArrayDinArgs(...argumente){
  return argumente; // Array [ "ceva", 0, true ]
};
genereazaUnArrayDinArgs("ceva", 0, true);
```
