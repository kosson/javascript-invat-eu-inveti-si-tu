# Funcții în ECMAScript

Douglas Crockford spunea în lucrarea de căpătâi *JavaScript: The Good Parts* că

> În general, arta programării este să transformi un set de cerințe într-un set de funcții și structuri de date.

Povesteam la capitolul dedicat legăturii `this` că funcțiile sunt precum niște nave, care își execută misiunile în contextul *Oceanului planetar*. Acestea prelucrează date, dar pot fi la rândul lor purtătoare a datelor proprii. De fiecare dată când ne gândim la o funcție, trebuie să privim un obiect. Funcțiile sunt obiecte. Ele în sine sunt valori care pot fi manipulate la fel cum facem cu oricare altă valoare a limbajului.

**Moment ZEN**: O funcție este un obiect care poate fi invocat.

O funcție este declarată folosind cuvântul cheie `function`, opțional urmat de un șir de caractere, care este numele funcției urmate de paranteze rotunde. Dacă funcțiile nu primesc nume, le vom clasifica ca *anonime*. Între parantezele rotunde sunt declarați identificatori, care constituie argumentele funcției (acestea formează antetul). În interiorul funcției se transformă în tot atâtea variabile locale. Urmează apoi acolade ce delimitează blocul de cod ce găzduiește un set de enunțuri ce vor fi evaluate la invocarea funcției. Acesta este numit corpul funcției.

```javascript
function faCeva (arg1, arg2) {
  var oValoare = arg1 + arg2;
  return oValoare;
}; faCeva(1, 3); //4
```

Funcțiile oferă toate capabilitățile obiectelor pentru că **sunt obiecte**. Dacă privești la modul de redactare, chiar arată precum o declarație de obiect literal, având în plus cuvântul cheie `function` și parantezele rotunde în care poți introduce argumentele.

```javascript
let obi = {};
obi.a = 10;
function fun () {};
fun.a = 10;
// poți introduce proprietăți
// exact ca în cazul obiectelor
```

Ba mai mult, funcțiile au chiar metode proprii pe care le poți utiliza în anumite cazuri. Am văzut deja utilitatea lui `call()`, `apply()` sau `bind()`. Din curiozitate, deschide consola în browser și declară o funcție: `function ceva () {};`. Acum scrie identificatorul funcției urmat de punct. Ceea ce vei vedea sunt toate proprietățile și metodele obiectului funcție. Cred că în acest moment ești convinsă că funcțiile sunt obiecte, de fapt.

Veți întâlni funcțiile la orice pas și în combinații diferite ca parte a unor expresii ale unui enunț sau ca declarații directe. Veți mai întâlni funcțiile ca valori pasate ca argumente unei alte funcții, fie ca identificator, fie declarate direct în antetul altei funcții. Le veți mai vedea la treabă în rolul de constructori de obiecte. Reține faptul că acolo unde este permisă scrierea unei expresii, poți scrie o funcție. Bunele practici îndeamnă programatorii să scrie funcțiile cât mai aproape de locul unde vor fi folosite.

Unul din motivele evidente pentru care există funcțiile este acela al reutilizării în diferite scenarii. De ce? Pentru că ar fi o nebunie să scrii aceeași secvență de cod de 1000 de ori, dacă în diferite părți ale codului este nevoie de un „tratament” identic al unor seturi de valori diferite.

## Unități de execuție

Funcțiile sunt unități modulare de execuție a codului. O funcție poate fi percepută ca un subprogram, ca o subrutină. Veți mai întâlni în alte lucrări și denumirea de *proceduri*. Cel mai sănătos mod de a privi activitatea și efectele unei funcții este gândind întotdeauna că o funcție este un set de instrucțiuni, care se aplică unui set de date primit ca argumente. De ce să faci asta? Pentru că în interiorul funcției vei prelucra datele primite și la final vei dori să oferi rezultatele la care ai ajuns.

