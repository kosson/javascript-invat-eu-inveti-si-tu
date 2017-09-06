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

## Referințe

https://medium.com/dailyjs/asynchronous-adventures-in-javascript-async-await-bd2e62f37ffd
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
