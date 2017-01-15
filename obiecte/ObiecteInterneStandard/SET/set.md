# Set

Este ceea ce spune numele său: un set de valori.

Permite stocarea de elemente unice. Null este tratat ca undefined.
Dacă este pasat un obiect iterabil, toate elementele vor fi adăugat la noul `Set`.

```js
const colectie = new Set([0, 1, 2, 3]);
```

## Generarea unui Array cu totul unic

```js
const ArrayUnic = [...new Set(unArray)];
```
