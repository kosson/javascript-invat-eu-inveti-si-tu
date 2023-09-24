# Promise

Una din preocupările constante ale programatorului este aceea a gestionării timpilor de execuție printr-o succesiune eficientă a operațiunilor. Dincolo de aceste considerente abstracte, pentru moment, cel mai valoros lucru, atunci când scrii cod, este să poți întocmi o hartă mentală a execuției, pe care să jalonezi declarații, medii lexicale, apeluri și timpi de execuție. Această hartă este strâns legată de algoritmica programului. Uneori apar **necunoscute** care trebuie gestionate. Aceste **necunoscute** sunt legate de **timpul** necesar execuției sau de succesiunea rezolvării anumitor evaluări, care depind de alte resurse, unele aflate la distanță, iar altele poate care necesită resurse computaționale.

Vă mai aduceți aminte de faptul că o funcție are nevoie de valorile din mediul lexical sau obiectul context pentru a putea să-și execute codul din corp? Ce se întâmplă atunci când o resursă este la distanță sau în corpul funcției este apelată o alta care aparține unui API extern, așa cum sunt cele puse la dispoziție de browser. Cea mai prost scenariu ar implica blocarea firului de execuție al programului pentru a satisface toate condițiile necesare efectuării propriilor evaluări. Un exemplu ar fi o buclă care completează un array cu un miliard de valori. Până când bucla nu termină treaba, nu se poate trece la evaluarea codului care urmează, dată fiind natura sincronă a modului în care se fac evalurile codului unui program JavaScript.

Ce-ar fi dacă am proceda la trimiterea în *fundal* (*runtime-ul de execuție*) a acestor operațiuni care necesită timp și/sau efort pentru a fi soluționate. De exemplu, o funcție ar ieși de pe scenă, precum un actor care **promite** să revină, după ce va lua din culise recuzita necesară. Publicul va rămâne *în așteptare*, urmărind jocul celorlalți actori rămași.

**Moment ZEN**: Promisiunile programează rularea de cod în manieră asincronă.

Această operațiune de anticipare a unor rezultate în anumite cazuri este în strânsă legătură cu momentul în care se execută o anumită operațiune. Uneori, când soliciți niște date dintr-o sursă locală sau la distanță, serviciul responsabil poate să nu funcționeze sau datele să nu se fi generat dintr-o altă operațiune de prelucrare anterioară. În acest caz, vorbim de aspectele asincrone ale rulării codului.

Toate aceste necunoscute, mici sincope, lucruri care nu pot fi stăpânite printr-o gândire pur algoritmică, au nevoie să fie gestionate cumva. Pot fi asemuite previziunii meteorologice prin care se încearcă anticiparea vremii. Cum în cazul programării este nevoie de un rezultat concret, aceste aprecieri ale posibilității obținerii sau nu a unui rezultat, poartă numele de **promisiuni**. O promisiune este o valoare care poate fi disponibilă **acum**, în **viitor** sau **niciodată**. Ceea ce se *promite* este faptul că vei primi un răspuns, fie acesta unul **pozitiv** (o valoare), fie unul **negativ** (o eroare).

Mulți practicieni apelează la comparația promisiunilor cu **IOU** -urile. Un IOU este o sintagmă în limba engleză: **I owe you** (**îți sunt dator** am traduce în română, ori colocvial *ai de primit*), care reglementează o realitate tranzacțională asemănătoare unor chitanțe sau AWB-uri (din limba engleză *air waybill*) în cazul efectelor poștale. AWB-ul este un jeton pe care îl primești în urma achitării unui produs care urmează să-ți fie livrat. Produsul poate să-ți fie livrat după o perioadă (înregistrăm un **succes**) sau poți primi o explicație pentru problemele apărute la livrare (înregistrăm o **eroare**) însoțită de o posibilă rezolvare pentru problema apărută. În cazul AWB-urilor, poți urmări comanda și pentru o vreme vei vedea mesajul *în curs de livrare* * în engleză ar fi **pending**.

Mai există un termen care trebuie lămurit pentru că ne vom lovi de el adesea: **concurrency**, care s-ar traduce în limba română **concurență**, dar în contextul acestui limbaj de programare cu nuanța de **concomitent**. Kyle Simpson spune despre acest fenomen că două operațiuni în JavaScript se pot desfășura în aceeași fereastră de timp, dar asta nu înseamnă că se întâmplă în paralel. În JavaScript nimic nu se petrece în paralel pentru că avem un singur fir de execuție. În acest caz, se apelează la prioritizarea execuției diverselor părți ale codului. Ce te faci când în lucrul curent, cu evenimente, multiple funcții încep evaluarea, iar unele au nevoie de valorile returnate de altele sau resurse aflate la distanță. Adu-ți mereu aminte că foarte multe apeluri pe care le vei face în JavaScript sunt la niște funcții/metode care sunt o interfață cu programe ale browserului. De exemplu, `setTimeout` care programează execuția unei funcții cu rol de callback într-un moment viitor sau `fetch` care returnează resurse de la distanță accesate prin Internet.

În acest mediu înalt concurențial, avem deja componentele care reglează controlul programului: **stiva apelărilor**, **bucla evenimentelor** (*event loop*) și **coada sarcinilor** (*task queue*). Gestionarea acestui mediu concurențial, a introdus paradigma de lucru **asincron**.

**Moment ZEN**: Codul care rulează asincron nu blochează event loop-ul.

Pentru a rezolva mai elegant problema asincronicității dincolo de ceea ce pot oferi callback-urile, ES6 a introdus oficial conceptul de **promises** (promisiuni) în standard. Pe lângă *call stack*, *event loop* și *task queue*, promisiunile mai introduc o coadă de așteptare proprie numită *microtask queue*, care are prioritate față de *task queue* în introducerea unor callback-uri în *event loop*.

