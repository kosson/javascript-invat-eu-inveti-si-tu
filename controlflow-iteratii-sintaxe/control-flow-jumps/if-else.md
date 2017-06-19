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
if (true) {
  function x () { console.log('bau') };
  x();
};
```

Dacă tot am lămurit povestea enunțului `if...else`, am să mai adaug un lucru legat de redactarea codului în sine. Veți vedea atunci când veți investiga cod scris de alți programatori, faptul că uneori enunțurile (*statements*) nu sunt introduse într-un bloc delimitat de acoloade (*block statements*) așa cum am redactat în cazurile prezentate. Uneori veți vedea enunțurile redactate ca și cum ar atârna în gol, dar să știți că în diversitatea pe care o oferă JavaScript, acest mod de redactare a codului este permis.

```javascript
if (true) console.log('e adevarat');
// sau
if (true)
  console.log('e bine și așa');
// sau
let a = false;
if (a === true) {
  console.log('și așa');
} else
  console.log('e false');
// sau
let b = true;
if (b === true)
  console.log('și așa');
else {
  console.log('e false');
};
```
