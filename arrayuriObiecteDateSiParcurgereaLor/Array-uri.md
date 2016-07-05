# Generalități

Array-urile conțin mai multe valori numite elemente.
Indexarea internă a elementelor atunci când nu este explicită, pornește de la 0.

| valoare | el1 | el2 | el3 |
|---------|:---:|:---:|:---:|
| index   |  0  |  1  |  2  |


## Lanțul prototipal al unui array:

Uneori este necesar să afli care este prototipul unei colecții de care nu ești sigur dacă este array curat sau array-like (asemănător-cu-array).

```js
var tablou = ['prima', 'a doua', 1, 2];

var protoTablou = Object.getPrototypeOf(tablou);
protoTablou // Array [  ]

var protoLaProtoTablou = Object.getPrototypeOf(protoTablou);
protoLaProtoTablou // Object { , 15 more… }

Object.getPrototypeOf(protoLaProtoTablou); // null
```

tablou --> Array.prototype --> Object.prototype --> null.

Colecțiile care sunt asemănătoare-cu-array-urile vor avea un lanț mult mai scurt care indică Object.

arrayLike --> Object.prototype --> null.

TODO: scrie cod pentru exemplificare


## Mantre

- Array-urile sunt **obiecte** și poți adăuga proprietăți în array folosind notația dot `var a = [1,2]; a.i = 23; a.i // 23`. Valorile sunt adăugate indiferent că array-ul are un index numeric prestabilit. Ele sunt acolo.
- cheia unei proprietăți al unui array se numește `index` al unui array (valorile dintre paranteze pătrate sunt convertite la string)
- o proprietate într-un array care este identificată printr-un index este numită `element`
- `Array` este un obiect intern limbajului JavaScript. Acesta este folosit pentru crearea array-urilor
- Array este un obiect iterabil pentru că obiectul prototip are o metodă @@iterator (precum String, TypedArray, Map și Set).

## Crearea array-urilor

### Folosirea lui Array ca funcție (este recomandat)

```js
var prestabilit = Array(5); // Array [ <5 empty slots> ]

Array(5).join('-'); // "----"

[null, NaN, null, undefined].join('-'); // "-NaN--"
```

Dacă nu sunt menționate elementele array-ului, acesta va fi constituit din locuri goale, exact ca o sală de teatru goală. Toate scaunele poartă un număr, dar nu este nimeni așezat pe el.

#### Folosirea lui `Array.apply` pentru crearea de array-uri dense

Există un truc pentru a genera array-uri de o dimensiune fixă, dar care în loc să nu aibe elemente, să fie populată cu `undefined`.
Se folosește Function.prototype.apply(), care se poate invoca direct pe Array pentru că și Array, de fapt este o funcție.
Pentru aceasta contextul va fi stabilit la obiectul general (în cazul browserului este `window`) sau la `null`, iar drept argumente, va fi invocat Apply pasându-i-se numărul de elemente dorit:

```js
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

Cu fill() se pot crea array-uri dense care să conțină valori:

```js
[1,2,3].fill();                  // Array [ undefined, undefined, undefined ] echivalent cu Array(3).fill()
Array(3).fill(4);                // [4, 4, 4]
[].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}
```

### Folosind constructorul: `new Array()`

```js
var tablou = new Array('abc','def'); // nu este o practică încurajată. A se evita.
console.log(tablou); // Array [ "abc", "def" ]
```
Poți prestabili dimensiunea array-ul. Dacă se poate, acest lucru conduce la eficientizarea alocării memoriei pentru array-uri.

```js
var test = new Array(5);
console.log(test); // Array [ <5 empty slots> ]
```

### Cu declararea simplă prin paranteze drepte: array literal

```js
var tablou = [1, 2, 3];
```

### Crearea unui array multidimensional

Realizarea array-urilor multidimensionale - array de array-uri

```js
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

```js
var arrDeArr = [ ['0','0','X'], ['0','0','0'], ['0','0','0'] ];
```

Numărul maxim de indici este 2^23 - 1.

## Indicii negativi

Indicii care sunt numere negative vor fi considerați chei pentru valori care pot fi introduse în obiectul Array.

```js
var tablou = [];
tablou[-1] = 'ceva în afară';
console.log(tablou); // Array [ ]
tablou[-1];          // ceva în afară
```

## Operatorul `in`

