# Funcțiile generator

## Introducere

O funcție generator este o funție care se poate opri în mijlocul execuției și poate continua de unde a rămas.

Funcțiile generator oferă posibilitatea de a parcurge colecții de date. Este un nou tip de funcții introduse în ECMAScript 2015 care *produc* (*yield* în limba engleză) valori la cerere. Caracterul steluță așezat după cuvântul cheie `function`, va semnala că avem de a face cu o funcție generator.

**Moment ZEN**: Funcțiile săgeată nu pot fi iteratori.

O funcție generator poate fi considerată a fi un constructor de obiecte `Generator`. La invocarea unei funcții cu steluță, vei obține un **obiect generator** care este iterabil.

**Moment ZEN**: Funcțiile generator nu pot juca rolul de constructori.

La momentul apelării, o funcție generator execută codul intern până la momentul în care întâlnește operatorul `yield`. La primul apel al metodei `next()` pe obiectul rezultat din apelul funcției, va fi returnată valoarea expresiei de după `yield`. La momentul opririi execuției funcției (înaintea lui `yield`) este returnat un obiect `Generator`. La  apelarea metodei `next()` se vor putea trimite date prin argumente, dacă se dorește.

**Moment ZEN**: Returnarea explicită dintr-o funcție generator generează `{value: valoare_evaluată_ptr_return, done: true }`.

Obiectul generator respectă următoarele:
- protocolului impus de interfața *Iterable* prin implementarea lui `[Symbol.iterator]()`,
- interfața *Iterator* prin implementarea lui `next()` și
- `IteratorResult` prin rezultatul returnat de `yield` sub forma `{value: ceva, done: true/false}`.

Obiectul rezultat este iterabil, dar în aceeași măsură este și un iterator. Faptul că este iterabil îl face pretabil la parcurgerea cu `for...of` sau poate fi folosit cu operatorul spread (`...`). Mai mult, prin intermediul operatorului `yield`, generatoarele pot primi și trimite date, acestea fiind *expediate* ca argument metodei `next(date)`.

**Moment ZEN**: Funcțiile generator produc iteratori.

Pentru a aduce o perspectivă importantă pentru înțelegerea funcțiilor generator, să privim la ceea ce rezolvă acestea. În exemplul oferit, avem o funcție care face o implementare a protocolului *iterable*, ceea ce înseamnă și implementarea protocolului *iterator*. Funcția returnează obiectul necesar iterării pretabil la parcurgerea cu `for...of`.

```javascript
function cronometruInvers (pornire) {
  let următoareaValoare = pornire;

  // implementare iterable
  return {
    [Symbol.iterator]: () => ({
      // implementare iterator
      next () {
        if (următoareaValoare < 0) {
          return { done: true };
        }

        return {
          done: false,
          value: următoareaValoare--
        };
      }
    })
  };
};
const timpRămas = cronometruInvers(3);
let valoare;
for (valoare of timpRămas) {
  console.log(valoare);
}
```

În exemplu, funcția returnează obiectul iterator, care mai apoi poate fi consumat. Este observabilă construcția obiectului ce va fi returnat ca `[Symbol.iterator]`. Acest simbol este o metodă care la rândul său returnează un obiect ce pune la dispoziție metoda `next()`.

Aceeași funcție poate fi rescrisă mai simplu, transformând-o în generator.

```javascript
function * cronometruInvers (pornire) {
  let val;
  for (val = pornire; val >= 0; val--) {
    yield val;
  }
};
const timpRămas = cronometruInvers(3); // creezi un iterator
console.log(timpRămas.next()); // { value: 3, done: false}
console.log(timpRămas.next()); // { value: 2, done: false}
console.log(timpRămas.next()); // { value: 1, done: false}
console.log(timpRămas.next()); // { value: 0, done: false}
console.log(timpRămas.next()); // { value: undefined, done: true}
```

