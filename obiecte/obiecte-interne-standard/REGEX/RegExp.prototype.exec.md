# `RegExp.prototype.exec()`

Metoda face o căutare pentru a găsi un fragment de text specificat. Returnează un array sau `null`.

```javascript
var unText = 'Acesta este o poveste cu 0 pitici';
var ac = /este o Poveste/ig;
var rezultat = ac.exec(unText); //Array [ "este o poveste" ]
rezultat.index; // 7
```

Array-ul returnat în momentul regăsirii conține o altă proprietate importantă în afară de indexul la care s-a găsit șirul după șablon: `input`. Input conține întreg șirul în care s-a făcut potrivirea.

```javascript
console.dir(rezultat);
```