## Funcțiile sunt valori

**Moment Zen**: Funcțiile sunt valori în sine care pot fi referite printr-un identificator (variabilă).

Funcțiile sunt cunoscute ca fiind de **ordin înalt** (în engleză îi spune **higher order**), ceea ce înseamnă că sunt la rândul lor valori, că pot fi pasate altor funcții, că pot fi returnate ca rezultat al evaluării unei alte funcții, cam tot ce poți face cu oricare altă valoare. Acest aspect face din JavaScript un limbaj foarte potrivit pentru a lucra cu funcțiile într-o paradigmă numită în limba engleză *functional programming*, adică **programare funcțională**.

## Anatomie

Pentru a înțelege mecanismele oferite de o funcție în prelucrarea datelor, vom examina o funcție desfăcând părțile sale așa cum le prezintă la momentul execuției. Până când nu este apelată, o funcție este o simplă valoare, un simplu obiect.

![](FunctiaLaMomentulExecutiei.png)

Atunci când este invocată o funcție, se creează un nou mediu lexical propriu acelei funcții. Orice funcție va moșteni automat proprietățile și metodele obiectelor interne `Object` și `Function`. Îți mai aduci aminte de capitolul pe care l-am dedicat Genezei și apoi dualității funcție-obiect? Toate acele informații sunt necesare acum pentru a înțelege natura unei funcții. Dacă vei declara o funcție în consola unui browser, și apoi vei scrie numele funcției urmat de operatorul punct, vei vedea că apar deja proprietăți ale acestei funcții. Este semnul că funcția ca valoare este obiect deja, moștenind proprietăți de la cele două obiecte interne fundamentale `Object` și `Function`. Pe scurt, o funcție moștenește proprietățile din obiectul prototipal `Function.prototype`, care la rândul lui moștenește proprietăți din `Object.prototype`.

**Spune standardul**:

> Atunci când se realizează un context de execuție pentru evaluarea unei funcții ECMAScript, se creează un nou Environment Record pentru această funcție, iar legăturile pentru fiecare parametru formal sunt instanțiate în acel Environment Record. Fiecare declarație din corpul funcției este la rândul ei instanțiată. Dacă parametrii formali ai funcției nu includ niciun inițializator de valori implicite, atunci declarațiile din corp sunt instanțiate în același Environment Record ca și parametrii. Dacă inițializatorii de valori implicite există, va fi creat un al doilea Environment Record pentru declarațiile din corp. Parametrii formali și funcțiile sunt inițializate ca parte a `FunctionDeclarationInstantiation`. Toate celelalte legături sunt inițializate în timpul evaluării corpului funcției. [9.2.12 FunctionDeclarationInstantiation ( func, argumentsList )](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-functiondeclarationinstantiation)

**Funcțiile sunt valori**! Conștientizarea acestei afirmații este una crucială pentru înțelegerea în adâncime a limbajului de programare. Mai înainte de a fi executată și astfel, codul ECMAScript conținut să fie evaluat, aceasta este o valoare în sine. Știm deja că ne putem juca cum vrem noi cu o valoare, chiar o putem pasa ca unei alte funcții sau o putem returna dintr-o funcție.

Am compus o imagine cu simbolurile pe care le-am folosit și în capitolul dedicat dualității funcție-obiect. Putem urmări cum o funcție primește argumente, care devin parametri. Aceștia sunt colectați într-o structură de date internă funcției numită **arguments**, care este disponibilă la momentul evaluării codului intern.

Aplicarea unei funcții argumentelor sale produce un nou **mediu lexical**, un nou **scope** așa cum este denumit în engleză. Acest mediu lexical este ca un registru în care se ține evidența legăturilor între identificatori și valori. În mediul lexical sunt disponibili identificatorii definiți local în corpul funcției, precum și valorile primite ca argumente.

**Spune standardul**:

