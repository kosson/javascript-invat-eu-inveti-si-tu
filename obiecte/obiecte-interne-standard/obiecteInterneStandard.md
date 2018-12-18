# Obiecte interne standard - ECMAScript Standard Built-in Objects

Privitor la aceste obiecte, am ales să traduc *standard built-in* ca **obiecte interne standard** pentru că reflectă cel mai bine realitatea.

Începem povestea obiectelor interne în momentul în care un *script* ori un *modul* își începe execuția. Codul nostru nu este rulat într-un vid deplin, ci deja sunt disponibile un set de obiecte puse la dispoziție de motor. Standardul menționează faptul că *obiectele interne standard* sunt **entități** ECMAScript (4.2 [ECMAScript Overview](https://tc39.github.io/ecma262/#sec-intro). Unul este obiectul global, ca parte a mediului lexical format, iar altele sunt accesibile ca proprietăți ale obiectului global. Unele sunt accesibile ca proprietăți ale altor obiecte *built-in* (preexistente).

## Mică anatomie

Obiectele interne standard sunt de fapt funcții cu rol de constructori care pot fi invocate. Adu-ți mereu aminte faptul că funcțiile sunt numite de standard **funcții obiect**, pentru că, de fapt, **funcțiile sunt obiecte**.

Pentru a vedea natura acestor obiecte interne, ne vom ajuta de operatorul `typeof` pentru a *sonda* aceste entități.

```javascript
typeof Object; // "function"
typeof Array;  // "function"
```

Să spunem că avem un șir de caractere, de exemplu propoziția simplă: *eu învăț*. Deschidem o consolă și introducem între ghilimele valoarea literală. În acest moment avem doar valoarea literală a șirului de caractere. Nimic ciudat, nimic anormal, dar complet inutil. Ca să putem *mânui* acest șir de caractere, trebuie să-l legăm la un identificator.

```javascript
let x = 'eu învăț';
typeof x; // "string"
```

Dacă investigăm tipul valorii identificată prin `x`, motorul va răspunde cu `string`. Și acum vom face o minune. Vom accesa o proprietate disponibilă doar obiectelor `String`. Și te vei întreba pe bună dreptate: cum se poate întâmpla să ai acces la proprietățile și metodele unui obiect când tu operezi cu o valoare literală. Rezolvarea misterului vine din faptul că de îndată ce pui punctul, care este un operator destinat accesării membrilor unui obiect, valoarea noastră este *împachetată* (*wrapped*) instant în obiectul corespunzător tipului său de valoare și, minune, devine un obiect.

```javascript
x.length; // 8
// x a devenit obiect String
x.constructor; // function String()
```

Putem chiar interoga care este constructorul obiectului și vom afla că este funcția obiect `String`. Dar imediat ce s-a încheiat operațiunea, imediat ce s-a invocat metoda și a fost returnat rezultatul, se face o despachetare.

## Structură

O structură a acestor obiecte este oferită chiar de standardul ECMAScript care le subîmparte pe următoarele linii de funcționalitate:

-   obiectele fundamentale pentru rularea programelor includ `Object`, `Function`, `Boolean`, `Symbol` și `Error`,
-   obiectele care reprezintă și manipulează valorile numerice includ `Math`, `Number` și `Date`,
-   obiectele care prelucrează șiruri de caractere includ `String` și `RegExp`,
-   obiecte care sunt de fapt colecții indexate de valori care includ `Array`, colecții cheie-valoare precum `Map` și `Set`,
-   obiecte care suportă date structurate așa cum este obiectul `JSON`, `ArrayBuffer` și `DataView`,
-   obiecte care oferă abstracțiuni de control așa cum sunt funcțiile generator și obiectele `Promise`,
-   obiecte care oferă reflexie așa cum sunt `Proxy` și `Reflect`.

Multe dintre obiectele interne sunt funcții de fapt. Acestea pot fi invocate cu argumente. O parte dintre acestea sunt constructori și sunt menite să fie invocate cu `new`. Acestea sunt proprietăți constructor ale obiectului global.

Proprietățile constructor:

-   `Array`, `ArrayBuffer`,
-   `Boolean`,
-   `DataView`, `Date`,
-   `Error`, `EvalError`,
-   `Float32Array`, `Float64Array`, `Function`,
-   `Int8Array`, `Int16Array`, `Int32Array`
-   `Map`,
-   `Number`,
-   `Object`,
-   `Proxy`, `Promise`,
-   `RangeError`, `ReferenceError`, `RegExp`,
-   `Set`, `String`, `Symbol`, `SyntaxError`,
-   `TypeError`,
-   `Uint8Array`, `Uint8ClampedArray`, `Uint16Array`, `Uint32Array`, `URIError`,
-   `WeakMap`, `WeakSet`

Dacă nu este prevăzut altfel, toate funcțiile interne și toți constructorii au acces la obiectul prototype al lui `Function`, care este obiectul la care ajungi prin referința `Function.prototype`.

## Mantre

-   Constructorul lui `Function` este chiar o funcție. În schimb, `Function` este constructor pentru `Object`.
-   Toate obiectele au un slot intern `[[Prototype]]` prin care se realizează moștenirea.
-   Dacă nu este specificat altfel, obiectele interne sunt extensibile.
-   Fiecare obiect intern are memorat Realm-ul pentru care setul de obiecte interne a fost generat.
-   Multe dintre obiectele interne sunt funcții care pot fi invocate cu argumente. O parte din acestea sunt concepute pentru a fi constructori, adică pentru a fi folosite cu `new`.
-   Nu trebuie confundate cu obiectul global.
-   Obiectele interne (`built-in`) includ `global object`.
-   Obiectul global este creat înainte de a se crea vreun context de execuție.

Standardul spune că fiecare funcție internă și fiecare constructor oferit de motor are obiectul prototipal al lui `Function`, care este valoarea inițială a expresiei `Function.prototype`. Această valoarea va fi valoarea slotului intern `[[Prototype]]`, fiind o simplă funcție. Acest lucru se întâmplă pentru că `Function` nu are o metodă internă `[[Construct]]`.

În ceea ce privește oricare obiect care servește drept prototip, are ca valoare `Object.prototype`, cu excepția obiectului prototip a lui `Object`.

# Resurse

-   [ECMAScript® 2017 Language Specification](https://tc39.github.io/ecma262/)
[Global Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
