# Expresia export

Expresia `export` permite realizarea unor legături *live* la funcții, obiecte sau la primitivele unui volum.
Obiecte, funcțiile și primitivele pentru care se face export nu mai pot fi modificate de codul care le importă. Totuși, valorile pot fi modificate în modulul exportat, ceea ce se reflectă direct în codul care importă.

Modulele care sunt exportate vor fi mereu în `strict mode` fie că scrii codul sub directivă, fie că nu.

Declarația de export nu poate fi introdusă în scripturile introduse în pagina web.

Există două tipuri de exporturi:

- cele care poartă nume (*named exports* ori simplu *named*), însemnând că vor fi zero sau mai multe exporturi per modul;
- exporturi implicite (*default exports* ori simplu *default*), însemnând că ai un singur export per modul.

## Export expresiilor și a declarațiilor la nivel individual folosind numele

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

Poți exporta chiar liste de identificatori.

```javascript
export {ceva, altceva, undeva};
```

În cazul în care este nevoie, poți redenumi arbitrar identificatorii precum în exemplul următor.

```javascript
export {ceva as altceva, cineva as altcineva };
```

Poți exporta proprietăți ale unui obiect folosind destructurarea.

```javascript
export const {prop1, prop2: altNume} = obi;
```

Pentru că toate aceste exporturi folosesc numele identificatorilor, se numesc și *named exports* - exporturi care poartă nume.

## Exportul unei singure expresii folosind default

Exporturile default sunt folosite pentru a exporta o singură valoare sau pentru a avea cel puțin o valoare pe care să o folosești la export.

```javascript
export default nume_identificator_expresie;
// precum în următoarele:
export default function numeFunctie () {}; // declarație funcție cu nume
export default function* () {}; // declarație funcție
export default class Ceva {};
export {identificator1 as default, altceva};
```

Exporturile `default` pot fi importate folosind orice nume.

```javascript
// init.js
let ceva;
export default ceva = 'test';
// iar în fișierul care importă
import altceva from './init.js';
```

Folosirea lui `default` nu înseamnă că nu poți exporta și altceva din modul.

```javascript
// modul1.js
export default class Ceva {
  constructor (val1, val2) {
    this.v1 = val1;
    this.v2 = val2;
  }
}
export function facCeva () {val};
export function zicCeva () {val};
// consumator.js
import Ceva, {facCeva, zicCeva as vorbitor} from './modul1.js';
```

În cazul în care nu dorești să imporți default-ul poți să renunți la el fără probleme. Poți importa dintr-un modul doar ceea ce dorești.

## Export către un consumator terț - agregare

Putem exporta direct dintr-un modul elemente ale unui altuia fără a mai face importul.

```javascript
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
export {functie1, functie2};
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
export {default} from ...;
```