> Mediul unei funcții este un Mediu Lexical care corespunde invocării unui obiect funcție EMCAScript. Un mediu al unei funcții poate crea o nouă legătură `this`. Un mediu al funcției poate captura starea necesară pentru a satisface invocările metodei `super` [ECMAScript® 2017 Language Specification (ECMA-262, 8th edition, June 2017). 8.1 Lexical Environments](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-environment-records).

Ca obișnuință, ar fi de dorit să gândești că funcția se aplică pe argumente, atunci când acestea există. În adâncime, trebuie înțeles că acest comportament este posibil pentru că funcțiile sunt pur și simplu sunt **o-bi-ec-te**. Sunt niște obiecte speciale pentru că pur și simplu pot executa codul din interior ori de câte ori se dorește.

**Moment Zen**: O funcție, de fapt, *se aplică* argumentelor pasate care sunt valori, le prelucrează și le oferă apelantului prin returnare.

Mai observăm din imagine că unei funcții îi sunt puse la dispoziție două lanțuri de conectare cu obiectele în contextul cărora sunt executate. O scurtă paranteză aci. Spuneam din deschiderea lucrării că mai totul în JavaScript este un obiect. Chiar și o funcție, care este un obiect special, la momentul execuției sale lansată în urma unui apel, aceasta nu rulează în vid absolut. Există un obiect pe fundalul căruia aceasta rulează. Vorbim despre un obiect context, cu care funcția noastră stabilește niște legături speciale. Una dintre legături este chiar la proprietățile obiectului context, care sunt accesibile printr-o legătură numită `this`, iar cealaltă este la mediul lexical format prin declararea variabilelor, dar și restul funcțiilor și obiectelor programului prezente ca identificatori în locul unde a fost declarată. Pentru că vorbirăm de mediul lexical, o funcție creează propriul său mediu lexical în momentul evaluării. Dacă un identificator necesar evaluării codului funcției, nu a fost găsit, se va proceda la o căutare *în afara* funcției, în mediul lexical exterior ei în locul unde a fost definită și așa mai departe până când se ajunge la mediul global. Această procedură se numește în limba engleză **scope lookup** și pentru faptul că din bula lexicală a funcției se caută în bula mai mare a mediului lexical ce înconjoară funcția, iar dacă există una superioară, va căuta și în aceea, programatorii au numit acest lucru **scope chain**, cu o traducere în limba română: **căutare pe lanțul mediilor lexicale**.

În afară de aceste două legături foarte importante pe care le stabilește o funcție, mai este una foarte importantă prin care orice obiect, fie că este funcție sau obiect, primește niște puteri, niște caracteristici din prima. Precum în genetică, obiectele create în JavaScript, vor **moșteni** automat o serie de proprietăți și metode direct de la obiectele fundamentale și dacă se dorește, de la alte obiecte create de noi. Acest lucru se numește în programare **moștenire prototipală** și este baza unor prelucrări de date având deja la îndemână instrumente cu care să te ajuți. Poți să-ți închipui obiectele interne ale JavaScript precum lădițele cu scule dintr-un atelier auto. Sunt pline deja cu instrumente și piese, gata de a fi folosite. Funcțiile create de noi nu fac nicio excepție și moștenesc și ele. Acest lucru este mi-nu-nat pentru că le poți manipula ca date, ca valori înainte de a fi executate.

### Funcțiile returnează rezultate

Funcțiile în JavaScript trebuie să returneze un rezultat fără excepție. Chiar în momentul declarării, funcțiile returnează ceva, iar acel ceva este valoarea `undefined`. Următoarele enunțuri sunt echivalente ca rezultat.

```javascript
function facCeva () {};
function facAltceva () {
  return;
};
function facLucruri () {
  return undefined;
};
```

