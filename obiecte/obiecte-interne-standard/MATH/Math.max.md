# Math.max()

Este o metodă statică folosită pentru a returna valoarea cea mai mare dintre argumentele pasate.

```javascript
Math.max(40, 1002); // 1002
```

În cazul ES6, se poate folosi operatorul spread pentru a obține cea mai mare valoare dintr-un array.

```javascript
Math.max(...[-2, 23, 5, 110]); // 110
// forma ES5 implica folosirea lui apply()
Math.max.apply(Math, [-2, 23, 5, 110]);
```
