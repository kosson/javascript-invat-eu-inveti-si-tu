# Promise

Uneori este dificil să anticipăm rezultatele unei operațiuni. Această operațiune de anticipare a unor rezultate în anumite cazuri este în strânsă legătură cu momentul în care ce execută o anumită operațiune. Uneori, când soliciți niște date dintr-o sursă locală sau la distanță, serviciul responsabil cu servirea acelor date poate să nu funcționeze sau într-un anumit moment al aplicației, să nu se fi generat datele necesare dintr-o altă operațiune de prelucrare. În acest caz, vorbim de aspectele asincrone ale rulării codului. Toate aceste necunoscute, mici sincope, lucruri care nu pot fi stăpânite printr-o gândire pur algoritmică au nevoie să fie gestionate cumva. Pot fi asemuite precum vremea, pe care serviciul meteorologic încearcă prin datele primite să o anticipeze. Cum în cazul programării este nevoie de un rezultat concret, aceste aprecieri ale posibilității obținerii sau nu a unui rezultat, poartă numele de **promisiuni**. O promisiune este o valoare care poate fi disponibilă acum, în viitor sau niciodată.

Să nu uităm nici o clipă faptul că JavaScript rulează într-un singur fir de execuție, se bazează pe evenimente cu mențiunea că respectă un model ce nu blochează input-urile și output-urile. Mențiunea este că fiecare browser va rula API-urile în fire de execuție separate, dar un program JavaScript va avea mereu un singur fir de execuție. Mai există un termen care trebuie lămurit pentru că ne vom lovi de el adesea: **concurrency**, care s-ar traduce în limba română **concurență**, dar în contextul acestui limbaj de programare cu nuanța de **concomitent**. Kyle Simpson spune despre acest fenomen că două operațiuni în JavaScript se pot desfășura în aceeași fereastă de timp, dar asta nu înseamnă că se întâmplă în paralel. În JavaScript nimic nu se petrece în paralel pentru că avem un singur fir de execuție. La ce se reduce acest lucru? La prioritizarea execuției diverselor părți ale codului. Reiterăm faptul că JavaScript are un singur fir de execuție, care implică o anumită secvențialitate. Ce te faci când în lucrul curent, cu evenimente, multiple funcții pot să-și înceapă evaluarea, unele au nevoie de valorile returnate de altele ș.a.m.d. În acest mediu înalt concurențial, avem cele două mecanisme care reglează controlul programului: **stiva apelărilor** și **bucla evenimentelor**. Pentru a negocia acest mediu concurențial s-a introdus paradigma de lucru asincronă.
Pentru a rezolva mai elegant problema asincronicității dincolo de ce pot oferi callback-urile, ES6 a introdus oficial conceptul de promises (promisiuni) în standard.

**Standardul spune**:
> *O promisiune este un obiect care este folosit ca locțiitor pentru rezultatele care ar putea apărea în urma unei computații întârziate (posibil asincronă)* ([25.4Promise Objects](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-promise-objects)).

## Scurt istoric

Promisiunile nu sunt un concept nou în programare. Trevor Burnham menționează în lucrarea sa „Async JavaScript” faptul că la începuturile ideilor de organizare a resurselor în rețea, ceea ce numim acum Internet, exista un proiect care s-a numit Xanadu programat în C++ unde apare ideea de promisiuni. Mai apoi sub denumirea de  **deferred** își face apariția și în alte limbaje de programare cum ar fi limbajul de programare E și apoi Python. Wikipedia aduce o definiție și prin aceasta, în prim plan, câțiva termeni dintre care am lămurit câțiva, dar alții sunt relevanți pentru înțelegerea promisiunilor: *În domeniul informaticii, viitor («future»), promisiune («promise»), delay («întârziere») și deferred «amânare» se referă la constructuri folosite pentru a sincroniza execuția programului în unele limbaje de programare care permit execuția concurențială. Aceștia descriu un obiect care se comportă ca un proxy «mecanism de delegare» pentru un rezultat care, inițial este necunoscut pentru că, în mod curent computarea valorii sale nu este încă încheiată*. Conform autorilor Wikipediei și lui Trevor Burnham, termenii de **promisiune**, **deferred** și **future** sunt folosiți interșanjabil.

