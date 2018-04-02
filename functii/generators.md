# Generators

Generatoarele oferă posibilitatea de a parcurge o colecție de date. Este un nou tip de funcții introduse în ECMAScript 2015 care generează de valori la cerere. Punerea unei steluțe după cuvântul cheie `function`, va semnala că avem de a face cu o funcție generator.

```javascript
function* ceva () {
  yield "test1";
  yield "test2";
};
let x = ceva(); // s-a creat obiectul iterator
let primulRezultat = x.next(); 
// Object { value: "test1", done: false }
let alDoileaRezultat = x.next();
x.next(); // încearcă să mai scoți un rezultat
//Object { value: undefined, done: true }
```

Acest nou tip de lucru cu funcțiile se bazează pe faptul că accesul la date se face cu ajutorul iteratoarelor. Atunci când execuți un generator se crează un nou obiect iterator. Un obiect iterator știe cum să acceseze elementele unei colecții unul după altul ceea ce implică faptul că are mecanismele prin care să țină minte poziția din secvență.
Acest obiect are niște metode disponibile pentru a iniția evaluarea expresiilor după cuvântul cheie `yield`. După evaluare, execuția generatorului se oprește în așteptarea unui nou apel al metodei `next()`.

```javascript
var iterator = [1, 2, 3][Symbol.iterator](),
    element;
while( !(element = iterator.next()).done ) {
  console.log(element.value);
};
```

Odată cu ECMAScript 2015, beneficiem de enunțul `for..of`, care va face exact ce am realizat mai sus construind obiectul iterator. Array-urile sunt obiecte care implementează protocolul de iterare.

```javascript
for(var x of [1, 2, 3]){
  console.log(x);
};
```

Parcurgerea se face automat, rezultatele fiind oferite la încheierea iterării. Ce te faci în momentul în care dorești să ai acces secvențial la valorile unei colecții? În acest caz, vom apela la funcțiile generator.

Apelarea unui generator nu îl execută, ci doar este trimisă funcția în stiva apelurilor. De fapt, la apelare este returnat un obiect iterator. Obiectul iterator ține o referință către contextul de execuție al generatorului care este în call-stack. După ce au fost evaluate toate expresiile până la întâlnirea primului `yield`, contextul de execuție al generatorului va fi scos din stiva de apeluri, dar obiectul iterator care s-a creat, va ține minte acest context de execuție. Execuția metodei `next()` nu creează un nou context de execuție precum în cazul clasic, ci doar reactivează contextul de execuție al generatorului pe care-l împinge din nou în callstack, funcția generatorului continuând execuția de unde a rămas începând cu expresiile de după `yield`. Un mare avantaj al generatoarelor este că rețin valorile între diferitele etape parcurse cu `next()`.

Dacă nu mai este niciun `yield`, funcția generator returnează.

### Generatoare care procesează alte generatoare

Funcțiile generator pot procesa alte funcții generator.

```javascript
function* unGen () {
  yield 'salve';
  yield* altGen();
};
function* altGen () {
  yield 'bau';
};
for (let obiRet of unGen()) {
  console.log(obiRet);  
};
```

## Trimiterea mesajelor

Un lucru foarte interesant care privește funcțiile generator este că se pot trimite mesaje din funcție în obiectul iterator instanțiat și invers.

### Trimiterea unui mesaj din funcție în instanță

La momentul finalizării evaluarii expresiilor de după `yield`, este returnat un obiect în care vom găsi valoarea returnată în urma evaluărilor, dar și starea iteratorului.

```javascript
function* unGenerator () {
  yield 'primul mesaj';
};
const emitator = unGenerator();
console.log(emitator.next());
// { value: "primul mesaj", done: false }
```

Valoarea lui `done` este `false` pentru că execuția funcției doar a fost oprită temporar. Funcția încă nu și-a încheiat execuția chiar dacă avem în cazul nostru un singur `yield`. Pentru a încheia, va trebui să mai apelăm o dată `next()`.

```javascript
console.log(emitator.next());
// returneaza { value: undefined, done: true }
```

### Trimiterea unui mesaj din instanță către generator

```javascript
function* altGenerator () {
  const mesajPrimit = yield;
  console.log(mesajPrimit);
};

const instantaAltGenerator = altGenerator();
console.log(instantaAltGenerator.next());
// { value: undefined, done: false }
console.log(instantaAltGenerator.next('mesaj spre generator'));
// mesaj spre generator
// apoi returneaza
// { value: undefined, done: true }
```

Pentru că o funcție generator este totuși sincronă, se pot trimite mesaje în cazul apariției unor erori folosind un bloc `try..catch`.

```javascript
function* facCevaSecvential () {
  try {
    const x = yield;
    console.log(`Salut ${x}`);
  } catch (err) {
    console.log('Eroare', err);
  };
};
const ziCeva = facCevaSecvential();
ziCeva.next(); // { value: undefined, done: false }
ziCeva.throw('Auleu, ceva e rău.');
// Eroare Auleu, ceva e rău.
// { value: undefined, done: true }
```

## Scoaterea datelor dintr-un generator cu `for..of`

Enunțul `for..of` trece prin generator și returnează chiar valorile existente.

```javascript
function* emiteFormule () {
  yield "Salutare!";
  yield "Hai noroc!";
  yield "Noapte bună";
};
for(let salutare of emiteFormule()){
  console.log(salutare);
};
/*
Salutare!
Hai noroc!
Noapte bună
 */
```

