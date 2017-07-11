# Metoda `Console.table()`

Această metodă primește ca argumente date ce ar putea fi afișate într-o structură tabelară.

```javascript
let colectie = ['a','b', true];
console.table(colectie);
```

Poate primi și un obiect. Nu este limită doar la array-uri.
Va fi generat un tabel chiar în consolă care va avea două coloane. Prima intitulată `index` urmată de o a doua numită `Values`.

```javascript
let colectie2 = {
  a: 'ceva',
  b: 'altceva'
};
console.table(colectie2);
```

Dacă valorile sunt obiecte la rândul lor, atunci vor fi afișate cheile lor în coloane suplimentare iar în coloana `Values` nu va sta nimic.

```javascript
let colectie3 = {
  a: 'ceva',
  b: 'altceva',
  c: {x: 10, y: true, z: (a) => a, w: {a: 1}}
};
console.table(colectie3);
```
