# Array.from()

Este o metodă introdusă de versiunea standardului ECMAScript 2015. Creează o instanță `new Array` din orice obiect care este iterabil. Obiectele din care se creează array-urile trebuie să aibă o lungime și elementele indexate. De exemplu, obiectul `arguments` are deja implementat protocolul de iterare și poate fi exploatat cu `Array.from()`. La fel se poate face și în cazul `Map`-urilor sau a `Set`-urilor.

Această metodă statică creează o copie *subțire* dintr-un obiect iterabil sau unul array-like. Returnează un array.

```javascript
let arr1 = Array.from('ceva'); // [ 'c', 'e', 'v', 'a' ]

let listaTuples = new Map([
    ["ceva", "o valoare"],
    ["altceva", "altă valoare"]
]);
let arrChei = Array.from(listaTuples.keys()); // [ 'ceva', 'altceva' ]
let arrValori = Array.from(listaTuples.values()); // [ 'o valoare', 'altă valoare' ]
```

Metoda strălucește atunci când lucrezi cu API-urile browserului.

```javascript
const images = document.querySelectorAll("img");
const sources = Array.from(images, (image) => image.src);
```

## Parametrii

Metoda poate primi drept prim parametru un obiect asemănător unui array pe care îl va transforma într-un array. Aceste obiecte pot fi un `Map` sau un `Set` acestea fiind iterabile. Dacă nu este iterabil, este îndeajuns să aibă o proprietate `length` și valori care sunt indexate numeric.

Al doilea argument este o funcție cu rol de callback care va fi aplicată fiecărui element din obiectul asemănător cu array-ul înainte de a fi introdus în rezultat. Acest callback are drept prim parametru elementul curent care este prelucrat și un al doilea care este valoarea indexului acestuia.

Al treilea posibil argument al metodei este un obiect la care se dorește să fie făcută legătura lui `this`.

## În practică
### Aplicarea pe `arguments`

Această metodă este un ajutor foarte util în lucrul cu obiectul asemănător unui array care este `arguments`. Vă mai aduceți aminte de arguments, de la funcții, fiind structura de date care seamănă cu un array și în care sunt stocate valorile introduse la parametri. Înainte de actualizarea standardului, singura metodă de a transforma argumentele într-un array era aplicarea funcției `slice()` astfel: `[].slice.call(arguments)`.

```javascript
function transforma () {
  return [].slice.call(arguments);
};
```

Acum avem o viață mult mai ușoară, dar am prezentat metoda *veche* pentru că este posibil să o întâlniți destul de des în codul scris anterior și pe care este nevoie să-l înțelegeți.

```javascript
function sparge () {
  return Array.from(arguments);
};
sparge(1, 2, 3); // [1, 2, 3]
```

### Congruiență cu operatorul spread

Există un operator nou introdus de ECMAScript 2015 care face același lucru. Este vorba despre operatorul trei puncte. Acest operator folosește protocolul de iterare, ceea ce înseamnă că obiectele pe care dorim să le transformăm, trebuie să aibă implementat `@@iterator` prin intermediul lui `[Symbol.iterator]`. Obiectul `arguments` are deja implementat protocolul de iterare începând cu ECMAScript 2015. Atenție, *operatorul spread* se bazează pe existența implementării protocolului de iterare, pe când `Array.from()`, nu se bazează doar pe acesta. Spre deosebire de operator, metoda are capacitatea de a procesa și structuri de date *array-like*.

```javascript
function transforma () {
  return [...arguments];
};
transforma("unu", "doi", 3); // Array [ "unu", "doi", 3 ]
```

### Aplicarea pe șirurile de caractere

```javascript
Array.from("foo");
// ["f", "o", "o"]
```

### Constituirea unei colecții de elemente DOM

Acest lucru este posibil pentru că `NodeList` permite protocolul de iterare. Efectul este convertirea unui `NodeList` într-un Array.

```javascript
var divuri = Array.from(document.querySelectorAll('div'));

// ca alternativă folosim operatorul spread
function colectDivs(){
  return [...document.querySelectorAll('div')];
};

// sau:
var divuri = [...document.querySelectorAll('div')];
```

Nu poți aplica `slice` pe array-ul rezultat. Cu `Array.from()` nu se poate face `slice()`, dar poți să indici ce sunt părțile.

```javascript
function ceEste(){
  return Array.from(arguments, valoare => typeof valoare);
};
ceEste("ceva", null, true, undefined, NaN, 23);
```

Deja am introdus cu acest exemplu posibilitatea de a aplica câte o funcție pe fiecare element.

### Mapping pe fiecare element

