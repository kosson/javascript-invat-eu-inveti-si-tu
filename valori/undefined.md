# `undefined` - „nu găsesc valoarea”

Această valoare va fi alocată imediat ce a fost declarată o variabilă. De aceea în consolă veți vedea imediat ce declarați o variabilă drept răspuns un frumos `undefined`.

Aceeași valoare este returnată atunci când nu există o proprietate într-un obiect sau când o funcție are un parametru lipsă.

Când vine vorba de coercion, `null` va fi redus la NaN.

```javascript
undefined + 1; // NaN
```

Undefined este un răspuns automat a motorului JavaScript. Dacă coderul dorește o „non-valoare”, va folosi întotdeauna `null`.
