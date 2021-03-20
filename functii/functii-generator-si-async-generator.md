# Funcțiile generator

Funcțiile generator oferă posibilitatea de a parcurge o colecție de date. Este un nou tip de funcții introduse în ECMAScript 2015 care *produc* (*yield* în limba engleză) valori la cerere. O funcție generator poate fi considerată a fi un constructor de obiecte `Generator`. La invocarea unei funcții cu steluță, vei obține un obiect generator care este iterabil. Faptul că obiectul rezultat este iterabil îl face pretabil la parcurgerea cu `for...of`, bucle sau poate fi chiar folosit cu operatorul spread (`...`).

**Moment ZEN**: Funcțiile generator nu pot juca rolul de constructori.

Caracterul steluță așezat după cuvântul cheie `function`, va semnala că avem de a face cu o funcție generator. La momentul apelării, o funcție generator execută codul intern până la momentul în care întâlnește operatorul `yield`. În acest moment, funcția returnează un obiect `Generator`. Obiectul generator este constituit la momentul în care este executată funcția. Acesta este conform protocolului *iterator* dar și *iterable*. Prin intermediul operatorului `yield`, generatoarele pot primi și trimite date. Datorită acestui comportament al generatoarelor prin care este permisă întreruperea execuției, în practică mai sunt numite și **corutine**.

Funcțiile generator pot fi întâlnite în următoarele posturi:

- declarație de funcție generator: `function* unGen () {}`;
- expresie de funcție generator: `let altGen = function* () {}`;
- metodă a unui obiect: `const obi = { *metoG(): {} }`;
- metodă într-o clasă;

**Moment ZEN**: Funcțiile săgeată nu pot fi iteratori.

Obiectul returnat de funcțiile generator este iterabil și poate fi înțeles ca o bandă cu produse la casa unui magazin. La apăsarea unei pedale (metoda *next()*), banda aduce în atenția operatorului comercial un produs pe care îl evaluează returnând prețul și apoi următorul produs ș.a.m.d.

```javascript
function* ceva () {
  yield "test1";
  yield "test2";
};
let x = ceva(); // `x` este un obiect iterabil
let primulRezultat = x.next();
// Object { value: "test1", done: false }
let alDoileaRezultat = x.next();
x.next(); // încearcă să mai scoți un rezultat
//Object { value: undefined, done: true }
```

Obiectul returnat are niște metode disponibile pentru a iniția evaluarea expresiilor după cuvântul cheie `yield`. Aceste metode sunt `next()`, `return()` și `throw()`. Prima metodă returnează prima valoare a obiectului generator sub forma unui obiect `{value: 'test1', done: false}`.

După evaluare, execuția generatorului se oprește în așteptarea unui nou apel al metodei `next()`. Poți percepe un generator ca un program care se execută la cerere și în etape. Fiecare etapă marcată de `yield` are asociată o stare.

Apelarea unei funcții generator trimite funcția în stiva apelurilor,evaluând expresiile până la primul `yield`, când își suspendă execuția, returnând obiectul `Generator`. Apoi funcția își întrerupe execuția dispărând din stivă, dar obiectul returnat va ține o referință către contextul de execuție a funcției generator. De fiecare dată când funcția va fi reluată și suspendată, obiectul `Generator` va memora contextul de execuție. Reține faptul că întregul cod de înaintea primului `yield` va fi executat.

```javascript
function* unGen (val) {
  let ceva = 10; // se evaluează
  console.log('Am valoarea ', val + ceva); // se evaluează
  let altceva = val**2; // se evaluează și apoi funcția îți încheie propria execuție.
  yield altceva;
};
let x = unGen(2); // `x` este un obiect iterabil
let primulRezultat = x.next(); // { value: 4, done: false }
```

Execuția metodei `next()` nu creează un nou context de execuție, ci doar reactivează contextul de execuție a funcției generator, pe care-l împinge din nou în stivă. Se continuă execuția de unde a rămas începând cu expresiile de după `yield`. Codul este evaluat până la întâlnirea următorului `yield`, când execuția este suspendată din nou, nu înainte de a actualiza obiectul iterator care ține minte starea - ține viu contextul de execuție. Acest ultim aspect oferă un mare avantaj al generatoarelor pentru că rețin valorile între diferitele etape parcurse cu `next()`.

