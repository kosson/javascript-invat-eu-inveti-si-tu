# `typeof`

Este un operator unar care aduce informații despre tipul operandului pentru care sunt solicitate, fie acesta o primitivă sau un obiect.

Poți determina dacă o variabilă are o valoare sau nu folosind `typeof`.

```javascript
var a;
if (typeof a === 'undefined') {
  console.log('nu are valoare');
}; // nu are valoare
```

Acest operator are o mică problemă, care este considerată un defect a limbajului. Dacă interoghezi tipul lui `null`, va fi returnat "object". După cum bine știm deja, `null` este o primitivă.

```javascript
typeof null; //"object"
```