**Standardul spune**:

> O promisiune este un obiect care este folosit ca locțiitor pentru rezultatele care ar putea apărea în urma unei computații întârziate (posibil asincronă).([25.4Promise Objects](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-promise-objects)).

**Moment ZEN**: O promisiune este un obiect care *împachetează* o operațiune asincronă cu specificația că va returna un rezultat sau o eroare într-un moment viitor.

## Scurt istoric

Promisiunile nu sunt un concept nou în programare. Trevor Burnham menționează în lucrarea sa *Async JavaScript* faptul că la începuturile ideilor de organizare a resurselor în rețea, ceea ce numim acum Internet, exista un proiect care s-a numit Xanadu programat în C++, unde apare ideea de promisiuni. Mai apoi sub conceptul **deferred** își face apariția și în alte limbaje de programare cum ar fi limbajul de programare **E** (era numit *futures*) și apoi Python. Wikipedia aduce o definiție și prin aceasta, în prim plan, câțiva termeni relevanți pentru înțelegerea promisiunilor:

> În domeniul informaticii, viitor («future»), promisiune («promise»), întârziere («delay») și amânare («deferred») se referă la constructe folosite pentru a sincroniza execuția programului în unele limbaje de programare care permit execuția concurențială. Aceștia descriu un obiect care se comportă ca un proxy «mecanism de delegare» pentru un rezultat care, inițial este necunoscut pentru că, în mod curent computarea valorii sale nu este încă încheiată.

Conform autorilor Wikipediei și lui Trevor Burnham, termenii de **promisiune**, **deferred** și **future** sunt folosiți interșanjabil.

Termenul de **promise** (promisiune) a fost propus în anul 1976, dar după adoptarea în Python, doar un pas a mai lipsit pentru a fi preluat ca practică și în JavaScript. Și *deferred* își face apariția mai întâi în 2007, prin biblioteca de cod **Dojo** (`dojo.Deferred`). Doi ani mai târziu apare specificația *Promises/A* în biblioteca de cod **CommonJS**. În același an (2009) apare și **Node.js**, care folosește CommonJS pentru a realiza modularitatea. Merită menționat faptul că biblioteca de cod **JQuery**, care motorizează foarte multe pagini web în acest moment, a introdus conceptul de promisiuni, dar cu nuanța **deferred**, însemnând că poți declanșa o promisiune în mod direct fără a mai apela un callback. Prin folosirea promisiunilor, intrăm în zona **soluțiilor asincrone**, care implică o înțelegerea prealabilă a modului în care funcționează *bucla evenimentelor* și *callback-urile*. În JavaScript promisiunile sunt introduse în ES2015 schimbând radical modul în care se face programarea asincronă.

Promisiunile sunt **executate** sincron, dar sunt **rezolvate** asincron înaintea oricăror alte evenimente I/O.

## Foaie de parcurs pentru promisiuni

Pentru că odată cu promisiunile, ne apropiem de stadii avansate ale înțelegerii acestui limbaj de programare ca instrument de prelucrare a datelor, vom parcurge un scenariu simplu, pentru a ajunge în final să vedem care ar fi ajutorul pe care ni-l oferă. Pentru prelucrarea datelor simple dintr-un posibil array am folosit cu succes **soluțiile sincrone** din a căror gamă fac parte prelucrările de date cu instrucțiunea `for` sau cu metoda `forEach()` oferită de prototipul lui `Array`.

```javascript
var listă = [1, 2, 3];
listă.forEach(function (elementArray) {
  console.log(elementArray);
}); // 1 2 3
// sau cu un array function
listă.forEach(elementArray => console.log(elementArray)); // 1 2 3
```

După cum se observă, am implicat în soluție o funcție cu rol de callback. Am aflat deja că promisiunile sunt soluția la problemele pe care utilizarea callback-urilor le ridică. Problemele lor bine-cunoscute numără și imposibilitatea de a colecta erorile ridicate folosind `try...catch`.

**Moment ZEN**: Promisiunile sunt obiecte care țin locul valorilor rezultate din operațiuni asincrone.

Este un concept foarte puternic în sine. Gândește-te că ai avea un locțiitor de valoare, care ar permite deja utilizarea sa în expresiile în care sunt folosite cu un detaliu foarte important: nu se blochează firul de execuție cât timp sunt aduse datele. Să luăm exemplu unui `fetch` care este apelul către un API al browserului. Ceea ce returnează acest apel este un obiect, un locțiitor de valoare. În spate, browserul preia sarcina de a face apelul și de a aduce datele de la distanță.

```javascript
const loctiitorValoare = fetch("http://api.undeva.ro/date.json"); // la un moment dat apar și datele
```

Acest obiect locțiitor poate fi instrumentat grație unor stări prin care trece. O promisiune este un obiect, de fapt. Un obiect care are capacitatea de a gestiona date care au nevoie de ceva timp să ajungă (apel web sau citire de pe disc). Când datele *ajung* în obiect, spunem că promisiunea a fost *rezolvată*.

Pentru a *prelucra* datele la momentul în care promisiunea este rezolvată, obiectul promisiunii pune la dispoziție metoda `then()`. Pentru a *prinde* erorile apărute, avem la dispoziție metoda `catch()`. Ambele metode sunt înlănțuite și le sunt pasate funcții cu rol de callback care au rolul de a prelucra date sau instrumenta erorile.

**Standardul spune**:

> Oricare obiect Promise este în una din cele trei stări posibile: `fulfilled`, `rejected` și `pending`.

