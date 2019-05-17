# AsyncFunction

`AsyncFunction` nu este un obiect global.

Constructorul creează un obiect funcție async. Toate funcțiile asincrone în JavaScript este de fapt un obiect `AsyncFunction`.
Este un obiect care folosește constructorul `AsyncFunction` pentru a genera obiecte-funcții care au toate mijloacele să controleze un flux de prelucrare a datelor care este asincron.

O declarație `async function nume (){}` va genera un obiect `AsyncFunction`. Invocarea unei funcții `async` se va solda cu returnarea unui `Promise`. Atunci când funcția `async` va returna, de fapt, va returna o valoare. În acel moment, promisiunea va fi rezolvată și valoarea rezolvării promisiunii va fi cea care va fi returnată.

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
