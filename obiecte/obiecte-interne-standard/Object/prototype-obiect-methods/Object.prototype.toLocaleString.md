# Object.prototype.toLocaleString

Această metodă returnează un string care reprezintă obiectul.

```javascript
let obi = {a: 10, b: 'ceva'};
obi.toLocaleString(); // "[object Object]"
obi.toString(); // "[object Object]"
// dacă vrei să vezi și ce conține"[object Object]"
obi.toSource(); // "({a:10, b:"ceva"})"
```

Această metodă returnează rezultatul unui apel `toString()`.
