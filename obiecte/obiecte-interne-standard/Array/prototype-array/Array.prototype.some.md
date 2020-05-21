# Array.prototype.some()

Acestă metodă verifică dacă fie și numai un singur element din array trece de testul impus de o funcție. Funcția pasată drept argument trebuie să returneze o valoarea *truthy* sau *falsey*. Prima valoare care trece testul, va opri execuția lui `some()`, care va returna `true`, Pentru a returna `false` nicio valoare nu ar trebui să treacă testul.

```javascript
function testeaza (element, index, array) {
  return element === 'ac';
};
['masinute', 'ac', 'papusi', 'cărți'].some(testeaza); // true
['masinute', 'flaut', 'papusi', 'cărți'].some(testeaza);  // false
```

Variantă *one liner*:

```javascript
const contains = (arr, criteria) => arr.some(v => criteria(v));

// contains([10, 20, 30], v => v > 25 )  === true
// contains([10, 20, 30], v => v > 100 || v < 15 )  === true
// contains([10, 20, 30], v => v > 100 )  === false
```

## Resurse

- [Check if an array contains a value matching some criterias](https://1loc.dev/#check-if-an-array-contains-a-value-matching-some-criterias)