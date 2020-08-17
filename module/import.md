# import

Această declarație este folosită pentru a importa legături live care sunt exportate de alt modul. Modulele importate se află în **strict mode**. Importurile trebuie făcute chiar la începutul fișierelor care fac importul. Trebuie să fie primele declarații. Preferabil este să imporți `default`-ul întotdeauna și să eviți importul entităților menționate între acolade. Sistemul modular a fost gândit pentru a avea un punct central de inserție.

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

Aceste importuri sunt denumite *name imports* pentru că fiecare entitate la care dorești să stabilețti o legătură, va fi numită explicit.

```javascript
import defaultExport            from "nume-modul"; // importă default-ul sub ce nume dorești
import { entitate1 }            from "nume-modul"; // imporă un singur identificator din modulul dorit
import { entitate1, entitate2 } from "nume-modul"; // importă părți din namespace
import { primo, secundo }       from "nume-modul/calea/către/un_fișier/exportat/nume_fișier"; // importă dintr-un modul din adâncime
import { entitate1 as alias1 }  from "nume-modul"; // modifică numele identificatorilor
```

Chiar dacă importurile în care menționăm numele identificatorilor entităților importante seamănă cu enunțul pentru destructurare, acestea nu sunt același lucru. De exemplu, atunci când faci importurile, se va stabili o legătură dinamică cu entitățile, iar aceasta va fi păstrată dacă sunt exportate mai departe.

```javascript
import {ceva} from './unModul.mjs';
// iar în Node.js se poate apela la un `require`
const {ceva} = require('./unModul.mjs');
```

Sintaxa aplicată pentru redenumire este diferită.

```javascript
import {ceva as altceva} from './unModul.mjs';
// iar în Node.js redenumirea se face astfel:
const {ceva: altceva} = require('./unModul.mjs');
```

## Importul unui namespace

Aceste importuri sunt o alternativă la importurile cu nume (*namespaced imports*). Namespace-urile sunt accesibile celui care importă ca un obiect ale cărui proprietăți sunt entitățile exportate cu nume din modulul importat.

```javascript
import * as numeobiect from "./nume-modul"; // importă un întreg namespace
// numeobiect.oFunctie() pentru a accesa entitățile
```

Sunt câteva variații de import în funcție de anumite scenarii posibile.

```javascript
import { entitate1 , entitate2 as alias2 , [...] } from "nume-modul"; // import entități cu redenumirea unora
import defaultExport, { entitate1, entitate2 } from "nume-modul"; // importul separat al defaultului de restul entităților
import defaultExport, * as name from "nume-modul"; // importul separat al default-ului dar restul ca namespace.
```

## Importul de module cu side-effects

Acest `import` nu va stabili vreo legătură la entitățile modulului. Ceea ce face `import`-ul este să încarce și execute codul. Codul modulului va fi executat, dar nu vor fi importate valori pentru că respectivul modul nu exportă nimic. Propriu-zis, se face importul pentru ceea ce produce evaluarea respectivului cod, pentru a-l inițializa. Un astfel de modul, de cod inițializat, va aduce modificări mediului lexical global.

```javascript
import "nume-modul";
```

Există chiar și o funcție dinamică `import()` care nu are nevoie de scripturi `type="module"`.

Atunci când codul pe care îl imporți și are *side-effects*, cel mai bine este să izolezi fragmentele într-un modul de sine stătător.

```javascript
// modul nou care are cod cu efecte secundare `cuSideEffects.js`
windows.obiGlobal = {a: 1};
windows.funcGlobală = function () {};
export default null;
// main.js
import './cuSideEffects.js';
```

## Importuri dinamice cu import()

Importurile care sunt făcute folosind sintaxa standard va conduce la o evaluare a codului la momentul încărcării acestuia. Utilizarea lui `import()` se comportă ca punct de intrare într-un alt graf de module.

În cazurile în care dorești o reîncărcare la cerere sau ca răspuns al satisfacerii unei condiții, încărcarea dinamică poate fi luată în considerare. Uneori nu ai nevoie de întreg codul unui modul sau ai nevoie de acesta la un anumit timp. Încărcarea statică a codului va avea un impact și asupra memoriei folosite.
Există cazul în care numele scripturilor să fie construite dinamic sau este posibil ca la momentul încărcării nici măcar să nu existe. Scripturile modulelor pot avea *side effects* (efecte secundare) și uneori nu dorești aceste efecte secundare doar în anumite condiții.

Recomandarea este ca importurile dinamice să nu fie făcute decât în anumite condiții.

Pentru a realiza un import dinamic, cuvântul cheie `import` va fi folosit ca apel de funcție. Atunci când este folosit astfel, va returna o promisiune.

```javascript
import('/modules/numeModul.js').then(modul => { /* Fă ceva cu modulul */ });
// sau cu await
let unModulLaCerere = await import ('/module/numeModul.js');
```

Importurile dinamice permit încărcarea în funcție de o condiție împlinită.

```javascript
(async () => {
  if (cevaTrue) {
    // importă modulul pentru side effects
    await import('/modules/un-modul.js');
  }
})();
```

## Ciclurile importurilor

Până la acest subiect, am oferit ca exemple legătura simplă și directă dintre un modul care exportă entități și alt modul care importă respectivele entități. Ce se întâmplă în momentul în care ai o structură complexă de module care depind unele de celelalte. Putem să ne imaginăm o structură arborescentă (grafuri) în care există module părinte din care importă modulele copii și acest lucru pe mai multe niveluri de adâncime. Întrebarea este cum se petrece importul în cazul unui copil aflat pe un nivel de adâncime mai mare. Care este ciclul prin care trece motorul pentru a determina ce să importe de unde pentru a satisface toate dependințele care ar permite rularea modului copil despre care vorbim.

Fiecare modul este parsat și fiecare import este conectat la export-ul corespondent.
Înainte ca un părinte să fie instanțiat, trebuie ca toți copiii săi să fie instanțiați.
Sunt executate corpurile modulelor iar în cazul celor părinte, mai întâi sunt executate corpurile copiilor.

## Resurse

- [ESM’s transparent support for cyclic imports (advanced) | Axel Rauschmayer](https://exploringjs.com/impatient-js/ch_modules.html#esms-transparent-support-for-cyclic-imports-advanced)
- [es6 import for side effects meaning | stackoverflow](https://stackoverflow.com/questions/41127479/es6-import-for-side-effects-meaning)
