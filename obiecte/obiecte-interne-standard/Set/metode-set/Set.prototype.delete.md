### Set.prototype.delete(valoare)

Metoda `delete()` are nevoie de valoare. Returnează valoarea `true` dacă elementul există și a fost eliminat. În caz contrar, va fi returnat `false`. În cazul în care dorești să ștergi un obiect care există în set, se poate aplica `forEach()` pe set.

```javascript
colectieUnica.forEach(function (element) {
  if(element.x === 10){
    colectieUnica.delete(element);
  }
});
```