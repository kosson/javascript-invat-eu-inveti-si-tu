# `RegExp.prototype.exec()`

Metoda face o căutare pentru a găsi un fragment de text specificat. Returnează un array sau `null`.

```javascript
var unText = 'Acesta este o poveste cu 0 pitici';
var ac = /este o Poveste/ig;
var rezultat = ac.exec(unText); //Array [ "este o poveste" ]
rezultat.index; // 7
```
