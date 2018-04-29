# Definirea funcțiilor

Funcțiile pot fi definite („create”) în următoarele moduri:

-   prin intermediul unei expresii de funcție - *function expression*: `let adunare = function demo (param1, param2) { return param1 + param2 };`, fiind cazul unui `named function expression`,
-   prin *declararea funcției**: `function demo (param1, param2) { return param1 + param2 };`,
-   prin folosirea constructorului obiectului intern `Function`: `new Function()`,
-   prin folosirea lui *fat arrow* pentru a defini o funcție: `argument => argument++` (introdusă de EcmaScript 2015 (ES6)),
-   prin folosirea funcțiilor *generator*: `function* generator () { yield true };` (introdus de EcmaScript 2015 (ES6)).

În cazul unei expresii de funcție cu nume - `named function expression` precum în `let adunare = function demo (param1, param2) { return param1 + param2 };`, *adunare* este numele identificatorului din mediu iar *demo* este o proprietate a funcției. Poți proba prin `adunare.name` ceea ce va returna demo.

Atenție, numele unei funcții nu-l vei găsi în registrul inventar al mediului în care funcția a fost declarată. Dar, numele funcției va putea fi găsit în registrul inventar al mediului format la execuția funcției. Acest lucru permite recursivitatea.

```javascript
(function adunare () {
  console.log(adunare); // function adunare()
})();
```

## Funcție declarată și funcție exprimată

Conceptele tratate sunt *function declaration statement și function definition expression.

### A. Instrucțiunea pentru declararea funcției

Începe linia cu instrucțiunea `function`? Atunci vorbim despre *function declaration statement*. Este ca și cum i-ai comanda motorului JavaScript: fă-mi o funcție! Declararea unei funcții este doar o variantă prescurtată pentru declarația `var`, care are drept valoare o funcție. Să vedem, de fapt prin ce trece declararea unei funcții:

```javascript
function ex () {};
// se creează identificatorul
var ex; // se face hoisting!
// apoi se inițializează cu undefined
var ex = undefined;
// apoi se face asignarea:
ex = function ex () {};
// consola returnează automat `undefined`
ex; // răspunde cu function ex()
```

**Moment ZEN**: Orice altceva ce nu începe cu `function` este o expresie.

Buna practică de coding în JavaScript spune că numirea funcției este obligatorie.

```javascript
function oFunctie () {            // funcție declarată
  function oFunctieGazduita () {};// o altă funcție declarată
};
```

Reține aspectul important că o funcție declarată este omniprezentă - beneficiază de hoisting. Acesta este și motivul pentru care nu vei introduce niciodată declarații de funcții în `if`-uri, de exemplu. Degeaba o vei face pentru că indiferent de intenția a a declara o funcție care să fie valabilă doar pentru if, aceasta, de fapt va fi valabilă întregului cod. Un exemplu să înțelegi că hoistingul lucrează chiar și dacă returnezi înaintea declarării funcției.

```javascript
(function () {
  return faCeva();
  function faCeva () {
    console.log('fac ceva!');
  };
})(); // fac ceva!
```
Pentru exemplificare am folosit o funcție care se execută imediat. Dacă am fi scris o expresie pentru definirea funcției, hoistingul nu s-ar mai fi realizat.

```javascript
(function () {
  return faCeva();
  var faCeva = function faCeva () {
    console.log('fac ceva!');
  };
})(); // TypeError: faCeva is not a function
```

Eroarea apare pentru că se face „legătura” dintre identificator și funcție după ce s-a făcut return-ul.

**Sfatul lui Crockford**: declară toate funcțiile înainte să începi să le apelezi.

```javascript
(function () {
  var faCeva = function faCeva () {
    console.log('fac ceva!');
  };
  return faCeva();
})(); // fac ceva!
```

Încă ceva: introducerea unei instrucțiuni de declarare între paranteze, o transformă în expresie.

```javascript
(function faCeva () {});
```

### B. Expresie pentru definirea unei funcții

Sunt funcțiile care sunt parte a unui enunț (`statement`). Funcțiile create ca parte a unui enunț se numesc *function expressions*. Tot function expressions sunt și funcțiile care sunt pasate ca argumente.

```javascript
var functie = function () {}; // function expression
functie(function () {});      // callback-urile sunt function expression.
functie(function () {
  return function ( ){};      // funcțiile returnate tot function expression sunt.
});
(function functie () {})();   // În cazul unui IIFE, tot un function expression avem.
```

Expresiile de funcții pot fi pasate ca argumente. Aceste funcții vor putea fi executate din interiorul funcției căreia au fost pasate.

```javascript
let oActivitate = function ceva () {
  console.log("O valoare din funcția pasată");
};
function fac (ceFac) {
  ceFac();
};
fac(oActivitate); // O valoare din funcția pasată
```

Un caz important de studiat este cel al colecțiilor de funcții care pot fi tratate ca o baterie de prelucrare a datelor.

