# `Object.getPrototypeOf()`

Returnează un obiect sau null și indică obiectul care oferă proprietăți care sunt moștenite și de cel asupra căruia se face interogarea cu `getPrototypeOf`. `null` indică faptul că obiectul curent nu moștenește nicio proprietate.

```javascript
let obi = {
  prop1: 10,
  prop2: function(){console.log("Salut");}
};

let obi2 = Object.create(obi);

obi2.stare = 100;

Object.getPrototypeOf(obi2);
// Object { prop1: 10, prop2: obi.prop2() }
```
