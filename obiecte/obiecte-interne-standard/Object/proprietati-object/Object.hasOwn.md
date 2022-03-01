# Object.hasOwn

Metoda verifică dacă o proprietate a unui obiect este o proprietate *directă* a respectivului obiect, caz în care returnează valoarea `true`, precum și cazul dacă a fost moștenită pe lanțul prototipal, caz în care returnează `false`. Această metodă a fost introdusă odată cu ES2022.

Metoda funcționează și în cazul în care obiectul are moștenirea tăiată precum în cazul creării de obiecte folosind `Object.create(null)`. Acest lucru rezolvă problema lipsei metodei `hasOwnProperty`, care este moștenită din obiectul prototipal al lui `Object`.

```javascript
let obi = {
  acum: 10,
  undeva: 'Acolo',
  test: null
};

console.log(Object.hasOwn(obi, 'test')); // true
```

După cum se observă din exemplu, metoda are doi parametri, primul fiind instanța obiectului pe care se va face testul, iar a doua fiind numele proprietății.

## Resurse

- [Object.hasOwn | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)