Operatorul `in` detectează dacă pentru valoare (indexul), există o valoare în array.

```js
var tablou = [0,1, ,2,4,"unu"];
3 in tablou; // true
2 in tablou; // false
```

## Ștergerea elementelor dintr-un array

Această metodă creează „goluri” în array. Proprietatea `length` nu va fi afectată.

```js
var tablou = [1,2,3,4];
delete tablou[2];
console.log(tablou); // Array [ 1, 2, <1 empty slot>, 4 ]
```

## Manipularea dimensiunii unui array folosind `length`

### `length` numără toate elementele array-ului chiar daca acestea au și goluri

```js
var tablou = [0,1,,3]; // conține un element lipsă
tablou.length; // 4
```

Pentru a număra câte elemente chiar există în array se va croi o funcție specializată:

```js
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

```js
var tablou = ['x', 'y'];
tablou.length = 3;
// în acest moment ceea ce s-a întâmplat este că a fost introdus un slot gol în array.
```

### Scăderea dimensiunii unui array menționând length

Se poate face simplu prin:

```js
var tablou = ['unu', 'doi', 'trei', 'patru'];
tablou.length;        // 4
tablou.length = 2;
tablou.length;        // 2
console.log(tablou);  // Array [ "unu", "doi" ]
```

### Curățarea unui array - resetarea sa la zero.

```js
var tablou = ['unu', 'doi', 'trei', 'patru'];
tablou.length;        // 4
tablou.length = 0;
console.log(tablou);  // Array [  ]
// mai simplu este suprascrierea cu un array gol
tablou = [];
```

### Resetarea array-urilor partajate la 0 - varianta distructivă și cea nedistructivă

Resetarea la 0 a array-urilor dacă se face cu length, cei care accesează acel array vor avea surpriza unuia gol.

```js
var tablou = ['prima', 'a doua'];
var altTablou = tablou;

tablou.length = 0;

tablou; // []
altTablou; // []
```

Folosirea resetării prin inițializarea variabilei cu un array gol, nu afectează alte referințe. Acestea vor păstra arrayul preexistent.

```js
var tablou = ['prima', 'a doua', 1, 2];
var altTablou = tablou;

tablou = [];

tablou; // []
altTablou; // Array [ "prima", "a doua", 1, 2 ]
```

## Tratarea array-urilor după felul lor: sparse sau dense.

Array-urile care au goluri se numesc „sparse”. Un array care nu are goluri se numește „dense”.

```js
// array sparce
var arrayCuGoluri = [1,,3,4];

// array dense
var arrayDens = [1,2,3,4];
Array(4).fill(); // Array [undefined, undefined, undefined, undefined]
```

### forEach() trece peste goluri

```js
['prima',, 1, 2].forEach(function(element, index){
  console.log(index + ' -> ' + element);
});
// 0 -> prima
// 2 -> 1
// 3 -> 2
```

### every() trece peste goluri
### some() trece peste goluri
### map() sare peste goluri, dar le păstrează

```js
['prima',, 1, 2].map(function(currentValue, index){
  return currentValue + ' -> ' + index;
});
// Array [ "prima -> 0", <1 empty slot>, "1 -> 2", "2 -> 3" ]
```

### filter() elimină golurile

```js
['prima',, 1, 2].filter(function(x){return true});
Array [ "prima", 1, 2 ];
```

### join() convertește golurile, undefined și null la stringul pasat în join.

```js
['prima',,1,2].join('X');
// "primaXX1X2"
```
### sort() păstrează golurile
### Bucla for...in listează cheile array-ului (acestea sunt un superset al indicilor array-ului)
### apply()

```js
for (var key in ['prima',,1,2]){ console.log(key); }; // 0 2 3
```

## Completarea unui array existent

```js
var primul = [1,2,3];
var alDoilea = [4,5,6];

Array.prototype.push.apply(primul, alDoilea);
console.log(primul); // Array [ 1, 2, 3, 4, 5, 6 ]
```

O altă soluție

```js
var a = [1,2,3,7,8,9];

var b = [4,5,6]; var insertIndex = 3;

a.splice.apply(a, Array.concat(insertIndex, 0, b));
```

## Shuffle pentru conținutul unui array

```js
var colectie = [1,2,3,'unu','doi','trei'];

colectie = colectie.sort(function() return Math.random() - 0.5);

colectie
```