Se observă că o funcție generator se *consumă* cu o secvență `for..of`. Pentru exemplul de mai sus, să spunem că dorim să accesăm prima valoare. În acest caz, pur și simplu punem cursorul pe ea - `next()`. Valorile pot fi iterate și printr-un `while` pentru a scoate valoarea din obiectul returnat de `next()`. Pentru fiecare iterație testezi dacă `done` are valoarea `true`.
Formularea condiției: `!(let element = refIterator.next()).done`.

Explicație:

- creezi o referință către obiectul adus de fiecare yield: `let obi;`
- `obi = refIterator.next()` aduce obiectul.
- pui expresia între paranteze pentru a o evalua. Evaluarea este obiectul adus de cursor: `(obi = refIterator.next())`
- Valoarea lui `done` o negi pentru toate obiectele returnate care au proprietate `value`, adică false va deveni true pentru ca bucla while să poată avansa.

Vom continua completând exemplul de mai sus.

```javascript
let obi;
while( !(obi = refIterator.next()).done ){
  console.log(obi.value);
};
// =>
/*
Salutare!
Hai noroc!
Noapte bună
 */
```

Modalitatea de a pargurge un generator cu o buclă `while` este mai greoaie față de ceea ce oferă `for..of`.

Dintr-un generator poți apela alte generatoare.

```javascript
function* traduceri () {
  yield 'Salut!';
  yield 'Holla!';
  yield 'Ciao!';
  yield 'Konnichiwa!';
  yield 'Hello!';
};
function* emiteFormule () {
  yield 'Formule de salut in mai multe limbi';
  yield* traduceri();
};

for(let obi of emiteFormule()){
  console.log(obi);
};

// =>
/*
Formule de salut in mai multe limbi
Salut!
Holla!
Ciao!
Konnichiwa!
Hello!
 */
```

O chestie foarte faină care ține de felul în care funcționează generatoarele, este că se pot construi bucle infinite fără a avea temerea că se vor returna erori din mediul în care programul rulează. Acest lucru se petrece pentru că indiferent de faptul că limita este la infinit, generarea valorilor este controlată prin `yield`. Se poate ușor închipui o listă cu bilete de ordine sau orice necesită o listă de elemente care să se prelungească la infinit și care au nevoie de o identificare unică, de exemplu.

```javascript
function* generatorIDuri () {
  let id = 0;
  while (true) {
    yield ++id;
  };
};
let id = generatorIDuri();
id.next();
// Object { value: 1, done: false }
id.next();
// Object { value: 2, done: false }
```

### Parcurgerea DOM folosing o funcție generator.

Unul din scopurile principale a întregului efort de a învăța programare este acela de a putea manipula datele de mari dimensiuni sau cele care de mare complexitate ca structură. Cel mai întrebuințat model de parcurgere a datelor de o mare complexitate este cel care folosește recursivitatea. Acesta este și cazul parcurgerii DOM (în engleză *walking the DOM*).

```html
<div id="start">
  <p>un para</para>
  <p>alt para</para>
  <ul>
    <li>unu</li>
    <li>doi</li>
  </ul>
  <script>
      function parcurgDOM (element, callback) {
        callback(element);
        element = element.firstElementChild;
      };
      function afișează (element) {
        console.log(element.innerText);      
      };
      const fragmentDOM = document.querySelector('#start');
      parcurgDOM(fragmentDOM, afișează);
  </script>
</div>
```

Parcurgerea recursivă folosind generatorii.

```javascript
function* parcurgDOM (element) {
  yield element;
  element = element.firstElementChild;
};
const elementDOM = document.getElementById("start");
for(let element of parcurgDOM(elementDOM)){
  console.log(element.innerText);
};
```

## Introducerea și modificarea datelor dintr-un generator

Reține faptul că funcțiile generator pot primi date și după ce au pornit execuția. Acest lucru se poate face prin intermediul argumentelor la momentul invocării, de exemplu.

```javascript
function* faCeva (ceva) {
  yield ("Cineva a primit " + ceva);
};

let obiIterator = faCeva("o dudă");

// console.log(obiIterator.next());  
// Object { value: "Cineva a primit o dudă", done: false }
let afirm = obiIterator.next();
console.log(afirm.value); // Cineva a primit o dudă
```

Introducerea de date se mai poate face și prin pasarea de argumente în metoda `next()`

Nu pot fi pasate valori la prima apelare a lui `next()` pentru că metoda `next()`, de fapt trimite o valoare unui `yield` care așteaptă. Dacă nu există vreun `yield` care să aștepte, nici valoarea nu are cui să-i fie pasată. Valoarea pasată este folosită de generator ca valoare a întregii expresii `yield` în care a fost înghețat generatorul.

```javascript
function* faCeva (ceva) {
  let intern = yield ("Cineva a primit " + ceva);
  yield ("Altcineva a primit " + ceva +  "\nValoarea lui next anterior este " + intern);
};

let obiIterator = faCeva("o dudă");

let primulObi = obiIterator.next();
let primaVal = primulObi.value;
console.log(primaVal);  // Cineva a primit o dudă

let alDoileaObi = obiIterator.next("altceva");
let aDouaVal = alDoileaObi.value;
console.log(aDouaVal);
/*
Altcineva a primit o dudă
Valoarea lui next anterior este altceva
 */
```
