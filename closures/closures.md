# Closures

Un closure se creează chiar în momentul definirii funcției și menține accesul la toate variabilele care erau „în scope” la momentul definirii funcției.
Funcția definită și care face closure poate fi asignată unei variabile, pasată ca argument unei funcții sau poate fi returnată.
Efect: Scope-ul existent (totalitatea identificatorilor) la momentul definirii funcției va fi accesbil câtă vreme există o referință către funcție. De fapt, closure-urile sunt un efect al modului în care lucrează motorul JavaScript pentru a realiza scope-urile (**lexical environment**).

## Moment zen: Definirea unei funcții are ca efect menținerea „în viață” a tuturor identificatorilor necesari pentru ca aceasta să fie executată.

Simplist poți spune că un closure se formează atunci când o funcție returnează o alta pe care a găzduit-o sau când există o referință externă la funcția internă. Acest lucru înseamnă că această funcție poate fi invocată la un moment viitor.

```js
function closureEx(){
  var a = 'ceva';
  function logger(valoare){
    console.log(a);
  };
  logger();   // execuția este imediată
};
closureEx();
```

```js
function closureEx(){
  var a = 'ceva';
  return function(valoare){
    console.log(a);
  };
};

var cheama = closureEx(); // execuția este la nevoie prin asignarea ei la o variabilă
cheama('a');              // ceva
cheama.toString();        // "function (valoare){ console.log(a);}"
```

La nevoie, se poate executa funcția returnată fără a mai fi asignată.

```js
closureEx()();
```

## Definiții

Closure este atunci când o FUNCȚIE ține minte scope-ul lexical chiar și atunci când este executată în afara acelui scope lexical (Kyle Simpson).

Un closure este un obiect special care combină două lucruri: o funcție și mediul în care aceasta a fost **declarată**.
Mediul, adică scope-ul lexical constă din toate variabilele locale care erau **in-scope** la momentul în care s-a creat closure-ul inclusiv parametrii.

## Dependințe cognitive

- funcții
- scope

## Mantre

- Folosirea cuvântului cheie `function` într-o funcție gazdă, creează un closure.
- JavaScript are un **scope lexical** generat la faza de compilare.
- Closure-uri generează doar funcțiile.
- Closure-ul nu este un obiect care să conțină toată informația necesară.
- Un closure permite accesarea variabilelor definite în funcția container și, atenție, le poate modifica.
- Toate variabilele din scope, chiar dacă sunt declarate după ce funcția container a fost declarată, sunt incluse în closure.
- Accesarea de informație prin intermediul unui closure, taxează memoria, pentru că la fiecare invocare a funcției care face closure, un nou set de informații va fi alocat în memorie.
- De fiecare dată când funcția externă este apelată, funcția internă este definită din nou. Codul funcției interne va fi identic, dar scope chain-ul asociat va fi diferit. Pe scurt, se resetează valorile la cele definite, daca acestea au fost modificate.
- De fiecare dată când funcția gazdă este apelată, se creează un nou set de variabile pentru acea invocare.
- Variabilele din scope-ul pus la dispoziție de un closure POT FI MODIFICATE.
- **Un closure nu poate accesa `this` al funcției container**. În acest scop se folosește salvarea lui this într-o variabilă `var self = this;`
- Un closure stochează valorile externe prin referință, nu prin valoare.
- Ori de câte ori folosești `eval()` într-o funcție, este folosit un closure. Textul de cod pe care-l folosești cu eval poate referenția variabile locale ale funcției gazde, dar și variabile declarare în textul de cod folosit cu eval.
- Folosirea constructorului de funcții în interiorul unei funcții gazde `new Function()`, nu conduce la crearea unui closure.
- Closure-urile pot merge mai adând de un nivel.
- Closure-ul introduce conceptul de variabile private.
- Pentru ca un closure să se formeze nu este neapărat nevoie să se facă un return. Accesarea variabilelor din afara scope-ului lexical propriu, creează un closure.

## Anatomie

Un closure, are acces la:
- variabile și obiectele care aparțin de scope-ul global,
- variabilele și obiectele care aparțin scope-ului funcției părinte, plus parametrii acesteia,
- toate variabilele declarate după ce funcția (care face closure-ul) a fost declarată.

### La ce avem acces:

```js
var extern = 1000;

function gazda(par){
  var interna = 100;
  return function(){
    var proprie = 10;
    console.log(
      'this este: ' + this + '; extern gazdei: ' + extern + '; interna gazdei: ' + interna + '; cea proprie: ' + proprie + '; dupa: ' + dupa + '; parametru: ' + par
    );
  };
};

var dupa = 10000;

var init = gazda('ceva');
typeof init; // => "function"
init(); // this este: [object Window]; extern gazdei: 1000; interna gazdei: 100; cea proprie: 10; dupa: 10000; parametru: ceva
var tip = init(); // typeof tip => "undefined"

init.__proto__.constructor // => function Function()
```

