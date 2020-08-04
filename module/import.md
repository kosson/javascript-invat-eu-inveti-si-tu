# import

Această declarație este folosită pentru a importa legături live care sunt exportate de alt modul. Modulele importate se află în **strict mode**.

Această declarație nu poate fi folosită în scripturi incluse în pagină, cu excepția celor a căror taguri (`<script>`) au atributul `type="module"`. Legăturile importate de la un modul se numesc live pentru că din modulul care importă se pot actualiza stările entităților importate. Acest lucru înseamnă că nu poți modifica direct o valoare primitivă, dar dacă ai importat o funcție care asta face, o vei modifica folosind acea funcție, care face closure pe variabila la care se leagă o primitivă.

```javascript
// modul.mjs
export let ceva = 10;
export function modificCeva (val) {
  return ceva += val;
}
//main.mjs
import {ceva, modificCeva} from './modul.mjs';
modificCeva(2); // 12
console.log(ceva);
```

## Importuri de nume ale identificatorilor

```javascript
import defaultExport         from "nume-modul"; // importă default-ul sub ce nume dorești
import { export1 }           from "nume-modul"; // imporă un singur identificator din modulul dorit
import { export1 , export2 } from "nume-modul"; // importă părți din namespace
import { primo , secundo }   from "nume-modul/calea/către/un_fișier/exportat/nume_fișier"; // importă dintr-un modul din adâncime
import { export1 as alias1 } from "nume-modul"; // modifică numele identificatorilor
```

Chiar dacă importurile în care menționăm numele identificatorilor entităților importante seamănă cu enunțul pentru destructurare, acestea nu sunt același lucru. De exemplu, atunci când faci importurile, se va stabili o legătură dinamică cu entitățile, iar aceasta va fi păstrată dacă sunt exportate mai departe.

```javascript
import {ceva} from './unModul.mjs';
const {ceva} = require('./unModul.mjs');
```

Sintaxa aplicată pentru redenumire este diferită.

```javascript
import {ceva as altceva} from './unModul.mjs';
const {ceva: altceva} = require('./unModul.mjs');
```

## Importul unui namespace

Aceste importuri sunt o alternativă la importurile cu nume. Namespace-urile sunt accesibile celui care importă ca un obiect ale cărui proprietăți sunt entitățile exportate cu nume din modulul importat.

```javascript
import * as numeobiect from "./nume-modul"; // importă un întreg namespace
// numeobiect.oFunctie() pentru a accesa entitățile
```

```javascript
import { export1 , export2 as alias2 , [...] } from "nume-modul";
import defaultExport, { export1 [ , [...] ] } from "nume-modul";
import defaultExport, * as name from "nume-modul";
var promise = import("nume-modul");
```

## Importul de module cu side-effects

```javascript
import "nume-modul";
```

Există chiar și o funcție dinamică `import()` care nu are nevoie de scripturi `type="module"`.

## Ciclurile importurilor

Până la acest subiect, am oferit ca exemple legătura simplă și directă dintre un modul care exportă entități și alt modul care importă respectivele entități. Ce se întâmplă în momentul în care ai o structură complexă de module care depind unele de celelalte. Putem să ne imaginăm o structură arborescentă (grafuri) în care există module părinte din care importă modulele copii și acest lucru pe mai multe niveluri de adâncime. Întrebarea este cum se petrece importul în cazul unui copil aflat pe un nivel de adâncime mai mare. Care este ciclul prin care trece motorul pentru a determina ce să importe de unde pentru a satisface toate dependințele care ar permite rularea modului copil despre care vorbim.

Fiecare modul este parsat și fiecare import este conectat la export-ul corespondent.
Înainte ca un părinte să fie instanțiat, trebuie ca toți copiii săi să fie instanțiați.
Sunt executate corpurile modulelor iar în cazul celor părinte, mai întâi sunt executate corpurile copiilor.

## Resurse

- [ESM’s transparent support for cyclic imports (advanced) | Axel Rauschmayer](https://exploringjs.com/impatient-js/ch_modules.html#esms-transparent-support-for-cyclic-imports-advanced)
