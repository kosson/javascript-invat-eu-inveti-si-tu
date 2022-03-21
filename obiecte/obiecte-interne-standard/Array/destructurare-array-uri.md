# Destructurarea

Destructurarea o veți găsi în literatura de specialitate numită *destructuring assignment*. Destructurarea este un procedeu care are drept scop extragerea sau manipularea valorilor atribuindu-le unor variabile.

Să pornim de la cazul tradițional, în care dacă aveai nevoie să faci o referință la o anumită valoare dintr-un array, fiecărei variabile îi atribuiai valoarea în baza indexului elementului.

```javascript
let arr = ['a', 'b'];
let a = arr[0],
    b = arr[1];
```

Atribuirea valorilor printr-o destructurare a array-ului, se dovedește a fi o binecuvântare în ceea ce privește concizia și utilitatea.

```javascript
let arr = ['unu', 'doi'];
let [unu, doi] = arr;
console.log(unu, doi); // 'unu' 'doi'
```

Ceea ce am realizat este generarea variabilelor identificate prin `unu` și `doi`, care vor avea atribuite valorile string `unu` și `doi`. Observă faptul că valorile au fost atribuite în ordinea din array identificatorilor menționați în expresia din stânga egalului. Nu este neapărat necesar să introduci identificatori pentru toate elementele array-ului.

```javascript
let arry = ['ceva', 'altceva'];
let [x] = arry;
```

Destructurarea funcționează și în cazul array-urilor de array-uri, dar în acest caz, pentru a se face atribuirea corectă, va trebui să se respecte structura întocmai, precum în următorul exemplu.

```javascript
let [a, [b, c, [d]]] = ['1', ['2', '3', ['4']]];
console.log(a, b, c, d); // 1 2 3 4
```

În cazul în care tot ceea ce dorești este să *capturezi* câteva valori pornind cu indexul 0, dar restul elementelor să le păstrezi într-un array separat, poți folosi operatorul spread.

```javascript
let arry = ['ceva', 'altceva', 'undeva', 'altcineva'];
let [x, ...y] = arry; // ceva  ['altceva', 'undeva', 'altcineva']
```

Un amănunt important privind destructurarea este că permite transformarea unor obiecte *array-like*, cum este `arguments` și `NodeList` din DOM, în array-uri adevărate. Anterior existenței operatorului *spread*, aceste transformări se făceau prin aplicarea secvenței `[].slice` cu un `call` pe obiect.

```javascript
Array.prototype.slice.call(obi);
// sau
[].slice.call(obi)
```

## Rețetar spread - destructuring assignment

### Potrivire *unu-la-unu*

Potrivirea unu la unu a valorilor cu variabilele pregătite.

```javascript
let unu, doi, trei;
[unu, doi, trei] = [1, 2, 3];
console.log(unu, doi, trei); // 1 2 3
```

### Salt peste valori

```javascript
var [,,x] = ['a', 'b', 'c'];
console.log(x); // c
```

### Inversarea valorilor

Destructurarea poate fi folosită cu succes pentru a inversa valorile între două variabile.

```javascript
var x = 10, y = 20;
[x, y] = [y, x];
console.log(x, y);
```

### Potrivirea unu-la-unu cu un array returnat

O funcție poate returna o structură care implementează protocolul de iterare și astfel, evaluarea sa va rezulta într-un obiect care poate fi destructurat.

```javascript
function genArray(){
  return ['unu', 'doi', 'trei'];
};
[x, y, z] = genArray();
console.log(x, y, z); // unu doi trei
```

### Atribuirea rezultatelor unui generator

Cu puțină imaginație, putem expata rezultatele produse de un generator pe care să le atribuim unor variabile pe măsură ce aceastea apar (*yield*).

```javascript
function* fibonacci () {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
let [prima, aDoua, aTreia, aPatra, aCincea, aSasea] = fibonacci();
console.log(prima, aDoua, aTreia, aPatra, aCincea, aSasea);
```

### Valori din oficiu

Atunci când există deja atribuite valori variabilelor are ar trebui să le primează dintr-o destructurare, valorile din oficiu sunt înlocuite cu cele apărute în urma destructurării.

```javascript
var x, y, z;
[x = 1, y = 2, z = 3] = [1000];
console.log(x, y, z); // 1000 2 3
```

### Folosirea cu `Regex`

```javascript
let [data, an, luna, zi] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('1912-12-3');
```

Ceea ce s-a întâmplat este că ai scăpat de sarcina de a crea un array intermediar din care să extragi indice cu indice.

### Combinarea array-urilor

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

// acum și mai simplu
abcde = [...ab, ...bc, 'e'];
```

### Copierea array-urilor și a obiectelor

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

Trebuie observat faptul că nu poți introduce proprietățile unui obiect ca elemente ale unui array pentru că obiectele simple nu implementează protocolul de iterare.

### Pasarea valorilor unui array drept argumente

Veți aprecia cu siguranță posibilitatea de a pasa toate valorile dintr-un array unei funcții ca argumente. Este un mecanism foarte util care simplifică foarte mult fluxul de prelucrare a unor calupuri de date folosind funcțiile.

```javascript
const colectie = [1, 2];
function facCeva () {
  console.log(arguments[0], arguments[1]);
};
facCeva(...colectie); // 1 2
```

### Transformarea argumentelor unei funcții într-un array

De foarte multe ori veți avea nevoie să convertiți structura de date `arguments` a unei funcții, într-un array asupra căruia să puteți aplica metodele specifice de transformare și manipulare a datelor.

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

### Constituirea unei colecții de elemente DOM

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

### Pasarea către metode ale obiectelor interne

Folosirea operatorului elimină necesitatea de a folosi o buclă cu care să iterezi elementele unui array.

```javascript
let numbers = [23, 400, 6, 1021];
Math.min(...numbers); // 6
```

## Valori din oficiu

Atribuirea de valori din oficiu se dovedește foarte utilă atunci când încerci să faci o destructurare pe un array gol.

```javascript
let [valoare = false] = [];
console.log(valoare); // false
```

## Generarea unui set cu valori unice

Folosind destructurarea în combinație cu `Set` poți extrage un set unic de valori.

```javascript
const colectie = ['a', 'a', 'a', 'c', 'f', 'r', 'r', 'f'];
const setnou = [...new Set(colectie)];
```

## Resurse

- [ES6 In Depth: Destructuring | hacks.mozilla.org](https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/)
