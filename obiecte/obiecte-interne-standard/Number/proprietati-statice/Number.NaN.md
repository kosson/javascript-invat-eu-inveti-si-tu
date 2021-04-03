# Number.NaN

Această proprietare reprezintă un Not-A-Number. Poți folosi această proprietate pentru a verifica dacă o valoare este un număr.

```javascript
function verificaNumar (nr) {
  if (isNan(nr)) {
    return Number.NaN;
  }
  return nr;
}
```
