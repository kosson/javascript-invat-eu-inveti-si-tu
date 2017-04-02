# `const`

Este adăugat de ECMAScript 2015 (ES6).

Ca și variabilele declarate cu `let`, cele declarate prin `const` sunt limitate la blocul de cod delimitat prin acolade `{}`. Asta înseamnă că, de îndată ce execuția s-a încheiat pentru un anume bloc, variabilele declarate prin `const` nu vor mai fi disponibile.

Declarațiile cu `const` nu beneficiază de mecanismul de hoisting.

Poate fi folosit pentru a identifica setări precum URL-uri, accesse la baze de date, etc.

```javascript
const ceva = 'http://www.kosson.ro';
ceva = "altceva" // TypeError: invalid assignment to const `ceva`
```

Variabilele definite prin `const` pot fi modificate, dar ceea ce nu se poate modifica este legătura la altă valoare. Reține că folosirea lui `const`, nu garantează imutabilitatea.

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

console.log(obi); // Object { a: "x", b: "este b" }

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

JavaScript nu permite un „rebinding” (conectarea la altă valoare) al unui nume de identificator care s-a „legat” deja de o valoare în mediul lexical existent.
