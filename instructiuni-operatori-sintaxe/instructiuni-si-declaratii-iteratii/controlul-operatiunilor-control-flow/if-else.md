# Instrucțiunea `if...else`

Reține faptul că if nu este o expresie. Este o instrucțiune!

Dacă declari o variabilă în corpul unei declarații if, această variabilă va fi disponibilă și în afara blocului funcțional, fie că blocul a fost executat sau nu.

Începând cu ES6, este posibilă declararea funcțiilor în blocuri.

```javascript
"use strict";
if(true){
  function x () { console.log('bau') };
  x();
};
```
