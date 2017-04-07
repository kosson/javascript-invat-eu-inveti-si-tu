# Precedența operatorilor

Ca și în cazul matematicii, operatorii au o anumită ordine, o anumită întâietate la evaluare a unora față de alții. Ne aducem aminte de la aritmetică că înmulțirea se face înaintea adunării și a scăderii.

Și în cazul limbajelor de programare avem de-a face cu operatori care vor determina cum ca fi evaluat codul din stânga operatorului cu cel din dreapta operatorului.

## Asociativitatea

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

Modul în care se face evaluarea codului depinde în mod direct de precedența operatorilor și a felului cum aceștia decid, de fapt, valoarea finală.

În ordinea importanței avem primii trei ca importanță capitală:

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|0|comma|virgula|stânga-spre-dreapta| __ `,` __ |
|1|spread|dispersie|nu există un sens| `...` __ |
|2|yield|produ|dreapta-spre-stânga| `yield` __ |
|2|yield*|produ|dreapta-spre-stânga| `yield*` __ |

Apoi urmează operatorii care realizează o atribuire sau o operațiune și o atribuire.

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|3|equal|egal|dreapta-spre-stânga| __ `=` __ |
|3|plus-equal|incrementează-cu-asignare|dreapta-spre-stânga| __ `+=` __ |
|3|minus-equal|minus-cu-asignare|dreapta-spre-stânga| __ `-=` __ |
|3|power-equal|ridicare-la-putere-cu-asignare|dreapta-spre-stânga| __ `**=` __ |
|3|times-equal|înmulțește-cu-asignare|dreapta-spre-stânga| __ `*=` __ |
|3|divide-equal|împarte-cu-asignare|dreapta-spre-stânga| __ `/=` __ |
|3|modulo-equal|cât-cu-asignare|dreapta-spre-stânga| __ `%=` __ |
|3|bitwise-equal|bitwise-cu-asignare|dreapta-spre-stânga| __ `<<=` __ |
|3|||dreapta-spre-stânga| __ `=>>` __ |
|3|||dreapta-spre-stânga| __ `>>>=` __ |
|3|||dreapta-spre-stânga| __ `&=` __ |
|3|||dreapta-spre-stânga| __ `^=` __ |
|3|||dreapta-spre-stânga| __ `pipe=` __ |

Operatorii condiționali - operatorul ternar

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|4|equal|egal|dreapta-spre-stânga| __ `?` __ `:` __ |

Operatori logici

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|5|logic OR|OR logic|stânga-spre-dreapta| __ `pipe pipe` __ |
|6|logic AND|AND logic|stânga-spre-dreapta| __ `&&` __ |

Operatori pe biți

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|7|bitwise OR|OR pe biți|stânga-spre-dreapta| __ `pipe` __ |
|8|bitwise XOR|XOR pe biți|stânga-spre-dreapta| __ `^` __ |
|9|bitwise AND|AND pe biți|stânga-spre-dreapta| __ `&` __ |

Operatori de egalitate și non-egalitate

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|10|equality|egalitate|stânga-spre-dreapta| __ `==` __ |
|10|inequality|inegalitate|stânga-spre-dreapta| __ `!=` __ |
|10|strict equality|egalitate strictă|stânga-spre-dreapta| __ `===` __ |
|10|strict inequality|egalitate strictă|stânga-spre-dreapta| __ `!==` __ |

Operatori de comparație

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|11|less than|mai mic decât|stânga-spre-dreapta| __ `<` __ |
|11|less than|mai mic decât sau egal|stânga-spre-dreapta| __ `<=` __ |
|11|greater than|mai mare decât|stânga-spre-dreapta| __ `>` __ |
|11|greater than sau egal|mai mare decât sau egal|stânga-spre-dreapta| __ `>=` __ |
|11|in|în cu sensul „din”|stânga-spre-dreapta| __ `in` __ |
|11|instanceof|este instanță a|stânga-spre-dreapta| __ `instanceof` __ |

Operatori de lucru pe biți cu deplasare pe stânga și dreapta

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|12|bitwise left shift|deplasare pe biți spre stânga|stânga-spre-dreapta| __ `<<` __ |
|12|bitwise right shift|deplasare pe biți spre dreapta|stânga-spre-dreapta| __ `>>` __ |
|12|bitwise unsigned right shift|deplasare pe biți spre dreapta|stânga-spre-dreapta| __ `>>>` __ |

Operatori aritmetici

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|13|addition|adunare|stânga-spre-dreapta| __ `+` __ |
|13|subtraction|scădere|stânga-spre-dreapta| __ `-` __ |
|14|multiplication|înmulțire|stânga-spre-dreapta| __ `*` __ |
|14|division|împărțire|stânga-spre-dreapta| __ `/` __ |
|14|remainder|rest|stânga-spre-dreapta| __ `%` __ |
|15|exponentiation|rest|dreapta-spre-stânga| __ `**` __ |

Operatori unari ca prefixuri

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|16|logical NOT|logic NOT|dreapta-spre-stânga| `!` __ |
|16|bitwise NOT|bitwise NOT|dreapta-spre-stânga| `~` __ |
|16|unary plus|plus unar|dreapta-spre-stânga| `+` __ |
|16|unary negation|negare unară|dreapta-spre-stânga| `-` __ |
|16|prefix increment|prefix de incrementare|dreapta-spre-stânga| `++` __ |
|16|prefix decrement|prefix de decrementare|dreapta-spre-stânga| `--` __ |
|16|typeof|tipul de|dreapta-spre-stânga| `typeof` __ |
|16|void|golire|dreapta-spre-stânga| `void` __ |
|16|delete|șterge|dreapta-spre-stânga| `delete` __ |

Operatori unari ca postfixuri

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:--|:--|:--|:--|:--|
|17|postfix increment|incrementare post operațiune|fără sens de evaluare| __ `++`|
|17|postfix decrement|decrementare post operațiune|fără sens de evaluare| __ `--`|

Operatori de apel și instanțiere

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:-- |:-- |:-- |:-- |:-- |
|18|function call|apelul funcțiilor|stânga-spre-dreapta| __ `(...)`|
|18|new (without arguments)|invocare a funcțiilor cu new|dreapta-spre-stânga| `new` __ |

Operatori de apel și instanțiere

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:-- |:-- |:-- |:-- |:-- |
|19|Member Access|accesarea membrilor|stânga-spre-dreapta| __ `.` __ |
|19|Computed Member Access|accesarea membrilor dar în același timp computarea valorii expresiei|stânga-spre-dreapta| __ `[__]` |
|19|new (with arguments)|invocare a funcțiilor cu new|fără sens de evaluare| `new` __ `(__)` |

Operator de grupare

| Ordin de precedență | Operator | trad. în rom. | sensul de evaluare | poziționare operanzi |
|:-- |:-- |:-- |:-- |:-- |
|20|Grouping|accesarea membrilor|fără sens de evaluare| __ `(__)` __ |

TODO: Termină de scris precedența operatorilor
