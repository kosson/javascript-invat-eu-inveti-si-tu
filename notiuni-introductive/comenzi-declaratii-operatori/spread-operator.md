# Operatorul spread (`...`)

Este un operator nou introdus de ECMAScript 2015.

**Parametrii rest** se deosebesc de **operatorul spread**.

Parametrii rest permit agregarea mai multor argumente independente într-un array.

```javascript
function ex(primul, ...multiAltii){
  console.log(`Primul argument ${primul} și un array: ${multiAltii}`);
}; ex(1, 2, 3, 4, 5); // Primul argument 1 și un array: 2,3,4,5
```

Operatorul spread permite „desfacerea” (destructurarea) unui array în elementele sale componente luate independent pentru a fi pasate unei funcții.

```javascript
var colectie = ['cooperare', 'independență', 'acceptare'];
function ex(primul, ...multime){
  console.log(primul, `${multime}`);
}; ex(1, colectie); // 1 cooperare,independență,acceptare
```

Acest operator folosește protocolul de iterare ceea ce înseamnă că obiectele pe care dorim să le transformăm, trebuie să aibe implementată metoda internă `@@iterator` prin intermediul lui Symbol.iterator. `arguments` are deja implementat protocolul de iterare în ECMAScript 2015.

```javascript
[..."012345"]
// la evaluare generează un array Array [ "0", "1", "2", "3", "4", "5" ]
[..."012345"].length // 6
```

Permite expadarea unei expresii în locuri în care argumente multiple sau elemente multiple sunt așteptate să existe.

```js
var obiecte = ['pixuri', 'creioane'];
var birou = ['lampă', ...obiecte, 'scaun', 'tușieră'];
birou; // Array [ "lampă", "pixuri", "creioane", "scaun", "tușieră" ]
```

Permite transformarea unor obiecte array-like precum `arguments` și `NodeList` în array-uri adevărate.
Anterior existenței acestui operator, aceste transformări se făceau cu prin aplicarea lui `slice` cu un `call`:

```js
Array.prototype.slice.call();
```

## Combinarea array-urilor

Adăugarea elementelor unui array la unul preexistent.

```javascript
primulArray.push(...alDoileaArray);
```

Adăugarea elementelor unui array înaintea celor dintr-un array care are nevoie de această mutare.

```javascript
primulArray.unshift(...alDoileaArray);
```

## Introducerea elementelor unui array printre elementele unuia existent

```javascript
var arrIntrodus = [1, 2, 3];
var arrGazda = [x, ...arrIntrodus, y, z];
```

## Copierea unui array

În versiunile anterioare, acest lucru se obținea folosind `[].slice()`.

```javascript
var arr1 = [1, 2, 3];
var arr2 = [...arr1]; // gata copia
```

Această copiere în cazul elementelor care sunt obiecte, se face prin referință.

## Transformarea argumentelor unei funcții într-un array

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

## Folosirea cu metode ale lui Math

```javascript
let setNumere = [1, 3, 24];
Math.min(...setNumere); // 1
```
