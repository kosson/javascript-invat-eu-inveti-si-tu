# IIFE - Immediately Invoked Function Expression

IIFE permite invocarea imediată a unei funcții și permite crearea de spații de cod executabile separat de global scope.

## Model

```js
var x = "ceva";

(function(){
    var x = "ceva ascuns";
    console.log(x);
})();

console.log(x);
// => 'ceva ascuns'
// => 'ceva'
```

Când folosești?
- atunci când dorești să ascunzi funcționalități fără a lăsa nicio urmă în GLOBAL sau LOCAL SCOPE
- atunci când construiești Șabloane Modul.

### Ce este?
Este o **_funcție exprimată_** (function expression) Este o funcție exprimată pentru că o îmbraci în paranteze

### Bună practică:
1. dă un nume la IIFE, nu-l lăsa anomim. Beneficiul este că va apărea în call stack.

```js
var x = "ceva";

var iife = (function(){
    var x = "ceva ascuns";
    console.log(x);
})();

console.log(x);
```

IIFE-urile pot primi valori pentru că, de fapt, sunt apeluri de funcție:

```js
var x = "ceva";

var iife = (function(x){
  console.log(x);           // ceva
  var x = "ceva ascuns";    // ceva ascuns
  console.log(x);
})(x);

console.log(x);             // ceva
```

Foarte interesant este cazul în care în IIFE ai marea partea a funcțiilor care trebuie să rămână private, dar ai nevoie să expui câteva în global (de fapt, Șablonul Modul - Module Pattern). Kyle Simpson trimite obiectul window în IIFE și îl denumește în parametru `global`. Pentru a expune ceva din IIFE folosește mai apoi `global.ceva`.

```js
var y = "ceva din global";

var iife = (function(global){
  console.log(global.y);    // ceva din global
  global.y = "ceva ascuns care a modificat in global";
})(window);

console.log(y);             // ceva ascuns care a modificat in global
```
