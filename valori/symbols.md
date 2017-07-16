# Symbols

Este un tip de date introdus de ECMAScript 2015. Un `Symbol` este unic și nu poate fi modificat (este „immutable”). Acest nou tip de date nu este nici obiect și nici șir de caractere (string). Este ceva cu totul și cu totul nou.

Poate fi folosit ca și identificator al proprietăților unui obiect. Sintaxa este `Symbol([descriere])`, unde descriere este un șir de caractere, care poate fi folosit în scopuri de depanare.

ATENȚIE! De fiecare dată când descriptorul este același, pentru două simboluri diferite, se vor crea două simboluri diferite.

```javascript
var simbol1 = Symbol('ceva');
var simbol2 = Symbol('ceva');

Symbol('ceva') === Symbol('ceva');
```

ATENȚIE! Un symbol nu se va crea folosind `new`. Această încercare va avea drept rezultat afișarea unei erori: `TypeError`.

Ca și string și number vine cu propriul obiect ambalaj `Symbols`.
Se aseamănă cu String.,

```javascript
var simbolNou = Symbol();
typeof simbolNou; // "symbol"
```

Registrul global pentru symbols ține evidența acestora folosindu-se de o cheie numită, evident `key`. Această cheie va fi folosită și ca descriere atunci când simbolurile care sunt create sunt introduse în registrul global (este cel care acționează peste tot la momentul rulării codului).

Există două metode prin care poți adăuga un `Symbol` în registrul global:
- `Symbol.for(key)` și
- `Symbol.keyFor(symbol)`

```javascript
Symbol.for('test') === Symbol.for('test'); // true
```

Simbolurile pot fi privite ca niște etichete distincte care pot fi setate și accesate. Aceste etichete sunt autodescriptive, adică ceea ce introduci, șirul de caractere introdus, este și descrierea sa.

```javascript
let totem = Symbol.for("ursul carpatin");
Symbol.keyFor(totem);
```

Unul dintre simbolurile folosite extensiv este `Symbol.iterator`. Acesta este folosit pentru a defini metoda `@@iterator` pentru metodele aplicate obiectelor care implementează protocolul de iterare (acest protocol de care vei auzi în mod repetate este un set de reguli pe care trebuie să le respecte un obiect pentru a deveni iterabil).

## Boxingul - „împachetarea” într-un obiect

```javascript
var x = Symbol('totem');
typeof x; // "symbol"
var ob = Object(x);
typeof ob; // "object"
```

## Simboluri construite deja în limbaj

### Symbol.iterator

Este o metodă care returnează iteratorul setat default pentru un obiect. Acesta este utilizat pentru declarația `for...of`.
ATENȚIE! Iteratorul nu este writable, enumerable sau configurable.

## Resurse

[MDN - Well-known symbols](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Well-known_symbols)
[Ponyfoo - ES6 symbols in depth](https://ponyfoo.com/articles/es6-symbols-in-depth)
