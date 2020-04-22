# Callback-uri și asicronicitate

Foarte multe dintre metodele pe care obiectele interne le oferă pentru a lucra cu datele, implică folosirea funcțiilor care vor juca un rol special.

Acest rol implică pasarea ca ultim argument a unei alte funcții care va fi apelată **ulterior**.

De cele mai multe ori, funcția care primește drept ultim argument o altă funcție, joacă la rândul ei rolul de metodă a unui obiect.

În momentul în care tot codul funcției cu rol de metodă și-a încheiat execuția, va fi lansată în execuție și cea care a fost rezervată execuției *ulterioare*. Acest comportament este exprimat de cuvântul dîn limba engleză *callback*, care ar putea fi tradus în contextul de care vorbim ca *apelează-mă ulterior*. Acest *ulterior* este *de îndată* ce s-a încheiat execuția corpului metodei.

În exemplul de mai jos, am realizat desemnat prima funcție să fie o valoare, care va fi pasată celei de-a doua pentru a modifica niște date.

```javascript
function fnCuRolDeCallback (ceva) {
  return ceva + 10;
}

function cuRolDeMetoda (oValoare, fnCuRolDeCallback) {
  console.log(oValoare);
  fnCuRolDeCallback(oValoare);
}

cuRolDeMetoda(20, fnCuRolDeCallback); // apare primul

console.log('La final?'); // apare după rezultatul execuției funcției.
```

Totuși, ceea ce trebuie menționat este faptul că exemplul dat este unul care se execută **sincron**, fiecare operațiune urmând anterioarei ș.a.m.d. Asincronicitatea este caracteristica sau mai bine spus **marca** funcțiilor callback. Putem modifica exemplul dat pentru a transforma modul de execuție al unei funcții din sincron în asincron, dacă ne folosim de alte funcții care fac parte din instrumentarul browserului sau ale lui NodeJS. În acest context, să ne aducem aminte de faptul că un program JavaScript are un singur fir de execuție. Dar metode precum `setTimeout` sau `setImmediate` fac parte din instrumentarul browserului și din acest motiv, execuția codului pe care-l primesc, se va face într-un fir separat de cel al programului. Avantajul este evident: nu blocăm firul de execuție al programului nostru și facem o delegare a rezolvării **sarcinii** unor instrumente care beneficiază de propriile fire de execuție.

Pentru a clarifica și mai mult relația dintre executarea sarcinilor și callback-uri, trebuie să facem un exercițiu de imaginație și să ne gândim că pentru programul nostru sunt utile date de la distanță de undeva de pe Internet sau poate că avem nevoie de date care sunt pe hard disk. Pentru a accesa și aduce în mediul de execuție al programului nostru aceste date, este nevoie de timp. Acest timp, dacă este unul îndelungat, într-un mod de execuție sincron al programului, ar bloca unicul fir de execuție. Din acest motiv programele JavaScript folosesc callback-uri.

Să analizăm exemplul din perspectiva delegării execuției funcției `fnCuRolDeCallback` unui instrument al browserului: `setImmediate`.

```javascript
function fnCuRolDeCallback () {
  return this.oValoare + 10;
}

function cuRolDeMetoda (oValoare, fnCuRolDeCallback) {
  console.log(oValoare);
  // setImmediate(fnCuRolDeCallback);
  process.nextTick(fnCuRolDeCallback);
}

cuRolDeMetoda(20, fnCuRolDeCallback); // apare primul

console.log('La final?'); // apare după rezultatul execuției funcției.
```

La momentul în care executăm exemplul amendat, nu vom remarca o modificare a comportamentului. Dar în acest moment, funcția `fnCuRolDeCallback` chiar utilizează un fir de execuție separat; cel al metodei `setImmediate`, care face parte din API-urile browserului.

Pentru a face evident acest lucru, haideți să modificăm exemplul dat și în loc de a folosi `setImmediate` să folosim `setTimeout`, care permite introducerea unei amânări a execuției callback-ului.

```javascript
function fnCuRolDeCallback () {
  console.log('Ceva din callback');
}

setTimeout(fnCuRolDeCallback, 5000);
```

Ceea ce se observă din exemplu este că în loc să definim o funcție și să executăm un callback în interior, ne vom folosi direct de o metodă a unui API. În acest caz, vom *amâna* executarea funcției `fnCuRolDeCallback` cu cinci secunde.

## Delegarea responsabilității

Callback-urile sunt executate cu ajutorul event loop-ului.

## Tratarea erorilor în callback-uri

Să presupunem că în procesul de aducere a unei resurse de la distanță, ceva se petrece și apare o eroare. Cum gestionăm aceste erori pentru a le afla și pentru a reacționa în consecință. Există trei modalități de tratare a erorilor:

- afișarea erorii folosind un `console.log(eroare)` sau un `console.error(eroare)`,
- poți face un `throw eroare` ceea ce va conduce la încheierea execuției codului și afișarea erorii sau
- în cazul rulăriicodului JavaScript în NodeJS, poți pasa eroarea mai departe pe lanțul de execuție folosind `next(eroare)`.


NodeJS chiar ne-a obișnuit cu marca proprie de tratare a erorilor primul parametru al unui callback fiind chiar o referință către un obiect de eroare. Dacă apare o eroare, se constituie acel obiect și poate fi prelucrată.

```javascript
fs.readFile('./numeFisier.txt', function (error, rezultat) {
  if (error) {
    console.error(error);
  }
  // fă ceva cu rezultatul
});
```

Construcțiile `try...catch` nu capturează erorile care apar în callback-uri asincrone. Acest lucru se petrece petru că execuția corpului callback-ului este deferită unei posibile metode asincrone, care nu returnează starea de eroare callback-ului, dacă nu este folosit cod special pentru a face acest lucru. Reține faptul că `try...catch` funcționează numai petru cod sincron și pentru construcții asincrone `async/await`.
