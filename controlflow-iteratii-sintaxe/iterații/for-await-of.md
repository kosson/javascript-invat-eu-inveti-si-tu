# Enunțul for await...of

Când ai de-a face cu obiecte iterabile care sunt colecții de date, mecanismul cel mai la îndemână este aplicarea lui `for...of` pentru a-l parcurge în vederea prelucrării datelor. În cazul în care colecția agregă datele în mod dinamic/asincron, ai nevoie de un mecanism pentru a-l parcurge care să onoreze acest comportament.

Enunțul oferă posibilitatea de a itera obiecte iterabile `async` dar și obiecte iterabile sincrone.

```javascript
async function parcurgUnArraySimplu () {
  let element;
  for await (element of [1,2,3]){
    console.log(element);
  }
};
parcurgUnArraySimplu(); // 1 2 3
```

Obiectele iterabile `async` implementează **async iterable protocol**, ceea ce indică existența unui simbol `[Symbol.asyncIterator](){}` în obiectul iterabil care va fi parcurs. Să luăm un exemplu simplu al unui array de promisiuni care poate fi iterat.

```javascript
async function parcurgUnArrDePromises () {
  let arrSincronDePromisiuni = [
    Promise.resolve('ceva'),
    Promise.resolve('altceva')
  ];
  let element;
  for await(element of arrSincronDePromisiuni){
    console.log(element);
  }
};
parcurgUnArrDePromises();
```

Pot fi iterate obiecte de tip `Array`, `String`, dar și obiecte array-like așa cum sunt `arguments` sau `NodeList`. Mai pot fi iterate obiecte de tip `TypedArray`, `Map` și `Set`.

```javascript
const resurse = ['https://swapi.co/api/people/1', 'https://swapi.co/api/people/2'];
async function aduResursele () {
  const arrCuPromisiuni = resurse.map(url => fetch(url));
  // pentru a face looping pe un array de promisiuni vom folosi `for await`
  for await (let cerere of arrCuPromisiuni) {
    const date = await cerere.json();
    console.log(date);
  }
};
aduResursele();
```

Enunțul a fost introdus în ES2018.

În cazul în care bucla semnalează o excepție, precum în cazul funcțiilor async/await, și `for...await...of` va fi semnalată excepția. Folosind exemplul lui Alex Rauschmayer, vom genera un obiect iterabil, care la prima iterare, va semnala o excepție.

```javascript
function creeazăObiectIterabilAsync () {
  return {
    [Symbol.asyncIterator](){
      return this;
    },
    next () {
      return Promise.reject(new Error('Am simulat o eroare'));
    }
  }
};
(async function () {
  try {
    for await (const element of creeazăObiectIterabilAsync()) {
      console.log(element);
    }
  } catch (error) {
    console.error(error);
  };
})(); // [Error: Am simulat o eroare]
```

În cazul în care dorești să parcurgi obiecte iterabile sincrone care la epuizarea resurselor returnează `{value: 'ultima', done: true`, un `for...async...of` îl va transforma într-un *iterabil asincron* prin transformarea fiecărei iterații într-o promisiune, folosind `Promise.resolve`. Transformarea se petrece dacă nu cumva deja valoarea este o promisiune.

În cazul în care în obiectul sincron ar fi avut `{value: Promise.resolve('o valoare'), done: false}`, aceasta va fi transformată la iterarea asincronă în `Promise.resolve({value: 'o valoare', done: false})`. Înțelegând acest mecanism, putem spune că următoarele bucle sunt similare:

```javascript
for (let element of async Promise.all(obiectIterabilSincronDePromisiuniCaValori)) {};
for await(let element of obiectIterabilSincronDePromisiuniCaValori);
```

Prima opțiune este lentă pentru că va constitui array-ul promisiunilor după ce toate promisiunile din obiectul iterabil `obiectIterabilSincronDePromisiuniCaValori` vor fi fost `fullfiled`. În contrast, cea de-a doua soluție pornește procesarea imediat ce prima promisiune din obiectul iterabil are starea `fullfiled`.

## Prelucrarea stream-urilor în Node.js

Node.js Readable streams sunt obiecte iterabile începând cu versiunea 11.14, ceea ce înseamnă că pot fi consumate folosind `for await...of`.

```javascript
import { createReadStream } from 'fs'

const sourcePath = process.argv[2]
const sourceStream = createReadStream(sourcePath)

let bytes = 0

// ASYNC ITERATORS WITH ERROR HANDLING!
try {
  for await (const chunk of sourceStream) {
    bytes += chunk.length
  }
} catch (err) {
  console.error(err);
}

console.log(`${process.argv[2]}: ${bytes} bytes`)
```

## Dependințe cognitive

- funcții
- execuția asincronă a codului (event loop)
- Promisiuni
- funcții asincrone

## Resurse

- [14.7.5 The for-in, for-of, and for-await-of Statements | ECMAScript® 2022 Language Specification](https://tc39.es/ecma262/#sec-for-in-and-for-of-statements)
- [for await...of | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)
- [Exploring ES2018 and ES2019|Axel Rauschmayer](https://exploringjs.com/es2018-es2019/ch_asynchronous-iteration.html#for-await-of)
- [JavaScript async iterators | Luciano Mammino | Node.js design Patterns](https://www.nodejsdesignpatterns.com/blog/javascript-async-iterators/)
