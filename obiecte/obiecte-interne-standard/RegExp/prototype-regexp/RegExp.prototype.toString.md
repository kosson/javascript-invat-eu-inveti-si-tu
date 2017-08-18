# `RegExp.prototype.toString()`

Metoda returnează un șir care este chiar șablonul folosit în cazul în care construcția obiectului RegExp s-a făcut prin instanțierea cu `new` a constructorului.

```javascript
var șablon = new RegExp ('ac', 'g');
console.log(șablon.toString()); // /ac/g
```