Termenul de **promise** (promisiune) a fost propus în anul 1976, dar după adoptarea în Python, un pas a mai lipsit pentru a fi preluat ca practică și în JavaScript, dar ca „deferred” mai întâi, în 2007, prin biblioteca de cod **Dojo** (`dojo.Deferred`). Doi ani mai târziu apare specificația Promises/A în biblioteca de cod CommonJS. În același an apare și NodeJS. Merită menționat faptul că biblioteca de cod JQuerry, care motorizează foarte multe pagini web în acest moment, a introdus conceptul de promisiuni, dar cu nuanța **deferrend** asta însemnând că poți declanșa o promisiune în mod direct fără a mai apela un callback. Prin folosirea promisiunilor, intrăm în zona **soluțiilor asincrone**, care implică o înțelegerea prealabilă a modului în care funcționează *bucla evenimentelor* și a *callback-urilor*.

## Prelucrarea datelor - foaie de parcurs

Pentru că odată cu promisiunile, ne apropiem de stadii avansate ale înțelegerii acestui limbaj de programare ca și instrument de prelucrare al datelor, vom parcurge un scenariu simplu de prelucrare pentru a ajunge în final să vedem care ar fi ajutorul pe care ni-l oferă lucrul cu promisiuni. Pentru prelucrarea datelor simple dintr-un posibil array am folosit cu succes **soluțiile sincrone** din a căror gamă fac parte prelucrările de date cu enunțul `for` sau cu metoda `forEach` din obiectul prototip al lui `Array`.

```javascript
var listă = [1, 2, 3];
listă.forEach(function(elementArray){
  console.log(elementArray);
}); // 1 2 3
// sau cu un array function
listă.forEach(elementArray => console.log(elementArray)); // 1 2 3
```

După cum am observat, am implicat în soluție o funcție cu rol de callback și deja am aflat că promisiunile sunt soluția la problemele pe care utilizarea acestora le ridică.

### Fundamentul opțiunii pentru promisiuni

Să răspundem la întrebarea: de ce avem nevoie de promisiuni? Răspuns: pentru că cedarea controlului unei părți terțe printr-un callback, nu mai este un răspuns adecvat nevoilor de precizie a rulării codului. Pur și simplu nu ne mai permitem luxul de a folosi callback-uri despre care știm puține lucruri privitor la cum vor fi executate, când, de câte ori, în câte locuri ale API-ului (de regulă folosești API-uri contruite de alții), ș.a.m.d.

Ghidat de necesitatea de a înțelege bine și de explicațiile lui Kyle Simpson, vom explora un model de funcții existent, care ar mai rezolva din problemele callback-urilor. Acesta se numește funcții **thunk**, care conform lucrării lui P.Z.Ingerman din 1961, introduce conceptul, fiind în definiția sa *un fragment de cod care oferă o adresă*. În accepțiune modernă și în contextul pregătitor înțelegerii promisiunilor, un *thunk* este o funcție care încapsulează în același timp cod sincron și asincron, acceptă un singur argument, care este o funcție CPS (*continuation passing style* - vezi la callback-uri) și returnează o altă funcție sau chiar un alt *thunk*.
Un *thunk* asincron este o funcție căreia îi pasezi un callback pentru a scoate o valoare. Hai să vedem mai întâi cum arată un thunk sincron și care este utilitatea sa.

```javascript
function numePrenume (nume, prenume) {
  return `${nume} ${prenume}`;
};
var thunk = function () {
  return numePrenume ('Ioana', 'Pavelescu');
};
thunk(); // Ioana Pavelescu
```

După cum observi, o expresie de funcție *thunk* are totul pentru a-ți oferi o valoare. Nu trebuie să introduci tu nicio valoare pentru a avea deja una la momentul execuției.

