## Enunțul `do..while`

Spre deosebire de `while`, evaluarea expresiei care determină execuția codului se face la final, ceea ce permite ca măcar o singură dată codul să fie executat.

```javascript
var oValoare = ~~(Math.random() * 10);
do {
  console.log(oValoare);
} while (oValoare > 5); // 5
```
