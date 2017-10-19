# `Object.setPrototypeOf`

Este o metodă pentru a seta prototipul (proprietatea internă [\[Prototype]]) a unui obiect, la prototipul altui obiect.

Este de dorit să fie evitată această practică în favoarea lui `Object.create()` din cauza lentorii introduse în rularea programului.

`Object.setPrototypeOf()` primește doi parametri:
- obiectul care are nevoie să schimbe prototipul
- obiectul la a cărui prototip se va face legătura

Valoarea returnată este chiar obiectul în sine.

```javascript
var obj = Object.setPrototypeOf({}, null); // are ca efect crearea unui obiect gol.
```

Un exemplu simplu de modificare a prototipului:

```javascript
let obiectPrim = {
  emite(){ console.log('mesaj din obiectPrim'); }
};
let obiectSecund = {
  emite(){ console.log('mesaj din obiectSecund'); }
};
let instantaX = Object.create(obiectPrim); // creează un obiect a cărui prototype este setat la obiectPrim
console.log(instantaX.emite()); // mesaj din obiectPrim
// testează care este prototype-ul
Object.getPrototypeOf(instantaX) === obiectPrim; // true

let instantaY = Object.setPrototypeOf(instantaX, obiectSecund);
console.log(instantaX.emite()); // mesaj din obiectSecund
Object.getPrototypeOf(instantaX) === obiectSecund; // true
```