Dacă în execuție nu mai este întâlnit niciun `yield`, funcția generator returnează obiectul iterator, care în acest moment va avea valoarea `true` asociată cheii `done`. În exemplu avem un exemplu tipic de prelucrare a proprietăților unui obiect folosind un generator.

```javascript
var obiect = {a: 1, b: 2};
function* parcurgObiect (obiect) {
  for (let cheie of Object.keys(obiect)) {
    yield obiect[cheie];
  };
};
var genob = parcurgObiect();
genob.next();
```

La apelarea repetată a metodei `next()` pe obiectul generator, se obțin rând pe rând valorile de la fiecare cheie a obiectului.
Un alt exemplu, ceva mai dezvoltat, observăm faptul că putem accesa deopotrivă cheia și valoarea fiecărei proprietăți a obiectului.

```javascript
function* prelucrareObiect (obiect) {
  let chei = Reflect.ownKeys(obiect);
  for (const cheie of chei) {
    yield [cheie, obiect[cheie]]; // un array
  }
}
const date = {ceva: 'true', altceva: 'bun'};
for(const [key, value] of prelucrareObiect(date)){
  console.log(`${key}: ${value}`);
}
```

## Procesare de generatoare cu yield*

Funcțiile generator pot procesa alte funcții generator. Expresia `yield*` este folosită în cazul în care dorești să delegi execuția către un alt generator sau obiect iterator. Asigură-te că expresia care stă după `yield*` este un obiect iterabil.

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

Ceea ce se petrece atunci când `yield*` evaluează un obiect iterabil este că va face `yield` pentru toate valorile din obiectul iterabil căruia i se aplică.

## Trimiterea mesajelor

Un lucru foarte interesant care privește funcțiile generator este că se pot trimite mesaje din funcție în obiectul iterator instanțiat și invers.

### Date noi prin argumente

Dacă tratezi generatoarele ca funcții simple, cel mai facil mecanism de trimitere a datelor este cel al argumentelor. Reține faptul că poți *injecta* date în generator în oricare etapă a execuției sale, de regulă, într-o etapă în care dorești să utilizeze date externe.

```javascript
function* testDeGen (oValoare) {
  let valoareEtapa = yield 'Ceva ' + oValoare;
};
let obiIterabil = testDeGen('important');
obiIterabil.next().value; // "Ceva important"
```

Reține faptul că funcțiile generator pot primi date și după ce au pornit execuția. Acest lucru se poate face prin intermediul argumentelor la momentul invocării.

### Mesaj din instanță către generator

Pentru a trimite date la o anumită etapă de execuție, se vor pasa datele în apelul metodei `next()`. Aceste valori sunt trimise, de regulă, pentru a influența valoarea următorului `yield`.

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

Nu pot fi pasate valori la prima apelare a lui `next()` pentru că metoda `next()`, de fapt, trimite o valoare unui `yield` care așteaptă. Dacă nu există vreun `yield` care să aștepte, nici valoarea nu are cui să-i fie pasată. Valoarea pasată este folosită de generator ca valoare a întregii expresii `yield`, în care a fost înghețat generatorul.

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

## Obținerea datelor dintr-un generator

Enunțul `for...of` parcurge generatorul și returnează chiar valorile existente.

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

Se observă că o funcție generator se *consumă* cu un enunț `for...of`. Pentru exemplul de mai sus, să spunem că dorim să accesăm prima valoare. În acest caz, pur și simplu punem *cursorul* `next()` pe ea. Valorile pot fi iterate și printr-un `while` pentru a scoate valoarea din obiectul returnat de `next()`. Pentru fiecare iterație testezi dacă `done` are valoarea `true`.

Formularea condiției: `!(let element = refIterator.next()).done`.

Explicație:

-   creezi o referință către obiectul adus de fiecare yield: `let obi;`
-   `obi = refIterator.next()` aduce obiectul.
-   pui expresia între paranteze pentru a o evalua. Evaluarea este obiectul adus de cursor: `(obi = refIterator.next())`
-   Valoarea lui `done` o negi pentru toate obiectele returnate care au proprietate `value`, adică `false` va deveni `true` pentru ca bucla `while` să poată avansa.

