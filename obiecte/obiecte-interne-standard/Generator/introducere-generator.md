# Generator

Este un obiect intern pe care o funcție generator îl generează la momentul execuției. Obiectul implementează protocoalele `iterable` și `iterator`.

```javascript
function* gen () {
  yield 'ceva';
  yield 'altceva';
};
var obiectG = gen();
// un obiect tip Iterator
```
