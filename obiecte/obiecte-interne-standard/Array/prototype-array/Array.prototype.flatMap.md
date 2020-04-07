# Array.prototype.flatMap()

Această metodă folosește o funcție care se aplică fiecărui element din array (*mapping*) și apoi **aplatizează** rezultatul într-un nou array. Este o îmbinare de `map` cu `flat` la o adâncime de 1.

```javascript
let arr_nou = arr.flatMap(function (valoarea_curentă, idx_opt, arr_orig) {
  // returnează element pentru noul array care se constituie
}, obi_this_opt);
```

Primul parametru al metodei este o funcție cu rol de callback. Opțional, pe lângă elementul curent, i se pot pasa indexul elementului pentru care se face prelucrarea, o referință către array-ul original.
Al doilea parametru poate fi opțional un obiect în contextul (*this*) căruia să ruleze callback-ul.

Reține faptul că un singur nivel este aplatizat.

## Resurse

- [22.1.3.11 Array.prototype.flatMap | ECMAScript® 2021 Language Specification](https://tc39.es/ecma262/#sec-array.prototype.flatmap)
