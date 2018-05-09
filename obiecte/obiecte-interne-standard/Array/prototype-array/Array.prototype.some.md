# Array.prototype.some()

Acestă metodă verifică dacă fie și un singur element din array trece de testul impus de o funcție.

```javascript
function testeaza (element, index, array) {
  return element === 'ac';
};
['masinute', 'ac', 'papusi', 'cărți'].some(testeaza); // true
['masinute', 'flaut', 'papusi', 'cărți'].some(testeaza);  // false
```
