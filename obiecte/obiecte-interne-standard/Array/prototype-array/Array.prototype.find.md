# Array.prototype.find()

Metoda a fost proiectată cu scopul de a descoperi primul element din array care satisface o condiție impusă la execuția unui callback. Este recomandabilă folosirea metodelor `indexOf()` sau `lastIndexOf()`, dacă este dorită valoarea primei aparții sau a ultimei.

Dacă un element al array-ului satisface condițiile unei funcții de test (callback), primul întâlnit este returnat. Dacă nu este găsit, este returnat `undefined`. În cazul în care dorești să găsești toate elementele care satisfac criteriile, ar trebui folosită metoda `filter()`. Metoda nu modifică array-ul original.

Metodele `find()` și `findIndex()` primesc două argumente: o funcție callback și o referință către un obiect la care se dorește o legătură `this`. Funcția cu rol de callback poate primi trei argumente:

-   *elementul* care este procesat,
-   *indexul* elementului care este procesat,
-   *array*-ul pentru care `find()` a fost invocat.

Pur și simplu sare în ochi faptul că sunt pasate aceleași lucruri ca și lui `map()` sau lui `forEach()`. Metoda `find()` returnează valoarea, iar `findIndex()`, indexul la care a fost găsită aceasta.

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