Adesea vom dori returnarea rezultatelor ca un array sau ca un obiect. Pe lângă faptul că putem returna array-uri și obiecte, pot fi returnate chiar alte funcții. Nu voi înceta să repet faptul că o funcție mai întâi de toate este ea însăși o valoare. Funcțiile pot primi drept argumente alte funcții și pot returna mai apoi alte funcții. Acest aspect interesant al funcțiilor definește capacitatea acestora de a fi **de ordin înalt**. Returnarea datelor dintr-o funcție înseamnă și încheierea execuției acesteia și revenirea sa la starea de valoare. Poți să-ți imaginezi o funcție precum un bec, care în sine este o valoare. Alimentat, acesta transformă curentul electric în lumină și căldură. La deschiderea circuitului redevine doar un bec.

Următorul exemplu expune o funcție care conține la rândul său o altă funcție. Acest scenariu este unul care introduce și conceptul de **closure**, o funcție internă ce *face o ancorare* a mediului lexical în care a fost declarată. Acest lucru se întâmplă pentru că funcția are nevoie de identificatorii necesari propriei execuții. Vom aprofunda **closure-urile**, dar pentru te știu fire curioasă, hai să privim la următoarea secvență de cod ca exemplu.

```javascript
function ex (unu, doi) {
  console.log(this);  // Window
  this.trei = 3;      // se creează prop trei: window.trei care este 3
  console.log(ex.arguments);
  // Arguments {0:1,1:2,calee:ex(),length:2,__proto__:Object}
  function intern (patru, cinci) {
    console.log(this.trei);    // 3
    console.log(ex.arguments);
    // Arguments {0:1,1:2,calee:ex(),length:2,__proto__:Object}
    console.log(unu); // 1
  };
  intern();
}; ex(1,2);
console.log(window.trei);
```

Codul sursă a acestei funcții este considerat a fi `Global code`, adică nu a fost *împachetat* în altă funcție sau într-un bloc de cod.
Această funcție a fost declarată în primul mediu lexical: `global environment` sau `global scope`. În cazul browserelor, acesta este obiectul global `window` cu toate proprietățile sale printre care și obiectele interne specifice JavaScript.
Pentru a testa care este mediul lexical, se face un `console.log` pe `this`, care relevă cine este contextul în care funcția este evaluată. Contextul în cazul nostru este acest obiect `window` creat de browser.
Pentru că `this` este un identificator pentru context, care la rândul său este un obiect, i se pot injecta proprietăți noi cu valorile dorite: `this.trei = 3`. Există o excepție pe care codul rulat sub regula `"use strict"` o impune: `this` în acest caz fiind `undefined`. Chiar și după ce funcția a fost evaluată deja și nu mai este în execuție, proprietatea setată obiectului context, va exista în continuare. Poți verifica printr-o interogare simplă: `console.log(window.trei);`.
Pentru ambele funcții `this` este obiectul global.
Pe lângă `this`, funcția mai are acces la un obiect constituit la momentul evaluării: `arguments`. Acesta cuprinde toate argumentele pasate funcției. Poate fi accesat chiar și dintr-o funcție internă după sintaxa `numeFunctieGazda.arguments`, dacă acest lucru este necesar sau direct fiecare parametru separat: `console.log(unu);`.
Funcția `intern()` are posibilitatea de a accesa identificatorii  din mediul lexical al funcției gazdă pentru că la momentul evaluării face referințe către membrii *Environment Record* al acesteia. Constituirea acestor referințe se numește **closure**.

## Magie pură - hoisting

Am numit eu **magice** aceste acțiuni ale compilatorului la momentul când interpretează codul pentru că se petrec câteva lucruri cu adevărat uimitoare.

Declararea unei funcții are ca efect declanșarea **hoising**-ului. Declarația este introdusă în registrul inventar al mediului lexical existent la momentul compilării codului. Magia rezidă din faptul că poți invoca o funcție înainte ca aceasta să fie declarată, dacă privești la modul în care este redactat codul în fișierul sursă. Superciudățel, nu?! Psst! Secretul este legat chiar de compilarea codului. Adu-ți mereu aminte că înainte de a fi rulat, codul este compilat. Dacă ai uitat ce se petrece în acel moment, merită să te întorci să mai citești o dată. Concluzia este că totul este deja disponibil încă din faza de compilare.

