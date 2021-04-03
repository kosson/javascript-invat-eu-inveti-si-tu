# `Number.MAX_SAFE_INTEGER`

Este o constantă ce reprezintă numărul întreg cu valoarea sa maximă care poate fi utilizat de JavaScript. Acesta este 2<sup>53</sup>-1, fiind `9007199254740991`. Nu uita, JS folosește standardul IEEE Standard for Floating-Point Arithmetic (IEEE 754).

Se poate ajunge la o reprezentare echivalentă folosind obiectul intern `Math`.

```javascript
Number.MAX_SAFE_INTEGER // 9007199254740991
Math.pow(2, 53) - 1     // 9007199254740991
```

## Resurse

https://en.wikipedia.org/wiki/Double-precision_floating-point_format
