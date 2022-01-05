# WeakMap.prototype.set(key, value)

Metoda adaugă un nou element prin setarea valoarii unei chei în `WeakMap`. Returnează obiectul `WeakMap` după orice modificare folosind `set`.

```javascript
let wm = new WeakMap();
let obi1 = {};

wm.set(obi1, 'ceva');
console.log(wm.get(obi1)); // 'ceva'
```

Această metodă se folosește și pentru actualizarea unei valori din `WeakMap`.

```javascript
wm.set(obi1, 'altceva'); // WeakMap {{…} => 'altceva'}
console.log(wm.get(obi1)); // 'altceva'
```
