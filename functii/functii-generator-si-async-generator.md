# Funcțiile generator

## Introducere

O funcție generator este o funcție care se poate opri în mijlocul execuției și poate continua de unde a rămas. Funcțiile generator oferă posibilitatea de a parcurge colecții de date. Este un nou tip de funcții introduse în ECMAScript 2015 care *produc* (*yield* în limba engleză) valori la cerere. Caracterul steluță așezat după cuvântul cheie `function`, va semnala că avem de a face cu o funcție generator. Executarea unei funcții generator produce un obiect de tip `Generator`.

```javascript
function *generezDate () {
    yield 'prima';
    yield 'a doua';
}
let obiectulGenerator = generezDate();
let unu = obiectulGenerator.next(); // {value: 'prima', done: false}
let doi = obiectulGenerator.next(); // {value: 'a doua', done: false}
let trei = obiectulGenerator.next();// {value: undefined, done: true}
```

Acest obiect este iterabil. Folosind metoda *next* avem acces la valori. Ceea ce se petrece la fiecare apelare a metodei `next()` este o invocare/execuție a funcției `generezDate`.

**Moment ZEN**: Funcțiile săgeată nu pot fi iteratori.

O funcție generator poate fi considerată a fi un constructor de obiecte `Generator`.

**Moment ZEN**: Funcțiile generator nu pot juca rolul de constructori.

## Mică anatomie

Pentru vedea cum funționează un generator, cel mai bine ar fi să-l recreezi cu instrumentele simple pe care le ai la îndemână. În acest sens, ne vom baza pe mecanismul closure pentru a parcurge un array.

```javascript
function creeazăUnGenerator (unArray) {
    let indexElement = 0;
    
    let servant = {
        next: function () {
            let elementulCurent = unArray[indexElement];
            indexElement++;
            return elementulCurent;
        }
    }

    return servant;
};

let micGenerator = creeazăUnGenerator(['a', 'b', 'c']);
let element1 = micGenerator.next(); // 'a'
let element2 = micGenerator.next(); // 'b'
```

Remarcăm faptul că metoda `next` este o funcție care a făcut closure pe mediul lexical al lui `creeazăUnGenerator` la momentul execuției acesteia.

## Descriere

La momentul apelării, o funcție generator returnează obiectul iterabil de tip `Generator`. Apariția lui `yield` comandă oprirea execuției funcției. La primul apel, prima iterare produsă de apelarea metodei `next()`, se execută codul intern până la momentul în care întâlnește operatorul `yield`. Acesta va crea un obiect conform `IteratorResult`, adică de forma `{value: "ceva", done: true/false}` în a cărei proprietate `value` va pune valoarea rezultată în urma evaluării expresiei de la dreapta lui `yield`. Funcția își va relua execuția abia când *next* va fi apelat din nou aceasta fiind a doua iterație ș.a.m.d. Din nou, se va executa tot codul până la apariția cuvântului cheie `yield`, urmat de returnarea rezultatului evaluării expresiei de la dreapta. La apelarea metodei `next()` se vor putea trimite date prin argumente, dacă se dorește.

```javascript
function* unGen () {
  console.log('până la primul yield');
  yield 10 + 2;
  console.log('până la al doilea yield');
  yield 20 + 2;
}

const genObi = unGen();

console.log(genObi.next()); // până la primul yield {value: 12, done: false}
console.log(genObi.next()); // până la al doilea yield {value: 22, done: false}
console.log(genObi.next()); // {value: undefined, done: true}
```

Din exemplu observăm că apelarea metodei *next* a treia oară, adică după ce datele obiectului iterabil au fost consumate, va returna un obiect a cărei proprietate `value` va avea valoarea `undefined`, iar valoarea lui `done` va fi `true`. După consumarea datelor, ori de câte ori se va apela *next*, vom obține același rezultat.

În cazul în care am returna din funcția generator, la ultimul apel *next* după ce toate datele vor fi fost consumate, vom avea drept valoare a proprietății `value` rezultatul evaluării expresiei de după `return`. Dacă am fi avut cod de evaluat de la ultimul `yield`, va fi și acesta evaluat și își va produce rezultatele. Observă faptul că înainte aveam `undefined`.

