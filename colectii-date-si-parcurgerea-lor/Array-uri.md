# Array-uri - tablouri, vectori

Această structură capabilă să țină valori este cel mai folosit atunci când suntem confruntați cu nevoia de a prelucra fragmente de date sau pentru a „memora” temporar valori utile unui anumit context în care se execută codul.

Array-ul este cel mai des întâlnit mecanism de a „prelua” date care vin ca efect al evaluării unei funcții, de exemplu.

În literatura românească de specialitate veți întâlni adesea denumirea de tablou. Pentru că este mai simplu și în obișnuința multor programatori români să folosească cuvântul din engleză ca neologism acceptat de practica curentă, vom folosi și în acest material cuvântul array.

În comunitatea profesională array-ul mai este întâlnit și sub denumirea de listă sau vector.

## Descriere

Array-urile conțin mai multe valori numite `elemente` care sunt ordonate cu niște chei numite indecși de pornesc numărătoarea de la 0.
De fapt, aflăm ce este un array în JavaScript verificând cu `typeof`.

```javascript
typeof []; // "object"
```

## Natura unui array

Este un obiect. Este o structură care poate „agrega” date indiferent de tipul lor, pe care le structurează după un sistem de indexare care pornește de la 0 atunci când indecșii nu sunt menționați explicit. Pentru a introduce o valoare se va folosi sintaxa cu paranteze pătrate.

```javascript
var colectie = [];
colectie[0] = 'el1';
colectie[1] = 'el2';
colectie[2] = 'el3';
```

Structura generată arată astfel:

| valoare | el1 | el2 | el3 |
|---------|:---:|:---:|:---:|
| index   |  0  |  1  |  2  |

Pentru că este foarte util, poți afla dimensiunea unui array foarte rapid prin utilizarea lui `length`.

```javascript
[1,2,3].length; // 3
```

Pe cale de consecință putem afla indexul ultimului element scăzând 1 din numărul returnat la evaluarea lui `length`. Da, ai intuit perfect. Trebuie făcut acest lucru pentru că indecșii array-ului pornesc de la valoarea 0.

## Shadowing

Arrayurile sunt structuri care își pot modifica structura chiar dacă identitatea rămâne neschimbată și spunem că pot suferi mutații. Folosind sufixul `[]`, este posibil să modificăm elementele interne.

```javascript
var arr = [1, 2];
arr[1] = 5; console.log(arr); // [1, 5]
```

Un pas mai departe decât modificarea simplă a unui element, ar fi necesar sî vedem cum se petrece acest lucru în cazul mediilor lexicale (scope) create de funcții. Avem un prim caz, în care, în mediul lexical format de o funcție, se face o reasignare a identificatorului (`rebounding`), care până la momentul reasignării trimitea și el tot către arr.

```javascript
var arr = [1, 2, 3];
(function (a) {
  a = [2, 3, 4];
})(arr); console.log(arr); // [1, 2, 3]
```

Ca și în cazul „umbririi” simple, se va folosi sufixul `[]` pentru a modifica valorile array-ului original.

```javascript
var arr = [1, 2, 3];
(function (a) {
  a[0] = 10;
})(arr); console.log(arr); // [ 10, 2, 3 ]
```

În cazul array-urilor, valorile sunt copiate prin referință. Acest lucru este util de reținut atunci când în array-uri se vor introduce funcții, de exemplu - o colecție de funcții. Acestea vor fi referențiate și nu declarate direct în array.

```javascript
var faCeva = function () {
  return function () {console.log('salut');};
};
var actiune = faCeva(); // actiune este funcția returnată
var arr = [actiune];
// acum testul
arr[0] === actiune; // true
```

Rezultatul este `true` pentru că valoarea evaluată a expresiei `arr[0]` este actiune, care la rândul său ține valoarea evaluată a invocării lui `faCeva()`.

## Ștergerea unei valori

În regulă, ai introdus sau ai deja un array cu valori, dar ai nevoie să ștergi din acest array o valoare. Pentru acest lucru există un cuvânt rezervat dedicat: `delete`.

```javascript
delete colectie[2];
```

Uneori array-urile sunt compuse de elemente care la rândul lor sunt array-uri. În acest caz vorbim de array-uri multidimensionale.

```javascript
var multidimensional = [[23,10,4],['a','b']];
```

Întrebarea care se pune în acest moment este cum accesezi o valoare dintr-un array care este de fapt un element al unui array? Pentru a răspunde acestei întrebări trebuie să ne imaginăm locația unei valori ca pe o adresă: București, Uverturii, 90. Ce-ar fi dacă am transcrie adresa ca o interogare într-un array în JavaScript? Ar așa: `adresa[București][Uverturii][90]`. Nu trebuie să te lași furat de structura liniară a sintaxei. De fapt, se face o accesare în adâncime a unei locații, ca și cum am desface o păpușă rusească Matrioșca:
`adresa[București][Uverturii][90]`

```javascript
var multidimensional = [['unu','doi',[1, 2]], true];
multidimensional[0][2][1]; // 2
```

