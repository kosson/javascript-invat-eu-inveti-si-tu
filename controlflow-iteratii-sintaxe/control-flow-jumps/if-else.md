# Enunțul `if...else`

Este o decizie pe care trebuie să o iei în funcție de două posibile căi. În cadrul instrucțiunii `if` este luată decizia pentru calea de execuție.

Folosim acest enunț pentru a stabili un curs de acțiuni în funcție de anumite condiții. Ai putea să-ți închipui că apuci pe un drum dorind să te plimbi prin Transilvania și în funcție de anumite condiții, de la București poți să mergi pe Cheia, pe Valea Prahovei sau pe Rucăr-bran, iar dacă nimic nu este practicabil pentru că este foarte aglomerat, poți să încerci pe la Buzău. Toate acestea pot fi modelate cu enunțul `if...else`.

```javascript
if (valeaPrahoveiAglomerat == true) {
  // ma opresc
} else if (cheiaLapovita == true) {
  // ma intorc
} else {
  // merg pe Rucăr-Bran
};
```

Dacă declari o variabilă în corpul unei declarații if, această variabilă va fi disponibilă și în afara blocului funcțional, fie că blocul a fost executat sau nu.

Începând cu ES6, este posibilă declararea funcțiilor în blocuri.

```javascript
"use strict";
if(true){
  function x () { console.log('bau') };
  x();
};
```
