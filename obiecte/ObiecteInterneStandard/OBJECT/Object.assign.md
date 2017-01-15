# `Object.assign()`

Această metodă este introdusă de ES6.

Permite copierea tuturor proprietăților enumerable de la unul sau mai multe obiecte sursă într-un obiect țintă. Metoda returnează obiectul țintă.
Metodei îi pasezi obiectul destinație urmat de obiectele din care copiezi proprietățile. Dacă vreo proprietate este întâlnită în două din obiectele din care se face copierea, ultima găsită este luată în considerare.

## Mantre

- proprietățile care trebuie copiate trebuie să fie `enumerable`.
- proprietățile din lanțul prototipal nu pot fi copiate.
- orice excepție va întrerupe copierea.

Mecanismul prin care se face acest „transfer” este folosirea lui get pe sursă și set pe țintă.

```javascript
var obi = { unu: 1 };
var copie = Object.assign({}, obi);
console.log(copie); // { unu: 1 }
```

Această metodă permite fuzionarea mai multor obiecte în primul

```javascript
var obi1 = {a: 1, b: function(){console.log(this);}};
var obi2 = {x: 1, y: function(){console.log('ceva');}};
var obi3 = {w: 1, z: function(){console.log('salut');}};
var tot = Object.assign(obi1, obi2, obi3);
console.log(tot); // Object { a: 1, b: obi1.b(), x: 1, y: obi2.y(), w: 1, z: obi3.z() }
```

În copia obiectului vor fi găsite doar proprietățile care sunt `enumerable`.

```javascript
var obi = Object.create({x:1}, {
  a: {
    value: 10
  },
  b: {
    value: 101,
    enumerable: true
  }
});
var obiCopie = Object.assign({}, obi);
console.log(obiCopie); // Object { b: 101 }
```
