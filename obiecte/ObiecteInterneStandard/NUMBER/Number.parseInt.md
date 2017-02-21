# `Number.parseIn()`

Este o metodă care primește un argument ca șir, îl va prelucra în funcție de rădăcină sau de bază și va fi returnat ca număr întreg.

```javascript
parseInt('101',2); // 5
// pentru a transforma un număr în binar
5..toString(2); // 101
```

Folosirea unei variabile care conține un fragment numeric chiar la începutul șirului de caractere, va avea drept răspuns prelucrarea acelei secvențe numerice.

```javascript
var x = '123D este un fragment';
parseInt(x, 10); // 123
```

Aplicarea lui `parseInt` asupra unei valori cu zecimale, va returna valoarea în baza 10 fără zecimale.

```javascript
parseInt('5.2', 10); // 5
```
