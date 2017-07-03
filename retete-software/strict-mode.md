# Rularea codului sub `strict mode`

A fost adăugat odată cu ES5 și are rolul de a modifica comportamentul motoarelor JavaScript în ceea ce privește gestionarea erorilor.

Pentru a face codul ceva puțin tolerant la erori, `'use strict';` pragma se poate pune în capul fișierului sau a unei funcții.

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
// SyntaxError: redefining arguments is deprecated
```

Douglas Crockford face recomandarea ca `'use strict';` să fie pus în funcție, nu la nivel de cod. Motivul este că atunci când concatenezi fișiere diferite într-unul singur pentru a face un singur apel de solicitare a js-ului, este posibil să ai și mult cod din fișiere scrise conform ES3.

## Mantre

- directiva este recunoscută doar în deschiderea codului sau în capul unei funcții.
- redefinirea variabilei `arguments` nu este permisă.
- nu concatena fișiere în strict mode cu cele non strict. Dacă se dorește acest lucru se vor îmbrăca diferitele fișiere în IIFE (immediately invoked function expressions).

## Ce probleme rezolvă introducerea lui `'use strict';`?

Variabilele din interiorul funcțiilor nu vor mai apărea și în global object.
Când o funcție va fi invocată ca funcție, `this` nu va mai fi obiectul global, ci `undefined`.
Metodele `apply()` și `call()` nu vor mai face automat legătura la obiectul global și nici nu vor mai ambala parametrul `this` într-un obiect. Vor trimite direct la obiectul pasat.
Eval nu mai are acces la contextul funcției - este o îmbunătățire a securității.
`arguments` nu va mai fi legat de parametri ceea ce înseamnă că o modificare în parametri, nu se va mai reflecta în array-like-ul `arguments` și invers.
Atenșie, toate metodele obiectului global vor fi apelate cu sintaxa dot: `window.addEventListener();`.

## Ține cont

Problemele cu `strict mode` apar la concatenarea scripturilor, când fișierele care se deschid cu script mode și vor fi primele în șirul de concatenare, vor indica faptul că restul este sub strict mode. Dacă vor fi introduse mai târziu, strict mode nu-și va face efectul.
