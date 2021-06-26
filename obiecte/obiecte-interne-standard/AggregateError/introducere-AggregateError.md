# AggregateError

Obiectul `AggregateError` este reprezentarea unei erori care, de fapt, agregă mai multe erori apărute. Este obiectul pe care metoda `Promise.any()`, care va raporta erorile apărute.

## Crearea unui obiect `AggregateError`

```javascript
try {
  throw new AggregateError([
    new Error("A eșuat!"),
  ], 'Există cel puțin o eroare');
} catch (e) {
  console.log(e instanceof AggregateError); // true
  console.log(e.message);                   // "Există cel puțin o eroare"
  console.log(e.name);                      // "AggregateError"
  console.log(e.errors);                    // [ Error: "A eșuat!" ]
});
```

## Afișarea unui `AggregateError`

Documentația de la [Mozilla MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError), ne oferă următorul exemplu, care ne ajută să ne familiarizăm cu sintaxa.

```javascript
Promise.any([
  Promise.reject(new Error("A eșuat!")),
]).catch(e => {
  console.log(e instanceof AggregateError); // true
  console.log(e.message);                   // "All Promises rejected"
  console.log(e.name);                      // "AggregateError"
  console.log(e.errors);                    // [ Error: "A eșuat!" ]
});
```
