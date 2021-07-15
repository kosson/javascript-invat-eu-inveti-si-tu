# Callback-uri și asicronicitate

Foarte multe dintre metodele pe care obiectele interne le oferă pentru a lucra cu datele, implică folosirea funcțiilor care vor juca un rol special. Pasarea ca ultim argument a unei alte funcții numită *callback*, va permite apelarea **ulterioră** a acesteia după ce codul funcției și-a încheiat propria evaluare. În exemplul de mai jos, am desemnat prima funcție să fie o valoare, care va fi pasată celei de-a doua pentru a modifica niște date.

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

De cele mai multe ori, funcția care primește drept ultim argument o altă funcție, joacă la rândul ei rolul de metodă a unui obiect. În momentul în care codul funcției cu rol de metodă și-a încheiat execuția, va fi lansată în execuție și cea care a fost rezervată execuției *ulterioare*. Acest comportament este exprimat de termenul în engleză *callback*, care ar putea fi tradus în contextul de care vorbim ca *apelează-mă ulterior*. Acest *ulterior* este *de îndată* ce s-a încheiat execuția funcția care a *programat* o execuție ulterioară a callback-ului.

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
      callback(null, valoare_declanșator);
    } else {
      let error = new Error(`Ceva nu a funcționat`);
      callback(error, '');
    }
  }, 3000);
};

SimulatorAPI(1, (error, valoare) => {
  if (error) {
    throw error;
  }
  console.log('La final apar și eu', valoare);
});
```

În exemplul dat, am folosit API-ul `setTimeout`, care introduce în așteptare o funcție. După ce trec cel puțin trei secunde, event looop-ul se uită la callstack pentru a vedea dacă este gol. Dacă este gol, funcția pasată lui `setTimeout` va fi introdusă în callstack pentru a fi executată. Aceasta își începe execuția și apoi dă peste apelul către funcția cu rol de callback, pe care o va introduce în callstack peste cea *gazdă* și o va executa. Aceasta va returna rezultatul și pentru că gazda nu mai are nimic de executat și aceasta își va încheia propria execuție.

Acest model este util pentru a returna codului care apelează un API valoarea după ce și-a încheiat treaba. Acest model este folosit pe scară largă, dar este ușor de văzut faptul că tendințele favorizează utilizarea promisiunilor și a funcțiilor `async`.

## Callback hell - iadul apelurilor

Folosirea callback-urilor poate să se soldeze cu o serie de imbricări ale apelurilor ceea ce seamănă vizual cu o piramidă datorită indentării codului. În exemplul cu titlu ilustrativ, se observă indentarea în adâncime, care formează un adevărat șablon pe care în veți întâlni în practică sub denumirea de *piramida pierzaniei* - *pyramid of doom* sau *iadul callback-urilor* - *callback hell*.

```javascript
funcAsyncUnu (err => {
  funcAsyncDoi (err => {
    funcAsyncTrei (err => {
      //...
    });
  });
});
```

Una din problemele acestui șablon este aceea a stabilirii unor closure-uri pe identificatori care au potențialul să se confunde pentru că au același indentificator, de exemplu. Vezi identificatorul `err` din exemplu. O altă problemă este chiar declararea funcțiilor cu rol de callback în așa-zisa logică a fragmentului de cod (*in-place function definitions*). Acest lucru conduce la confuzie pentru că în funcție numărul evaluărior din corpurile funcțiilor declarate, la un moment dat nu mai știi unde începe una și unde se încheie alta. Pe de altă parte se creează clojure-uri pe toată adâncimea, fapt care taxează resursele de memorie și predispune codul la *scurgeri de memorie* - *memory leaks*.

### Bune practici pentru callback-uri

Atunci când declari funcția cu rol de callback, cel mai potrivit este să o faci în afara logicii care o va folosi. Asta însemnă să nu mai declari funcția în poziția rezervată callback-ului, ci mai bine să o declari în afară și să folosești identificatorul (numele funcției) în loc.

O altă bună practică spune să ieși din execuția funcției cât mai repede posibil (`return`, `continue`, `break`) testând anumite valori care indică o stare de eroare sau un rezultate neașteptat. Acesta este *early return principle* - *principiul returnării cât mai repede*.

```javascript
// mai simplu și eficient este
if (error) {
  return nume_callback(error);
  // în loc de
  nume_callback(...);
  return;
}
// opozabil șablonului
if (error) {
  nume_callback(error);
} else {
  // evaluare cod când nu ai erori
}
```

Reține faptul că după invocarea funcției cu rol de callback, execuția funcției din care s-a făcut invocarea acesteia va continua. Din acest motiv este necesar să folosești `return` pentru a încheia și execuția funcției apelante. Această returnare se poate face pentru că rezultatul dorit este produsul unei operațiuni asincrone, de fapt. Este irelevant ce returnează funcția apelantă pentru că rezultatul sau eroarea apar altundeva ca produs al unei operațiuni asincrone. Abia când acesta apare, este pasat funcției cu rol de callback.

Denumește funcțiile cu rol de callback pentru a face depanarea codului mai ușoară atunci când privești stiva apelurilor.

Pentru a lucra curat, nu imbrica funcțiile și folosește mecanismul de hoisting ca pe un avantaj. În plus, trebuie să gestionezi erorile care apar în fiecare callback.

```javascript
aducResursa('mar', function clbkPtrAducRes () {
  careApeleazaAltceva ('serviciulX', function clbkPtrApelCeva () {
    console.log('ceva');
  }){};
});
```

Totuși trebuie spus un lucru la care trebuie reflectat foarte adânc. Există momente când vei folosi biblioteci de cod externe, care vor prelua callback-ul pe care-l scrii, iar la final vor executa funcția scrisă de tine. Kyle Simpson pune câteva întrebări esențiale pentru verificarea și dobândirea siguranței în scenariul de lucru cu un callback:

-   Ești sigur pe aplicația externă căreia îi pasezi callback-ul?
-   Ești încredințat că va executa în parametrii doriți de tine codul din funcția pe care i-o pasezi drept callback?
-   Dacă nu ai scris tu întreaga aplicație care va folosi callback-ul, ai **încredere** să o folosești?

Acestea sunt întrebări foarte serioase, care setează cadrul mental pentru căutarea de noi soluții. Acestea nu au întârziat să apară, fiind propulsate de standard: promisiunile și funcțiile `async/await`. În acest moment, recomandarea este ca în momentul dobândirii abilităților de lucru cu **promisiunile** sau cu funcțiile **async/await**, să fie abandonată practica callback-urilor.

Un argument în plus pentru abandonarea treptată a practicii callback-urilor este aceea că urmărirea callback-urilor este o sarcină dificilă în sine.

## Tratarea erorilor în callback-uri

Să presupunem că în procesul de aducere a unei resurse de la distanță, ceva se petrece și apare o eroare. Cum gestionăm aceste erori pentru a le afla și pentru a reacționa în consecință. Dacă trecem în revistă exemplul funcției `SimulatorAPI` prezentat anterior, vom observa un principiu de tratare a erorilor, care sunt trimise funcției cu rol de callback pentru a fi tratate acolo.

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
