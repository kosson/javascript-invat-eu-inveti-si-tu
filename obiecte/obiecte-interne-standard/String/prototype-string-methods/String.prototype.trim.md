# String.prototype.trim()

Această metodă scoate *spațiile goale* de la capetele unui string.

Ce poate fi considerat a fi spații goale:

-   space
-   tab
-   non-break space
-   LF
-   CR
-   etc.

Metoda returnează un nou string fără *spații goale*.

```javascript
let unsir  = ' ceva ',
    altsir = ' altceva';

unsir.trim(); // 'ceva'
```