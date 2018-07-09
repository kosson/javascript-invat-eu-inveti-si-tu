# Object.isExtensible

Metoda returnează un boolean și determină dacă este permisă adăugarea de proprietăți suplimentare la obiectul investigat.

```javascript
let obi = {
  prop1: 10,
  prop2: function(){console.log("Salut");}
};
let obi2 = Object.create(obi);
obi2.stare = 100;
Object.isExtensible(obi2);
// true
```

Din start, obiectele sunt extensibile.
Obiectele pot fi „înghețate” folosind `Object.preventExtensions()`, `Object.seal()` sau `Object.freeze()`.
