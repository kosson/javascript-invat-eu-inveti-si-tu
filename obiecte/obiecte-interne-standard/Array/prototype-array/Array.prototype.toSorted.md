# Array.prototype.toSorted

Metoda returnează elementele unui array în ordine ascendentă. Opțional, metoda primește drept unic argument o metodă care va stabili ordinea elementelor în array-ul returnat. Dacă nu este pasată această metodă, elementele sunt convertite la string-uri și apoi sunt ordonate în funcție de valoarea code point-ului Unicode. Funcția cu rol de callback primește două argumente. Primul este elementul după care se va face comparația cu cel de-al doilea.

```javascript
let arr = [23, 43, 5, 17, 22];
let aranjat = arr.toSorted((a, b) => a - b); // [ 5, 17, 22, 23, 43 ]
```

În cazul în care array-ul are goluri, valorile golurilor var fi valori `undefined` care vor fi așezate la finalul array-ului rezultat.

## Resurse

- [toSorted | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)