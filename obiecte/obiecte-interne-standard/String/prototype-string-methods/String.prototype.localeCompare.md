# `String.prototype.localeCompare()`

Este o metodă care returnează un număr. Numărul reprezintă rezultatul comparării unui șir cu un altul.

```javascript
'x'.localeCompare('z'); // -1
```
-1 indică faptul că în ordinea valorii care stă în spatele caracterului (în funcție de schema de codare), x stă înaintea lui z.

```javascript
'x'.localeCompare('z'); // 0
```
Dacă sunt echivalente, este semnalat prin 0.

Și un număr pozitiv, dacă valoarea șirului este mai mare decât referința.

```javascript
'asta'.localeCompare('așează'); // 1
```
