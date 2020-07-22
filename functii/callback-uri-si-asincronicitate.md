# Callback-uri și asicronicitate

Foarte multe dintre metodele pe care obiectele interne le oferă pentru a lucra cu datele, implică folosirea funcțiilor care vor juca un rol special, însemnând pasarea ca ultim argument a unei alte funcții care va fi apelată **ulterior**, după ce codul funcției și-a încheiat propria evaluare.În exemplul de mai jos, am realizat desemnat prima funcție să fie o valoare, care va fi pasată celei de-a doua pentru a modifica niște date.

```javascript
function fnCuRolDeCallback (ceva) {
  return ceva + 10;
};

function oFunctie (oValoare, fnCuRolDeCallback) {
  console.log(oValoare);
  return fnCuRolDeCallback(oValoare);
};

console.log(oFunctie(20, fnCuRolDeCallback)); // apare primul
// 20 30

console.log('La final?'); // apare după rezultatul execuției funcției.
```

Exemplul dat este unul care se execută **sincron**, fiecare operațiune urmând anterioarei ș.a.m.d. Rezultatele apar predictibil în ordinea evaluărilor din funcția `cuRolDeMetoda`.

De cele mai multe ori, funcția care primește drept ultim argument o altă funcție, joacă la rândul ei rolul de metodă a unui obiect. În momentul în care codul funcției cu rol de metodă și-a încheiat execuția, va fi lansată în execuție și cea care a fost rezervată execuției *ulterioare*. Acest comportament este exprimat de cuvântul dîn limba engleză *callback*, care ar putea fi tradus în contextul de care vorbim ca *apelează-mă ulterior*. Acest *ulterior* este *de îndată* ce s-a încheiat execuția funcția care a *programat* o execuție ulterioară a callback-ului.

Ceea ce se realizează prin folosirea de callback-uri este o adevărată *programare* pentru o execuție ulterioară a unei funcții. Utilitatea callback-urilor este dovedită în cazurile în care sunt necesare a fi realizate operațiuni care cer timp. Acest timp necesar aducerii unei resurse de la un server, de exemplu, ar bloca firul de execuție în modelul sincron de rulare a codului, ceea ce ar fi un dezastru din punct de vedere al performanțelor. Astfel, este nevoie de un mecanism care să scoată operațiunile cu amprentă mare în timp în afara liniei temporale de execuție sincronă. Rezolvarea vine tocmai din posibilitatea de a *programa* execuția unor funcții ceva mai târziu, după ce o operațiune dificilă s-a încheiat și avem rezultatul acesteiea.

Asincronicitatea este caracteristica sau mai bine spus **marca** funcțiilor callback. Putem modifica exemplul dat pentru a transforma modul de execuție al unei funcții din sincron în asincron, dacă ne folosim de alte funcții care fac parte din instrumentarul browserului (API-uri) sau ale lui Node.js. Aceste API-uri sunt de fapt software specializat în interiorul browserului, care expun mediului de execuție JavaScript metode cărora le pasăm sarcini specializate. Metode precum `setTimeout` sau `setImmediate` fac parte din API-urile browserului, nu din JavaScript și din acest motiv, execuția codului pe care-l primesc, se va face într-un fir separat de cel al programului. Avantajul este evident: nu blocăm firul de execuție al programului nostru și facem o delegare a rezolvării **sarcinii** unor instrumente care beneficiază de propriile fire de execuție.

Să analizăm exemplul din perspectiva delegării execuției funcției `fnCuRolDeCallback` unui instrument al browserului: `setImmediate`.

```javascript
function fnCuRolDeCallback () {
  console.log(10 + 2);
};

function oFunctie (oValoare, fn) {
  setImmediate(fn);
};

console.log('Apar primul'); // apare primul
oFunctie(20, fnCuRolDeCallback);
console.log('La final?'); // apare al doilea
// 12 => apare al treilea
```

Când funcția `oFunctie` va fi rulată, atunci când întâlnește apelul către API-ul `setImmediate`, va *programa* execuția lui `fn` în funcție de ce face API-ul. De îndată ce API-ul și-a terminat treaba, iar stiva apelurilor funcțiilor este goală, se va introduce în stivă funcția pentru a fi executată. Acesta este motivul pentru care rezultatul apelului la `oFunctie` apare ultimul. Callback-urile sunt executate cu ajutorul event loop-ului și a listelor de așteptare în care sunt introduse acestea câtă vreme API-ul rulează.

