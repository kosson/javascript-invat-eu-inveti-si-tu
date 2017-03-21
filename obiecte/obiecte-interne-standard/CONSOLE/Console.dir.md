# Metoda `console.dir()`

Această metodă nu este una standard, ci a fost adoptată prin consensul comunității de practică pentru că era nevoie de un instrument care să aducă mai multe informații despre o funcție, de exemplu.

```javascript
function x () {
  let a = 10;
  return a;
}; console.dir(x);
/*
arguments:null
caller:null
length:0
name:"x"
prototype:Object
__proto__:function ()
*/
```