După cum se observă, de cele mai multe ori, generatorii pot fi considerați a fi un adaos sintactic (*sintactic sugar*) cu scopul de a crea obiecte iteratori. Propriu-zis, prin marcarea cu steluță a unei funcții, spunem motorului să implementeze toate mecanismele necesare creării unui obiect iterator la momentul invocării.

## Unde le folosești

Poți folosi funcțiile generator în următoarele scenarii:

- generezi obiecte iterator, care sunt niște producători de date. Fiecare `yield` poate returna o valoare trimisă ca date prin `next(date)`. Acest lucru înseamnă că generatoarele pot produce date dacă sunt folosite în bucle și în recursivitate;
- consumi date folosind un generator pentru că poți trimite date în funcția generator la momentul în care apelezi `next(data)`. Funcția își oprește execuția până când un nou calup de date este primit la următorul apel `next(data)`;
- produci și consumi date folosind funcțiile generator din postura de corutine;
- recursivitate.

Datorită acestui comportament al generatoarelor prin care este permisă întreruperea execuției, în practică mai sunt numite și **corutine** (*cooperatively multitasked tasks*), atunci când produc și consumă date deopotrivă. Corutinele mai pot fi înțelese drept funcții care își întrerup execuția pentru a ceda controlul alteia.

Funcțiile generator pot fi declarate astfel:

- declarație de funcție generator: `function* unGen () {}`;
- expresie de funcție generator: `let altGen = function* () {}`;
- metodă a unui obiect: `const obi = { *metoG(): {} }`;
- metodă într-o clasă;

Poți itera obiectele generator folosind următoarele enunțuri și operatori:

- bucle `for...of` (nu se folosește valoarea lui `done`);
- operatorul spread (`...`) care transformă obiectul iterator într-un array al valorilor acestuia `const set = [...funcGen()]` (nu se folosește valoarea lui `done`);
- destructurare `const [a, b] = funcGen();`
- `yield*` pentru a face apeluri recursive pe funcția generator (se folosește de valoarea lui `done`);

## Metodele obiectului generator

Execuția unei funcții generator creează un obiect generator care pune la dispoziție trei metode:

- `next()` prin care obții valoarea unui `yield`, dar prin care poți pasa și date în generator prin parametru;
- `return()`, care termină generatorul;
- `throw()`, care semnalează o stare de eroare.

## Generatorii ca producători de date

Obiectul returnat de funcțiile generator este iterabil și poate fi înțeles ca o bandă cu produse la casa unui magazin. La apăsarea unei pedale (metoda *next()*), banda aduce în atenția operatorului comercial un produs pe care îl evaluează returnând prețul și apoi următorul produs ș.a.m.d.