```javascript
var colectie = [
  function (para) { return para + 2; },
  function (para) { return (para - 1) * 10; },
  function (para) { return para * 2; }
];

var start = 2;

var prelucrare = function (valoare, colectieDeFunctii) {
  var lungime = colectieDeFunctii.length;
  for(var i = 0; i < lungime; i++){
  	valoare = colectieDeFunctii.shift()(valoare);
  }
  return valoare;
};
alert(prelucrare(start, colectie)); // alert => 60
```

Funcțiile pot fi stocate într-un array care să determine ordinea de prelucrare a unor date. Parcurgerea colecției de funcții are drept scop apelarea rând pe rând a fiecărei funcții și pasarea ca parametru a ceea ce a returnat funcția anterioară.

#### Funcție exprimată anonimă, (**anonymous function expression**).

```javascript
var anonima = function () {};
```

### C. funcție exprimată cu identificator (**named function expression**).

```javascript
var test = function ceva () { return 'salut'; };
test(); // salut
ceva(); // ReferenceError: ceva is not defined
```

În cazul acestor funcții trebuie remarcat faptul că identificatorul variabilei este cel care trebuie folosit pentru a invoca funcția. În acest caz este declarată o variabilă test în scope.

-   Permite recursivitatea pentru că putem face referință la funcție chiar din interiorul ei.
-   Global scope nu este poluat
-   Autodocumentează codul în cel mai simplu mod posibil.

### D. Expresie de funcție anonimă (anonymous function expression)

```javascript
var anonima = function () {};
```

Atenție, astfel de funcții nu permit recursivitatea pentru că le va lipsi proprietatea `name`. Nu vor putea să se autoapeleze pentru că nu vor ști ce nume să cheme.

## Funcțiile sunt de nivel înalt

Orice funcție este, de fapt o valoare care poate fi pasată drept argument sau care poate fi returnată. Unele funcții consumă și returnează funcții așa cum o fac cu datele. Mai spunem despre aceste funcții că sunt funcții lambda. Un exemplu de funcții lambda este cel care oferă acces la variabila rezultat.

```javascript
var suma = function suma () {
  var rezultat = 0;
  [2, 2, 2].forEach(function adaugaCifra (numar) {
    rezultat += numar;
  });
  return rezultat; // 6
};
```

Sunt folosite pentru:

-   a face operațiuni asupra argumentelor,
-   atașarea de event handlers pentru interacțiunea cu DOM-ul,
-   pasarea unei funcții callback la încheierea execuției funcției curente,
-   pentru a adăuga funcționalitate unei alte funcții. O funcție care adaugă funcționalitate unei alte funcții, se numește `function decorator`,
-   preluarea unei funcții care are mulți parametri și returnarea uneia care cere mai puțini,
-   returnarea unei funcții dintr-o altă funcție (curring). De exemplu, returnarea unei funcții care ia altă funcție căreia îi aplică un calcul pe argumentele existente.

## Crearea funcțiilor prin constructor

```javascript
var oFunctie = new Function('arg1', 'arg2', 'return arg1 + arg2;');
oFunctie(2, 4); // 6
```

## Mantre

-   Funcțiile sunt obiecte, mai exact **function objects**.
-   Toate funcțiile sunt instanțe ale obiectului intern standard `Function`.
-   Funcțiile pot fi create dinamic folosind constructorul `Function`.
-   Funcțiile nu sunt „deținute” sau „conținute” de un obiect atunci când sunt metode chiar dacă sunt declarate în obiect sau în afara lui.
-   O declarație de funcție începe cu `function` ca și cuvânt cheie. Orice altceva este o expresie de funcție.
-   Definirea orcărei funcții, fie prin declarare, fie prin expresie are ca efect crearea automată a unei proprietăți `prototype`, care va permite funcției să devină constructor.
-   Invocarea unei funcții generează un nou **context de execuție** (TOT ce există și este necesar atunci când funcția se execută).
-   Începând cu ES6, este posibilă declararea funcțiilor în blocuri (de exemplu, în `if`-uri).
-   Toate variabilele și funcțiile definite în funcție sunt considerate parte a contextului de execuție.
-   fiecare argument al unei funcții este de fapt o variabilă locală.
-   Variabilele și funcțiile care fac parte din contextul de execuție, sunt memorate în **execution context object**, care este un obiect al motorului JavaScript.
-   Când este definită o funcție, aceasta stochează scope chain-ul care era în efect în acel moment.
-   Când o funcție este invocată creează un obiect în care stochează propriile variabile și adaugă acel obiect la scope chain.
-   Funcțiile anonime nu permit ***recursivitatea***
-   Funcțiile care au nume permit referențierea după nume din interiorul ei.
-   funcțiile declarate (`function ceva(){}`) se bucură de mecanismul de hoisting.
-   funcțiile exprimate (`var ceva = function(){}`) nu se supun hoistingului ceea ce le permite să rețină o copie a variabilelor dn scope-ul în care au fost definite.
-   funcțiile exprimate pot fi folosite ca: argumente pentru alte funcții, clojures, IIFEs
