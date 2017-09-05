# Module

Modularizarea codului este o necesitate în momentul în care dezvolți o aplicație. În timp au fost dezvoltate instrumente care permit modularizarea, dar odată cu apariția lui ES6, modulele fac parte din limbaj.

Istoric vorbind, un anumit nivel de modularizare era făcut prin încărcarea diferitelor fragmente de cod JS în pagina web, dar acest lucru nu poate constitui un adevărat sistem de gestiune a diferitelor părți utile pentru a rula în armonie.

```html
<script type="application/javascript" src="CALE/inițializare.js" ></script>
<script type="application/javascript" src="CALE/procese.js" ></script>
```

Totuși, cel mai util ar fi să existe un singur punct de intrare în aplicația care ar trebui să fie capabilă să gestioneze toate dependințele.

```html
<script type="application/javascript" src="CALE/main.js" ></script>
```

## Spune standardul

Un Module are un `Module Record` care conține informație privind structura de import și export a unui modul. Înregistrările conținute sunt folosite doar la evaluarea unui modul.

Modulele oferă avantajul că rulează codul în `"strict mode"` deja.

## Analiza modulelor

Regula spune că într-un fișier poate exista doar un singur modul și vice-versa.
Pentru a lucra cu modulele, se vor folosi următoarele cuvinte rezervate: `export`, `default` și `import {numeModul} from numeModul`.

Poți exporta mai multe lucruri odată într-un modul.

```javascript
/* modulul faceTreaba.js */
export ceva = 'o valoare importantă';
export function facCeva (x) {
  return ceva;
};

/* main.js */
import {ceva, facCeva} from "faceTreaba";
facCeva("Am ");
```

Sau poți exporta un singur lucru în mod automat folosind cuvântul rezervat *default*.

```javascript
/* modulul lucru.js */
export default function facLucruri (a) { return a++; } // aici nu pune punct și virgulă

/* main.js */
import facLucruri from "facLucruri";
facLucruri(2);
```

Fii foarte atent pentru că în cazul exportului folosind default, nu trebuie încheiat enunțul cu punct și virgulă.

Poți exporta chiar și o clasă.

```javascript
/* clasa1.js */
export default class { // conținut clasă } // nu încheia cu punct și virgulă

/* main.js */
import Clasa1 from "clasa1";
let clasa1 = new Clasa1();
```
