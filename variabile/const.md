# `const`

Este o variabilă ca nu poate fi reasignată. A fost adăugat de ECMAScript 2015 (ES6). În alți termeni este o variabilă unică pentru un program. Nu poți să o redeclari. Atenție, nu se referă la valoare, ci doar la atribuire. Nu asocia ideea de constantă cu valoarea asignată. E o capcană. În subsidiar asta înseamnă că poți modifica ceea ce există în cazul obiectelor, dar nu poți asigna alt obiect aceleiași constante.

```javascript
const ceva = ['unu','doi'];
const ceva = []; // SyntaxError: redeclaration of const ceva
ceva[1] = 'bum';
console.log(ceva[1]); // "bum"
```

Dacă se dorește atingerea imutabilității, se va folosi utilitarul `var ceva = Object.freeze(['unu','doi'])`, care, cu adevărat are capacitatea de a face obiectul unul care nu poate fi modificat.

Variabilele const trebuie inițializate la declarare, altfel vei avea o eroare de sintaxă.

```javascript
const ceva;
// SyntaxError: missing = in const declaration (Firefox)
// Uncaught SyntaxError: Missing initializer in const declaration (Chrome)
// SyntaxError: Missing initializer in const declaration (Nodejs)
```

Ca și variabilele declarate cu `let`, cele declarate prin `const` sunt limitate la blocul de cod delimitat prin acolade `{}`. Asta înseamnă că, de îndată ce execuția s-a încheiat pentru un anume bloc, variabilele declarate prin `const` nu vor mai fi disponibile.

Declarațiile cu `const` nu beneficiază de mecanismul de hoisting. Nu sunt disponibile decât codului de după declararea sa.

Poate fi folosit pentru a identifica setări precum URL-uri, accesse la baze de date, etc.

```javascript
const ceva = 'http://www.kosson.ro';
ceva = "altceva" // TypeError: invalid assignment to const `ceva`
```

Spuneam că ceea ce nu se poate modifica este legătura la altă valoare. Reține că folosirea lui `const`, nu garantează imutabilitatea.

```javascript
const x = {a: 10};
x = {x: 1}; // TypeError: invalid assignment to const `x'
x.a = 11;
x; // { a: 11 }
```

Totuși în cazul obiectelor, proprietățile acestora pot fi modificate. Acest lucru este posibil pentru că nu este modificată legătura (bindingul) la valoare, ci se modifică valoarea legată.

```javascript
const obi = {
  a: 'este a',
  b: 'este b'
};
obi.a = 'x';
console.log(obi); //{ a: "x", b: "este b" }
// eroarea apare aici:
obi = {x: 'ceva nou'}; // TypeError: invalid assignment to const `obi'
```

Putem inițializa o variabilă const și cu un array:

```javascript
const arr = [];
arr.push("ceva"); // => 1; returnează dimensiunea array-ului
```

Practica indică faptul că variabilele din global ar trebui scrise cu majuscule:

```javascript
const O_SETARE_CEVA = true;
```

JavaScript nu permite un „rebinding” (conectarea la altă valoare) al unui nume de identificator `const` care s-a „legat” deja de o valoare în mediul lexical existent. Ceea ce ai declarat cu un `const` rămâne bătut în cuie.

Care este cel mai bun indicator că în loc de `let` ar trebui să folosim `const`? Dacă valoarea acelei variabile nu este modificată în funcțiile programului, cel mai bine este să facem acea variabilă `const`.
