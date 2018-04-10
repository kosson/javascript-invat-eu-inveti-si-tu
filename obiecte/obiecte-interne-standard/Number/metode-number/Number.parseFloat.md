# Number.parseFloat()

Metoda primește caractere și returnează numere cu virgulă mobilă. Această metodă se comportă identic cu cea globală.
Ceea ce se întâmplă în spate este că valoarea primită drept argument este convertită la număr. Dacă nu poate fi convertită, metoda returnează `NaN`.

```javascript
Number.parseFloat('ceva'); // NaN
Number.parseFloat('10'); // 10
```
