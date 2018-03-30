# Array.prototype.sort()

Atenție! Această metodă modifică definitiv array-ul original.

Sortează elementele unui array și returnează acel array. Fii avertizat că această metodă modică array-ul. Există un mic truc care protejează array-ul original: folosirea metodei `slice()` pentru a face o copie pe care apoi faci sortarea.

```javascript
const arrOrig = [23, 'ceva', 43, 8];
const arrCopie = arrOrig.slice().sort();
// [ 23, 43, 8, "ceva" ]
```

Dacă nu este pasat un argument, de fapt o funcție care să îndeplinească sortarea, aceasta se va face prin compararea **punctelor de cod** Unicode, adică a valorilor numerice care codează caracterele. Ceea ce se întâmplă este o conversie a elementelor de array la string urmată de compararea lor ca valori Unicode.

Pentru compararea șirurilor este necesară folosirea unei funcții care să se aplice elementelor care vor fi comparate între ele. Funcția va fi, de fapt un algoritm care va fi folosite pentru compararea valorilor. Acesta este un ca clasic de utilizarea a unui callback. Funcția de comparare poate fi astfel:

```javascript
function compara (primulCaracter, alDoileaCaracter) {
  if ( primulCaracter < alDoileaCaracter) {
    return -1;
  } else if (primulCaracter > alDoileaCaracter) {
    return 1;
  };
  return 0;
}
["c", "a", "d"].sort(compara);
// Array [ "a", "c", "d" ]
```

Pentru că valorile de lucru sunt cele ale tabelei Unicod și oarecum nu sunt evidente pentru cel care lucrează cu valorile array-ului, în practică s-a găsit o metodă de a face sortarea să se comporte mai apropiat de ceea ce se așteaptă de la o astfel de metodă.

Acest lucru se transpune în pasarea unei funcții cu rol de sortare. Funcția pasată va compara două elemente x și y. Rezultatul comparării conduce la o decizie în ceea ce privește reorganizarea array-ului. Există trei cazuri în care comportamentul de sortare este modelat de ceea ce este returnat de funcția pasată:

-   valoarea returnată mai mică de 0: x va sta înaintea lui y
-   valoarea este mai mare de 0: y va sta înaintea lui x
-   valoarea este egală cu 0: x și y își vor păstra pozițiile.

O formă pentru a înțelege pașii este următoarea secvență care se autodescrie:

```javascript
[-23, -2, 102, 3, -54].sort( function (x, y) {
  if (x < y) {
    return -1;
  };
  // dacă true pune x pe un index mai mic decât y: deplasare stânga.
  if (x > y) {
    return 1;
  };
  // dacă y este mai mic decât x, acordă un index mai mic.
  return 0;
  // dacă valorile sunt sortate lasă neschimbată poziția unuia față de celălalt.
}); // Array [ -54, -23, -2, 3, 102 ]
```

Se poate condensa mai mult folosindu-se operatorul ternar:

```javascript
[-23, -2, 102, 3, -54].sort( function (x, y) {
  return x < y ? -1 : ( x > y ? 1 : 0 );
}); // [ -54, -23, -2, 3, 102 ]
```

Încă o treaptă folosindu-se un fat arrow:

```javascript
[-23, -2, 102, 3, -54].sort( (x, y) => {
  return x < y ? -1 : ( x > y ? 1 : 0 );
}); // [ -54, -23, -2, 3, 102 ]
```

O altă variantă de comparator pentru valori numerice este pur și simplu scăderea unuia din celălalt:

```javascript
[-23, -2, 102, 3, -54].sort( (x, y) => x - y );
```

Și obiectele pot fi sortate dacă este dată o valoarea uneia dintre proprietăți.

