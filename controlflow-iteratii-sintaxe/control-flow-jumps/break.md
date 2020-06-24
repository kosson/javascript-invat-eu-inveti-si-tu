# Instrucțiunea break

Este folosită pentru a ieși mai devreme dintr-o buclă dacă o anume condiție a fost întrunită.

Această instrucțiune poate fi folosită și cu *labeled statements*.

```javascript
let x;

buclă: for (x = 0; x <= 4; x++) {
  if (x === 3) {
    continue buclă;
  }
  console.log(x);
}
```

## Resurse

- [label | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)