Poți să-ți imaginezi funcțiile ca niște vapoare care transportă și prelucrează valori. Toate vasele pe tot mapamondul se află deja în plutire la nivelul mării. Pot comunica unele cu altele și sunt diponibile scopurilor pentru care există. Așa sunt și funcțiile. Pur și simplu sunt disponibile deodată, nu pe măsură ce codul este executat.

Am aflat mai devreme că la executarea unei funcții, aceasta creează și un mediu lexical propriu (*scope*), dar mai e o chestie supertare: dacă într-un bloc de cod simplu introduci o declarație sau o expresie, se va crea un nou scope pentru respectivul cod. Ciudățel și super-interesant, nu?

```javascript
var x = 100, y = 'ceva';
{ var x = 10; console.log(this.x, this.y) }; // 10 ceva
```

## Nimic cu void

Utilizarea operatorului `void`, care precedă o expresie, o golește de valoarea pe care o avea.

```javascript
void 1; // undefined
void (function ki(){return 'energie';})(); // undefined
```

Și acum, vom face un exercițiu Zen, privind la exemplul perfect de funcție, care se poate executa, dar a cărei esență este golul, nedefinitul. Vom folosi un alt tip de funcții introduse de curând și care se numesc fat arrow. Ceea ce le face le face perfecte pentru această mică demonstrație, este formula de scriere concisă.

```javascript
() => {}; // returnează constructorul
// executând privim Ensō
( () => {} )(); // undefined
```

Cred că ai observat că am folosit operatorul de grupare, care *strânge* enunțurile, iar dacă acesta este chiar o funcție, punând după parantezele rotunde `()` pentru apelare, chiar va executa acea funcție.

## Evaluare

Înainte de a merge mai departe, trebuie să facem o diferență clară între apelare și referință. O funcție este apelată prin scrierea identificatorului urmat de `()`, iar referința este doar scrierea identificatorului, fiind returnată funcția ca valoare, adică chiar conținutul său.

Nimic din conținutul unei funcții nu produce niciun rezultat până când funcția nu este apelată și evaluată. *Apelare*, *invocare* și *rulare* sunt sinonime și înseamnă același lucru: momentul de inițiere a evaluării codului dintre acolade - **corpul funcției**.

La momentul invocării, funcția evaluează codul său intern și returnează un rezultat în urma evaluării expresiilor din corpul funcției. De fapt, o funcție este o expresie pe care motorul JavaScript trebuie să o evalueze, dar această expresie are în componența ei alte expresii, care la rândul lor au nevoie să fie evaluate, pentru ca funcția să poată fi evaluată. Deci, se vor evalua expresiile, până când se va ajunge la valorile de care funcția are nevoie să se execute.

Această concluzie vă va ajuta să înțelegeți mai repede ce este și cum funcționează un *closure*, adică o funcție returnată dintr-alta, care ține minte mediul lexical al celei în care a fost declarată indiferent unde este apelată. Nițel confuz? Nu-i nicio problemă. Le vom lămuri încet pe toate.

**Moment Zen**: În urma evaluării, întreg codul funcției este redus la valoarea returnată.

Am vorbit deja despre funcțiile *fat arrow*. În limba română s-ar traduce ca *săgeată grasă*, dar noi vom folosi denumirea din limba engleză. Numele îi vinde de la felul în care se prezintă vizual combinația dintre egal și semnul mai mare decât: `=>`și nu e nevoie de  cuvântul rezervat `function`. Adesea, aceste funcții sunt în poziția de ***callback-uri*** (funcții trimise ca valoare printr-un argument, care sunt apelate cu valoarea rezultată după ce întreaga funcție a fost evaluată). Până la callback să le analizăm.

