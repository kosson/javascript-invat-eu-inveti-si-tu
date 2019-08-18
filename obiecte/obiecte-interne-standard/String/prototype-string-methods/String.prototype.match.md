# String.prototype.match

Faci o căutare într-un string după un șablon RegExp. Metoda returnează un array al cărui conținut depinde dacă fanionul `g` din șablon există sau nu. Dacă este prezent fanionul `g` în șablonul de căutare, array-ul returnat va conține toate rezultatele din șirul consumat. Atenție, grupurile captură nu vor fi incluse (vezi RegExp).

```javascript
var continut = 'Acesta este un text demonstrativ versiunea 0.0.1';
var reg = /demonstrativ (versiunea \d+(\.\d*))/i;
var ceAgasit = continut.match(reg);

console.log(ceAgasit); // Array [ "demonstrativ versiunea 0.0", "versiunea 0.0", ".0" ]
```

A fost generat acest array pentru că RegEx-ul conține criterii de căutare grupate prin `()`. În exemplul de mai sus, a fost adus grupul de captură pentru că nu a fost adăugat fanionul `g` în șablon. Ca regulă, dacă acest fanion nu este prezent, la primul rezultat căutat în șir, va fi adus și ceea ce este în grupul de captură.

Dacă nu există fanionul `g` în șablon, ceea ce va returna metoda `match()` este același rezultat precum în cazul utilizării metodei `RegExp.exec()`.

În cazul în care ai setat fanionul `g` pentru șablon și dorești să incluzi rezultatele aduse de grupurile de captură, va trebui să folosești `RegExp.exec()`.

În cazul în care nu a fost găsit niciun rezultat, metoda returnează valoarea `null`.