Dar dincolo de operațiune în sine, am construit un soi de „referință” către o valoare computată la apelarea oriunde în cod a funcției `thunk` atunci când avem nevoie. Am numit funcția `thunk`, dar poate purta oricare alt nume. Mecanismul în sine este important de înțeles: accesul la o valoare computată care nu se schimbă pentru că este *hard-coded* (adică valorile sunt predefinite la apelarea lui `numePrenume`). Se mai petrece un lucru foarte important. Adu-ți aminte de faptul că o funcție pentru a se executa are nevoie de tot ce are ea nevoie în mediul lexical propriu sau în afara sa. Variabila `thunk` va fi, de fapt, o referință către o stare ambalată într-un container. Această referință, acest container care ambalează o valoare, fie aceasta o funcție care returnează o valoare computată, va fi la dispoziția ta în întregul program.

Kyle Simpson spune că aici ar trebui să fim atenți pentru că, de fapt, acesta este ideea principală a promisiunilor: un ambalaj peste o valoare. Referința către ambalaj poate fi utilizată în program.

Un thunk asincron este o funcție care, spre deosebire de surata sincronă, are nevoie de o funcție callback care să-i fie pasată. Pentru a simula asincronicitatea, în funcția returnată, vom folosi utilitarul `setTimeout`.

```javascript
function concatenare (nume, prenume, callback) {
  setTimeout(function () {
    callback(`${nume} ${prenume}`);
  }, 3000);
};

var thunk = function (callbackApel) {
  concatenare('Roxana', 'Nae', callbackApel);
};

thunk(function (numePrenume) {
  console.log(numePrenume);
});
```

Ceea ce tocmai am realizat este faptul că am creat un mecanism prin care inițiem un apel căruia îi pasăm un callback, care ne va returna mereu și mereu o valoare. Partea foarte valoroasă a poveștii este aceea că ceea ce se petrece în momentul în care este invocată funcția specializată este că datele în interiorul momentului de execuție pot să apară și la un moment dat, dacă ne gândim că am putea să le aducem de la un serviciu online. Cert este faptul că vom avea un răspuns la execuția lui `thunk`. Kyle Simpson explică foarte entuziast că ceea ce am realizat prin apelarea funcției asincrone, este că am ambalat operațiunile care se vor desfășura într-o bulă de timp izolată. Un timp de execuție de care nu va mai depinde nicio altă funcție, care până mai odinioară, când foloseam callback-urile, ar fi trebuit să aștepte. Aceasta este majora deficiență a practicii calback-urile: gestionarea timpului, care se concluzionează printr-o stare confuză dacă privești cine așteaptă după cine să termine. Acest lucru se petrece pentru că JavaScript are un singur fir de execuție care înseamnă o singură linie temporală.
Este revoluționar să poți face un apel la o funcție pe care să o pasezi ca pe o valoare în codul tău și să obții valoarea de care ai nevoie. Chiar dacă nu am avut la îndemână aproape 20 de ani pentru a ajunge la concluziile lui Kyle, am să folosesc înțelepciunea dobândită pentru a vă spune și vouă că este mult mai bine să folosești promisiunile ca practică opusă callback-urilor.
Înțelegerea funcțiilor *thunk* conduce la înțelegerea *promise-urilor* pentru că spune aceeași voce autorizată: *thunk-urile sunt promisiuni fără un API fățos*. Funcțiile *thunk* sunt o soluție mai bună față de callback-uri.

## Constructorul

Promise este un constructor folosit pentru realizarea unor obiecte promisiuni folosite în operațiuni asincrone. Asta înseamnă că vei obține un obiect promisiune de fiecare dată când invoci cu operatorul `new`.

```javascript
var executaLaRezolvare = function () {
  return 'execut la rezolvare';
};
var promisune = new Promise(executaLaRezolvare);
```

### Fă o promisiune!

Pentru a face o promisiune, se va folosi constructorul `Promise` căruia îi pasăm un singur argument. Acesta este o funcție cu rol de „executor”, spune standardul. Această funcție, la rândul ei primește două argumente: `resolve` și `reject`. Aceste două argumente sunt două funcții puse la dispoziție deja de motor cu scopul de a-ți semnala succesul sau eșecul.

