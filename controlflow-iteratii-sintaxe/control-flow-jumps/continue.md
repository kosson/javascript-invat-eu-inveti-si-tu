# Instrucțiunea continue

Este folosită pentru a sări pur și simplu peste un pas în timpul executării unei bucle. Să presupunem că parcurgi peste o serie de numere. Atunci când pică unul ce nu întrunește o anume condiție, vrei să se întâmple ceva și apoi să treci la următorul pas de ciclare.

```javascript
var x = 0;
while (x < 10) {
  var y = ~~(Math.random() * 10);
  if (y = 4) {
    console.log('e rau');
  };
  x = x + 1;
};
```

Această imbricare a unei structuri de control într-o buclă, în limba engleză se numește *nested control flow*.
