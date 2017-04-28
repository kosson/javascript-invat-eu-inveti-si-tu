# Precedența operatorilor

Ce sunt operatorii?
Sunt valorile care intră în evaluarea unei expresii.
Ce sunt operanzii?
Sunt semne grafice care indică ce operațiune se va efectua la momentul evaluării. Aceste semne grafice sunt semnele operațiunilor matematice, aceștia fiind o parte din ei.

Să ne amintim că expresiile sunt constituite din înșiruirea de operanzi și operatori.

În programare există două mari categorii de operatori: operatorii unari și cei binari. Operatorii unari sunt acei operatori care se aplică unui singur operand. Operatorii binari sunt cei care implică doi operatori.

Ca și în cazul matematicii, operatorii au o anumită ordine, o anumită întâietate la evaluare a unora față de alții. Ne aducem aminte de la aritmetică că înmulțirea se face înaintea adunării și a scăderii.

Până acum v-am obișnuit cu unul care este indispensabil, cel care atribuire a valorilor `=` (semnul egal). Este operatorul care pur și simplu face legătura dintre valoare și numele sub care poate fi regăsită.

Haideți să pornim încetișor să vedem despre ce este vorba și pentru asta vom reveni la cele mai simple concepte ale operațiunilor matematice. Da, știu, mate, dar promit că nu doare. Hai să vedem care-i treaba cu asociativitatea.

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

## Operator de grupare

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:-- |:-- |:-- |:-- |:-- |
|20|Grouping|accesarea membrilor|fără sens de evaluare| __ `(__)` __ |

## Operatori de apel și instanțiere

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:-- |:-- |:-- |:-- |:-- |
|19|Member Access|accesarea membrilor|stânga-spre-dreapta| __ `.` __ |
|19|Computed Member Access|accesarea membrilor dar în același timp computarea valorii expresiei|stânga-spre-dreapta| __ `[__]` |
|19|new (with arguments)|invocare a funcțiilor cu new|fără sens de evaluare| `new` __ `(__)` |
|18|function call|apelul funcțiilor|stânga-spre-dreapta| __ `(...)`|
|18|new (without arguments)|invocare a funcțiilor cu new|dreapta-spre-stânga| `new` __ |

## Operatori unari ca postfixuri

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|17|postfix increment|incrementare post operațiune|fără sens de evaluare| __ `++`|
|17|postfix decrement|decrementare post operațiune|fără sens de evaluare| __ `--`|

## Operatori unari ca prefixuri

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|16|logical NOT|inversarea valorii Boolean|dreapta-spre-stânga| `!` __ |
|16|bitwise NOT|complementul binar|dreapta-spre-stânga| `~` __ |
|16|unary plus|plus unar|dreapta-spre-stânga| `+` __ |
|16|unary negation|minusul unar|dreapta-spre-stânga| `-` __ |
|16|prefix increment|prefix de incrementare|dreapta-spre-stânga| `++` __ |
|16|prefix decrement|prefix de decrementare|dreapta-spre-stânga| `--` __ |
|16|typeof|tipul de|dreapta-spre-stânga| `typeof` __ |
|16|void|golire|dreapta-spre-stânga| `void` __ |
|16|delete|șterge|dreapta-spre-stânga| `delete` __ |

## Operatori aritmetici

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|15|exponentiation|rest|dreapta-spre-stânga| __ `**` __ |
|14|multiplication|înmulțire|stânga-spre-dreapta| __ `*` __ |
|14|division|împărțire|stânga-spre-dreapta| __ `/` __ |
|14|remainder|rest|stânga-spre-dreapta| __ `%` __ |
|13|addition|adunare|stânga-spre-dreapta| __ `+` __ |
|13|subtraction|scădere|stânga-spre-dreapta| __ `-` __ |

## Operatori de lucru pe biți cu deplasare pe stânga și dreapta

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|12|bitwise left shift|deplasare pe biți spre stânga|stânga-spre-dreapta| __ `<<` __ |
|12|bitwise right shift|deplasare pe biți spre dreapta|stânga-spre-dreapta| __ `>>` __ |
|12|bitwise unsigned right shift|deplasare pe biți spre dreapta prin completare cu zerouri la stânga și atribuire|stânga-spre-dreapta| __ `>>>` __ |

