# Operatorii `!=` și `!==`

Sunt operatori care testează dacă două valori sunt diferite. Dacă sunt diferite returnează `true`.
Operatorul `!=` face o verificare laxă încercând să facă transformarea unei valori șir în număr, de exemplu.

```javascript
10 != 10; // false
10 != "10"; // false
10 != 'zece'; // true
```

În schimb, operatorul `!==` face o verificare strictă până la nivel de tip al valorii.

```javascript
10 !== 10; // false
10 !== '10'; // true
true !== 'true'; // true
```