```javascript
(() => 'ceva')(); // ceva
```

După cum se observă, sintaxa aplicată este ceva mai specială: `() => 'ceva'`. Fat arrows au nevoie de un eveniment care să declanșeze execuția. Pentru a face exemplul să funcționeze, am împachetat funcția într-o structură `()()`, ceea ce are drept efect executarea funcției dintre parantezele de grupare imediat ce a fost compilat codul. În comunitate, aceste structuri care se execută imediat se numesc **Immediately Invoked Function Expressions** - expresii de funcții invocate imediat. Pe scurt: IIFE.

Pentru că am deschis o fereastră în interiorul funcțiilor, trebuie menționat faptul că returnarea directă a unei expresii are drept efect returnarea valorii, dar dacă expresia este introdusă într-un bloc funcțional, va fi returnat `undefined`.

```javascript
(() => 1 + 1 )(); // 2
(() => {1 + 1})(); // undefined
```

Acesta este motivul pentru care pentru a obține valoarea în urma evaluării funcției, care are expresiile într-un bloc de cod delimitat de acolade, se va folosi cuvântul rezervat `return`.

```javascript
(function () { return 1 + 1; })(); // 2
```

Comanda `return` încetează executarea funcției cu o ultimă evaluare a rezultatului expresiei de după cuvântul cheie.

**Moment Zen**: Funcțiile returnează rezultatul evaluării expresiilor.

```javascript
(function ex () { return 10 + 1; })(); // 11
```

În cazul folosirii funcțiilor fat arrows, dacă introduci codul dintre acolade, nu se va mai face returnarea automat. Doar prin `return`.

```javascript
(() => { return 10 + 1; })(); // 11
(() => return 11 )(); // SyntaxError: expected expression, got keyword 'return'
```

Motivul pentru care avem o eroare de sintaxă este că toate expresiile trebuie să stea într-un bloc dedicat `{}`.

În inventarul expresiilor care pot fi returnate putem adăuga array-uri, care pot fi multidimensionale și care la rândul lor ca elemente pot conține alte expresii ș.a.m.d. Ceea ce doresc să accentuez este faptul că poți returna structuri întregi, fie ca obiecte, fie ca array-uri.

```javascript
((x, y, z) => [++x, ++y, ++z])(1, 2, 3); // [ 2, 3, 4 ]
// poți returna chiar funcții ca valori a unui array
(() => [() => 'ceva', () => 'altceva'])(); // [ function (), function () ]
```

**Moment Zen**: Dacă funcțiile pot returna evaluarea expresiilor, atunci pot returna la rândul lor alte funcții pentru că o funcție tot o expresie este.

Returnarea unei expresii de funcție este posibilă pentru că o funcție este o valoare legitimă ca oricare altă valoare.

```javascript
() => () => true; // function ()
var x = (y) => () => y; x(1)(); // 1; același lucru cu bloc
var a = (b) => () => { return b; }; a(2)(); // 2
```

După cum ai observat, am ales să lucrez cu funcțiile **fat arrow** în ultimele exemple. Am făcut acest lucru pentru a vă obișnui cu ele și pentru a le integra în practica personală. Feriți-vă să folosiți doar cu **fat arrow**. Fiecare are rolul ei și analiza caz cu caz, va revela buna practică.

## Funcțiile ca obiecte

Standardul numește funcțiile `function objects`. O funcție produce o instanță a unui **function object**, fapt care conduce la concluzia logică că în JavaScript, funcțiile au metode. Fain, nu?! Da hai să-ți mai spun una. Standardul le spune `callable objects`, adică în limba română **obiecte apelabile**.

**O funcție este un obiect apelabil**. O funcție care este asociată unui obiect prin intermediul unei proprietăți, este numită *metodă*.

