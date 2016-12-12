# strict mode

Pentru a face codul ceva puțin tolerant la erori, `use strict;` se poate pune în capul fișierului sau a unei funcții.

## Mantre

- directiva este recunoscută doar în deschiderea codului sau în capul unei funcții.
- redefinirea variabilei `arguments` nu este permisă.
- nu concatena fișiere în strict mode cu cele non strict. Dacă se dorește acest lucru se vor îmbrăca diferitele fișiere în IIFE (immediately invoked function expressions).

```javascript
// fisierul1.js
"use strict";
function x() {};
```

și

```javascript
function facCeva(x) {
    "use strict";
    var arguments = []; // da eroare
}
// SyntaxError: redefining arguments is deprecateds
```

Problemele cu `strict mode` apăr la concatenarea scripturilor, când fișierele care se deschid cu script mode și vor fi primele în șirul de concatenare, vor indica faptul că restul este sub strict mode. Dacă vor fi introduse mai târziu, strict mode nu-și va face efectul.
