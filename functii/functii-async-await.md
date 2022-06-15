# Funcții async/await

Acest enunț a fost introdus în ECMAScript 2017 și face ca o funcție să returneze o promisiune (`Promise`). Funcțiile care au cuvântul cheie `async` în față, vor returna mereu o promisiune. De îndată ce codul este compilat și executat, *funcțiile async* sunt executate. Acest comportament îl întâlnim și la promisiuni, când tot codul din funcția cu rol de executor este rulat. Acolo unde motorul întâlnește `new Promise(nume_callback)`, va executa funcția callback/executorul. Reține faptul că funcțiile `async` se bazează pe promisiuni, care la rândul lor implică utilizare de callback-uri.

Funcțiile `async` au comportament sincron, ceea ce înseamnă că execuția codului va aștepta ca evaluarea lor să se încheie. Atenție, dacă operațiunea întârzie, execuția va fi blocată.

```javascript
async function facCeva () {}; // declarație cu `function`
async () => console.log; // declarație de fat arrow
```

În cazul în care atribui o funcție `async` unei variabile, aceasta devine o referință către o promisiune.

```javascript
let cevaDeFăcut = async function facCeva () {
  let rezultat = await executaCeva();
  return rezultat;
};
```

Valorile returnate dintr-o funcție `async` sunt precum rezultatele unui `Promise.resolve()`. Rezultatul este chiar valoarea pe care o accesezi în primul `then`.

**Moment Zen**: Valoarea returnată de o funcție `async` este împachetată în `Promise.resolve()`.

Apariția funcțiilor `async` marchează o nouă paradigmă de lucru cu promisiunile.

```javascript
async function cevaAsincron () {
  // throw new Error('Ceva neclar aici');
  return 'apar asincron';
  // echivalentul lui return Promise.resolve('apar asincron');
};
cevaAsincron().then(console.log).catch((e) => console.error);
```

În exemplul de mai sus, valoarea 'apar asincron' va fi împachetată într-o promisiune datorită folosirii în subsidiar al lui `Promise.resolve()`. În cazul funcțiilor `async` abia după ce ai rezolvat promisiunea returnată și ai apelat un `then` sau un `await`, corpul funcției va fi apelat asincron. Atenție, dacă din funcția *async*, vei face `throw` la vreo eroare, aceasta va fi *ridicată*/trimisă în `catch`.

Avantajul este evident în cazul în care scrii o bibliotecă de cod sau o funcție cu rol utilitar, în care nu știi dacă datele care vin sunt *sync* sau *async*. Atunci când trebuie returnat un obiect, acesta va fi returnat fără împachetare.

Înainte de apariția acestor funcții, pentru a scrie cod asincron aveam la îndemână callback-uri și promisiuni. În mod curent, până la apariția `async`/`await` ai fi returnat un obiect `Promise` proaspăt instanțiat.

```javascript
function simulare () {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Salutare"), 2000);
  });
};
let x = simulare();
// Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
// după 2 secunde
// [[PromiseValue]]: "Salutare"
const prelucrează = async () => {
  const rezultat = await simulare();
  return rezultat;
}

prelucrează().then((mesaj) => console.log('mesajul este: ', mesaj)).catch((e) => console.error);
```

Aceste noi funcții te fac să percepi asicronicitatea ceva mai secvențial, mai sincron. Cheia utilizării funcțiilor `async` este utilizarea operatorului `await`, care poate fi folosit numai în interiorul unei astfel de funcții. Acesta returnează valoarea rezolvată a unei promisiuni. În același timp, operatorul oprește execuția funcției `async` până când promisiunea este rezolvată. Abia după, va fi reluată execuția funcției. Dacă valoarea nu este o promisiune, este convertită la o promisiune rezolvată. În cazul în care promisiunea este respinsă, este returnată valoarea rezultată ca respingere.

```javascript
async function sarcina () {
  let salut = await simulare();
  return `${salut}`;
};
sarcina().then(mesaj => console.log(mesaj)).catch((e) => console.error);
```

Înțelegând aceste aspecte, ajungem la concluzia că avantajul pe care îl oferă funcțiile `async`/`await` este legat de posibilitatea de a introduce o ordine în care să apară rezultatele datorită întreruperii execuției funcției. Implicit, soluționarea celorlalte va fi întârziată prin efectul lui `await`. Acest lucru se petrece chiar dacă rezultatele sunt obținute într-o manieră asicronă. Pur și simplu este oferită posibilitatea de a ordona succesiunea operațiunilor similar rulării sincrone a codului. Un alt avantaj major este cel al obținerii valorilor în același mediu lexical (*scope*), în cazul în care rezolvi mai multe promisiuni în aceeași funcție `async`. Dezavantajul este întreruperea execuției funcției dacă operațiunea asincronă durează.

Luând în considerare și cunoștințele de la promisiuni, ia-ți un moment de reflecție pentru a decide în codul pe care îl scrii care este cea mai bună soluție de a soluționa promisiunile: secvențial, folosind `async`/`await`, paralel, folosind `Promise.all` sau prima din toate cele evaluate folosind `Promise.race`.

