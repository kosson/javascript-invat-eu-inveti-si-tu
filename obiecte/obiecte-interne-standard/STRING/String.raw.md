# String.raw()

Este o metodă foarte utilă în lucrul cu șabloanele de text de tipul `${...}`.

Metoda returnează forma brută a șirului.

```javascript
var fragment = 'ceva';
String.raw`Am mâncat ${fragment}`; // Am mâncat ceva
```

Poți crea noi șiruri „brute”:

```javascript
var sir = String.raw`Vreau ceva bun!`;
console.log(sir); // Vreau ceva bun!
```
