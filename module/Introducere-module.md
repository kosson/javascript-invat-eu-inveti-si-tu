# Module ECMAScript

Modulele în JavaScript sunt cunoscute în literatura de specialitate ca *Module ECMAScript*, *ES modules* sau *ESM*. Scopul realizării modulelor este cel al divizării aplicației în părți mai ușor de întreținut și conectat unele cu celelalte. Modularitatea înseamnă și separarea funcționalităților după anumite criterii urmărite în realizarea aplicației.

**Spune standardul**:

> Un Module are un `Module Record` care conține informație privind structura de import și export a unui modul. Înregistrările conținute sunt folosite doar la evaluarea unui modul. Modulele oferă avantajul că rulează codul în `"strict mode"` deja.

Modulele ECMAScript sunt fișiere JavaScript care au extensia `.mjs`. Totuși, chiar dacă această extensie trebuie folosită, pot fi întâlnite module care au extensia `.js`.

## Preliminarii

Modularizarea codului este o necesitate în momentul în care dezvolți o aplicație. În timp, au fost dezvoltate instrumente care permit modularizarea, ES6 (ES2015), fiind versiunea care introduce modulele în limbaj. Este util să ne amintim faptul că browserul încarcă scripturile JavaScript într-un mod asincron. În ES5, modularizarea codului în browsere era realizată folosind biblioteci de cod precum RequireJS ce implementează standardul Asynchronous Module Definition (încărcare asincronă), iar modul de a realiza modularizarea în Node.js este guvernat de modelul pe care CommonJS (încărcare sincronă) îl oferă.

Istoric vorbind, un anumit nivel de modularizare era realizat prin încărcarea diferitelor fragmente de cod JS în pagina web, dar acest lucru nu poate constitui un adevărat sistem de gestiune a diferitelor părți utile pentru a rula în armonie.

```html
<script type="application/javascript" src="CALE/inițializare.js" ></script>
<script type="application/javascript" src="CALE/procese.js" ></script>
```

Totuși, cel mai util ar fi să ai un singur punct de intrare în aplicație.

```html
<script type="application/javascript" src="CALE/main.js" ></script>
```

Odată cu apariția lui ES6, browserele încep să ofere suport pentru module. Modulele JavaScript se încarcă asincron precum scripturile.

```html
<script type="module" src="./main.js"></script>
```

Capacitatea unui browser de a gestiona module indică faptul că oferă suport pentru toate caracteristicile funcționale ale lui ES2015+. Pentru a încărca modulul trebuie menționată locația fișierului modul:

- folosind o adresă web completă cu întreaga cale către fișierul modul: `<script type="module" src="https://ceva.ro/main.js"></script>`,
- o cale absolută: `<script type="module" src="/radacina/subdirector/main.js"></script>`,
- o cale relativă: `<script type="module" src="./main.js"></script>`,
- o cale relativă cu adresare în adâncime sau către directorul părinte: `<script type="module" src="../main.js"></script>`

Pentru a desemna clar fișierele JavaScript care sunt module (*ES Modules*), acestestea vor purta extensia `mjs` care va preciza clar natura acestora, forțând parsarea acestora ca module.

În cazul în care dorești ca browserul să încarce fișiere JavaScript obișnuite, poți specifica acest lucru printr-un simplu atribut `nomodule` precum în `<script nomodule src="unScript.js"></script>`. Această precizare pe care o facem browserului poate fi folosită și ca un mecanism de asigurare a compatibilității în cazul în care browserul nu are suport pentru module.

## Caracteristici ale modulelor

