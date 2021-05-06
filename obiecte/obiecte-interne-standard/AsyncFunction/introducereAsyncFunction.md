# AsyncFunction

`AsyncFunction` nu este un obiect global.

Constructorul creează un obiect funcție *async*. Toate funcțiile asincrone în JavaScript sunt obiecte `AsyncFunction`.
Acestea folosesc constructorul `AsyncFunction` pentru a genera obiecte-funcții, care au toate mijloacele să controleze un flux asincron de prelucrare a datelor.

O declarație `async function nume (){}` va genera un obiect `AsyncFunction`. Invocarea unei funcții `async` se va solda cu returnarea unui `Promise`.

```javascript
const unAsincron = async () => {
  return "o valoare";
};
console.log(unAsincron()); // Promise {<fulfilled>: "o valoare"}
```

Atunci când funcția `async` va returna, de fapt, va returna o valoare, care este promisiunea. Aceasta va fi rezolvată și valoarea rezolvării promisiunii va fi cea care va fi returnată.

Pentru exemplificare vom crea o funcție care va returna o promisiune (obiectul).

```javascript
function intarzieRaspuns (valoare) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(valoare);
    }, 3000);
  });
};

async function test(val) {
  var a = intarzieRaspuns(10);
  return val * await a;
};

test(3).then(x => {
  console.log(x);
});
// afișează 30 după 3 secunde
```
