# Cuvântul cheie `super`

`super` este o referință câtre obiectul prototip al obiectului de lucru curent.

Este echivalentul lui `Object.getPrototypeOf(this)`. Nu uita faptul că `Object.getPrototypeOf()` returnează valoarea din proprietatea internă `[[Prototype]]`.

ES6 definește metodele obiectelor ca niște funcții care are au o proprietate internă `[[HomeObject]]`. Proprietatea internă face referință la obiectul căruia îi aparține.

Orice referință la `super` folosește proprietatea internă `[[HomeObject]]` pentru a determina pașii următori cum ar fi `Object.getPrototypeOf()` asupra valorii stocate de `[[HomeObject]]` cu scopul de a obține, de fapt prototipul.

Un exemplu de utilizare simplu este:

```javascript
var obi1 = {
  faceva(){
    return 'ce-i returnat din obi1 ';
  }
};
var obi2 = {
  faAltceva(){
    return super.faceva() + ' este oferită aici';
  }
};

// setezi prototipul lui obi2 la cel a lui obi1.
Object.setPrototypeOf(obi2, obi1);
obi2.faAltceva(); // "ce-i returnat din obi1  este oferită aici"
```
