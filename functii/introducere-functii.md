# Funcții în ECMAScript

O perspectivă simpatică ar fi dacă-ți închipui o funcție ca pe un caracter dintr-un joc de strategie pe care dai click și-l pui să facă ceva. Când ai nevoie să „producă” mâncare îl pui să facă o fermă. Îl trimiți după lemne ca să aibă cu ce și așa mai departe. Dacă ajunge la un punct de pe hartă unde concurează cu alte caractere pentru o resursă, pur și simplu așteaptă cuminte să-i vină rândul la „tufa cu fructe” sau la „minerit aur”. Îmediat ce termină treaba, caracterul nostru nu are inițiativă, așteaptă să fie chemat cu un click să facă ceva.
Așa sunt și funcțiile ca și comportament.

O funcție este declarată folosind cuvântul cheie `function` urmat de un șir de caractere, care este numele funcției urmate de paranteze rotunde. Între paranteze sunt declarate valori care constituie argumentele funcției (acestea formează așa-numitul antet), urmate apoi de acolade. Acoladele delimitează **blocul de cod** ce va fi executat la invocarea funcției.

```javascript
function faCeva(arg1, arg2){
  var oValoare = arg1 + arg2;
  return oValoare;
}; faCeva(1, 3); //4
```

Funcțiile sunt unitățile de execuție a codului JavaScript. O funcție poate fi percepută ca un subprogram, ca o subrutină. Veți mai întâlni în alte lucrări și denumirea de „proceduri”. Cel mai sănătos mod de a privi activitatea și efectele unei funcții este gândind întotdeauna că o funcție este un set de instrucțiuni care se aplică unui set de date primit ca argumente. De ce să faci asta? Pentru că în interiorul funcției vei prelucra datele primite și la final vei dori să oferi rezultatele la care ai ajuns.

Aplicarea unei funcții argumentelor sale produce un nou mediu lexical, un nou scope în care se fac legături între identificatori și valori.

Ca și obișnuință, ar fi cel mai util să gândești că funcția se aplică pe argumente. Mult timp am gândit altfel: funcția „primește” pentru că, într-adevăr, introduci niște argumente. Nu este greșit, dar pentru o iluminare rapidă în domeniul funcțiilor, cel mai bine este să gândești în termenii aplicării sale pe argumente.

**Moment Zen**: O funcție, de fapt, „se aplică” argumentelor pasate care sunt valori, le va prelucra și le va oferi apelantului prin returnare.

**O funcție este un obiect apelabil**. O funcție care este asociată unui obiect prin intermediul unei proprietăți, este numită *metodă*.

**Moment ZEN**: Funcțiile sunt valori.

**Mecanisme magice**: Declararea unei funcții are ca efect declanșarea **hoising**-ului. Declarația este introdusă în registrul inventar al mediului lexical existent. Magia rezidă din faptul că poți invoca o funcție înainte ca aceasta să fie declarată. Superciudățel, nu?!

Din punctul de vedere al efectelor unei funcții la momentul evaluării sale, avem funcții care produc efecte prin evaluarea expresiilor din interior și funcții care produc efecte și valori prin returnarea valorilor.

**Mecanisme magice**: Am aflat mai devreme că la executarea unei funcții, aceasta creează și un scope propriu, dar mai e o chestie supertare: dacă într-un bloc de cod introduci o declarație, se va crea un nou scope pentru respectivul cod. Ciudățel și superinteresant, nu?

```javascript
var x = 100, y = 'ceva';
{ var x = 10; console.log(this.x, this.y) }; // 10 ceva
```

Motivul pentru care există funcțiile este acela al reutilizări în diferite scenarii. De ce? Pentru că ar fi o nebunie să scrii aceeași secvență de cod de 1000 de ori, dacă în diferite părți ale codului este nevoie de un „tratament” identic al unor seturi de valori diferite.

