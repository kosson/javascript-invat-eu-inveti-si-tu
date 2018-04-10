# Number.isNaN()

Metoda testează dacă o valoare nu este un număr. Nu confunda această metodă cu cea a obiectului global.

```javascript
Number.isNaN(NaN); // true
Number.isNaN(Number.NaN); //true
Number.isNaN(0 / 0); //true
```

Dacă ai fi folosit metoda obiectului global, următoarele teste ar returna `true`.

```javascript
Number.isNaN('NaN');      // false
Number.isNaN(undefined);  // false
Number.isNaN({});         // false
Number.isNaN('blabla');   // false
```
