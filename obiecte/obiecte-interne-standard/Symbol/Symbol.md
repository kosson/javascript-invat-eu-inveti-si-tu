# Symbol

Cel mai bine învățăm din povești, iar trecutul limbajului de programare JavaScript oferă câteva interesante, care au orientat dezvoltarea limbajului către introducerea unui nou tip de valori primare așa cum sunt simbolurile. Legenda spune că de îndată ce JavaScript nu a mai fost tratat ca un mijloc de a dinamiza paginile web, programatorii au început dezvoltarea bibliotecilor de cod. Acestea  includ propriile obiecte, care *se întâlneau* cu obiectele provenite din utilizarea altor biblioteci de cod. Proprietățile unui obiect intrau în coliziune cu proprietățile altor obiecte în cazul în care aveau același nume. Pentru a evita astfel de coliziuni, se apela la diverse mecanisme de protejare a propriilor obiecte pentru a fi sigure în utilizare. Dar odată cu apariția lui `Symbol` mare parte din aceste probleme vor dispărea.

`Symbol` nu trebuie folosit cu `new` pentru că nu este un constructor de obiecte. Pur și simplu nu permite sintaxa `new Symbol()`. Dacă i se pasează un argument care nu este `undefined`, acest argument va fi un șir de caractere care va avea rolul de descriptor pentru noul simbol creat.

```javascript
new Symbol(); // TypeError: Symbol is not a constructor
```

`Symbol()` este o funcție care returnează o valoare de tipul symbol. Adu-ți aminte mereu faptul că un simbol este o valoare primară. A fost introdusă de ECMAScript 6. Pe scurt, un simbol este asociat cheii unei proprietăți a unui obiect. Evidența simbolurilor este ținută prin intermediul unui **registru global de simboluri**.

Symbol nu este chiar o creație ECMAScript, ci este un concept folosit și în alte limbaje de programare. Am aflat că în limbajul de programare Lisp, toți identificatorii sunt considerați a fi simboluri. Până la apariția simbolurilor, toți identificatorii din JavaScript erau exclusiv șiruri de caractere. Dacă ții morțiș, poți converti un simbol la un șir de caractere folosind metoda `toString()` moștenită automat.

```javascript
var piatră = Symbol('onix');
typeof piatră; // "symbol"
typeof piatră.toString(); // "string"
```

Symbol are o serie de proprietăți, care oferă acces la membrii acestui obiect intern. Are proprietăți statice, care îți permit să investighezi registrul global constituit înainte de a se începe evaluarea codului.

![](SymbolMap.png)

Standardul lămurește faptul că registrul simbolurilor este o listă de elemente. Fiecare, individual, este un *Record*, ceea ce decriptat înseamnă că avem de-a face cu un obiect (19.4.1 The Symbol Constructor). Fiecare simbol este un obiect cu două proprietăți:

- cheia pentru prima proprietate este `[[Key]]` și are drept valoare un șir de caractere necesar identificării la nivel global a simbolului respectiv;
- a doua proprietate care are drept cheie `[[Symbol]]`, care are drept valoare un **simbol** ce poate fi accesat din oricare Tărâm (*Realm*).

Folosim simbolurile pentru a avea chei cu adevărat unice pentru proprietățile unui obiect și oriunde avem nevoie de identificatori unici. Simbolurile sunt ca niște fulgi de nea. Nu există asemănare a unuia cu altul.

Valorile de acest tip pot fi folosite pentru a face anumite proprietăți ale unui obiect să fie anonime. Astfel, se poate realiza trecerea unor proprietăți într-o zonă *privată*, care să fie disponibilă doar obiectului pentru care s-au creat aceste proprietăți. După cum am observat, există deja construite astfel de proprietăți în obiectele interne ale JavaScript.

Un scenariu de utilizare este al unui simbol utilizat ca proprietate a unui obiect.

```javascript
let unSimbol = Symbol('oDescriere');
this[unSimbol] = function () {
  console.log('fac ceva');
};
```

Ceea ce tocmai s-a întâmplat este că s-a creat un simbol, fiind o valoare ce va sta *ascunsă* și care poate fi referită doar prin identificatorul variabilei, dar și prin apelarea metodei `getOwnPropertySymbols()`. Am spus că stă *ascunsă* pentru că este non-enumerabilă, ceea ce înseamnă că nu iese la numărătoarea* cu `for...in`, prin sondarea cu `Object.getOwnPropertyNames(obiect)` sau prin interogarea obiectului cu `Object.keys(obiect)`.

