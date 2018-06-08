# String.prototype.match

Faci o căutare într-un string după un șablon RegEx.

```javascript
var continut = 'Acesta este un text demonstrativ versiunea 0.0.1';
var reg = /demonstrativ (versiunea \d+(\.\d*))/i;
var ceAgasit = continut.match(reg);

console.log(ceAgasit); // Array [ "demonstrativ versiunea 0.0", "versiunea 0.0", ".0" ]
```

A fost generat acest array pentru că RegEx-ul conține criterii de căutare grupate prin `()`.
