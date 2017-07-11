# Promise

Este un obiect folosit pentru operațiuni asincrone.

O promisiune este o valoare care poate fi disponibilă acum, în viitor sau niciodată.

O promisiune este creată folosind `new`:

```javascript
var executaLaRezolvare = function(){return 'execut la rezolvare'};
var promisune = new Promise(executaLaRezolvare);
```