Înainte de a merge mai departe, trebuie să facem o diferență clară între apelare și referențiere. O funcție este apelată prin scrierea identificatorului urmat de `()` iar referențierea este doar introducerea identificatorului ceea ce va returna funcția ca valoare, adică chiar conținutul său. Acest lucru se întâmplă pentru că o funcție este o valoare, de fapt.

Și acum, vom face un exercițiu Zen și vom privi la exemplul perfect de funcție, care se poate executa, dar a cărei esență este golul, nedefinitul.

```javascript
() => {}; // returnează constructorul
// executând privim Ensō
(() => {})(); // undefined
```

Un moment de un calm asemănător este utilizarea operatorului `void`, care golește de valoare orice expresie care a fost evaluată pe care o precedă.

```javascript
void 1; // undefined
void (function ki(){return 'energie';})(); // undefined
```

Nimic din conținutul unei funcții nu produce niciun rezultat până când funcția nu este apelată și evaluată.

La momentul apelării (a invocării), funcția evaluează codul său intern și returnează un rezultat pe baza operațiunilor specificate în **codul funcției**. De fapt, ar trebui să pornim de la 0 și să spunem că mai întâi de toate o funcție este o expresie pe care motorul JavaScript are nevoie să o evalueze, dar această expresie are în componența ei alte expresii care la rândul lor au nevoie să fie evaluate pentru ca funcția să poată fi evaluată. Deci, se vor evalua expresiile până când se va ajunge la valorile de care funcția are nevoie să se execute.

Această concluzie vă va ajuta să înțelegeți mai repede ce sunt și cum funcționează un „closure”.

Rețineți și faptul că o funcție evaluată este diferită de fiecare dată. Evaluarea unei funcții nu este echivalente evaluării aceleiași funcții.

```javascript
var faCeva = function () {return 10;};
faCeva() === faCeva; // false
```

O funcție foarte simplă este una introdusă ca sintaxă de ultima versiune a standardului ES6 și numită „fat arrow”. Aceasta returnează imediat rezultatul. Acesta nu are nevoie să fie folosit cuvântul rezervat `function`. De regulă, veți vedea aceste funcții lucrând din poziția de ***callback-uri*** (funcții trimise ca argument care sunt apelate după ce întreaga funcție a fost evaluată)

```javascript
(() => 'ceva')(); // ceva
```

După cum se observă, sintaxa aplicată este ceva mai specială. Fat arows au nevoie de un eveniment care să declanșeze execuția. Pentru a face exemplul să funcționeze, am împachetat funcția într-o structură `()()`, ceea ce are drept efect executarea funcției dintre parantezele de grupare. În comunitatea coderilor JavaScript aceste structuri care sunt executate imediat se numesc **Immediately Invoked Function Expressions** - expresii de funcții invocate imediat.

Pentru că am deschis o fereastră în interiorul funcțiilor, trebuie menționat faptul că returnarea directă a unei expresii are drept efect returnarea valorii, dar dacă expresia este introdusă într-un bloc funcțional, va fi returnat `undefined`.

```javascript
(() => 1 + 1 )(); // 2
(() => {1 + 1})(); // undefined
```

Acesta este motivul pentru care pentru a obține o valoare în urma evaluării unei funcții care are expresiile într-un bloc de cod delimitat de acolade, se va folosi cuvântul rezervat `return`.

```javascript
(function () { return 1 + 1; })(); // 2
```

Comanda `return` inițiază o instrucțiune de returnare care termină aplicarea funcției evaluând rezultatul expresiei de după cuvântul cheie.

**Moment Zen**: Funcțiile returnează rezultatul evaluării expresiilor.

```javascript
(function ex () { return 10 + 1; })(); // 11
(() => { return 10 + 1; })(); // 11
(() => return 11 )(); // SyntaxError: expected expression, got keyword 'return'
```

Concluzia pentru care avem o eroare de sintaxă este că toate expresiile trebuie să stea într-un bloc dedicat `{}`.