```javascript
function * ceva () {
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

După evaluare, execuția generatorului se oprește în așteptarea unui nou apel al metodei `next()`. Poți percepe un generator ca un program care se execută la cerere și în etape.

**Moment ZEN**: Fiecare etapă marcată prin `yield` are asociată o stare.

Parcurgerea unui iterabil în funcția generator este posibilă dacă este absolut necesar, dar nu se poate face `yield` din callbackuri aplicate de exemplu la `forEach`, `map`, etc.

**Moment ZEN**: Nu poți face `yield` din callback-uri.

## Parcurgerea cu for...of

Este posibilă parcurgerea unui iterabil într-o funcție generator folosind `for...of`, de exemplu.

Apelarea unei funcții generator trimite funcția în stiva apelurilor, fiind evalute toate expresiile până la primul `yield`, când își suspendă execuția, returnând obiectul `Generator`. Apoi funcția își întrerupe execuția dispărând din stivă, dar obiectul returnat va ține o referință către contextul de execuție al funcției generator. De fiecare dată când funcția va fi reluată și suspendată, obiectul `Generator` va memora contextul de execuție. Reține faptul că întregul cod de dinaintea primului `yield` va fi executat.

```javascript
function* unGen (val) {
  let ceva = 10; // se evaluează
  console.log('Am valoarea ', val + ceva); // se evaluează
  let altceva = val**2; // se evaluează și apoi funcția își încheie propria execuție.
  yield altceva;
};
let x = unGen(2); // `x` este un obiect iterabil
let primulRezultat = x.next(); // { value: 4, done: false }
```

Execuția metodei `next()` nu creează un nou context de execuție, ci doar reactivează contextul de execuție al funcției generator, pe care-l împinge din nou în stivă. Se continuă execuția de unde a rămas începând cu expresiile de după `yield`. Codul este evaluat până la întâlnirea lui `yield` din nou, moment când execuția este suspendată din nou, nu înainte de a actualiza obiectul iterator care ține minte starea - ține viu contextul de execuție. Acest ultim aspect oferă un mare avantaj al generatoarelor pentru că rețin valorile între diferitele etape parcurse cu `next()`.

Dacă în execuție nu mai este întâlnit niciun `yield`, funcția generator returnează obiectul iterator, care în acest moment va avea valoarea `true` asociată cheii `done`. În exemplu, avem un exemplu tipic de prelucrare a proprietăților unui obiect folosind un generator.

```javascript
var obiect = {a: 1, b: 2};
function* parcurgObiect (obiect) {
  let cheie;
  for ( cheie of Object.keys(obiect)) {
    yield obiect[cheie];
  };
};
var genob = parcurgObiect(); // generează obiectul iterator
genob.next(); // scoate valoarea primei chei
```

La apelarea repetată a metodei `next()` pe obiectul generator, se obțin rând pe rând valorile de la fiecare cheie a obiectului.
Un alt exemplu, ceva mai dezvoltat, observăm faptul că putem accesa deopotrivă cheia și valoarea fiecărei proprietăți a obiectului.

```javascript
function* prelucrareObiect (obiect) {
  let chei = Reflect.ownKeys(obiect);
  const cheie;
  for (cheie of chei) {
    yield [cheie, obiect[cheie]]; // un array
  }
}
const date = {ceva: 'true', altceva: 'bun'};
for (const [key, value] of prelucrareObiect(date)){
  console.log(`${key}: ${value}`);
}
```

## Procesare de generatoare cu yield* și recursivitate

Funcțiile generator pot procesa alte funcții generator. Expresia `yield*` este folosită în cazul în care dorești să delegi execuția către un alt generator sau obiect iterator. Asigură-te că expresia care stă după `yield*` este un obiect iterabil.

```javascript
function* unGen () {
  yield 'salve';
  yield* altGen();
};
function* altGen () {
  yield 'bau';
  yield 'cip cip';
  return 'Mai întâi de toate!!!';
};
let obiRet;
for (obiRet of unGen()) {
  console.log(obiRet);
};
// poți să destructurezi
let arr = [...unGen()];
console.log(arr); // ["salve", "bau", "cip cip"]
```

Ceea ce se petrece atunci când `yield*` evaluează un obiect iterabil este că va face `yield` pentru toate valorile din obiectul iterabil căruia i se aplică. Acest obiect nu trebuie să fie neapărat un alt generator, ci un simplu iterabil, precum array-urile. Dacă am fi apelat funcția `altGen` fără `yield*`, am fi generat obiectul generator fără niciun efect. Din acest motiv este necesară sintaxa cu steluță: `yield*`.

În cazul în care în funcția generator ai un `return` explicit, dacă acesta va fi prelucrat cu un alt generator, rezultatul acestuia îl vei avea imediat la parcurgerea obiectului generator.

```javascript
function* unGen (altGen) {
  yield 'salve';
  let x = yield* altGen;
  console.log(x);
};
function* altGen () {
  yield 'bau';
  yield 'cip cip';
  return 'Mai întâi de toate!!!';
};
let tot = [...unGen(altGen())];
console.log(tot);
```

## Generatoare consumatoare de date

Un lucru foarte interesant care privește funcțiile generator este că se pot trimite date către `yield` prin `next(date)`.

### Date noi prin argumente

Dacă tratezi generatoarele ca funcții simple, cel mai facil mecanism de trimitere a datelor sunt argumentele. Reține faptul că poți *trimite* date în generator în oricare etapă a execuției sale. De regulă, într-o etapă în care dorești să folosești date externe.

```javascript
function* testDeGen (oValoare) {
  let valoareEtapa = yield 'Ceva ' + oValoare;
};
let obiIterabil = testDeGen('important');
obiIterabil.next().value; // "Ceva important"
```

Funcțiile generator pot primi date și după ce au pornit execuția. Acest lucru se poate face prin intermediul argumentelor la momentul invocării.
Valorile sunt trimise, de regulă, pentru a influența valoarea următorului `yield`. Ceea ce se petrece este că datele sunt trimise lui `yield`, dar ceea ce returnează `next` este obiectul cu care suntem deja obișnuiți. La `value` avem `undefined` în cazul în care `yield` nu are operand în dreapta.

```javascript
function* altGenerator () {
  const mesajPrimit = yield; // yield este chiar valoarea primită pentru că nu are operand
  console.log(mesajPrimit);
};

