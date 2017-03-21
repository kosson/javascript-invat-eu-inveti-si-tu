# Metoda `Console.trace()`

Este o metodă care afișează stiva pentru o serie de apeluri care se face de la momentul invocării însăși a metodei trace.

```javascript
function container () {
  let a = 10;
  function interna () {
    console.trace();
    return a;
  }; interna ();
}; container();
/*
interna
container
<anonymous>
 */
```
