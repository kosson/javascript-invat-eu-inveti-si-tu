# `this`

Cred că e timpul să ne imaginăm oceanul planetar. Acesta este obiectul nostru global. Să ne închipuim că orașele cu porturi sunt obiecte. Funcțiile sunt nave care prelucrează și transportă valori. Navele sunt la rândul lor obiecte având fiecare un nume și un pavilion sub care sunt înregistrate. De fiecare dată când intră într-un port, se leagă la datele locale ale portului, care se încarcă într-o bază de date locală a navei numită `this`.

Această relație trebuie lămurită pentru că, de fapt o funcție întodeaunea rulează în contextul unui obiect. This este un cuvânt cheie care identifică o legătură cu mediul lexical al contextului de execuție al unei funcții. Cuvântul crucial este **legătură**.

Atunci când o funcție este apelată, motorul rulează niște algoritmi interni care fac minunea de funcție obiect să înceapă evaluarea propriului corp de cod. Am descoperit anterior faptul că un obiect care este o funcție se diferențiază de celelalte obiecte prin faptul că are un slot intern `[[Call]]` care este de fapt o metodă internă a motorului. Această metodă la care noi nu avem acces, primește doi parametri. Unul este `this` și celălalt este `arguments`. Concluzia este că această referință își începe viața ca parametru al unei funcții interne. Este ca un semn de carte către un capitol în care odată deschis pornim lectura.

**Spune standardul**:

> Un mediu de funcție este un Mediu Lexical care corespunde invocării unei funcții obiect ECMAScript. Un mediu de funcție poate stabili o nouă legătură `this`. \[...] Fiecare Înregistrare de Mediu este asociat cu un obiect numit binding object. \[...] Operațiunea abstractă ResolveThisBinding determină legătura cuvântului cheie this folosind LexicalEnvironment al contextului de execuție în derulare.

Multe informații necesare înțelegerii `this` se leagă de discuția pe care am avut-o privind compilarea și execuția.
Legătura (termenul în engleză fiind `binding`) la `this` depinde de obiectul **în care** s-a făcut apelul (în literatura din limba engleză i se spune *call-site*).

```javascript
function faCeva () {
  console.log(this);      // (1)
  this.x = 10;            // (2)
  console.log(this.ceva); // (3)
};
const obj = { faCeva }; // notația ES6
obj.faCeva();             // (4)
```