Promisiunile implică gestionarea celor trei stări posibile ale unui răspuns: `pending`, `fulfilled` și `rejected`. O stare `pending` (tradus prin *în așteptare*) este cea în care se află promisiunea de îndată ce a fost creată. Starea `pending` va perpetua până când se modifică în `fulfilled` (în lb. română *împlinită*) sau `rejected` (în limba română *respinsă*). Starea `fulfilled` implică faptul că promisiunea a fost *rezolvată* prin aducerea valorii așteptate. Starea `rejected` indică faptul că valoarea nu este disponibilă.

### Pentru ce folosim promisiunile

Atunci când folosești o funcție cu rol de callback, poți spune că cedezi o mare parte din controlul pe care îl ai asupra ceea ce se execută unei părți de aplicație pe care nu ai scris-o tu personal. Cedarea controlului unei părți terțe printr-un callback nu mai este un răspuns adecvat nevoilor privind precizia rulării codului. Totuși, mecanismul oferit de callback-uri își păstrează valoarea sa în anumite condiții. Atunci când sunt folosite API-urile browserului sau ale Node.js, callback-ul este codul corpului funcției care va fi evaluat după ce datele necesare au fost introduse în contextul de execuție a acesteia. Datele vor fi disponibile doar contextului de execuție a callback-ului și din această cauză, pentru alte prelucrări ale acestora care necesită apelarea altor API-uri cărora la rândul lor le pasezi callback-uri, se naște o structură cunoscută drept *callback hell* (*iadul callback-urilor*).

Câștigul cel mai important este că promisiunile permit rularea de cod asincron. Ca efect al acestei caracteristici, promisiunile permit *programarea* în timp a unor fragmente de cod care sunt executate după ce codul sincron și-a încheiat deja execuția. Acest lucru se întâmplă pentru că execuția expresiei care creează un obiect promisiune se execută sincron, în ordinea în care codul interpretat își urmează cursul firesc, dar ceea ce face, scopul, acțiunea pentru care am creat promisiunea este cod care va fi executat mai târziu, atunci când datele necesare respectivului cod sunt disponibile.

### Thunk, precursorul

Vom explora un model de funcții existent, care ar mai rezolva din problemele callback-urilor. Acesta se numește funcție **thunk**, care conform lucrării lui P.Z.Ingerman din 1961, introduce conceptul, fiind în definiția sa *un fragment de cod care oferă o adresă*. În accepțiunea modernă și în contextul pregătitor înțelegerii promisiunilor, un *thunk* este o funcție care încapsulează în același timp cod sincron și asincron. Funcția acceptă un singur argument, care este o funcție CPS (*continuation passing style* vezi la callback-uri) și returnează o altă funcție sau chiar un alt *thunk*.
Un *thunk* asincron este o funcție căreia îi pasezi un callback pentru a obține o valoare. Hai să vedem mai întâi cum arată un *thunk* sincron și care este utilitatea sa.

```javascript
function numePrenume (nume, prenume) {
  return `${nume} ${prenume}`;
};
let thunk = function () {
  return numePrenume('Ionel', 'Pavelescu');
};
thunk(); // Ionel Pavelescu
```

După cum observi, o expresie de funcție *thunk* are totul pentru a-ți oferi o valoare. Nu trebuie să introduci nicio valoare pentru a avea deja una la momentul execuției. Acesta este modelul simplu al unui *thunk* sincron.

Dincolo de operațiunea în sine, am construit un soi de *referință* către o valoare calculată la apelarea oriunde a funcției `thunk`. Am numit funcția `thunk`, dar poate purta oricare alt nume. Mecanismul în sine este important de înțeles: accesul la o valoare calculată care nu se schimbă pentru că este *hard-coded* (adică valorile sunt predefinite la apelarea lui `numePrenume`). Se mai petrece un lucru foarte important. Adu-ți aminte de faptul că o funcție, pentru a se executa, are nevoie de toți identificatorii valorilor din mediul lexical propriu sau ai contextului. Variabila `thunk` va fi o referință către o stare ambalată într-un container. Această referință, acest container care ambalează o valoare, fie aceasta o funcție care returnează o valoare computată, va fi la dispoziția ta în întregul program.

Kyle Simpson spune că aici ar trebui să fim atenți pentru că, de fapt, aceasta este ideea principală a promisiunilor: **un ambalaj peste o valoare**. Identificatorul ambalajului poate fi utilizat în program ca oricare altă valoare. Mai există un aspect important asociat promisiunilor, care merită reținut pentru a evita partizanatul. Promisiunile nu au fost introduse pentru a elimina callback-urile, ci pentru a elimina callback-urile inutile, spune Adam Boduch în lucrarea sa *JavaScript Concurency*.

Un *thunk asincron* este o funcție care, spre deosebire de surata sincronă, are nevoie de o funcție callback care să-i fie pasată. Pentru a simula asincronicitatea, în funcția returnată vom folosi utilitarul `setTimeout()`.

```javascript
/* #1
  Creezi o funcție cadru
  Poate face prelucrări necesare callback-ului */
function concatenare (nume, prenume, callback) {
  console.log('concatenare', this); // Window
  // simulăm o operațiune asincronă
  setTimeout(function () {
    callback(`${nume} ${prenume}`);
    // apelul se va face ulterior celor 3 secunde
  }, 3000);
};

/* #2
   Creezi o expresie de funcție care primește o funcție
   pe care o pasează în funcția cadru ca argument la
   momentul execuției acesteia.
   Poate la rândul ei să prelucreze date pe care să
   le injecteze la apelul funcției cadru. */
var thunk = function (callbackApel) {
  console.log('thunk', this); // Window
  concatenare('Roxana', 'Nae', callbackApel);
};

/* #3
  Invoci thunk-ul cu un callback care să
  folosească datele din funcția cadru sau cele
  pasate prin declarea thunk-ului */
thunk(function clbk4concat (numePrenume) {
  console.log('clbk', this); // indow
  console.log(numePrenume);
});
```

