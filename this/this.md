# `this`

În JavaScript, vorbim despre obiecte. Funcțiile sunt niște obiecte speciale în sensul că pot fi apelate, ceea ce conduce la executarea codului. Reține faptul că tot niște obiecte sunt. Și acum să ne gândim la o funcție ca la o persoană care privește **bolta celestă** într-o noapte înstelată. Cum ar putea povesti despre toate constelațiile văzute? Cum le-ar putea referenția printr-o singură expresie? Hai, nu e greu, am zis deja... da, da, ai remarcat perfect: **bolta celestă**. Dacă dorim să constrângem la un singur termen care să o identifice, am putea spune foarte simplu **cerul**, nu? Așa este și cuvântul cu înțeles special `this`, care s-ar traduce în română **acesta** cu sensul că indică spațiul în care se face o evaluare. Termenul stabilește **legătura** / conectarea unei funcții cu obiectul și mediul pe care acesta îl formează în al cărui context a fost invocată. Pentru funcția care tocmai și-a început execuția `this` este o proprietate care nu poate fi modificată. Prin aceasta se pot accesa proprietățile  obiectului în contextul căruia a fost apelată.

Poți să-ți imaginezi o funcție precum un pilot care se urcă la bordul *obiectului* numit avion. Primul lucru pe care îl face este să-și conecteze căștile la sistemul de comunicare intern al avionului. Acest intercom este **mediul** de comunicare al avionului la care mai sunt conectate și alte funcții precum navigatorii, mecanicii și însoțitorii de bord. Consideră-i pe aceștia funcții. Primul lucru pe care îl fac toți este să se conecteze prin intercom la **mediul** care oferă date pentru a raporta piloților, precum și altor funcții diverse informații. Toți sunt conectați la același **mediu de comunicare** oferit de obiectul avion.

Același scenariu se aplică și în cazul funcțiilor în relația lor cu obiectele care le vor folosi din rolul de metode. Dacă folosești sintaxa `obiect.facCeva()` pentru a apela o funcție, atunci cu siguranță aceasta este metodă a obiectului `obiect`. Perfect! Ce se petrece cu funcția la momentul apelării din postura de metoda!? Aceasta va crea propriul mediu lexical și în același timp un obiect special numai al său care va fi populat cu proprietăți ce reflectă mediul lexical al obiectului pentru care funcția este metodă. Acest obiect special se conectează cu obiectul pentru care funcția este metodă printr-o legătură specială numită `this`. Acesta va fi și identificatorul obiectului proaspăt format. Poți să-ți imaginezi ca pe un vas care se umple cu referințe către identificatorii din mediul lexical al obiectului în a cărui context se execută funcția.

Pentru a avea un prim contact cu `this` poți încerca în consola browserului să scrii `this.window`. Va fi returnat chiar obiectul global `Window`. De ce s-a întâmplat acest lucru? Pentru că obiectul global ține o referință către sine. În cazul browserelor aceasta este `window`.

Reține că referința `this` este strict legată de *locul* în care a fost apelată funcția, nu de *locul* unde a fost declarată. Sunt două lucruri distincte. Dacă nu le vei percepe așa încă de acum, te vei lovi de multe erori și nu vei putea construi structuri ceva mai complexe.

**Spune standardul**:

> Operațiunea abstractă ResolveThisBinding determină legătura cuvântului cheie **this** folosind LexicalEnvironment al contextului de execuție în derulare.

Multe informații necesare înțelegerii `this` se leagă de discuția pe care am avut-o privind compilarea și execuția.

Legătura (termenul în engleză fiind `binding`) la `this` depinde de obiectul **în care** s-a făcut apelul (în literatura din limba engleză i se spune *call-site*).

```javascript
function faCeva () {
  console.log(this);      // (1)
  console.log(this.ceva); // (2)
};
const obj = {
  faCeva: faCeva
};
// hai să vedem și notația ES6
const obj2 = {
  faCeva // (3)
};
obj.faCeva(); // (4)
```

