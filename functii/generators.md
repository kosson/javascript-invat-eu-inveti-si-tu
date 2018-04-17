# Generators

Generatoarele oferă posibilitatea de a parcurge o colecție de date. Este un nou tip de funcții introduse în ECMAScript 2015 care *produc* (yield în limba engleză) valori la cerere. Punerea unei steluțe după cuvântul cheie `function`, va semnala că avem de a face cu o funcție generator.

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

Acest nou tip de lucru cu funcțiile se bazează pe faptul că accesul la date se face cu ajutorul iteratoarelor. Atunci când execuți un generator se crează un nou obiect iterator. Standardul menționează că acest obiect nou generat poate suporta și subclase. Un obiect iterator știe cum să acceseze elementele unei colecții unul după altul până la epuizarea lor. Acest obiect are niște metode disponibile pentru a iniția evaluarea expresiilor după cuvântul cheie `yield`. După evaluare, execuția generatorului se oprește în așteptarea unui nou apel al metodei `next()`. Poți percepe un generator ca un program care se execută la cerere și în etape. Fiecare etapă marcată de `yield` are asociată o stare.

Apelarea unui generator nu îl execută, ci doar este trimisă funcția în stiva apelurilor și imediat este suspendată execuția. De fapt, la apelare este returnat un obiect iterator. Obiectul iterator ține o referință către contextul de execuție al generatorului care este în call-stack. După ce au fost evaluate toate expresiile până la întâlnirea primului `yield`, contextul de execuție al generatorului va fi scos din stiva de apeluri, dar obiectul iterator care s-a creat, va ține minte acest context de execuție. Execuția metodei `next()` nu creează un nou context de execuție precum în cazul clasic, ci doar reactivează contextul de execuție al generatorului pe care-l împinge din nou în callstack. Se continuă execuția de unde a rămas începând cu expresiile de după `yield`. Codul este evaluat până la întâlnirea următorului `yield`, când execuția este suspendată din nou, nu înainte de a actualiza obiectul iterator care ține minte starea - ține viu contextul de execuție. Acest ultim aspect oferă un mare avantaj al generatoarelor pentru că rețin valorile între diferitele etape parcurse cu `next()`.

Dacă în execuție nu mai este întâlnit niciun `yield`, funcția generator returnează obiectul iterator, care în acest moment va avea valoarea `true` asociată cheii `done`.

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

Un lucru foarte interesant care privește funcțiile generator este că se pot trimite mesaje din funcție în obiectul iterator instanțiat și invers. Dacă tratezi generatoarele ca funcții simple, cel mai la îndemână mecanism de trimitere a datelor este cel al argumentelor. Reține faptul că poți *injecta* date în generator în oricare etapă a execuției sale, de regulă într-o etapă în care dorești să utilizeze date externe.

```javascript
function* testDeGen (oValoare) {
  let valoareEtapa = yield 'Ceva ' + oValoare;
};
let obiIterabil = testDeGen('important');
obiIterabil.next().value; // "Ceva important"
```

### Trimiterea unui mesaj din instanță către generator

Pentru a trimite date la o anumită etapă de execuție, se vor pasa datele în apelul metodei `next()`.

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

-   creezi o referință către obiectul adus de fiecare yield: `let obi;`
-   `obi = refIterator.next()` aduce obiectul.
-   pui expresia între paranteze pentru a o evalua. Evaluarea este obiectul adus de cursor: `(obi = refIterator.next())`
-   Valoarea lui `done` o negi pentru toate obiectele returnate care au proprietate `value`, adică false va deveni true pentru ca bucla while să poată avansa.

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

## Dependințe cognitive

-   funcții,
-   iteratori
-   `for..of`
