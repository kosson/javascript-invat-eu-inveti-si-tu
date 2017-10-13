# Object.prototype.isPrototypeOf

Drept parametru este trimis obiectul pentru care se face verificarea în cazul obiectului investigat.
Metoda returnează un boolean.

```javascript
function Test (x){ let a = 'Salut!'; };
function Test2 (){ let a = 'Salut spune 2'; };
Test2.prototype = new Test(1); // setează prototipul lui Test2 la cel al lui Test.
let x = new Test2();
Test2.prototype.isPrototypeOf(x); // true
```