Ceea ce tocmai am realizat este un mecanism prin care inițiem un apel căruia îi pasăm un callback. **Evaluarea va returna mereu și mereu o valoare**. Funcția `callback` va fi apelată după ce se vor scurge cel puțin trei secunde, simulând astfel un răspuns ulterior. Câștigul unui astfel de model este acela al accesului la mediul lexical al funcției `concatenare`, care poate include variabile de sistem, constante, în general date care nu sunt accesibile în mod direct. În acest scenariu, rolul callback-ului este acela de a prelucra datele existente în funcția cadru (cea de computație și cu valori protejate) și cele care au fost introduse de funcția `thunk`. Cert este faptul că vom avea un răspuns la execuția lui `thunk` la un moment dat.

![Funcționarea unui thunk](ThunkVizualExplicat.png)

Kyle Simpson explică entuziast că ceea ce am realizat prin apelarea funcției asincrone, este un ambalaj al operațiunilor care se vor desfășura într-o bulă de timp izolată. Un timp de execuție de care nu va mai depinde nicio altă funcție, care până mai odinioară, când foloseam callback-urile, ar fi trebuit să aștepte. Aceasta este majora deficiență a practicii callback-urilor: gestionarea timpului, care se concluzionează printr-o stare confuză, dacă privești cine așteaptă după cine să termine execuția pentru a avea datele de lucru necesare. Adu-ți mereu aminte că o funcție are nevoie de toate datele pentru a-și încheia evaluarea. Este important să corelezi cu faptul că JavaScript are un singur fir de execuție, care înseamnă o singură linie temporală.

Chiar dacă nu am avut la îndemână aproape 20 de ani pentru a ajunge la concluziile lui Kyle, am să folosesc înțelepciunea dobândită pentru a vă spune și vouă că este mult mai bine să folosești promisiunile în practică și încet, încet să te depărtezi de callback-uri, folosindu-le acolo unde își dovedesc eficiența.
Înțelegerea funcțiilor *thunk* conduce la înțelegerea *promise*-urilor pentru că, spune aceeași voce autorizată: *thunk-urile sunt promisiuni fără un API fățos*. Funcțiile *thunk* sunt o soluție mai bună opozabilă callback-urilor, dar sunt tot un soi de callback-uri din care factorul timp a fost abstractizat. Ceea ce rămâne este calea înțelegerii promisiunilor.

## Constructorul Promise()

Pentru a face o promisiune, se va folosi constructorul `Promise` căruia îi pasăm un singur argument, care este o funcție. Această funcție este apelată imediat ce ai pasat-o constructorului. Acesta este o funcție cu rol de *executor*, spune standardul.

```javascript
const promisiune = new Promise(function executor (resolve, reject) {});
```

Executorul care are două argumente, la rândul lor niște funcții cu rol de callback. Prin convenție, cele două callback-uri se numesc `resolve` și `reject`, dar poți să le redenumești dacă dorești. Sunt identificatorii celor două callback-uri.

**Moment ZEN**: Funcția executor este executată imediat de motorul JavaScript.

Execuția imediată a executorului face ca promisiunea să intre în starea `pending`. Când este apelat callback-ul `resolve`, promisiunea își modifică starea în `fulfilled`.

O promisiune este *rezolvată*, dacă a fost *încheiată* sau dacă va servi drept stare altei promisiuni, care aștepta această rezolvare, dacă există un astfel de caz.

Callback-ul `resolve()` este cea care obține datele la momentul apelării metodei `then`. Am putea traduce în limba română metoda `then` prin termenul *apoi* sau *după aia*. Semantic, numele metodei implică acțiunea care se va petrece după ce promisiunea a intrat ori pe ramura `resolve`, ori pe ramura `rejected` a posibilelor stări prin care se rezolvă o promisiune.

```javascript
let promisiune = new Promise(function executor (resolve, reject) {
  let valoare = 'niște date'; // Obține aici o valoare prin evaluarea unei expresii
  // cod evaluat de executor. Încheierea execuției executorului este prin pasarea valorii lui resolve()
  resolve(valoare); // declanșează apelarea calllback-ului pasat în then, care primește valoarea
});
promisiune.then((valoare) => {
  console.log(valoare);
}).catch( function oEroare (error) {
  // tratare eroare
  console.log(error);
}); // 'niște date'
```

În urma evaluării callback-ul `resolve(valoare)` putem obține o valoare în sine sau un alt obiect `Promise`, care la rândul său va avea drept sarcină returnarea unei valori.

Poți testa eșecul prin apelarea funcției callback `reject`. Funcția cu rol de callback `reject` este și ea pasată *executorului*. La rândul său primește un argument, care, de regulă, este un obiect `Error`.

```javascript
let altăPromisiune = new Promise((resolve, reject) => {
  try {
    let valoare = 'niște date'; // Obține aici o valoare prin evaluarea unei expresii
    resolve(valoare); // resolve declanșează apelarea callback-ului pasat în then, care primește valoarea
  } catch (error) {
    reject(new Error(error)); // erorile apărute în evaluarea expresiilor din `try`
  }
});
```

Ceea ce declanșează apelarea callback-ului `reject` este mutarea stării promisiunii din `pending` în `rejected`. Modificarea stării va atrage după sine apelarea funcției cu rol de callback care a fost pasată în `catch` ca argument.