Interesant este cum poți adapta `Array.from` să îndeplinească rolul lui `map`, de exemplu. `Array.from()` poate avea trei argumente în ordinea menționării:

- obiectul iterabil pe care vrei să-l transformi
- o funcție de mapping, care să fie apelată pentru fiecare dintre elementele din input
- și obiectul `this` necesar la apelarea funcției de mapare.

Putem imagina cu ușurință un scenariu în care, pentru fiecare element care va intra în viitorul array, se aplică o funcție care are capacitatea de a transforma elementul în altceva și mai util. Putem transforma elementele unui array existent aducându-le informații suplimentare.

```javascript
// un array de valori noi
let unMapper = Array.from([1, 2, 3], (element) => element * 2); // [ 2, 4, 6 ]
// o altă transformare
var linii = ['o linie', 'alta'];
var arr = Array.from(linii, (value) => `<p>${value}</p>`);
console.log(arr); // [ '<p>o linie</p>', '<p>alta</p>' ]
```

Efectul transformator nu se aplică doar la nivelul elementelor unui array, ci și pe obiecte. În exemplul următor vom îmbina mai multe tehnici și vom împleti mai multe tehnici de prelucrare pentru a obține un rezultat mai aproape de lucrul de zi cu zi. Să ne imaginăm că dorim să facem un colorizator de cod pentru scripturi de JavaScript. Ca să ținem din scurt, vom lua doar două elemente, care, de fapt sunt două cuvinte cheie din JavaScript și în funcție de ceea ce fac, le vom colora construind un fragment HTML pentru a fi afișat.

```javascript
var colectie = {
  unu: "red",
  doi: "green",
  alternativ (val) {
    let htmlFragment = ``;
    if (val === "var") {
      htmlFragment += `<p style="color: ${this.unu}">${val}</p>\n`;
    } else {
      htmlFragment += `<p style="color: ${this.doi}">${val}</p>\n`;
    };
    return htmlFragment;
  }
};
var rezervate = ['var', 'typeof'];

function transforma (valori) {
  return Array.from(valori, colectie.alternativ, colectie);
};
var transformate = transforma(rezervate);
console.log(transformate.join(''));
// ["<p style="color: red">var</p>", "<p style="color: green">typeof</p>"]
```

Se observă că în momentul în care te-ai decis să folosești o metodă din obiectul parcurs, va trebui să pasezi ca al treilea argument și referința pentru obiect ca fiind `this`.

Oricare obiect care are proprietatea `Symbol.iterator` poate fi convertit într-un array.

O altă aplicație interesantă este transformarea metodei într-un adevărat generator de valori. Faptul că poți prelucra orice structură atâta vreme cât aceasta are o proprietate `length`, se deschide o plajă largă de aplicații.

```javascript
let rezultat = Array.from({length: 3}, (valoare, index) => index);
// [ 0, 1, 2 ]
```

Valorile vor fi `undefined`, dar valorile indexului vor forma elementele array-ului rezultat.
O altă aplicație foarte interesantă pe care o indică MDN-ul este crearea unui mecanism prin care să poți obține itervale (*range*) de numere și nu numai.

```javascript
function creeazăInterval (start, stop, valoare) {
    let rezultat = Array.from({length: (stop - start) / valoare + 1}, (_, index) => start + index * valoare);
    return rezultat;
};
creeazăInterval(2, 12, 4); // [ 2, 6, 10 ]
```

Mai mult, poți invoca metoda pe funcții cu rol de constructori care așteaptă un singur argument ce reprezintă valoarea lui `length` pentru noul array creat. MDN-ul oferă două exemple foarte interesante.

```javascript
function UnConstructor (lungime) {
    console.log(`Valoarea lui length este ${lungime}`); 
};

// Cazul în care valoarea argumentului pasat este un iterabil
// aplici metoda pe `UnConstructor` care este desemnat a fi obiectul la care se leagă `this`.
let obiectDinSet = Array.from.call(UnConstructor, new Set(["primo", "secundo"])); // { 0: 'primo', 1: 'secundo', length: 2 }
console.log(arrayDinSet[0]); // primo

// Cazul în care valoarea argumentului pasat este un array-like  (are proprietate length)
let obiectDinCevaSimilarCuArray = Array.from.call(UnConstructor, {length: 1, 0: "o valoare"}); // { 0: 'o valoare', length: 1 }

// În cazul în care obiectul la care se face legătura this este un simplu obiect, va fi returnat un Array, nu un obiect
let arrayRezultat = Array.from.call({}, {length: 1, 0: "o valoare"}); // [ 'o valoare' ]
```

## Resurse

- [Array.from | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)