Reține faptul că la rularea funcției, se face apelul către API, iar funcția `oFunctie` își va încheia propria execuție chiar dacă are ceva *programat* într-un `setImmediate`. Atenție, dacă ar mai fi fost cod în `oFunctie` după apelul API-ului, acel cod s-ar fi executat sincron așa cum am fi așteptat în mod firesc.

Nu vom remarca o modificare a comportamentului, dar în acest moment, funcția `fn` chiar utilizează un fir de execuție separat; cel al metodei `setImmediate`, care face parte din API-urile browserului. Legătura `this` se va face la mediul lexical al API-ului.

Pentru a face evident acest lucru, haideți să modificăm exemplul dat și în loc de a folosi `setImmediate` să folosim `setTimeout`, care permite introducerea unei **amânări** a execuției callback-ului.

```javascript
function fnCuRolDeCallback () {
  console.log('Ceva din callback');
};

setTimeout(fnCuRolDeCallback, 5000);
```

Ceea ce se observă din exemplu este că în loc să definim o funcție și să executăm un callback în interior, ne vom folosi direct de o metodă a unui alt API uzual: `setTimeout`. În acest caz, vom *amâna* executarea funcției `fnCuRolDeCallback` cu cel puțin cinci secunde.

Acum că am înțeles cum *programăm* execuția unui fragment de cod folosind un callback, hai să inspectăm un exemplu care este ușor de parcurs.

```javascript
function SimulatorAPI (valoare_declanșator, callback) {
  setTimeout(() => {
    console.log('Primul apar eu!');
    if (valoare_declanșator == 1) {
      valoare_declanșator++;
      callback(valoare_declanșator);
    }
  }, 3000);
};

SimulatorAPI(1, (valoare) => {
  console.log('La final apar și eu', valoare);
});
```

În exemplul dat, am folosit API-ul `setTimeout`, care introduce în așteptare o funcție. După ce trec cel puțin trei secunde, event looop-ul se uită la callstack pentru a vedea dacă este gol. Dacă este gol, funcția pasată lui `setTimeout` va fi introdusă în callstack pentru a fi executată. Aceasta își începe execuția și apoi dă peste apelul către funcția cu rol de callback, pe care o va introduce în callstack peste cea *gazdă* și o va executa. Aceasta va returna rezultatul și pentru că gazda nu mai are nimic de executat și aceasta își va încheia propria execuție.

Acest model este util pentru a returna codului care apelează un API valoarea după ce și-a încheiat treaba. Acest model este folosit pe scară largă, dar este ușor de văzut faptul că tendințele favorizează utilizarea promisiunilor și a funcțiilor `async`.

## Tratarea erorilor în callback-uri

Să presupunem că în procesul de aducere a unei resurse de la distanță, ceva se petrece și apare o eroare. Cum gestionăm aceste erori pentru a le afla și pentru a reacționa în consecință. Există trei modalități de tratare a erorilor:

- afișarea erorii folosind un `console.log(eroare)` sau un `console.error(eroare)`,
- poți face un `throw eroare` ceea ce va conduce la încheierea execuției codului și afișarea erorii sau
- în cazul rulării codului JavaScript în Node.js, poți pasa eroarea mai departe pe lanțul de execuție folosind `next(eroare)`.

Node.js chiar ne-a obișnuit cu marca proprie de tratare a erorilor primul parametru al unui callback fiind chiar o referință către un obiect de eroare. Dacă apare o eroare, se constituie acel obiect și poate fi prelucrată.

```javascript
fs.readFile('./numeFisier.txt', function (error, rezultat) {
  if (error) {
    console.error(error);
  }
  // fă ceva cu rezultatul
});
```

Construcțiile `try...catch` nu capturează erorile care apar în callback-uri asincrone. Acest lucru se petrece petru că execuția corpului callback-ului este deferită unei posibile metode asincrone, care nu returnează starea de eroare callback-ului, dacă nu este folosit cod special pentru a face acest lucru. Reține faptul că `try...catch` funcționează numai petru cod sincron și pentru construcții asincrone `async/await`.