În inventarul expresiilor care pot fi returnate putem adăuga array-uri, care pot fi multidimensionale și care la rândul lor ca elemente pot conține alte expresii ș.a.m.d. Ceea ce doresc să accentuez este faptul că poți returna structuri întregi.

```javascript
((x, y, z) => [++x, ++y, ++z])(1, 2, 3); // [ 2, 3, 4 ]
(() => [() => 'ceva', () => 'altceva'])(); // [ function (), function () ]
```

**Moment Zen**: Dacă funcțiile pot returna evaluarea expresiilor, atunci pot returna la rândul lor alte funcții pentru că și o funcție tot o expresie este.

```javascript
() => () => true; // function ()
var x = (y) => () => y; x(1)(); // 1; același lucru cu bloc
var a = (b) => () => { return b; }; a(2)(); // 2
```

**Moment Zen**: Funcțiile sunt obiecte!

Standardul le numește chiar `function objects`. O funcție produce o instanță a unui function object. În JavaScript, funcțiile au metode.
Funcțiile sunt obiecte first-class. Pot fi pasate ca argumente altor funcții și pot fi returnate din funcții.
Funcțiile în JavaScript sunt de ***ordin înalt***, adică pot fi pasate ca valori și pot primi ca argumente alte funcții, dar acest lucru tot de faptul că sunt first class ține.

**Moment Zen**: Funcțiile sunt valori în sine care pot fi referențiate printr-un identificator (variabilă).

Funcțiile moștenesc din `Function.prototype`.

**Moment Zen**: Funcțiile sunt efemere, fiind mecanismul prin care sunt preluate date, sunt prelucrate și apoi sunt returnate apelantului. După ce treaba s-a terminat „dispar” ca parte activă.

Spre deosebire de restul obiectelor, funcțiile pot fi invocate.

`function` este un subtip de obiecte numit tehnic „callable object” iar acest lucru înseamnă că pentru acea funcție, motorul care implementează standardul ECMAScript are o metodă internă `[[Call]]`, care permite apelarea funcției dar și recursivitatea.

O funcție poate fi invocată chiar din interiorul său. O funcție care se apelează din interiorul său se numește funcție recursivă. Sunt trei modalități de a apela o funcție din interiorul ei:
- după numele său,
- folosind `arguments.callee`, o proprietate a obiectului `arguments` care conține funcția `arguments.callee()`,
- folosind un identificator din scope care trimite la funcție.

Funcțiile care pot deveni constructori prin apelarea cu `new`, au, de fapt, o metodă internă `[[Construct]]` care permite ca acestea să „construiască” obiecte. Nu toate funcțiile au această metodă internă. `Arrow functions` nu au `[[Construct]]`

Funcțiile pot fi stricte, atunci când se folosește `use strict` sau non-strict.

## Spune standardul

Funcțiile obiecte încapsulează cod parametrizat care ține minte mediul lexical („closed over”) și care permite evaluarea dinamică a codului.

O funcție obiect este un obiect comun care are aceleași sloturi interne și aceleași metode interne ca orice alte obiecte comune.

Codul dintr-o funcție obiect poate fi în „strict mode” sau nu. O funcție care rulează codul în strict mode se numește „strict function”. Cele care nu rulează în „strict function” se cheamă că sunt „non‐strict function”.

Funcțiile obiecte au sloturi interne și merită menționat `Realm`, care este o înregistrare a tărâmului în care a fost creată funcția și care oferă un obiectele interne care au fost accesate la momentul evaluării funcției.

## Mantre

