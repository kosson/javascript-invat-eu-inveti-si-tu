# Precedența operatorilor

În programare există două mari categorii de operatori: operatorii **unari** și cei **binari**. Operatorii unari sunt acei operatori care se aplică unui singur operand. Operatorii binari sunt cei care implică doi operatori.

Ca și în cazul matematicii, operatorii au o anumită ordine, o anumită întâietate la evaluare a unora față de alții. Ne aducem aminte de la aritmetică că înmulțirea se face înaintea adunării și a scăderii.

Până acum v-am obișnuit cu unul care este indispensabil, cel care atribuire a valorilor `=` (semnul egal). Este operatorul care pur și simplu face legătura dintre valoare și numele sub care poate fi regăsită.

Haideți să pornim încetișor să vedem despre ce este vorba și pentru asta vom reveni la cele mai simple concepte ale operațiunilor matematice. Da. Știu. Mate! Da' promit că nu doare. Hai să vedem care-i treaba cu asociativitatea.

## Asociativitatea operatorilor

Este o proprietate care indică ordinea în care sunt procesați operatorii de același rang.

```javascript
1 + 2 + 3
```

Asociativitate stângă este atunci când grupezi termenii din partea stângă:

```javascript
(1 + 2) + 3
```

iar asociativitatea dreaptă este atunci când poți grupa termenii de la dreapta:

```javascript
1 + (2 + 3)
```

Asociativitatea dreaptă funcționează și pentru următorul exemplu:

```javascript
x = y = 1;
```

Ceea ce se petrece este asignarea valorii 1 lui y, iar y este asignat lui x.

## Precedența operatorilor

Modul în care se face evaluarea codului depinde în mod direct de precedența operatorilor și a felului cum aceștia decid, de fapt, valoarea finală. Precedența este ordinea în care se vor executa operațiunile. Orice limbaj de programare are o tabelă de precedență.

Vom porni de la cel mai important către cei cu prioritatea cea mai redusă.

## Operator de grupare

Acesta este cel mai important operator, fiind cel mai ridicat ca rang.

| Rang | Operator | trad. în rom. | sens evaluare | poziționare operanzi |
|:-- |:-- |:-- |:-- |:-- |
|20|Grouping|grupare|fără sens de evaluare| `__ (__) __` |

## Operatori de apel și instanțiere

| Rang | Operator | trad. în rom. | sens evaluare | poziționare operanzi |
|:-- |:-- |:-- |:-- |:-- |
|19|Member Access|accesarea membrilor|»»»| `__ . __` |
|19|Computed Member Access|accesarea membrilor dar în același timp computarea valorii expresiei|»»»| `__ [__]` |
|19|`new` (with arguments)|invocare a funcțiilor cu new și cu argumente|«««| `new __ (__)` |
|18|function call|apelul funcțiilor|»»»| `__ (...)` |
|18|`new` (without arguments)|invocare a funcțiilor cu new|«««| `new __` |

## Operatori unari ca sufixuri

| Rang | Operator | trad. în rom. | poziționare operanzi |
|:--|:--|:--|:--|
|17|postfix increment|incrementare post operațiune| `__ ++`|
|17|postfix decrement|decrementare post operațiune| `__ --`|

## Operatori unari ca prefixuri

| Rang | Operator | trad. în rom. | sens evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|16|logical NOT |inversarea valorii Boolean|«««| `! __` |
|16|bitwise NOT|complementul binar|«««| `~ __` |
|16|unary plus|plus unar|«««| `+ __` |
|16|unary negation|minusul unar|«««| `- __` |
|16|prefix increment|prefix de incrementare|«««| `++ __` |
|16|prefix decrement|prefix de decrementare|«««| `-- __` |
|16|`typeof`|tipul de|«««| `typeof __` |
|16|`void`|golire|«««| `void __` |
|16|`delete`|șterge|«««| `delete __` |

## Operatori aritmetici

| Rang | Operator | trad. în rom. | sens evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|15|exponentiation|ridicare la putere|«««| `__ ** __` |
|14|multiplication|înmulțire|»»»| `__ * __` |
|14|division|împărțire|»»»| `__ / __` |
|14|remainder|rest|»»»| `__ % __` |
|13|addition|adunare|»»»| `__ + __` |
|13|subtraction|scădere|»»»| `__ - __` |

