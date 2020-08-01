# Generator

Este un obiect intern pe care o funcție generator îl generează la momentul execuției. Obiectul implementează protocoalele `iterable` și `iterator`.
Acest obiect nu poate fi instanțiat direct.

```javascript
function* gen () {
  yield 'ceva';
  yield 'altceva';
};
var obiectG = gen();
// un obiect tip Iterator
obiect.next(); // {value: 'ceva', done: false}
```

## Metodele obiectului prototype

### Generator.prototype.next()

Această metodă va returna o valoare *produsă* prin utilizarea expresiei `yield [expresie]`.

### Generator.prototype.return()

Returnează valoarea respectivului `yield` și apoi încheie generatorul.

### Generator.prototype.throw()

Această metodă produce o eroare și apoi încheie generatorul.

## Resurse

- [Generator | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