Metoda `catch((eroare) => console.error)` are rolul de a *prinde* (în limba engleză *catch* înseamnă *a prinde*) toate erorile apărute similar comportamentului `try...catch`.

Returnarea din funcția executor nu înseamnă că a fost încheiată treaba pentru care am creat promisiunea, ci faptul că această treabă a intrat în lucru și că în urma evaluării codului promisiunii am ajuns la un rezultat sau la un eșec.

Există posibilitatea ca o promisiune să nu-și poată schimba starea. Dacă nu este apelat callback-ul `resolve`, starea nu se poate schimba, promisiunea rămânând *agățată*.

```javascript
new Promise((resolve, reject) => {
  resolve();
  console.log('mă aflu în plină execuție');
}).then(() => {
  // reject();
  console.log('Eu nu am fost apelat încă');
}).catch((eroare) => {
  return console.log('A apărut o eroare: ', eroare);
});
```

Dacă în exemplul de mai sus am comenta în cod callback-ul `resolve`, promisiunea ar rămâne perpetuu *agățată*. Asigură-te că starea promisiunii se va modifica la un moment dat.

Interesant este și faptul că poți apela direct metoda `resolve` a obiectului `Promise`. Pentru a apela direct `resolve`, asigură-te că argumentul este o valoare care va exista cu siguranță fără a genera o eroare. În scop demonstrativ, vom folosi un șir de caractere.

```javascript
let eRezolvatăDeja = Promise.resolve('valoarea necesară');
eRezolvatăDeja.then((valoare) => {
  console.log(valoare);
}).catch((eroare) => {
  if (eroare) throw eroare;
});
// sau
let rezolvareLaCerere = () => Promise.resolve('altă valoare');
rezolvareLaCerere().then((valoare) => {
  console.log(valoare);
}).catch((eroare) => {
  if (eroare) throw eroare;
});
```

Un astfel de lucru cu promisiunile nu aduce niciun beneficiu, iar bune practici invită la evitarea sa. Observă faptul că poți crea o promisiune prin trei moduri. Instanțierea obiectului prin `new Promise(() => {})`, prin apelarea directă a metodei `Promise.resolve` sau prin apelarea directă `Promise.reject`. Utilizarea unor [API-uri ale browserului](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs), precum `fetch` sau `Clipboard`, care vor crea o promisiune sunt o altă metodă de a le crea.

### Fă o promisiune și împlinește-o

La apelarea cu `new`, constructorul `Promise` creează obiectul promisiune, cel care pune la dispoziție o metodă `then`. Am putea spune că prezența metodei `then` este marca promisiunilor.

Metoda `then` primește drept prim argument o funcție cu rol de callback pentru prelucrarea datelor în caz de succes (în limba engleză *fulfillment handler*). Calback-ul primit va fi introdus într-o coadă de așteptare numită *microtask queue*, unde va aștepta ca întreg codul sincron să-și termine execuția, adică stiva de execuție a apelurilor (*call stack*) este goală. Dacă *call stack*-ul este gol, callback-ul este luat din *microtask queue* unde aștepta, datele primite sunt legate automat la parametrul introdus ca prim argument al callback-ului și este introdus în *call stack* pentru a-i fi executat corpul. Adu-ți mereu aminte de faptul că motorul Javascript are două cozi de așteptare: *task queue* numit și *callback queue* în care sunt introduse funcțiile cu rol de callback care au fost pasate drept argument unor apeluri la API-uri ale browserului și una numită *microtask queue* care are prioritate în fața *task queue*-ului când vine vorba de întâietatea la execuție prin introducerea în *call stack*. Decizia și prioritizarea acestor funcții cu rol de callback o face mecanismul *event loop* care monitorizează permanent cele două cozi de așteptare. Pe bună dreptate, te vei întreba când ajunge callback-ul unei promisiuni în *microtask queue*. Motorul JavaScript monitorizează momentul când datele sunt disponibile și în acel moment, dacă tot codul sincron din global a fost executat, introduce callback-ul pasat lui `then` în *microtask queue*. Apoi, *event loop* va *injecta* funcția spre execuție în *call stack*, unde se va face evaluarea corpului funcției, având la dispoziție datele deja disponibile. Abia după ce *microtask queue* este gol, *call stack* este gol, *event loop* va trimite spre execuție și funcțiile din *callback queue*.

Metodei `then` îi poți pasa un al doilea argument, care tot o funcție cu rol de callback este. Aceasta va fi apelată în cazul unei respingeri (în limba engleză *rejection handler*). Primul argument este un callback căruia, în spate îi sunt pasate datele ca valoare a primului argument al acesteia.

Pentru a trata erorile înlănțuiești o metodă `catch` după `then`.

**Moment ZEN**: `then` este folosit pentru a constitui un lanț de operațiuni asincrone aplicabile pe rezultatul apărut.

Callback-ul din `then(callback)` este invocat dacă funcția `resolve()` este invocată pentru acea promisiune, condiția fiind satisfăcută. În caz contrar, se procesează eroarea în metoda `catch(fnTrateazăEroarea)`.

```javascript
let promisiune = new Promise((resolve, reject) => {
  // scrii cod care face ceva și apoi condiționezi rezolvarea
  let conditie = false;
  if (conditie) {
    resolve("Am rezolvat treburile!");
  } else {
    reject("Te refuz că treaba nu e făcută!");
  };
});
promisiune.then(
  valoarea => {
    console.log(`Ți-am promis ceva! Vezi? ${valoarea}`);
  }
).catch((eroare) => {
  console.log(`${eroare}`);
});
```

