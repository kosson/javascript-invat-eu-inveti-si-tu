# Symbols

Este un tip de date introdus de ECMAScript 2015. Un simbol este o valoare primitivă care diferă de celelalte prin faptul că nu are o reprezentare literală. Cum testezi că este o primitivă? Simplu: `typeof` răspunde cu "symbol".

Simbolurile pot fi folosite drept chei pentru proprietatea unui obiect.
În cazul lui `Symbol`, fiecare valoare folosită pentru a reprezinta simbolul, este unică și nu poate fi modificată (în engleză, immutable). Simbolul poate avea o valoare atribuită pentru a o descrie.

Valoarea folosită pentru a descrie simbolul poate fi undefined sau un șir de caractere. Un `Symbol` cu care te vei întâlni foarte des este `@@iterator`, fiind o referință către o metodă ce returnează un obiect iterator . Instrucțiunea `for...of` face apel automat la această metodă.

Un simbol este creat la apelarea constructorului `Symbol()`. Standardul spune că `Symbol()` este un constructor, dar acesta spre deosebire de restul constructorilor, nu poate instanția obiecte prin sintaxa cu `new`. Pentru a crea un simbol se va folosi constructorul `Symbol` apelându-l ca pe o funcție.

```javascript
var unSimbol = Symbol();
typeof unSimbol; // "symbol"
```

Pentru a ne face un serviciu nouă programatorilor, recomand introducerea unui șir de caractere descriptiv, care este acceptat ca parametru.

```javascript
var unSimbol = Symbol('ceva deosebit');
```

Aceste valori primitive nu pot fi modificate și sunt utilizate pentru a crea un nume unic pentru o proprietate a unui obiect. Până în acest moment foloseam doar șiruri de caractere pentru numele proprietăților. Acum putem folosi aceste simboluri. Îmi place să-mi imaginez că simbolurile pot fi ca niște pietre artizanale pe care este încrustat un cuvânt sau o propoziție cu o însemnătate deosebită. Această piatră este unică, este deosebită și pe care nu se poate interveni cu nimic. Chiar dacă o altă piatră ar purta aceeași inscripție, ar fi totuși o piatră diferită.

```javascript
var i = Symbol('deosebit');
var j = Symbol('deosebit');
i == j; // false
```

Atenție, de fiecare dată când descriptorul este același, pentru două simboluri diferite, se vor crea două simboluri diferite.

Acest nou tip de date nu este nici obiect și nici șir de caractere (string). Este ceva cu totul și cu totul nou. Simbolurile sunt folosite pentru a crea și pentru a utiliza proprietăți ale unui obiect. Oferă siguranța că nu vor intra vreodată în conflict cu cele ale altor biblioteci de cod.

```javascript
var obi = {};
var unSimbol = Symbol('oProprietateUnică');
obi[unSimbol] = true;
console.log(obi[unSimbol]);
```

Atenție, toate proprietățile unui obiect al căror nume sunt simboluri, nu sunt enumerabile.

Precum în cazul array-urilor, proprietățile ale căror cheie este un simbol, li se pot accesa valorile folosind notația cu paranteze drepte. Folosirea notației cu punct, va returna `undefined`.

Se observă că în sintaxa folosită `Symbol('descriere')` este introdus un șir de caractere care poate fi folosit în scopuri de depanare.

```javascript
simbolSigur.toString(); // "Symbol(oProprietateUnică)"
```

```javascript
let totem = Symbol.for("ursul carpatin");
Symbol.keyFor(totem);
```

## Simboluri construite deja în limbaj

### Symbol.iterator

Este o metodă care returnează iteratorul setat default pentru un obiect. Acesta este utilizat pentru declarația `for...of`. Atenție, iteratorul nu este writable, enumerable sau configurable.

## Resurse

[MDN - Well-known symbols](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Well-known_symbols)
[Ponyfoo - ES6 symbols in depth](https://ponyfoo.com/articles/es6-symbols-in-depth)
