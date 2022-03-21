# Operatorul rest/spread (`...`)

Acest operator produce confuzie pentru că se numește diferit în funcție de ce este pus să facă.
Este un operator nou introdus de ECMAScript 2015, fiind inspirat de CoffeeScript (operatorul *splats*), care la rândul său a fost adoptat din Ruby. Acest operator foarte util funcționează pentru toate obiectele care au implementat *protocolul de iterare*. Deci, tot ce este iterabil, poate fi folosit cu acest operator. Șirurile de caractere și array-urile sunt iterabile, adică, intern au implementat protocolul de iterare.

Exemplul cel mai facil pentru o mică încălzire este să iei un șir de caractere și să-l transformi într-un array al caracterelor sale folosind operatorul în rolul *spread*.

```javascript
let sir = "Am ceva",
    arr = [...sir];
// [ "A", "m", " ", "c", "e", "v", "a" ]
// inainte de acest operator apelam la split
let arr2 = sir.split("");
```

## Parametrii `rest`

Lista parametrilor unei funcții se află într-un context (*assignment context*), care atribuie valori venite la momentul invocării funcției. Operatorul `...` folosit într-un context de atribuire, strânge valorile într-un array. Dacă folosești un `rest parameter` împreună cu alte argumente care vor fi pasate individual, asigură-te că cele individuale stau primele, iar operatorul este la final.

```javascript
function faCeva (a, ...argumentele) {
  console.log(argumentele);
};
faCeva(1,'a','b','c'); // Array [ "a", "b", "c" ]
```

Cunoscând deja faptul că și obiectul `arguments` colectează toate argumentele pasate unei funcții indiferent câte sunt acestea, te vei întreba pe bună dreptate la ce este bun un *rest parameter*. Utilitatea este că pune la dispoziție un array *curat* cu argumentele pe care le va prelua, nu un obiect *array like* care are nevoie de o prelucrare supplimentară pentru a-l transforma în array.

Pentru a reține mai repede rolul ne gândim că în limba engleză, cuvântul `rest` înseamnă, printre altele, partea care rămâne din ceva. Am putea calchia și spune în limba română că e restul din ceva ori ce-a mai rămas. Putem spune că ceea ce vine drept argumente și nu are corespondent în parametrii declarați, bagă-le pe toate într-un array.

Un alt caz foarte util este cel al destructurării array-urilor atunci când extragi câteva elemente începând cu indexul 0, iar restul le păstrezi într-un nou array.

```javascript
let [prima, ...restul] = [1,2,3,4];
console.log(prima, restul); // 1 [ 2, 3, 4 ]
let [prima, ...restul, x] = [1,2,3,4];
console.log(prima, restul, x); // SyntaxError: rest element may not have a trailing comma
```

Ca să fie rest, în cazul funcțiilor și al destructurărilor, pune-l ultimul în lista parametrilor sau a identificatorilor. Reține faptul că operatorul rest este folosit într-un context de atribuire a valorilor.

Accesare valorilor care nu există, va conduce la atribuirea valorii `undefined`.

```javascript
var [nedefinit] = [];
console.log(nedefinit); // undefined
```

## Operatorul `spread`

Operatorul spread permite *desfacerea* (*spread*) unui array în elementele sale componente care mai apoi sunt introduse ca proprietăți ale obiectului în al cărui context este invocat. Poți spune că folosești operatorul *spread* pentru a *extrage* valorile dintr-un array sau un obiect.

Acest operator se folosește în ceea ce este numit *destructuring assignment*. Ceea ce se produce este o destructurare a obiectului care implementează protocolul de iterare cu scopul de a *extrage* elementele și a le folosi individual sau în alte combinații cu alte elemente care să formeze obiecte iterabile.

De exemplu, poate fi utilizat în headerul unei funcții pentru a introduce valorile unui array sau obiect ca argumente ale funcției. Acest operator folosește protocolul de iterare. Obiectul `arguments` are deja implementat protocolul de iterare în ECMAScript 2015, fiind pretabil prelucrării cu acest operator. Un exemplu rapid ar fi transformarea unui string într-un array în care fiecare caracter devine element al noului array.

```javascript
[..."012345"]
// la evaluare generează un array [ "0", "1", "2", "3", "4", "5" ]
[..."012345"].length // 6
```

Permite *expadarea* unei expresii în locuri în care argumente multiple sau elemente multiple sunt așteptate să existe. Acest lucru permite inserarea elementelor unui array existent într-unul nou creat.

```javascript
let obiecte = ['pixuri', 'creioane'];
let birou = ['lampă', ...obiecte, 'scaun', 'tușieră'];
console.log(birou); // Array [ "lampă", "pixuri", "creioane", "scaun", "tușieră" ]
```

Un caz foarte util de prelucrare a două sau mai multe array-uri este cel în care constituim un array cu elementele respectivelor array-uri.

```javascript
let ar0 = [2,14,42],
    ar1 = [34,42,2];

let arFaraDubluri = [...new Set([...ar0, ...ar1])]; // [2, 14, 42, 34]
let cuDubluri = [...ar0, ...ar1]; // [2, 14, 42, 34, 42, 2]
// alternativa fără operatoru spread se bazează pe concat
let doarConcatenat= ar0.concat(ar1); // toate elementele fără eliminarea dublurilor
```

Și în cazul obiectelor este posibilă folosirea operatorului pentru a realiza o concatenare.

```javascript
let c = {a:1, b:true};
let xy = {...c, x: 'ab'}; // {a: 1, b: true, x: 'ab'}
```

Poți constitui un obiect nou doar din aplicarea spread-ului pe diferitele obiecte preexistente cu scopul de a constitui unui care are toate proprietățile acestora.

```javascript
let c = {a:1, b:true}, d = {e: 'stea'};
let xyz = {...c, ...{f: 10}}; // {a: 1, b: true, f: 10}
let concatObiecte = {...c, ...d}; // {a: 1, b: true, e: 'stea'}
// alternativa ar fi folosit `Object.asign`
let concatObiClasic = Object.assign({}, c, d); // {a: 1, b: true, e: 'stea'}
```

O altă aplicare interesantă este și posibilitatea de a face *o copie* a unui obiect. Acest lucru se realizează printr-o funcție care returnează un obiect nou rezultat în urma aplicării operatorului.

```javascript
let copieshallow = obi => {...obi};
let oCopie = copieshallow(obj);
```

## Resurse

- [ES6 In Depth: Destructuring | hacks.mozilla.org](https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/)
