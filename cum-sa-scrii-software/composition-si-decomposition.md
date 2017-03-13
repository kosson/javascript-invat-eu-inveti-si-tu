# Compoziție și decompoziție

O practică de programare curentă este de a construi componente din fragmente mai mici. Deciziile pe care le ei pentru a „sparge” o componentă în constituiente, se numește „factoring”. Acest termen este împrumutat de la operațiunea matematică de factorizare.

Atunci când te gândești la composition, adică la punerea cap la cap a diverselor fragmente funcționale, de fapt, te gândești la relațiile pe care le stabilesc entitățile.

Atunci când te gândești la decomposition, adică la desfacerea în elementele componente, poate pentru o nouă recompunere, te gândești la entitățile din care este compus software-ul.

Descompunerea funcțiilor este folosită ca procedeu pentru a extrage părțile unei funcții pe care am dori să le folosim în mod repetat sau în condiții speciale și mai ales pentru a numi relațiile care se stabilesc între aceste părți.

Un exemplu de descompunere (decomposition):

```javascript
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

## Combinatorii

Sunt funcții care iau alte funcții drept argumente și returnează alte funcții.

Un exemplu de compunere (Bluebird),

```js
function compunere (a, b) { // ia două funcții a și b
  return function (c) {     // returnează o funcție care ia un argument folosit pentru una din funcții, și care la rândul său returnează
    return a(b(c));         // rezultatul evaluării lui a aplicată rezultatului evaluări lui b care ia ca argument c.
  }
}

// rescris folosind ECMAScript 2015 precum:

var compunere = (a, b) => (c) => a(b(c));

function adunaCifre (numar){
  return numar + 2;
};

function inmultesteCifre(numar){
  return numar * 2;
};

// pentru a le compune ai putea face:

function adaugaSiInmulteste(numar){           // îi pasezi valoarea care va fi folosită la înmulțire
  return adunaCifre(inmultesteCifre(numar));  // este evaluată funcția inmultesteCifre și apoi rezultatul este folosit pentru a evalua adunaCifre
};

adaugaSiInmulteste(5); // 12

var compus = compunere(adunaCifre, inmultesteCifre);

compus(5);  // 12
```

Entitățile sunt compuse pentru a face relațiile dintre ele mult mai explicite.

# Compoziție și extindere

Practica generală este de a construi componente din alte componente mai mici. Modul în care alegi fracționarea în componente mai mici se numește *factoring*. Termenul de factoring vine de la operațiunea matematică de factorizare. Desfacerea în componente și rearanjarea lor se numește *refactoring*.

Fiecare componentă este de fapt o valoare. Componentele pot fi puse într-un obiect sau pot fi încapsulate într-un șablon bazat pe closure.