Funcțiile sunt **obiecte first-class**, adică pot fi pasate ca argumente altor funcții și pot fi returnate din funcții. Funcțiile în JavaScript sunt de ***ordin înalt***, adică pot fi pasate ca valori și pot primi ca argumente alte funcții, dar acest lucru tot de faptul că sunt **first class** ține.

## Funcțiile moștenesc

Funcțiile moștenesc din `Function.prototype` și `Object.prototype` și proprietățile directe ale lui `Object` și `Function`.

**Moment Zen**: Funcțiile sunt efemere, fiind mecanismul prin care sunt preluate date, sunt prelucrate și apoi sunt returnate apelantului.

Spre deosebire de restul obiectelor, funcțiile pot fi invocate. Funcțiile sunt un subtip de obiecte numit tehnic *callable object*, iar acest lucru înseamnă că pentru acea funcție, motorul care implementează standardul ECMAScript are o metodă internă `[[Call]]`, care permite apelarea funcției dar și recursivitatea. Am introdus termenul de recursivitate. Acesta se referă la capacitatea ca o funcție să se autoapeleze la momentul evaluării codului intern.

O funcție care se apelează din interiorul său se numește funcție recursivă. Sunt trei modalități de a apela o funcție din interiorul ei:

-   după numele său,
-   folosind `arguments.callee`, o funcție proprietate a obiectului `arguments`,
-   folosind un identificator din scope care trimite referențiază funcția.

Funcțiile care pot deveni constructori prin apelarea cu `new` au o metodă internă `[[Construct]]`, care permite ca acestea să *construiască* obiecte. Nu toate funcțiile au această metodă internă. `Arrow functions` nu au `[[Construct]]`.

## Spune standardul

> Funcțiile obiecte încapsulează cod parametrizat care ține minte mediul lexical («closed over»), permițând evaluarea dinamică a codului.
> O funcție obiect este un obiect comun care are aceleași sloturi interne și aceleași metode interne ca orice alte obiecte comune.
> Codul dintr-o funcție obiect poate fi în «strict mode» sau nu. O funcție care rulează codul în strict mode se numește «strict function». Cele care nu rulează în «strict function» se cheamă că sunt «non-strict function».

Funcțiile obiect au sloturi interne și merită menționat `Realm`, care este o înregistrare a tărâmului în care a fost creată funcția.

## Mantre

