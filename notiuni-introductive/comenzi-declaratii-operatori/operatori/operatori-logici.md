# Operatorii logici

## Operatorul de negare `!`

Acest operator este folosit atunci când dorești să inversezi evaloarea unei anumite valori din punct de vedere Boolean. Știm că toate valorile în JavaScript se pot evalua din punct de vedere al valorii de adevăr.

```javascript
!1; // false
```

Ceea ce s-a întâmplat este că motorul JS a văzut operatorul și a evaluat valoarea de adevăr a lui 1. Știm că pentru 1, valoarea de adevăr este `true`. Negat, aceasta va deveni `false`.

La nevoie poți nega negația `!!true`.

## Operatorul logic ȘI - `&&`

Este un operator care spune firului de execuție că pentru a continua o anumită condiție trebuie să satisfacă două condiții (ambele condiții să fie evaluate la rândul lor la `true`).
Dacă una dintre condiții nu este întrunită, întreaga evaluare este false iar execuția va urma traseul `false`.

## Operatorul logi OR - `||`

Folosirea acestui operator spune firului de execuție că cel puțin una dintre condiții trebuie să fie satisfăcută.
