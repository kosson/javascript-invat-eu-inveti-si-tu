# Module

Modularizarea codului este o necesitate în momentul în care dezvolți o aplicație. În timp au fost dezvoltate instrumente care permit modularizarea, dar odată cu apariția lui ES6, modulele fac parte din limbaj.
În ES5, modularizarea codului era realizată folosind biblioteci de cod precum RequireJS ce implementează standardul Asynchronous Module Definition (AMD) și modul de a realiza modularizarea de către NodeJS, structurând modulele după cerințele CommonJS (încărcare sincronă).

Istoric vorbind, un anumit nivel de modularizare era făcut prin încărcarea diferitelor fragmente de cod JS în pagina web, dar acest lucru nu poate constitui un adevărat sistem de gestiune a diferitelor părți utile pentru a rula în armonie.

```html
<script type="application/javascript" src="CALE/inițializare.js" ></script>
<script type="application/javascript" src="CALE/procese.js" ></script>
```

Totuși, cel mai util ar fi să existe un singur punct de intrare în aplicația care ar trebui să fie capabilă să gestioneze toate dependințele.

```html
<script type="application/javascript" src="CALE/main.js" ></script>
```

## O privire retrospectivă

JavaScript este un limbaj de programare care nu a avut din start suport pentru module. Singura metodă de a modulariza codul era prin setarea unor variabile globale. Inconvenientul este evident de vreme ce poți atribui altă valoare unui identificator pierzând referința la valoarea preexistentă. O altă variantă a fost introducerea codului în funcții, care erau autoexecutabile, returnând un obiect, care se prezenta ca o interfață.

```javascript
var modul = function mod01 () {
    var x = 10;
    return {
        adun: function (val) {
            console.log(x + val);
        }
    };
}();

modul.adun(3);
```

Și această metodă era supusă unor rigori de lucru privind ordinea de încărcare. În plus era mai mult de scris cod dedicat, adică funcția care returna obiectul, ș.a.m.d. Pentru a rezolva problemele menționate, dar și cu gândul de a rezolva posibilele circularități ale dependințelor (un modul x cere modulul y, care la rândul lui îl cere pe z, dar z are nevoie neapărat pe x), în practică s-a mai recurs la registre de dependințe. Acestea țineau evidența dependințelor, care pentru a evita încărcarea repetată, dacă *vedeau* că deja sunt încărcate, nu se mai executau.

```javascript
// registru
var modules = (function reg () {
    var module = {}; // un registru de evidență
    function define (nume_mod, functie) {
        // lazzy-loading
        if (module[nume_mod]) throw new Error('Modulul există deja și este încărcat!')

        var modul = {
            exports: {},
            func: functie,
            executat: false
        };
        module[nume_mod] = modul; // populezi obiectul modulelor
    };
    function require (nume_mod) {
        var modul = module[nume_mod];

        if(!modul) throw new Error('Nu există modulul cerut!')
        if(!modul.executed) {
            modul.executat = true;
            modul.func.call(module, modul, module.exports)
        }
        return modul.exports;
    };
    return {
        define: define, // expune metoda de lucru cu registrul
        require: require
    };
}());

// modul01.js
modules.define('primo', function mod01 () {
    var x = 10;
    return function adun (val) {
        return x + val;
    };
});

// modul02.js
modules.define('secundo', function mod02 () {
    var primo = modules.require('primo')(4);
    return {
        valoareCalculata: function dividCu (divizor) {            
            return primo / divizor;
        }
    }
});

// app
var ceva = modules.require('secundo');
console.log(ceva.valoareCalculata(3)); // 4.666666
```

Trebuie să-ți imaginezi aceste fragmente de cod fiecare în fișierul propriu. Odată strânse într-unul singur (operațiunea de bundling - `cat registru.js modul01.js modul02.js app.js > main.js`) vor funcționa corespunzător.

## Spune standardul

Un Module are un `Module Record` care conține informație privind structura de import și export a unui modul. Înregistrările conținute sunt folosite doar la evaluarea unui modul. Modulele oferă avantajul că rulează codul în `"strict mode"` deja.

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

