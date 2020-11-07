# Expresia export

Expresia `export` permite realizarea unor legături *live* la funcții, obiecte sau la primitivele unui modul.
Obiecte, funcțiile și primitivele pentru care se face `export` nu mai pot fi modificate de codul care le importă. Totuși, valorile pot fi modificate în modulul exportat, ceea ce se reflectă direct în codul care importă. Entitățile unui modul care nu sunt exportate, vor fi private acelui modul.

Modulele care sunt exportate vor fi mereu în `strict mode`, fie că scrii codul sub directivă, fie că nu.

Declarația `export` nu poate fi introdusă în scripturile introduse în pagina web.

Există două tipuri de exporturi:

- cele care poartă nume (*named exports* ori simplu *named*), însemnând că vor fi zero sau mai multe exporturi per modul;
- exporturi implicite (*default exports* ori simplu *default*), însemnând că ai un singur export per modul.

## Exportul expresiilor și a declarațiilor la nivel individual folosind numele

În cazul în care ai un set mic de expresii și/sau declarații, poți face export individual precum în exemplul de mai jos. La momentul importului trebuie folosit același nume cu cel al identificatorului exportat.

```javascript
export let ceva, altceva, undeva;
//sau
export const ceva = {a: 1}, constanta = 9.8;
// declarații de funcții
export function numeFunctie () {};
// declarații de clase
export class Ceva {}
```

Exportul obiectelor ridică probleme în momentul în care din eroare suprascrii metodele modulului de la care ai referința. Poți exporta obiecte chiar la momentul instanțierii acestora.

```javascript
export const obi = new Book();
```

Poți exporta constante fără a mai fi nevoie de o declarație `const`.

```javascript
export 110;
```

## Exportul unei liste de identificatori

Chiar dacă nu faci export individual pe fiecare entitate a modulului, poți face o listă la final cu ceea ce dorești să expui ca legături modulului care va importa.

```javascript
var ceva = 'o valoare';
let altceva = function () {};
const undeva = {long: '23.0540', lat: '45.9659'};
export {ceva, altceva, undeva}; // lista de identificatori
```

### Redenumirea identificatorilor folosind `as`

În cazul în care este nevoie, poți redenumi arbitrar identificatorii precum în exemplul următor.

```javascript
export {ceva as altceva, cineva as altcineva };
```

### Export prin destructurarea obiectelor

Poți exporta proprietăți ale unui obiect folosind destructurarea.

```javascript
export const {prop1, prop2: altNume} = obi;
```

Pentru că toate aceste exporturi folosesc numele identificatorilor, se numesc și *named exports* - exporturi care poartă nume.

## Exportul `default`

Exporturile `default` sunt folosite pentru a exporta o singură valoare sau pentru a avea cel puțin o valoare pe care să o folosești la export. Poți avea un sigur export `default` per modul, iar modulul va fi chiar respectivul identificator exportat `default`. Exportul ca `default` a două sau mai multe entități va genera o eroare.

```javascript
export default nume_identificator_expresie;
// precum în următoarele:
export default function numeFunctie () {}; // declarație funcție cu nume
export default function* () {}; // declarație funcție [generator]
// exportul unei clase cu nume sau fără. Nu încheia cu punct și virgulă.
export default class Ceva {}
export default class {}
// desemnarea default-ului la finalul modulului.
export {identificator1 as default, altceva};
```

**Moment ZEN**: Exporturile `default` pot fi importate folosind orice nume.

```javascript
// init.js
let ceva;
export default ceva = 'test';
// iar în fișierul care importă
import altceva from './init.js';
```

Folosirea lui `default` nu înseamnă că nu poți exporta și altceva din modul. Bunele practici spun să eviți o astfel de abordare.

```javascript
// fișierul modul care exporta
export let x = 10;
export let y = ['a', 'b'];
export default let b = 'ceva';
// fisierul modul care importă
import defaultulNouNume, {x, y} from './numeFisierCareExp.mjs';
```

Exporturile `default` pentru funcții și clase nu vor fi încheiate cu punct și virgulă.

```javascript
// modul1.js
export default class Ceva {
  constructor (val1, val2) {
    this.v1 = val1;
    this.v2 = val2;
  }
}
export function facCeva () {val}; // se poate, dar e nerecomandat
export function zicCeva () {val}; // se poate, dar e nerecomandat
// consumator.js
import Ceva, {facCeva, zicCeva as vorbitor} from './modul1.js';
```