## Declarare

În ceea ce privește sintaxa, vor fi folosite în tandem două cuvinte cheie: `async` în deschiderea declarației și `await` în corpul funcției. Faptul că pui `async` în fața unei funcții, nu transformă toate expresiile în vederea evaluării în constructuri asincrone. Codul se va executa în continuare sincron. Doar expresiile precedate de `await` se vor executa asincron.

```javascript
// declarație de funcție
async numeFunctie () {
  await ...
};
// expresie de funcție săgeată
var numeFunctie = async () => {
  await ...
};
```

Funcțiile `async` pot îndeplini rol de metode în obiecte, putând servi și claselor. În cazul claselor, constructorii, setter-ii și getter-ii nu pot fi async.

```javascript
var obi = {
  async numeFunctie () {
    await ...
  }
};
class Ceva {
  async numeFunctie () {
    await ...
  }
}
```

## Operatorul `await`

Funcțiile `async` își vor întrerupe execuția ori de câte ori întâlnesc `await` în corp. Cuvântul cheie `await` își produce efectele doar dacă este folosit în corpul funcțiilor `async`.

Operatorul `await` expune o deficiență a acestor funcții. Ceea ce se petrece atunci când îl folosim este oprirea din execuție a întregului cod până când promisiunile sunt **rezolvate**. Aceasta este o caracteristică de execuție pe care o întâlnim la rularea codului sincron. Chiar dacă alte sarcini își urmează cursul, propriul cod este blocat în execuție.

## Exemplu

Să lucrăm cu un caz ceva mai util. Atunci când am discutat despre cum este executat codul JavaScript, am folosit un exemplu.

```javascript
// înlocuiește cheia API din link numită wskey, cu una personală obținută
// de la https://pro.europeana.eu/get-api
// Secvența unde vei pune cheia ta este wskey=XXXXXXXXX
// înlocuiește XXXXXXXXX cu propria cheie
// dacă nu introduci cheia personală vei avea o eroare
// Cross-Origin Request Blocked
let adresa = "https://www.europeana.eu/api/v2/search.json?wskey=XXXXXXXXX&query=The%20Fraternity%20between%20Romanian%20and%20French%20Army";
function aduMi () {
  fetch(adresa)
    .then((resursa) => resursa.json())
    .then((înregistrarea) => console.log(înregistrarea))
    .catch(() => console.log('A apărut o eroare'));
};
aduMi();
```

Pentru a simplifica, putem transforma funcția noastră într-una `async`.

```javascript
let adresa = "https://www.europeana.eu/api/v2/search.json?wskey=XXXXXXXXX&query=The%20Fraternity%20between%20Romanian%20and%20French%20Army";
async function aduMi () {
  const resursa = await fetch(adresa);
  const rezultat = await resursa.json();
  return rezultat;
};
const promisiunea = aduMi();
typeof promisiune;
aduMi().then((înregistrarea) => console.log(înregistrarea)).catch(() => console.log('A apărut o eroare'));
```

Ceea ce permit funcțiile `async`/`await` este posibilitatea de a captura toate erorile ridicate de codul asincron, dar și cel sincron. Deci, folosirea unei structuri `try...catch` este valabilă.

## Gestionarea erorilor

Unul din avantajele majore ale folosirii sintaxei `async`/`await` este aceea că permite evaluarea codului în structuri `try...catch`. Dacă nu folosești `try...catch` o funcție `async` care se soluționează cu o eroare va eșua fără să dea vreun semn.

```javascript
async function ceva () {
  try {
    var date = await fetch('https://radacina.ro/cale_catre_set_de_date');
  } catch (error) {
    console.log(error);
  }
};
```

Erorile care ar putea apărea în urma evaluării unei expresii `throw new Error('O eroare la evaluare')` din funcție. Acestea vor putea fi gestionate în `catch(error){}`. Mai jos este un exemplu din Node.js cules din workshopul lui Matteo Collina și James Snell intitulat „Broken Promises” cu ocazia evenimentului *OpenJS World 2020*.

```javascript
const EventEmitter = require('events');
const {promisify} = require('util');

const ev = new EventEmitter();
const intarzie = promisify(setTimeout);

ev.on('ceva', async () => {
  await intarzie(2000);
  try {
    ceva_inexistent();
  } catch (err) {
    // ev.emit('error', err); // #1 Nu uita că se execută sincron
    // #5 când throw va face bubbling, singura soluție este să-l trimiți pe nextTick
    process.nextTick(() => ev.emit('error', err));
  }
});

ev.on('error', (err) => {
  // #2 asta înseamnă ca acest callback se execută încă în promisiune
  /* console.log(err.message);*/
  // #3 fapt care în cazul în care vrei aici să faci throw, se va face bubble în promisiunea generată de async mai sus
  throw new Error('eroare'); // #4 va fi tratată în catch-ul asyncului cu un process.nextTick
});

// #6 Asigură-te că este activată tratarea de `uncaughtException`
process.on('uncaughtException', (err) => {
  console.log(err.message);
});

ev.emit('ceva');
```

