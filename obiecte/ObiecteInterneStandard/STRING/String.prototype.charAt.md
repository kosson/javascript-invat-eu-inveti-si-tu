# `String.prototype.charAt()`

Este o metodă care o aplici direct pe string. Acceptă un parametru numeric, care este de fapt indexul la care se află caracterul ce urmează a fi returnat.

##### Reține:
- indexarea se face de la stânga la dreapta;
- indexul începe de la 0;
- indexul se termină cu `identificatorSir.length - 1`;
- dacă indexul este mai mare decât cel al șirului, va fi returnat un șir gol.

```js
var sir = "Acesta este un șir";

sir.charAt(2); // "e"
sir.charAt(100); // ""
```