Din nefericire, nu poți importa sau exporta într-o manieră condițională și nici nu poți introduce enunțurile de export sau import într-un bloc de cod.
Privind comportamentul importurile beneficiază de hoisting așa că nu contează unde se menționează importul d.p.d.v. sintactic.

### Importurile

**Importurile simple**

```javascript
/* main.js */
import oFuncție from 'src/manager'
```

**Importurile cu namespace**

```javascript
/* main.js */
import * as bibliotecaCod from 'src/bib';
```

Acest tip de import va aduce codul unui modul ca un obiect care va avea o singură proprietate.

**Importurile în baza identificatorilor**

```javascript
import {numeId1, numeID2} from 'src/bib';
```

**Importuri în baza identificatorilor cu redenumire**

```javascript
import {numeId1 as idLocal, numeId2} from 'src/bib';
```

Poți transforma și numele exportului default la momentul importului.

```javascript
import {default as localId} from 'src/bib';
```

**Importul întregului modul**

Se poate încărca întregul modul evitând orice import. Primul import de acest tip va încărca și va executa de îndată corpul modulului.

```javascript
import 'src/lib';
```

Sunt permise și câteva combinații între aceste stiluri de import. De exemplu, poți combina importul default cu cel pe bază de identificatori.

```javascript
import defaultul, * as biblioCod from 'src/lib';
// sau
import defaultul, {numeFunc1, numeFunc2} from 'src/lib';
```

### Exporturi

Din interiorul unui modul pot fi exportate lucrurile care sunt necesare.

Prima metodă constă în exportul per declarație în interiorul codului modulului. Pentru a realiza exportul, pur și simplu vei pune cuvântul cheie `export` înainte oricărei declarații pe care dorești să o exporți.

```javascript
/* modul01.js */
export function facCeva () {};
```

## Suport

În acest moment, modulele nu au un suport extins în toate browserele, dar există metode folosite în comunitatea programatorilor pentru a trece peste aceste neajunsuri temporare.
După cum bine știm, în HTML avem un tag pe care-l folosim pentru a încărca programele JavaScript. Acesta este `<script>`. În cazul modulelor, tagul `script` va mai avea un atribut în plus care indică un modul.

```html
<script type="module"></script>
```

Care ar fi caracteristicile unui modul spre deosebire de încărcarea clasică? Păi, mai întâi de toate, un modul rulează întotdeauna în `"strict mode"`, este executat asincron, iar pentru valoarea lui `this` avem `undefined`.

În cazul în care dorești să exporți mai multe elemente, acestea vor fi puse într-o listă de export.

```javascript
/* modul01.js */
var ceva = 10;
function facCeva () { return 'x'; };
export {ceva, facCeva};
// poți schimba numele la export
export {ceva as altceva, facCeva};
```

### Modularitate extinsă

Modularitatea înseamnă că poți exporta dintr-un modul un alt modul.

```javascript
export * from 'src/biblCod';
// și cu redenumire
export {facCeva as sarcina, contanta} from 'src/lib02';
```

Trebuie făcută o mențiune: la folosirea combinației `export *`, toate declarațiile `default` sunt ignorate.

## Caracteristicile modulelor

Te vei întreba când se execută un modul? Răspunsul este la momentul încărcării.
Modulele pot importa din alte module iar extensia fișierului poate fi omisă pentru simplificare. Pentru a ajunge la module se pot folosi căi relative, absolute sau nume care identifică modului, dar care trebuie configurate pentru a oferi această facilitate.

Modulele sunt niște Singleton-uri, ceea ce înseamnă că ori de câte ori va fi importat în cursul execuției unui program, doar o singură instanță va fi activă.

## Referințe

-   [Axel Rauschmayer. Exploring ES6. 16. Modules](http://exploringjs.com/es6/ch_modules.html#sec_modules-vs-scripts)
-   [Addy Osmani. Writing Modular JavaScript With AMD, CommonJS & ES Harmony](https://addyosmani.com/writing-modular-js/)
-   [CommonJS Notes](http://requirejs.org/docs/commonjs.html)
