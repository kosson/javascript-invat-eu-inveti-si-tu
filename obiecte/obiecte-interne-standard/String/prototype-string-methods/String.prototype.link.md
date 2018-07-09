# String.prototype.link()

Se folosește pentru a creea un snippet pentru un hiperlink HTML. Stringul returnat poate fi adăugat obiectului prin intermediul document.write() sau element.innerHTML. Linkurile create astfel se adaugă array-ului de `document.links`.

```javascript
var hotText = 'MDN';
var URL = 'https://developer.mozilla.org/';

console.log('Click to return to ' + hotText.link(URL));
```
