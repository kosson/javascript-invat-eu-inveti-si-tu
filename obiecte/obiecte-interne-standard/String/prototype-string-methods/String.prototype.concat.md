# String.prototype.concat()

Combină textul din două sau mai multe stringuri și returnează un string nou.

```javascript
var nucleu = "Salutare, ";
console.log(nucleu.concat('prietene,', ' ce mai faci?')); // Salutare, prietene, ce mai faci?
```

Același efect poate fi obținut cu următoarea secvență de cod, care de această dată construiește o funcție `concat` ce operează asupra array-like-ului `arguments`:

```javascript
function concat () {
  return Array.prototype.slice.call(arguments).join(' ');
}
var sirNou = concat('ceva', 'text', 'pentru', 'a', 'fi', 'unit')
console.log(sirNou); // ceva text pentru a fi unit
```

Folosirea `rest parameters` generează un array adevărat, nu un array-like așa cum este `arguments`.

```javascript
function concat (...argumentePasate){
  return argumentePasate.join(' ');
};
var reunite = concat("Aceste", "cuvinte", "vor", "fi", "un", "șir!");
console.log(reunite); // Aceste cuvinte vor fi un șir!
```

Ce se întâmplă:

-   parametrul rest obține `arguments`, care este pasat la apelarea funcției
-   de fiecare dată când un parametru este adăugat la stânga, este ca și cum s-ar face `argumentePasate.shift()`