- Funcțiile sunt obiecte care incapsulează cod parametrizat care este beneficiarul întregului scope în care a fost declarată funcția („closed over a lexical environment”).
- Funcțiile au în ***corpul*** lor (`{...}`) zero sau mai multe instrucțiuni.
- Funcțiile a căror corp este un ***bloc*** vor avea drept rezultat al evaluării ceea ce rezultă în urma instrucțiunii `return` sau `undefined`.
- Funcțiile a căror corp este o ***expresie***, avea drept evaluare, chiar evaluarea acelei expresii. Vorbim aici despre „fat arrows”.
- Constructorul lui Function este chiar o funcție. În schimb, Function este constructor pentru Object. Cele două sunt contructorii pentru restul obiectelor interne.
- Începând cu ES6, este posibilă declararea funcțiilor în blocuri (de exemplu, în `if`-uri).ncției pe zero sau mai multe argumente.
- Funcțiile sunt invocate într-un loc care determină rezultatul, adică într-un anumit *context*.
- Orice funcție poate fi apelată cu oricâte argumente de orice tip în orice moment.
- Toate funcțiile sunt de fapt obiecte instanțe ale tipului `Function` (obiecte interne).
- O funcție este declarată de o expresie care începe cu cuvânt rezervat limbajului: `function`.
- Când funcțiile sunt executate SCOPE-ul folosit este cel de la MOMENTUL DEFINIRII, nu cel de la momentul invocării (asta înseamnă LEXICAL SCOPE, de fapt).
- La momentul declarării, funcțiile sunt doar trecute în inventarul scope-ului existent printr-un identificator cu care se face o referință. În spate, se creează obiectul funcție care va conține codul intern al său și alte proprietăți între care chiar o referință către scope-ul existent la momentul declarării - **lexical scope**. La invocarea funcției se creează un nou obiect scope care moștenește proprietăți din cel la care s-a făcut referință la momentul declarării.
- `this` și `arguments` sunt pasate implicit la invocarea unei funcții.
- Când invoci funcția ca metodă a unui obiect, acel obiect devine **contextul** funcției și acesta devine disponibil în funcție prin intermediul parametrului `this`.
- `this` este un obiect-context: pentru funcții simple este `window`, pentru metode este obiectul în care se execută iar pentru noile obiecte create este chiar noul obiect generat.
- Funcțiile care nu sunt invocate ca metode, vor avea `this` setat la global object.
- Funcțiile sunt „IDENTIFICATORI" așa cum sunt și variabilele.
- Funcțiile returnează o valoare prestabilită: `undefined`.
- Funcțiile sunt ele însele valori.
  - Funcțiile pot fi pasate ca argumente altor funcții (function expression).
  - Funcțiile pot returna alte funcții (function expression).
- Pentru o funcție poți vedea câți parametri au fost declarați (`nume_functie.length`) și câte argumente i-au fost pasate (apelând din interiorul ei: `arguments.length`).
- Funcțiile sunt obiecte („first-class objects”). Asta înseamnă că au conectări [[Prototype]] - lanț prototipal.
- Toate funcțiile au la dispoziția lor un set de utilități preexistent, care poate fi apelat prin `[[Prototype]]`. Cele mai evidente sunt `call()` și `apply()`.
- Funcțiile sincrone procedează la execuție fără a lăsa programul să execute altceva (comportament ce induce blocaje).
- Funcțiile asincrone returnează imediat iar rezultatul este pasat unui handler, adică un callback. În cazul event-loop-ului, pasarea rezultatului se face la un ciclu viitor (adică când stiva de execuție este liberă).
- O funcție are acces și poate performa operațiuni asupra obiectului în interiorul căruia a fost invocată.
- În cazul tuturor funcțiilor, motorul JavaScript generează un obiect prototype (`numeFunctie.prototype`), care se leagă automat la `Object.prototype`.
- Funcțiile sunt legate de obiectul prototip prin metoda `.constructor`.
- Funcțiile nu sunt cele care generează obiectul prototype.
- Fiecare funcție are un prototype object diferit.
- O funcție apelată cu `new` în fața sa este un constructor. De regulă, numele funcției care va fi constructor, se scrie cu literă mare.
- Funcțiile generează SCOPE-ul.
- Funcțiile care joacă rol de metode într-un obiect, de fapt nu aparțin obiectului, ci sunt doar invocate în contextul obiectului. Ceea ce „aparține” obiectului este, de fapt, referința către funcție. ATENȚIE! investighează mereu call-site-ul pentru a afla ce este în `this`.
- Atunci când funcția este un callback, ține minte că tot o referință către funcție este (implicit assignment), nu este valoarea sa.
- Dacă definești o funcție în interiorul altei funcții, atunci funcția internă trebuie să fie recreată de fiecare dată când funcția externă este executată (acest lucru se întâmplă pentru că funcțiile, de fapt, sunt obiecte). Acest comportament trebuie evitat. Definește funcția în afară și referențiaz-o sau execut-o în context local prin call / apply / bind.
- Orice funcție publică poate fi invocată cu `call()` sau `apply()` (vezi regulile de binding pentru `this`).

