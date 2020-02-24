# Operatorul rest/spread (`...`)

Acest operator produce confuzie pentru că se numește diferit în funcție de ce este pus să facă.
Este un operator nou introdus de ECMAScript 2015, fiind inspirat de CoffeeScript (operatorul *splats*), care la rândul său a fost adoptat din Ruby. Acest operator foarte util funcționează pentru toate obiectele care au implementat *protocolul de iterare*. Deci, tot ce este iterabil, poate fi folosit cu acest operator. Șirurile de caractere și array-urile sunt iterabile, adică, intern au implementat protocolul de iterare.

Exemplul cel mai facil pentru o mică încălzire este să iei un șir de caractere și să-l transformi într-un array al caracterelor sale folosind operatorul în rolul lor de spread.

```javascript
var sir = "Am ceva";
var arr = [...sir];
// [ "A", "m", " ", "c", "e", "v", "a" ]
// inainte de acest operator apelam la split
var arr2 = sir.split("");
```

## Parametrii `rest`

Lista parametrilor unei funcții se află într-un context (*assignment context*), care atribuie valori venite la momentul invocării funcției. Operatorul `...` folosit într-un context de atribuire, strânge valorile într-un array. Dacă folosești un `rest parameter` împreună cu alte argumente care vor fi pasate individual, asigură-te că cele individuale stau primele, iar operatorul este la final.

```javascript
function faCeva (a, ...argumentele) {
  console.log(argumentele);
};
faCeva(1,'a','b','c'); // Array [ "a", "b", "c" ]
```

Cunoscând deja faptul că și obiectul `arguments` colectează toate argumentele pasate unei funcții indiferent câte sunt acestea, te vei întreba pe bună dreptate la ce este bun un rest parameter. Utilitatea este că acest rest parameter pune la dispoziției un array *curat* cu argumentele pe care le va prelua, nu un obiect care are nevoie de o prelucrare supplimentară pentru a-l face array.

## Operatorul `spread`

Operatorul spread permite *desfacerea* (*spread*) unui array în elementele sale componente care mai apoi sunt introduse ca proprietăți ale obiectului în al cărui context este invocat. Poți spune că folosești operatorul spread pentru a *extrage* valorile dintr-un array sau un obiect.
De exemplu, poate fi utilizat în headerul unei funcții pentru a introduce valorile unui array sau obiect ca argumente ale funcției. Acest operator folosește protocolul de iterare. Obiectul `arguments` are deja implementat protocolul de iterare în ECMAScript 2015.

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

Permite transformarea unor obiecte array-like precum `arguments` și `NodeList` în array-uri adevărate. Anterior existenței acestui operator, aceste transformări se făceau prin aplicarea secvenței `[].slice` cu un `call` pe obiect:

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

## Copierea array-urilor și a obiectelor

În versiunile anterioare, acest lucru se obținea folosind tot `[].slice()`.

```javascript
let arr1 = [1, 2, 3];
let arr2 = [...arr1]; // gata copia
```

Această copiere în cazul elementelor care sunt obiecte, se face prin referință.
Atunci când este nevoie, poți face și o copie a unui obiect.

```javascript
let obi = {
  a: 1,
  b: 2
};
let oby = {...obi};
console.log(oby); // Object { a: 1, b: 2 }
let o = [...obi]; // TypeError: obi is not iterable
```

Trebuie observat faptul că nu poți introduce proprietățile unui obiect ca elemente ale unui array.

## Pasarea valorilor unui array drept argumente

Veți aprecia cu siguranță posibilitatea de a pasa toate valorile dintr-un array unei funcții ca argumente. Este un mecanism foarte util care simplifică foarte mult fluxul de prelucrare a unor calupuri de date folosind funcțiile.

```javascript
const colectie = [1, 2];
function facCeva () {
  console.log(arguments[0], arguments[1]);
};
facCeva(...colectie); // 1 2
```

## Transformarea argumentelor unei funcții într-un array

De foarte multe ori veți avea nevoie să convertiți structura de date `arguments` a unei funcții, într-un array asupra căruia să puteți aplica metodele specifice de transformare și manipulrea a datelor.

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

Acest lucru este posibil pentru că `NodeList` permite protocolul de iterare. Colecțiile `NodeList` sunt obținute prin folosirea selectorului `document.querySelectorAll('.clasă')`. Efectul este convertirea unui `NodeList` într-un Array.

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

Folosirea operatorului se poate dovedi foarte elegantă pentru că elimină necesitatea de a folosi o buclă cu care să iterezi elementele unui array.

```javascript
let numbers = [23, 400, 6, 1021];
Math.min(...numbers); // 6
```