Tot codul din constructor va fi executat sincron la momentul instanțierii obiectului promisiune. Spunem că promisiunile sunt *iuți* (*eager*) în execuția codului. Codul din funcția cu rol de executor nu este executat asincron. Linie după linie, tot codul va fi executat și în cazul în care sunt operațiuni asincrone în cod, acestea vor fi tratate în funcție de API-ul fiecăruia. Astfel, vor fi programate și tratate toate operațiunile asincrone, fiind folosite mecanismele *event loop*-ului (cozile de așteptare: microtask și task). Pentru că promisiunile fac o *programare* a execuției codului asincron, am putea crede că fac o evaluare doar *dacă e necesar* (*lazy*), ceea ce este fals. În cazul în care dorești o evaluare *lazy* a unei promisiuni, o poți *îmbrăca* într-o funcție pe care să o apelezi în viitor *dacă e necesar*.

```javascript
const creezOPromisiuneLazy = () => new Promise((resolve, reject) => {
  resolve('Salve!');
});
```

### Promisificarea funcțiilor sincrone

În anumite circumstanțe, pentru că promisiunile oferă o metodă elegantă de a trata codul care se execută asincron, poate că vei dori să *promisifici* o funcție care folosea un callback. Multe dintre metodele obiectelor interne pe care le pune la dispoziție din oficiu orice implementare de ECMAScript, folosesc paradigma callback-urilor.

Pentru a promisifica orice altă funcție, se va *îmbrăca* acea funcție într-o funcție, care va returna o promisiune.

```javascript
function oFunctiePromisificată (intrare1, intrare2) {
  return new Promise((resolve, reject) => {
    functieDePromisificat(intrare1, intrare2, (error, date) => {
      if (error) {
        return reject(error);
      }
      resolve(date);
    });
  });
}
oFunctiePromisificată.then((date) => {
  // Fă ceva cu datele aduse aici.
}).catch(error => console.error);
```

În cazul în care este folosit Node.js, se poate folosi și `util.promisify(numeUtili)`. Un astfel de scenariu ar fi util atunci când dorești să folosești rezultatul într-un viitor apropiat, într-un lanț de apeluri `then`.

## Promisiuni în tratarea apelurilor asincrone

Promisiunile sunt un pas evolutiv care permite lucrul mult mai ușor cu API-urile, de fapt cu metodele acestora, care au nevoie de ceva timp pentru a aduce un rezultat. Pentru a vedea la lucru promisiunile într-un posibil exemplu viabil pentru activitatea practică de lucru cu datele, vom face un apel AJAX. Ceea ce vom face este să aducem o înregistrare din setul pus la dispoziție de API-ul Europeana.eu.

```javascript
// înlocuiește cheia API din link, cu una personală
// wskey=XpropriaCheieX * fă-ți o cheie de aici https://pro.europeana.eu/get-api
// dacă nu introduci cheia personală vei avea o eroare
// Cross-Origin Request Blocked
const promisiune = new Promise((resolve, reject) => {
  let adresa = "https://www.europeana.eu/api/v2/search.json?wskey=XpropriaCheieX&query=The%20Fraternity%20between%20Romanian%20and%20French%20Army";
  let xhr = new XMLHttpRequest();
  xhr.open('GET', adresa);
  xhr.responseType = 'json';
  xhr.onload = function () {
    resolve(xhr.response);
  };
  xhr.onerror = function () {
    reject('probleme cu resursa');
  };
  xhr.send();
});
promisiune.then(rezultat => {
  console.log(rezultat);
}).catch(error => console.log(error));
```

Pentru a exemplifica aplicat, am *promisificat* un apel AJAX către o resursă la distanță. În funcțiile care gestionează evenimentele `onload` și `onerror` am făcut apelurile către callback-urile specifice promisiunilor. Acest lucru permite lucrul cu metodele `then(succes, eșec)` și `catch(error)`. Numele parametrilor pot fi arbitrar alese, dar practica a creat o regulă de obișnuință prin termenii din limba engleză `resolve` și `reject`.

### Înlănțuirea metodelor then

În cazul în care o metodă `then` returnează o valoare, indiferent care este natura ei (poate fi chiar o altă promisiune), respectiva valoare este pasată unei alte metode `then((valDeLaAnterioara) => {})` pentru a fi prelucrată. În acest caz, spunem că se face o înlănțuire a metodelor `then` (în limba engleză **chaining**).

```javascript
let îțiPromit = new Promise( function (resolve, reject) {
  var unȘir = `un fragment interesant`;
  resolve(unȘir);
}).then( function (unȘir) {
  return unȘir.length;
}).then( function (dimensiune) {
  console.log(dimensiune);
}).catch( function (error) {
  if(error) throw new Error('ceva nu este bine');
});
console.log(îțiPromit); // 22
```

Dacă nu faci un `return` din callback-ul pasat unui `then`, nu vei putea folosi valoarea în următorul `then`. Reține faptul că metoda `then` returnează un obiect promisiune și acesta este motivul pentru care poți face chaining cu o altă metodă `then`. Valoarea care a rezultat în urma evaluării codului din callback-ului `then`-ului anterior va fi pasat callback-ului următorului `then`.

Buna practică spune să nu creezi lanțuri `then` pentru a controla modul de execuție al codului executat sincron. Făcând acest lucru vei executa cod sincron ambalat în promisiuni, care au ca efect penalizarea performanței. Adu-ți mereu aminte că promisiunile sunt folosite pentru a programa executarea asincronă a unui fragment de cod care lucrează cu resurse la distanță, hard disk, ș.a.m.d. Singurul loc unde ar trebui să ai cod sincron este în ultimul `then`.

