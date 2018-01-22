# Promise

Uneori este dificil să anticipăm rezultatele unei operațiuni. Această operațiune de anticipare a unor rezultate în anumite cazuri este în strânsă legătură cu momentul în care ce execută o anumită operațiune. Uneori, când poate că soliciți niște date dintr-o sursă locală sau la distanță, serviciul responsabil cu servirea acelor date poate să nu funcționeze sau într-un anumit moment al aplicației, să nu se fi generat datele necesare dintr-o altă operațiune de prelucrare. În acest caz, vorbim de aspectele asincrone ale rulării codului. Toate aceste necunoscute, mici sincope, lucruri care nu pot fi stăpânite printr-o gândire pur algoritmică au nevoie să fie gestionate cumva. Pot fi asemuite precum vremea, pe care serviciul meteorologic încearcă prin datele primite să o anticipeze. Cum în cazul programării este nevoie de un rezultat concret, aceste aprecieri ale posibilității obținerii sau nu a unui rezultat, poartă numele de **promisiuni**. O promisiune este o valoare care poate fi disponibilă acum, în viitor sau niciodată.

Rularea codului JavaScript introduce conceptul de concurență. La ce se reduce acest lucru? La prioritizarea execuției diverselor părți ale codului. Reiterăm faptul că JavaScript are un singur fir de execuție care implică o anumită secvențialitate, dar ce te faci când în lucrul curent, cu evenimente, multiple funcții pot să-și înceapă evaluarea, unele au nevoie de valorile returnate de altele ș.a.m.d. În acest mediu înalt concurențial, avem cele două mecanisme care reglează controlul programului: **stiva apelărilor** și **bucla evenimentelor**.
Pentru a negocia acest mediu concurențial s-a introdus paradigma de lucru asincronă.
Pentru a rezolva mai elegant problema asincronicității dincolo de ce pot oferi callback-urile, ES6 a introdus oficial conceptul de promises (promisiuni) în standard.

**Standardul spune**:
> *O promisiune este un obiect care este folosit ca locțiitor pentru rezultatele care ar putea apărea în urma unei computații întârziate (posibil asincronă)* ([25.4Promise Objects](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-promise-objects)).

## Scurt istoric

Promisiunile nu sunt un concept nou în programare. Trevor Burnham menționează în lucrarea sa faptul că la începuturile ideilor de organizare a resurselor în rețea, ceea ce numim acum Internet, exista un proiect care s-a numit Xanadu programat în C++. Acest proiect continuă și în zilele noastre, dar ceea ce este cu adevărat important este faptul că atunci apare ideea de promisiuni. Mai apoi sub denumirea de  **deferred** își face apariția și în alte limbaje de programare. Wikipedia aduce o definiție și prin aceasta, în prim plan, câțiva termeni dintre care am lămurit unii, dar alții sunt relevanți pentru înțelegerea promisiunilor: *În domeniul informaticii, viitor («future»), promisiune («promise»), delay («întârziere») și deferred «amânare» se referă la constructuri folosite pentru a sincroniza execuția programului în unele limbaje de programare care permit execuția concurențială. Aceștia descriu un obiect care se comportă ca un proxy «mecanism de delegare» pentru un rezultat care, inițial este necunoscut pentru că, în mod curent computarea valorii sale nu este încă încheiată*. Conform autorilor Wikipediei și lui Trevor Burnham, termenii de **promisiune**, **deferred** și **future** sunt folosiți interșanjabil.

Termenul de **promise** (promisiune) a fost propus în anul 1976, dar după adoptarea în Python, un pas a mai lipsit pentru a fi preluat ca practică și în JavaScript, dar ca „deferred” mai întâi, în 2007, prin biblioteca de cod **Dojo** (`dojo.Deferred`). Doi ani mai târziu apare specificația Promises/A în biblioteca de cod CommonJS. În același an apare și NodeJS. Merită menționat faptul că biblioteca de cod JQuerry, care motorizează foarte multe pagini web în acest moment, a introdus conceptul de promisiuni, dar cu nuanța **deferrend** asta însemnând că poți declanșa o promisiune în mod direct fără a mai apela un callback.

