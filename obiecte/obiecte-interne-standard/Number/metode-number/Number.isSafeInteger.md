# Number.isSafeInteger()

Metoda testează dacă un număr este în plaja de siguranță a numerelor întregi așa cum sunt ele reprezentate de standardul IEEE-754. Acest lucru înseamnă că un număr nu are nevoie de vreo rotunjire pentru a fi adus în plaja de numere pe care standardul o poate reprezenta. Un număr 2^53 - 1 este considerat a fi sigur.

```javascript
Number.isSafeInteger(6);                    // true
Number.isSafeInteger(Math.pow(2, 53));      // false
Number.isSafeInteger(Math.pow(2, 53) - 1);  // true
Number.isSafeInteger(5.3);                  // false
Number.isSafeInteger(5.0);                  // true
```