În cazul în care aplici `then` pe aceeași promisiune, dar nu folosești înlănțuirea, spunem că facem o bifurcare. Aici apar probleme în tratarea erorilor pentru că erorile apărute pe o ramură, nu vor putea fi tratate pe alta.

```javascript
let îțiPromit = new Promise( function (resolve, reject) {
  var unȘir = `un fragment interesant`;
  resolve(unȘir);
});

îțiPromit.then( function (unȘir) {
  console.log(unȘir.length);
}).catch( function (error) {
  if(error) throw new Error('ceva nu este bine');
});
// tocmai ai creat o altă ramură a promisiunii
îțiPromit.then( function (dimensiune) {
  console.log("Dimensiunea este: ", dimensiune);
}).catch( function (error) {
  if(error) throw new Error('ceva nu este bine');
});
console.log(îțiPromit); // 22 Dimensiunea este:  un fragment interesant
```

### Tratarea erorilor

Mai trebuie adăugat faptul că erorile sunt propagate pe lanțul `then` până când sunt prelucrate cu un `catch`. Doar erorile care apar în `then`-uri sunt prinse de `catch`. Erorile care apar sau sunt definite în constructor, nu vor fi *prinse* de `catch`.

```javascript
new Promise((resolve, reject) => {
  throw new Error('Uite o eroare!'); // aceasta nu va fi prinsă de catch
})
```

### Finalul unei promisiuni

Un obiect promisiune pune la dispoziție o metodă `finally` care este mereu apelată, fie că promisiunea este rezolvată printr-un `fulfilled` sau printr-un `rejected`. Această metodă primește o funcție cu rol de callback a cărei cod va fi executat chiar la final.

### Evaluează mai multe promisiuni odată

Metoda `all` permite executarea mai multor promisiuni într-o manieră paralelă. Este ca și cum ar alinia promisiunile la o linie de start precum alergătorii pe pistă, fiecare pe culoarul lui. La final, după ce toate operațiunile asincrone s-au încheiat, va fi inițiată execuția unei funcții callback unice, adică a unui `then`, care va trata rezultatul.

```javascript
Promise.all([promisiune1(), promisiune2()]).then((arrayRezultate) => {
  console.log(arrayRezultate[0]); // consumă datele din array
});
```

Apelând `then` pe rezultat, vom avea acces la un array cu rezultate tuturor promisiunilor.

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
Promise.all([pasulUnu(), pasulDoi(), pasulTrei()]).then((rezultat) => {
  // poți consuma array-ul cu rezultate
  console.log("Am terminat!");
});

// termină una din toate
Promise.race([pasulUnu(), pasulDoi(), pasulTrei()]).then((rezultat) => {
  console.log("Am terminat!");
});
```

Am introdus la final metoda `race`, care va oferi rezultatul celei mai rapide promisiuni care a fost rezolvată.

Un lanț de promisiuni poate fi integrat într-un alt lanț de promisiuni, dacă acest lucru este necesar. Folosirea promisiunilor nu trebuie limitată doar la un flux unic de prelucrare.

Un caz ilustrative pentru `Promise.all()` este cel al aducerii într-o pagină web a mai multor resurse deodată. Pentru a realiza acest lucru va fi nevoie să lucrăm cu API-ul `fetch`, care, de fapt, creează promisiuni.

### O funcție `map()` promisificată

Să presupunem că dorim că aplicăm o funcție pe datele dintr-o listă (poate fi foarte bine datele dintr-o listă de fișiere diferite în cazul folosirii Node.js cu `fs`). În exemplul oferit, am denumit în limba română cele două callback-uri ale obiectului `Promise` la momentul instanțierii pentru a cimenta și mai mult faptul că cele două denumiri sunt doar niște convenții de numire a callback-urilor funcției cu rol de executor.

```javascript
const lista = ["a", "b", "c"];

function dublezLitere (element) {
  return element + element;
};