Vom continua completând exemplul de mai sus.

```javascript
let obi;
while( !(obi = refIterator.next()).done ){
  console.log(obi.value);
};
```

Modalitatea de a parcurge un generator cu o buclă `while` este mai greoaie față de ceea ce oferă `for...of`.

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
```

O chestie foarte faină care ține de felul în care funcționează generatoarele, este că se pot construi bucle infinite, fără a avea temerea că se vor returna erori din mediul în care programul rulează. Acest lucru se petrece pentru că indiferent de faptul că limita este la infinit, generarea valorilor este controlată prin `yield`. Se poate ușor închipui o listă cu bilete de ordine sau orice necesită o listă de elemente, care să se prelungească la infinit și care au nevoie de o identificare unică, de exemplu.

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

Dacă parcurgi un generator cu o buclă și decizi întreruperea buclei cu un `break`, iteratorul va muta cursorul la sfârșit.

```javascript
function* stopata () {
  yield "ceva";
  yield "altceva"
};
let obiIterabil = stopata();
for (let elem of obiIterabil) {
  console.log(elem);
  break;
};
obiIterabil.next(); // { value: undefined, done: true }
```

## Parcurgerea unitară a mai multor surse

```javascript
// Convertirea unui structuri într-un generator
// dacă avem de-a face cu un array
// În caz contrar, se presupune că este un generator
// structura de date primite și se face defer la el.

function* toGenerator (structure) {
  if (Array.isArray(structure)) {
    for (let elem of structure) {
      yield elem;
    }
  } else {
      yield* structure;
  }
};

// Întrețeserea surselor de date, fie
// array-uri, fie generatoare într-o singură sursă

function* threader (...sources) {
  var yielding = true; // controlezi rezultatul din while
  var generators = sources.map( source => toGenerator(source) ); // asigură-te că toate sursele sunt generatoare
  while (yielding) {
    yielding = false;
    for (let source of generators) {
      let next = source.next();
      // atunci când toatea sursele vor
      // fi done, se iese din buclă
      if (!next.done) {
        yielding = true;
        yield next.value;
      };
    };
  };
};

var col1 = [1,2,3],
    col2 = ['a','b','c'],
    col3 = [{'x':1}],
    colectie = [],
    mareGen = threader(col1, col2, col3);

for (let val of mareGen) {
  colectie.push(val);
};
console.log(colectie); // [ 1, 'a', { x: 1 }, 2, 'b', 3, 'c' ]
```

## Metode generator în obiecte

### Metode în obiecte literale

Poți introduce metode async ca metode ale unui obiect. Atenție, acest lucru nu va transforma obiectul într-un iterable.

```javascript
const obi = {
  *unGenerator () {
    yield 'test1';
    yield 'test2';
  }
};
const genNou = obi.unGenerator();
console.log(genNou.next());
console.log(genNou.next());
console.log(genNou.next());
```

### Metode în clase

Funcțiile generator pot fi metode ale unui obiect. Pentru a realiza acest lucru, se va adăuga steluța în stânga identificatorului metodei.

```javascript
class Test {
  *unGenerator () {
    yield 'Ceva de test';
    yield 'Altceva de test';
  }
}

const obiTest = new Test();
const genDinTest = obiTest.unGenerator();

