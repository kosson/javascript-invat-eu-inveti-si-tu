# Operatorii de lucru pe biți - bitwise

Acești operatori sunt ceva mai speciali și este posibil să nu vă întâlniți niciodată în practică cu ei. Nu-i vom trata mai prejos pentru că este posibil să aveți nevoie de a manipula valori chiar la nivelul cel mai de jos al reprezentării acestora.

Care este acest nivel? Reprezentarea ca un număr binar pe 32 de biți. Pentru a înțelege mai bine, facem o mică incursiune în sistemele de numerație.

## Sisteme de numerație

Hai să ne readucem aminte că noi zi de zi folosim sistemul zecimal (baza este fragmentarea în grupe de câte zece cu multiplii acestora) în cuantificare și operațiunile curente de la numărarea banilor, până la calcularea distanțelor.
Cifrele sistemului zecimal: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`.

Ce înseamnă baza 10? Hai să vedem. Cum putem reprezenta un număr, de exemplu: **2310**?

2`*`10<sup>3</sup> `+` 3`*`10<sup>2</sup> `+` 3`*`10<sup>1</sup>+0

Dar acest sistem de numerație nu este singurul cunoscut de omenire.

Un altul este sistemul hexazecimal, a cărui bază este 16 și care este folosit în reprezentarea multor valori în programare. Simbolurile folosite sunt:

`0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F`, unde literele țin locul astfel: `A` = 10, `B` = 11, `C` = 12, `D` = 13, `E` = 14, `F` = 15.

Cel cu care vom lucra folosind operatorii bitwise, este sistemul binar, care reprezintă valorile prin șiruri de `0` și `1`. Computerul nu pricepe altceva decât stările logice 0 și 1. Întrebarea corectă este cum am putea reprezenta un număr zecimal în echivalentul său binar? Pentru a face acest lucru trebuie să împarți numărul zecimal la doi succesiv.

De exemplu, 27.

27 / 2 = 13 * 2 + 1;
13 / 2 = 6 * 2  + 1;
6 / 2 = 3 * 2   + 0;
3 / 2 = 1 * 2   + 1;

Pornind de jos reconstituim valoarea binară: 11011.

11011
43210 - reprezentând puterea la care ridici 2

Verificarea:

1`*`2<sup>4</sup> `+` 1`*`2<sup>3</sup> `+` 0 `+` 1`*`2<sup>1</sup> `+` 1`*`2<sup>0</sup> `=` 16 + 8 + 0 + 2 + 1 = 27.

În cazul nostru vom folosi un sistem care operează cu secvențe de 32 de biți. Aceste șiruri de biți reprezintă datele într-un calculator. Transformările în și din biți se fac în spatele scenei cu ajutorul unor algoritmi de codificare.
