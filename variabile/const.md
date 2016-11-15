# const

Este adăugat de ECMAScript 2015 (ES6).

Variabilele definite prin `const` nu pot fi modificate, valoarea lor fiind setată o singură dată. Valoarea lor trebuie dată din start.

Poate fi folosit pentru a identifica setări precum URL-uri, accesse la baze de date, etc.

```js
const ceva = 'http://www.kosson.ro';
ceva = "altceva" // TypeError: invalid assignment to const `ceva`
```

Totuși, inițializarea cu un obiect nu ne va împiedica să modificăm proprietățile.

```js
const obi = {};
obi.ceva = "o poveste";
```

Putem inițializa o variabilă const și cu un array:

```js
const arr = [];
arr.push("ceva"); // => 1; returnează dimensiunea array-ului
```

Practica indică faptul că variabilele din global ar trebui scrise cu majuscule:

```js
const O_SETARE_CEVA = true;
```