```javascript
var colectie = [
  {nume: 'Gina', valoare: 20},
  {nume: 'Dobrin', valoare: 16},
  {nume: 'Sanda', valoare: -12},
  {nume: 'Nicolae', valoare: 40},
  {nume: 'Pavel', valoare: -6}
];

// sortare după o valoare arbitrară
colectie.sort( function (x, y) {
  if ( x.valoare > y.valoare ) {return 1};
  if ( x.valoare < y.valoare ) {return -1};
  return 0;
});

// contras
colectie.sort( (x, y) => x.valoare - y.valoare );

// sortare după o valoare text
colectie.sort( function (x, y) {
  var numeX = x.nume.toUpperCase(); // uniformizezi caracterele
  var numeY = y.nume.toUpperCase();
  if ( numeX < numeY ) {return -1};
  if ( numeX > numeY ) {return 1};
  return 0;
});
```

Rețineți tactica de a nivela diferențele pe care majusculele și minusculele le dau. S-a folosit metoda `toUpperCase()` pentru a nivela aceaste diferențe.

Mergând ceva mai departe, dacă extragem funcția separat, putem, la nevoie să inversăm rezultatul sortării.

```javascript
var arr = [-23, -2, 102, 3, -54];

function aranjament(x, y) {
  var jalon = 0;
  if ( x > y ) {
    jalon = 1;
  } else if ( y > x) {
    jalon = -1;
  };
  return jalon * -1; // inversarea sortării
};

arr.sort(aranjament); // [ 102, 3, -2, -23, -54 ]
```

La un moment dat să faci o sortare, dar să poți și inversa sortarea la nevoie.

```javascript
var colectie = [
  {nume: 'Gina', valoare: 20},
  {nume: 'Dobrin', valoare: 16},
  {nume: 'Sanda', valoare: -12},
  {nume: 'Nicolae', valoare: 40},
  {nume: 'Pavel', valoare: -6}
];

function comparValori (cheia, ordonare = 'asc') {
  return function (x, y) {
    let comparator = 0;

    // lucrăm strict doar cu proprietățile obiectului
    if ( !x.hasOwnProperty(cheia) || !y.hasOwnProperty(cheia) ) {
      return 0;
    };

    // uniformizează cheia la CAPS
    const X = (typeof x[cheia] === 'string') ? x[cheia].toUpperCase() : x[cheia];
    const Y = (typeof y[cheia] === 'string') ? y[cheia].toUpperCase() : y[cheia];

    if (X > Y) { comparator = 1 } else if (X < Y) { comparator = -1 };

    return ( (ordonare == 'desc') ? (comparator * -1) : comparator );
  };
};

colectie.sort(comparValori('valoare'));
colectie.sort(comparValori('nume'));
colectie.sort(comparValori('valoare', 'desc'));
```

Algoritmul de sortare folosit se aseamnă cu `Bubble Sort`-ul. Dacă se dorește, poți face o implementare `Bubble Sort`. Parcurgerea codului pentru o astfel de sortare, va aduce mai multă lumină asupra algoritmului folosit de metoda `sort()` a obiectului intern `Array`.

```javascript
let arr = ['ceva','altceva','după'];
function bubbleSort (arr) {
  const len = arr.length;
  for (let index = len - 1; index >= 0; index--) {
    for (let idxInt = 1; idxInt <= index; idxInt++) {
      let temp;
      if (arr[idxInt - 1] > arr[idxInt]) {
        temp = arr[idxInt - 1];
        arr[idxInt - 1] = arr[idxInt];
        arr[idxInt] = temp;
      };
   };
 };
 return arr;
};
bubbleSort(arr);
```

Și acum, același principiu prin aplicarea metodei `sort()`. Dacă vom cupla cu noua sintaxă pe care o introduce *fat arrow*, vom ajunge la o formulă mult simplificată. Atenție, variantele următoare funcționează pentru valorile numerice.

```javascript
const ascendent = (a, b) => a - b;
[3, 1, 10].sort(ascendent);
const descendent = (a, b) => b - a;
[23, 54, 87].sort(descendent);
```

## Referințe

-   [JS: Interview Questions](http://khan4019.github.io/front-end-Interview-Questions/sort.html)
-   [Sorting algorithms in JavaScript, Posted on March 12, 2016](http://blog.benoitvallon.com/sorting-algorithms-in-javascript/sorting-algorithms-in-javascript/)
