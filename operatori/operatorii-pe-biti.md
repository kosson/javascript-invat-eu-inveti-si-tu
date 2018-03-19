# Operatorii de lucru pe biți - bitwise

Acești operatori sunt ceva mai speciali și este posibil să vă întâlniți rar în practică cu ei. Este posibil să aveți nevoie de a manipula valori chiar la nivelul cel mai de jos al reprezentării acestora și pentru acest lucru acești operatori sunt foarte importanți.

Primul contact cu acești operatori este exemplul care are ca scop obținerea canalelor de roșu, verde și albastru pentru o culoare a cărei valoare o ai în notație hexazecimal.

```javascript
var hex = 'ffaadd';
var rgb = parseInt(hex, 16); // avem valoarea 1675421
var red   = (rgb >> 16) & 0xFF; // returneaza 255
var green = (rgb >> 8) & 0xFF;  // 170
var blue  = rgb & 0xFF;		      // 221
```

Nivelul de lucru este cel mai de jos posibil pentru un limbaj de programare de nivel înalt așa cum este JavaScript. Observăm că operăm cu reprezentări ale numerelor ca binare pe 32 de biți. Pentru a înțelege mai bine, facem o mică incursiune în sistemele de numerație.

## Sisteme de numerație

Hai să ne readucem aminte că noi zi de zi folosim sistemul zecimal (baza este fragmentarea în grupe de câte zece cu multiplii acestora) în cuantificare și operațiunile curente de la numărarea banilor, până la calcularea distanțelor.
Cifrele sistemului zecimal: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`.

Ce înseamnă baza 10? Hai să vedem. Cum putem reprezenta un număr, de exemplu: **2310**?

2`*`10<sup>3</sup> `+` 3`*`10<sup>2</sup> `+` 3`*`10<sup>1</sup>+0

Dar acest sistem de numerație nu este singurul cunoscut de omenire.

Un altul este sistemul hexazecimal, al cărui bază este 16 și care este folosit în reprezentarea mai multor valori în programare. Simbolurile folosite sunt:

`0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F`, unde literele țin locul astfel: `A` = 10, `B` = 11, `C` = 12, `D` = 13, `E` = 14, `F` = 15.

Cel cu care vom lucra folosind operatorii bitwise, este sistemul binar, care reprezintă valorile prin șiruri de `0` și `1`. Computerul la nivelul de bază, nu pricepe altceva decât stările logice 0 și 1.
În JavaScript poți reprezenta un număr în formatul său binar cu formula `0b` urmată de succesiunea binară.

Întrebarea corectă este cum ajungi la reprezentarea un număr zecimal în echivalentul său binar? Pentru a face acest lucru trebuie să împarți numărul zecimal la doi succesiv până când restul este 0 sau 1.

De exemplu, 27.

```javascript
27 / 2 = 13 * 2 + 1;
13 / 2 = 6 * 2  + 1;
6 / 2 = 3 * 2   + 0;
3 / 2 = 1 * 2   + 1;
```

Pornind de jos reconstituim valoarea binară: **11011**.

11011
43210 - reprezentând exponentul puterii la care ridici 2

Verificarea:

1`*`2<sup>4</sup> `+` 1`*`2<sup>3</sup> `+` 0 `+` 1`*`2<sup>1</sup> `+` 1`*`2<sup>0</sup> `=` 16 + 8 + 0 + 2 + 1 = 27.

```javascript
0b11011; // 27
```

În cazul nostru vom folosi un sistem care operează cu secvențe de 32 de biți. Aceste șiruri de biți reprezintă datele într-un calculator. Transformările în și din biți se fac în spatele scenei cu ajutorul unor algoritmi de codificare.

Acești operatori vor fi folosiți pe valori care sunt numere întregi pe 32 de biți. De fapt la momentul când se folosesc acești operatori, se face o conversie la un număr pe 32 de biți și abia apoi se face operațiunea.

Sistemul actual de reprezentare a numerelor întregi pentru sistemele de calcul existente este numit **complement față de doi** a unui număr pentru care se poate memora și semnul (are bit de semn: bitul cel mai semnificativ este fie 1 însemnând că valoarea este pozitivă, fie 0 care înseamnă că valoarea este negativă). **Complement față de doi** înseamnă că valoarea maximă reprezentată merge pe axa pozitivă dar și pe cea negativă. În JavaScript avem o plajă de la -2147483648 la 2147483647.

Mai trebuie menționat un lucru foarte important. Atunci când vine vorba de lucrul cu valori numerice în JavaScript, acestea sunt de tip float, nu integer.

## Not `~`

Este un operator unar care inversează toți biții operandului și returnează un număr.

```javascript
~'0xDF'; // -224 (+'0xDF' este 223)
```

Acest operator are comportamentul unui mic algoritm. Ceea ce face este să ia numărul întreg pozitiv, îi adaugă o unitate și îi schimbă semnul.

```javascript
console.log(~-2); // 1
console.log(~0); // -1
~30; // -31
// lucru direct pe valori binare
console.log(~0b11011); // -28
```

Folosirea succesivă a operatorului NOT poate servi ca mecanism rapid de trunchiere a numerelor. Este preferabil ca viteză folosirii lui `Math.trunc()` sau `Math.floor()`.

```javascript
console.log(~~4.3245); // 4
console.log(~~-34.23); // -34
```

Poți să-l folosești și pentru a determina dacă un element este într-un array sau nu.

```javascript
if(~elemente.indexOf('ceva')) {
  // dacă e -1 spune evaluarea, înseamnă că nu e
  // dacă e 0, atunci elementul este.
};
```

## And `&`

Operatorul va converti valorile în corespondentul binar și va returna un număr care va avea 1 la toate pozițiile corespondente la parcurgerea bit cu bit.

```javascript
10..toString(2); //  1010
parseInt('1010', 2); // 10
20..toString(2); // 10100
10 & 20; // 0
```

## Or `|`

Operatorul va converti valorile în corespondent binar și va returna un număr binar pentru care va lua poziție cu poziție din fiecare binar al numerelor reprezentate și dacă una este 1, acesta va fi luat în considerare pentru a compune noul binar.

```javascript
10 | 20; // (11110) este returnat 30
//  1010
// 10100
```

Poate fi folosit cu succes pentru a trunchia numerele cu virgulă.

```javascript
var x = 49.345;
x | 0; // 49
```

## XOR (eXclusive OR)

Operatorul ia în calcul biții care sunt 1, dar nu și dacă există corespondent tot 1 în celălalt număr binar.

```javascript
10 ^ 15; // (0101) este returnat 5
// 1010
// 1111
1 ^ 0; // 1
true ^ true; // 0
```

## Operatori pentru deplasare pe biți

Operatorii pentru deplasare au doi operanzi. Primul, cel din stânga indică valoarea care trebuie „deplasată” iar cel din dreapta operatorului este valoarea care indică cu cât să „deplasezi” biții.

Efectul operatorului indiferent de sensul său este să transforme valoarea într-una pe 32 de biți iar după ce face transformarea, să returneze o valoare de același tip cu cea originală.

### Deplasare pe biți spre stânga `<<`

În exemplul prezentat, reprezentarea pe 32 de biți a numărului întreg 2 va fi deplasat cu 1 poziție spre stânga. În cazul în care biții fiind mutați spre stânga și sunt prea mulți, aceștia vor fi pur și simplu vor dispărea.

```javascript
// hai să aflăm numărul în binar
2..toString(2); // 10
// ca număr pe 32 de biți
// 00000000000000000000000000000010
2 << 1; // echivalent 2 ori 2
// 00000000000000000000000000000100
// observă că secvența „10” s-a
// deplasat spre stânga cu o poziție
parseInt('100', 2); // 4
```

Se observă că a face un singur left shift este echivalent cu înmulțirea valorii zecimale cu doi.

Poți trunchia valori cu virgulă.

```javascript
var x = 49.345;
x >> 0; // 49
```

### Deplasare pe biți spre dreapta `>>`

În cazul deplasării spre dreapta, avem o mică mențiune privind semnul pentru că cel mai din stânga bit, dă semnul numărului întreg reprezentat pe cei 32 de biți. Pentru că biții se vor mișca spre dreapta, bitul semnificativ, care dă semnul își va păstra poziția propagându-se și pentru noul întreg reprezentat.

```javascript
4 >> 1; // echivalent cu 4 împărțit la 2
8 >> 4; // 0
16 >> 4; // 1
32 >> 4; // 2
```

Se observă că a face un singur right shift este echivalent cu înpărțirea valorii zecimale cu doi și rotunjirea rezultatului la pragul inferior.

Poți trunchia valori cu virgulă.

```javascript
var x = 49.345;
x << 0; // 49
```

### Deplasare pe biți spre dreapta prin completare cu zerouri la stânga și atribuire `>>>`

Poți trunchia valori cu virgulă.

```javascript
var x = 49.345;
x >>> 0; // 49
```
