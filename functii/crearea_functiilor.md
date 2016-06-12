# Crearea funcțiilor

Funcțiile pot fi create în trei feluri:

- prin intermediul unei `function expression`: `var adunare = function demo(param1, param2){ return param1 + param2};` (`named function expression`)
- prin declararea funcției
- și prin constructorul `Function()`

## Mantre
- Funcțiile sunt obiecte
- Toate funcțiile sunt instanțe ale obiectului intern standard `Function`
- Funcțiile pot fi create dinamic folosind constructorul `Function`
- funcțiile nu sunt „deținute” sau „conținute” de un obiect atunci când sunt metode chiar dacă sunt declarate în obiect sau în afara lui

## Crearea funcțiilor prin constructor

```js
var oFunctie = new Function('arg1', 'arg2', 'return arg1 + arg2;');
oFunnctie(2, 4); // 6
```