Felul ciudat de a trata erorile a rezultat din utilizarea unei promisiuni, adică a funcției *async* acolo unde ar fi trebuit să fie un simplu callback. Una din concluziile importate este aceea că în momentul în care pasezi o funcție asincronă unui fragment de cod, acesta trebuie prevăzut un mecanism *catch* de gestionare a erorilor. O altă concluzie ar fi să nu pasezi un *async* unui `EventEmitter`.

### Tratarea erorilor pentru multiple await

În cazul în care ai mai multe enunțuri `await`, ar trebui să ai mai multe blocuri `try...catch` pentru a gestiona erorile care apar de la fiecare.

```javascript
async function lantPrelucrari () {
  const 
    conectare  = await apelAsincronPeUnAPI('https://ceva.ro/apiv1/users'),
    utilizator = await apelAsincronAduUserDinBaza(conectare),
    logentry   = await apelAsincronLogActivitate(utilizator);
  return logentry;
};

// funcție care prinde toate erorile
function tratezErorile (func) {
  return function (...args) {
    return func(...args).catch((err) => {
      console.error('Eroarea este', err);
    });
  };
};
(async () => {
  await tratezErorile(lantPrelucrari)();
})();
```

Pentru a evita un astfel de scenariu care ar încărca inutil codul, se poate crea o funcție specializată care să *prindă* toate erorile. Din nefericire, o astfel de soluție nu se potrivește în cazul în care ai nevoie să tratezi erorile în funcție de ceea ce indică.

## Funcțiile async și buclele

Apelarea unor funcții asyncrone din enunțuri care implică realizarea de bucle cum ar fi `for` sau chiar `forEach` nu funcționează. Acest lucru se petrece pentru că buclele rulează sincron și își încheie execuția înainte ca apelurile asincrone să-și încheie și ele execuția.

```javascript
async function facCeva (unArray) {
  let element;
  for (element of unArray) {
    await oferaValoareaDin(element);
  }
};

// sau
async function facCeva (unArray) {
  unArray.forEach(await (element) => {
    await oferaValoareaDin(element);
  });
};
```

Din acest motiv, ES2018 a introdus iteratori asincroni, care funcționează precum iteratorii normali cu excepția că metoda `next()` în loc de a returna o valoare, returnează o promisiune. Cuvântul cheie `await` poate fi folosit în bucle `for...of`.

```javascript
async function facCeva (unArray) {
  let element;
  for await (element of unArray) {
    oferaValoareaDin(element);
  }
};
```

Ceea ce se petrece este că bucla `for await ... of` execută operațiuni asincrone într-o serie.
Un model alternativ ar fi să faci un *mapping* pe elementele array-ului și apoi să le rulezi cu `Promise.all()`.

```javascript
let arr = ['a','b','c'],
    deRezolvat = arr.map(async (valoare, element) => {
      console.log(`Acum procesez asincron pe `, element);
      await functieCareProceseazaAsincron(valoare);
    });

await Promise.all(deRezolvat);
```

Toate promisiunile vor fi *rezolvate* în paralel. Un lucru de menționat este că procesarea unor array-uri de mari dimensiuni va avea repercusiuni asupra consumului de resurse.

## Concluzii

Scrierea codului asincron folosind `async`/`await` este o alternativă elegantă și mult mai eficientă (cel puțin în cazul detectării erorilor) pentru lucrul cu promisiunile. Totuși, nu ignora faptul că promisiunile la rândul lor operează cu callback-uri. 

## Dependințe cognitive

- iteratori
- generatoare
- promisiuni

## Resurse

- [Asynchronous Adventures in JavaScript: Async/Await](https://medium.com/dailyjs/asynchronous-adventures-in-javascript-async-await-bd2e62f37ffd)
- [await. MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- [7 Reasons Why JavaScript Async/Await Is Better Than Plain Promises (Tutorial)](https://dev.to/gafi/7-reasons-to-always-use-async-await-over-plain-promises-tutorial-4ej9)
- [Async functions - making promises friendly | Google Developers](https://developers.google.com/web/fundamentals/primers/async-functions)
- [Easier Node.js streams via async iteration](https://2ality.com/2019/11/nodejs-streams-async-iteration.html)
- [Making asynchronous programming easier with async and await | MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- [How to Simplify Asynchronous JavaScript using the Result-Error Pattern | Ken Snyder | JANUARY 18, 2022](https://www.freecodecamp.org/news/simplify-asynchronous-javascript-using-the-result-error-pattern/)
- [Designing APIs for Asynchrony | 2013-08-23](https://blog.izs.me/2013/08/designing-apis-for-asynchrony/)
- [Flow Control in Modern JS: Callbacks to Promises to Async/Await | Craig Buckler | 2 iunie 2018](https://www.sitepoint.com/flow-control-callbacks-promises-async-await/)
