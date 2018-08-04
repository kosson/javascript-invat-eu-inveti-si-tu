# String.prototype.padEnd

Această metodă are comportamentul lui `String.prototype.padStart()` numai că aplicat pentru finalul șirului.

```javascript
'ceva'.padEnd(10, '-');
// "ceva------"
```

## Normalizarea fragmentelor de date

Unul din cazurile în care utilitatea sa este deplină, se leagă de necesitatea afișării uniforme a datelor. Cuplat cu `Object.entries()` și `map()`, poți obține o afișare după un anume șablon prestabilit.

```javascript
const colecție = {
  'Cartea copiilor inteligenți': '80',
  'Arta de a călători': '40',
  'Informatică': '130'
};
Object.entries(colecție).map(([titlu, preț]) => {
  console.log(`Titlu: ${titlu.padEnd(35, ' *')} ${preț.padStart(4, '0')}`);
});
/*
Titlu: Cartea copiilor inteligenți * * * * 0080
Titlu: Arta de a călători * * * * * * * *  0040
Titlu: Informatică * * * * * * * * * * * * 0130
*/
```