Un bun exemplu, care să dovedească utilitatea unui array multidimensional, ar fi sistemul de coordonate cartezian. Dacă am asemui array-urile cu matricile, am găsi că array-urile multidimensionale seamănă cu matricile de matrici.

Un array poate conține și expresii care **vor fi evaluate** ănainte vreme ca array-ul să fie folosit.

```javascript
var arr = [1 + 2, 4, (2 - 1) + 2]; console.log(arr); // [ 3, 4, 3 ]
```

**Moment Zen**: fiecare array este în sine o entitate distinctă.

```javascript
[1, 2, 3] === [1, 2, 3]; // false
['a', 'b', 'c'] === ['a', 'b', 'c']; // false
```

## Verificări

Am indicat mai sus faptul că verificarea unui array cu `typeof` are drept rezultat tipul obiect. Deci este clară natura adâncă a acestui tip de structură. Ce ce ar mai fi foarte util de verificat în lucrul cu array-uri:

1. există un anume index?
2. care este valoarea indexului pentru o anumită valoare?

Pentru a verifica dacă un index cu o valoare anume există în array poți folosi operatorul `in` pentru că un array, de fapt, este un obiect iar indecșii sunt cheile lui.

```javascript
1 in ['a', 'b', 'c']; // true
```

Pentru aceeași verificare poți folosi și metoda dedicată `includes()`. Acesteia îi pasezi la argumente valoarea pe care vrei să o verifici. Răspunsul va fi `true` sau `false`.

```javascript
['a', 'b', 'c'].includes('b');
```

Apoi dacă ai verificat că o cheie există, poți obține indexul pentru o valoare știută.

```javascript
['a', 'b', 'c'].indexOf('b'); // 1
```

Pentru mai multe operațiuni care trec de scopul unor verificări, va trebui să consultați metodele pe care obiectul intern `Array` (care, de fapt, îmbracă orice array), le pune la dispoziție.

Mai sunt și metode general accesibile pe care le poți aplica, iar cel mai rapid exemplu, care vă va fi util adesea, este metoda globală `toString()`. Aceasta transformă un array într-un șir de fragmente de text despărțite prin virgule.

```javascript
['a', 'b', 'c'].toString(); // "a,b,c"
```

## Lanțul prototipal al unui array:

Uneori este necesar să afli care este prototipul unei colecții de care nu ești sigur dacă este array curat sau array-like (asemănător-cu-array).

```javascript
var tablou = ['prima', 'a doua', 1, 2];

var protoTablou = Object.getPrototypeOf(tablou);
protoTablou; // Array [  ]
var protoLaProtoTablou = Object.getPrototypeOf(protoTablou);
protoLaProtoTablou; // Object { , 15 more… }

Object.getPrototypeOf(protoLaProtoTablou); // null
```

Structura lanțului ar fi: `array` --> `Array.prototype` --> `Object.prototype` --> `null`.

Colecțiile care sunt **asemănătoare-cu-array-urile** (array-like), vor avea un lanț mult mai scurt care-l indică la cap pe `Object`.

Structura lanțului ar fi: `arrayLike` --> `Object.prototype` --> `null`.

## Mantre

- Array-urile sunt **obiecte** și poți adăuga proprietăți în array folosind notația dot `var a = [1,2]; a.i = 23; a.i // 23`. Valorile sunt adăugate indiferent că array-ul are un index numeric prestabilit. Ele sunt acolo.
- Orice obiect Array are o proprietate `length`
-cheia unei proprietăți al unui array se numește `index` al unui array (valorile dintre paranteze pătrate sunt convertite la string)
-o proprietate într-un array care este identificată printr-un index este numită `element`
-`Array` este un obiect intern limbajului JavaScript. Acesta este folosit pentru crearea array-urilor
-Array este un obiect iterabil pentru că obiectul prototip are o metodă @@iterator (precum String, TypedArray, Map și Set).

## Crearea array-urilor

Cel mai adesea vei întâlni array-uri create prin forma literală mult mai simplă ca practică (`[]`).

```javascript
var colectie = [];
```

Este recomandată și folosirea constructorului `Array` pentru motivul principal că poți controla dimensiunea și acest lucru este foarte important din motive de performanță.

```javascript
var prestabilit = Array(5); // Array [ <5 empty slots> ]
Array(5).join('-'); // "----"
[null, NaN, null, undefined].join('-'); // "-NaN--"
```

Dacă nu sunt menționate elementele array-ului, acesta va fi constituit din locuri goale, exact ca o sală de teatru goală. Toate scaunele poartă un număr, dar nu este nimeni așezat pe el.
Pentru introducerea elementelor în array se va folosi metoda `push(elemVal)`, care va „împinge” valorile în ordinea implicită.

```javascript
var colectie = [];
colectie.push('el1');
colectie.push('el2');
colectie.push('el3');
```

#### Folosirea lui `Array.apply()` pentru crearea de array-uri „dense”.