Să revenim la funcția *executor*. Aceasta este apelată pentru a iniția și pentru a avea un răspuns la operațiunea pentru care construim promisiunea. Dacă ne lovim de un eșec, putem apela funcția `reject`, iar în caz de rezolvare, este disponibilă funcția ” care primește un singur argument. Acesta reprezintă chiar valoarea returnată la încheierea operațiunii. Această valoare disponibilă ca argument al lui ” poate fi chiar o valoare în sine sau un alt obiect `Promise` care la rândul său va avea drept sarcină returnarea unei valori.
Funcția `reject` este și ea pasată executorului și la rândul său primește un argument, care, de regulă este un obiect `Error`.

La apelarea cu `new`, constructorul `Promise` creează un obiect care pune la dispoziție o metodă `then`. Metoda `then` primește două funcții callback: `success` și `failure`. Callback-ul `success` este invocat dacă funcția `resolve` este invocată pentru acea promisiune. În caz contrar, se invocă `error`.

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

Un exemplu de înlănțuire folosind arrow functions.

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

O promisiune este ca un scaun ocupat. Vine un coleg, care ocupă un scaun punând o haină pe spătar. Apoi pleacă pentru că are ceva de făcut. Nu știi când vine, dacă vine. Oricum, scaunul este ocupat. La un moment vine și spune: „am rezolvat treaba”. Dacă nu, zice: „am făcut un spanac”!

**Standardul spune**:
> Oricare obiect Promise este în una din cele trei stări posibile: `fulfilled`, `rejected` și `pending`.

Să lămurim termenii. În limba română `fulfilled`, în contextul nostru o traducem cu *îndeplinită*; `rejected` este *refuzul* îndeplinirii unei promisiuni pentru un anumit motiv, iar `pending` este tradus prin *în așteptare*.

Starea `pending` - *în așteptare* indică faptul că o promisiune nu a fost *îndeplinită* și nici nu a fost *respinsă*. Încă așteaptă ca procesul computațional pentru care a fost creată promisiunea, să-și termine evaluarea.

Când un obiect promisiune stă o lungă perioadă de timp în starea `pending`, spunem despre acea promisiune că este *nerezolvată* - `unresolved`.
Opus, este o promisiune care a fost *încheiată* - `settled`. O promisiune este rezolvată atunci când, fie a fost refuzată, fie a fost rezolvată.

O promisiune este *rezolvată* dacă a fost *încheiată* sau dacă va servi drept stare altei promisiune, care aștepta această rezolvare.

### Proprietățile constructorului Promise

#### `Promise.prototype`

Este obiectul prototip al obiectului intern fundamental `Object`.

#### `Promise.all(obiectIterabil)`

Metoda returnează un nou obiect promisiune care cuprinde promisiuni rezolvate pentru cele pasate. Este posibil să și refuze oferind primul refuz cu motivația oferită de prima promisiune  care refuză din obiectul returnat. Pe scurt, ai mai multe promisiuni și încerci să le rezolvi pe toate odată.

#### `Promise.race(obiectIterabil)`

Se aseamănă cu `Promise.all` rezolvând toate elementele (promisiunile) din obiectul iterabil. Dacă iterabilul este gol sau dacă nu este încheiată una din promisiunile din iterabil, nici `race` nu va fi *încheiată* (**settled**).
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

Și varianta care folosește promisiuni

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
[Trevor Burnham. Async JavaScript]()
[Wikipedia. Futures and promises](https://en.wikipedia.org/wiki/Futures_and_promises)
[Eric Elliot. Master the JavaScript Interview: What is a Promise?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
[Jecelyn Yeen. JavaScript Promises for Dummies](https://scotch.io/tutorials/javascript-promises-for-dummies)
[Benjamin Diuguid. Asynchronous Adventures in JavaScript: Callbacks](https://medium.com/dailyjs/asynchronous-adventures-in-javascript-callbacks-39880f1b470e)
[P.Z.Ingerman.Thunks: A Way of Compiling Procedure Statements with Some Comments on Procedure Declarations](http://archive.computerhistory.org/resources/text/algol/ACM_Algol_bulletin/1064045/frontmatter.pdf)
[Thunks](https://github.com/thunks/thunks)
[Rethinking Asynchronous JavaScript: Thunks](https://frontendmasters.com/courses/rethinking-async-js/thunks/)