const instantaAltGenerator = altGenerator();
console.log(instantaAltGenerator.next()); // Primul next este de instanțiere
// { value: undefined, done: false }
console.log(instantaAltGenerator.next('mesaj spre generator'));
// mesaj spre generator
// apoi returneaza
// { value: undefined, done: true }
```

Nu pot fi pasate valori la prima apelare a lui `next()` pentru că metoda `next()`, de fapt, poate trimite o valoare doar unui `yield` care așteaptă. Dacă nu există vreun `yield` care să aștepte, nici valoarea nu are cui să-i fie pasată. Reține faptul că orice ai pasa drept argument primului `next()`, va fi ignorat de generator. Valoarea pasată este folosită de generator ca valoare a întregii expresii `yield` în care a fost înghețat generatorul.

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

Mai este un lucru foarte important de menționat. Funcția generator va executa tot codul dintre două yield-uri, dacă există.

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

Observă că o funcție generator se poate *consuma* cu un enunț `for...of`. Pentru exemplul de mai sus, să spunem că dorim să accesăm prima valoare. În acest caz, pur și simplu punem *cursorul* `next()` pe ea. Valorile pot fi iterate și printr-un `while` pentru a scoate valoarea din obiectul returnat de `next()`. Pentru fiecare iterație testezi dacă `done` are valoarea `true`.

Formularea condiției: `!(let obi = refIterator.next()).done`.

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

Folosind sintaxa spread (`...numeGenerator`) poți aplica fiecare element al iterabilului într-un anumit anumit context. Acest lucru înseamnă că poți *extrage* valorile direct într-un array, de exemplu.

```javascript
let listaCompletată = [1, 2, ...numeGenerator]; // [1, 2, x, y, z]
```

## Generatoare de generatoare

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
let obi;
for(obi of emiteFormule()){
  console.log(obi);
};
```

## Bucle infinite

Generatorarele permit construcția de bucle infinite, fără teama că vor returna erori din mediul în care programul rulează. Acest lucru se petrece pentru că indiferent de faptul că limita este la infinit, generarea valorilor este controlată prin `yield`. Se poate ușor închipui o listă cu bilete de ordine sau orice necesită o listă de elemente, care să se prelungească la infinit și care au nevoie de o identificare unică, de exemplu.

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
let obiIterabil = stopata(), elem;
for (elem of obiIterabil) {
  console.log(elem);
  break;
};
obiIterabil.next(); // { value: undefined, done: true }
```

## Parcurgerea unitară a mai multor surse

Sunt cazuri în care ai nevoie să poți parcurge mai multe structuri de date deodată pentru a căuta legături între ele prin echivalența dintre anumite valori căutate sau pentru a vedea prin ce diferă, etc. Aceste modele de lucru se pretează lucrului cu generatorarele.

### Îmbinarea mai multor surse

 În următorul exemplu, acem un scenariu în care parcurgem mai multe seturi de date cu scopul de a le contopi într-o unică sursă de date care va fi un array. Acest array va conține toate elementele individuale ale tuturor surselor contopite.

```javascript
// Convertirea unui structuri într-un generator
// dacă avem de-a face cu un array
// În caz contrar, se presupune că este un generator
// structura de date primite și se face defer la el.