Un closure este mecanismul prin care putem obține o încapsulare dinamică a stării scope-ului, care, atenție, poate fi modificat atâta vreme cât closure-ul există.
Closure-urile se pot face prin returnarea unei funcții sau a unui obiect care conține metode sau se poate crea la momentul execuției funcției chiar în interiorul funcției gazdă.

### Closure fără a returna

```js
function faCeva(){
  var interna = 10;
  function plasa(val){
    console.log(interna + val);
  };
  plasa(10);
};
faCeva(); // 20
```

Pentru ca un closure să se formeze nu este neapărat nevoie să se facă un `return`. Accesarea variabilelor din afara scope-ului lexical propriu, creează un closure.

### Closure fără a returna cu o referință către funcția internă

Execuția funcției interne se va face din extern, nu prin execuția containerului.

```js
var externa = 'ceva extern';
var referintaCatreIntern;

function container(){
  var valContainer = 'ceva din container';

  function interna(){
    console.log('Am acces la ' + externa + ' și la ' + valContainer);
  };

  // încarci referința către funcția internă în variabila din afara containerului.
  referintaCatreIntern = interna;
};

container();            // se creează closure-ul
referintaCatreIntern(); // Am acces la ceva extern și la ceva din container

// din interiorul funcției interne poți executa funcția container; este echivalentul seriei de execuție de mai sus
referintaCatreIntern(container());
```

### Variabile „private” și accesarea acestora.

Cazul cel mai simplu este al unei funcții returnate care păstrează referințele către toți identificatorii din propriul scope, dar și scope-ul părinte. Aici se observă cât de intim conceptul de closure este legat de cel al scope-ului (lexical environment) creat la momentul compilării.

```js
function gazda(ceva){
  return function(altceva){
    console.log(this);
    return ceva + ' și ' + altceva;
  };
};

let faCeva = gazda("Lică");
faCeva ("Ionel salută colegii!"); // "Lică și Ionel salută colegii!"

let faAltceva = gazda("x");
faAltceva(0);                     // "x și 0"
```

Un caz ceva mai elaborat este cel al creării de obiecte noi folosind constructori.

```js
function Lansare(data){
  var altitudine = 0;
  const viteza = 11;
  this.getAltitudine = function(){
    console.log(data + ' la altitudinea de ' + altitudine);
  };
  this.setAltitudine = function(val){
    altitudine = val;
  };
};
var primaLansare = new Lansare("19.01.2016");
primaLansare.setAltitudine(30000);
primaLansare.getAltitudine(); // 19.01.2016 la altitudinea de 30000

var aDouaLansare = new Lansare("24.06.2016");
aDouaLansare.setAltitudine(45000);
aDouaLansare.getAltitudine(); // 24.06.2016 la altitudinea de 45000
```

Pas cu pas:

`new` execută Lansare().
Este instanțiat un nou obiect pe care-l vor folosi metodele drept context (`this`).
Când firul de execuție întră în Lansare() este creat automat o referință către lexical environment (scope-ul) găsit. În exemplul nostru sunt doi identificatori, variabila altitudine și constanta viteza.
De fiecare dată când este invocată o funcție cu rol de constructor, se creează un nou **lexical environment** (scope), care conține identificatorii pentru varibilele locale ale funcției contructorului.
În timpul execuției cu `new` a funcției constructor Lansare(), se creează și cele două funcții (getAltitudine și setAltitudine), care devin proprietățile noului obiect creat (primaLansare). Respectând tipicul, funcțiile acestea vor păstra o referință a scope-ului în care au fost create, adică **lexical environment**-ul lui Lansare.
Efectul final este că putem accesa funcțiile getAltitudine și setAltitudine, bineînțeles cu rolurile lor de metode ale noului obiect, dar care fac closure pe variabilele existente în Lansare(); altitudine și viteza. Cu alte cuvinte, țin în viață lexical environment (scope-ul) lui Lansare.

Pentru aDouaLansare întreg procesul se repetă cu repetarea la valorile default a variabilelor din Lansare. Metodele celor două obiecte generate vor fi diferite.

Merită observat faptul că în exemplul nostru metodele sunt rulate în **global execution context** iar scope-ul asociat, firesc este cel global.
La execuția metodelor, acestea vor crea câte un context de execuție propriu care va fi adăugat la call-stack și care va dispărea din stack la momentul finalizării execuției lor. Executarea metodelor mai are ca efect crearea scope-ului propriu (**lexical environment**) și crearea referinței către scope-ul în care au fost create (Lansare), care era activ la crearea funcției. Accesarea variabilei altitudine se face prin căutarea mai întâi în propriul scope creat, care nu conține un identificator pe nume altitudine și mai apoi căutarea în scope-ul care exista la momentul creării, adică scope-ul lui Lansare, unde îl găsește și rezolvă aducând valoarea.

