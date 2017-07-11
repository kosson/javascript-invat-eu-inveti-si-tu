# Symbol

Symbol este o proprietate a obiectului global. Nu trebuie folosit cu `new` iar la apelarea ca funcție, va returna o nouă valoare symbol. Dacă i se pasează un argument care nu este undefined, acest argument va fi un șir de caractere care va avea rolul de descriptor pentru noul simbol creat.

Pe scurt, un simbol este un șir de caractere, care este asociat cheii unei proprietăți a unui obiect.

Evaluarea funcției `Symbol()` este o valoare de tip `symbol`.

```javascript
var unSimbol = Symbol('simbol01');
typeof unSimbol; // "symbol"
```

Spune standardul că valoarea pentru slotul intern [\[Prototype]] a lui Symbol este `funcția-obiect internă` a cărui slot intern [\[Prototype]] este obiectul prototype a lui Object.

Tot standardul aduce lămuriri în ceea ce privește câteva aspecte care țin de bucătăria motoarelor JavaScript, dar care ne vor face nouă o imagine a contextului. Motorul de căutare înainte de a porni evaluarea codului construiește în „culise” o listă goală dedicată tuturor simbolurilor care vor fi create. Lista aceasta poate fi înțeleasă ca un registru. Chiar se numește **GlobalSymbolRegistry** și este o listă disponibilă tuturor tărâmurilor care ar putea fi; e o listă globală.

Structura unei singure înregistrări din acest registru este cheie (un șir de caractere) - simbol (un simbol).

## De ce avem nevoie de Symbol?

Pentru că un simbol este unic și nu poate fi modificat.

```javascript
console.log(Symbol('ceva') === Symbol('ceva')); // false
```

## Unde folosim simboluri?

Pentru a avea chei cu adevărat unice pentru proprietățile unui obiect și oriunde avem nevoie de identificatori unici.
