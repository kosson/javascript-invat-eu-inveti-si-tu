# Object.assign

Această metodă este introdusă de ES6. Este replica oficială la practica curentă a mixin-urilor.

```javascript
cont obiNou = Object.assign(obiȚintă, obiSursă1, obiSursă2);
// obiectul țintă este modificat, îmbogățit cu proprietățile surselor
```

Permite copierea tuturor proprietăților `enumerable` de la unul sau mai multe obiecte sursă într-un obiect țintă. Metoda returnează obiectul țintă.
Metodei îi pasezi obiectul destinație urmat de obiectele din care copiezi proprietățile. Dacă vreo proprietate este întâlnită în două din obiectele din care se face copierea, ultima găsită este luată în considerare. Metoda este una distructivă în sensul că obiectul țintă este modificat permanent. Pentru a păstra obiectele de lucru nealterate, vom pasa drept prim parametru un obiect gol.

```javascript
cont obiNou = Object.assign({}, obiSursă1, obiSursă2);
```

Ca alternativă, în cazul în care este necesar, se poate face o clonare a unui obiect folosind sintaxa spread precum în următorul exemplu.

```javascript
const obi1 = {a: 1, b: 2};
const obiX = {...obi1};
```

## Mantre

- proprietățile care trebuie copiate trebuie să fie `enumerable`.
- proprietățile din lanțul prototipal nu pot fi copiate.
- orice excepție va întrerupe copierea.

Mecanismul prin care se face acest *transfer* este folosirea lui `get` pe sursă și `set` pe țintă.

```javascript
var obi = { unu: 1 };
var copie = Object.assign({}, obi);
console.log(copie); // { unu: 1 }
```

Copierea obiectelor folosind această metodă conduce la realizarea de copii *simple* - *shallow copy* în limba engleză.

## Getteri si setteri in surse

Se pune întrebarea legitimă despre cazul în care în obiectele sursă avem proprietăți `get` sau `set`. Ceea ce se va petrece atunci când va fi format noul obiect este că se va evalua expresia `get` și în obiectul țintă se va introduce o proprietate. Aceasta va avea drept cheie numele metodei `get`, dacă aceasta nu modifică nicio valoare a unui identificator din mediul lexical sau numele identificatorului pentru care este folosit în cazul în care returnează o valoare și, bineînțeles, valoarea obținută.

```javascript
const obiSursă1 = {
  a: 'ceva',
  get ceE () {
    return a;
  },
  set ceE (val) {
    a = val;
  }
};
const obiSursă2 = {
  b: 10,
  get xXx () {
    return this.b++;
  }
};
const mix = Object.assign({}, obiSursă1, obiSursă2);
// ​​​​​{ a: 'ceva', ceE: 'ceva', b: 10, xXx: 10 }​​​​​
```

## Realizarea mixinului

Această metodă permite fuzionarea mai multor obiecte în primul.

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
