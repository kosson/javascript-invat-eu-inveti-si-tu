# `WeakMap.prototype.delete(key)`

Șterge valoarea asociată unei chei și dacă aceasta a fost găsită și ștearsă, va returna `true`. Metoda `WeakMap.prototype.has(key)` va returna `false` pentru respectiva cheie dacă nu o găsește.

```javascript
const obiW = new WeakMap();
const o1 = {a: 1, b: 2},
      o2 = {c: 3, d: 4};
obiW.set(o1, 1);
obiW.set(o2, 2);
obiW.get(o1); // 1
obiW.get(o2); // 2
obiW.delete(o1);
obiW.has(o1); // false
```
