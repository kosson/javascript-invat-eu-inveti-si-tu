# Valoarea null

Această valoare este o primitivă.

Dacă `undefined` este răspunsul motorului JavaScript atunci când se dorește semnalarea lipsei unei valori, în cazul în care programatorul dorește să implice în evaluări non-valori, atunci va folosi `null`.

Valoarea `null` trebuie percepută ca locțiitor de valoare până când aceasta va apărea. De regulă, îl vei intâlni în practică atunci când cineva dorește să facă o referință printr-o variabilă la un posibil viitor obiect, care încă nu există. Totuși are nevoie să-i creeze o referință pentru a lucra deja în diferite evaluări.

```javascript
var obi = null;
typeof obi; // 'object'
```

Fii foarte atent pentru că la testarea unei valori `null` cu `typeof`, va fi returnat că ar fi un obiect. Problema este una de limbaj și din rațiuni istorice, se perpetuează acest tip pentru `null`. Când vine vorba de reducerea la o valoare (coercion), `null` va fi redus la 0.
