# `undefined` - „nu găsesc valoarea”

Această valoare va fi alocată imediat ce a fost declarată o variabilă. De aceea, în consolă veți vedea, imediat ce declarați o variabilă, un frumos `undefined`.

Aceeași valoare este returnată atunci când nu există o proprietate într-un obiect sau când o funcție are un parametru lipsă.

Când vine vorba de coercion, `undefined` va fi redus la NaN într-o evaluare cu un număr.

```javascript
undefined + 1; // NaN
```

Undefined este un răspuns automat a motorului JavaScript. Dacă programatorul dorește o „non-valoare”, va folosi întotdeauna `null`.

În JavaScript, variabilele sunt setate implicit la `undefined` iar obiectele la `null`.

O ciudățenie a lui `undefined` este faptul că la verificarea valorii de adevăr pentru o decizie, va fi evaluat ca un fals.

```javascript
undefined ? 1 : 0; // 0
```
