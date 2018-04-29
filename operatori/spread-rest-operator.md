# Operatorul rest/spread (`...`)

Acest operator produce confuzie pentru că se numește diferit în funcție de ce este pus să facă.
Este un operator nou introdus de ECMAScript 2015, fiind inspirat de CoffeeScript (operatorul *splats*), care la rândul său a fost adoptat din Ruby. Acest operator foarte util funcționează pentru toate obiectele care au implementat *protocolul de iterare*. Deci, tot ce este iterabil, poate fi folosit cu acest operator. Șirurile de caractere și array-urile sunt iterabile, adică intern au implementat protocolul de iterare.

Exemplul cel mai facil pentru o mică încălzire este să iei un șir de caractere și să-l transformi într-un array al caracterelor sale.

```javascript
var sir = "Am ceva";
var arr = [...sir];
// [ "A", "m", " ", "c", "e", "v", "a" ]
// inainte de acest operator apelam la split
var arr2 = sir.split("");
```

## Parametrii `rest`

Lista parametrilor unei funcții este într-un context (*assignment context*) care permite atribuirea valorilor venite prin argumentele pasate funcției. Operatorul `...` folosit într-un context de atribuire, strânge valorile într-un array. Dacă folosești un `rest parameter` împreună cu alte argumente care vor fi pasate individual, asigură-te că cele individuale stau primele, iar `rest`-ul este la final.

```javascript
function faCeva (a, ...argumentele) {
  console.log(argumentele);
};
faCeva(1,'a','b','c'); // Array [ "a", "b", "c" ]
```

Cunoscând deja faptul că și obiectul `arguments` colectează toate argumentele pasate unei funcții indiferent câte sunt acestea, te vei întreba pe bună dreptate la ce este bun un rest parameter. Utilitatea este că acest rest parameter pune la dispoziției un array *curat* cu argumentele pe care le va prelua, nu un obiect care are nevoie de o prelucrare supplimentară pentru a-l face array.

## Operatorul `spread`

Operatorul spread permite „desfacerea” (*spread* în limba română înseamnă a desface) unui array în elementele sale componente luate independent pentru a fi pasate unei funcții drept argumente. Acest operator folosește protocolul de iterare. Obiectul `arguments` are deja implementat protocolul de iterare în ECMAScript 2015.

```javascript
[..."012345"]
// la evaluare generează un array Array [ "0", "1", "2", "3", "4", "5" ]
[..."012345"].length // 6
```

Permite expadarea unei expresii în locuri în care argumente multiple sau elemente multiple sunt așteptate să existe.

```javascript
let obiecte = ['pixuri', 'creioane'];
let birou = ['lampă', ...obiecte, 'scaun', 'tușieră'];
birou; // Array [ "lampă", "pixuri", "creioane", "scaun", "tușieră" ]
```

Permite transformarea unor obiecte array-like precum `arguments` și `NodeList` în array-uri adevărate. Anterior existenței acestui operator, aceste transformări se făceau prin aplicarea secvențe `[].slice` cu un `call` pe obiect:

```javascript
Array.prototype.slice.call(obi);
// sau
[].slice.call(obi)
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

Sau atunci când ai mai multe array-uri și dorești să le combini.

```javascript
let ab = ["a","b"];
let bc = ["c","d"];
let abcde = [].concat(ab, bc, ["e"]);
//  [ "a", "b", "c", "d", "e" ]

// mai simplu
abcde = [...ab, ...bc, 'e'];
```

## Introducerea elementelor unui array printre elementele unuia existent

```javascript
let arrIntrodus = [1, 2, 3];
let arrGazda = [x, ...arrIntrodus, y, z];
```

## Copierea unui array

În versiunile anterioare, acest lucru se obținea folosind `[].slice()`.

```javascript
let arr1 = [1, 2, 3];
let arr2 = [...arr1]; // gata copia
```

Această copiere în cazul elementelor care sunt obiecte, se face prin referință.

## Transformarea argumentelor unei funcții într-un array

```javascript
function transforma () {
  return [...arguments];
};
transforma("unu", "doi", 3); // Array [ "unu", "doi", 3 ]

// alternativa este folosirea lui Array.from
function transforma () {
  return Array.from(arguments);
};
transforma("unu", "doi", 3); // Array [ "unu", "doi", 3 ]
```

## Constituirea unei colecții de elemente DOM

Acest lucru este posibil pentru că `NodeList` permite protocolul de iterare. Efectul este convertirea unui `NodeList` într-un Array.

```javascript
function colectDivs () {
  return [...document.querySelectorAll('div')];
};

// sau:
let divuri = [...document.querySelectorAll('div')];

// ca alternativă folosim Array.from
let divuri = Array.from(document.querySelectorAll('div'));
```

## Pasarea către metode ale obiectelor interne

```javascript
let numbers = [23, 400, 6, 1021];
Math.min(...numbers); // 6
```

## Folosirea cu metode ale lui Math

```javascript
let setNumere = [1, 3, 24];
Math.min(...setNumere); // 1
```
