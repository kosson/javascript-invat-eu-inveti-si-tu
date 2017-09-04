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
