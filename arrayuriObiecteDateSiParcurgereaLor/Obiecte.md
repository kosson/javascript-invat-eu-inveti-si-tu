# Parcurgerea și manipularea datelor din obiecte

Obiectele care sunt array-like pot fi transformate în array-uri prin folosirea unor metode ale obiectului intern `Array` și prin folosirea operatorului spread `[...identificatorArrayLike]`

```javascript
var colectieDeP = document.body.getElementsByTagName('a');

var arrColectie = Array.prototype.slice.call(colectieDeP, 0);
var arrColectie2 = [].slice.call(colectieDeP, 0);
var arrColectie3 = Array.from(colectieDeP);
var arrColectie4 = [...colectieDeP];
```
