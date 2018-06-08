# Variabile const

A fost adăugat de ECMAScript 2015 (ES6). Folosind `const` se declară o variabilă unică pentru un program. Nu poți să declari altă variabilă cu același identificator.

Declarația unei variabile folosind `const` nu se referă la valoare, ci doar la modul cum se face atribuirea valorii. Nu asocia ideea de constantă cu valoarea asignată. E o capcană. În subsidiar asta înseamnă că nu poți modifica legătura creată între identificatorul lui const încercând atribuirea unui alt obiect, de exemplu. După cum ai sesizat, se folosește de cele mai multe ori în cazul obiectelor pe care le dorim fixate pe durata întregii execuții a programului. Obiectele astfel declarate pot fi modificate, pentru că efectul declarării folosind const se referă la stabilirea unei legături ce nu poate fi modificată.

```javascript
const ceva = ['unu','doi']; // array-urile sunt obiecte și ele
const ceva = []; // SyntaxError: redeclaration of const ceva
ceva[1] = 'bum';
console.log(ceva[1]); // "bum"
```

Dacă se dorește atingerea imutabilității, se va folosi utilitarul `var ceva = Object.freeze(['unu','doi'])`, care are capacitatea de a face obiectul greu de  modificat.

Variabilele `const` trebuie inițializate la declarare, altfel vei avea o eroare de sintaxă.

```javascript
const ceva;
// SyntaxError: missing = in const declaration (Firefox)
// Uncaught SyntaxError: Missing initializer in const declaration (Chrome)
// SyntaxError: Missing initializer in const declaration (Nodejs)
```

Precum variabilele declarate cu `let`, cele declarate prin `const` sunt limitate la blocul de cod delimitat prin acolade `{}`. De îndată ce execuția s-a încheiat pentru un anume bloc, variabilele declarate prin `const` nu vor mai fi disponibile.

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

Practica indică faptul că variabilele din global ar trebui scrise cu majuscule:

```javascript
const O_SETARE_CEVA = true;
```

Care este cel mai bun indicator că în loc de `let` ar trebui să folosim `const`? Dacă valoarea acelei variabile nu este modificată în funcțiile programului, cel mai bine este să facem acea variabilă `const`.