function* toGenerator (structure) {
  if (Array.isArray(structure)) {
    let elem;
    for (elem of structure) {
      yield elem;
    }
  } else {
      yield* structure;
  }
};

// Întrețeserea surselor de date, fie
// array-uri, fie generatoare într-o singură sursă

function* threader (...sources) {
  let yielding = true, // controlezi rezultatul din while
      generators = sources.map( source => toGenerator(source) ); // asigură-te că toate sursele sunt generatoare

  while (yielding) {
    yielding = false; // dacă din bucla de prelucrare nu este setată `yielding` la `true`, se iese din buclă

    let source;
    for (source of generators) {
      let next = source.next();
      // când cursorul are proprietatea `done` la `false`, va fi negată pentru a satisface testul condiției.
      if (!next.done) {
        yielding = true;
        yield next.value;
      };
      // când pentru o singur set de date `done` va fi `true`, valoarea lui `yielding` va rămâne `false`
    };

  };
};

var col1 = [1,2,3],
    col2 = ['a','b','c'],
    col3 = [{'x':1}],
    colectie = [],
    mareGen = threader(col1, col2, col3),
    val;

for (val of mareGen) {
  colectie.push(val);
};
console.log(colectie); // [ 1, 'a', { x: 1 }, 2, 'b', 3, 'c' ]
```

### Parcurgere tip fermoar

Generatoarele permit parcurgerea a două sau mai multe structuri de date diferite pentru a căuta după anumite criterii similitudini sau pentru a satisface alte scenarii mai complexe.

## Metode generator în obiecte și clase

### Metode în obiecte literale

Poți introduce metode generator ca metode ale unui obiect. Atenție, acest lucru nu va transforma obiectul într-un iterable.

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

Funcțiile generator pot fi metode ale unei clase. Pentru a realiza acest lucru, se va adăuga steluța în stânga identificatorului metodei la fel precum în cazul metodelor obiectelor.

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

## Recursivitate

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

Corutinele sunt un model de organizare a executării funcțiilor care își întrerup execuția pentru a ceda controlul alteia. JavaScript nu are un mecanism dedicat realizării corutinelor. Cel mai apropiat fiind totuși generatoarele care prin `yield`, cedează controlul unui alt context de execuție, iar la la un moment sunt rechemate pentru a-și continua execuția. Corutinele sunt un mecanism care în loc să folosească callback-urile, fac uz de *event loop*.

Pentru a gestiona un generator folosind o corutină, trebuie să elaborezi o funcție tip *ambalaj* care să gestioneze pașii necesari. Logică necesară:

- funcția execută argumentul, care va crea obiectul generator;
- apelează metoda `next()` pe obiectul generator, fapt care va conduce la executarea întregului cod al funcției care creează obiectul generator, până când apare `yield`;
- se va apela metoda `next(...)` în care vor fi trimise date către generator;
- returnează o funcție care face closure pe generator.

```javascript
function corutină (funcCreareGenerator) {
  let obiectGenerator = funcCreareGenerator(); // instanțierea obiectului
  obiectGenerator.next(); // execută codul generatorului până la primul yield
  return function (dateDeTrimisÎnGenerator) {
    obiectGenerator.next(dateDeTrimisÎnGenerator); //valoarea pasată generatorului
  };
};
```

Folosind acest model, funcția *ambalaj* oferă mecanismul de interacțiune cu generatorul fără a mai apela metoda `next()` direct pe obiectul generator. Reține faptul că primul `next()` nu face nimic altceva decât să inițializeze generatorul. Corutinele elimină acest *pas mort*.

```javascript
// funcția care va crea obiectul generator
function * funcCreareGenerator () {
  let primaVal = yield;
  console.log('Iese prima valoare la primul yield: ', primaVal);
  let aDouaVal = yield;
  console.log('Și a doua valoare: ', aDouaVal);
};

