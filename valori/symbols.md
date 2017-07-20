# Symbols

Este un tip de date introdus de ECMAScript 2015. Un `Symbol` este unic și nu poate fi modificat (este „immutable”). Un simbol este creat la apelarea funcției intrinseci `Symbol()`. Standardul spune că `Symbol()` ar fi un constructor, dar acesta spre deosebire de restul constructorilor, nu poate instanția obiecte prin sintaxa cu `new`.

```javascript
var unSimbol = Symbol();
```

Pentru a ne face un serviciu nouă programatorilor, recomand introducerea unui șir de caractere descriptiv, care este acceptat ca parametru.

```javascript
var unSimbol = Symbol('ceva deosebit');
```

Aceste valori primitive nu pot fi modificate și sunt utilizate pentru a crea un nume unic pentru o proprietate a unui obiect. Până în acest moment foloseam doar șiruri de caractere pentru numele proprietăților. Acum putem folosi aceste simboluri. Îmi place să-mi maginez că simbolurile pot fi ca niște pietre artizanale pe care este încrustat un cuvânt sau o propoziție cu o însemnătate deosebită. Această piatră este unică, este deosebită și pe care nu se poate interveni cu nimic. Chiar dacă o altă piatră ar purta aceeași inscripție, ar fi totuși o piatră diferită.

```javascript
var i = Symbol('deosebit');
var j = Symbol('deosebit');
i == j; // false
```

Acest nou tip de date nu este nici obiect și nici șir de caractere (string). Este ceva cu totul și cu totul nou. Simbolurile sunt folosite pentru a crea și pentru a utiliza proprietăți ale unui obiect care oferă siguranța că nu vor intra vreodată în conflict cu cele ale altor biblioteci de cod.

```javascript
var obi = {};
var simbolSigur = Symbol('oProprietateUnică');
obi[simbolSigur] = true;
console.log(obi[simbolSigur]);
```

Ca și în cazul array-urilor, proprietățile ale căror cheie este un simbol, li se pot accesa valorile folosind notația cu paranteze drepte. Folosirea notației cu punct, va returna `undefined`.

Se observă că în sintaxa folosită `Symbol('descriere')` este introdus un șir de caractere care poate fi folosit în scopuri de depanare.

```javascript
simbolSigur.toString(); // "Symbol(oProprietateUnică)"
```

```javascript
let totem = Symbol.for("ursul carpatin");
Symbol.keyFor(totem);
```

ATENȚIE! De fiecare dată când descriptorul este același, pentru două simboluri diferite, se vor crea două simboluri diferite.

```javascript
var simbol1 = Symbol('ceva');
var simbol2 = Symbol('ceva');

Symbol('ceva') === Symbol('ceva');
```

ATENȚIE! Un symbol nu se va crea folosind `new`. Această încercare va avea drept rezultat afișarea unei erori: `TypeError`.

Ca și string și number vine cu propriul obiect ambalaj `Symbols`.
Se aseamănă cu String.

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