(#1) Răspunde cu obiectul context `Object { actiune: faCeva() }`.
(#2) Răspunde cu `undefined` pentru că obiectul context nu are o proprietatea `ceva`.
(#3) Începând cu ES6, dacă ai denumit cheia metodei la fel cu numele funcției, se poate menționa simplu numele.
(#4) Obiectul la care se leagă `this` este chiar obiectul menționat la stânga metodei.

## Mică anatomie pentru `this`

Să pornim de la baza lucrurilor repetând mantrele necesare:

-   funcțiile sunt **valori**,
-   funcțiile sunt **obiecte**, numite de standard **funcții-obiecte**,
-   un *closure* este o legătură permanentă la mediul lexical al funcției gazdă,
-   locul unde funcțiile sunt declarate, nu este neapărat locul unde se execută,
-   obiectele sunt structuri dinamice de date care oferă referințe către proprietăți.

Pentru a înțelege conectarea lui `this`, cel mai util scenariu este acela în care această conectare se pierde. În scenă intră o funcție cu rol de metodă, care este definită în obiect. Această funcție, este gazda unei alteia care realizează un closure pe mediul lexical al gazdei.

```javascript
var ceva = 100;
/*
declararea cu let împiedică faCeva
să devină variabilă globală
*/
const obi = {
  ceva: 'text',
  faCeva: function gazda () {
    function interna () {
      console.log(this.ceva);
    };
    return interna();
  }
};
obi.faCeva(); // 100
// dacă let este returnat undefined
```

Apelarea funcției `interna`, nu realizează o legătură pentru `this` la obiectul în care este definită metoda `faceva()`, *gazda* sa. De ce se întâmplă acest lucru?

Cred că e timpul să închidem ochii și să ne imaginăm oceanul planetar. Acesta este obiectul nostru global. Să ne închipuim că orașele care au porturi sunt obiecte. Funcțiile, firesc sunt nave care prelucrează și transportă valori. Dar și navele sunt la rândul lor obiecte. Programul nostru este ca o cronică a lumii acesteia care povestește cum se mișcau navele, cum comunică orașele, cum se primesc și se trimit valorile. Funcțiile, adică vapoarele sunt toate deodată pe mare, fiind beneficiarele mecanismului de hoisting. Totul coexistă în același timp: orașe și vapoare. Vapoarele au fiecare un nume și un pavilion sub care sunt înregistrate, dar de fiecare dată când intră într-un port vapoarele arborează și pavilionul țării în care acostează. Pavilionul propriu este obiectul în care au fost **declarate**, iar cel pe care îl arborează la acostare este chiar `this`. Arborarea acestui pavilon al țării gazdă, permite navei noastre să acceseze toate informațiile și datele locale ale portului care se încarcă într-o bază de date locală a navei numită `this`.

Chiar dacă o funcție este declarată în interiorul unui obiect, aceasta trebuie considerată a fi un obiect separat de acesta. Nu **aparține** obiectului. Este doar o referință către un alt obiect care se întâmplă să fie o funcție. Singura specificitate este că nu poate fi accesată ca valoare sau apelată din exteriorul obiectului altfel decât folosind sintaxa cu punct: `obiect.funcție`.

Ca o regulă generală putem considera o funcție declarată într-un obiect ca fiind o funcție-obiect independentă, care, exceptând locul în care apare în codul sursă, adică în interiorul obiectului, are o singură legătură cu acesta: modul de a o accesa ca valoare și ca apel, fiind necesară menționarea obiectului. De ce gândim așa? Pentru că în JavaScript toate obiectele sunt entități independente. Ele realizează conexiuni unele cu celelalte prin referințe.

Obiectul `obi` poate fi considerat ca un furnizor de adresă pentru a putea apela funcția-obiect. Legătura aceasta poate fi văzută precum relația dintre navă și portul în care se află. Numele danei oferă o modalitate de a ajunge la navă. Pentru a înțelege, putem desface exemplul dat în următoarea formă perfect echivalentă.

```javascript
var ceva = 100;
// s-a creat o variabilă globală
let faCeva = function () {
  console.log(this.ceva); // #A
  function interna () {
    console.log(this.ceva);
  };
  return interna();
};
let obi = {
  ceva: 'text',
  faCeva
};
obi.faCeva(); // 100
```

Este simplu ceea ce am făcut. Am scos declarația de funcție în afara obiectului și am pus-o într-o expresie de funcție. În obiect am introdus-o ca referință. Și pentru că numele identificatorului expresiei de funcție este același cu cel ales pentru cheia din obiect, am făcut uz de sintaxa concisă introdusă de ES6.

Ceea ce observăm la rularea codului este că funcția `faCeva()` este executată în contextul obiectului `obi` pentru că s-a folosit numele cheii proprietăți obiectului și pentru că se întâmplă asta, se realizează legătura `this` implicit la mediul său lexical. Acest lucru face posibilă returnarea corectă a valorii `text` la pasul #A.

Ce se întâmplă cu funcția internă? Ca să înțelegem corect ce se petrece, să mai desfacem încă o dată firul în patru și să scoatem funcția internă din `faCeva()`. În loc de a o declara în interiorul lui `faCeva()`, o vom apela de acolo. Adresa acestei funcții ca valoare în sine, în cazul folosirii unui browser este `window.interna`. Dacă îți amintești povestea de mai sus cu vasele, această adresă este pavilionul sub care navighează funcția noastră. Dacă era declarată în interiorul obiectului pavilionul arăta `obi.faCeva`.

```javascript
var ceva = 100;
function interna () {
  console.log(this.ceva);
};
function faCeva () {
  console.log(this.ceva); // text
  return interna();
}
var obi = {
  ceva: 'text',
  faCeva
};
obi.faCeva(); // 100
```

Știi că putem face asta pentru că fiecare funcție-obiect este o entitate distinctă, de fapt. Asta ne permite să o declarăm oriunde în cod cu respect pentru necesitatea pentru o anumită adresă. Putem să declarăm direct în obiect o funcție, iar acest lucru reprezintă o posibilitate la îndemână, dar nimic nu ne împiedică să declarăm funcțiile în afara acestuia și să facem referință către ele. Declari funcțiile în afara obiectului atunci când știi că vor fi folosite de mai multe zone ale codului. Declararea în interiorul unui obiect, creează o adresă unică pentru acea funcție. În acest caz spunem despre obiect că a creat un `namespace` - un domeniu a cărui valori sunt accesibile doar prin menționarea numelui obiectului mai întâi de toate.

Dacă funcția a fost declarată în afara obiectului, doar în momentul în care se creează o referință către acea funcție în interiorul unui obiect aceasta va conecta **automat** `this` la obiect. Ce se petrece cu funcțiile referențiate prin proprietățile unui obiect este că la momentul executării prin sintaxa cu punct, acestea vor popula obiectul `this` cu proprietățile din mediul lexical al obiectului.

### Funcții în global și this

Ceea ce se va observa rapid este faptul că în cazul folosirii lui `var` pentru declarații, obiectul `this` va fi însuși **obiectul global**. Am introdus cazul funcțiilor simple pentru că au, de fapt un context de execuție, acesta fiind obiectul global a cărui proprietăți pot fi accesate prin legătura pe care o face obiectul `this`. Fii foarte atent că declararea cu `let` a variabilelor, nu creează nimic în obiectul global. Exemplele folosite se folosesc de capacitatea lui `var` de a îmbogăți obiectul global.

Un lucru interesant este că poți folosi `this` pentru a testa instanțierea unui constructor cu ajutorul lui `instanceOf`. Dincolo de faptul că poți face acest lucru, de fapt ceea se observă este faptul că `this` este un obiect.

Cazul folosirii declarării variabilelor cu `let`. Valoarea lui x nu poate fi accesată din scope-ul funcției pentru că este declarată în global scope.

```javascript
var x = 10;
function container () {
  let x = 1000;
  this.y = function interna() {
    let x = 10000;
    console.log(this);  // este Window
    console.log(x);     // 10000
    console.log(this.x);// undefined->caz let!!!
  };
  console.log(x);       // 1000
  console.log(this);    // Window
  console.log(this.x);  // undefined
  console.log(this.y);  // function interna()
  this.y();             // 10000 și undefined
}; container();
```

Evaluările se soldează cu `undefined` pentru cazul global scope pentru că `let` și `const` sunt blocked scoped.

Formarea legăturii la obiectul `this` mai depinde și de modul cum scrii codul. Dacă ai deprins practica bună a folosirii lui `"use strict";`, atunci vei observa că legătura la `this` în cazul unei funcții simple suferă o modificare. Nu se va mai lega la obiectul global, iar valoarea va fi `undefined`.

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

Atenție, nu contează dacă locul apelării este sub regula `"use strict";`, ci contează dacă funcția este sub această regulă. Am menționat acest aspect pentru că este posibil ca software-ul scris de tine să respecte `"use strict";`, dar să fie legat de software mai vechi (programatorii îi spun pe engleză **legacy**, adică **moștenit**), care nu este sub regulă și astfel, fiind posibilă apariția unei serii de erori a căror sursă să fie chiar această diferență.
Reține că pentru codul sub `"use strict";`, valoarea lui `this` este `undefined` pentru global scope.

## Cazurile lui `this`

În cazul obiectelor, atunci când apelezi o funcție (care joacă rolul de metodă), folosind `.` sau `[]`, acel obiect va fi contextul, adică `this`.

### `this` și constructorii

Știm că funcțiile sunt folosite pentru a construi obiecte. Fii totuși atentă că o funcție cu rol de constructor poate fi invocată și fără operatorul `new`. În acest caz se va comporta ca o funcție simplă cu toate consecințele rulări în acest mod.

```javascript
function NumescNave (indicativ, nume) {
  this.indicativ = indicativ;
  this.nume = nume;
  let tot = `${indicativ} este ${nume}`;
  console.log(tot);
};
let executie = NumescNave('ISS', 'International Space Station');
console.log(executie);// undefined (ce returnează o funcție fără return)
console.log(`${window.indicativ} este ${window.nume}`);
// 'ISS este International Space Station'
let obiect = new NumescNave('Tiangong-1', "Palatul Celest");
console.log(obiect);
```

Ceea se se distinge imediat este faptul că rularea funcției `NumescNave` fără `"use strict";` înjectează toate valorile precizate prin `this.` direct în obiectul global. De ce? Pentru că la acesta a fost stabilită legătura implicită pentru valoarea lui `this`. În cazul rulării funcției sub `"use strict";`, motorul JavaScript ar fi semnalat o excepție și ar fi afișat: **Exception: TypeError: this is undefined**. Concluzie, injectarea valorilor nu s-ar mai produce.

#### Pierderea contextului de execuție

TODO: rescrie pentru că este confuz!!!

```javascript
function Dorel () {
  this.nume = "Dorel";
  this.ego = function ego () {
    console.log(`Sunt constructorul ${this.nume}`);
  };
  setInterval(this.ego(), 5000);
};
Dorel();
// Sunt constructorul Dorel (afișat o singură dată)
```

Există cazuri în care sunt folosite funcții ale motorului JavaScript, care mai sunt numite în comunitate și utilitare (sunt funcții ale API-ul Web pus la dispoziție de fiecare browser în parte pe care le folosim în mod curent). Unul dintre acestea folosit pe scară largă este `setInterval()` cu scopul de a mima anumite comportamente în lucrul cu evenimentele.

```javascript
setInterval(this.ego(), 1000);
```

Efectul execuției:

*   Mesajul este afișat o singură dată,
*   `this` se conectează la obiectul global la execuția funcției `Dorel()` și se va îmbogăți automat cu `nume` (`window.nume`) și `ego` (`window.ego`)
*   `window` va păstra aceste proprietăți cât timp funcția este executată.
*   După execuție, va fi afișat `undefined` pentru că funcția și-a terminat execuția, contextul de execuție a dispărut, valorile lui `nume` și cea rezultată din evaluarea lui `ego` au fost **colectate la gunoi** (garbage collected) iar `this`, care, de fapt era `window` revine la forma anterioară.

Explicație:

Mesajul va fi afișat o singură dată pentru că funcția `ego` este invocată ca metodă: `this.ego()` a obiectului Dorel. Imediat ce execuția funcției Dorel() s-a încheiat, contextul creat de funcția Dorel a și dispărut.
Acest lucru se întâmplă pentru că `setInterval()` interpretează `this.ego` ca referință către o funcție pe care o și execută în contextul obiectului global. Vezi că obiectul global a fost îmbogățit și cu proprietatea nume. Drept dovadă, se pot apela direct `window.nume` și se poate executa `this.ego()`.

REȚINE: **`this` al unui callback indică întotdeauna către obiectul global. Pentru a fixa `this` la funcția gazdă se va folosi `call()`, `apply()` sau `bind()`**.

#### Menținerea legăturii la contextul de execuție corect

Acest lucru se realizează cu ajutorul unei funcții, care are darul de a face un **close over** pentru mediul lexical corect: `setInterval(function(){this.ego()}, 1000);`.

Făcând uz de ceea ce tocmai am aflat, vom putea actualiza fragmentul de cod pentru rezultatul așteptat de noi.

```javascript
let Dorel = function dorel () {
  this.nume = "Dorel";
  this.ego = function ego(){
    console.log(`Sunt constructorul ${this.nume}`);
  };
  setInterval(function(){this.ego()}, 5000);
};
Dorel();
```

**Explicație**:

Împachetând apelul către metoda obiectului într-o funcție, ne asigurăm că nu pierdem legătura la `this` pentru că executăm metoda în contexul dorit.
Acest lucru se întâmplă pentru că funcția `setInterval` nu a fost declarată în interiorul funcției noastre (aici este cheia înțelegerii). Noi, am executat-o în contextul codului scris de noi, dar nu suntem noi cei care au scris funcția `setInterval`. Aceasta aparține obiectului global și va avea drept `this` pe acesta mereu. Trucul pentru a menține o legătură la obiectul pe care-l dorim noi a fi să pasăm delararea unei funcții drept prim parametru și `this` va fi scope-ul creat de funcția `dorel` așa cum ne-am dorit.
La execuție, ceea ce se întâmplă este că împrumutăm funcționalitatea lui `setInterval`, dar contextul de execuție va fi setat la scope-ul și `this`-ul funcției `dorel` pentru care funcția callback face **closure**.
`This`-ul este chiar `window`, cel care a fost primit automat la invocarea lui `dorel` și care a fost îmbogățit deja cu proprietatea `nume` și metoda `ego`. O altă soluție pe care o vom explora de îndată este legarea cu `bind` de obiectul care se dorește a fi contextul de execuție.

### Manifestarea legăturii la `this` în funcție de vecinătate

Atenție! Legătura la `this` se manifestă la cel mai apropiat membru al unui obiect la care se face referință:

```javascript
let token = 1000;
let obi = { token: 10 };
function faCeva () {
  console.log(this.token);
};
obi.faCeva = faCeva;
obi.adancit = {altceva: faCeva, token: 10000}; // deci, faCeva, va primi implicit this, care este obiectul (adancit) membru a lui obi
obi.faCeva();           // 10
faCeva();               // 1000, dacă ai token declarat în global.
obi.adancit.altceva();  // 10000
```

Spunem că obiectul de la stânga punctului este cel care va fi cel ce constituie `this` pentru metoda invocată. Reține faptul că o metodă poate fi o funcție care a fost definită în afara obiectului care va „găzdui” execuția sa cu rolul de context de execuție.

Încă un aspect important care, odată înțeles, reduce frustrările legate de pierderea legăturii la `this`-ul dorit. Să ne imaginăm un obiect care are definită o funcție ca metodă a acelui obiect. Adu-ți mereu aminte că definirea unei funcții, transformă acea funcție într-o valoare. Nimic mai mult. Abia când este invocată are puterea să facă ceva, creează un mediu lexical și codul din corp este evaluat.

```javascript
var ceva = 1;
var obiect = {
  ceva: 'test',
  altceva () {
    console.log(this.ceva);
  }
};
obiect.altceva(); //test
var thisPierdut = obiect.altceva;
thisPierdut(); // 1
```

Ceea ce se observă este faptul că indiferent de faptul că am definit funcția în interiorul obiectului, sintagma `obiect.altceva` nu este nimic mai mult decât o adresă a valorii de funcție. Problema este că în acest moment constituirea unei referințe la această adresă și invocarea referinței, va conduce la stabilirea obiectului `this` la mediul lexical al referinței, nu a obiectului în care a fost definită funcția a cărei valoare a fost asignată referinței noi. Poți privi acest lucru ca pe un **împrumut** al funcționalității metodei, dar care se va aplica într-un nou context. Ce să vezi, acest nou context este și obiectul `this` în care se va evalua codul funcției.

### `this` pe lanțul prototipal al obiectului

Dacă metoda este definită în lanțul prototipal al obiectului, `this` face referință către obiectul în care s-a invocat metoda ca și cum metoda ar face parte din obiect.

```javascript
var alfa = {
  primo: function () {
    return this.ceva + this.altceva;
  }
};
var beta = Object.create(alfa); // s-a făcut legătura prototipală la alfa
beta.ceva = 10;
beta.altceva = 10;

console.log(beta.primo()); // 20
```

## Regulile de binding - de generare a obiectului `this`

Douglas Crockford spune despre `this` că este un parametru bonus și mai spune un lucru la care trebuie să reflectăm: `this` este motivul pentru care avem mecanismul de moștenire.

Pe scurt cazurile în care se face legătura la `this` și cine este `this` pentru fiecare caz.

| Cazul de invocare a funcției                 | Cine este `this`                                                   |
|:-------------------------------------------- |:------------------------------------------------------------------ |
| funcție simplă                               | obiectul global, iar în „strict” este „undefined”                  |
| metodă                                       | obiectul pentru care funcția joacă rol de metodă                   |
| funcția este folosită ca și constructor      | `this` este însuși obiectul returnat de invocarea cu `new`         |
| folosirea cu `apply()`, `call()` și `bind()` | `this` este pur și simplu obiectul specificat în primul parametru. |

### 1. Binding primar

Bindingul primar se face la global object (Window).

Este prima regulă și este și cazul simplei invocării a funcției. Atunci când nicio altă regulă nu se aplică, aceasta se aplică din start. Funcționează dacă nu este rulat codul sub „use strict”.

```javascript
let test = 2;
function faCeva () {
  console.log(this.test); // this.test rezolvă la variabila globală test
};
faCeva(); // 2
```

### 2. Binding implicit numit și *atașat*

Îi spun *atașat* pentru că binding-ul se face la obiectul în care este invocată funcția (**call site**), ca metodă.
Regula: obiectul în contextul căruia se execută funcția ca metodă este pe care funcția îl consideră a fi `this`.

```javascript
const obiectLiteral = {
  ceva: 2,
  metoda: faCeva
};
function faCeva () {
  this.test = 1001; // introduce în obiectLiteral test
  this.ceva = 50;   // modifica valoarea lui ceva
  console.log( this.ceva ); // 50
};
obiectLiteral.metoda();
console.log(obiectLiteral.test); // 1001
console.log(obiectLiteral.ceva); // 50
```

Pentru că `obiectLiteral` este `this` pentru invocarea `faceva()`, atunci **this.ceva** este fix același lucru cu cu **obj.ceva**.

Următoarea secvență de cod este asemănătoare.

```javascript
const obiectLiteral = {
  proprietate: "ceva",
  metoda: function () {
    console.log(this.proprietate);
  }
};
obiectLiteral.metoda(); // ceva
const obiectLiteral2 = {
  proprietate: "altceva",
  metoda: obiectLiteral.metoda
};
obiectLiteral2.metoda(); // altceva
let proprietate = "valoarea proprietății obiectului global";  // prop. a obi.global
let metoda = obiectLiteral.metoda;                            // metodă a obi.global
metoda(); // => valoarea proprietății obi. global; echivalent cu window.metoda()
```

Bindingul implicit poate fi pierdut atunci când faci referință către metodă și nu o și execuți. De fapt, nu faci referința către metodă, căci însăși metoda este o referință către funcția care joacă rol de metodă.

```javascript
const obiectStudiu = {
  ceva: 1001,
  metoda: function special () {
    console.log(this.ceva);
  }
};
let ceva = 2002;
let referinta = obiectStudiu.metoda; // e doar o referință, nu este valoarea funcției.
referinta(); // 2002  call-site pentru care se aplică regula 1 - binding primar.
```

Ceea ce s-a întâmplat, de fapt este că a fost „împrumutată” (invocată) funcția în contextul obiectului global. În acest caz se aplică regula bindingului primar. Dacă funcția nu ar fi fost numită, în call stack ar fi apărut cu numele referinței (obiectStudiu.metoda).

### 3. Binding explicit

Utilitarele `call()` și `apply()` sunt utilități disponibile prin `[[Prototype]]` tuturor funcțiilor, care sunt de fapt la rândul lor obiecte (funcțiile sunt obiecte `Function`, care moștenesc metodele din prototipul său).

Bindingul explicit se realizează prin intermediul lui `call()` și `apply()`. Ambele iau ca prim parametru un obiect care va fi folosit pentru `this` și apoi va invoca funcția cu acel `this` deja specificat. Pentru că este afirmat în mod direct unde dorești să fie `this`, numim aceasta **binding explicit**.

O chestie interesantă este că de vei pasa valoarea unei primitive simple de tip string, boolean sau number, atunci primitiva va fi „impachetată” în forma de obiect corespondentă (`new String(..)`, `new Boolean(..)`, or `new Number(..)`) și abia la acesta se va face binding-ul `this`. Acest lucru se numește "boxing".

#### Mecanismul oferit de `apply()` și `call()`

Ceea ce permite acest mecanism, de fapt este posibilitatea de a scrie o funcție cu rol de metodă, care să poată fi folosită în alt obiect fără a fi necesară rescrierea metodei pentru un nou obiect.

```javascript
var proprietate = "ceva din global"; // este proprietate a obiectului global
var obiectLiteral = { proprietate: "ceva" };
var faceva = function maner () {console.log(this.proprietate);};
faceva.call(obiectLiteral); // Spune: foloseste objectLiteral ca this. => ceva
faceva(); // => ceva din global
```

De fapt, `call()` schimbă contextul.
Dacă vrei să pasezi argumente funcției, acestea vor urma referința către noul context.

**De exemplu**:

```javascript
const obiect = {
  proprietate: 1000,
  metoda: function (unu, doi, trei) {
    console.log(this.proprietate);
  }
};
let proprietate = 4000;
obiect.metoda(); // => 1000
obiect.metoda.call(window); // 4000
obiect.metoda.call(window, 1, 2, 3);
obiect.metoda.apply(window, [1,2,3]); //acelasi lucru ca si call numai ca paseaza params ca array
```

##### Pierderea bindingului

Chiar și când se face un binding explicit, se poate pierde bindingul la `this`. Soluția ar fi „îmbrăcarea” într-o funcție „gazdă”.

##### Restabilirea contextului

Utilitarele `apply()` și `call()` oferă posibilitatea de a specifica direct contextul dorit. O altă metodă este de a folosi arrow functions. Funcțiile săgeată - arrow function au drept caracteristică faptul că mențin legătura la `this` care exista la momentul definirii sale.
ATENȚIE! Dacă funcția arrow este definită într-un object literal, valoarea lui `this` pe care o referențiază *arrow function* este obiectul global `window`.

```javascript
const fix = 1000;
let faCeva = function () {
  console.log(this);
  console.log(this.fix);
};
let faAltceva = () => {
  console.log(this);
  console.log(this.fix);
};
const centru = {
  fix: 10,
  faCeva: faCeva,
  faAltceva: faAltceva
};

centru.faCeva();    // Object { fix: 10, faCeva: faCeva(), faAltceva: faAltceva() } // 10
centru.faAltceva(); // Window → about:newtab // 1000
```

Există un exemplu pe care Marius Schulz îl oferă în cursul privind `this` pe platforma egghead.io, care oferă o perspectivă asupra mecanismelor interne limbajului, dar care sunt ascunse elegant într-o simplitate care are adâncimi interesant de explorat.

```javascript
let colectie = [2, 4, 7, 9];
let felia1 = colectie.slice(0, 2);
console.log(felia1); // 2, 4
```

Avem o colecție de cifre din care vom extrage o **felie** (slice în engleză). Ceea ce este interesat este că, de fapt am putea rescrie apelul la `slice()` ca un binding pe obiectul `colectie`. Apelului, îi vom trimite și cei doi parametri necesari lui `slice()` pentru a funcționa.

```javascript
var felia2 = colectie.slice.call(colectie, 0, 2);
console.log(felia2);
```

Și dacă dorim să încercăm o grupare a parametrilor, vom folosi `apply()`:

```javascript
let felia3 = colectie.slice.apply(colectie, [0, 2]);
console.log(felia3);
```

Fii foarte atent căci de vei pasa drept prim parametru lui `call()` sau lui `apply()` o valoare `null` sau `undefined`, motorul va lua drept obiect `this` obiectul global. Scrierea codului sub regula `"use strict";` nu mai permite această legătură.

### 4. Binding puternic (hard binding)

Este modul în care te asiguri întotdeauna că `this` este predictibil și nu alunecă în global scope.

```javascript
const a = 101;
function faCeva () {
  console.log(this.a);
};
const obi = {
  a: 1010
};
let gazda = function () {
  faCeva.call(obi);
};
gazda(); //1010
// functia gazda întărește legătura lui this la obi.
gazda.call(window); // 1010
```

Se realizează un cuplaj forțat între o funcție care trebuie să ruleze musai în contextul unui anumit obiect.

Împachetarea într-o funcție gazdă creează și comunicare înspre și dinspre hard binding:

```javascript
// o funcție care se va executa în contextul unui obiect
// 1. acceptă date prin parametri
// 2. returnează date prelucrate
let activitate = function activ (date) {
  console.log(this.a, date);
  return this.a + date;
};

// un obiect care oferă contextul de lucru pentru activitate()
// 1. conține date și sau metode necesare prelucrărilor pe care le face activitate()
let obiectGazda = {
  a: 1000
};

// o funcție gazdă care „întărește” bindingul this la obiect
// returnează o valoare, care este ceea ce a returnat activitate după ce a prelucrat datele
let modificaGazda = function () {
  return activitate.apply(obiect, arguments); // arguments este un array like
};

// introdu date in gazdă, pe care le va folosi activitate
let rezultat = modificaGazda(100);
console.log(rezultat); // 1100
```

Începând cu ES5 `bind()` a fost introdusă ca metodă în prototipul oricărei funcții - `Function.prototype.bind()`. Această metodă este cel mai des întâlnită în uz atunci când se dorește legarea de un obiect.

```javascript
// o funcție care se va executa în contextul unui obiect
let activitate = function (date) {
  console.log(this.a, date);
  return this.a + date;
};
// un obiect care oferă contextul de lucru pentru activitate()
const obiect = { a: 1000 };
// realizarea hard binding-ului
let binding = activitate.bind(obiect);
// folosirea șablonului cu date
let rezultat = binding(4000); console.log(rezultat); // 5000
```

Rolul lui `bind()` este acela de a returna o funcție care conectează `this` la obiectul context în care rulează.

```javascript
const obi = {
  prop1: 10,
  met: function ex () {
    setTimeout(function () {
      console.log(this.prop1);
    }.bind(this), 1500);
  }
};
obi.met();
```

O mulțime de metode ale obiectelor interne ale limbajului oferă un parametru opțional numit „context”, care are rolul de a evita folosirea lui `bind()`, asigurând faptul că funcția callback folosește un anume `this`.

Nu uitați că odată cu ES6 se pot folosi „funcțiile săgeată” - arrow functions, care sunt legate de `this` automat. Folosirea lui `this` într-o astfel de funcție trimite la `this` al funcției context / gazdă.

#### Parcurgerea unui array cu aplicarea unei funcții:

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
  captura: function(){document.addEventListener('click', function(eveniment){
    this.prelucreaza(eveniment.type); // trimite tipul evenimentului
  }, false)},
  prelucreaza: function(tip){
    console.log(`Prelucrez acest ${tip} pentru ${codUnicObiect}`);
  }
};
```

Este nevoie de `bind(this)` pentru a păstra legătura la obiectul în cadrul căreia se execută metoda. Altfel, fără `bind(this)`, `this` se va stabili la obiectul DOM la care se atașează listener-ul (receptorul).

Formula `bind(this)` leagă înapoi `this` la obiectul a cărui metodă este. Dar pentru ca acest lucru să se întâmple, se va folosi operatorul de grupare pentru a „repoziționa” legătura `this` la obiectul părinte, nu a elementului DOM.

```javascript
let obiExecutor = {
  captura: function(){document.addEventListener('click', (function(eveniment){
    this.prelucreaza(eveniment.type); // trimite tipul evenimentului
  }).bind(this), false)}
};
```

Pentru a rezolva elegant se poate folosi un arrow function:

```javascript
let obiExecutor = {
  captura: function(){document.addEventListener('click', eveniment => this.prelucreaza(eveniment.type), false)}
};
```

Exemplul de la Mozilla Developer Network:

```javascript
this.x = 9;
const modul = {
  x: 81,
  getX: function () { return this.x }
};
modul.getX(); // 81
let retrieveX = modul.getX;
retrieveX(); // 9, deoarece "this" face referință la obiectul global.
// Funcția este doar „împrumutată” din metoda obiectului
// Creează o nouă funcție cu this bound la modul
let boundGetX = retrieveX.bind(modul);
boundGetX(); // 81
```

### 5. Binding cu `new` în cazul constructorilor

Poți pune în fața oricărei funcții operatorul `new` și o transformi astfel într-un apel către un constructor.

```javascript
function SuntUnConstructor () {
  // se creează proprietăți în this
  this.ceva = 100;

  // dacă se returnează un obiect,
  // atunci obiectul va fi rezultat
  // dacă nu returnează un obiect,
  // atunci this va fi rezultatul apelării cu new.
};
let obi = new SuntUnConstructor();
console.log(obi.ceva); // 100
```

Și cazul în care se face returnare:

```javascript
function AltConstructor () {
  this.alfa = 10000;
  return { alfa: 1 };
};
let obi = new AltConstructor();
console.log(obi.alfa); // 1
```

#### Mantre

-   O funcție apelată cu `new` în fața sa este un constructor.
-   `new` este mai puternic decât hard binding-ului.
-   Dacă funcția nu returnează ceva, atunci înainte de a se închide blocul („}”), `this` va fi returnat automat.

Ceea ce va face la instanțiere este exact ceea ce a fost proiectată funcția la care se adaugă patru comportamente nevăzute.

#### Ce se întâmplă când pui operatorul `new` în fața oricărei funcții?

1.  Se creează un obiect nou.
2.  Se creează o legătură la obiectul prototype al funcției a cărui identificator a fost folosit cu `new`. Se creează legătura prototipală.
3.  Obiectul generat automat este pasat funcției cu rol de constructor ca fiind parametrul `this` și astfel, devine contextul de execuție a funcției constructor invocate (`this` este pasat ca parametru împreună cu `arguments`).
4.  Dacă funcția nu returnează ceva, atunci înainte de a se închide blocul („}”), `this` va fi returnat automat.

```javascript
function viitorObiect (data) {
  this.x = "ceva din obiectul test2";
  this.y = data;
};

/* Se generează un obiect cu identificatorul obiectul
 * poți trimite date în noul obiect care devin membri ai this */
let obiectul = new viitorObiect('venit din afară');

/* Atunci ai acces la proprietatea x și y
*  pentru că este returnat obiectul */
console.log(obiectul.x, obiectul.y); // ceva din obiectul test2 venit din afară
```

#### Restricționarea folosirii unei funcții doar ca și constructor

Restricția se aplică astfel:

```javascript
function VehiculSpatial (nume) {
  if(this instanceof VehiculSpatial){
    this.nume = nume;
    this.tip = 'vehicul';
  } else {
    throw new Error('Funcția are rol de constructor! Invocă cu new');
  }
};
let obiectNou = new VehiculSpatial('ISS'); // { nume: "ISS", tip: "vehicul" }
let obiectEsuat = VehiculSpatial(); // Error: Funcția are rol de constructor! Invocă cu new
```

Această restricționare poate fi păcălită apelând funcția constructor în contextul unui obiect deja creat de funcția constructor fără a instanția cu new.

```javascript
var obiectPacalitor = VehiculSpatial.call(obiectNou, 'Soyuz');
// în acest moment, obiectNou este modificat la Object { nume: "Soyuz", tip: "vehicul" }
```

Ceea ce tocmai s-a petrecut este că s-a invocat constructorul în contextul unui obiect deja construit pe baza lui, iar `this` a devenit obiectul deja creat. Acest lucru conduce la rescrierea lui `nume` în obiectul gazdă (`obiectNou`). Aceast comportament nu este cel așteptat atâta vreme cât am dorit ca funcția constructor să permită invocarea doar cu `new`.

În ES6 această problemă este reglată prin `new.target`. Acestă proprietate, care este mai specială pentru că se adresează unui viitor obiect ce nu a fost creat încă, capătă o valoare atunci când metoda `[[Construct]]`. Valoarea este constructorul obiectului proaspăt generat, adică `this`. Dacă funcția constructor este apelată fără `new` asta înseamnă că este apelată cu `[[Call]]`, `new.target` va avea valoarea `undefined`.

```javascript
function VehiculSpatial (nume) {
  if(typeof new.target !== "undefined"){
    this.nume = nume;
    this.tip = 'vehicul';
  } else {
    throw new Error('Funcția are rol de constructor! Invocă cu new');
  }
};
let obiectNou = new VehiculSpatial('ISS'); // { nume: "ISS", tip: "vehicul" }
let obiectPacalitor = VehiculSpatial.call(obiectNou, 'Soyuz'); // Error: Funcția are rol de constructor! Invocă cu new
```

## Precedența regulilor

În funcție de call-site pot activa una sau mai multe reguli de binding. Există modalități de a stabili care reguli de binding se aplică pentru `this`.

Întrebări de verificare cheie în call-site pentru a determina la ce este făcut bindingul prin `this`. Aceasta este și ordinea precedenței:

1.  A fost chemată funcția cu `new`? Dacă da, `this` este chiar obiectul returnat (**binding cu new**).
2.  A fost apelată prin `call()` sau `apply()`? Dacă da, folosește acel obiect pentru context - binding explicit.
3.  A fost apelată funcția într-un obiect care conține referința sau o deține (context) - binding implicit.
4.  Global object (cu excepția rulării în `use strict`)

Concluzie: Bindingul explicit are precedență asupra celui implicit.

## Studiu de caz: acțiunea operatorului new asupra bindingului lui `this`:

```javascript
function actiune (val1, val2) {
  this.x = val1;
  this.y = val2;
};

var obiect = {
  y: 5000
};

var sudura = actiune.bind(obiect); // o referință către funcția actiune in contextului lui obiect
console.log(sudura);               // function bound actiune()

sudura('1000');
console.log(obiect.x);             // 1000
console.log(obiect.y);             // undefined

sudura('5000', '10000');
console.log(obiect.x);             // 5000
console.log(obiect.y);             // 10000

// constructor
var nou = new sudura(2000);        // se creează un nou obiect, având un nou binding
console.log(nou);                  // Object { x: 2000, y: undefined }
console.log(nou.x);                // 2000
console.log(JSON.stringify(nou));  // {"x":2000}
```

Ce se întâmplă atunci când setezi valorile argumentelor:

```javascript
function actiune (val1, val2) {
  this.x = val1;
  this.y = val2;
};

var obiect = {
  y: 5000
};

var sudura = actiune.bind(obiect, 'bau', 'miau'); // o referință către funcția actiune in contextului lui obiect
console.log(sudura);                              // function actiune()

sudura('1000');
console.log(obiect.x, obiect.y);                  // bau miau

var nou = new sudura(2000);        // se creează un nou obiect, având un nou binding
console.log(nou.x, nou.y);         // bau miau
console.log(JSON.stringify(nou));  // {"x":"bau","y":"miau"}
console.log(obiect.x, obiect.y);   // bau miau
```

Ceea ce se observă este că `new` are capacitatea de a suprascrie hard binding-ul. Motivul pentru care este permis un astfel de comportament este pentru că poți creea dintr-o funcție un obiect, care să ignore hard-binding-ul existent, dar care presetează o parte sau toate argumentele funcției.

## Comportamentul lui `this` în cazul fat arrows

Funcțiile *fat arrow* nu stabilesc propria legătură la `this`. Pur și simplu folosesc obiectul în contextul căruia rulează ca `this`, dar dacă rulează în altă funcție, vor folosi obiectul `this` constituit de acea funcție.
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

În cazul fat arrows, this este legat de mediul lexical al obiectului. `forEach` nu alunecă în global.

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

În cazul în care folosești forEach(), trebuie să știi că poți pasa și `this`, ca al doilea argument. Deci, nu face „punte lexicală” de genul `var that = this` pentru a adăuga rezultatele iterării la `this`. (vezi [MDN>Web technology for developers>JavaScript>JavaScript reference>Standard built-in objects>Array>Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach))

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