// Promisificarea lui map
function mapPromisificat (lista, functieDeAplicat) {
  // returnează o listă de promisiuni
  let promisiuni = lista.map(function callbackPerElement (element) {
    // un element, egal o promisiune
    const promisiune = new Promise (function (rezolvat, respins) {
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

let listaPromisiunilor = mapPromisificat(lista, dublezLitere);
// obiect Promise
```

Pentru fiecare element din array, creezi câte o promisiune.

Totuși, pentru a respecta bunele practici, în lucrul curent ar trebui să folosim denumirile din limba engleză: `resolve` și `reject`.

## Promisiuni și module JavaScript

Am povestit deja faptul că promisiunile sunt o alternativă pentru practica callback-urilor. Să explorăm ce oferă noua practică cuplată cu ceea ce modulele JavaScript oferă.

```javascript
// varianta clasică cu callback
function incarcImagine (url, callback) {
  let imagine = new Image();
  imagine.onload = function () {
    callback(null, image);
  };
  imagine.onerror = function () {
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

Și varianta care folosește promisiuni:

```javascript
// varianta Promise
function incarcImagine (url) {

  return new Promise((resolve, reject) => {
    let imagine = new Image();

    // SUCCES
    imagine.onload = function () {
     rezolve(image);  // apelezi resolve cu valoarea în caz de succes
    };

    // AI EȘUAT
    imagine.onerror = function () {
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

## Promisiunile ca arbori

Metodele `then`, `catch` și `allSettled` trebuie aplicate direct pe promisiune, nu pe o referință către promisiune. În cazul aplicării pe o referință, se va crea o altă ramură de promisiuni independentă de o alta posibilă. Acest lucru se petrece pentru că aceste metode creează la rândul lor o promisiune. Cel mai adesea aceste aspecte sunt detectate la momentul când se face debugging. Recomandarea generală este ca o promisiune să fie tratată cap-coadă prin daisy-chaining.

```javascript
var oP = new Promise((resolve, reject) => {
  // codul promisiunii
});
op.then(() => {}); // dacă apare o excepție aici, nu va putea fi tratata
op.catch((err) => console.error()); // este o altă ramură, de fapt
```

Evită crearea de ramuri.

## Bune practici

În cazul rulării de cod care implică și promisiuni trebuie stăpânit foarte bine succesiunea și timpii de execuție.
Promisiunile trebuie folosite acolo unde sunt necesare: apeluri de rețea, la o bază de date, lucrul cu resurse de sistem, etc.

Nu introdu promisiuni acolo unde nu sunt așteptate: `setTimeout(async () => {}, 1000)`. Nu vei putea trata erorile care ar putea apărea. Acest îndemn se referă la bibliotecile de cod care așteaptă să pasezi un callback, nicidecum o promisiune.
În cazul exemplului de mai mai jos, în mod tradițional `EventEmitter` nu ar putea gestiona erorile care ar putea apărea la un async pasat în locul unui callback.

```javascript
const EventEmitter = require('events');
const ev = new EventEmitter();
ev.on('nume_eveniment', async () => {
  // aici ar putea apărea erori care nu ar putea fi gestionate de Node.
  // erorile ar putea totuți fi tratate dacă ai un process.on('uncaughtException', (err) => console.error())
});

// gestionează erorile care ar putea aprea în async-uri netratate corespunzător sau alte promisiuni.
process.on('uncaughtException', (err) => {
    console.log('A apărul un uncaughtException cu detaliile ', err.message);
});
```

Totuși, introdus de curând ai posibilitatea de a face EventEmitter-ul atent la erori dacă-i pasezi `{captureRejections: true}`, dar este experimental deocamdată (iulie, 2020) * [Capture Rejections of Promises](https://nodejs.org/api/events.html#events_capture_rejections_of_promises).

Nu amestecați promisiunile cu callback-urile. Folosirea lor împreună este un lucru dificil și adeseori vă veți lovi de erori.
Nu creați promisiuni în loop-uri. Acest lucru chiar dacă este posibil, va penaliza performanțele.
Evită crearea de lanțuri lungi `then()`. Ceea ce se întâmplă este că pur și simplu se introduce mai mult cod în microqueue, se alocă mai multă memorie. Folosirea mai multor `then` înlănțuite pentru a controla codul și datele (în fiecare `then` rulezi cod sincron), nu este o soluție. Promisiunile servesc scopului primar de a rula cod asincron eliberând astfel event-loop-ul.

Gestionează reject-urile. În cazul în care acestea sunt neglijate, memoria și performanțele generale vor avea de suferit. Dacă apare o eroare și nu o tratezi, pur și simplu ai de a face cu o *scurgere de memorie* (*memory leak*).

## Mantre

* JavaScript rulează într-un singur fir de execuție. Nu poate rula două secvențe de cod în **același timp**
* Ținta promisiunilor nu este să elimine callback-urile, ci să elimine callback-urile inutile. (*JavaScript Concurrency*, Adam Boduch)
* O promisiune este un obiect „care este utilizat ca o promisiune” și care reprezintă o valoare potențială apărută ca rezultat al unei operațiuni asincrone.
* `resolve()` și `reject` sunt două funcții obiect.
* Promisiunile permit rularea de cod asincron, adică programarea unei secvențe de cod care să ruleze în afara buclei evenimentelor.

## Dependințe cognitive

* funcții,
* closure-uri
* callback-uri,
* obiecte (metode)

## Alonje

* `fetch` (API)
* `async`/`await`

## Resurse

* [Promises/A+](https://programminghistorian.org/en/lessons/installing-omeka)
* [ECMAScript versiunea 7](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-promise-objects)
* [Trevor Burnham. Async JavaScript](https://www.amazon.com/Async-JavaScript-Responsive-Pragmatic-Express-ebook/dp/B00AKM4RVG)
* [Wikipedia. Futures and promises](https://en.wikipedia.org/wiki/Futures_and_promises)
* [Eric Elliot. Master the JavaScript Interview: What is a Promise?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
* [Jecelyn Yeen. JavaScript Promises for Dummies](https://scotch.io/tutorials/javascript-promises-for-dummies)
* [Benjamin Diuguid. Asynchronous Adventures in JavaScript: Callbacks](https://medium.com/dailyjs/asynchronous-adventures-in-javascript-callbacks-39880f1b470e)
* [P.Z.Ingerman.Thunks: A Way of Compiling Procedure Statements with Some Comments on Procedure Declarations](http://archive.computerhistory.org/resources/text/algol/ACM_Algol_bulletin/1064045/frontmatter.pdf)
* [Thunks](https://github.com/thunks/thunks)
* [Rethinking Asynchronous JavaScript: Thunks](https://frontendmasters.com/courses/rethinking-async-js/thunks/)
* [Native JavaScript Promises and Browser APIs | Will Fuqoa](https://fuqua.io/blog/2014/02/native-javascript-promises-and-browser-apis/)

### Video

* [More About JavaScript ES6 Promises methods, Steve Griffith, Jul 27, 2017](https://www.youtube.com/watch?v=nB-aLKE76pY)
* [Workshop: Broken Promises, The Workshop Edition * Matteo Collina and James Snell, NearForm](https://youtu.be/yRyfr1Qcf34)
* [Broken Promises * James Snell, NearForm](https://youtu.be/XV-u_Ow47s0)
