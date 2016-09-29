# Object.setPrototypeOf()

Este o metodă pentru a seta prototipul (proprietatea internă [[Prototype]]) a unui obiect, la prototipul altui obiect.

Este de dorit să fie evitată această practică în favoarea lui Object.create().

Object.setPrototypeOf() primește doi parametri:
- obiectul care are nevoie să schimbe prototipul
- obiectul la a cărui prototip se va face legătura

Valoarea returnată este chiar obiectul în sine.

```js
var obj = Object.setPrototypeOf({}, null); // are ca efect crearea unui obiect gol.
```