Proprietățile pentru care cheile sunt simboluri, nu pot fi accesate decât prin folosirea sintaxei cu paranteze drepte.

```javascript
var obi = {},
    propPrivata = Symbol('stauPitita');

obi[propPrivata] = "ceva privat";
obi[propPrivata]; // "ceva privat"
console.log(Object.getOwnPropertyNames(obi));   // []
console.log(Object.getOwnPropertySymbols(obi)); // [Symbol(stauPitita)]
console.log(Reflect.ownKeys(obi));              // [Symbol(stauPitita)]
```

Se observă faptul că simbolurile ies la iveală prin interogarea cu `Object.getOwnPropertySymbols(obiect)`, fiind generat un array al acestora, dar mai există o metodă a obiectului intern Reflect: `Reflect.ownKeys(obiect)`.

## Proprietăți

### Nume computate pentru proprietăți

Am văzut anterior că simbolurile sunt create și introduse ca nume ale proprietăților, precum în cazul în care folosim sintaxa cu paranteză dreaptă pentru a adăuga ulterior proprietăți unui obiect existent.

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

### `Object.defineProperty()` `defineProperties()`

Chiar dacă folosim simboluri pentru numele proprietăților, acest lucru nu afectează modul de lucru în *modelarea* proprietății din perspectiva atributelor.

Pentru *modelarea* unei singure proprietăți folosim `Object.defineProperty()`. Să presupunem că avem un obiect cu o proprietate deja, pe care dorim să o setăm în așa fel încât să nu poată fi modificată.

```javascript
var simbol0 = Symbol('rață'),
    animale = {
      [simbol0]: "mac mac"
    };
Object.defineProperty(animale, simbol0, {writable: false});
```

Și acum dorim să introducem în același obiect o proprietate nou-nouță, dar cu atributele proprietății configurate după necesitățile proprii. Să spunem că nu dorim ca valoarea să poată fi editată. În acest caz, mai întâi vom crea un nou simbol.

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

Reține faptul că pentru a accesa un simbol avem nevoie de o legătură la acesta, care poate fi realizată la momentul creării.

## Registrul global

Registrul acesta trebuie înțeles ca un mediu disponibil întregului cod. Ca un fel de obiect global pentru simboluri.

Registrul global pentru simboluri ține evidența acestora, folosindu-se de o cheie numită `key`. Această cheie va fi folosită ca descriptor atunci când simbolurile sunt introduse în registrul global.

Există două metode pentru a crea și accesa un `Symbol` în registrul global:

-   `Symbol.for(key)` și
-   `Symbol.keyFor(symbol)`.

```javascript
Symbol.for('test') === Symbol.for('test'); // creat și accesat este true
```

Unul dintre simbolurile folosite din oficiul de anumite obiecte interne este `Symbol.iterator`. Acesta este folosit pentru a defini metoda `@@iterator` pentru metodele aplicate obiectelor care implementează protocolul de iterare. Acest protocol, de care vei auzi în mod repetat, este un set de reguli pe care trebuie să le respecte un obiect pentru a deveni iterabil).

## Metode de acces la registru

Metodele `Symbol.for()` și `Symbol.keyFor()` pot accesa valorile din registrul simbolurilor. După cum am văzut anterior, registrul simbolurilor este creat înainte de evaluarea codului JavaScript și este o listă de obiecte care există în motor și care nu poate fi accesată direct. Aceste două metode sunt singurii mediatori dintre procesul de rulare al codului (*runtime*) și registrul simbolurilor.

### `Symbol.for('descriptorSimbol')`

Metoda aduce un simbol din registru. Invocarea lui `Symbol.for('descriptor')` introduce un simbol, dacă acesta nu există și apoi îl returnează imediat. Dacă există, returnează același simbol setat prima dată.

```javascript
let primo = Symbol.for('unu');
let secundo = Symbol.for('unu');
primo == secundo; // true
```

Diferite părți ale codului rulat pot folosi același simbol prin atribuirea sa unor identificatori diferiți. Această metodă acceptă un singur parametru, care va fi identificatorul pentru simbolul nou creat.

```javascript
let solidM = Symbol.for('metal');
let lichidM = Symbol.for('metal');
let rezultate = { [solidM]: "oxid de fier" };
console.log(rezultate[solidM]); // oxid de fier
rezultate[lichidM] = "vapori de mercur";
console.log(rezultate[lichidM]);  // vapori de mercur
console.log(rezultate[solidM]);   // vapori de mercur
```

În cazul atribuirii aceluiași simbol unor identificatori diferiți, valoarea lor va fi cea a simbolului, ceea ce-i face aliasuri ale aceleiași entități.