Să nu uităm nici o clipă faptul că JavaScript rulează într-un singur fir de execuție, se bazează pe evenimente cu mențiunea că respectă un model ce nu blochează input-urile și output-urile. Mențiunea este că fiecare browser va rula API-urile în propriile fire de execuție.

## Prelucrarea datelor - foaie de parcurs

Pentru că odată cu promisiunile, ne apropiem de stadii avansate ale înțelegerii acestui limbaj de programare ca și instrument de prelucrare al datelor, vom parcurge un scenariu simplu de prelucrare pentru a ajunge în final să vedem care ar fi ajutorul pe care ni-l oferă lucrul cu promisiuni. Până în acest moment, pentru prelucrarea datelor simple dintr-un posibil array am folosit cu succes **soluțiile sincrone** din a căror gamă fac parte prelucrările de date cu enunțul `for` sau cu metoda `forEach` din obiectul prototip al lui `Array`.

```javascript
var listă = [1, 2, 3];
listă.forEach(function(elementArray){
  console.log(elementArray);
}); // 1 2 3
// sau cu un array function
listă.forEach(elementArray => console.log(elementArray)); // 1 2 3
```

Noi, prin folosirea promisiunilor, intrăm în zona **soluțiilor asincrone**, care implică o înțelegere în prealabil a modului în care funcționează *bucla evenimentelor* și a *callback-urilor*.

## Constructorul

Promise este un constructor folosit pentru realizarea unor obiecte promisiuni folosite în operațiuni asincrone. Asta înseamnă că vei obține un obiect promisiune de fiecare dată când invoci cu operatorul `new`.

```javascript
var executaLaRezolvare = function(){return 'execut la rezolvare'};
var promisune = new Promise(executaLaRezolvare);
```

### Construcția unei promisiuni

Pentru a construi o promisune se va folosi constructorul `Promise` căruia îi pasăm un singur argument. Acesta este o funcție cu rol de „executor”, spune standardul. Această funcție, la rândul ei primește două argumente: `resolve` și `reject`. Aceste două argumente sunt două funcții puse la dispoziție deja de către motor cu scopul de a-ți semnala succesul sau eșecul.

Să revenim la funcția obiect *executor*. Aceasta este apelată pentru a iniția și pentru a avea un răspuns la sarcina pentru care construim promisiunea. Dacă ne lovim de un eșec, putem apela funcția reject, iar în caz de rezolvare, este disponibilă funcția resolve care primește un singur argument care reprezintă chiar valoarea returnată ca încheiere a sarcinii. Această valoare disponibilă ca argument al lui resolve poate fi chiar o valoare în sine sau un alt obiect Promise care la rândul său va avea drept sarcină returnarea unei valori.
Funcția reject este și ea pasată executorului și la rândul său primește un argument, care, de regulă este un obiect `Error`.

La apelarea cu new, constructorul `Promise` creează un obiect care pune la dispoziție o metodă `then`. Metoda `then` primește două funcții callback: `success` și `failure`. Callback-ul success este invocat dacă promisiunea se rezolvă cu succes, adică dacă funcția resolve este invocată pentru acea promisiune. În caz contrar, se invocă error.

```javascript
let promisiune = new Promise((resolve, reject) => {
  // scrii cod care face ceva și apoi condiționezi rezolvarea
  let conditie = true;
  if(conditie){
    resolve("Am rezolvat treburile!");
  }else{
    reject("Te refuz că treaba nu e făcută!");
  };
});
promisiune.then(
  promisiuneRezolvata => {
    console.log(`Ți-am promis ceva! Vezi? ${promisiuneRezolvata}`);
  }
).catch(refuzata => {
  console.log(`${refuzata}`);
});
```

Un exemplu de înlănțuire:

