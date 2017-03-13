# `String.prototype.link()`

Se folosește pentru a creea un snippet pentru un hiperlink HTML. Stringul returnat poate fi adăugat obiectului prin intermediul document.write() sau element.innerHTML. Linkrurile create astfel se adaugă array-ului de linkuri document.links.

```js
var hotText = 'MDN';
var URL = 'https://developer.mozilla.org/';

console.log('Click to return to ' + hotText.link(URL));
```
