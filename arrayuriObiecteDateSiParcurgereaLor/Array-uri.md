# Array-uri sau tablouri

Pentru că este mai simplu și în obișnuința multor programatori români să folosească cuvântul din engleză ca neologism acceptat de practica curentă, vom folosi și în acest material cuvântul array.

Array-ul este cel mai des întâlnit mecanism de a „prelua” date care vin ca efect al evaluării unei funcții, de exemplu.

## Descriere sumară

Array-urile conțin mai multe valori numite `elemente`.

Indexarea internă a elementelor atunci când nu este explicită, pornește de la 0.

| valoare | el1 | el2 | el3 |
|---------|:---:|:---:|:---:|
| index   |  0  |  1  |  2  |


## Lanțul prototipal al unui array:

Uneori este necesar să afli care este prototipul unei colecții de care nu ești sigur dacă este array curat sau array-like (asemănător-cu-array).

```javascript
var tablou = ['prima', 'a doua', 1, 2];

var protoTablou = Object.getPrototypeOf(tablou);
protoTablou // Array [  ]

var protoLaProtoTablou = Object.getPrototypeOf(protoTablou);
protoLaProtoTablou // Object { , 15 more… }

Object.getPrototypeOf(protoLaProtoTablou); // null
```

array --> Array.prototype --> Object.prototype --> null.

Colecțiile care sunt asemănătoare-cu-array-urile (array-like) vor avea un lanț mult mai scurt care indică Object.

arrayLike --> Object.prototype --> null.

## Mantre

- Array-urile sunt **obiecte** și poți adăuga proprietăți în array folosind notația dot `var a = [1,2]; a.i = 23; a.i // 23`. Valorile sunt adăugate indiferent că array-ul are un index numeric prestabilit. Ele sunt acolo.
- Orice obiect Array are o proprietate `length`
-cheia unei proprietăți al unui array se numește `index` al unui array (valorile dintre paranteze pătrate sunt convertite la string)
-o proprietate într-un array care este identificată printr-un index este numită `element`
-`Array` este un obiect intern limbajului JavaScript. Acesta este folosit pentru crearea array-urilor
-Array este un obiect iterabil pentru că obiectul prototip are o metodă @@iterator (precum String, TypedArray, Map și Set).

## Crearea array-urilor

### Este recomandată folosirea constructorului `Array`

```javascript
var prestabilit = Array(5); // Array [ <5 empty slots> ]

Array(5).join('-'); // "----"

[null, NaN, null, undefined].join('-'); // "-NaN--"
```

Dacă nu sunt menționate elementele array-ului, acesta va fi constituit din locuri goale, exact ca o sală de teatru goală. Toate scaunele poartă un număr, dar nu este nimeni așezat pe el.

#### Folosirea lui `Array.apply()` pentru crearea de array-uri „dense”.

Există un truc pentru a genera array-uri de o dimensiune fixă, dar care în loc să nu aibă elemente, să fie populată cu `undefined`.
Se folosește Function.prototype.apply(), care se poate invoca direct pe Array pentru că și Array, de fapt este o funcție.
Pentru aceasta contextul va fi stabilit la obiectul general (în cazul browserului este `window`) sau la `null`, iar drept argumente, va fi invocat Apply pasându-i-se numărul de elemente dorit:

```javascript
Array.apply(window, Array(5)); // Array [ undefined, undefined, undefined, undefined, undefined ] echivalent cu Array(5).fill()
Array.apply(null, Array(5)); // Array [ undefined, undefined, undefined, undefined, undefined ]
Array.apply(window, [1,,3]); // Array [ 1, undefined, 3 ]

Array.apply(window, Array(5)).map(function (x, y) { return y + 1; });  // [1, 2, 3, 4, 5]
Array.apply(null, Array(5)).map(Function.prototype.call.bind(Number)); // [0,1,2,3,4,5]

Array.apply(window, Array(26))
     .map( function (x,y){ return String.fromCharCode(y + 65); })
     .join(''); // "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// si versiunea ECMAScript 2015

[ for (i of Array.apply(window, Array(26)).map((x, y) => y))String.fromCharCode(65 + i) ].join(''); // "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
```

