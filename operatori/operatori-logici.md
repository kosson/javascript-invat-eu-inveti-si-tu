# Operatorii logici

## Operatorul de negare `!`

Acest operator este folosit atunci când dorești să inversezi evaloarea unei anumite valori din punct de vedere Boolean. Știm că toate valorile în JavaScript se pot evalua din punct de vedere al valorii de adevăr.

```javascript
!1; // false
```

Ceea ce s-a întâmplat este că motorul JS a văzut operatorul și a evaluat valoarea de adevăr a lui 1. Știm că pentru 1, valoarea de adevăr este `true`. Negat, aceasta va deveni `false`.

La nevoie poți nega negația `!!true`.

## Operatorul logic ȘI - `&&` (AND)

Este un operator care spune firului de execuție că pentru a continua o anumită condiție trebuie să satisfacă două condiții (ambele condiții să fie evaluate la rândul lor la `true`).
Dacă una dintre condiții nu este întrunită, întreaga evaluare este false iar execuția va urma traseul `false`.

## Operatorul logic ORI - `||` (OR)

Folosirea acestui operator spune firului de execuție că cel puțin una dintre condiții trebuie să fie satisfăcută.

În cazul lui OR, JavaScript evaluează doar primul operand iar dacă acesta este *truthy*, nu va mai fi evaluat și cel de-al doilea operand. Evaluarea este pur și simplu scurt-circuitată pentru eficiență.
Atenție la cazul în care poate ai dori evaluarea celui de-al doilea operand. Acest lucru nu se va întâmpla câtă vreme primul este *truthy*. Poate fi considerat acest comportament și ca un mecanism selectiv de incrementare a unei variabile, de exemplu. Depinde de necesități.

```javascript
var x = false, y = 0;
x || y++;
console.log(y);
```

Același mecanism este aplicat și în cazul lui AND (`&&`).
Acest comportament permite o uzanță des întâlnită în programare pentru inițializarea unui obiect dacă acesta nu există deja.

```javascript
const obi = obi || {nume: "obiect important"};
```

În cazul nostru, obiectul `obi` ca operand este evaluat la o valoare `truthy` (toate obiectele la evaluare returnează `truthy`), dacă există deja, adică dacă a fost instanțiat. În acest caz literalul care instanția obiectul nu mai este evaluat.
