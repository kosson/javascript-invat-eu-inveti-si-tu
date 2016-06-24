# Compoziție și decompoziție

Atunci când te gândești la composition, adică la punerea cap la cap a diverselor fragmente funcționale, de fapt, te gândești la relațiile pe care le stabilesc entitățile.
Atunci când te gândești la decomposition, adică la desfacerea în elementele componente, poate pentru o nouă recompunere, te gândești la entitățile din care este compus software-ul.

Descompunerea funcțiilor este folosită ca procedeu pentru a extrage părțile unei funcții pe care am dori să le folosim în mod repetat sau în condiții speciale și mai ales pentru a numi relațiile care se stabilesc între aceste părți.

Un exemplu de descompunere (decomposition):

```js
var colectie = [
  {ceva: 'Jenifer', size: 'M'},
  {ceva: 'Dana', size: 'S'},
  {ceva: 'Matei', size: 'XL'}
];

var pluck = (colectie, proprietate) => colectie.map( (obiect) => obiect[proprietate] );
console.log(pluck); // function pluck()

pluck(colectie, 'size'); // Array [ "M", "S", "XL" ]

// se descompune în

var pluckFrom = (colectie) => (proprietate) => pluck(colectie, proprietate);

var plucking = pluckFrom(colectie);

plucking('size'); // Array [ "M", "S", "XL" ]
```

Un exemplu de compunere

```js
var compunere = (a, b) => (c) => a(b(c));
```

Entitățile sunt compuse pentru a face relațiile dintre ele mult mai explicite.
