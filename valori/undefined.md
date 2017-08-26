# `undefined` - „nu am nicio valoare”

Această valoare semnalează lipsa uneia. Pur și simplu este ca un steguleț pe care scrie: aici nu-i nimic. Standardul marchează `undefined` ca pe o valoare în sine, dar nu este purtătoare de informație. Unul din motivele pentru care `undefined` există este acela că o mulțime de operațiuni pe care le faci, nu returnează vreo valoare în urma evaluării, dar trebuie să întoarcă un rezultat totuși.

De exemplu, această valoare va fi alocată imediat ce a fost declarată o variabilă. De îndată ce în consolă vei da enter după declarare, va fi returnat `undefined` ca rezultat direct al acestei operațiuni.

Aceeași valoare este returnată atunci când ceri o proprietate a unui obiect, dar aceasta nu există și în general când este cerută o valoare printr-un identificator care nu există, care a fost omis sau care pur și simplu încă nu există.

Când vine vorba de mecanismul de transformare (*coercion*), `undefined` va fi redus la `NaN` într-o evaluare la o adunare cu un număr, de exemplu.

```javascript
undefined + 1; // NaN
```

Undefined este un răspuns automat a motorului JavaScript. Dacă programatorul dorește folosirea înadins a unei „non-valori”, va folosi întotdeauna `null`.

În JavaScript, variabilele sunt setate implicit la `undefined`, iar obiectele la `null`.

O ciudățenie a lui `undefined` este faptul că la verificarea valorii de adevăr pentru o decizie, va fi evaluat ca un fals.

```javascript
undefined ? 1 : 0; // 0
```