Axel Rauschmayer în lucrarea sa [Exploring JS: JavaScript books for programmers](https://exploringjs.com/) atrage atenția asupra unui aspect care trebuie luat în considerare mereu. Atunci când exporți liste de identificatori este ca și cum te-ai conecta direct la fiecare entitate în parte. Dacă folosești un `default`, te conectezi la întregul modul. Acesta este cazul în care modulul este o singură funcție sau clasă.
În cazul în care nu dorești să imporți `default`-ul poți să renunți la el fără probleme. Poți importa dintr-un modul doar ceea ce dorești.

Poți face `export default` direct valorilor și expresiilor.

```javascript
export default 'ceva'; // sau 10 sau 5 * 2 sau un RegExp: /^ce?va$/ sau un obiect: {ceva:1}
export default latru();
```

Un `export default` are nevoie de fix o singură valoare pentru a fi exportată. Încercarea de a exporta `default` o expresie similar cu `export default let a = 'ceva', b = 'altceva';` nu este validă pentru că sunt mai multe valori odată.

Entitățile care vor fi exportate `default` pot fi menționate într-o listă de export, dacă o astfel de sintaxă prezintă aventaje în anumite cazuri.

```javascript
let undeva = 'Poiana Mărului';
function ceva () {
  return 'Salutare!';
}
export {
  undeva,
  ceva as default
}
```

Exporturile `default` pot fi importate schimbând numele obiectul importat: `import {default as numeLocalArbitrarAles} from './numeModul.mjs'`.

## Exportarea către un consumator terț - agregare

Dacă dorești re-exportarea tuturor entităților mai departe, poți folosi `*`.

```javascript
export * from "./modul01.js";
```

Atenție, nu va re-exporta și exporturile `default` ale modului care se dorește a fi re-exportat, dacă acestea există. Motivul este acela că un modul poate avea doar un singur export `default`, iar acesta nu poate fi decât cel al modulului curent. Dacă fișierul curent nu are un `default` export, se poate re-exporta `default`-ul altuia și la nevoie, se poate chiar redenumi.

```javascript
// main.js
export { default } from './modul01.js';
// iar în `modulTerț.js` poți importa toate entitățile sub un singur nume
import * as numeObiectSumator from './modul01.js';
// re-exportul se paote face și prin redenumirea default-ului (main.js)
export { default as ceva } from './modul01.js';
```

Obiectul sumator folosit pentru a importa toate entitățile exportate de modulul de la care se preiau, va include și exportul `default`. Dacă vrei să imporți separat `default`-ul sub un nume dedicat, poți face acest lucru.

```javascript
import numePentruDefault , * as numeObiectSumator from './modul';
```

Atenție, în `numeObiectSumator` vei avea în continuare și `default`-ul, dar îl vei avea separat prin sintaxa din exemplu.

Putem exporta direct dintr-un modul elementele unui altuia fără a mai face importul.

```javascript
export {a, b as altceva} from './unModul.mjs';
export ceva from 'nume_fisier.js';
// fiind echivalent cu
import ceva from 'nume_fisier.js';
export {ceva};
```

Acest lucru este util pentru cazul în care am avea nevoie să agregăm din mai multe fișiere doar pentru a exporta mai departe pentru un alt fișier care va consuma agregarea.

```javascript
// fisier1.js
let functie1 = function functie1 () {};
let functie2 = function functie2 () {};
export {functie1, functie2}; // https://exploringjs.com/impatient-js/ch_modules.html
// fisier2.js
let class Ceva () {}
export Ceva;
// fisier_agregator.js
export {functie1, functie2} from 'fisier1.js';
export {Ceva} from 'fisier2.js';
// consumator.js
import {functie1, functie2, Ceva} from 'fisier_agregator.js';
```

### Agregarea de module

```javascript
export {ceva, altceva} from ... ;
export {ceva as primo, altceva as secundo} from ...;
export {default} from ...; // exportul unui default
```

Poți exporta `default`-ul urma și de alt elemente dacă acest lucru este necesar.

```javascript
// modulIntermediar.mjs
export {
  default, // sau cu redenumire `default as altNumePtrDefault`
  elementul1,
  elementul2
} from './numeModul.mjs'; // va fi exportat defaultul și elementele lui `numeModul.mjs`
// modululCareAreNevoieDeElemente.majuscul
import unNUmeAlesPentruDefault, {elementul1, elementul2} from './modulIntermediar.mjs';
```

## Resurse

- [Modules | JavaScript for impatient programmers (ES2020 edition) | Axel Rauschmayer](https://exploringjs.com/impatient-js/ch_modules.html)
