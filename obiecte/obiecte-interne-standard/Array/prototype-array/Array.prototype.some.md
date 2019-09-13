# Array.prototype.some()

Acestă metodă verifică dacă fie și numai un singur element din array trece de testul impus de o funcție. Funcția pasată drept argument trebuie să returneze o valoarea truthy sau falsey. Prima valoare care trece testul, va opri execuția lui `some()`, care va returna `true`, Pentru a returna `false` nicio valoare nu ar trebui să treacă testul.

```javascript
function testeaza (element, index, array) {
  return element === 'ac';
};
['masinute', 'ac', 'papusi', 'cărți'].some(testeaza); // true
['masinute', 'flaut', 'papusi', 'cărți'].some(testeaza);  // false
```