console.log(genDinTest.next()); // {value: 'Ceva de test', done: false}
console.log(genDinTest.next()); // {value: 'Altceva de test', done: false}
console.log(genDinTest.next()); // {value: undefined, done: true}
```

### Generatoare ca proprietăți computate

Cazul obiectelor literale.

```javascript
const ObiectNou = {
  *[Symbol.iterator] () {
    yield 'Ceva de test';
    yield 'Altceva de test';
  }
}
console.log(Array.from(ObiectNou));
```

Cazul claselor.

```javascript
class ClasăNouă {
  *[Symbol.iterator] () {
    yield 'Ceva de test';
    yield 'Altceva de test';
  }
}
console.log(Array.from(new ClasăNouă));
```

## Tratarea erorilor

Pentru că o funcție generator este totuși sincronă, se pot trimite mesaje în cazul apariției unor erori folosind un bloc `try...catch`.

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

## Parcurgerea DOM folosind o funcție generator.

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

## Corutine

Corutinele sunt un model de organizare a executării funcțiilor care își întrerup execuția pentru a ceda controlul alteia. JavaScript nu are un mecanism dedicat realizării corutinelor. Cel mai apropiat fiind totuși generatoarele care prin `yield`, cedează controlul unui alt context de execuție, iar la momentul oportun își reiau execuția. Corutinele sunt un mecanism care în loc să folosească callback-urile, fac uz de *event loop*.

Pentru a gestiona un generator folosind o corutină, trebuie să elaborezi o funcție *wrapper* suplimentară. Aceasta va gestiona următoarea logică necesară:

- va apela generatorul și va genera obiectul generator;
- va apela metoda `next()` pe obiectul generator ceea ce va conduce la executarea întregului cod până când `yield` apare;
- va apela metoda `next(...)` în care vor fi trimise date către generator.

```javascript
function corutină (funcGenerator) {
  var obiectGenerator = funcGenerator(); // instanțierea obiectului
  obiectGenerator.next(); // execută codul generatorului până la primul yield
  return function (dateDeTrimisÎnGenerator) {
    obiectGenerator.next(dateDeTrimisÎnGenerator);
  };
};
```

Folosind acest model, funcția *wrapper* oferă mecanismul de interacțiune cu generatorul fără a mai apela metoda `next()` direct pe obiectul generator.

```javascript
var generatorGestionat = corutină (function* gen () {
  var primaVal = yield;
  console.log('Iese prima valoare la primul yield: ', primaVal);
  var aDouaVal = yield;
  console.log('Și a doua valoare: ', aDouaVal);
});
generatorGestionat('primo');
generatorGestionat('secundo');
```

Ținta ar fi ca de fiecare dată când se face un `yield`, o funcție să preia efortul de calcul și să ofere un rezultat. Când corutina și-a încheiat propria execuție, apelează la un alt `yield` din generator.

```javascript
function corutine (func) {
  var gen = func(); // creezi generatorul și ceri primul yield
  gen.next();
  return function oVal (valoare) {
    gen.next(valoare); // valoare este pasat generatorului
  };
};
function* gen1 () {
  var intrare; // este valoarea care intră prin argument
  intrare = yield;
  console.log('primul yield: ', intrare);
  intrare = yield;
  console.log('al doilea yield: ', intrare);
};
function* gen2 () {
  var intrare; // este valoarea care intră prin argument
  intrare = yield;
  console.log('primul yield din a doua corutină: ', intrare);
  intrare = yield;
  console.log('al doilea yield din a doua corutină: ', intrare);
};
var x = corutine(gen1); x('ceva'); // primul yield: ceva
var y = corutine(gen2); y('altceva'); // primul yield din a doua corutină: altceva
x('salve'); // al doilea yield:  salve
y('eh'); // al doilea yield din a doua corutină:  eh
```

Corutinele pot fi folosite și în scenarii în care sunt gestionate promisiuni.

```javascript
var colectie1 = {a: 1, b: 'ceva'},
    colectie2 = {x: 'a', y: 10};

var promisiune1 = new Promise(function exec (resolve, reject) {
  resolve(colectie1);
});
var promisiune2 = new Promise(function exec (resolve, reject) {
  resolve(colectie2);
});

function corutina (functie) {
  var generator = functie();
  var avanseaza = function salt (date) {
    let next = generator.next(date); /**/
    if(!next.done){
      next.value.then((v) => {
        console.log(v);
      });
      return next.value.then(avanseaza);
    };
  };
  avanseaza();
};

function* generator () {
  let promisePool = [promisiune1, promisiune2];
  yield Promise.all(promisePool); /**/
};

