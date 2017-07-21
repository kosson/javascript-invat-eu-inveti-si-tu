# Symbols

Este un tip de date introdus de ECMAScript 2015. Un simbol este o valoare primitivă care diferă de celelalte prin faptul că nu are o reprezentare literală. Cum testezi că este o primitivă? Simplu: `typeof` răspunde cu `"symbol"`.

Un `Symbol` este unic și nu poate fi modificat (este „immutable”). Un simbol este creat la apelarea funcției intrinseci `Symbol()`. Standardul spune că `Symbol()` ar fi un constructor, dar acesta spre deosebire de restul constructorilor, nu poate instanția obiecte prin sintaxa cu `new`.

```javascript
var unSimbol = Symbol();
typeof unSimbol; // "symbol"
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
var unSimbol = Symbol('oProprietateUnică');
obi[unSimbol] = true;
console.log(obi[unSimbol]);
```

**Moment Zen**: Toate proprietățile a căror nume sunt simboluri, nu sunt enumerabile.

Ca și în cazul array-urilor, proprietățile ale căror cheie este un simbol, li se pot accesa valorile folosind notația cu paranteze drepte. Folosirea notației cu punct, va returna `undefined`.

## Introdu descrierea simbolului

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

## Registrul global pentru simboluri

Registrul global pentru symbols ține evidența acestora folosindu-se de o cheie numită, evident `key`. Această cheie va fi folosită și ca descriere atunci când simbolurile care sunt create sunt introduse în registrul global (este cel care acționează peste tot la momentul rulării codului).

Există două metode prin care poți adăuga un `Symbol` în registrul global:
- `Symbol.for(key)` și
- `Symbol.keyFor(symbol)`

```javascript
Symbol.for('test') === Symbol.for('test'); // true
```

Unul dintre simbolurile folosite extensiv este `Symbol.iterator`. Acesta este folosit pentru a defini metoda `@@iterator` pentru metodele aplicate obiectelor care implementează protocolul de iterare (acest protocol de care vei auzi în mod repetate este un set de reguli pe care trebuie să le respecte un obiect pentru a deveni iterabil).

## Folosirea la „nume computate” pentru proprietăți

Am văzut anterior că simbolurile sunt create și introduce ca nume ale proprietăților în cazul în care folosim sintaxa cu paranteză dreaptă pentru a adăuga ulterior proprietăți unui obiect existent.

Alternativ, se pot crea toate simbolurile și se poate construi obiectul din start punându-le ca nume de proprietăți, fiecare la locul lui.

```javascript
var piatraRoșie = Symbol("zăpadă");
var piatraVânătă = Symbol("mătase");
var obiect = {
  [piatraRoșie]: "Un hematit",
  [piatraVânătă]: "Sulfat de cupru"
};
obiect[piatraRoșie]; // "Un hematit"
```

## Simbolurile pot fi folosite cu `Object.defineProperty()` și `Object.defineProperties()`

Chiar dacă folosim simboluri pentru numele proprietăților acest lucru nu afectează modul de lucru în cazul în care se dorește „modelarea” propriu-zisă a proprietății din punct de vedere al atributelor.

Pentru „modelarea” unei singure proprietăți folosim `Object.defineProperty()`. Să presupunem că avem un obiect cu o proprietate deja, pe care dorim să o setăm în așa fel încât să nu poată fi modificată.

```javascript
var simbol0 = Symbol('rață'),
    animale = {
      [simbol0]: "mac mac"
    };
Object.defineProperty(animale, simbol0, {writable: false});
```

Și acum dorim să introducem în același obiect o proprietate nou nouță dar cu atributelele proprietății configurate după necesitățile proprii. Să spunem că nu dorim ca valoarea să poată fi editată. În acest sens, mai întâi vom crea un nou simbol.

```javascript
var simbol1 = Symbol('cal');
Object.defineProperties(animale, {
  [simbol1]: {
    value: 'nihaha',
    writable: false
  }
});
console.log(animale[simbol0]); //=> mac mac
console.log(animale[simbol1]); //=> nihaha
```

## Folosirea aceluiași simbol pentru întreg codul rulat



## Simboluri construite deja în limbaj

### Symbol.iterator

Este o metodă care returnează iteratorul setat default pentru un obiect. Acesta este utilizat pentru declarația `for...of`.
ATENȚIE! Iteratorul nu este writable, enumerable sau configurable.

## Resurse

[MDN - Well-known symbols](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Well-known_symbols)
[Ponyfoo - ES6 symbols in depth](https://ponyfoo.com/articles/es6-symbols-in-depth)
