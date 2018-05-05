# Array.prototype.find()

Metoda a fost proiectată cu scopul de a descoperi un element din array care se potrivește după o condiție și mai puțin după o valoare. Este recomandabilă folosirea metodelor `indexOf()` sau `lastIndexOf()`, dacă este țintită valoarea.

Returnează valoarea căutată într-un array. Dacă un element al array-ului satisface condițiile unei funcții de test (callback), elementul căutat este returnat. Dacă nu este găsit, este returnat `undefined`.

Metodele `find()` și `findIndex()` primesc două argumente: o funcție callback și o referință către un obiect care va fi folosit drept `this`. Funcția cu rol de callback poate primi trei argumente:

-   *elementul* care este procesat,
-   *indexul* elementului care este procesat,
-   *array*-ul pentru care `find()` a fost invocat.

Pur și simplu sare în ochi faptul că sunt pasate aceleași lucruri ca și lui `map()` sau lui `forEach()`.
Revenind la `find()`, funcția callback ar trebui să returneze `true` dacă valoarea pasată drept cheie de căutare este găsită între elemente. În cazul în care este găsit un element care se potrivește, ambele metode vor returna `true`. Singura diferență între cele două este că `find()` returnează valoarea, iar `findIndex()`, indexul la care a fost găsită aceasta.

Nu modifică array-ul pentru care este apelată metoda.

```javascript
var lada = [
  {denumire: 'mere', cantitate: 2},
  {denumire: 'pere', cantitate: 0},
  {denumire: 'nuci', cantitate: 5}
];
function cautaPere (fruct) {
  return fruct.denumire === 'pere';
};
console.log(lada.find(cautaPere));
// {denumire: 'pere', cantitate: 0}
```

Un alt exemplu, foarte simplu:

```javascript
let colectie = [23, 43, 123, 93, 234, 964];
// cauta primul element conform criteriului
let pesteLimitaPrimul = colectie.find(element => element > 93);
// aduce indexul primului element conform criteriului
let pesteLimitaIndex = colectie.findIndex(element => element > 93);
console.log(pesteLimita, pesteLimitaIndex); // 123 2
```

Mozilla MDN propune spre exemplificare un tester pentru numere prime:

```javascript
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  };
  return element > 1;
}

console.log([4, 6, 8, 12].find(isPrime)); // undefined, not found
console.log([4, 5, 8, 12].find(isPrime)); // 5
```