(#1) Răspunde cu obiectul context `{ actiune: faCeva() }`.
(#2) Funcția tocmai introduce în obiectul context identificator `x`.
(#3) Răspunde cu `undefined` pentru că obiectul context nu are o proprietatea `ceva`.
(#4) Obiectul la care se *conectează* `this` este chiar obiectul menționat la stânga metodei.

## Mică anatomie pentru `this`

Pentru a înțelege conectarea lui `this`, cel mai util scenariu este acela în care această conectare se pierde. În scenă intră o funcție cu rol de metodă, care este definită în obiect. Această funcție, este gazda unei alteia care realizează un closure pe mediul lexical al gazdei.

```javascript
// "use strict"; // în acest caz, this is undefined
var ceva = 100;
/*
declararea cu let împiedică ceva
să devină variabilă globală
*/
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

Apelarea funcției `interna`, nu realizează o legătură pentru `this` la obiectul în care este definită metoda `faCeva()`, *gazda* sa. Legătura se face la obiectul global, iar dacă fragmentul de cod rula sub regula `use strict`, rezultatul era `undefined`. De ce se întâmplă acest lucru? Funcția internă, chiar dacă a fost definită în metoda `faCeva`, la momentul execuției nu a depins de obiect în niciun fel. Acest fapt conduce la o concluzie foarte importantă: nu contează unde a fost declarată funcția, ci locul unde a fost invocată pentru a stabili care este legătura la `this`. Locul declarării contează atunci când se face un closure pe mediul lexical.

Chiar dacă o funcție este declarată în interiorul unui obiect, aceasta trebuie considerată a fi un obiect separat de acesta. Nu **aparține** obiectului. Obiectul oferă o referință către un alt obiect, care se întâmplă să fie o funcție. Singura specificitate este că nu poate fi accesată ca valoare sau apelată din exteriorul obiectului altfel decât folosind sintaxa cu punct: `obiect.funcție`. Obiectul `this` va fi populat automat cu identificatorii mediului lexical local al obiectului la momentul execuției funcției care joacă rolul de metodă.
În JavaScript toate obiectele sunt entități independente. Ele realizează conexiuni unele cu celelalte prin referințe.

Obiectul poate fi considerat ca un furnizor de adresă pentru a putea apela funcția-obiect care joacă rol de metodă. Legătura aceasta poate fi văzută precum relația dintre navă și portul în care se află. Numele danei oferă o modalitate de a ajunge la navă. Pentru a înțelege, putem explora mai departe apelând în contextul unui obiect distinct metoda unui alt obiect.

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

Încă o dată: fiecare funcție-obiect este o entitate distinctă. Asta ne permite să o declarăm oriunde în cod unde este permisă o expresie. Putem declara direct în obiect o funcție, dar nimic nu ne împiedică să declarăm funcțiile în afara acestuia. Apoi facem referință către ele. Declari funcțiile în afara obiectelor atunci când știi că vor fi folosite de mai multe obiecte sau alte funcții. Declararea în interiorul unui obiect, creează o adresă unică pentru acea funcție. În acest caz spunem despre obiect că a creat un `namespace` - un domeniu a cărui valori sunt accesibile doar prin menționarea numelui obiectului mai întâi de toate.

### Funcții în global și this

În cazul folosirii lui `var` pentru declarații, obiectul `this` va fi însuși **obiectul global**. Am introdus cazul funcțiilor simple pentru că au drept context de execuție obiectul global a cărui proprietăți pot fi accesate prin legătura care se face la momentul constituirii obiectul `this`. Fii foarte atentă că declararea cu `let` a variabilelor, nu crează nimic în obiectul global. Exemplele folosite se folosesc de capacitatea lui `var` de a îmbogăți obiectul global.

**Spune standardul**:

> Declarațiile globale de funcții sunt întotdeauna reprezentate precum proprietății proprii ale obiectului global.

Dacă ai deprins practica bună a folosirii lui `"use strict";`, atunci vei observa că legătura la `this` nu se va mai lega la obiectul global, iar valoarea va fi `undefined`.

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
```

Atenție, nu contează dacă locul apelării este sub regula `"use strict";`, ci contează dacă funcția este sub această regulă. Am menționat acest aspect pentru că este posibil ca software-ul scris de tine să respecte regula `"use strict";`. Uneori propriul software este posibil să fie legat de software mai vechi (programatorii îi spun în engleză **legacy**, adică **moștenit**), care nu este sub regulă și astfel, fiind posibilă apariția unei serii de erori a căror sursă să fie chiar această diferență.
Reține că pentru codul sub `"use strict";`, valoarea lui `this` este `undefined` pentru global scope.

## Cum se realizează legăturile this

Este esențial să fie înțeles modul în care se face legătura `this` și când se realizează. Un aspect important care, odată înțeles, reduce frustrările legate de pierderea legăturii la `this`-ul dorit. Adu-ți mereu aminte că declararea unei funcții, transformă acea funcție într-o valoare. Nimic mai mult. Abia când este invocată are puterea să facă ceva, creează un mediu lexical și codul din corp este evaluat.

### Puntea lexicală `self = this`

Acesta este cazul în care o metodă are declarată o funcție internă. Știm că fiecare funcție are propriul obiect identificat prin `this`. Dacă funcția internă ar dori să acceseze `this`, referința nu va fi `this` a funcției gazdă, ci propriul obiect `this`, care este obiectul global pentru că nu s-a apelat cu referință prin obiect.
Pentru că din punct de vedere a structurii lexicale a codului intuitiv ar fi ca accesul la `this` către obiectul metodei. Doar așa indică modul de redactare a codului. Realitatea este diferită și de cele mai multe ori se recurge la un artificiu, la o punte lexicală de forma `var self = this;`.

```javascript
let x = 10;
const obi = {
  x: 100,
  acces () {
    let self = this;
    function interna () {
      console.log(x);
      console.log(self.x);
    };
    interna();
  }
};
obi.acces();
// 10
// 100
```

De fapt, aceasta este doar un artificiu lexical oferit de mediul lexical *văzut* de funcția care face un closure pe el.

### `this` pe lanțul prototipal al obiectului

Dacă metoda este definită în lanțul prototipal al obiectului, `this` se va conecta la obiectul în care s-a invocat metoda.

```javascript
const alfa = {
  primo: function () {
    return this.ceva + this.altceva;
  }
};
const beta = Object.create(alfa); // s-a făcut legătura prototipală la alfa
beta.ceva = 10;
beta.altceva = 10;

console.log(beta.primo()); // 20
```

## Regulile de conectare pentru obiectul this

Propun să explorăm cazurile în care se face legătura la `this` și cine este `this` pentru fiecare caz.

| Cazul de invocare a funcției                 | Cine este `this`                                           |
|:-------------------------------------------- |:---------------------------------------------------------- |
| funcție declarată                            | obiectul global, iar în `"use strict";` este „undefined”   |
| metodă                                       | obiectul pentru care funcția joacă rol de metodă           |
| funcția este folosită drept constructor      | `this` este însuși obiectul returnat de invocarea cu `new` |
| folosirea cu `apply()`, `call()` și `bind()` | `this` este obiectul specificat în primul parametru.       |

### 1. Conectarea la obiectul global

Conectarea automată se face la objectul global, care în cazul browserului este `window`. Este prima regulă și este și cazul simplei invocării a unei funcții. Funcționează dacă nu este rulat codul sub regula `"use strict";`. Obiectul global este cel la care se conectează și funcțiile găzduite de metode.

```javascript
let test = 2;
function faCeva () {
  console.log(this.test); // this.test rezolvă la variabila globală test
};
faCeva(); // 2
```

### 2. Conectarea la obiectul context

Încărcarea obiectului `this` se face cu identificatorii din mediul lexical al obiectului în care a cărui context a fost invocată funcția (**call site**).

```javascript
const obiectLiteral = {
  ceva: 2,
  metoda: faCeva
};
function faCeva () {
  this.test = 1001; // introduce în obiectLiteral test
  this.ceva = 50;   // modifica valoarea lui ceva
};
obiectLiteral.metoda(); // 50
console.log(obiectLiteral.test); // 1001
console.log(obiectLiteral.ceva); // 50
```

Următoarea secvență de cod este asemănătoare.

```javascript
const obiectLiteral = {
  proprietate: "ceva",
  metoda: function () {
    console.log(this.proprietate);
    this.contribuit = 100;
  }
};
obiectLiteral.metoda(); // ceva
const obiectLiteral2 = {
  proprietate: "altceva",
  metoda: obiectLiteral.metoda
};
obiectLiteral2.metoda(); // altceva
var proprietate = "din global";
// am folosit declararea cu var pentru că
// let nu face proprietăți în obiectul global
let metoda = obiectLiteral.metoda;
metoda();
// => valoarea proprietății obi. global; echivalent cu window.metoda()
```

Legătura la obiect se pierde atunci când faci referință nouă către metodă. De fapt, nu faci referința către metodă, căci însăși cheia obiectului este o referință către funcția care joacă rol de metodă.

```javascript
const obiectStudiu = {
  ceva: 1001,
  metoda: function special () {
    console.log(this.ceva);
  }
};
var ceva = 2002;
let referinta = obiectStudiu.metoda; // e doar o referință, nu este valoarea funcției.
referinta(); // 2002  call-site pentru care se aplică regula 1 - binding primar.
```

Am *împrumutat* (invocat) funcția în contextul obiectului global. În acest caz se aplică regula bindingului primar. Dacă funcția nu ar fi fost numită, în call stack ar fi apărut cu numele referinței (obiectStudiu.metoda).

### 3. Binding menționat explicit

Utilitarele `call()`, `apply()` și `bind()` sunt disponibile tuturor funcțiilor prin moștenire de la obiectul intern `Function`. Poți folosi aceste metode moștenite pentru a indica explicit obiectul care va fi contextul de execuție al funcției. Funcțiile `call()` și `apply()` iau ca prim parametru un obiect care va fi folosit pentru popularea lui `this`. Pentru că este afirmat în mod direct unde dorești să fie `this`, numim aceasta **binding explicit**.

O chestie interesantă este că de vei pasa valoarea unei primitive simple de tip string, boolean sau number, atunci primitiva va fi „impachetată” în obiectul corespondent (`new String(..)`, `new Boolean(..)`, or `new Number(..)`) și abia la acesta se va face binding-ul `this`. Acest lucru se numește "boxing".

#### Mecanismul oferit de `apply()` și `call()`

Avem posibilitatea de a scrie o funcție cu rol de metodă, care să poată fi folosită în alt obiect.

```javascript
var proprietate = "ceva din global"; // este proprietate a obiectului global
const obiectLiteral = { proprietate: "ceva" };
let faceva = function () {
  console.log(this.proprietate);
};
faceva.call(obiectLiteral); // Spune: foloseste objectLiteral ca this. => ceva
faceva(); // => ceva din global
```

De fapt, `call()` schimbă contextul. Dacă vrei să pasezi argumente funcției, acestea vor urma referința către noul context.

```javascript
const obiect = {
  proprietate: 1000,
  metoda: function (unu, doi, trei) {
    console.log(this.proprietate);
  }
};
var proprietate = 4000;
obiect.metoda(); // => 1000
obiect.metoda.call(window); // 4000
obiect.metoda.call(window, 1, 2, 3);
obiect.metoda.apply(window, [1, 2, 3]);
// este acelasi lucru numai ca paseaza parametrii ca array
```

Chiar și când se face un binding explicit, se poate pierde bindingul la `this`. Soluția ar fi „îmbrăcarea” într-o funcție „gazdă”. Fii foarte atent căci de vei pasa drept prim parametru lui `call()` sau lui `apply()` o valoare `null` sau `undefined`, motorul va lua drept obiect `this` obiectul global. Scrierea codului sub regula `"use strict";` nu mai permite această legătură.

O altă metodă pentru a folosi obiectul `this` dorit este folosirea noilor tipuri de funcții introduse de versiunea ES6 a standardului: arrow functions. Funcțiile săgeată au drept caracteristică faptul că mențin legătura la `this` care exista la momentul definirii sale.
ATENȚIE! Dacă funcția arrow este definită într-un object literal, valoarea lui `this` pe care o referențiază *arrow function* este obiectul global `window`.

```javascript
var fix = 1000;
let faCeva = function () {
  console.log(this === window); // true
  console.log(this.fix); // 1000
};
let faAltceva = () => {
  console.log(this === window); // true
  console.log(this.fix); // 1000
};
const centru = {
  fix: 10,
  faCeva: faCeva,
  faAltceva: faAltceva
};

centru.faCeva();    // false 10
centru.faAltceva(); // true 1000
```

Concluzia este că mediul lexical în care a fost declarată o funcție săgeată, va fi chiar obiectul `this` pentru aceasta. Reține și detaliul că funcțiile săgeată nu constituie propriul obiect `this`.

### 4. Conectarea perpetuă la obiect

Este modul în care te asiguri întotdeauna că `this` este predictibil și nu alunecă în global scope. Se realizează un cuplaj forțat între o funcție care trebuie să ruleze musai în contextul unui anumit obiect.

Împachetarea legăturii folosind o funcție gazdă creează posibilitatea de a comunica înspre și dinspre conexiune. Avem o funcție care primește date ca argumente. Avem și un oiect care conține date care ar folosi în cazul rulării funcției în contextul obiectului. Dacă folosim o a doua funcție, care la momentul execuției face conectarea dintre prima și obiect, ba mai mult trimite și datele de prelucrare, vom realiza dezideratul de injectare a unor date diferite ori de câte ori vom apela a doua funcție.

```javascript
let activitate = function activ (valoare) {
  console.log(this.a, valoare);
  return this.a + valoare;
};

let obiectGazda = {
  a: 1000
};

let conectorActivitateGazda = function () {
  return activitate.apply(obiectGazda, arguments);
  // arguments este un obiect asemănător unui array
  // care conține parametrii funcției
};

// introdu date in gazdă, pe care le va folosi activitate
let rezultat = conectorActivitateGazda(100);
console.log(rezultat); // 1100
```

Începând cu ES5 suplimentar existentelor `call()` și `apply()` a fost introdusă și metoda `bind()` în prototipul obiectului intern `Function`, ceea ce permite moștenirea sa automată pentru toate funcțiile. Această metodă este cel mai des întâlnită în uz atunci când se dorește conectarea permanentă a unei funcții cu un obiect. Îți dau un scenariu pentru a răspunde întrebării de ce. Conectarea unei funcții de răspuns la un obiect eveniment generat de interacțiunea unui click cu mouse-ul pe un buton dintr-o pagină. Obiectul este generat de browser, funcția de răspuns este creată de tine. Cum să rulezi funcția de răspuns în contextul unui obiect creat de browser? Acesta este cazul tipic.

```javascript
// o funcție care se va executa în contextul unui obiect
let activitate = function (valoare) {
  console.log(this.a, valoare);
  return this.a + valoare;
};
// un obiect care oferă contextul de lucru pentru activitate()
const obiect = { a: 1000 };
// realizarea conexiunii permanente
let binding = activitate.bind(obiect);
// folosirea șablonului cu date
let rezultat = binding(4000);
console.log(rezultat); // 5000
```

Rolul lui `bind()` este acela de a returna o funcție care conectează `this` al funcției la obiectul context în care rulează.

```javascript
const obi = {
  prop1: 10,
  met: function ex () {
    setTimeout(function () {
      console.log(this.prop1);
    }.bind(this), 1500);
  }
};
obi.met(); // 10
```

O mulțime de metode ale obiectelor interne ale limbajului oferă un parametru opțional numit *context*, care are rolul de a evita folosirea lui `bind()`, asigurând faptul că funcția callback folosește un anume obiect pentru popularea lui `this`. Nu uitați că odată cu ES6 se pot folosi „funcțiile săgeată” - arrow functions. Folosirea lui `this` într-o astfel de funcție va folosi obiectul `this` al obiectului în al cărui context se execută.

Un exemplu concludent ar fi parcurgerea unui array cu aplicarea unei funcții folosind metoda `forEach`:

```javascript
function actiune (date){ console.log(date, this.a + date); };
var obiect = { a: 1000 };
[1, 2, 3].forEach(actiune, obiect);
```

#### Evenimentele din API-ul browserului

Să ne imaginăm cazul unui obiect care are metode construite special pentru a gestiona o pagină sau un fragment de pagină web prin manipularea evenimentelor.

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

Este nevoie de `bind(this)` pentru a păstra legătura la obiectul în cadrul căreia se dorește a fi executată metoda. Fără `bind(this)`, obiectul `this` va fi obiectul DOM la care se atașează listener-ul (funcția cu rol de receptor). Folosind `bind(this)` vom reface legătura `this` la obiectul în care a fost declarată metoda. Dar pentru ca acest lucru să se întâmple, se va folosi operatorul de grupare pentru a *repoziționa* legătura `this` la obiectul părinte, nu la obiectul DOM.

```javascript
const obiExecutor = {
  captura: function () {
    document.addEventListener('click', (function (eveniment) {
      this.prelucreaza(eveniment.type); // trimite tipul evenimentului
    }).bind(this), false)
  }
};
```

Noul standard permite o rezolvare elegantă a conectărilor `this` prin folosirea unui arrow function:

```javascript
let obiExecutor = {
  captura: function () {
    document.addEventListener('click', eveniment => this.prelucreaza(eveniment.type), false)
  }
};
```

## Comportamentul lui `this` în cazul fat arrows

Funcțiile *fat arrow* nu stabilesc propria legătură la `this`. Pur și simplu folosesc obiectul în contextul căruia rulează ca `this`, dar dacă rulează într-o funcție, vor folosi obiectul `this` creat de acea funcție.
Funcțiile *fat arrows* sunt legate de scope-ul lexical, asta însemnând că `this` va fi același, adică cel din blocul părintelui. Vom porni analizând cazul în care folosim o funcție normală. Pentru a înțelege pe deplin, treci mai întâi pe la subiectele care țin de *call stack*, *event loop* și *API*-uri și relațiile pe care le formează.

```javascript
let nume = 'Auraș din Global Scope';
function Ciao (nume) {
  this.nume = nume;
};
Ciao.prototype.urare = function facUrare () {
  setTimeout( function callback () {
    // this acum va fi global scope (window)
    console.log('Ciao, ' + this.nume);
  }, 5000);
};
let întâlnire = new Ciao('Daniel!');
întâlnire.urare();  // Ciao, Auraș din Global Scope
```

Când este declarată o variabilă cu `var`, aceasta apare în global scope și va fi afișat în consolă mesajul `Ciao, Auraș din Global Scope` pentru că `this` a fost legat la obiectul global în care avem variabila `nume` ca proprietate a obiectului global. Exemplul va returna `Ciao, undefined` dacă `nume` este declarat cu `let` în loc de `var` pentru că nu va fi creată variabila în obiectul global.

Pentru a face conectarea la obiectul generat, se va face o legătură prin metoda `bind()`. Ceea ce face `bind()` este să lege forțat execuția unei funcții de un anumit obiect context. Utilitarul `Function.prototype.bind()` moștenit de toate funcțiile în JavaScript, face o conexiune tare între obiectul dorit a fi contextul de execuție și funcția ce va fi executată. Spun că va fi executată pentru că folosirea lui bind, returnează o funcție. În cazul nostru aceasta va fi executată pentru că va fi trimisă din coada de așteptare a job-urilor direct în stiva de apeluri, unde va fi executată.

```javascript
let nume = 'Auraș din Global Scope';
function Ciao (nume) {
  this.nume = nume;
};
Ciao.prototype.urare = function facUrare () {
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

### Iterare cu `forEach` după felul în care se face binding-ul la `this`

În cazul fat arrows, this este legat de mediul lexical al obiectului. Legătura la `this` a lui `forEach` nu alunecă în global.

```javascript
this.array.forEach((el) => {
  if(true){
    this.prelucrat.push(++el);
  };
});
```
Pentru a realiza același lucru, înainte de ES6 erau mai multe rețete.

#### Prima: constituirea unei punți lexicale

Este vorba despre legendara soluție `var self = this;`.

```javascript
var self = this;
this.array.forEach(function (el) => {
  if(true){
    self.prelucrat.push(++el);
  };
});
```

#### A doua: pasarea lui `this` ca al doilea parametru lui `forEach`

```javascript
this.array.forEach(function (el) => {
  if(true){
    this.prelucrat.push(++el);
  };
}, this);
```

#### A treia este un bind(this) pentru a forța execuția în contextul necesar

```javascript
this.array.forEach(function (el) => {
  if(true){
    this.prelucrat.push(++el);
  };
}, bind(this));
```

### Lucruri la care să fii atent

În cazul în care folosești `forEach()`, trebuie să știi că poți pasa și `this`, ca al doilea argument. Deci, nu face „punte lexicală” de genul `let that = this` pentru a adăuga rezultatele iterării la `this`. (vezi [MDN>Web technology for developers>JavaScript>JavaScript reference>Standard built-in objects>Array>Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach))

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
-   Legătura la obiectul reprezentat de cuvântul cheie `this` se realizează la momentul execuției codului, nu la momentul scrierii lui.
-   **this** este o referință către contextul de execuție curent în timp ce funcția se execută.
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