Există un truc pentru a genera array-uri de o dimensiune fixă, dar care în loc să nu aibă elemente, să fie populată cu `undefined`.
Se folosește `Function.prototype.apply()`, care se poate invoca direct pe `Array` pentru că și `Array`, de fapt este o funcție.
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

### Crearea unui array multidimensional

Realizarea array-urilor multidimensionale - array de array-uri

```javascript
var arrDeArr = [];                                                   // array-ul care le va conține pe celelalte (un array de array-uri)
for(var contorRanduri = 0; contorRanduri < 3; contorRanduri++) {     // adaugă în array-ul randuri
    arrDeArr[contorRanduri] = [];                                    // cate un array
    for (var contorColoane=0; contorColoane < 3; contorColoane++) {  // generat de bucla interna (ruleaza de 3 ori pentru fiecare iteratie externa)
      arrDeArr[contorRanduri][contorColoane] = '0';
      // cu indexul setat de bucla externă (o singura valoare pentru 3 iteratii interne)
      // și cu 3 indexuri generate intern pentru care atribuie o valoare
    }
};
arrDeArr[0][2] = 'X';  // Arata ca o adresă [rand][coloana]
arrDeArr.forEach(function (arrDeArr) {
  console.log(arrDeArr.join(' '));
});
```

Exemplul de mai sus este perfect echivalent cu următoarea structură de cod.

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

### Scăderea dimensiunii unui array menționând `length`

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

Resetarea la 0 a array-urilor dacă se face cu `length`. Cine va accesa acel array va avea surpriza unuia gol.

```javascript
var tablou = ['prima', 'a doua'];
var altTablou = tablou;
tablou.length = 0;
tablou; // []
altTablou; // []
```

Folosirea resetării prin inițializarea variabilei cu un array gol, nu afectează alte referințe. Acestea vor păstra array-ul preexistent.

```javascript
var tablou = ['prima', 'a doua', 1, 2];
var altTablou = tablou;
tablou = [];
tablou; // []
altTablou; // Array [ "prima", "a doua", 1, 2 ]
```

## Tratarea array-urilor după felul lor: **sparse** sau **dense**.

Array-urile care au goluri se numesc „sparse”. Un array care nu are goluri se numește „dense”.

```javascript
// array sparce
var arrayCuGoluri = [1,,3,4];
// array dense
var arrayDens = [1,2,3,4];
Array(4).fill(); // Array [undefined, undefined, undefined, undefined]
```

### Trecerea peste goluri

#### Parcurgere cu `forEach()`

```javascript
['prima',, 1, 2].forEach(function(element, index){
  console.log(index + ' -> ' + element);
});
// 0 -> prima
// 2 -> 1
// 3 -> 2
```

#### `every()` trece peste goluri
#### `some()` trece peste goluri
#### `map()` sare peste goluri, dar le păstrează

```javascript
['prima',, 1, 2].map(function(currentValue, index){
  return currentValue + ' -> ' + index;
});
// Array [ "prima -> 0", <1 empty slot>, "1 -> 2", "2 -> 3" ]
```

### `filter()` elimină golurile

```javascript
['prima',, 1, 2].filter(function(x){return true});
Array [ "prima", 1, 2 ];
```

### `join()` convertește golurile, iar valorile `undefined` și `null` la stringul pasat în join.

```javascript
['prima',,1,2].join('X');
// "primaXX1X2"
```
### `sort()` păstrează golurile
### Bucla `for...in` listează cheile array-ului (acestea sunt un superset al indicilor array-ului)
### `apply()`

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
var a = [1,2,3,7,8,9],
    b = [4,5,6],
    insertIndex = 3;
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
console.log(unu, doi); // 'unu' 'doi'
```

### Potrivire unu-la-unu

```javascript
var unu, doi, trei;
[unu, doi, trei] = [1, 2, 3];
console.log(unu, doi, trei); // 1 2 3
```

### Potrivirea unu-la-unu cu unu array returnat

```javascript
function genArray(){
  return ['unu', 'doi', 'trei'];
};
[x, y, z] = genArray();
console.log(x, y, z); // unu doi trei
```

### Valori implicite

```javascript
var x, y, z;
[x = 1, y = 2, z = 3] = [1000];
console.log(x, y, z); // 1000 2 3
```

### Inversare de valori

```javascript
var x = 10, y = 1000;
[x, y] = [y, x];
console.log(x, y); // 1000 10
```

### Folosirea cu Regex

```javascript
let [data, an, luna, zi] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('1912-12-3');
```

Ceea ce s-a întâmplat este că ai scăpat de sarcina de a crea un array intermediar din care să extragi indice su indice.

### Folosirea operatorului rest (`...`)

```javascript
var [x, ...restop] = [1, 2, 3];
console.log(x, restop); // 1 și Array [ 2, 3 ]
```

Tot ce generează un array, folosindu-se această sintaxă, se poate transforma în legături la identificatori, adică valorile array-ului se pot asigna unor variabile ce sunt elementele unui alt array.