Codul unui modul este executat într-un mediu lexical (scope) propriu ceea ce înseamnă că variabilele, funcțiile și clasele sale nu vor fi disponibile mediului lexical global. Când motorul JavaScript parsează fișierele modul, după ce le-a descărcat, creează pentru fiecare ceea ce numim un *Module Record* în care sunt trecute importurile, exporturile, entitățile modulului și `Realm`-ul. Modulele instanțiate deja nu vor mai fi instanțiate încă o dată chiar dacă sunt cerute de mai multe alte module. Se face un *caching* al modulelor. Acest mecanism de evidență pentru gestiunea cache-ul modulelor, se numește [module maps](https://html.spec.whatwg.org/multipage/webappapis.html#module-map), un *caiet* de evidență.

Apoi motorul va transforma acest *Module Record* într-o instanță funcțională a modulului. Instanțierea înseamnă și crearea alocărilor în memorie pentru variabile și altor entități, dar nu vor fi legate la valori încă. Apoi se vor crea alocări pentru exporturi și vor fi conectate importurile la ceea ce există deja instanțiat (modulele copil vor fi instanțiate ultimele până când toate dependințele au fost instanțiate). Ultimul pas este să se facă evaluarea codului din module în acest moment fiind disponibile și valorile care au fost legate la identificatorii lor. Deci avem faza de încărcare, de instanțiere și de execuție.

Toate modulele rulează implicit sub directiva `"use strict"`, ceea ce înseamnă automat că referința `this` este `undefined`. Un program JavaScript care rulează sub declarația `"use strict;"`, poate fi compilat ca modul JavaScript. Poate fi considerat modul JavaScript orice script care folosește declarațiile `import` și `export`.

Pentru a avea acces la componentele unui modul din alt modul, trebuie să le exporți individual, creându-se astfel *referințe active* (*live bindings*) către acestea. Modulele pot fi importate menționând calea și uneori chiar URL-ul. Modulele sunt obiecte unice care pot fi importate o singură dată (Singleton). În obiectul global vei avea doar identificatori pentru module.

Modulele au o structură *statică*, adică nu poți face modificări de structură la momentul executării acestora. Doar legăturile către elementele modulului sunt dinamice în sensul că poți accesa entitățile respectivului modul și poți modifica valori din obiectele modulului de la care ai respectivele referințe importate.
Un modul ECMAScript poate importa și exporta în același timp.

Momentul executării un modul este la momentul încărcării. În funcție de atributele adăugate tag-ului `<script>`, fie `defer`, fie `async` modulul este încărcat și executat diferit în raport cu timpii de încărcare ai paginii.

![Modelele de încărcare asincronă](https://html.spec.whatwg.org/images/asyncdefer.svg)

Modulele pot importa din alte module. Extensia fișierului poate fi omisă pentru simplificare. Pentru a ajunge la module se pot folosi căi relative, absolute sau nume care identifică modulul, dar care trebuie configurate pentru a oferi această facilitate.

Modulele sunt niște Singleton-uri, ceea ce înseamnă că ori de câte ori va fi importat în cursul execuției unui program, doar o singură instanță va fi activă.

## Scope

Fiecare modul are propriul scope (mediu lexical). Prin `export` faci disponibile elemente ale scope-ului modulului.

Mediile lexicale la care are acces un modul:

- global scope,
- module scope.

### Expunerea de elemente în global scope

Este posibl ca în anumite cazuri să ai nevoie să expui în global scop o entitate sau mai multe. Un caz ar fi un modul care creează un set de elemente cărora li se atașează dinamic receptori (*event listeners*) pentru o funcție care se află și ea în modul. Cum în cazul receptorilor aceștia se așteaptă să *găsească* funcția în global scope - *window*, putem face o *expunere* a respectivului element.

```javascript
// modul
function clickPeDisciplina (evt) {}
globalThis.clickPeDisciplina = clickPeDisciplina;
// buton în window cu onclick:clickPeDisciplina(this)
```

### Accesul la elementele din global

Pentru a avea acces în module la elementele scripturilor încărcate în pagină dar care nu sunt declarate a fi module, le poți importa direct într-un modul care are nevoie de ele.

```javascript
// un modul
import '../lib/editorjs/editor.js';
import '../lib/editorjs/header.js';
import '../lib/editorjs/paragraph.js';
import '../lib/editorjs/list.js';

// restul codului
```

## Încărcare întârziată cu defer

Folosirea lui `defer` garantează faptul că scripturile vor fi încărcate după ce s-a încheiat parsing-ul codului HTML. Scripturile care sunt module sunt încărcate asemănător comportamentului `defer`, adică asincron. Scripturile *inline* pot fi încărcate asincron.

```javascript
<!-- Mă voi executa după A, B, dar înaintea lui C -->
<script type="module">
  console.log("Modul inline");
</script>

<!-- A -->
<script type="application/javascript" src="ceva.js"></script>

<!-- B -->
<script defer type="application/javascript">
  console.log("Mă încarc al doilea");
</script>

<!-- C -->
<script defer type="application/javascript" src="altceva.js"></script>
```

Reține faptul că modulele se încarcă întotdeauna în regim `defer`.

### Preîncărcarea modulelor

Atunci când *împarți* codul în mai multe module, ar fi de mare ajutor să [preîncarci](https://developers.google.com/web/updates/2017/12/modulepreload) modulele pentru că vei beneficia nu numai de descărcarea modulelor, ci vor fi parsate și compilate de îndată.

### Încărcarea asincronă cu async

Încărcarea asincronă a fișierelor JavaScript este aplicabilă și modulelor, fie acestea fișiere separate, fie *inline*. Reține faptul că în cazul folosirii `async`, scripturile se vor încărca și executa de îndată ce vor fi aduse de browser, adică în funcție de dimensiunea lor. În acest caz, ordinea în care apar în DOM nu mai contează.

```javascript
<!-- Acest fragment de cod se execută de îndată ce scripturile care necesită `import` au fost aduse de browser -->
<script async type="module">
  import {afișezText} from './utilitare.mjs';
  afișezText('Salut prieteni!');
</script>

<!-- Se execută când s-a terminat aducerea sa dar nu înainte de a aduce importurile -->
<script async type="module" src="1.mjs"></script>
```

### Particularitățile modulelor față de scripturile clasice

Trebuie menționat faptul că modulele se execută o singură dată indiferent de câte ori le menționezi în codul HTML contrar comportamentului scripturilor tradiționale, care se execută de mai multe ori, dacă sunt menționate de mai multe ori. Mai există o deosebire notabilă față de comportamentul scripturilor clasice: toate modulele sunt aduse respectând [CORS - Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS); în header trebuie să existe `Access-Control-Allow-Origin: *`.

## O privire retrospectivă

JavaScript este un limbaj de programare care nu a avut din start suport pentru module. Singura metodă de a modulariza codul era prin setarea unor variabile globale. Inconvenientul este evident de vreme ce poți atribui altă valoare unui identificator pierzând referința la valoarea preexistentă. O altă variantă a fost introducerea codului în funcții, care erau autoexecutabile, returnând un obiect, care se prezentă ca o interfață.

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

Și această metodă era supusă unor rigori de lucru privind ordinea de încărcare. În plus, era mai mult de scris cod dedicat, adică funcția care returna obiectul, ș.a.m.d. Pentru a rezolva problemele menționate, dar și cu gândul de a rezolva posibilele circularități ale dependințelor (un modul x cere modulul y, care la rândul lui îl cere pe z, dar z are nevoie neapărat pe x), în practică s-a mai recurs la registre de dependințe. Acestea țineau evidența dependințelor, care pentru a evita încărcarea repetată, dacă *vedeau* că deja sunt încărcate, nu se mai executau.

```javascript
// registru
var modules = (function reg () {
    var module = {}; // un registru de evidență
    function define (nume_mod, functie) {15.2 Modules
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

### Modularitate folosind namespace-uri

O altă metodă folosită pentru a realiza modularitatea codului era aceea de a construi namespace-uri, adică spații lexicale izolate prin folosirea funcțiilor ce ofereau un scope și mai ales closure pe acesta.

```javascript
var unSpatiuSeparat = {};
(function (sp) {
  var oVariabilaPrivata = 'sunt doar aici';
  sp.facCeva = function facCeva () {};
  sp.valoare = 'eu sunt accesibilă din exterior'
})(unSpatiuSeparat);
console.log(unSpatiuSeparat.valoare);
```

## Analiza modulelor

Regula spune că un modul JavaScript este un fișier întreg de cod. Pentru a lucra cu modulele, se vor folosi următoarele cuvinte rezervate: `export`, `default` și `import {numeModul} from numeModul`.

**Moment ZEN**: Un modul exportă referințe (*bindings*), nu valori.

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

Sau poți exporta un singur lucru în mod automat folosind cuvântul rezervat *default*. Aceasta va fi valoarea principală exportată.

```javascript
/* modulul lucru.js */
export default function facLucruri (a) { return a++; } // aici nu pune punct și virgulă

/* main.js */
import facLucruri from "facLucruri";
facLucruri(2);
```

Fii foarte atent pentru că în cazul exportului folosind `default`, NU trebuie încheiat enunțul cu punct și virgulă.

```javascript
/* clasa1.js */
export default class Ceva { } // nu încheia cu punct și virgulă

/* main.js */
import Clasa1 from "clasa1";
let clasa1 = new Clasa1();
```

Din nefericire, nu poți importa sau exporta într-o manieră condițională și nici nu poți introduce enunțurile de export sau import într-un bloc de cod. Privind comportamentul, importurile beneficiază de hoisting așa că nu contează unde se menționează importul d.p.d.v. sintactic.

### Importurile

Atunci când faci un import, reține faptul că ceea ce aduci este un set de referințe către valori din modulul din care ai făcut importul. Acest aspect implică faptul că poți modifica starea sau valorile respectivelor referințe.

#### Importurile simple

Aceste importuri sunt cel mai simplu mecanism de a încărca un modul. Mai sunt numite și *importuri statice*.

```javascript
/* main.js */
import oFuncție from 'src/manager'
```

#### Importurile cu namespace

Poți importa un modul ca un obiect care se va comporta ca un namespace ce grupează funcționalățile oferite de modul.

```javascript
/* main.js */
import * as bibliotecaCod from 'src/bib';
```

Acest tip de import va aduce codul unui modul ca un obiect care va avea o singură proprietate.

#### Importurile în baza identificatorilor

Te poți folosi de destructuring pentru a folosi doar părțile unui modul de care ești interesat.

```javascript
import {numeId1, numeID2} from 'src/bib';
```

Odată cu apariția versiunilor noi de după momentul ES6 (ES2015+), modulele pot fi încărcate și din surse externe.

```javascript
import {timerNou} from "https://fabrica.io/module/timeFactory.mjs";
```

#### Importuri în baza identificatorilor cu redenumire

```javascript
import {numeId1 as idLocal, numeId2} from 'src/bib';
```

Poți transforma și numele exportului `default` la momentul importului.

```javascript
import {default as localId} from 'src/bib';
```

#### Importul întregului modul

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

#### Importuri dinamice

Importurile dinamice se realizează prin apelarea funcției `import` în al cărui argument precizezi calea unde se găsește modulul. Ceea ce returnează funcția este o promisiune.

```javascript
butonDeIncarcare.addEventListener("click", (event) => {
    event.preventDefault();
    import("/module/prelucrezDate.js")
        .then((modul_prelucrător) => {
            // folosești metodele.funcțiile pe care le oferă modulul
        })
        .catch((error) => {
            console.error(error);
        });
});
// alternativa ar fi utilizarea folosind await
let modul_prelucrător = await import("/module/prelucrezDate.js");
```

Folosirea acestui model de încărcare a modulului oferă un avantaj suplimentar. Dependințele și corpul modulului în sine sunt descărcate și evaluate doar la momentul în care modulul este folosit.

### Exporturi

Din interiorul unui modul pot fi exportate lucrurile care sunt necesare. Pot fi exportate variabile, funcții, clase și obiecte.

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

## Resurse

- [15.2 Modules | ECMAScript® 2020 Language Specification](http://www.ecma-international.org/ecma-262/11.0/index.html#sec-modules)
- [Axel Rauschmayer. Exploring ES6. 16. Modules](http://exploringjs.com/es6/ch_modules.html#sec_modules-vs-scripts)
- [Addy Osmani. Writing Modular JavaScript With AMD, CommonJS & ES Harmony](https://addyosmani.com/writing-modular-js/)
- [CommonJS Notes](http://requirejs.org/docs/commonjs.html)
- [ES modules: A cartoon deep-dive | Lin Clark](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
- [Deploying ES2015+ Code in Production Today | Philip Walton](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)
- [Using Native JavaScript Modules in Production Today | Philip Walton](https://philipwalton.com/articles/using-native-javascript-modules-in-production-today/)
- [ECMAScript modules in browsers | Jake Archibald](https://jakearchibald.com/2017/es-modules-in-browsers/)
- [ECMAScript 6 modules: the final syntax](https://2ality.com/2014/09/es6-modules-final.html)
- [JavaScript modules|v8.dev|18 June 2018](https://v8.dev/features/modules)
- [JavaScript Module Pattern: In-Depth](https://www.nilovelez.com/2018/06/javascript-module-pattern-in-depth/)
- [8.1.5.4 Module-related host hooks](https://html.spec.whatwg.org/multipage/webappapis.html#integration-with-the-javascript-module-system)
- [Reduce JavaScript Payloads with Tree Shaking | Jeremy Wagner | Web Fundamentals | developers.google.com](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking)
