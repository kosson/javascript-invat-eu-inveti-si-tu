# Array.prototype.sort()

Această metodă modifică definitiv array-ul original. Sortează elementele unui array și returnează acel array. Există un mic truc care protejează array-ul original, dacă acest lucru se dorește: folosirea metodei `slice()` pentru a face o copie pe care apoi faci sortarea.

```javascript
const arrOrig = [23, 'ceva', 43, 8];
const arrCopie = arrOrig.slice().sort();
// [ 23, 43, 8, "ceva" ]
```

Dacă nu este pasat un argument, de fapt o funcție care să îndeplinească sortarea, aceasta se va face prin compararea **punctelor de cod** Unicode, adică a valorilor numerice care codează caracterele. Ceea ce se întâmplă este o conversie a elementelor din array la string urmată de compararea lor ca valori Unicode. Pentru a preveni un rezultat, care pentru noi oamenii nu este relevant, va trebui să folosim o funcție care să facă comparația și să ofere o valoare de adevăr ca rezultat.

## Sortări de bază

### Sortarea șirurilor de caractere

Pentru compararea șirurilor de caractere este necesară folosirea unei funcții care să se aplice elementelor care vor fi comparate între ele. Pentru că valorile de lucru sunt cele ale tabelei [Unicode](https://unicode-table.com/en/blocks/). Poți consulta articolul Wikipediei dedicat listei Unicode - https://en.wikipedia.org/wiki/List_of_Unicode_characters pentru a vedea valorile asociate caracterelor din setul Basic Latin. Fii foarte atent la distincția dintre caracterele majuscule și cele normale. Au coduri diferite, iar rezultatele sortării vor reflecta acest lucru. Pentru limba română, avem și fonemele specifice, care au valori asociate mari (https://en.wikipedia.org/wiki/Romanian_alphabet).

În practică, s-a găsit o metodă de a face sortarea să se comporte mai apropiat de ceea ce se așteaptă de la o astfel de metodă. Algoritmul de lucru va fi transpus într-o funcție cu rol de callback angajată în compararea valorilor.

```javascript
function compara (primulCaracter, alDoileaCaracter) {
  if ( primulCaracter < alDoileaCaracter) {
    return -1;
  } else if (primulCaracter > alDoileaCaracter) {
    return 1;
  };
  return 0;
}
["c", "a", "d"].sort(compara); // [ "a", "c", "d" ]
```

Callback-ul are rol de sortare. Funcția pasată va compara două elemente `primulCaracter` și `alDoileaCaracter`. Rezultatul comparației conduce la o decizie în ceea ce privește reorganizarea array-ului. Există trei cazuri în care comportamentul de sortare este modelat de ceea ce este returnat de funcția pasată:

-   valoarea returnată mai mică de 0: `primulCaracter` va rămâne înaintea celui de `alDoileaCaracter`;
-   valoarea este mai mare de 0: `alDoileaCaracter` va trece înaintea `primulCaracter`;
-   valoarea este egală cu 0: `primulCaracter` și `alDoileaCaracter` își vor păstra pozițiile.

Pentru a înțelege procesul, trebuie să ne readucem aminte cum transformă (*coercion*) valorile. Știm că metoda `sort` lucrează cu o valoare pe care o traduce într-o valoare de adevăr. Pentru valorile pe care le returnează funcția callback avem următoarele:

- Boolean(-1) este `true`;
- Boolean(1) este `true`;
- Boolean(0) este `false`;

Pentru limba română lucrurile nu funcționează așa cum ne-am aștepta.

```javascript
let arry = ['ăsta', 'țoi', 'șal', 'ă', 'ț', 'ș', 'măsură', 'Țâru', 'Șecăria', 'URANIA'];

let newArr = arry.sort(); //[ 'URANIA', 'măsură', 'ă', 'ăsta', 'Șecăria', 'ș', 'șal', 'Țâru', 'ț', 'țoi' ]
let altArr = arry.sort((x, y) => {
  return x < y ? -1 : ( x > y ? 1 : 0);
}); // [ 'URANIA', 'măsură', 'ă', 'ăsta', 'Șecăria', 'ș', 'șal', 'Țâru', 'ț', 'țoi' ]

```

Pentru a rezolva problema comparației șirurilor localizate, sortarea are nevoie de beneficiile pe care le oferă metoda `localeCompare` a obiectului `String`. Această metodă are un comportament similar callback-ului pe care l-am construit anterior, cu mențiunea că ia în considerare și particularitățile seturilor de caractere diferite de Basic Latin, așa cum este cazul fonemelor românești.

```javascript
function sortLocalizat (x, y) {
  return x.localeCompare(y);
};

arry.sort(sortLocalizat); // [ 'ă', 'ăsta', 'măsură', 'ș', 'șal', 'Șecăria', 'ț', 'Țâru', 'țoi', 'URANIA' ]
```

### Sortarea caracterelor numerice

O formă pentru a înțelege pașii este următoarea secvență, care de această dată folosește numere:

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

## Sortarea obiectelor

Și obiectele pot fi sortate dacă este dată o valoarea uneia dintre proprietăți câtă vreme sunt organizate într-un array. O primă soluție facilă este următorul exemplu care ordonează obiectele după o valoare numerică.

```javascript
var colectie = [
  {nume: 'Gina',    valoare: 20,  data: '2004-05-12'},
  {nume: 'Dobrin',  valoare: 16,  data: '2016-08-24'},
  {nume: 'Sanda',   valoare: -12, data: '1955-12-23'},
  {nume: 'Nicolae', valoare: 40,  data: '1977-07-27'},
  {nume: 'Pavel',   valoare: -6,  data: '1011-11-01'}
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

Rețineți tactica de a nivela diferențele dintre majusculele și minusculele folosind metoda `toUpperCase()` pentru a le nivela.

### Sortarea obiectelor după anumite chei

Următorul exemplu va lua în considerare necesitatea de a sorta obiecte în funcție de valorile a două dintre proprietăți comparându-le între ele.

```javascript
var colectie = [
  {nume: 'Gina',       valoare: 20,  data: '2004-05-12'},
  {nume: 'Dobrin',     valoare: 16,  data: '2016-08-24'},
  {nume: 'Țundrea',    valoare: -12, data: '1955-12-23'},
  {nume: 'Nicolae',    valoare: 40,  data: '1977-07-27'},
  {nume: 'Năftănăilă', valoare: 40,  data: '1977-07-27'},
  {nume: 'Pavel',      valoare: -6,  data: '1011-11-01'}
];

function sortDupaDoua (a, b) {
  return a.nume.localeCompare(b.nume) || a.valoare.localCompare(b.valoare);
};

console.log(colectie.sort(sortDupaDoua));

/*[ { nume: 'Dobrin',     valoare: 16,  data: '2016-08-24' },
    { nume: 'Gina',       valoare: 20,  data: '2004-05-12' },
    { nume: 'Năftănăilă', valoare: 40,  data: '1977-07-27' },
    { nume: 'Nicolae',    valoare: 40,  data: '1977-07-27' },
    { nume: 'Pavel',      valoare: -6,  data: '1011-11-01' },
    { nume: 'Țundrea',    valoare: -12, data: '1955-12-23' } ] */
```

Ceea ce se poate remarca este folosirea operatorului OR (`||`) pentru a forța verificarea celui de-al doilea operator din dreapta în caz că din prima verificare rezultatul este `false`.

### Sortarea obiectelor după numele mai multor chei

Dacă anterior, în funcția de sortare menționam distinct numele cheii după care se face sortarea, putem face un pas mai departe abstractizând. Evaluarea este a unei funcții care oferă același răspuns Boolean așteptat numai că permite și specificarea cheii după a cărei valoare să se facă sortarea.

```javascript
function sortDupaOProp (prop, a, b) {
  if (typeof a[prop] === 'number') {
    return a[prop] - b[prop];
  }
  return a[prop].localeCompare(b[prop]);
}

let rezultat = colectie.sort((a, b) => sortDupaOProp('nume', a, b) || sortDupaOProp('valoare', a, b));
console.log(rezultat); // rezultatul este același de mai sus
```

Putem merge ceva mai departe folosindu-ne de closure-uri. Ideea ar fi să ai o funcție căreia să-i trimiți numele proprietății, iar aceasta să returneze o altă funcție care să poată primi operanzii de sortare.

```javascript
const sortByProp = function(prop){
  return function(a,b){
    if(typeof a[prop] === 'number')
      return a[prop]-b[prop];

    return a[prop].localeCompare(b[prop]);
  }
}

const sortDupaCheia = function (prop) {
  return function (a, b) {
    if(typeof a[prop] === 'number') {
        return a[prop]-b[prop];
    }
    return a[prop].localeCompare(b[prop]);
  }
}

/* ES6
const sortDupaCheia = (prop) => (a, b) => typeof(a[prop])==='number'
             ? a[prop]-b[prop]
             : a[prop].localeCompare(b[prop]);
*/

let pNume = sortDupaCheia('nume');
let pValoare = sortDupaCheia('valoare');

function dupaNumeSiValoare(a, b){
  return pNume(a, b) || pValoare(a, b);
};

console.log(colectie.sort(dupaNumeSiValoare));
```

Această extindere ne permite să facem căutare după mult mai multe proprietăți pe care le compunem folosind operatorul `||`.

## Sortarea după dată calendaristică

```javascript

// ordonarea după data calendaristică - reducere la string
colectie.sort( (ob1, ob2) => {
  return new Date(ob1.data).valueOf() - new Date(ob2.data).valueOf();
});

// Sortare calendaristică după lună luând în considerare UTC
colectie.sort((ob1, ob2) => {
  let d1 = new Date(ob1.data);
  let d2 = new Date(ob2.data);
  if (d1.getUTCMonth() > d2.getUTCMonth()) {
    return 1;
  } else if (d1.getUTCMonth() < d2.getUTCMonth()) {
    return -1;
  } else {
    return d1.getUTCDate() - d2.getUTCDate();
  }
});

// sortarea după mai multe câmpuri de același tip
var colectie2 = [
  {nume: 'Gina',    valoare: "mere"},
  {nume: 'Dobrin',  valoare: "pere prune"},
  {nume: 'Dobrin',  valoare: "alune"},
  {nume: 'Nicolae', valoare: "măsline"},
  {nume: 'Pavel',   valoare: "harbuz"}
];
colectie2.sort((x, y) => {
  if (x.nume === y.nume) {
    return x.valoare < y.valoare ? -1 : 1;
  } else {
    return x.nume < y.nume ? -1 : 1;
  }
});
```

## Inversarea sortării

Mergând ceva mai departe, dacă extragem funcția separat, putem, la nevoie să inversăm rezultatul sortării.

```javascript
var arr = [-23, -2, 102, 3, -54];

function aranjament(x, y) {
  var jalon = 0;de la `0` o astfel de funcționalitate.

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
var colectie = [de la `0` o astfel de funcționalitate.

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

Algoritmul de sortare folosit se aseamnă cu `Bubble Sort`-ul. Dacă se dorește, poți face o implementare `Bubble Sort`. Parcurgerea codului pentru o astfel de sortare, va aduce mai multă lumină asupra algoritmului folosit de metoda `sort()`.

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

## Resurse

-   [JS: Interview Questions](http://khan4019.github.io/front-end-Interview-Questions/sort.html)
-   [Sorting algorithms in JavaScript, Posted on March 12, 2016](http://blog.benoitvallon.com/sorting-algorithms-in-javascript/sorting-algorithms-in-javascript/)
-   [How to Use Supercharged Sorts in JavaScript | Tobias Parent | freecodecamp.org](https://www.freecodecamp.org/news/supercharged-sorts-in-javascript/)