Reține faptul că în cazul în care este nevoie poți atribui metoda unui obiect creat cu new unei proprietăți a altui obiect creat ad-hoc și care va putea accesa valorile din scope-ul funcției contructor. Acest caz conduce la concluzia că aceste variabile nu sunt atât de ascunse pe cât s-ar crede la prima vedere. Dar acest mecanism totuși este cel mai aproape de „încapsularea” din alte limbaje de programare.

### Crearea accesarea și modificarea membrilor unui obiect

Pentru a înțelege exemplul de mai jos, nu uita faptul că funcțiile în JavaScript sunt obiecte și că, orice funcție în JS, poate face referință la variabile definite în scope-ul extern.

```js
function unObiect(){
  var oValoare;
  return {
    set: function(modVal){ oValoare = modVal; },
    get: function(){ return oValoare; },
    tip: function(){ return typeof oValoare; }
  };
};
let x = unObiect(); // typeof x => "object"
x.get();    // undefined
x.set(10);  // undefined
x.get();    // 10
x.tip();    // "number"
```

La invocarea lui `unObiect`, s-a returnat obiectul care are trei closure-uri (set, get și tip). Toate aceste trei closure-uri au acces la variabila `oValoare`.

Asemănător, se pot declara variabile care să fie referințe către funcții declarate în interiorul unei funcții gazde.

```js
var set, get, tip;
function gazda(){
  var interna = 1000;
  set = function(val){ interna = val; };
  get = function(){ return interna };
  tip = function(){ return typeof interna; };
};
gazda();
get();        // 1000
tip();        // "number"
set("ceva");  // undefined
get();        // "ceva"
tip();        // "string"

gazda();
get();        // 1000
```

Se observă că după invocarea a doua oară a funcției gazdă, orice modificare internă suferită anterior dispare, scope-ul și funcțiile fiind recreate.

### Crearea și accesarea membrilor unui obiect creat cu un constructor

John Resig aduce acest caz de closure format la crearea unui obiect pe baza unei funcții constructor.

Funcțiile cu rol de constuctori pot defini întern metodele, iar acestea devin niște metode tip „accessor” sau „getter”, care te ajută să ajungi din scope-ul extern la valorile din constructor.

```js
function Sablon(){
  var cantitate = 10;

  this.getCantitate = function(){
    return cantitate;
  };

  this.incrementare = function(){
    cantitate++;
  };
};

var obiect1 = new Sablon();  // se generează un obiect care va fi contextul pentru funcțiile din constructor.

obiect1.getCantitate(); // 10
obiect1.incrementare(); // undefined
obiect1.getCantitate(); // 11

var obiect2 = new Sablon(); // se generează un alt obiect pentru care toate valorile din constructor sunt cele originale

obiect2.getCantitate(); // 10
```

Pentru a ajunge la cantitate este nevoie de metode de acces („accessors”). Acesta este și unul din cazurile de realizare a unui closure.
Trebuie reținut faptul că pentru funcțiile din contructor, `this` este obiectul generat prin invocarea cu `new`.

## Referințe către obiecte care nu fac closure.

Exemplu de referințe către obiecte care nu sunt un closure (prezentat de Kyle Simpson):

```js
var obiect = (function(){
  var o = {test: "test"};
  return {obj: o} // obj ține o referință către obiectul o
})();

console.log(obiect.obj.test); // => test
```

## Utilitate imediată

Closure-ul poate simula variabile private.
Este baza lui MODULE PATTERN prin care se realizează încapsularea și/sau ascunderea datelor.

Cu ajutorul closure-urilor se poate scrie cod care să ruleze într-un mediu izolat, adică într-un closure. Acest closure, acest model de incapsulare a funcționalităților, durează câtă vreme rulează aplicația și oferă o zonă privată, care poate memora o stare. Un exemplu este o funcție anonimă executată imediat.

```js
// exemplu de closure anonim
(function () {
	// toate variabilele și funcțiile se află doar în acest scope
	// se pot accesa toate variabilele globale
}());
```

Pornind de la acest model, se poat rula cod extern:

```js
(function($, Mootools){
  // acum ai acces la globalele jQuery ca prescurtarea $ și la Mootools
}(jQuery, Mootools));
```

## Erori

Este considerată a fi o eroare crearea de closure-uri în bucle.

## Alonjă

Mimarea variabilelor private.
Înțelegerea modului în care se face closure vă va ajuta în înțelegerea lui **Revealing Module Pattern**.
Înțelegerea șablonului **Module**.
Closure-urile formează baza funcțională a callback-urilor și a temporizărilor. Amble cazuri implică funcții care sunt apelate asincron la un moment nespecificat din viitor. De regulă, se folosesc astfel de funcții pentru accesarea datelor externe.
Va ajuta la înțelegerea felului în care Event Loop funcționează.
Pentru că un closure memorează contextul, poate prelua controlul de la Event Loop pentru a încheia execuția unui callback, de exemplu.
Funcțiile de nivel înalt și closure-urile formează coloana vertebrală a programării funcționale.
