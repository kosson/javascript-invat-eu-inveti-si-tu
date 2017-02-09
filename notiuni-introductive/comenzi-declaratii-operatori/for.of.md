# for... of

Este un operator folosit pentru cicla array-uri, dar cel mai bine se aplică pe obiecte „iterable” precum `Array`, `Map`, `Set`.

```javascript
for (var x of arr){
  // x va primi o valoarea fiecărui element parcurs
};
```

Începând cu ES6, se pot itera și fragmente constituite din `code-point`-uri UTF:

```javascript
for (let x of '\u{13165}\u{13189}\u{13197}'){
  console.log(x); // 𓅥 𓆉 𓆗
};
```
