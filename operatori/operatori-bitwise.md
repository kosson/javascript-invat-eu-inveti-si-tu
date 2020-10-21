# Operatorii de lucru pe biți - bitwise

Acești operatori sunt ceva mai speciali, fiind posibil să nu-i întâlniți în practică decât foarte rar. Nu-i vom trata mai prejos pentru că este posibil să aveți nevoie de a manipula valori la nivelul cel mai de jos al reprezentării acestora.

Care este acest nivel? Reprezentarea ca un număr binar pe 32 de biți care ține seama și de semnul numărului întreg. Pentru a înțelege mai bine, mai bine facem o mică incursiune în sistemele de numerație.

## Sisteme de numerație

Hai să ne readucem aminte că noi zi de zi folosim sistemul zecimal (baza este fragmentarea în grupe de câte zece cu multiplii acestora) pentru cantități și operațiunile curente; de la numărarea banilor, până la calcularea distanțelor. Cifrele sistemului zecimal sunt: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`. Ce înseamnă baza 10? Hai să vedem. Cum putem reprezenta un număr, de exemplu: **2310**?

2`*`10<sup>3</sup> `+` 3`*`10<sup>2</sup> `+` 3`*`10<sup>1</sup>+0

Dar acest sistem de numerație nu este singurul cunoscut de omenire. Un altul este sistemul hexazecimal, a cărui bază este 16, fiind folosit în reprezentarea multor valori în programare. Simbolurile folosite sunt:

`0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F`, unde literele țin locul astfel: `A` = 10, `B` = 11, `C` = 12, `D` = 13, `E` = 14, `F` = 15.

Cel cu care vom lucra folosind operatorii bitwise, este sistemul binar, care reprezintă valorile prin șiruri de `0` și `1`. Computerul nu pricepe altceva decât stările logice `0` și `1`. Întrebarea corectă este cum am putea reprezenta un număr zecimal în echivalentul său binar? Pentru a face acest lucru trebuie să împarți numărul zecimal la doi succesiv.

De exemplu, 27:

27 / 2 = 13 * 2 + 1;
13 / 2 = 6 * 2  + 1;
6 / 2 = 3 * 2   + 0;
3 / 2 = 1 * 2   + 1;

Pornind de jos reconstituim valoarea binară: 11011. Observă faptul că am adăugat un `1` în capul seriei binare din oficiu și am citit de jos în sus.

11011
43210 - reprezentând puterea la care ridici 2

Verificarea:

1`*`2<sup>4</sup> `+` 1`*`2<sup>3</sup> `+` 0 `+` 1`*`2<sup>1</sup> `+` 1`*`2<sup>0</sup> `=` 16 + 8 + 0 + 2 + 1 = 27.

În cazul nostru vom folosi un sistem care operează cu secvențe de 32 de biți. Aceste șiruri de biți reprezintă datele într-un calculator. Transformările în și din biți se fac în spatele scenei cu ajutorul unor algoritmi de codificare.

## Bitwise AND (`&`)

Acest operator returnează valoarea `1` pentru fiecare poziție a unui bit dacă ambii operanți au valoarea `1`.

```javascript
const a = 25;
console.log((a >>> 0).toString(2)); // 11001
const b = 3432;
console.log((b >>> 0).toString(2)); // 110101101000
console.log(a & b); // 8 care în binar este: 1000
console.log((a & b).toString(2)); // 1000
```

Pentru a vedea ce s-a petrecut este îndeajuns să aliniem reprezentările binare și pentru fiecare pereche să aplicăm operatorul `&`.

       11001 &
110101101000
       01000 adică valoarea lui 8 în binar

## Bitwise AND cu atribuire (`&=`)

Acest operator face același lucru precum bitwise AND cu diferența că nu mai folosește un a doua variabilă, iar la final rezultatul operațiunii este atribuit variabilei `a`.

```javascript
let a = 25;
console.log((a >>> 0).toString(2)); // 11001
console.log(a &= 3432); // 8 care în binar este: 1000
console.log(a.toString(2)); // 1000
```

## Bitwise NOT (`~`)

Acest operator face o inversare a biților operandului.

```javascript
const a = 5;     // 0000000000000101
const b = -3;    // 1111111111111101

console.log(~a); // 1111111111111010
// rezultat: -6

console.log(~b); // 0000000000000010
// rezultat: 2
```

## Bitwise OR (`||`)

Operatorul va seta la valoarea `1` doar dacă ambii biți au valoarea `1` sau dacă doar unul singur are valoarea `1`.

```javascript
const a = 5;        // 00000000000000000000000000000101
const b = 3;        // 00000000000000000000000000000011

console.log(a | b); // 00000000000000000000000000000111
// rezultat: 7
```

## Bitwise OR assignment (`|=`)

Acest operator face același lucru precum bitwise OR cu diferența că nu mai folosește un a doua variabilă, iar la final rezultatul operațiunii este atribuit variabilei `a`.

```javascript
let a = 5;      // 00000000000000000000000000000101
a |= 3;         // 00000000000000000000000000000011

console.log(a);
```

## Bitwise XOR (^)

Operațiunea returnează `1` doar dacă unul din operanzi este `1`, dar nu amândoi.

```javascript
const a = 5;        // 00000000000000000000000000000101
const b = 3;        // 00000000000000000000000000000011

console.log(a ^ b); // 00000000000000000000000000000110
// rezultatul așteptat este 6
```

## Bitwise XOR assignment (^=)

Acest operator face același lucru precum bitwise XOR cu diferența că nu mai folosește un a doua variabilă, iar la final rezultatul operațiunii este atribuit variabilei `a`.

```javascript
let a = 5;      // 00000000000000000000000000000101
a ^= 3;         // 00000000000000000000000000000011

console.log(a);
```

## Resurse

- [How to convert a binary string into a readable string and vice versa with Javascript](https://ourcodeworld.com/articles/read/380/how-to-convert-a-binary-string-into-a-readable-string-and-vice-versa-with-javascript)
