# Crearea funcțiilor

## Mantre
- Funcțiile sunt obiecte
- Funcțiile pot fi create dinamic folosind constructorul `Function`
- funcțiile nu sunt „deținute” sau „conținute” de un obiect atunci când sunt metode chiar dacă sunt declarate în obiect sau în afara lui

## Crearea funcțiilor prin constructor

```js
var oFunctie = new Function('arg1', 'arg2', 'return arg1 + arg2;');
oFunnctie(2, 4); // 6
```