Încheiem povestea lui `Symbol.for()` prin a întări faptul că prima dată când este folosit, se constituie un nou simbol în registrul dedicat lor, iar la invocarea acesteia încă o dată, este returnat simbolul existent.

### `Symbol.keyFor(numeVariabilă)`

Folosind această metodă se obține numele cheii unui simbol care există deja în registru.

```javascript
console.log(Symbol.keyFor(primo)); // unu
```

## Well-Known Symbols - simboluri bine-cunoscute

Standardul indică o serie de simboluri pe care le atașează atributul de *bine-cunoscute*. În spatele fiecărui astfel de simbol *bine-cunoscut* se află algoritmi (interni motorului de JavaScript), care au anumite efecte. Am putea spune că, de fapt, aceste simboluri identifică proprietăți care oferă *funcționalități bine-cunoscute* pentru obiectele interne. Unele obiecte interne JavaScript, au niște proprietăți ale căror chei sunt simboluri. Ce se ascunde în spatele lor este un algoritm, care oferă o funcție sau un anume comportament la momentul când tu, ca programator, le invoci.

Un lucru foarte important pe care-l menționează standardul este acela că *valorile simbolurilor bine-cunoscute sunt comune tuturor tărâmurilor*.

Prin ce se disting *simbolurile bine-cunoscute* de celelalte? Prin faptul că sunt referite printr-o notație specială folosită doar în textul standardului. Acesta este formată din numele simbolului, care este stabilit de standard, precedat de o pereche de caractere ampresand: `@@iterator`, de exemplu. Pentru cazul utilizării de zi cu zi, aceste simboluri bine-cunoscute sunt parte a obiectului cu rol de prototip pentru obiectele interne `Object`, `Array` și `String` cu excepția unuia singur care este operatorul `instanceof`.

### `Symbol.hasInstance(obi)`

Acesta este cazul operatorului `instanceof` prin care putem afla dacă un anumit obiect este o instanță a celui pentru care se face investigația.

```javascript
var obi = {x: true};
obi instanceof Object; // true
// echivalent cu
Object[Symbol.hasInstance](obi);
```

Concluzia este că operatorul `instanceof`, începând cu ECMAScript 6, a devenit o prescurtare către metoda `hasInstance()` a lui `Symbol`. În acest caz, toate funcțiile în JavaScript vor avea o metodă `Symbol.hasInstance` prin care se poate testa dacă un obiecte este sau nu o instanță a acesteia. Această metodă este chiar în obiectul prototip al lui `Function` (`Function.prototype`), ceea ce face ca toate funcțiile să o moștenească. Proprietatea `Symbol.hasInstance` este non-writable, non-configurable și non-enumerable pentru a se asigura faptul că nu va fi suprascrisă dintr-o eroare. Totuși, fii foarte atent că prin utilizarea metodei `Object.defineProperty()`, poți modifica fără probleme `Symbol.hasInstance`.

### `Symbol.isConcatSpreadable()`

Aceasta este o valoare Boolean. Ceea ce indică ea este dacă un obiect poate fi transformat într-un array ce conține proprietățile sale atunci când se invocă `concat()` pe un array existent. Adu-ți aminte că un array este la rândul său un obiect, de fapt. Acest simbol atestă că obiectul poate fi tratat ca un array căruia urmează să se adauge ca elemente noi din unul pe care se face `concat`-ul.

```javascript
var obiSimulandUnArray = {
  0: "unu",
  1: "doi",
  length: 2,
  [Symbol.isConcatSpreadable]: true
};
// obiSimulandUnArray are acum comportament de array
var numaram = ["zero"].concat(obiSimulandUnArray);
console.log(numaram); // [ "zero", "unu", "doi" ]
```

### `Symbol.iterator`

Acest simbol este mijlocul prin care se apelează iteratorul pentru un anumit obiect. Este bine-cunoscută apelarea iteratorului atunci când se folosește `for...of`.

## Lucrul cu textul

Există patru metode a constructorului `Symbol`, care permit o fină interacțiune cu textul folosind expresiile regulate (RegExp). Pentru a înțelege ce oferă metodele lui Symbol, să trecem în revistă metodele utilizate de obiectul intern `RegExp`.

-   `match(șablonRegExp)` prin care se verifică dacă un șir de caractere este identic cu cel menționat prin șablonul regex-ului.
-   `replace(șablonRegExp, șirDeÎnlocuire)` prin care se caută un fragment identic cu cel menționat de regex, iar atunci când este găsit, se face înlocuirea sa cu șirul de caractere introdus ca al doilea argument.
-   `search(șablonRegExp)` localizează un fragment menționat prin șablonul regex-ului în interiorul unui text.
-   `split(șablonRegExp)` *sparge* un șir de caractere într-un array pe baza potrivirii după un șablon menționat prin regex.

