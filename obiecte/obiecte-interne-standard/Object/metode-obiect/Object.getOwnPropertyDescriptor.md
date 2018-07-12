# Object.getOwnPropertyDescriptor

Metoda returnează un descriptor pentru o proprietate pe care o *deține* un obiect. O proprietate *deținută* de un obiect este una care este prezentă în obiect, care nu a fost *dobândită* prin delegare prototipală.

Metoda are doi parametri: **obiectul** în care se caută proprietatea și **numele proprietății** pentru care se face interogarea.

Ceea ce permite această metodă este o descriere precisă a unei proprietăți.

```javascript
function faCeva () {
  console.log("referință");
};

let obi = {
  prima: 10,
  aDoua: function(){console.log("Salut!");},
  aTreia: faCeva
};

Object.getOwnPropertyDescriptor(obi, 'prima');
// { value: 10, writable: true, enumerable: true, configurable: true }
```

După cum se observă, este returnat un obiect care care proprietăți ce descriu detalii despre proprietatea pentru care acestea au fost solicitate.