let generatorGestionat = corutină(funcCreareGenerator);
generatorGestionat('primo');  // apelare corutină cu trimitere de date generatorului => Iese prima valoare la primul yield:  primo
generatorGestionat('secundo');// => Și a doua valoare:  secundo
```

Ținta ar fi ca de fiecare dată când se face un `yield`, o funcție să preia efortul de calcul și să ofere un rezultat. Când corutina și-a încheiat propria execuție, apelează la un alt `yield` din generator.

Un alt model de realizare a corutinei implică destructurarea și mutarea logicii în funcția returnată.

```javascript
function corutină (funcCreareGenerator) {
  return function (...args) {
    let obiectGenerator = funcCreareGenerator(...args); // instanțierea obiectului
    obiectGenerator.next(); // execută codul generatorului până la primul yield
    return obiectGenerator;
  };
};

let generatorAmbalat = corutină (function* () {
  console.log(`Obții răspuns din prima ${yield}`);
  return 'Am terminat!';
});

generatorAmbalat().next('Norocel!');
/*
Obții răspuns din prima Norocel!
{value: "Am terminat!", done: true}
*/
```

### Corutine și promisiuni

Corutinele pot fi folosite și în scenarii în care sunt gestionate promisiuni.

```javascript
let colectie1 = {a: 1, b: 'ceva'},
    colectie2 = {x: 'a', y: 10};

let promisiune1 = new Promise(function exec (resolve, reject) {
  resolve(colectie1);
});
let promisiune2 = new Promise(function exec (resolve, reject) {
  resolve(colectie2);
});

