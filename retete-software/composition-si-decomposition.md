# Compoziție și decompoziție

O practică de programare curentă este de a construi componente din fragmente mai mici. Deciziile pe care le ei pentru a „sparge” o componentă în constituiente, se numește „factoring”. Acest termen este împrumutat de la operațiunea matematică de factorizare.

Atunci când te gândești la composition, adică la punerea cap la cap a diverselor fragmente funcționale, de fapt, te gândești la relațiile pe care le stabilesc entitățile.

## Composing - compunere

Vom porni de la nevoia de a folosi rezultatul evaluării unei funcții ca date de intrare pentru o alta.

```javascript
var compunSiruri = function dialog (sir) {
  return sir + ' Pricepi?';
};
var afisezDialog = function naratiune (sir) {
  return `Vocea spunea: „${sir}”.`;
};
var compunFirNarativ = function asamblor (replica) {
  var pas1 = compunSiruri(replica);
  var pas2 = afisezDialog(pas1);
  return pas2;
};
compunFirNarativ('Amice, ești limitat.');
```

Un alt exemplu compoziție cu funcții este atunci când folosim `then()` în lucrul cu promisiunile.

**Moment ZEN**: Dacă faci chaining, de fapt faci compui funcțiile.

Exemplul de mai sus l-am putea contrage folosind arrow functions pentru a obține o formă elegantă conform ultimei versiuni a standardului.

```javascript
var compunSiruri = sir => `${sir} Pricepi?`,
    afisezDialog = sir => `Vocea spunea: „${sir}”.`,
    compunFirNarativ = replica => afisezDialog(compunSiruri(replica));
compunFirNarativ('Vreau să înțeleg!');
```

Chiar și obiectele se pot compune folosind primitive.

```javascript
let a = 10, b = true;
let obi = {a, b};
console.log(obi); // {"a":10,"b":true}
```

Compunerea obiectelor se poate face și pentru obiectele care pot forma mixin-uri, adică formezi un alt obiect căruia îi poți da drept membri fragmente din altele.

```javascript
let unu = {x: 10}, doi = {a: 'doi'};
let mixinObi = {unu, doi};
console.log(mixinObi);
```

## Decomposition - descompunerea

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

```javascript
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

## Resurse

[Composing Software: An Introduction](https://medium.com/javascript-scene/composing-software-an-introduction-27b72500d6ea)
