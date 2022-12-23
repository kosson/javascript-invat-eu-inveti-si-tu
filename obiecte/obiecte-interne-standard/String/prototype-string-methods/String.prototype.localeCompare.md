# String.prototype.localeCompare()

Este o metodă care returnează un număr. Numărul reprezintă rezultatul comparării unui șir cu un altul. Între timp a apărut API-ul `Intl.Collator` care oferă o mai mare granularitate în ceea ce privește compararea șirurilor. Pentru a avea o perspectivă de lucru corectă în ceea ce privește caracterele, acestea sunt array-uri, adică obiecte peste care se pot invoca metode așa cum este și cazul de față.

```javascript
'x'.localeCompare('z'); // -1
```

O valoare `-1` indică faptul că în ordinea valorii care stă în spatele caracterului (în funcție de schema de codare caracteristice unei limbi), `x` stă înaintea lui `z`.

```javascript
'x'.localeCompare('z'); // 0
```

Dacă sunt echivalente, este semnalat prin `0`.

Și un număr pozitiv, dacă valoarea șirului este mai mare decât referința.

```javascript
'asta'.localeCompare('așează'); // 1
```

Metoda poate fi parametrizată prin `locales` și `options`. Acești parametri suplimentari sunt fix cei pe care îi folosește și constructorul `Intl.Collator`. Din perspectiva performanțelor în cazul lucrului cu volume mari de text, MDN recomandă crearea unui obiect `Intl.Collator` și aplicarea metodei `compare()`.

Comparația se poate face și pe șiruri de caractere, nu numai pe literele luate individual.

```javascript
let s1 = "sarma"; // nu are diacritice
let s2 = "sârmă"; // are diacritice
let s3 = "SARMA"; // cu majuscule fără diacritice
console.log(s1.localeCompare(s2)); // -1 datorită valorilor mai mari pe care le au diacriticele
console.log(s1.localeCompare(s3, 'ro', {sensitivity: 'base'})); // 0 pentru că toate caracterele majuscule sunt transformate la forma lor de bază a caracterului (`base`)
```

## Resurse

- [String.prototype.localeCompare() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)