## Operatori de comparație

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|11|less than|mai mic decât|stânga-spre-dreapta| __ `<` __ |
|11|less than|mai mic decât sau egal|stânga-spre-dreapta| __ `<=` __ |
|11|greater than|mai mare decât|stânga-spre-dreapta| __ `>` __ |
|11|greater than sau egal|mai mare decât sau egal|stânga-spre-dreapta| __ `>=` __ |
|11|in|în cu sensul „din”|stânga-spre-dreapta| __ `in` __ |
|11|instanceof|este instanță a|stânga-spre-dreapta| __ `instanceof` __ |

## Operatori de egalitate și non-egalitate

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|10|equality|egalitate|stânga-spre-dreapta| __ `==` __ |
|10|inequality|inegalitate|stânga-spre-dreapta| __ `!=` __ |
|10|strict equality|egalitate strictă|stânga-spre-dreapta| __ `===` __ |
|10|strict inequality|egalitate strictă|stânga-spre-dreapta| __ `!==` __ |

## Operatori pe biți - bitwise

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|9|bitwise AND|AND pe biți|stânga-spre-dreapta| __ `&` __ |
|7|bitwise OR|OR pe biți|stânga-spre-dreapta| __ <code>&#124;</code> __ |
|8|bitwise XOR|XOR pe biți|stânga-spre-dreapta| __ `^` __ |

## Operatori logici

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|6|logic AND|AND logic|stânga-spre-dreapta| __ `&&` __ |
|5|logic OR|OR logic|stânga-spre-dreapta| __ <code>&#124;&#124;</code> __ |

## Operatorii condiționali - operatorul ternar

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|4|equal|egal|dreapta-spre-stânga| __ `?` __ `:` __ |

## Atribuire împreună cu operațiuni urmate de atribuire.

| Ordin de precedență | Operator | Explicație | sensul de evaluare | poziționare operanzi |Mai clar|
|:--|:--|:--|:--|:--|:--|
|3|equal|atribuie valoarea din dreapta identificatorului din stânga|dreapta-spre-stânga| __ `=` __ |x = 10|
|3|plus-equal|adună la valoarea curentă din stânga, valoarea precizată în dreapta|dreapta-spre-stânga| __ `+=` __ |x = x + y|
|3|minus-equal|scade la valoarea curentă din stânga, valoarea precizată în dreapta|dreapta-spre-stânga| __ `-=` __ |x = x - y|
|3|power-equal|ridică la putere valoarea curentă|dreapta-spre-stânga| __ `**=` __ |x = x ** y|
|3|times-equal|înmulțește cu valoarea curentă|dreapta-spre-stânga| __ `*=` __ |x = x * y|
|3|divide-equal|împarte valoarea curentă din stânga|dreapta-spre-stânga| __ `/=` __ |x = x / y|
|3|modulo-equal|modulo (aflarea restului de la împărțire) pe valoarea din stânga|dreapta-spre-stânga| __ `%=` __ |x = x % y|
|3|left shift assignment|deplasare la stânga|dreapta-spre-stânga| __ `<<=` __ |x = x <<= y||
|3|right shift assignment|deplasare la dreapta|dreapta-spre-stânga| __ `=>>` __ |x = x =>> y|
|3|Unsigned right shift assignment|deplasare spre dreapta prin introducerea la stânga de zerouri și apoi atribuire|dreapta-spre-stânga| __ `>>>=` __ |x = x >>> y|
|3|bitwise AND assignment |operează un `ȘI` (`AND`) pe biți urmat de atribuire|dreapta-spre-stânga| __ `&=` __ |x = x & y|
|3|bitwise XOR assignment|operează un `SAU EXCLUSIV` (`XOR`) pe biți cu atribuire|dreapta-spre-stânga| __ `^=` __ |x = x ^ y|
|3|bitwise OR assignment|operează `OR` (`SAU`) pe biți cu atribuire|dreapta-spre-stânga| __ <code>&#124;=</code> __ |x = x <code>&#124;=</code> y|

## comma, spread, yield:

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|0|comma|virgula|stânga-spre-dreapta| __ `,` __ |
|1|spread|dispersie|nu există un sens| `...` __ |
|2|yield|produ|dreapta-spre-stânga| `yield` __ |
|2|yield*|produ|dreapta-spre-stânga| `yield*` __ |