```javascript
function* unGen () {
  console.log('până la primul yield');
  yield 10 + 2;
  console.log('până la al doilea yield');
  yield 20 + 2;
  return 'Ai consumat iteratorul!'
}

const genObi = unGen();

console.log(genObi.next()); // până la primul yield {value: 12, done: false}
console.log(genObi.next()); // până la al doilea yield {value: 22, done: false}
console.log(genObi.next()); // {value: 'Ai consumat iteratorul!', done: true}
```

Ceea ce trebuie adăugat despre valoarea returnată este că aceasta nu este în obiectul iterator. Dacă am proceda rapid la un spreading, acest lucru ar fi revelat imediat: `console.log('valori', [...unGen()]);`.

**Moment ZEN**: Returnarea explicită dintr-o funcție generator generează `{value: valoare_evaluată_ptr_return, done: true }`.

Legat de returnarea unei valori, putem forța un generator să returneaze o valoare impusă în locul uneia care ar fi fost firesc să apară.

```javascript
function* unGen () {
  console.log('până la primul yield');
  yield 10 + 2;
  console.log('până la al doilea yield');
  yield 20 + 2;
  console.log('până la al treilea yield');
  yield 30 + 2;
  return 'Ai consumat iteratorul!'
}

const genObi = unGen();

console.log(genObi.next()); // până la primul yield {value: 12, done: false}
console.log(genObi.next()); // până la al doilea yield {value: 22, done: false}
const rezultatImpus = genObi.return(42);
console.log(rezultatImpus); // {value: 42, done: true}
console.log(genObi.next()); // {value: undefined, done: true}
```

În concluzie, ceea ce poți obține dintr-un obiect generator sunt rezultate de tipul `{value: 'ceva', done: false}`, poți obține valoarea expresiei lui `return`, dacă există în momentul în care generatorul a fost *consumat* și mai poți face ceva interesant. În caz că este necesar, poți indica o eroare introducând un `throw new Error('E o eroare aici');`.

```javascript
function* unGen () {
  yield 10 + 2;
  yield 20 + 2;
  yield 30 + 2;
  throw new Error('E o eroare aici');
}
const genObi = unGen();
console.log(genObi.next()); // {value: 12, done: false}
console.log(genObi.next()); // {value: 22, done: false}
console.log(genObi.next()); // {value: 32, done: false}
console.log(genObi.next()); /* Uncaught Error: E o eroare aici */
```

Poți întrerupe funcționarea unui generator apelând direct metoda `throw` a obiectului iterator.

```javascript
function* unGen () {
  yield 10 + 2;
  yield 20 + 2;
  yield 30 + 2;
}
const genObi = unGen();
console.log(genObi.next()); // {value: 12, done: false}
console.log(genObi.next()); // {value: 22, done: false}
try {
  genObi.throw('A apărut o eroare');
} catch(error) {
  console.error(error);
}
// am intrerupt generatorul din a produce și ultima valoare
console.log(genObi.next()); // {value: undefined, done: true}
```

## Analiza generatoarelor

Obiectul `Generator` respectă următoarele:

- protocolului impus de interfața *Iterable* prin implementarea lui `[Symbol.iterator]()`,
- interfața *Iterator* prin implementarea lui `next()` și
- `IteratorResult` prin rezultatul returnat de `yield` sub forma `{value: ceva, done: true/false}`.

Obiectul rezultat este iterabil, dar în aceeași măsură este și un *iterator*. Faptul că este iterabil îl face pretabil la parcurgerea cu `for...of` sau poate fi folosit cu operatorul spread (`...`). Mai mult, prin intermediul operatorului `yield`, generatoarele pot primi și trimite date, acestea fiind *expediate* ca argument metodei `next(date)`.

**Moment ZEN**: Funcțiile generator produc iteratori.

Pentru a aduce o perspectivă importantă pentru înțelegerea funcțiilor generator, să privim la ceea ce rezolvă acestea. În exemplul oferit, avem o funcție simplă care face o implementare a protocolului *iterable*, ceea ce înseamnă și implementarea protocolului *iterator*. Funcția returnează obiectul necesar iterării, fiind pretabil la parcurgerea cu `for...of`.

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

În exemplu, funcția returnează obiectul iterator, care mai apoi poate fi consumat. Este observabilă construcția obiectului ce va fi returnat ca `[Symbol.iterator]`. Acest simbol este o metodă care la rândul său returnează un obiect care pune la dispoziție metoda `next()`.

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

