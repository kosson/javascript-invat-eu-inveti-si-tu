# `Map`

Este un obiect intern introdus de ECMAScript 2015 care oferă o structură simplă de chei - valori care permite iterarea elementelor dar în ordinea în care acestea au fost introduse.

Obiectul Map este o colecție chei - valori. Acceptă valori primitive și obiecte și respectă protocolul iterabil ceea ce înseamnă că poți folosi și operatorii `spread`.

Înainte de introducerea lui Map, obiectele Object erau folosite pentru a stoca chei - valori.

Pentru lucrul cu o structură simplă de date în care unei chei reprezentate de un string îi corespundea o valoare sau o metodă, obiectele simple se pretează cu succes.
Lucrurile încep să se complice atunci când era nevoie să introduci structuri mai complexe ca valori așa cum sunt obiectele (așa-numitele hash-map-uri).
Din nefericire, o astfel de mulțime gestionată prin obiecte este pur și simplu poluată de chei - valori moștenite prin mecanismul prototipal. Singura metodă de a contracara acest lucru era să întrerupi moștenirea prin `var map = Object.create(null);`. Efectul este crearea unui obiect care nu mai moștenea din prototip nimic păstrând o izolare benefică pentru scopul depozitării de chei - valori proprii.

Un exemplu de folosire cu forțarea la limită a obiectelor.

```javascript
var obi = {};

function adauga(numeCheie, valoare){
  obi[numeCheie] = valoare;
};

function scoate(numeCheie){
  return obi[numeCheie];
};

adauga('primul', {a: 'element', b: true});
adauga('alDoilea', {x: 10, y: function(){return this.a}});
console.log(obi);   // Object { primul: Object, alDoilea: Object }
scoate('alDoilea'); // Object { x: 10, y: .y() }
```

Problema aici este că obiectul va avea și proprietățile care nu-i aparțin în mod direct, dar care sunt moștenite prototipal. O simplă verificare cu `obi.__proto__` va indica acest lucru.
O posibilă soluție pe genunchi ar fi crearea unui obiect căruia să-i fie tăiată moștenirea.

```javascript
let obi = Object.create(null); // lanțul prototipal este întrerupt
```

Dar chiar și așa, un alt neajuns este că toate cheile obiectului vor fi mereu stringuri.

Folosirea lui `Map` rezolvă aceste probleme oferind și metodele necesare pentru a gestiona datele din colecție.

```javascript
var obi = new Map();
obi.set('unobj', {a: 'element', b: true});
obi.set('alDoilea', {x: 10, y: function(){return this.a}});
obi.set(new Date(), 'data la această proprietate a fost accesată');
```

Spre deosebire de obiectul clasic, într-un Map poți introduce orice valoare, de la primitive, la obiecte iar cheile nu vor mai fi limitate la stringuri.

Se va instanția cu new: `new Map([interable])`. Obiectul care va constitui colecția trebuie să fie o colecție iterabilă.

```javascript
var obiect = new Map([
  ['ceva', 'un fragment'],
  [() => 'altceva', true],
  [Symbol('elementeNoi'), [10, 20, 30]]
]);
console.log([...obiect]); // Array [ Array[2], Array[2], Array[2] ]
```

Obiectele `Map` au o metodă internă `@@iterator`. Aceasta este o veste foarte bună pentru că vom fi beneficiarii unor noi instrumente de acces la date cum ar fi operatorul `spread`.

```javascript
var x = 'ceva';
var obi = new Map([
  [1, 'unu'], [x, 'altceva'], ['ex', true]
]);
console.log([...obi]); // Array [ Array[2], Array[2], Array[2] ]
// extragi valori folosind destructurarea și string tempaltes
for(let [cheie, valoare] of obi){
  console.log(`${cheie}: ${valoare}`);
}; // => 1: unu => ceva: altceva => ex: true
```

Atunci când folosești un `Map` ca un iterator, de fapt se face o iterare asupra lui `.entries()`.

```javascript
console.log(obiect[Symbol.iterator] === obiect.entries); // true
```

Atenție, folosirea unui aceluiași identificator pentru o cheie, nu va crea una duplicat în `Map`, ci va suprascrie valoarea existentă.