function corutina (functie) {
  let generator = functie();
  let avanseaza = function salt (date) {
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

Generatorii asincroni sunt o combinație de funcții asincrone cu generatoarele. Funcțiile asincrone returnează promisiuni, iar funcțiile generator returnează obiecte iterator. Ceea ce vom obține este un iterator de promisiuni.

Funcțiile generator permit parcurgerea unor obiecte iterabile sincrone, iar pentru obiectele iterabile asincrone, se vor folosi generatoarele asincrone. Acestea implementează o metodă [Symbol.asyncIterator](){}. Implicația directă este că pentru ca un obiect să fie unul **async iterabil**, trebuie să aibă o cheie `Symbol.asyncIterator`.

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

Marca generatoarelor asincrone este caracterul steluță după cuvântul cheie `function` prefixat de *async*, adică `async function*`. Intern, aceste noi funcții introduse de ECMAScript 2017 sunt bazate pe generatoare.

```javascript
async function* aduJSON(url) {
    try {
        let req = await fetch(url);
        let txt = await req.text();
        return JSON.parse(txt);
    }
    catch (error) {
        console.log(`Stack-ul: ${error.stack}`);
    }
};
aduJSON('https://aiurea.ro/date.json').then(res => console.log(res)).catch(e => console.error);
```

**Generatoarele sincrone** returnează un obiect `Generator` pentru care o invocare a metodei `next()`, produce un obiect `{value: 'oVal', done: true/false}`. Invocarea lui `next()` aduce valoarea adusă de `yield`, de fapt.
**Generatoarele asincrone** returnează și ele un obiect `Generator`, dar pentru fiecare `next()` invocat, vom obține o promisiune pentru fiecare obiect `{value, done}` care a fost returnat de un `yield`.

Adu-ți mereu aminte de faptul că generatoarele primesc date prin `next()` în momentul când fac `yield`. Acest lucru permite *trezirea* unui generator ori de câte ori apar date asincrone, dar generatorului îi vor părea ca și cum ar fi apărut sincron.

Anatomia unui apel `next()`:

- un `Promise` este trimis în lista de microtaskuri.
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
const [{value: valoarea1}, {value: valoarea2}] = await Promise.all([
    asyncGenObj.next(), asyncGenObj.next()
]);
console.log(valoarea1, valoarea2); // ceva altceva
```

Observă faptul că nu a trebuit verificată valoarea lui `done` pentru că numărul de elemente din array-ul asincron este cunoscut. Astfel, a fost posibilă atribuirea valorilor unui număr fix de variabile.

## Recursivitate cu generatoare asincrone

Parcurgerea structurii de directoare poate fi un exemplu practic prin care generatoarele asincrone își dovedesc utilitatea. Exemplul a fost preluat din articolul *Async Generators in the Wild* pentru simplitatea soluției.

```javascript
const { resolve }       = require('path');
const { readdir, stat } = require('fs').promises;

async function* getFiles(rootPath) {
  const fileNames = await readdir(rootPath, { withFileTypes: true }); // contituie o structură iterabilă
  for (const fileName of fileNames) {
    const path = resolve(rootPath, fileName.name); // extrage calea fișierului
    if (filename.isDirectory()) {
      yield* getFiles(path); // în caz că avem calea către un director, rulăm din nou
    } else {
      yield path; // dacă este un fișier, este returnată calea către acesta.
    }
  }
};
```

Modul în care trebuie *consumate* obiectele oferite de generatorii asincroni sunt prin folosirea `for...await...of`.

```javascript
for await(const elem of getFiles('.')) console.log(elem);
```

În caz de nevoie poți consuma un generator asincron folosind funcții specializate.

```javascript
function consumator1 (iteratorAsincron, clbk) {
  // Apelararea lui next va avea ca efect returnarea unei promisiuni.
  iteratorAsincron.next().then(({done, value}) => {
    if (done) return;
    clbk(value); // lucrează cu valoarea returnată de promisiune
    consumator1(iteratorAsincron, clbk); // consumă următorul next
  });
};

consumator1(getFiles('./'), cale => console.log(cale));
```

Un alt scenariu ar fi cel în care ai nevoie să cumulezi rezultatele obținute.

```javascript
async function acumulareRezultate (iteratorAsincron, clbk, acumulator) {
   let rezultat = acumulator; // inițializarea structurii goale
   for await(const valoare of iteratorAsincron) {
     rezultat = clbk(acumulator, valoare); // popularea cu rezultatul funcției callback
   }
   return rezultat;
};

function extrageCaile (obiIterator) {
  acumulareRezultate(obiIterator, (acumulator, valoare) => (acumulator.push(valoare), acumulator), []);
}

const toateCaile = await extrageCaile(getFiles('./'));
```

Pentru o procesare a rezultatelor pe măsură ce acestea apar, putem folosi următoarea soluție.

```javascript
// Transformă fiecare nume de fișier într-un obiect care are o proprietate `name`
async function* toObj(filesIter) {
  for await (const name of filesIter) yield { name };
}

// Adaugă dimensiunea fișierului (aceasta fiind o altă operațiune async)
async function* addFileSize(objIter) {
  for await (const obj of objIter) {
    const size = (await stat(obj.name)).size;
    yield { ...obj, size };
  }
}

// Compune funcțiile
const processed = addFileSize(toObj(getFiles('.')))

// Extrage valorile și prelucrează-le pe măsură ce apar.
for await (const { name, size } of processed) {
  console.log(`${name} (${size} bytes)`);
}
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
ziCeva.throw('Aoleu, ceva e rău.');
// Eroare Auleu, ceva e rău.
// { value: undefined, done: true }
```

Când codul executat în generator face `throw`, eroarea va fi afișată drept rezultat al următorului `next()`.

## Mantre

- Toate generatoarele asincrone au un *queue* de Promises care să fie rezolvate printr-un `yield` sau un `throw`.

## Dependințe cognitive

-   funcții,
-   medii lexicale,
-   promisiuni,
-   iteratori
-   `for...of`

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
- [ECMAScript® 2015 Language Specification | 2015](https://262.ecma-international.org/6.0/#sec-generatorfunction-objects)
- [Async Generators in the Wild](https://qwtel.com/posts/software/async-generators-in-the-wild/)
- [Node.js fs.readdir recursive directory search](https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search/45130990#45130990)