Apelarea lui `next` care are acces la mediul lexical al lui `cronometruInvers` a declanșat evaluarea codului intern al funcției `cronometruInvers` care se termină la momentul în care este întâlnit `yield` a cărui valoare o returnează. Adu-ți mereu aminte că metoda `next()` invocă execuția funcției `cronometruInvers` și mai mult decât atât, face chiar closure pe mediul lexical intern care se stabilește atunci. Acest lucru se petrece pentru că această metodă este adăugată automat de motorul JavaScript în obiectul returnat. Dar această funcție care joacă rol de metodă în acest caz face closure pe mediul lexical al lui `cronometruInvers` când a fost executată. În această fază a înțelegerii este bine să ne raportăm la cuvântul cheie `yield` ca având puterea unui `return` a cărui sarcină, în cazul unui generator, este să **suspende** execuția funcției prin returnarea unei valori. Această suspendare a execuției codului corpului unei funcții știm bine că în cazul unei funcții *normale* nu este posibilă pentru că are comportament sincron (*run for completition*) evaluând toate expresiile până la epuizarea lor sau până când este întâlnit `return` care returnează o valoare sau nu, dar care are puterea să încheie execuția. Execuția unei funcții din perspectiva motorului JavaScript este să ții evidența unui set de date din memorie (closer-ul) și să ții evidența expresiilor pe care trebuie să le evaluezi în ordinea în care acestea apar în corpul funcției ([mecanismul motorului](https://262.ecma-international.org/13.0/#sec-generatorresume) ce ține minte este `[[GeneratorContext]]`). Acesta este un context de execuție, de fapt. Ceea ce face `yield` este să întrerupă evaluarea expresiilor la momentul în care *firul de execuție* ajunge la el și să returneze valoarea din dreapta sa. Dar contextul de execuție nu este *dizolvat* precum în cazul funcțiilor simple.

Pentru a studia în mai mare adâncime comportamentul generatoarelor, mai jos am introdus și posibilitatea de a introduce date în generator.

```javascript
function * unGenerator () {
    let oValoareCareVaFiActualizataInViitor = 100;
    const dateDeCareAmNevoieÎnViitor = yield oValoareCareVaFiActualizataInViitor;
    yield 2 * oValoareCareVaFiActualizataInViitor;
}

const dăMiValoriObiect = unGenerator();
let prima = dăMiValoriObiect.next(); // {"value": 100,"done": false}
let aDoua = dăMiValoriObiect.next(20); // {value: 200, done: false}
let aTreia = dăMiValoriObiect.next(); // {value: undefined, done: true}
```

În acest caz, primul apel `next()` va returna valoarea curentă a variabilei `oValoareCareVaFiActualizataInViitor` prin faptul că rulează codul `unGenerator()` până când întâlnește pentru prima dată `yield` a cărui expresie din dreapta sa este evaluată și returnată, devenind valoarea variabilei `prima`. Imediat, contextul de execuție a lui `unGenerator()` este suspendat, ceea ce înseamnă că motorul a *notat* unde a rămas cu execuția corpului și ce date erau disponibile la momentul suspendării. Totuși, ceva interesat s-a petrecut. În evaluarea expresiei `const dateDeCareAmNevoieÎnViitor = yield oValoareCareVaFiActualizataInViitor;`, identificatorul `dateDeCareAmNevoieÎnViitor` a fost creat în memoria locală a contextului de execuție a funcției `unGenerator()`, dar pentru că a fost invocat `yield` ca parte a expresiei din dreapta egalului, nu a mai fost atribuită nicio valoare. Identificatorul `dateDeCareAmNevoieÎnViitor` a rămas neinițializat.

Adu-ți mereu aminte că invocarea metodei `next()` face closure pe mediul lexical al funcției generator.

În cazul celui de-al doilea apel `next(20)`, firul de execuție își reia evaluarea corpului funcției unde a rămas. Unde a rămas este la `dateDeCareAmNevoieÎnViitor` care a rămas neinițializat. Pentru că metodei `next()` i-a fost pasată valoarea `20`, aceasta va deveni valoarea cu care se va inițializa `dateDeCareAmNevoieÎnViitor`, fiind considerat rezultatul evaluării expresiei `yield dateDeCareAmNevoieÎnViitor`. Reține că datele pe care le pasezi metodei `next()` vor fi considerate rezultatele evaluării expresiei `yield ceva` la reluarea execuției funcției. Ai putea spune că ai creat premiza *injectării* unor date în generator pe care le poți folosi ulterior, concomitent cu returnarea unora în aceeași mutare. Dar evaluarea continuă după inițializarea lui `dateDeCareAmNevoieÎnViitor` cu valoarea `20` și ajungem la următorul `yield` care ca returna evaluarea expresiei din dreapta. Fiind ultimul, va încheia și execuția funcției cu rol de generator.


## Sintactic sugar

După cum se observă, de cele mai multe ori, generatorii pot fi considerați a fi un adaos sintactic (*sintactic sugar*) cu scopul de a crea obiecte iteratori. Propriu-zis, prin marcarea cu steluță a unei funcții, spunem motorului să implementeze toate mecanismele necesare creării unui obiect iterator la momentul invocării. Această specificitate a funcțiilor generator le face candidatul perfect pentru a obține serii de valori prin intermediul spreading-ului, buclelor și a recursivității.

```javascript
function* unGen () {
  console.log('până la primul yield');
  yield 10 + 2;
  console.log('până la al doilea yield');
  yield 20 + 2;
}
console.log('valori', [...unGen()]); // spreading
// până la primul yield
// până la al doilea yield
// valori [12, 22]
```

Putem obține valorile și cu `for...of`.

```javascript
const obiGen = unGen();
for (const valoare of obiGen) {
  console.log(valoare);
}
// până la primul yield
// 12
// până la al doilea yield
// 22
```

Aceste exemple simple indică o concluzie foarte valoroasă: poți să-ți construiești propriul obiect iterator.

## Cum le folosești

Poți folosi funcțiile generator în următoarele scenarii:

- generezi obiecte iterator, care sunt niște producători de date. Fiecare `yield` poate returna o valoare trimisă ca date prin `next(date)`. Acest lucru înseamnă că generatoarele pot produce date dacă sunt folosite în bucle și în recursivitate;
- consumi date folosind un generator pentru că poți trimite date în funcția generator la momentul în care apelezi `next(data)`. Funcția își *suspendă* execuția până când un nou calup de date este primit la următorul apel `next(data)`;
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

Obiectul returnat de funcțiile generator este iterabil și poate fi înțeles ca o bandă cu produse la casa unui magazin. La apăsarea unei pedale (metoda *next()*), banda aduce în atenția operatorului comercial un produs pe care îl evaluează returnând prețul și apoi următorul produs ș.a.m.d. După evaluare, execuția generatorului se oprește în așteptarea unui nou apel al metodei `next()`. Poți percepe un generator ca un program care se execută la cerere și în etape.

**Moment ZEN**: Fiecare etapă marcată prin `yield` are asociată o stare.

Parcurgerea unui iterabil în funcția generator este posibilă dacă este absolut necesar, dar nu se poate face `yield` din callbackuri aplicate de exemplu la `forEach`, `map`, etc.

**Moment ZEN**: Nu poți face `yield` din callback-uri.

## Parcurgerea cu for...of

Este posibilă parcurgerea unui iterabil într-o funcție generator folosind `for...of`, de exemplu.

Apelarea unei funcții generator trimite funcția în stiva apelurilor, fiind evaluate toate expresiile până la primul `yield`, când își suspendă execuția, returnând obiectul `Generator`. Apoi funcția își întrerupe execuția dispărând din stivă, dar obiectul returnat va ține o referință către contextul de execuție a funcției generator. De fiecare dată când funcția va fi reluată și suspendată, obiectul `Generator` va memora contextul de execuție. Reține faptul că întregul cod de dinaintea primului `yield` va fi executat.

Execuția metodei `next()` nu creează un nou context de execuție, ci doar reactivează contextul de execuție al funcției generator, pe care-l împinge din nou în stivă. Se continuă execuția de unde a rămas evaluându-se tot codul până la `yield` și apoi expresiile de la dreapta acestuia. Apoi execuția este suspendată din nou nu înainte ca obiectul iterator să fie actualizat. Acesta ține minte starea - ține viu contextul de execuție.

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

## Procesare de alte generatoare cu yield* și recursivitate

Funcțiile generator pot procesa alte funcții generator. Expresia `yield*` este folosită în cazul în care dorești să delegi execuția către un alt generator sau obiect iterator.

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
// poți să faci spreading
let arr = [...unGen()];
console.log(arr); // ["salve", "bau", "cip cip"]
```

Ceea ce se petrece atunci când `yield*` evaluează un obiect iterabil este că va face `yield` pentru toate valorile din obiectul iterabil. Acest obiect nu trebuie să fie neapărat un alt generator, ci un simplu iterabil, precum array-urile. Dintr-un generator poți procesa alte generatoare precum în exemplul de mai jos.

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

Poți folosi `yield*` de mai multe ori într-un generator.

```javascript
const lista = ['ceva', 'undeva'];
function* rezultate (lista) {
  yield* lista;
  yield* lista.map(cuvant => cuvant.toUpperCase());
};
const iterator = rezultate(lista);
for (let elem of iterator) {
  console.log(elem);
}
```

## Generatoare consumatoare de date

Un lucru foarte interesant care privește funcțiile generator este că se pot trimite date către `yield` prin `next(date)`.

### Date noi prin argumente

Dacă tratezi generatoarele din perspectiva funcțiilor, cel mai facil mecanism de trimitere a datelor sunt argumentele. Dacă trimiți date generatorului la momentul invocării, acestea sunt disponibile obiectului iterator. În acest caz, primul `yield` va putea lua în evaluare datele primite la invocarea și constituirea obiectului generator. Totuși, dacă vei încerca să trimiți date în prima invocare a lui `next`, acestea vor fi ignorate. Reține faptul că poți *trimite* date în generator în oricare etapă a execuției sale. De regulă, într-o etapă în care dorești să folosești date externe.

```javascript
function* testDeGen (oValoare) {
  let x = 10;
  let prima = yield `Ceva ${oValoare} ori ${x}`; // Creezi variabila `prima` și faci yield
  console.log(`Valoarea variabilei x este ${x}, iar variabila «prima» are valoarea ${prima}`);
  let adoua = yield `${prima} de ${x} apoi al doilea yield e gata`;
  return `${prima} apoi ${adoua} toate de ${x}`;
};
let obiIterabil = testDeGen('important'); // trimite date primului yield

obiIterabil.next('ignorat'); // {value: 'Ceva important ori 10', done: false}
obiIterabil.next('pas1');
// Valoarea variabilei x este 10, iar variabila «prima» are valoarea pas1
// {value: 'pas1 de 10 apoi al doilea yield e gata', done: false}
obiIterabil.next('pas2'); // return-ul!!!
// {value: 'pas1 apoi pas2 toate de 10', done: true}
```

Observă faptul că la momentul creării obiectului `Generator` am pasat niște date prin argumentul funcției. Aceste date vor popula variabila locală stabilită prin parametrul `oValoare`. Astfel, primul `yield` lucrează și cu date externe, iar rezultatul este disponibil la proprietatea `value` a obiectului primit. Reține că valorile parametrilor funcției generator sunt disponibile primului `yield`. Aceste date trebuie pasate ca argumente la inițializarea obiectului `Generator`.

Funcțiile generator pot primi date și după ce au pornit execuția. Acest lucru se poate face prin intermediul argumentelor la momentul invocării metodei `next`.
Valorile sunt trimise, de regulă, pentru a influența rezultatul următorului `yield`. Pentru a *captura* datele trimise prin `next`, trebuie să declarăm o variabilă a cărei valoare vor fi chiar datele trimise, dar care nu poate fi accesată decât la următorul `yield` cerut prin apelarea ulterioară a lui `next`. Chiar dacă la prima vedere variabila pare că va avea valoarea rezultată din evaluarea expresiei din dreapta (`yield expresie`), datele trimise vor fi de fapt valoarea gata de a fi folosită în următoarele evaluări ale expresiilor până la următorul `yield` sau chiar în acesta.

Reține că variabila va avea datele primite prin `next(date)`, nu rezultatul evaluării lui `yield expresie`.

Ceea ce returnează `next` este obiectul cu care suntem deja obișnuiți. La `value` avem `undefined` în cazul în care `yield` nu are operand în dreapta.

În exemplul următor, pentru că nu avem date de inițializare trimise prin argumente la momentul constituirii obiectului `Generator`, primul `yield` va returna `undefined` atunci când se va face apelarea pentru prima dată a metodei `next()`.

```javascript
function* altGenerator () {
  const mesajPrimit = yield; // yield este chiar valoarea primită pentru că nu are operand
  console.log(mesajPrimit);
};

const instantaAltGenerator = altGenerator();
console.log(instantaAltGenerator.next()); // Primul next este de instanțiere (nu are cod deasupra yield-ul)
// { value: undefined, done: false }
console.log(instantaAltGenerator.next('mesaj spre generator'));
// mesaj spre generator
// apoi returneaza
// { value: undefined, done: true }
```

Nu pot fi pasate valori la prima apelare a lui `next()` pentru că metoda `next()`, de fapt, poate trimite o valoare doar unui `yield` care așteaptă acea valoare. Dacă nu există vreun `yield` care să aștepte, nici valoarea nu are cui să-i fie pasată. Reține faptul că orice ai pasa drept argument primului `next()`, va fi ignorat de generator la prima apelare. Valoarea pasată este folosită de generator ca valoare a întregii expresii `yield` în care a fost înghețat generatorul.

Funcția generator va executa tot codul dintre două yield-uri, dacă există.

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

Observă că o funcție generator se poate *consuma* cu un enunț `for...of` pentru că înțelege și respectă protocolul iterator. Odată instanțiat obiectul `Generator`, se poate folosi și `while` pentru a scoate valoarea din obiectul returnat de `next()`. Pentru fiecare iterație testezi dacă `done` are valoarea `true`.

```javascript
let obi;
while( !(obi = obiectGenerator.next()).done ){
  console.log(obi.value);
};
```

Formularea condiției: `!(let obi = obiectGenerator.next()).done`.

Explicație:

- creezi o referință către obiectul adus de fiecare yield: `let obi;`
- `let obi = refIterator.next()` aduce obiectul.
- pui expresia între paranteze pentru a o evalua. Evaluarea este obiectul adus de cursor: `(let obi = refIterator.next())`
- Valoarea lui `done` o negi pentru toate obiectele returnate care au proprietate `value`, adică `false` va deveni `true` pentru ca bucla `while` să poată avansa.

Modalitatea de a parcurge un `Generator` cu o buclă `while` este mai greoaie față de ceea ce oferă `for...of`.

Folosind sintaxa spread (`...numeGenerator`) poți aplica fiecare element al iterabilului într-un anumit anumit context. Acest lucru înseamnă că poți *extrage* valorile direct într-un array, de exemplu.

```javascript
let listaCompletată = [1, 2, ...numeGenerator]; // [1, 2, x, y, z]
```

## Transformarea elementelor unui array

Să presupunem că avem nevoie să aplicăm o transformare fiecărui element dintr-un array.

```javascript
function* prelucrare (objIterable, funcTransf) {
  for (const elem of objIterable) {
    yield funcTransf(elem);
  }
};

const prelucrareGen = prelucrare(['a', 'b', 'c'], i => `!${i}`);
for (const rezultat of prelucrareGen) {
  console.log(rezultat);
}
// !a !b !c

// echivalent cu
console.log(...prelucrare(['a', 'b', 'c'], i => `!${i}`));

// sau transformarea într-un array modificat
let arrNou = [...prelucrare(['a', 'b', 'c'], i => `!${i}`)];
```

În cazul în care am avea structuri de date mai complexe într-un array, de exemplu un JSON, ar fi foarte util să facem transformările elementelor *la cerere* chiar dacă am putea să aplicăm o transformare deodată cu un `for...of`. Transformarea elementelor la cerere își dovedește utilitatea atunci când avem nevoie să transformăm subseturi mici ale setului mare de date din diferite motive. Astfel, am putea construi o funcție `map` particularizată.

```javascript
function* prelucrare (objIterable, funcTransf) {
  for (const elem of objIterable) {
    yield funcTransf(elem);
  }
};

function* map (objIterable, funcMapare) {
  yield* prelucrare(objIterable, funcMapare);
};

const mappingGen = map(['a', 'b', 'c'], i => `!${i}`);

// Acum putem prelucra bucată cu bucată setul de date
mappingGen.next(); // {value: '!a', done: false}
```

În caz de nevoie, am putea crea propria funcție de filtrare.

```javascript
function* filter (objIterable, funcFiltrare) {
  for (const elem of objIterable) {
    if (funcFiltrare(elem)) {
      yield elem;
    }
  }
};

const filteringGen = filter(['a', 'b', 'c'], i => i === 'a');
```

## Async/await fără async/await

Generatoarele permit lucrul asincron prin simplu fapt că pot separa etapele de prelucrare prin apelurile `next` succesive. Următorul exemplu ni-l oferă tot Héla Ben Khalfallah. Să-l parcurgem.

```javascript
function* fetchData() {
  const response = yield fetch('https://jsonplaceholder.typicode.com/users');
  const jsonResponse = yield response.json();
}

const fetchUsersTask = fetchUsers(); // inițializare generator
const fetchUsersPromise = fetchUsersTask.next().value; // primul yield returnează o promisiune

// tratează prima promisiune
fetchUsersPromise
  .then(data => {
    // obținem datele din primul yield
    // întoarcem datele generatorului, adică variabilei `response`,
    // fiind necesare executării celui de-al doilea yield
    return fetchUsersTask.next(data).value;
  })
  .then(raspuns => console.log(raspuns))
  .catch(error) console.error;
```

Observăm că primul `yield` aduce o promisiune. Apoi tratăm promisiunea și pentru că avem nevoie de date, acestea vor fi oferite de cel de-al doilea `yield`, care va lua datele primite și va extrage rezultatul și în format JSON. Observăm cum `Generator`-ul răspunde cu o promisiune a cărei rezultat îl trimitem înapoi codului generatorului, care în schimb, ne va răspunde cu o nouă promisiune `response.json()`. Facem chaining următorul `then` pentru că prelucrăm promisiunea în vederea extragerii datelor. Pentru că răspunsul este tot o promisiune chaining-ul este posibil.

Acest model este util atunci când dorim să controlăm etapele aducerii unor resurse de la distanță.

## Bucle infinite

Generatoarele permit construcția de bucle infinite, fără teama că vor returna erori din mediul în care programul rulează. Acest lucru se petrece pentru că indiferent de faptul că limita este la infinit, generarea valorilor este controlată prin `yield`. Se poate ușor închipui o listă cu bilete de ordine sau orice necesită o listă de elemente, care să se prelungească la infinit și care au nevoie de o identificare unică, de exemplu.

```javascript
function* generatorIDuri () {
  let id = 0;
  while (true) { // clasica rețetă a unei bucle infinite
    yield ++id;
  };
};
let id = generatorIDuri();
id.next();
// Object { value: 1, done: false }
id.next();
// Object { value: 2, done: false }
```

### State machine cu generatoare

Folosirea lui `while` care rulează cu argumentul `true` poate fi folosit pentru a crea o mașină capabilă să gestioneze o anumită stare care este pasată ca argument la invocarea lui `next`.

```javascript
function* stateMachine(state) {
  let transition; // unde primești valoarea care este comanda de modificare a stării
  while (true) {
    if (transition === "incr") {
      state++;
    }
    if (transition === "decr") {
      state--;
    }
    transition = yield state;
  }
};

const obiGen = stateMachine(0);

console.log(obiGen.next()); // {value: 0, done: false} Capturezi starea în apelul inițiat și returnează starea inițială
console.log(obiGen.next('incr')); // {value: 1, done: false} Gestionezi starea
console.log(obiGen.next('incr')); // {value: 2, done: false} Gestionezi starea
console.log(obiGen.next('decr')); // {value: 1, done: false} Gestionezi starea
```

### Generează o plajă de valori

```javascript
function* plaja (start, end) {
  while (start < end) {
    yield start++;
  }
}

for (let valoare of plaja(0, 5)) {
  console.log(valoare);
}

// pentru a crea un array cu plaja de numere
let arr = [...plaja(0, 10)]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Întreruperea parcurgerii unui generator

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

## Concatenarea de iteratori

Sunt cazuri în care ai nevoie să poți parcurge mai multe structuri de date deodată pentru a căuta legături între ele prin echivalența dintre anumite valori căutate sau pentru a vedea prin ce diferă, etc. Aceste modele de lucru se pretează lucrului cu generatorarele.

### Îmbinarea mai multor surse

 În următorul exemplu, avem un scenariu în care parcurgem mai multe seturi de date cu scopul de a le contopi într-o unică sursă de date care va fi un array. Acest array va conține toate elementele individuale ale tuturor surselor contopite.

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

function* threader (...sources) { // faci spread pe toate array-urile și obții unul
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

Corutinele sunt un model de organizare a rulării funcțiilor care își întrerup execuția pentru a ceda controlul alteia. JavaScript nu are un mecanism dedicat realizării corutinelor. Cel mai apropiat fiind totuși generatoarele care prin `yield`, cedează controlul unui alt context de execuție, iar la un moment sunt reapelate pentru a-și continua execuția. Corutinele sunt un mecanism care în loc să folosească callback-urile, fac uz de *event loop*.

Pentru a gestiona un generator folosind o corutină, trebuie să elaborezi o funcție tip *ambalaj* care să gestioneze pașii necesari. Logică necesară:

- funcția execută argumentul, care va crea obiectul generator;
- apelează metoda `next()` pe obiectul generator, fapt care va conduce la executarea întregului cod al funcției generator, până când apare `yield`;
- se va apela metoda `next(...)` în care vor fi trimise date către generator;
- returnează o funcție care face closure pe generator și care poate trimite date în generator.

```javascript
function corutină (funcCreareGenerator) {
  let obiectGenerator = funcCreareGenerator(); // instanțierea obiectului `Generator`
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
generatorGestionat('secundo');// => Și a doua valoare: secundo
```

Ținta ar fi ca de fiecare dată când se face un `yield`, o funcție să preia efortul de calcul și să ofere un rezultat. Când corutina și-a încheiat propria execuție, apelează la un alt `yield` din generator.

Un alt model de realizare a corutinei implică spreading-ul și mutarea logicii în funcția returnată.

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

Funcțiile generator permit parcurgerea unor obiecte iterabile sincrone, iar pentru obiectele iterabile asincrone, se vor folosi generatoarele asincrone. Acestea implementează o metodă `[Symbol.asyncIterator](){}`. Implicația directă este că pentru ca un obiect să fie unul **async iterabil**, trebuie să aibă o cheie `Symbol.asyncIterator`.

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

**Generatoarele sincrone** returnează un obiect `Generator` pentru care o invocare a metodei `next()`, produce un obiect `{value: 'oVal', done: true/false}`. Invocarea lui `next()` aduce valoarea produsă de `yield`, de fapt.
**Generatoarele asincrone** returnează și ele un obiect `Generator`, dar pentru fiecare `next()` invocat, vom obține o promisiune pentru fiecare obiect `{value, done}` care a fost returnat de un `yield`.

Adu-ți mereu aminte de faptul că generatoarele primesc date prin `next()` în momentul când fac `yield`. Acest lucru permite *trezirea* unui generator ori de câte ori apar date asincrone, dar generatorului îi vor părea ca și cum ar fi apărut sincron.

Anatomia unui apel `next()`:

- un `Promise` este trimis în lista de microtaskuri.
- dacă generatorul async nu este activ îl repune în execuție și așteaptă încheiere fie prin `yield`, `throw`, `return` sau `await`.
- este returnată promisiunea după rezolvarea sa asincronă cel mai repede în următorul *tick*.

În cazul generatoarelor asincrone, toate apelurile la `next()` sunt introduse într-un *queue* de către motorul JavaScript. De îndată ce obiectul generator asincron este constituit, i le pune la dispoziție. Acest lucru este foarte eficient pentru că nu va trebui să aștepți să fie hotărâtă starea promisiunii returnate de `next()`. Totuși, în cazurile în care ai nevoie de valoarea lui `done`, va trebui să aștepți rezolvarea promisiunii returnate de `next()` pentru că în funcție de `true`/`false` poți decide cum execuți codul care urmează sau dacă mai apelezi încă o dată pe `next()` sau nu.

De exemplu, să presupunem că vrem să accesăm valorile unui iterator asincron după ce toate promisiunile returnate individual prin `next()` au fost rezolvate.

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

- funcții,
- medii lexicale,
- closures,
- promisiuni,
- iteratori și interfețe de iterare,
- `for...of`

## Resurse

- [Generator Function Definitions | ECMAScript® 2021 Language Specification](https://tc39.es/ecma262/#sec-generator-function-definitions)
- [27.5 Generator Objects | ECMAScript® 2022 Language Specification](https://262.ecma-international.org/13.0/#sec-generator-objects)
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
- [JavaScript Generators — Practical Use Cases | Héla Ben Khalfallah](https://betterprogramming.pub/javascript-generators-practical-use-cases-945d512ef252)
- [Generators in JavaScript | egghead.io | John Lindquist](https://egghead.io/courses/generators-in-javascript-4b5f)
- [Using async generators to stream data in JavaScript](https://www.youtube.com/watch?v=wrI-Jb0oFyk&t=89s)
