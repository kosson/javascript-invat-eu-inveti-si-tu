# Promise

Uneori este dificil să anticipăm rezultatele unei operațiuni. Această operațiune de anticipare a unor rezultate în anumite cazuri este în strânsă legătură cu momentul în care ce execută o anumită operațiune. Uneori, când poate că soliciți niște date dintr-o sursă locală sau la distanță, serviciul responsabil cu servirea acelor date poate să nu funcționeze sau într-un anumit moment al aplicației, să nu se fi generat datele necesare dintr-o altă operațiune de prelucrare. În acest caz, vorbim de aspectele asincrone ale rulării codului. Toate aceste necunoscute, mici sincope, lucruri care nu pot fi stăpânite printr-o gândire pur algoritmică au nevoie să fie gestionate cumva. Pot fi asemuite precum vremea, pe care serviciul meteorologic încearcă prin datele primite să o anticipeze. Cum în cazul programării este nevoie de un rezultat concret, aceste aprecieri ale posibilității obținerii sau nu a unui rezultat, poartă numele de **promisiuni**. O promisiune este o valoare care poate fi disponibilă acum, în viitor sau niciodată.

Promisiunile nu sunt un concept nou în programare. Trevor Burnham menționează în lucrarea sa faptul că la începuturile ideilor de organizare a resurselor în rețea, ceea ce numim acum Internet, exista un proiect care s-a numit Xanadu programat în C++. Acest proiect continuă și în zilele noastre, dar ceea ce este cu adevărat important este faptul că atunci apare ideea de promisiuni. Mai apoi sub denumirea de  **deferred** își face apariția și în alte limbaje de programare. Wikipedia aduce o definiție și prin aceasta, în prim plan câțiva termeni dintre care am lămurit unii, dar alții sunt relevanți pentru înțelegerea promisiunilor: *În domeniul informaticii, viitor («future»), promisiune («promise»), delay («întârziere») și deferred «amânare» se referă la constructuri folosite pentru a sincroniza execuția programului în unele limbaje de programare care permit execuția concurențială. Aceștia descriu un obiect care se comportă ca un proxy «mecanism de delegare» pentru un rezultat care, inițial este necunoscut pentru că, în mod curent computarea valorii sale nu este încă încheiată*. Conform autorilor Wikipediei și lui Trevor Burnham, termenii de **promisiune**, **deferred** și **future** sunt folosiți interșanjabil.

Termenul de **promise** (promisiune) a fost propus în anul 1976, dar după adoptarea în Python, un pas a mai lipsit pentru a fi preluat ca practică și în JavaScript, dar ca „deferred” mai întâi, în 2007, prin biblioteca de cod **Dojo** (`dojo.Deferred`). Doi ani mai târziu apare specificația Promises/A în biblioteca de cod CommonJS. În același an apare și NodeJS. Merită menționat faptul că biblioteca de cod JQuerry, care motorizează foarte multe pagini web în acest moment, a introdus conceptul de promisiuni, dar cu nuanța **deferrend** asta însemnând că poți declanșa o promisiune în mod direct fără a mai apela un callback.

Să nu uităm nici o clipă faptul că JavaScript rulează într-un singur fir de execuție, se bazează pe evenimente cu mențiunea că respectă un model ce nu blochează inputurile și outputurile. Mențiunea este că fiecare browser va rula API-urile în propriile fire.

Promise este un constructor folosit pentru realizarea unor obiecte promisiuni folosite în operațiuni asincrone. Asta înseamnă că vei obține un obiect promisiune de fiecare dată când invoci cu operatorul `new`.

```javascript
var executaLaRezolvare = function(){return 'execut la rezolvare'};
var promisune = new Promise(executaLaRezolvare);
```

## Prelucrarea datelor - foaie de parcurs

Pentru că odată cu promisiunile, ne apropiem de stadii avansate ale înțelegerii acestui limbaj de programare ca și instrument de prelucrare al datelor, vom parcurge un scenariu simplu de prelucrare pentru a ajunge în final să vedem care ar fi ajutorul pe care ni-l oferă lucrul cu promisiuni.

### Soluțiile sincrone

Din gama soluțiilor sincrone fac parte prelucrările de date cu enunțul `for` sau cu utilitarul `forEach`.

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

## Resurse

[Trevor Burnham. Async JavaScript](A Very Brief History of Promises)
[Wikipedia. Futures and promises](https://en.wikipedia.org/wiki/Futures_and_promises)
[Eric Elliot. Master the JavaScript Interview: What is a Promise?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
[Jecelyn Yeen. JavaScript Promises for Dummies](https://scotch.io/tutorials/javascript-promises-for-dummies)
[Benjamin Diuguid. Asynchronous Adventures in JavaScript: Callbacks](https://medium.com/dailyjs/asynchronous-adventures-in-javascript-callbacks-39880f1b470e)