## Operatori de lucru pe biți cu deplasare pe stânga și dreapta

| Rang | Operator | trad. în rom. | sens evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|12|bitwise left shift|deplasare pe biți spre stânga|»»»| `__ << __` |
|12|bitwise right shift|deplasare pe biți spre dreapta|»»»| `__ >> __` |
|12|bitwise unsigned right shift|deplasare pe biți spre dreapta prin completare cu zerouri la stânga și atribuire|»»»| `__ >>> __` |

## Operatori de comparație

| Rang | Operator | trad. în rom. | sens evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|11|less than|mai mic decât sau egal|»»»| `__ <= __` |
|11|greater than|mai mare decât|»»»| `__ > __` |
|11|greater than sau egal|mai mare decât sau egal|»»»| `__ >= __` |
|11|`in`|în cu sensul „din”|»»»| `__ in __` |
|11|`instanceof`|este instanță a|»»»| `__ instanceof __` |

## Operatori de egalitate și non-egalitate

| Rang | Operator | trad. în rom. | sens evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|10|equality|egalitate|»»»| `__ == __` |
|10|inequality|inegalitate|»»»| `__ != __` |
|10|strict equality|egalitate strictă|»»»| `__ === __` |
|10|strict inequality|egalitate strictă|»»»| `__ !== __` |

## Operatori pe biți - bitwise

| Rang | Operator | trad. în rom. | sens evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|9|bitwise AND|AND pe biți|»»»| `__ & __` |
|8|bitwise XOR|XOR pe biți|»»»| `__ ^ __` |
|7|bitwise OR|OR pe biți|»»»| `__` <code>&#124;</code> `__` |

## Operatori logici

| Rang | Operator | trad. în rom. | sens evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|6|logic AND|AND logic|»»»| `__ && __` |
|5|logic OR|OR logic|»»»| `__` <code>&#124;&#124;</code> `__` |

## Operatorii condiționali - operatorul ternar

| Rang | Operator | trad. în rom. | sens evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|4|equal|egal|«««| `__ ? __ : __` |

## Atribuire împreună cu operațiuni urmate de atribuire.

| Rang | Operator | Explicație | sens evaluare | poziționare operanzi |Ex.|
|:--|:--|:--|:--|:--|:--|
|3|egal|atribuie valoarea din dreapta identificatorului din stânga|«««| `__ = __` |`x = 10`|
|3|plus-egal|adună la valoarea curentă din stânga, valoarea precizată în dreapta|«««| `__ += __` |`x = x + y`|
|3|minus-egal|scade la valoarea curentă din stânga, valoarea precizată în dreapta|«««| `__ -= __` |`x = x - y`|
|3|putere-egal|ridică la putere valoarea curentă|«««| `__ **= __` |`x = x ** y`|
|3|înmulțire-egal|înmulțește cu valoarea curentă|«««| __ `*=` __ |x = x * y|
|3|împărțire-egal|împarte valoarea curentă din stânga|«««| __ `/=` __ |x = x / y|
|3|modulo-egal|modulo (aflarea restului de la împărțire) pe valoarea din stânga|«««| `__ %= __` |`x = x % y`|
|3|left shift assignment|deplasare la stânga|«««| `__ <<= __` |`x = x <<= y`|
|3|right shift assignment|deplasare la dreapta|«««| `__ =>> __` |`x = x =>> y`|
|3|Unsigned right shift assignment|deplasare spre dreapta prin introducerea la stânga de zerouri și apoi atribuire|«««| `__ >>>= __` |`x = x >>> y`|
|3|bitwise AND assignment |operează un `ȘI` (`AND`) pe biți urmat de atribuire|«««| `__ &= __` |`x = x & y`|
|3|bitwise XOR assignment|operează un `SAU EXCLUSIV` (`XOR`) pe biți cu atribuire|«««| `__ ^= __` |`x = x ^ y`|
|3|bitwise OR assignment|operează `OR` (`SAU`) pe biți cu atribuire|«««| `__` <code>&#124;=</code> `__` |`x = x` <code>&#124;=</code> `y`|

## comma, spread, yield:

| Rang | Operator | trad. în rom. | sens evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|2|yield|produ|«««| `yield __` |
|2|yield*|produ|«««| `yield* __` |
|1|spread|dispersie|nu există un sens| `... __` |
|0|comma|virgula|»»»| `__ , __` |
