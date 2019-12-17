# Legătura `this` - context de execuție

Imaginează-ți *Oceanul planetar*. Acesta este obiectul nostru global. Să ne închipuim că orașele cu porturi sunt obiecte. Funcțiile sunt nave care prelucrează și transportă valori. Navele sunt la rândul lor obiecte având fiecare un nume și un pavilion sub care sunt înregistrate. De fiecare dată când intră într-un port, se leagă la o bază de date a portului disponibilă navei. Conexiunea realizată la baza de date a portului să o numim `this`.

Această relație trebuie lămurită pentru că, de fapt, o funcție întodeaunea rulează în contextul unui obiect. Cuvântul cheie `this` identifică o legătură cu mediul lexical al contextului de execuție pentru o funcție la momentul execuției sale. Cuvântul crucial este **legătură**. Legătura se realizează doar la momentul executării funcției!

**Moment ZEN**: O funcție trebuie să fie în execuție pentru a realiza o legătură `this`.

Atunci când o funcție este apelată, motorul rulează niște algoritmi interni care fac ca minunea de *funcție obiect* să înceapă evaluarea propriului corp de cod. Am descoperit anterior faptul că un obiect care este o funcție, se diferențiază de celelalte obiecte prin faptul că are un slot intern `[[Call]]`, care este de fapt o metodă internă a motorului. Această metodă la care noi nu avem acces, primește doi parametri. Unul este `this` și celălalt este `arguments`.

**Spune standardul**:

> Un mediu de funcție este un Mediu Lexical care corespunde invocării unei funcții obiect ECMAScript. Un mediu de funcție poate stabili o nouă legătură `this`. ([function environment, 8.1 Lexical Environments](https://www.ecma-international.org/ecma-262/10.0/index.html#function-environment)).

Multe informații necesare înțelegerii `this` se leagă de mediile lexicale.
*Legătura* (termenul în engleză fiind `binding`) la `this` se stabilește cu obiectul *din care* s-a făcut apelul (în literatura din limba engleză i se spune *call-site*).

Nu contează unde a fost declarată funcția, ci locul unde a fost invocată. Locul declarării contează atunci când se dorește a se face un *closure* pe mediul lexical din care face parte prin declararea sa acolo.

## Mică anatomie

Pentru a înțelege legătura `this`, vom observa ce ce petrece când aceasta se pierde. Să luăm cazul unei funcții cu rol de metodă, fiind definită într-un obiect. Metoda noastră este gazda unei alteia, care realizează un *closure* pe mediul lexical al gazdei. Un *closure* este un *registru inventar* al mediului lexical existent la momentul definirii funcției - ce era *în jurul* funcției.

```javascript
// "use strict"; // în acest caz, this is undefined
var ceva = 100; // ai putea declara și cu let
/* let împiedică `ceva` să devină variabilă globală */
const obi = {
  ceva: 'text',
  faCeva: function gazda () {
    let ceva = 1000;

    function interna () {
      console.log(this.ceva); // 100
      console.log(ceva);      // 1000
    };

    return interna();
  }
};
obi.faCeva(); // 100
// dacă declari cu let este returnat undefined
```

Apelarea funcției `interna`, nu realizează o legătură `this` la obiectul în care este definită metoda, adică `gazda()`. Legătura se face la obiectul global, iar dacă fragmentul de cod ar rula sub regula `use strict`, rezultatul ar fi `undefined`. Douglas Crockford spune despre acest comportament că este o eroare de proiectare a limbajului. O funcție găzduită de o metodă, ar trebui să aibă acces la membrii obiectului metodei, folosind aceeași legătură `this` pe care o folosește metoda, care joacă rol de gazdă. În trecut, această necesitate era rezolvată printr-o *punte lexicală* pe care o veți întâlni în mod curent în cod *legacy*.

```javascript
var valoare = 10;
const obi = {
  valoare: 1000,
  valDinObi: function daMiVal () {
    var punte = this; // puntea lexicală
    var dinLexEnvMetoda = 10000;
    function interna () {
      console.log(this.valoare); // 10
      console.log(punte.valoare); // 1000
      console.log(dinLexEnvMetoda); // 10000
    }
    return interna();
  }
};
obi.valDinObi();
```

Am numit `punte` variabila care face conectarea cu obiectul la care s-a legat `this`-ul metodei. În codul altora veți vedea ceva similar cu `var that = this;`, identificatorul variabilei în limba engleză însemnând *acela*. Între timp au fost adăugate limbajului funcțiile *fat arrow*, care folosesc legătura `this` pe care funcția gazdă a realizat-o.

```javascript
var valoare = 10;
const obi = {
  valoare: 1000,
  valDinObi: function daMiVal () {
    var dinLexEnvMetoda = 10000;
    var interna = () => {
      console.log(this.valoare);    // 1000
      console.log(dinLexEnvMetoda); // 10000
    }
    return interna();
  }
};
obi.valDinObi();
```

Într-un astfel de scenariu, nu mai este nevoie de a face puntea lexicală `var that = this;` pentru a obține o referință către obiectul context al gazdei.

Chiar dacă o funcție este declarată în interiorul unui obiect, îndeplinind rolul de metodă a acestuia, trebuie considerată a fi un obiect separat de acesta. Nu putem gândi în termenul de *apartenență* la un anumit obiect doar pentru că a fost declarată într-o metodă. În ceea ce privește metodele, acestea aparțin unui obiect în măsura în care acel obiect oferă *adresa* la care pot fi găsite. Dar ele tot funcții obiect distincte sunt cu particularitatea că se conectează automat prin `this` la obiectul în care sunt declarate.

O metodă nu poate fi accesată ca valoare sau apelată din exteriorul obiectului altfel decât folosind sintaxa cu punct: `obiect.funcție`. Referința prin `this` va reflecta identificatorii mediului lexical local al obiectului de la momentul execuției metodei.

**Moment ZEN**: În JavaScript toate obiectele sunt entități independente. Ele realizează conexiuni unele cu celelalte prin referințe.

Obiectul poate fi considerat ca un furnizor de adresă, pentru a putea apela funcția-obiect, care joacă rol de metodă. Legătura aceasta poate fi văzută precum relația dintre navă și portul în care se află. Numele danei oferă o modalitate de a ajunge la navă. Pentru a înțelege, putem explora mai departe apelând în contextul unui obiect distinct metoda unui alt obiect.

```javascript
const obi = {
  ceva: 'text',
  faCeva: function gazda () {
    function interna () {
      console.log(this === window);
    };
    return interna();
  }
};
const obi2 = {
  ceva: 'alt text',
  faCeva: obi.faCeva
};
obi2.faCeva(); // true
```

Adu-ți aminte mereu că fiecare funcție-obiect este o entitate distinctă. Asta ne permite să o declarăm oriunde în cod sau unde este permisă o expresie de funcție. Putem declara direct în obiect o funcție, dar nimic nu ne împiedică să declarăm funcțiile în afara acestuia. Apoi facem referință către ele. Declari funcțiile în afara obiectelor atunci când știi că vor fi folosite de mai multe obiecte sau alte funcții. Declararea în interiorul unui obiect, creează o adresă unică pentru acea funcție. În acest caz spunem despre obiect că a creat un `namespace` - **un domeniu** al cărui valori sunt accesibile doar prin menționarea numelui obiectului mai întâi.

### Relația lui this cu obiectul global

Pentru funcțiile declarate în obiectul global și executate tot aici, legătura `this` se va stabili direct la acesta. În cazul browserelor, obiectul global va fi `window`, iar pentru NodeJS este `global`. Declararea cu `let` a variabilelor, nu crează nimic în obiectul global. Exemplele folosite se folosesc de capacitatea lui `var` de a îmbogăți obiectul global.

**Spune standardul**:

> Declarațiile globale de funcții sunt întotdeauna reprezentate precum proprietăți ale obiectului global.

Dacă ai deprins practica bună a folosirii lui `"use strict";`, atunci vei observa că legătura la `this` nu se va mai face la obiectul global, iar valoarea va fi `undefined`.

```javascript
function arataMiThis () {
  console.log(this === Window);
};
arataMiThis (); // true
// sub regulă
"use strict";
function arataMiThis () {
  console.log(this === undefined);
};
arataMiThis (); // true
// sau restricționat la funcție
function arataMiThis () {
  "use strict";
  console.log(this === undefined);
};
arataMiThis (); // true
```

Atenție, nu contează dacă locul apelării este sub regula `"use strict";`, ci contează dacă funcția este sub această regulă. Am menționat acest aspect pentru că este posibil ca software-ul scris de tine să respecte regula `"use strict";`. Uneori propriul software este posibil să fie legat de software mai vechi (programatorii îi spun în engleză **legacy**, adică **moștenit**), care nu este sub regulă și astfel, fiind posibilă apariția unei serii de erori a căror sursă să fie chiar această diferență.
Reține că pentru codul sub `"use strict";`, valoarea lui `this` este `undefined` pentru funcțiile declarate în global scope.

## Cum se realizează legăturile this

Este esențial să fie înțeles **modul în care** se face legătura `this` și îndeosebi **când** se realizează. Adu-ți mereu aminte că declararea unei funcții, transformă acea funcție într-o valoare. Nimic mai mult. Abia când este invocată, are puterea să facă ceva: creează un mediu lexical propriu, realizează legătura `this` la obiectul în al cărui context rulează, face un closure pe mediul lexical din locul unde a fost declarată și abia apoi evaluează codul din corp.

Propun să explorăm cazurile în care se face legătura la `this` și la care obiect se face.

| Cazul de invocare a funcției                 | Cine este `this`                                             |
|:-------------------------------------------- |:------------------------------------------------------------ |
| funcție declarată în obiectul global         | obiectul global, dar în `"use strict";` este `undefined`     |
| funcție declarată într-un obiect: metodă     | obiectul pentru care funcția joacă rol de metodă             |
| funcția este constructor                     | `this` este însuși obiectul returnat prin invocarea cu `new` |
| folosirea cu `apply()`, `call()` și `bind()` | `this` este obiectul specificat în primul parametru.         |

### 1. Conectarea la obiectul global

Este prima regulă, fiind și cazul simplei invocării a unei funcții. Conectarea automată se face la objectul global, care în cazul browserului este `window`. Funcționează dacă nu este rulat codul sub regula `"use strict";`. Am dezbătut deja cazul pierderii legăturii `this` către obiectul dorit.

Privind structura lexicală (cum arată codul redactat), intuitiv ar fi ca legătura `this` să se facă către obiectul metodei în interiorul căreia a fost definită. Realitatea este că declararea s-a făcut în interiorul metodei unui obiect, iar obiectele sunt colecții de entități accesibile printr-o referință. Către o funcție internă a unei metode, nu avem o referință. Totuși, declarând funcția în interiorul metodei, transmitem dorința umană de a avea acces la membrii obiectului respectiv. Funcția cu rol de metodă are acces la membrii obiectului prin `this`, dar funcțiile găzduite de aceasta, nu. Funcțiile găzduite nu *moștenesc legătura* `this`, fiecare funcție realizând propria legătură la momentul execuției. În cazul funcțiilor găzduite de metode, fiind declarate în metode, legătura `this` se face la obiectul global. Opus acestui comportament, dorința umană este de a putea accesa elementele obiectului. Acest fapt a condus către o practică acum caducă: realizarea de punți lexicale către obiectul referențiat prin `this` de forma `let self = this;`.

```javascript
let x = 10;
const obi = {
  x: 100,
  acces () {
    let self = this;
    function interna () {
      // de fapt este windows.interna
      console.log(x);       // 10
      console.log(self.x);  // 100
    };
    interna();
  }
};
obi.acces();
```

De fapt, se face o *referință* către mediul lexical *văzut* de funcția cu rol de metodă pentru care aceasta face un closure. Closure-ul va include `self`, care este o referință către obiectul context al metodei.

### 2. Conectarea la un obiect context

Legătura `this` se face la identificatorii din mediul lexical al obiectului care este contextul de execuție (**call site**).

```javascript
const obiectLiteral = {
  ceva: 2,
  metoda: faCeva
};
function faCeva () {
  this.test = 1001; // introduce în obiectLiteral test
  this.ceva = 50;   // modifica valoarea lui ceva
};
obiectLiteral.metoda();
console.log(obiectLiteral.test); // 1001
console.log(obiectLiteral.ceva); // 50
```

Ceea ce trebuie reținut este faptul că atunci când funcția constituie legătura `this`, prin această referință, poate modifica valorile obiectului context și chiar poate să-l îmbogățească cu noi proprietăți.

### 3. Legătură constituită explicit

Metodele `call()`, `apply()` și `bind()` sunt disponibile tuturor funcțiilor prin moștenire de la obiectul intern `Function`. Poți folosi aceste metode moștenite pentru a indica explicit obiectul, care va fi contextul de execuție al funcției. Funcțiile `call()` și `apply()` iau ca prim parametru un obiect la care se va face legătura `this`. Pentru că este afirmat în mod direct unde dorești să fie `this`, numim această metodă de a realiza legătura: **binding explicit** - **legătură explicită**.

În cazul în care vei pasa acestor metode valoarea unei primitive simple de tip string, boolean sau number, atunci primitiva va fi *împachetată* în obiectul corespondent (`new String(...)`, `new Boolean(...)` sau `new Number(...)`) și abia la acesta se va face binding-ul `this`. Acest lucru se numește "boxing".

#### Conectarea cu apply() și call()

Avem posibilitatea de a scrie o funcție cu rol de metodă, care să poată fi folosită în alt obiect.

```javascript
let proprietate = "ceva din global";
const obiectLiteral = { proprietate: "altceva" };
let faceva = function () {
  console.log(this.proprietate);
};
faceva.call(obiectLiteral); // altceva
faceva(); // ceva din global
```

De fapt, `call()` și `apply()` schimbă contextul. Dacă vrei să pasezi argumente funcției, acestea vor urma referința către noul context. Fii foarte atent căci de vei pasa drept prim parametru lui `call()` sau lui `apply()` o valoare `null` sau `undefined`, motorul leagă `this` la obiectul global. Scrierea codului sub regula `"use strict";` nu mai permite această legătură. Chiar și când se face un binding explicit, se poate pierde legătura `this`. Soluția ar fi *îmbrăcarea* într-o funcție *gazdă*.

O altă metodă pentru a realiza conectarea la `this`-ul dorit este folosirea noilor tipuri de funcții introduse de versiunea ES6 a standardului: arrow functions. Funcțiile săgeată  mențin legătura `this` care exista la momentul definirii sale, adică la mediul lexical în care a fost declarată. Dacă funcția arrow este definită sau referită într-un object literal, legătura `this` a unei funcții săgeată este obiectul global.

```javascript
var fix = 1000;
let faCeva = function () {
  console.log(this === window);
  console.log(this.fix);
};
let faAltceva = () => {
  console.log(this === window);
  console.log(this.fix);
};
const centru = {
  fix: 10,
  faCeva,
  faAltceva
};
centru.faCeva();    // false 10
centru.faAltceva(); // true 1000
```

Concluzia este că mediul lexical în care a fost declarată o funcție săgeată, va fi chiar obiectul `this` pentru aceasta. Reține și detaliul că funcțiile săgeată nu realizează propria legătură `this`. O folosesc pe cea realizată de gazdă.

Împachetarea legăturii folosind o funcție gazdă creează posibilitatea de a comunica înspre și dinspre conexiune. Avem o funcție care primește date ca argumente. Avem și un obiect care conține date. Vom folosi o a doua funcție, care la momentul execuției face conectarea dintre prima și obiect. Ba mai mult trimite și datele de prelucrare. Astfel vom realiza dezideratul de injectare a unor date diferite ori de câte ori vom apela a doua funcție.

```javascript
let activitate = function activ (valoare) {
  return this.a + valoare;
};

const obiectGazda = { a: 1000 };

let conectorActivitateGazda = function () {
  return activitate.apply(obiectGazda, arguments);
};

let rezultat = conectorActivitateGazda(100);
console.log(rezultat); // 1100
```

### 4. Conectarea perpetuă la obiect

Este modul în care te asiguri întotdeauna că `this` este predictibil și nu alunecă în global scope. Se realizează un cuplaj forțat între o funcție care trebuie să ruleze musai în contextul unui anumit obiect.

Începând cu ES5 suplimentar existentelor `call()` și `apply()` a fost introdusă și metoda `bind()` în prototipul obiectului intern `Function`. Această metodă este cel mai des întâlnită în uz atunci când se dorește conectarea permanentă a unei funcții cu un obiect. Îți dau un scenariu pentru a răspunde întrebării de ce. Conectarea unei funcții de răspuns la un obiect eveniment generat de interacțiunea unui click cu mouse-ul pe un buton dintr-o pagină. Obiectul este generat de browser, nu de programul tău. Funcția de răspuns este creată de tine. Cum să rulezi funcția de răspuns în contextul unui obiect creat de browser? Acesta este cazul tipic. Reține și faptul că `bind()` returnează o nouă funcție care trebuie apelată ulterior.

```javascript
let activitate = function (valoare) {
  return this.a + valoare;
};
const obiect = { a: 1000 };
// realizarea conexiunii permanente
let binding = activitate.bind(obiect);
// folosirea șablonului cu date
let rezultat = binding(4000);
console.log(rezultat); // 5000
```

Rolul lui `bind()` este acela de a returna o funcție, care face o legătură permanentă a lui `this`, la obiectul în al cărui context funcția rulează.

```javascript
const obi = {
  prop1: 10,
  met: function ex () {
    // setTimeout este o funcție externă a cărui this este global
    setTimeout(function () {
      console.log(this.prop1);  // de regulă, caută prop1 în global
    }.bind(this), 1500);
  }
};
obi.met(); // 10
```

O mulțime de metode ale obiectelor interne JavaScript oferă un parametru opțional numit *context*, care are rolul de a evita folosirea lui `bind()`, asigurând faptul că funcția callback folosește un anume obiect la care să se facă legătura `this`. Un exemplu concludent ar fi parcurgerea unui array cu aplicarea unei funcții folosind metoda `forEach()`:

```javascript
function actiune (date) {
  console.log(date, this.a + date);
};
const obiect = { a: 1000 };
[1, 2, 3].forEach(actiune, obiect);
```

Nu uitați că odată cu ES6 se pot folosi *funcțiile săgeată* - arrow functions. Legătura `this` este una predictibilă în sensul că o folosește pe a gazdei.

### Lanțul prototipal și `this`

Avem un obiect care are declarată o metodă. Din acest obiect sunt moștenite proprietățile de către un alt obiect copil. Invocarea unei metodei moștenite va crea o legătură `this` la obiectul în contextul căreia s-a făcut invocarea, nu la cel părinte, în care a fost definită.

```javascript
const alfa = {
  primo: function () {
    return this.ceva + this.altceva;
  }
};
const beta = Object.create(alfa);
// s-a făcut legătura prototipală la alfa
beta.ceva = 10;
beta.altceva = 10;
console.log(beta.primo()); // 20
```

#### Evenimentele din API-ul browserului

Să ne imaginăm cazul unui obiect care are metode construite special pentru a gestiona o pagină sau un fragment de pagină web prin manipularea evenimentelor. În exemplu vom *înmagazina* răspunsul la un eveniment, adică apelul la o funcție într-un obiect care în scenariul nostru, este răspunzător cu gestiunea evenimentelor din pagină. La momentul execuției funcției când apare evenimentul, contextul său, legătura `this` formată este la obiectul eveniment (evenimentele sunt și ele evenimente). Să presupunem că nu dorim acest lucru. Vrem ca funcția să realizeze o legătură `this` la obiectul în interiorul căruia a fost definită. În cazul nostru, lexicografic vorbind, a fost definită în interiorul unei metode a obiectului. În gândirea noastră, am făcut acest lucru tocmai dorind să indicăm că am dori să folosim pe mai departe obiectul, drept context prin asigurarea unei legături perpetue `this`. Din nefericire, așa cum deja am aflat, definirea unui obiect funcției în alt obiect funcție cu rol de metodă, va stabili întotdeauna o legătură la obiectul global (`window` în cazul browserului și `global` în cazul Node.js).

```javascript
const obiExecutor = {
  codUnicObiect: '1035442',
  captura: function () {
    document.addEventListener('click', function (eveniment) {
      this.prelucreaza(eveniment.type); // trimite tipul evenimentului
    }, false)
  },
  prelucreaza: function(tip){
    console.log(`Prelucrez acest ${tip} pentru ${codUnicObiect}`);
  }
};
```

Pentru a păstra legătura la obiectul în cadrul căreia se dorește a fi executată metoda, este nevoie de `bind(this)`. Fără `bind(this)`, obiectul `this` va fi obiectul DOM la care se atașează **listener**-ul (funcția cu rol de **receptor**). Folosind `bind(this)`, vom reface legătura `this` la obiectul în care a fost declarată metoda. Dar pentru ca acest lucru să se întâmple, se va folosi operatorul de grupare (semnalează o întreagă expresie ce trebuie evaluată) pentru a *repoziționa* legătura `this` la obiectul părinte, nu la obiectul DOM - `('click', (function(){}).bind(this))`.

```javascript
const obiExecutor = {
  captura: function () {
    document.addEventListener('click', (function (eveniment) {
      this.prelucreaza(eveniment.type); // trimite tipul evenimentului
    }).bind(this), false);
  }
};
```
Istoric vorbind, pentru a realiza același efect, s-a folosit puntea lexicală `var that = this;` în metoda obiectului, cu intenția de a **fixa** legătura la `this` printr-o referință. Această practică este caducă. Odată cu noua sintaxă *fat arrow*, se elimină complet problema legăturii `this` pentru că o extresie de funcție folosind *fat arrow* va utiliza legătura `this` stabilită de funcția gazdă.
Folosirea funcțiilor săgeată asigură conectarea la obiectul contextului de execuție dorit în cel mai predictibil mod:

```javascript
let obiExecutor = {
  captura: function () {
    document.addEventListener('click', eveniment => this.prelucreaza(eveniment.type), false);
  }
};
```

## Legătura `this` și *fat arrows*

Funcțiile *fat arrow* nu stabilesc propria legătură `this`. Pur și simplu folosesc obiectul în contextul căruia rulează, iar dacă rulează într-o funcție, vor folosi legătura `this` creată de acea funcție. Funcțiile *fat arrows* sunt legate de scope-ul lexical, asta însemnând că `this` va fi același, adică cel din blocul părintelui. Vom porni analizând cazul în care generăm un obiect în baza unui constructor.

```javascript
var nume = 'Auraș din Global Scope';
// proiectăm un constructor
function Ciao (nume) {
  this.nume = nume;
};
Ciao.prototype.urare = function () {
  setTimeout( function callback () {
    // this acum va fi global scope (window)
    console.log('Ciao, ' + this.nume);
  }, 5000);
};
// generăm obiectul pe baza constructorului
let întâlnire = new Ciao('Daniel!');
întâlnire.urare();  // Ciao, Auraș din Global Scope
```

Când este declarată o variabilă cu `var`, aceasta apare în global scope și va fi afișat în consolă mesajul `Ciao, Auraș din Global Scope` pentru că `this` a fost legat la obiectul global în care avem variabila `nume` ca proprietate a obiectului global. Exemplul va returna `Ciao, undefined` dacă `nume` este declarat cu `let` în loc de `var` pentru că nu va fi creată variabila în obiectul global. Ne-am fi așteptat ca obiectul generat în baza constructorului prin inițializarea cu o valoare, să folosească acea valoare în funcția callback. Dar, o funcție callback este o valoare pătrunsă în mediul lexical al unei alteia, fiind chiar apelată în interiorul ei. Știm deja că funcțiile interne stabilesc automat o legătură `this` la obiectul global.

Pentru a face conectarea la obiectul generat, așa cum am dori de fapt, se va face o legătură a funcției interne (callback-ul) prin metoda `bind()` cu obiectul generat de constructor. Ceea ce face `bind()` este să lege forțat execuția unei funcții de un anumit obiect context. Utilitarul `Function.prototype.bind()` moștenit de toate funcțiile în JavaScript, face o conexiune între obiectul dorit a fi contextul de execuție și funcția ce va fi executată. Spun că va fi executată pentru că folosirea lui `bind()`, returnează o funcție. În cazul nostru aceasta va fi executată pentru că va fi trimisă din coada de așteptare a job-urilor direct în stiva de apeluri, unde va fi executată.

```javascript
var nume = 'Auraș din Global Scope';
function Ciao (nume) {
  this.nume = nume;
};
Ciao.prototype.urare = function () {
  setTimeout( (function callback () {
    console.log('Ciao, '+ this.nume);
  }).bind(this), 3000);
};
let întâlnire = new Ciao('Daniel!');
întâlnire.urare(); // Ciao, Daniel!
```

Datorită faptului că *fat arrows* este legat la scope-ul lexical, nu mai trebuie făcută o legătură apelând la `bind()`.

```javascript
var nume = 'Auraș din Global Scope';
function Ciao (nume) {
  this.nume = nume;
};
Ciao.prototype.urare = function(){
  setTimeout( () => console.log('Salve, ' + this.nume), 500 );
};
var întâlnire = new Ciao('Adina!');
întâlnire.urare(); // Salve, Adina!
```

### Iterare cu forEach() după felul în care se face binding-ul la this

În cazul folosirii *fat arrows*, legătura `this` se face direct la mediul lexical al obiectului pentru care o anumită metodă este funcția gazdă. În cazul folosirii fat arrow cu `forEach()`, legătura la `this` a funcției callback, nu va aluneca în global.

```javascript
this.array.forEach((el) => {
  if(true){
    this.prelucrat.push(++el);
  };
});
```
Pentru a realiza același lucru, înainte de ES6 cu al său *fat arrow* erau mai multe rețete care merită explorate.

#### 1. constituirea unei punți lexicale

Este vorba despre legendara soluție `var self = this;`.

```javascript
var self = this;
this.array.forEach(function (el) => {
  if(true){
    self.prelucrat.push(++el);
  };
});
```

#### 2. Indicarea obiectului pentru legătură

Metoda `forEach()` acceptă al doilea parametru care este referința către obiectul la care trebuie să se facă legătura `this`.

```javascript
this.array.forEach(function (el) => {
  if(true){
    this.prelucrat.push(++el);
  };
}, this);
```

#### 3. Folosirea bind(this) pentru a forța execuția în contextul necesar

```javascript
this.array.forEach(function (el) => {
  if(true){
    this.prelucrat.push(++el);
  };
}, bind(this));
```

## Dependințe cognitive

-   scope
-   funcții
-   `arguments`
-   call-site
-   constructori
-   `Function.prototype.apply()`
-   `Function.prototype.bind()`
-   `Function.prototype.call()`

## Alonje

-   inversion of control
-   unit testing
-   înțelegerea programării funcționale

## Mantre

-   Prin `this`, de fapt accesezi starea obiectului cu care lucrezi.
-   Legătura `this` se realizează la momentul execuției codului, nu la momentul scrierii lui.
-   `this` este o referință către contextul de execuție curent în timp ce funcția se execută.
-   `this` nu se referă în niciun caz la **lexical scope**.
-   `this` este un binding pentru fiecare invocare a unei funcții care se bazează pe de-antregul pe call-site.
-   Funcțiile și obiectele sunt REFERENȚIATE, nu sunt deținute atunci când atribui IDENTIFICATORUL într-o expresie sau ca valoarea a unei metode.
-   Call-site (locul din cod unde este apelată o funcție) determină formarea lui `this`.
-   Modul de invocare influiențează felul în care obiectul este constituit (către care face referință `this`).
-   Toate funcțiile au la dispoziția lor un set de utilități preexistent, care poate fi apelat prin `[[Prototype]]`. Cele mai evidente sunt `call()` și `apply()`.
-   Atunci când există un obiect-context (folosit de o funcție prin apelare cu `apply()` sau `call()`), regula de bază a binding-ului spune că obiectul-context va fi cel la care se face bindingul `this`.
-   În contextul de execuție tot ce este cu `this.ceva` devine membru al obiectului generat.
-   Bindingul primar se face la obiectul global.
-   Bindingul implicit se face la contextul de execuție al unei funcții sau al unei metode.
-   o funcție poate fi invocată în patru moduri: (1) ca funcție (this e window); (2) ca metodă (this e obiectul); (3) ca și constructor (this e obiectul abia construit); (4) cu `apply()` și `call()` (this e primul obiect introdus).
-   `this` este cuvânt cheie rezervat.
-   `this` este o referință la obiectul care se creează în funcție de contextul de execuție.
-   `this` este o referință către un obiect-context: pentru funcțiile din global scope este `window`, pentru metode este obiectul în care se execută iar pentru noile obiecte create este chiar noul obiect generat.
-   în interiorul unui obiect, apelezi metodele folosind `this`, pentru că este o referință către proprietățile și metodele interne.
-   dacă o funcție a fost invocată în interiorul altei funcții sau a unui obiect, atunci `this` este o referință către obiectul în contextul în care a fost invocată. Pentru a înțelege, adu-ți aminte faptul că o funcție este un obiect, de fapt, dar nu uita că primește `this` automat, nu-l formează. Doar obiectele formează `this`.
-   Referința `this` va fi folosită pe durata execuției funcției.
-   în cazul funcțiilor`this` nu este o referință către funcția în sine. Reține faptul că unei funcții îi sunt pasate tacit `this` și `arguments`.
-   `this` NU ESTE O REFERINȚĂ CĂTRE SCOPE-ul LEXICAL AL FUNCȚIEI.
-   `bind()` creează o nouă funcție, care atunci când este apelată va avea `this` setat la valoarea introdusă ca paramentru împreună cu o serie de argumente.
-   `bind()` nu modifică funcția originală cu nimic, pur și simplu construiește una nouă.

## Resurse:

-   [MDN Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
-   [MDN this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
-   [Crockford on Javascript - Functions](https://www.youtube.com/watch?v=lVnnxfdLdlM)
-   [Understand JavaScript's this Keyword in Depth](https://egghead.io/lessons/javascript-specify-this-using-call-or-apply)
-   [MDN.Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