```javascript
let pasulUnu = () => {
  return new Promise(function(resolve, reject) {
    resolve("1. Am adus date de la un API. ");
  });
};

let pasulDoi = (mesaj) => {
  return new Promise(function(resolve, reject){
    resolve(mesaj + "2. Am făcut o transformare. ");
  });
};

let pasulTrei = (mesaj) => {
  return new Promise(function(resolve, reject){
    resolve(mesaj + "3. Am prelucrat datele");
  });
};

// secvențial
pasulUnu().then((rezultat) => pasulDoi(rezultat)).then((rezultat) => pasulTrei(rezultat)).then((rezultat) => {console.log("Am terminat iar etapele au fost: " + rezultat);});

// concurent
Promise.all([pasulUnu(), pasulDoi(), pasulTrei()]).then(() => {console.log("Am terminat!");});

// termină una din toate
Promise.race([pasulUnu(), pasulDoi(), pasulTrei()]).then(() => {console.log("Am terminat!");});
```

## Stările unei promisiuni

O promisiune este ca un scaun ocupat. Vine un coleg, care ocupă un scaun punând o haină pe spătar. Apoi pleacă pentru că are ceva de făcut. Nu știi când vine, dacă vine. Oricum, scaunul este ocupat. La un moment vine și spune: am rezolvat treaba. Dacă nu, zice: am făcut un spanac.

**Standardul spune**:
> Oricare obiect Promise este în una din cele trei stări posibile: `fulfilled`, `rejected` și `pending`.

Să lămurim termenii. În limba română `fulfilled`, în contextul nostru o traducem cu *îndeplinită*; `rejected` este *refuzul* îndeplinirii unei promisiuni pentru un anumit motiv, iar `pending` este tradus prin *în așteptare*.

Starea `pending` - *în așteptare* indică faptul că o promisiune nu a fost *îndeplinită* și nici nu a fost *respinsă*. Încă așteaptă ca procesul computațional pentru care a fost creată promisiunea, să-și termine evaluarea.

Când un obiect promisiune stă o lungă perioadă de timp în starea `pending`, spunem despre acea promisiune că este *nerezolvată* - `unresolved`.
Opus, este o promisiune care a fost *încheiată* - `settled`. O promisiune este rezolvată atunci când, fie a fost refuzată, fie a fost rezolvată.

O promisiune este *rezolvată* dacă a fost *încheiată* sau dacă va servi drept stare altei promisiune, care aștepta această rezolvare.

### Proprietățile constructorului Promise

#### `Promise.prototype`

Este obiectul prototip al lui `Object`.

#### `Promise.all(obiectIterabil)`

Returnează o nouă promisiune care cuprinde un array plin ochi de promisiuni rezolvate pentru promisiunile pasate. Este posibil să și refuze oferind primul refuz a primei promisiuni care refuză din colecția de promisiuni. Pe scurt, ai mai multe promisiuni și încerci să le rezolvi pe toate odată. Dacă una din promisiuni este refuzată, refuzul acesteia va fi returnat.
Valoarea lui `this` este o funcție constructor, care trebuie să respecte regulile constructorului `Promise` în ceea ce privește parametrii (câți și ce funcții au).

#### `Promise.race(obiectIterabil)`

Se aseamănă cu `Promise.all` rezolvând toate elementele (promisiunile) din obiectul iterabil. Dacă iterabilul este gol sau dacă nu este încheiată una din promisiunile din iterabil, nici `race` nu va fi *încheiată*.
Este așteptat ca obiectul `this` al lui race să ofere o metodă `resolve`.

#### `Promise.reject(r)`

Funcția `reject` returnează o nouă promisiune care a fost respinsă cu argumentul care i-a fost pasat.

#### `Promise.resolve(x)`

Fie returnează o nouă promisiune care a fost rezolvată cu argumentul pasat, fie însuși argumentul, dacă acesta este o promisiune generată de constructor.

## Promise: cea mai fericită alternativă la callback-uri