corutina(generator);
```

## Generatorii asincroni

Funcțiile generator permit parcurgerea unor obiecte iterabile sincrone, iar pentru obiectele iterabile asincrone (implementează o metodă [Symbol.asyncIterator](){}), se vor folosi generatorarele asincrone. Pentru ca un obiect să fie unul **async iterabil**, trebuie să aibă o cheie `Symbol.asyncIterator`.

```javascript
const asyncItParticularizat = {
  async* [Symbol.asyncIterator]() {
    yield 'Primo';
    yield 'Secundo';
  }
};
(async function* unAsyncIterabil () {
  let text;
  for await (text of asyncItParticularizat) {
    console.log(text);
  }
})();
```

Marca generatoarelor asincrone este caracterul steluță după `function` prefixat de *async*: `async function*`.
**Generatoarele sincrone** returnează un obiect `Generator` pentru care o invocare a metodei `next()` a acestuia, produce un obiect `{value: 'oVal', done: true/false}`. Invocarea lui `next()` aduce valoarea adusă de `yield`, de fapt.
**Generatoarele asincrone** returnează și ele un obiect `Generator`, dar pentru fiecare `next()` invocat, vom obține o promisiune pentru fiecare obiect `{value, done}` care a fost returnat de un `yield`.

Anatomia unui apel `next()`:
- un Promise este trimis în lista de microtaskuri.
- dacă generatorul async nu este activ îl repune în execuție și așteaptă încheiere fie prin `yield`, `throw`, `return` sau `await`.
- este retunată promisiunea după rezolvarea sa asincronă cel mai repede în următorul *tick*.

În cazul generatoarelor asyncrone, toate apelurile la `next()` sunt introduse într-un *queue* de către motorul JavaScript și de îndată ce obiectul generator asincron este gata, i le pune la dispoziție. Acest lucru este foarte eficient pentru că nu va trebui să aștepți să fie hotărâtă starea promisiunii returnate de `next()`. Totuși, în cazurile în care ai nevoie de valoare lui `done`, va trebui să aștepți rezolvarea promisiunii returnate de `next()` pentru că în funcție de `true`/`false` poți decide cum execuți codul care urmează sau dacă mai apelezi încă o dată pe `next()` sau nu.

Acestea au fost rezolvate deja și rezultatele așteaptă să fie accesate prin apelarea lui `next()`. În același fel se petrec lucrurile și în cazul `for...await...of`.

Ca exemplu, să presupunem că vrem să accesăm valorile unui iterator asincron după ce toate promisiunile returnate individual prin `next()` au fost rezolvate.

```javascript
// funcție de transformare a unui iterabil sincron în iterabil asincron
async function* creeazăUnIterabilAsincron (obiectIterabilSincron) {
  let element;
  for (element of obiectIterabilSincron) {
    yield element;
  }
}
// creează obiectul `Generator` pe care să poți aplica `next()`
const asyncGenObj = creeazăUnIterabilAsincron (['ceva', 'altceva']);
// rezolvă toate promisiunile returnate la fiecare apel `next()` și atribuie valoarea
const [{value:valoarea1}, {value:valoarea2}] = await Promise.all([
    asyncGenObj.next(), asyncGenObj.next()
]);
console.log(valoarea1, valoarea2); // ceva altceva
```

Observă faptul că nu a trebuit verificată valoarea lui `done` pentru că numărul de elemente din array-ul asincron este cunoscut. Astfel, a fost posibilă atribuirea valorilor unui număr fix de variabile.

## Mantre

- Toate generatoarele asincrone au un *queue* de Promises care să fie rezolvate printr-un `yield` sau un `throw`.
-

## Dependințe cognitive

-   funcții,
-   medii lexicale,
-   promisiuni,
-   iteratori
-   `for...of`Dr. Axel Rauschmayer

## Resurse

- [Generator Function Definitions | ECMAScript® 2021 Language Specification](https://tc39.es/ecma262/#sec-generator-function-definitions)
- [Async iterators and generators](https://javascript.info/async-iterators-generators)
- [Generators, corutines](https://www.wptutor.io/web/js/generators-coroutines-async-javascript)
- [Coroutine Event Loops in Javascript](https://x.st/javascript-coroutines/)
- [function*|MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
- [Generator|MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
- [Exploring ES2018 and ES2019|Axel Rauschmayer|5.3. Asynchronous generators](https://exploringjs.com/es2018-es2019/ch_asynchronous-iteration.html#asynchronous-generators)
- [ES6 Iterators, Generators, and Iterables|Domenic Denicola](https://blog.domenic.me/es6-iterators-generators-and-iterables/)
- [22. Generators | Exploring ES6 | Dr. Axel Rauschmayer | https://exploringjs.com/](https://exploringjs.com/es6/ch_generators.html)
