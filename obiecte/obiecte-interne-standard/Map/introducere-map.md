# Map

Este un obiect intern introdus de ECMAScript 2015, care oferă o colecție simplă de *chei - valori*. Această structură permite iterarea elementelor în ordinea în care acestea au fost introduse, folosind `for...of`, de exemplu. Acceptă valori primitive și obiecte drept chei și respectă protocolul `Iterable`, ceea ce înseamnă că poți folosi și operatorii `spread`. Înainte de introducerea lui `Map`, erau folosite obiectele simple pentru a stoca perechi *cheie: valoare*.

Pentru lucrul cu o structură simplă de date, în care unei chei de tip string îi corespunde o valoare sau o metodă, obiectele simple sunt o alegere naturală. Lucrurile încep să se complice atunci când este nevoie să introduci structuri mai complexe ca valoare, așa cum sunt obiectele. Spre deosebire de obiectele simple, un avantaj suplimentar pe care `Map` îl oferă este menținerea ordinii de intrare a datelor. Obiectele `Map` sunt foarte utile atunci când datele interne ale unui obiect au o dinamică foarte ridicată, fiind adăugate și șterse chei în mod continuu.

Obiectele `Map` prin metodele sale oferă funcționalități net superioare celor obișnuite.

Mai mult, poți avea drept chei orice valoare dorești. O curiozitate: valoarea `NaN` poate fi folosită  drept cheie.

## O perspectivă asupra obiectului simplu

Din nefericire, o de colecție de date gestionată cu ajutorul unor obiecte simple va fi poluată de **chei - valori** moștenite prin mecanismul prototipal. Singura metodă de a contracara acest lucru este să întrerupi moștenirea prin setarea la `null` a obiectului prototipal: `const map = Object.create(null);`. Efectul este crearea unui obiect care nu mai moștenește din prototip nimic, păstrând o izolare benefică în scopul depozitării de *chei - valori* proprii. Totuși, pentru a crea structuri de date folosind obiecte, `Map` este soluția dorită.

Un exemplu forțând la limită mecanismele oferite de obiectele simple.

```javascript
const obi = {};
function adauga (numeCheie, valoare) {
  obi[numeCheie] = valoare;
};
function scoate (numeCheie) {
  return obi[numeCheie];
};
adauga('primul', {a: 'element', b: true});
adauga('alDoilea', {
  x: 10,
  y: function () {
    return this.a;
  }
});
console.log(obi);   // Object { primul: Object, alDoilea: Object }
scoate('alDoilea'); // Object { x: 10, y: .y() }
```

Problema aici este că obiectul va avea și proprietățile care nu-i aparțin în mod direct, dar care sunt moștenite prototipal. O simplă verificare cu `obi.__proto__` va indica acest lucru. O posibilă soluție *pe genunchi*, ar fi crearea unui obiect căruia să-i fie tăiată moștenirea așa cum deja am menționat.

```javascript
const obi = Object.create(null); // lanțul prototipal este întrerupt
```

Dar chiar și așa, un alt neajuns este că **toate cheile obiectului vor fi mereu stringuri**. Folosirea lui `Map` rezolvă aceste probleme oferind și metodele necesare pentru a gestiona datele din colecție.

```javascript
const obi = new Map();
obi.set('unobj', {a: 'element', b: true});
obi.set('alDoilea', {x: 10, y: function(){return this.a}});
obi.set(new Date(), 'data creării proprietății');
```

## Crearea și instanțierea obiectelor Map

Spre deosebire de obiectul clasic, într-un `Map` poți introduce orice valoare, de la primitive, la obiecte, iar cheile nu vor mai fi limitate la șiruri de caractere. Se va instanția cu `new`: `new Map([cheie, valoare])`.

**Moment ZEN**: Cheia ține valoarea în viață.

Obiectul care va constitui colecția trebuie să fie iterabil. Chiar la instanțiere poți să începi să-l populezi pasând un array de array-uri. Fiecare element array va avea la rândul lui două elemente. Primul reprezintă cheia, iar cel de-al doilea, valoarea. În exemplul următor este dezvăluită posibilitatea de a crea un obiect `Map` dintr-un array de array-uri.

```javascript
const obiect = new Map([
  ['ceva', 'un fragment'],
  [() => 'altceva', true],
  [Symbol('elementeNoi'), [10, 20, 30]]
]);
console.log([...obiect]); // Array [ Array[2], Array[2], Array[2] ]
```

Observă faptul că pentru fiecare element al array-ului ai un array a cărui primă valoare este viitoarea cheie din obiectul `Map`, urmat de valoarea sa. În cazul în care aceste elemente array au mai mult de două valori, începând cu a treia, vor fi ignorate, fiind luate în considerare doar primele două în vederea creării cheii și valorii din `Map`.

Cu puțină imaginație, am putea transforma un obiect *normal* într-un `Map`. Tot ce trebuie făcut este un pas intermediar care să asigure transformarea membrilor obiectului într-un array. Acest lucru este oferit de metoda `entries()` din prototipul lui `Object`.

```javascript
let obi = {
  a: 10,
  b: 'primăvară'
};

let obiectMap = new Map(Object.entries(obi));
```

## Iterarea obiectelor Map

Obiectele `Map` au o metodă internă `@@iterator`. Aceasta este o veste foarte bună pentru că vom fi beneficiarii unor noi instrumente de procesare a datelor, precum `for...of` sau operatorul *spread* (`...nume_map`).