Acesta este un pont de la Brandon Benvie descoperit prin intermediul articolului lui Ariya Hidayat, [Sequences using JavaScript Array](https://ariya.io/2013/07/sequences-using-javascript-array).

#### Folosirea lui `fill()` pentru a crea array-uri dense (vezi `Array.prototype.fill()`)

Cu `fill()` se pot crea array-uri dense care să conțină valori:

```javascript
[1,2,3].fill();                  // Array [ undefined, undefined, undefined ] echivalent cu Array(3).fill()
Array(3).fill(4);                // [4, 4, 4]
[].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}
```

### Folosind constructorul: `new Array()`

```javascript
var tablou = new Array('abc','def'); // nu este o practică încurajată. A se evita.
console.log(tablou); // Array [ "abc", "def" ]
```
Poți prestabili dimensiunea array-ul. Dacă se poate, acest lucru conduce la eficientizarea alocării memoriei pentru array-uri.

```javascript
var test = new Array(5);
console.log(test); // Array [ <5 empty slots> ]
```

### Cu declararea simplă prin paranteze drepte: array literal

```javascript
var tablou = [1, 2, 3];
```

### Crearea unui array multidimensional

Realizarea array-urilor multidimensionale - array de array-uri

```javascript
var arrDeArr = [];                                                   // array-ul care le va conține pe celelalte (un array de array-uri)
for(var contorRanduri = 0; contorRanduri < 3; contorRanduri++) {     // adaugă în array-ul randuri
    arrDeArr[contorRanduri] = [];                                    // cate un array
    for (var contorColoane=0; contorColoane < 3; contorColoane++) {  // generat de bucla interna (ruleaza de 3 ori pentru fiecare iteratie externa)
        arrDeArr[contorRanduri][contorColoane] = '0';                // cu indexul setat de bucla externă (o singura valoare pentru 3 iteratii interne)
                                                                     // și cu 3 indexuri generate intern pentru care atribuie o valoare
    }
};
arrDeArr[0][2] = 'X';  // Arata ca o adresă [rand][coloana]
arrDeArr.forEach(function (arrDeArr) {
  console.log(arrDeArr.join(' '));
});
```

Codul de mai sus este perfect echivalent cu

```javascript
var arrDeArr = [ ['0','0','X'], ['0','0','0'], ['0','0','0'] ];
```

Numărul maxim de indici este 2^23 - 1.

## Indicii negativi

Indicii care sunt numere negative vor fi considerați chei pentru valori care pot fi introduse în obiectul Array.

```javascript
var tablou = [];
tablou[-1] = 'ceva în afară';
console.log(tablou); // Array [ ]
tablou[-1];          // ceva în afară
```

## Operatorul `in`

Operatorul `in` detectează dacă pentru valoare (indexul), există o valoare în array.

```javascript
var tablou = [0,1, ,2,4,"unu"];
3 in tablou; // true
2 in tablou; // false
```

## Ștergerea elementelor dintr-un array

Această metodă creează „goluri” în array. Proprietatea `length` nu va fi afectată.

```javascript
var tablou = [1,2,3,4];
delete tablou[2];
console.log(tablou); // Array [ 1, 2, <1 empty slot>, 4 ]
```

## Manipularea dimensiunii unui array folosind `length`

### `length` numără toate elementele array-ului chiar dacă acestea au și goluri.

```javascript
var tablou = [0,1,,3]; // conține un element lipsă
tablou.length; // 4
```

Pentru a număra câte elemente chiar există în array se va croi o funcție specializată:

```javascript
var tablou = [0,1,,3];

function numaraElementeReale(date){
  var contor = 0;
  date.forEach(function(){
    contor++;
  });
  return contor;
};

numaraElementeReale(tablou); // 3
```

### Creșterea lungimii array-ului prin introducerea valorii

```javascript
var tablou = ['x', 'y'];
tablou.length = 3;
// în acest moment ceea ce s-a întâmplat este că a fost introdus un slot gol în array.
```

### Scăderea dimensiunii unui array menționând length

Se poate face simplu prin:

```javascript
var tablou = ['unu', 'doi', 'trei', 'patru'];
tablou.length;        // 4
tablou.length = 2;
tablou.length;        // 2
console.log(tablou);  // Array [ "unu", "doi" ]
```

### Curățarea unui array - resetarea sa la zero.

```javascript
var tablou = ['unu', 'doi', 'trei', 'patru'];
tablou.length;        // 4
tablou.length = 0;
console.log(tablou);  // Array [  ]
// mai simplu este suprascrierea cu un array gol
tablou = [];
```

### Resetarea array-urilor partajate la 0 - varianta distructivă și cea nedistructivă

Resetarea la 0 a array-urilor dacă se face cu length, cei care accesează acel array vor avea surpriza unuia gol.

```javascript
var tablou = ['prima', 'a doua'];
var altTablou = tablou;

tablou.length = 0;

tablou; // []
altTablou; // []
```

Folosirea resetării prin inițializarea variabilei cu un array gol, nu afectează alte referințe. Acestea vor păstra arrayul preexistent.

```javascript
var tablou = ['prima', 'a doua', 1, 2];
var altTablou = tablou;

tablou = [];

tablou; // []
altTablou; // Array [ "prima", "a doua", 1, 2 ]
```

## Tratarea array-urilor după felul lor: sparse sau dense.

Array-urile care au goluri se numesc „sparse”. Un array care nu are goluri se numește „dense”.

```javascript
// array sparce
var arrayCuGoluri = [1,,3,4];

// array dense
var arrayDens = [1,2,3,4];
Array(4).fill(); // Array [undefined, undefined, undefined, undefined]
```

### Trecerea peste goluri

#### forEach()

```javascript
['prima',, 1, 2].forEach(function(element, index){
  console.log(index + ' -> ' + element);
});
// 0 -> prima
// 2 -> 1
// 3 -> 2
```

#### every() trece peste goluri
#### some() trece peste goluri
#### map() sare peste goluri, dar le păstrează

```javascript
['prima',, 1, 2].map(function(currentValue, index){
  return currentValue + ' -> ' + index;
});
// Array [ "prima -> 0", <1 empty slot>, "1 -> 2", "2 -> 3" ]
```

### filter() elimină golurile

```javascript
['prima',, 1, 2].filter(function(x){return true});
Array [ "prima", 1, 2 ];
```

### join() convertește golurile, undefined și null la stringul pasat în join.

```javascript
['prima',,1,2].join('X');
// "primaXX1X2"
```
### sort() păstrează golurile
### Bucla for...in listează cheile array-ului (acestea sunt un superset al indicilor array-ului)
### apply()

```javascript
for (var key in ['prima',,1,2]){ console.log(key); }; // 0 2 3
```

## Completarea unui array existent

```javascript
var primul = [1,2,3];
var alDoilea = [4,5,6];

Array.prototype.push.apply(primul, alDoilea);
console.log(primul); // Array [ 1, 2, 3, 4, 5, 6 ]
```

O altă soluție

```javascript
var a = [1,2,3,7,8,9];

var b = [4,5,6]; var insertIndex = 3;

a.splice.apply(a, Array.concat(insertIndex, 0, b));
```

## Shuffle pentru conținutul unui array

```javascript
var colectie = [1,2,3,'unu','doi','trei'];

colectie = colectie.sort(function(){return Math.random() - 0.5});

colectie; // Array [ 3, 1, "doi", 2, "unu", "trei" ]
```

## Destructurarea array-urilor

Destructurarea este un procedeu care are drept scop extragerea sau manipularea valorilor asignându-le unor variabile.

```javascript
var arr = ['unu', 'doi'];
var [unu, doi] = arr;

console.log(unu, doi); // unu doi
```

Un alt exemplu este cel de potrivire unu-la-unu

```javascript
var unu, doi, trei;
[unu, doi, trei] = [1, 2, 3];
console.log(unu, doi, trei); // 1 2 3
```

Potrivirea unu-la-unu funcționează și în cazul returnării unui array.

```javascript
function genArray(){
  return ['unu', 'doi', 'trei'];
};
[x, y, z] = genArray();
console.log(x, y, z); // unu doi trei
```

Valori implicite:

```javascript
var x, y, z;
[x = 1, y = 2, z = 3] = [1000];
console.log(x, y, z); // 1000 2 3
```

Inversare de valori:

```javascript
var x = 10, y = 1000;
[x, y] = [y, x];
console.log(x, y); // 1000 10
```

Folosirea operatorului rest (`...`)

```javascript
var [x, ...restop] = [1, 2, 3];
console.log(x, restop); // 1 și Array [ 2, 3 ]
```

Tot ce generează un array, folosindu-se această sintaxă, se poate transforma în legături la identificatori, adică valorile array-ului se pot asigna unor variabile ce sunt elementele unui alt array.
