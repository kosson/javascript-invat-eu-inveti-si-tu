# `Object.prototype.toString`

Este o metodă folosită pentru a obține o reprezentare a obiectului ca un text.

## Mantre
- fiecare obiect are o metodă `toString`, care este apelată automat atunci când un obiect trebuie reprezentat ca o valoare textuală sau când se apelează obiectul pentru a fi reprezentat ca string.
- metoda returnează `[object type]`, unde `type` este tipul de obiect.
- metoda poate fi suprascrisă

```javascript
var obiect = new Object();
obiect.toString(); // este returnat [object Object]
```

Folosirea lui `Object.prototype.toString()` cu `Function.prototype.call()` sau `Function.prototype.apply()`, permite identificarea tipului de obiect pentru care se face investigația.

```javascript
Object.prototype.toString.call(new Date);   // "[object Date]"
Object.prototype.toString.call(new String); // "[object String]"
Object.prototype.toString.call(Math);       // "[object Math]"

Object.prototype.toString.call({a: true});  // "[object Object]"
var x = Object.prototype.toString.call({a: true});  // "[object Object]"
console.log(x); // "[object Object]"
```