```javascript
let x = 'ceva';
const obi = new Map([
  [1, 'unu'], [x, 'altceva'], ['ex', true]
]);
console.log([...obi]); // Array [ Array[2], Array[2], Array[2] ]
// extragi valori folosind destructurarea și string templates
for (let [cheie, valoare] of obi) {
  console.log(`${cheie}: ${valoare}`);
}; // => 1: unu => ceva: altceva => ex: true
```

Atunci când folosești un `Map` ca un iterator (faci uz de cursorul intern pe care un iterator îl oferă), de fapt faci o iterare asupra lui `.entries`.

```javascript
const obiect = new Map();
obiect.set('ceva', 'altceva');
console.log(obiect[Symbol.iterator] === obiect.entries); // true
```

## Detalii privind cheile și valorile

Atenție, folosirea aceluiași identificator pentru o cheie, nu va crea una duplicat în `Map`, ci va suprascrie valoarea existentă.

Lucrul cel mai folositor în cazul `Map` este posibilitatea de folosi funcțiile și obiectele drept chei ale map-ului. Acest lucru nu este posibil în cazul obiectelor clasice pentru că avem toate cheile exprimate ca stringuri.

```javascript
const bibliotecaTest = new Map();

bibliotecaTest.set(() => 10 + 1, 11);
bibliotecaTest.set(() => 1000 - 500, 500);

for (let test of bibliotecaTest){
  console.log((test[0]() === test[1]) ? 'OK!' : 'FALSE');
}; // OK!
```

## Comportament și performanțe

Referințele către obiecte `Map` și `Set` taxează memoria pentru că nu vor fi colectate la gunoi. Singurul moment când acest lucru se întâmplă este atunci când nu mai există nicio referință activă la acel `Map`. Obiectele stocate, vor fi păstrate în continuare în memorie chiar dacă nu sunt folosite. Singura modalitate de a contracara o astfel de taxare a performanței este prin eleminarea cheilor din `Map` sau chiar distrugerea `Map`-ului. Un exemplu poate fi cazul în care este folosit un `Map` pentru gestionarea nodurilor DOM, dacă acestea vor fi șterse în logica programului, dar vor fi menținute în `Map`. Pentru rezolvarea problemelor de taxare a memoriei, au fost introduse în limbaj `WeakMap` și `WeakSet`. Acestea permit colectarea la gunoi când nu mai este nevoie de ele.

## Proprietăți

Acestea sunt `Map.length`, `Map.prototype` și foarte important `Map.size`.

```javascript
bibliotecaTest.size; // 2
```

## Metode

### `Map.prototype.set()` și `Map.prototype.get()`

Adaugă un element nou la un `Map`, adică o pereche cheie - valoare.

```javascript
const colectie = new Map();

colectie.set('ceva', 'valoare');
colectie.get('ceva'); // valoare

// actualizarea unui element
colectie.set('ceva', 1000);
colectie.get('ceva'); // 1000
```

Utilizând metoda `get()`, obții valoarea unei anumite chei.

### `Map.prototype.delete()` și `Map.prototype.has()`

Este evident că folosind `delete()` se poate șterge o pereche, atenție întreaga pereche. Dacă dorești să verifici existența unei chei, vei folosi `has()` pentru a face interogarea asupra map-ului.

```javascript
const colectie = new Map();

colectie.set('ceva', 'valoare');
colectie.set('altceva', 10);

colectie.has('altceva'); // true
colectie.delete('altceva'); //true
colectie.has('altceva') // false
```

### Metoda `Map.prototype.clear()`

Metoda este cât se poate de clară: șterge toate perechile din `Map`.

### Metoda `Map.prototype.entries()`

Metoda returnează un obiect **Iterator** care conține perechi cheie - valoare pentru fiecare element din obiectul Map.

```javascript
const colectie = new Map();

colectie.set('ceva', 'o valoare');
colectie.set('altceva', 1000);
colectie.set({}, 'hmmmmm');

let iteratorColectie = colectie.entries();

console.log(iteratorColectie.next().value); // Array [ "ceva", "o valoare" ]
console.log(iteratorColectie.next().value); // Array [ "altceva", 1000 ]
console.log(iteratorColectie.next().value); // Array [ Object, "hmmmmm" ]
```

### Metoda `Map.prototype.forEach()`

Metoda execută o funcție pentru fiecare pereche cheie - valoare din obiectul `Map` în ordinea inserției. Callback-ul nu se va executa pentru cheile care au fost șterse, dar se va executa pentru valorile prezente dar care sunt `undefined`.

Metoda primește ca argumente callback-ul și un alt argument, care dacă este pasat este `this` și acesta este pasat callback-ului. Dacă nu este pasat acesta va fi din start `undefined`, care va fi pasat callback-ului.

Callback-ul este invocat cu trei argumente:

-   valoarea elementului
-   cheia elementului
-   obiectul Map care trebuie traversat

Metoda `forEach` execută o funcție vizitând fiecare element, dar nu va returna nicio valoare.

```javascript
// vezi ce este în fiecare element al Map-ului
const colectie = new Map([['ceva', 10], ['altceva', 'ceva text'], ['x', {}]]);
function ceEste (value, key, map) {
  console.log(key + ' = ' + value);
};
colectie.forEach(ceEste);
```

Fiecare element într-o buclă este un array format din cheie, care este primul element și valoare, care este al doilea element.

### Metoda `Map.prototype.keys()` și `Map.prototype.values()`

Este o metodă care returnează un nou obiect iterator care conține cheile pentru fiecare element din obiectul `Map` în ordinea inserării.

```javascript
const colectie = new Map();

colectie.set('ceva', 'o valoare');
colectie.set('altceva', 1000);
colectie.set({}, 'hmmmmm');

let iteratorColectie = colectie.keys();

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