Ceea ce oferă aceste metode este posibilitatea de a modifica felul în care se face căutarea, redefinind metodele care folosesc șabloane regex să se comporte precum metodele originale de la care se așteaptă să existe un regex, dar de fapt să existe o altă implementare de căutare.

### `Symbol.match`

Este simbolul care pune în funcțiune algoritmii responsabili cu realizarea unei căutări într-un șir de caractere după un șablon. Este apelabil prin invocarea metodei `match()` pusă la dispoziție de obiectul intern RegExp.

### `Symbol.replace`

Este simbolul care pune în funcțiune algoritmii responsabili cu realizarea unei înlocuiri a unui fragment dintr-un șir care se potrivește cu un șablon. Este apelabil prin invocarea metodei `replace()` pe care obiectul intern RegExp o oferă.

### `Symbol.search`

Este mecanismul declanșat la căutarea într-un șir după un șablon atunci când este apelată metoda `search()` a lui RegExp.

### `Symbol.split`

Este algoritmul care se pune în mișcare la apelarea metodei `split()` pe care obiectul intern String o pune la dispoziție.

## `Symbol.species`

Este o valoare implicată în crearea de obiecte derivate. Următoarele tipuri de obiecte interne au definite intern `Symbol.species`.

-   `Array`,
-   `ArrayBuffer`,
-   `Map`,
-   `Promise`,
-   `RegExp`,
-   `Set`,
-   Typed arrays

Toate aceste obiecte interne folosesc simbolul *well-known* `Symbol.species` pentru a genera legătura `this`. Acest lucru mai implică posibilitatea returnării funcției constructor pentru un obiect care implementează protocolul de iterare.

```javascript
Array[Symbol.species]; // function Array()
```

Poți să te folosești de acest simbol pentru a extinde obiectele interne care au acest simbol cu scopul de a le deriva.

```javascript
// scenariu ES5
function List () {"use strict";};
List.prototype = Object.create(Array.prototype);
let lista = new List();
lista.push('a', 'b', 'c');
lista.slice(0) instanceof List; // false
// încercarea de extindere eșuează

// metoda corectă
class List extends Array {};
let l = new List();
l.slice(0) instanceof(List); // true
[].slice.call(l) instanceof(List); //true
```

## Transformări

### `Symbol.toPrimitive`

Un simbol utilizat pentru a converti un obiect la o primitivă. Standardul îl menționează, dar încă nu există aplicații practice. Metoda este definită în prototipul fiecărui obiect și se comportă ca o rețetă care indică cum trebuie tratat obiectul dacă se dorește transformarea sa într-o primitivă. Un posibil model de utilizare a metodei este acela de a identifica tipul datelor.

### `Symbol.toStringTag`

Este algoritmul implicat de metoda `toString` a obiectului intern `Object`. Acest simbol aduce la iveală o proprietate a fiecărui obiect atunci când este invocat `Object.prototype.toString.call()`. De exemplu, pentru un array, invocarea acestei metode aduce valoarea `Array`, care aparține proprietății `Symbol.toStringTag`.
Poți folosi `Symbol.toStringTag` pentru a defini propriile valori.

```javascript
function Ceva (valoare) {
  this.valoare = valoare;
};
Ceva.prototype[Symbol.toStringTag] = "Ceva";
var test = new Ceva('ciuca');
console.log(test.toString()); // [object Ceva]
console.log(Object.prototype.toString.call(test)); // [object Ceva]
```

### Symbol.unscopables

Sunt proprietățile care sunt excluse de la folosirea lui `with`.

## Lucrul cu simbolurile

Evaluarea funcției `Symbol()` este o valoare de tip `symbol`. Adu-ți aminte mereu faptul că simbolurile sunt tipuri de date primare.

```javascript
var unSimbol = Symbol('simbol01');
typeof unSimbol; // "symbol"
```

Spune standardul că valoarea pentru slotul intern `[[Prototype]]` a lui `Symbol` este `funcția-obiect internă` a cărui slot intern `[[Prototype]]` este obiectul prototype a lui `Object`.

