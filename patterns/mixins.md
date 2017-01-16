# Mixins

Este un șablon care permite crearea unui obiect a cărui proprietăți și metode sunt preluate din alt obiect.

```javascript
function mixin(obiInCompletare, obiSursa){
  Object.keys(obiInCompletare).forEach(function(chie){
    obiInCompletare[cheie] = obiInCompletare[cheie];
  });
  return obiInCompletare;
};
```

Acest șablon este unul dintre cele mai folosite și din acest motiv ES6 a adus o nouă metodă lui `Object` care să facă tocmai acest lucru: `Object.assign()`.