-   Funcțiile sunt obiecte care incapsulează cod parametrizat cu o legătură la mediul lexical în care a fost declarată funcția („closed over a lexical environment”).
-   Funcțiile a căror corp este o **expresie**, vor returna chiar evaluarea acelei expresii - *fat arrows*.
-   Constructorul obiectului `Function` este chiar o funcție. În schimb, `Function` este constructor pentru `Object`. Cele două sunt constructorii tuturor obiectelor interne.
-   Începând cu ES6, este posibilă declararea funcțiilor în blocuri (de exemplu, în `if`-uri).
-   Funcțiile sunt invocate într-un loc care determină rezultatul, adică într-un anumit *context*.
-   Orice funcție poate fi apelată cu oricâte argumente de orice tip în orice moment.
-   Toate funcțiile sunt obiecte instanțe ale tipului `Function`.
-   O funcție este declarată de o expresie care începe prin cuvântul rezervat limbajului: `function`.
-   Când funcțiile sunt executate mediul lexical folosit este cel de la momentul definirii, nu cel de la momentul invocării (asta înseamnă de fapt mediul lexical).
-   La momentul declarării, funcțiile sunt doar trecute în inventarul scope-ului existent printr-un identificator cu care se face o referință. În spate, se creează obiectul funcție care va conține codul intern al său și alte proprietăți între care chiar o referință către scope-ul existent la momentul declarării - **lexical scope**. La invocarea funcției se creează un nou obiect scope care moștenește proprietăți din cel la care s-a făcut referință la momentul declarării.
-   `this` și `arguments` sunt disponibile automat la invocarea unei funcții.
-   Când invoci funcția ca metodă a unui obiect, acel obiect devine **contextul** funcției, fiind disponibil funcției prin intermediul legăturii `this`.
-   `this` face legătura la un obiect-context: pentru funcții simple este `window`, pentru metode este obiectul în care se execută, iar pentru noile obiecte create este chiar noul obiect generat.
-   Funcțiile care nu sunt invocate ca metode, vor lega `this` la global object.
-   Funcțiile returnează automat o valoare `undefined`.
-   Funcțiile sunt ele însele valori. Pentru că sunt valori, Pot fi pasate ca argumente altor funcții. Funcțiile pot returna alte funcții.
-   Poți vedea câți parametri au fost declarați (`nume_functie.length`) și câte argumente i-au fost pasate (apelând din interiorul ei: `arguments.length`).
-   Funcțiile sunt obiecte („first-class objects”). Asta înseamnă că au conectări `[[Prototype]]`, fiind parte a lanțului prototipal.
-   Toate funcțiile au la dispoziția lor un set de utilitare accesibile prin legătura prototipală. Cele mai evidente sunt `call()`, `apply()` și `bind()`.
-   Funcțiile sincrone procedează la execuție fără a lăsa programul să execute altceva (comportament ce induce blocaje).
-   Funcțiile asincrone returnează imediat, iar rezultatul este pasat unei funcții specializate (callback). În cazul buclei evenimentelor, pasarea rezultatului se face la un ciclu viitor, adică de îndată ce stiva de execuție este liberă.
-   O funcție are acces și poate performa operațiuni asupra obiectului în interiorul căruia a fost invocată.
-   În cazul tuturor funcțiilor, motorul JavaScript generează un obiect prototype (`numeFunctie.prototype`), care la rândul său se leagă automat la `Object.prototype`.
-   Funcțiile sunt legate de obiectul prototip prin metoda `.constructor`.
-   Fiecare funcție are un obiect prototip diferit.
-   O funcție apelată cu `new` în fața sa este un constructor. Numele funcției care va fi constructor, se scrie cu literă mare.
-   Funcțiile generează un mediu lexical propriu (scope).
-   Funcțiile care joacă rol de metode într-un obiect, de fapt nu aparțin obiectului, ci sunt doar invocate în contextul obiectului. Ceea ce „aparține” obiectului este, de fapt, referința către funcție. ATENȚIE! investighează mereu call-site-ul pentru a afla ce este în `this`.
-   Atunci când funcția este un callback, ține minte că tot o referință către funcție este (implicit assignment), nu este valoarea sa.
-   Dacă definești o funcție în interiorul altei funcții, atunci funcția internă trebuie să fie recreată de fiecare dată când funcția externă este executată (acest lucru se întâmplă pentru că funcțiile, de fapt, sunt obiecte). Acest comportament trebuie evitat. Definește funcția în afară și referențiaz-o sau execut-o în context local prin `call()` / `apply()` / `bind()`.
-   Orice funcție publică poate fi invocată cu `call()`, `apply()` sau `bind()`.

## Dependințe cognitive

Pentru a înțelege funcțiile ai nevoie să înțelegi următoarele:

-   identificatori
-   primitive
-   obiecte
-   obiecte interne
-   lexical environment (noțiuni elementare)

## Alonje

-   closures
-   programare funcțională

## Resurse

-   [Wikipedia Subroutine](https://en.wikipedia.org/wiki/Subroutine)
-   [CHRISTOPHER STRACHEY, Fundamental Concepts in Programming Languages, Accesat 18 septembrie](https://www.itu.dk/courses/BPRD/E2013/fundamental-1967.pdf)
-   [A Foreword to ‘Fundamental Concepts in Programming Languages’, Accesat 18 septembrie](http://repository.readscheme.org/ftp/papers/plsemantics/oxford/strachey_forward.PDF)