```javascript
// varianta clasică cu callback
function incarcImagine(url, callback){
  let imagine = new Image();
   imagine.onload = function(){
     callback(null, image);
   };
   imagine.onerror = function(){
     let mesaj = "Încărcare eșuată de la " + url;
     callback(new Error(msg));
   };
   imagine.src = url;
};
export default incarcImagine;

/*În alt fișier*/
import incarcaImagine from './loader-imagine';

let adaugaImagine = (src) => {
  let elemImg = document.createElement('img');
  elemImg.src = img.src;
  document.body.appenChild(elemImg);
};

incarcaImagine('img/globul.jpeg', (error, img) => {
  if(error) throw error;
  adaugaImagine(img1.src);
  incarcaImagine('img/luna.jpeg', (error, img) => {
    if(error) throw error;
    adaugaImagine(img2.src);
  })
});
```

Și varianta cu Promise

```javascript
// varianta Promise
function incarcImagine(url){

  return new Promise((resolve, reject) => {
    let imagine = new Image();

    // SUCCES
    imagine.onload = function(){
     rezolve(image);  // apelezi resolve cu valoarea în caz de succes
    };

    // AI EȘUAT
    imagine.onerror = function(){
     let mesaj = "Încărcare eșuată de la " + url;
     reject(new Error(msg));
    };

    imagine.src = url;
  });
};
export default incarcImagine;

/*În alt fișier*/
import incarcaImagine from './loader-imagine';

let adaugaImagine = (src) => {
  let elemImg = document.createElement('img');
  elemImg.src = img.src;
  document.body.appenChild(elemImg);
};

Promise.all([
  incarcaImagine('img/globul.jpeg'),
  incarcaImagine('img/luna.jpeg'),
]).then((imaginile) => {
  imaginile.forEach(img => adaugaImagine(img.src));
}).catch((e) => {
  console.log(e);
});
```

## Programare funcțională cu promisiuni

### Un `map` promisificat

Să presupunem că dorim că aplicăm o funcție pe datele dintr-o listă (poate fi foarte bine datele dintr-o listă de fișiere diferite în cazul flosirii Node.js cu `fs`).

```javascript
var lista = ["a", "b", "c"];

function dublezLitere (element) {
  return element + element;
};

function mapPromisificat (lista, functieDeAplicat) {
  // returnează o listă de promisiuni
  var promisiuni = lista.map(function (element) {
    // un element, o promisiune
    var promisiune = new Promise (function (rezolvat, respins) {
      // invocarea funcției de transformare pe element
      functieDeAplicat(element, function (eroare, rezultat) {
        if(eroare) return respins(eroare);
        rezolvat(rezultat);
      });
    });
    return promisiune;
  });
  return Promise.all(promisiuni);
};

var listaPromisiunilor = mapPromisificat(lista, dublezLitere);
// obiect Promise
```

## Mantre

- JavaScript este single-threaded! Asta înseamnă că nu poate rula două secvențe de cod în ***același timp***
- Ținta promisiunilor nu este să elimine callback-urile, ci să elimine callback-urile inutile. (*JavaScript Concurrency*, Adam Boduch)
- O promisiune este un obiect „care este utilizat ca o promisiune” și care reprezintă o valoare potențială apărută ca rezultat al unei operațiuni asincrone.
- `resolve` și `reject` sunt două funcții obiect.

## Resurse

[ECMAScript versiunea 7](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-promise-objects)
[Trevor Burnham. Async JavaScript](A Very Brief History of Promises)
[Wikipedia. Futures and promises](https://en.wikipedia.org/wiki/Futures_and_promises)
[Eric Elliot. Master the JavaScript Interview: What is a Promise?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
[Jecelyn Yeen. JavaScript Promises for Dummies](https://scotch.io/tutorials/javascript-promises-for-dummies)
[Benjamin Diuguid. Asynchronous Adventures in JavaScript: Callbacks](https://medium.com/dailyjs/asynchronous-adventures-in-javascript-callbacks-39880f1b470e)
