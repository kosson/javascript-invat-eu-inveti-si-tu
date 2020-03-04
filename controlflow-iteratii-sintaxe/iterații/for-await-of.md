# for await...of

Enunțul oferă posibilitatea de a itera obiecte iterabile `async` dar și obiecte iterabile sincrone.
Obiectele iterabile async implementează **async iterable protocol** ceea ce înseamnă existența unui simbol `[Symbol.asyncIterator](){}`.

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

## Referințe

- [for await...of | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)
