### Set.prototype.add(valoare)

Valoarea nu este opțională, dar acest lucru este logic pentru că vrei să introduci noi elemente în setul unic.

```javascript
const colectieValoriUnice = new Set();
colectieValoriUnice.add('unu');
// metoda permite înlănțuirea
colectieValoriUnice.add(1).add('I');
console.log(colectieValoriUnice);
// Set [ "unu", 1, "I" ]
```

Reține faptul că un `Set` este o colecție de elemente unice. Încercarea de a introduce un element care deja există va avea drept efect ignorarea lui. Se pot adăuga chiar și obiecte. Reține faptul că poți adăuga orice.

```javascript
const colectieUnica = new Set();
colectieUnica.add({a: 'este a', b: true}).add({x: 10});
console.log(colectieUnica); // Set [ Object, Object ]
```