# Number.prototype.toFixed()

Metoda formatează un număr folosind notarea cu punct. Metodei îi poți pasa numărul de cifre de după zecimală. Acest număr poate fi între 0 și 20. Metoda returnează un număr fix.

```javascript
var numar = 10.3467556765;
console.log(Number.parseFloat(numar).toFixed(2)); // 10.35
```

Numele cu virgulă mobilă nu pot reprezenta cu precizie zecimalele în formatul binar. Din acest motiv se ajunge la rezultare bizare.

```javascript
0.1 + 0.2 === 0.3; // false
```
