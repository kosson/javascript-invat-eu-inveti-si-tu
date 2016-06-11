# Generalități

Array-urile conțin mai multe valori numite elemente.
Indexarea internă a elementelor atunci când nu este explicită, pornește de la 0.

| valoare | el1 | el2 | el3 |
|---------|:---:|:---:|:---:|
| index   |  0  |  1  |  2  |

## Mantre
- Array-urile sunt **obiecte** și poți adăuga proprietăți în array folosind notația dot `var a = [1,2]; a.i = 23; a.i // 23`. Valorile sunt adăugate indiferent că array-ul are un index numeric prestabilit. Ele sunt acolo.
- cheia unei proprietăți al unui array se numește `index` al unui array (valorile dintre paranteze pătrate sunt convertite la string)
- o proprietate într-un array care este identificată printr-un index este numită `element`
- `Array` este un obiect intern limbajului JavaScript. Acesta este folosit pentru crearea array-urilor
- Array este un obiect iterabil pentru că obiectul prototip are o metodă @@iterator (precum String, TypedArray, Map și Set).

## Crearea array-urilor

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
var arrDeArr = [];                                                      // array-ul care le va conține pe celelalte (un array de array-uri)

for(var contorRanduri = 0; contorRanduri < 3; contorRanduri++) {       // adaugă în array-ul randuri

    arrDeArr[contorRanduri] = [];                                       // cate un array

    for (var contorColoane=0; contorColoane < 3; contorColoane++) {    // generat de bucla interna (ruleaza de 3 ori pentru fiecare iteratie externa)
        arrDeArr[contorRanduri][contorColoane] = '0';                   // cu indexul setat de bucla externă (o singura valoare pentru 3 iteratii interne)
                                                                        // și cu 3 indexuri generate intern pentru care atribuie o valoare
    }
}

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

Operatorul `in` detectează dacă o valoare care reprezintă un index are o valoare în array

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

## `length` numără toate elementele array-ului chiar daca acestea sunt goale

```js
var tablou = [0,1,,3];
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

## Creșterea lungimii array-ului prin introducerea valorii

```js
var tablou = ['x', 'y'];
tablou.length = 3;
// în acest moment ceea ce s-a întâmplat este că a fost introdus un slot gol în array.
```

## Scăderea dimensiunii unui array menționând length

Se poate face simplu prin

```js
var tablou = ['unu', 'doi', 'trei', 'patru'];
tablou.length;        // 4
tablou.length = 2;
tablou.length;        // 2
console.log(tablou);  // Array [ "unu", "doi" ]
```

## Curățarea unui array - resetarea sa la zero.

```js
var tablou = ['unu', 'doi', 'trei', 'patru'];
tablou.length;        // 4
tablou.length = 0;
console.log(tablou);  // Array [  ]
// mai simplu este suprascrierea cu un array gol
tablou = [];
```

## Resetarea array-urilor partajate la 0 - varianta distructivă și cea nedistructivă

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

## Tratarea array-urilor după sparse sau dense.

Array-urile care au goluri se numesc „sparse”. Un array care nu are goluri se numește „dense”.

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