Tot standardul aduce lămuriri în ceea ce privește câteva aspecte ,care țin de bucătăria motoarelor JavaScript, dar care ne vor face nouă o imagine a contextului. Motorul de căutare înainte de a porni evaluarea codului construiește în *culise* o listă goală dedicată tuturor simbolurilor care vor fi create. Lista aceasta poate fi înțeleasă ca un registru. Chiar se numește **GlobalSymbolRegistry** și este o listă disponibilă tuturor tărâmurilor care ar putea fi; e o listă globală.

Structura unei singure înregistrări din acest registru este cheie (un șir de caractere) - simbol (un simbol).

## Nevoia pentru Symbol

Un simbol este unic și nu poate fi modificat. Înțelegerea simbolurilor stă la baza instrumentelor de prelucrare a datelor, care implementează protocoalele de iterare. Obiectele care implementează simbolurile mai sunt numite și *Obiecte pentru controlul operațiunilor abstracte*.

```javascript
console.log(Symbol('ceva') === Symbol('ceva')); // false
```

## Mantre

-   Simbolurile nu vor intra în conflict cu valorile șir ale cheilor unui obiect.
-   Simbolurile nu implică faptul că sunt un set privat de valori.
-   Nu poți face transformări (coercion) pe simboluri.

## Control Abstraction Objects

Noile variante ale standardului aduc lămuriri suplimentare asupra obiectelor care se creează în cazul folosirii funcțiilor generator, a celor `async` și a promisiunilor. Urmând litera standardului vom lămuri concepe de bază pentru înțelegerea în adâncime a unor mecanisme.

## Interfețe de iterare

Să ne imaginăm că avem un obiect care poate fi deschis simplu de următoarea listă de proprietăți: culoare: roșie, gust: acrișor, formă: rotundă, areCodiță: true. Dacă am avea în față coșuri cu fructe, folosind acest model mental, am putea foarte ușor sorta doar merele pentru că acestea îndeplinesc toate criteriile. Folosind analogia, o interfață pentru motorul JavaScript este un set de proprietăți a căror valori se potrivesc unei anumite specificații a limbajului nostru de programare. Toate obiectele care au proprietățile ce descriu o anumită interfață, spunem că sunt conforme acelei interfețe. Proprietățile unei interfețe nu constituie un obiect în sine, ci sunt o listă pe care o regăsim la obiectele conforme. Un obiect poate să aibă proprietăți care să-l facă conform cu mai multe interfețe.

### Interfața `Iterable`

Interfața Iterable are o singură proprietate: `@@iterator`. Valoarea acestei proprietăți este o funcție care returnează un obiect **Iterator**, care este conform interfeței `Iterator`.

### Interfața `Iterator`

Interfața Iterator trebuie să aibă următoarele proprietăți:
- `next()`, o funcție care returnează un obiect conform interfeței `IteratorResult`.
- `return`, o funcție care returnează un obiect `IteratorResult`. Semnalează obiectului iterator că nu se va mai face un apel `next()`.
- `throw`, o funcție care returnează un obiect `IteratorResult`. Semnalează obiectului iterator că a fost detectată o condiție de eroare.

### Interfața `IteratorResult`

Această interfață trebuie să aibă următoarele proprietăți:
- `done`, care este, fie `true`, fie `false`. Această proprietate indică starea parcugerii cu `next()` a obiectului iterator. Dacă a fost atins finalul parcurgerii obiectului iterator, această proprietate este setată la `true`.
- `value` fiind orice valoare JavaScript acceptă. În cazul în care done are valoarea `false`, `value` reprezintă valoarea de etapă pentru că obiectul iterator nu a fost parcurs complet. Dacă valoarea lui `done` este `true`, atunci value este ceea ce returnează final iteratorul. Dacă iteratorul nu are o valoare, va fi returnat `undefined`.

### Prototipul unui obiect iterator

Prototipul unui iterator este prototipul lui `Object`, fiind un obiect ordinar. Poți extinde protitipul pentru că slotul intern `[[Extensible]]` este setat la `true`. Toate obiectele care implementează interfața `Iterator`, moștenesc automat și din obiectul prototip al obiectului iterator.

```javascript
const colectie = [1,3,5];
let prima = colectie[Symbol.iterator]();
Object.getPrototypeOf(x);
// object Array Iterator
```

## Referințe

-   [https://hacks.mozilla.org/2015/06/es6-in-depth-symbols/](https://hacks.mozilla.org/2015/06/es6-in-depth-symbols/)
-   [Zakas, Nicholas C. Understanding ECMAScript 6: The Definitive Guide for JavaScript Developers](https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/)
-   [JS classes are not “just syntactic sugar” | Andrea Giammarchi | medium.com](https://webreflection.medium.com/js-classes-are-not-just-syntactic-sugar-28690fedf078)