## Parametri și argumente - parameters and arguments

Parametrii sunt variabile care fac parte din definirea funcției.
Argumentele sunt valori pe care le trimitem funcției atunci când o invocăm.

Ne amintim faptul că, de fapt, o funcție este aplicată argumentelor sale și că, la momentul apelării acesteia, se creează și un mediu lexical nou. În acest nou mediu lexical (inventarul identificatorilor), argumentele sunt variabile care identifică, de fapt, expresii ce vor fi „legate” de o valoare.

```javascript
((x) => x)(2 + 3); // 5
```

Valoarea este obținută prin evaluare mai înainte ca funcția să se execute. Abia după această etapă, o funcție se aplică argumentelor sale.
Acum începe executarea funcției pe argumentul al cărui valoare este 5. Următorul pas este generarea unui mediu lexical nou pentru funcție în care valoarea 5 este „legată” de variabila x. La final, valoarea variabilei x din scope-ul intern funcției, este returnată.

```javascript
// #1 Fără asignare
((diametru) => diametru * 3.1415)(2); // 6.283
// #2 Cu asignare
var circumferinta = (diametru) => diametru * 3.1415; circumferinta(2); /* 6.283, adică Tau (curios? vezi The Tau Manifesto) */
// #3 Sintaxă convențională
(function (diametru) { return diametru * 3.1415; })(2);
```

Începând cu EcmaScript 2015 (ES6), unui parametru îi poți atribui direct o valoare la momentul definirii:

```javascript
function facCeva(a, b = "o valoare"){
  return b;
};
facCeva(); // "o valoare"
```

Parametrii pot fi mai mulți față de ceea ce o funcție poate primi. Fiecare valoare primită va fi introdusă și asignată parametrilor precizați în ordine.

La invocarea unei funcții sunt primite tacit `this`, care formează contextul de execuție și `arguments`, care este un obiect. `arguments` seamănă cu array-urile prin faptul că pot fi accesate valorile în mod similar, dar nu este un array.

```javascript
(function adunare(){
  var cumulator = 0, i;
  for(i = 0; i < arguments.length; i++){
    cumulator += arguments[i];
  };
  return cumulator;
})(2, 3);
// 5
```

ES6 introduce un nou parametru: `rest` care permite reprezentarea unui număr nedefinit de argumente ca un array.

```javascript
function operatiune(...argumente){
  console.log(argumente.length);
};
operatiune(23,145,83); // 3
```

```javascript
function operatiune(a, b, ...valori){
  console.log(a, b, valori.length);
};
operatiune(2, 4, 20, 32, 110); // 2 4 3
```

Diferențe dintre `arguments` și `rest`

- parametrii rest sunt un array al celor cărora nu li s-a dat un nume.
- array-ul rest poate fi folosit cu metode precum `forEach`, `sort`, `map` ori `sort`.
- `arguments` este un obiect care are proprietatea `callee`

```javascript
// emularea lui rest - exemplu oferit de Mozilla Developer Network
function f(a, b){
  var args = Array.prototype.slice.call(arguments, f.length);
  // ...codul funcției mai departe
}
// este echivalent cu
function f(a, b, ...args){
  // cod funcție.
};
```

