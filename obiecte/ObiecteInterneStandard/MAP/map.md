# Map

Obiectul Map este o colecție chei - valori. Acceptă valori primitive și obiecte.

Se va instanția cu new: `new Map([interable])`. Obiectul care va constitui colecția trebuie să fie o colecție iterabilă.

Lucrul cel mai folositor în cazul Map este posibilitatea de folosi funcțiile și obiectele ca și chei ale map-ului. Acest lucru nu este posibil în cazul obiectelor clasice pentru că avem cheile ca și stringuri.

```js
var bibliotecaTest = new Map();

bibliotecaTest.set(() => 10 + 1, 11);
bibliotecaTest.set(() => 1000 - 500, 500);

for(var test of bibliotecaTest){
  console.log((test[0]() === test[1]) ? 'OK!' : 'FALSE');
};
```

## Proprietăți

Map.length

Map.prototype

## Metode

### Map.prototype.set() și Map.prototype.get()

Adaugă un element nou la un Map, adică o pereche cheie - valoare.

```js
var colectie = new Map();

colectie.set('ceva', 'valoare');
colectie.get('ceva');

// actualizarea unui element
colectie.set('ceva', 1000);
colectie.get('ceva');
```

### Map.prototype.delete() și Map.prototype.has()

```js
var colectie = new Map();

colectie.set('ceva', 'valoare');
colectie.set('altceva', 10);

colectie.has('altceva'); // true
colectie.delete('altceva'); //true
colectie.has('altceva') // false
```

### Map.prototype.entries()

Metoda returnează un obiect Iterator care conține perechi cheie - valoare pentru fiecare element din obiectul Map.

```js
var colectie = new Map();

colectie.set('ceva', 'o valoare');
colectie.set('altceva', 1000);
colectie.set({}, 'hmmmmm');

var iteratorColectie = colectie.entries();

console.log(iteratorColectie.next().value); // Array [ "ceva", "o valoare" ]
console.log(iteratorColectie.next().value); // Array [ "altceva", 1000 ]
console.log(iteratorColectie.next().value); // Array [ Object, "hmmmmm" ]
```

### Map.prototype.forEach()

Metoda execută o funcție pentru fiecare pereche cheie - valoare din obiectul Map în ordinea inserției. Callback-ul nu se va executa pentru cheile care au fost șterse, dar se va executa pentru valorile prezente dar care sunt `undefined`.

Metoda primește ca argumente callback-ul și un alt argument, care dacă este pasat este `this` și acesta este pasat callback-ului. Dacă nu este pasat acesta va fi din start undefined, care va fi pasat callback-ului.

Callback-ul este invocat cu trei argumente:

- valoarea elementului
- cheia elementului
- obiectul Map care trebuie traversat

forEach execută funcție vizitând fiecare element, dar nu va returna nicio valoare.

```js
// vezi ce este în fiecare element al Map-ului
var colectie = new Map([['ceva', 10],['altceva', 'ceva text'],['x', {}]]);
function ceEste(value, key, map){
  console.log(key + ' = ' + value);
};
colectie.forEach(ceEste);
```

Fiecare element într-o buclă este un array format din cheie, care este primul element și valoare, care este al doilea element.

### Map.prototype.keys() și Map.prototype.values()

Este o metodă care returnează un nou obiect iterator care conține cheile pentru fiecare element din obiectul Map în ordinea inserării.

```js
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