Lucrul cel mai folositor în cazul `Map` este posibilitatea de folosi funcțiile și obiectele ca și chei ale map-ului. Acest lucru nu este posibil în cazul obiectelor clasice pentru că avem toatea cheile exprimate ca și stringuri.

```javascript
var bibliotecaTest = new Map();

bibliotecaTest.set(() => 10 + 1, 11);
bibliotecaTest.set(() => 1000 - 500, 500);

for(var test of bibliotecaTest){
  console.log((test[0]() === test[1]) ? 'OK!' : 'FALSE');
}; // OK!
```

## Proprietăți

Acestea sunt `Map.length`, `Map.prototype` și foarte important `Map.size`.

```javascript
bibliotecaTest.size; // 2
```

## Metode

### `Map.prototype.set()` și `Map.prototype.get()`

Adaugă un element nou la un Map, adică o pereche cheie - valoare.

```javascript
var colectie = new Map();

colectie.set('ceva', 'valoare');
colectie.get('ceva'); // valoare

// actualizarea unui element
colectie.set('ceva', 1000);
colectie.get('ceva'); // 100
```

### `Map.prototype.delete()` și `Map.prototype.has()`

Este evident că folosind delete se poate șterge o pereche, atenție întreaga pereche. Dacă dorești să verifici existența unei chei, vei folosi `has()` pentru a face interogarea asupra map-ului.

```javascript
var colectie = new Map();

colectie.set('ceva', 'valoare');
colectie.set('altceva', 10);

colectie.has('altceva'); // true
colectie.delete('altceva'); //true
colectie.has('altceva') // false
```

### `Map.prototype.clear()`

Metoda este cât se poate de clară: șterge toate perechile din `Map`.

### `Map.prototype.entries()`

Metoda returnează un obiect Iterator care conține perechi cheie - valoare pentru fiecare element din obiectul Map.

```javascript
var colectie = new Map();

colectie.set('ceva', 'o valoare');
colectie.set('altceva', 1000);
colectie.set({}, 'hmmmmm');

var iteratorColectie = colectie.entries();

console.log(iteratorColectie.next().value); // Array [ "ceva", "o valoare" ]
console.log(iteratorColectie.next().value); // Array [ "altceva", 1000 ]
console.log(iteratorColectie.next().value); // Array [ Object, "hmmmmm" ]
```

### `Map.prototype.forEach()`

Metoda execută o funcție pentru fiecare pereche cheie - valoare din obiectul Map în ordinea inserției. Callback-ul nu se va executa pentru cheile care au fost șterse, dar se va executa pentru valorile prezente dar care sunt `undefined`.

Metoda primește ca argumente callback-ul și un alt argument, care dacă este pasat este `this` și acesta este pasat callback-ului. Dacă nu este pasat acesta va fi din start undefined, care va fi pasat callback-ului.

Callback-ul este invocat cu trei argumente:

- valoarea elementului
- cheia elementului
- obiectul Map care trebuie traversat

`forEach` execută o funcție vizitând fiecare element, dar nu va returna nicio valoare.

```javascript
// vezi ce este în fiecare element al Map-ului
var colectie = new Map([['ceva', 10],['altceva', 'ceva text'],['x', {}]]);
function ceEste(value, key, map){
  console.log(key + ' = ' + value);
};
colectie.forEach(ceEste);
```

Fiecare element într-o buclă este un array format din cheie, care este primul element și valoare, care este al doilea element.

### `Map.prototype.keys()` și `Map.prototype.values()`

Este o metodă care returnează un nou obiect iterator care conține cheile pentru fiecare element din obiectul Map în ordinea inserării.

```javascript
var colectie = new Map();

colectie.set('ceva', 'o valoare');
colectie.set('altceva', 1000);
colectie.set({}, 'hmmmmm');

var iteratorColectie = colectie.keys();

console.log(iteratorColectie.next().value); // ceva
console.log(iteratorColectie.next().value); // altceva
console.log(iteratorColectie.next().value); // Object {  }
```

Același mecanism se aplică valorilor.

Folosind cele două proprietăți, putem obține cu ajutorul operatorului spread array-uri de valori și array-uri de chei:

```javascript
console.log([...colectie.keys()]); // [ "ceva", "altceva", Object ]
console.log([...colectie.values()]); // [ "o valoare", 1000, "hmmmmm" ]
```

Ca și curiozitate, valoarea `NaN` poate fi folosită ca și cheie.