Valorile primelor două argumente pasate vor fi potrivite cu cei doi parametri menționați: a și b

## Anatomie

Pentru că este absolut necesară înțelegerea mecanismelor interne pe care le pune la dispoziție o funcție pentru a prelucra date și pentru a le returna, vom examina o funcție pentru a avea o privire generală.

Atunci când este invocată o funcție, se creează un nou mediu lexical propriu acelei funcții.

Următorul exemplu expune o funcție care conține la rândul său o altă funcție. Acest scenariu este unul care introduce și conceptul de closure (o funcție internă care „fotografiază” mediul lexical în care a fost declarată și pe care îl folosește pentru a utiliza tot ce este necesar să se execute).

```javascript
function ex(unu, doi){
  console.log(this);  // Window
  this.trei = 3;      // se creează prop trei: window.trei care este 3
  console.log(ex.arguments); // Arguments {0:1,1:2,calee:ex(),length:2,__proto__:Object}
  function intern(patru, cinci){
    console.log(this.trei);    // 3
    console.log(ex.arguments); // Arguments {0:1,1:2,calee:ex(),length:2,__proto__:Object}
    console.log(unu); // 1
  };
  intern();
}; ex(1,2);
console.log(window.trei);
```

Codul sursă a acestei funcții este considerat a fi `Global code`.
Această funcție a fost declarată în primul mediu lexical (adică nu are părinte) pe care-l generează motorul JavaScript - `global environment` sau `global scope`. În cazul browserelor acesta este obiectul global `window` cu toate proprietățile sale printre care și obiectele interne specifice JavaScript.
Pentru a testa care este mediul lexical, se face un `console.log` pe `this`, care relevă cine este contextul în care funcția este evaluată. Contextul în cazul nostru este acest obiect window creat de browser.
Pentru că `this` este un identificator pentru contextul în care se face evaluarea, care la rândul său este un obiect, se pot introduce din interiorul funcției, la momentul evaluării, proprietăți noi cu valorile dorite: `this.trei = 3`. Chiar și după ce funcția a fost evaluată deja și nu mai este în execuție, proprietatea setată obiectului context, va exista în continuare. Poți verifica printr-o interogare simplă: `console.log(window.trei);`.
Pentru ambele funcții `this` este obiectul global.
Pe lângă `this`, funcția mai are acces la un obiect la momentul evaluării: `arguments`, care este un obiect ce seamnă cu un array, cuprinzând toate argumentele pasate funcției. Acesta poate fi accesat chiar și dintr-o funcție internă după sintaxa `numeFunctieGazda.arguments` dacă acest lucru este necesar sau direct fiecare parametru separat: `console.log(unu); `.
Funcția `intern()` are posibilitatea de a accesa proprietățile funcției gazdă pentru că la momentul evaluării face **o poză** cu toți identificatorii pe care-i are gazda în `Environment Record`. Această **poză** se numește **closure**.

## Fat arrow

Este un nou mod de notație introdus odată cu EcmaScript 2015. Acest nou tip de notație urmărește concizia. ATENȚIE! aceste funcții sunt legate de scope-ul lexical, asta însemând că `this` va fi același ca și cel din blocul părintelui.

```javascript
// un singur argument pasat (util în callbackuri)
x => x + 1; // se face automat return

// niciun argument pasat
const numere = [234, 54, 101, 5, 34, 5045];
const pare = numere.filter( x => {
  if ( x%2 === 0 ) {
    console.log( x + ' e par, prietene!' );
    return true;
  }
});
/*
234 e par, prietene!
54 e par, prietene!
34 e par, prietene!
*/
```

## Dependințe cognitive

Pentru a înțelege funcțiile ai nevoie să înțelegi următoarele:

- identificatori
- primitive
- obiecte
- obiecte interne
- lexical environment (noțiuni elementare)

## Alonje

- closures
- programare funcțională

## Resurse

[Wikipedia Subroutine](https://en.wikipedia.org/wiki/Subroutine)
