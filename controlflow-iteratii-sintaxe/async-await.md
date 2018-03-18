# Async / await

Acest enunț a fost introdus în EcmaScript 2017 și face ca o funcție să returneze o promisiune (`Promise`).

Operatorul `await` poate fi folosit în interiorul unei expresii de funcție async și numai în interiorul unei astfel de funcții. Acest operator returnează valoarea rezolvată a unei promisiuni. În același timp, operatorul oprește execuția funcției async până când promisiunea este rezolvată. Abia după rezolvarea promisiunii, va fi reluată execuția funcției. Dacă valoarea nu este o promisiune, este convertită la o promisiune rezolvată. În cazul în care promisiunea este respinsă, este returnată valoarea rezultată ca respingere.

În mod tradițional, returnarea unei funcții se face instanțiindu-se cu `new` un obiect `Promise`.

```javascript
function simulare() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Salutare"), 2000);
  });
};
let x = simulare(); // Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
// după 2 secunde
// [[PromiseValue]]: "Salutare"
```

Folosirea lui `await`.

```javascript
async function sarcina() {
  let salut = await simulare();
  return `${salut}`;
};
sarcina().then(mesaj => console.log(mesaj));
```

Să lucrăm cu un caz ceva mai util. Atunci când am discutat despre cum este executat codul JavaScript, am folosit un exemplu

```javascript
TODO: Nu uita să ștergi cheia mea din stringul de acces la API-ul Europeana
// înlocuiește cheia API din link numită wskey, cu una personală obținută
// de la https://pro.europeana.eu/get-api
// Secvența unde vei pune cheia ta este wskey=XXXXXXXXX
// înlocuiește XXXXXXXXX cu propria cheie
// dacă nu introduci cheia personală vei avea o eroare
// Cross-Origin Request Blocked
let adresa = "https://www.europeana.eu/api/v2/search.json?wskey=MH8g7b6hz&query=The%20Fraternity%20between%20Romanian%20and%20French%20Army";
function aduMi () {
  fetch(adresa)
    .then((resursa) => resursa.json())
    .then((înregistrarea) => console.log(înregistrarea))
    .catch(() => console.log('A apărut o eroare'));
};
aduMi();
```

Pentru a simplifica putem transforma funcția noastă într-una `async`.

```javascript
let adresa = "https://www.europeana.eu/api/v2/search.json?wskey=MH8g7b6hz&query=The%20Fraternity%20between%20Romanian%20and%20French%20Army";
async function aduMi () {
  const resursa = await fetch(adresa);
  const rezultat = await resursa.json();
  return rezultat;
};
aduMi().then((înregistrarea) => console.log(înregistrarea)).catch(() => console.log('A apărut o eroare'));
```

## Referințe

-   [Asynchronous Adventures in JavaScript: Async/Await](https://medium.com/dailyjs/asynchronous-adventures-in-javascript-async-await-bd2e62f37ffd)
-   [await. MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
