# Object.isSealed

Folosind metoda afli dacă un obiect este sigilat sau nu. Returnează un boolean.

```javascript
let obi = {
  prima: 10,
  aDoua: function(){return 'Salut!'}
};

Object.isSealed(obi); // false

// Pentru a sigila se folosește preventExtensions
let obi2 = {};
Object.preventExtensions(obi2);
Object.isSealed(obi2); // true

Object.defineProperty(obi, 'prima', {configurable: false});
Object.isSealed(obi); // false
Object.defineProperty(obi, 'aDoua', {configurable: false});
Object.isSealed(obi); // true

Object.seal(obi);
Object.isSealed(obi); // true
```

Un obiect este „sigilat” (sealed) dacă nu este extensibil și proprietățile sunt neconfigurabile.

Un obiect sigilat nu este unul înghețat! Proprietățile încă sunt `writable`.
