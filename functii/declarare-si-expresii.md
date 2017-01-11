# Definirea funcțiilor

Funcțiile pot fi definite („create”) în următoarele moduri:

- prin intermediul unui **function expression**: `var adunare = function demo(param1, param2){ return param1 + param2; };`. Este cazul unei `named function expression`,
- prin **declararea funcției**: `function demo(param1, param2){ return param1 + param2; };`,
- prin folosirea constructorului `new Function()`,
- prin folosirea lui „fat arrow” pentru a defini o funcție: `argument => argument++`. **Fat arrow** este introdus de EcmaScript 2015 (ES6),
- prin folosirea funcțiilor „generator”: `function* generator(){ yield true; };`, fiind introdus de EcmaScript 2015 (ES6).

## Mantre
- Funcțiile sunt obiecte.
- Toate funcțiile sunt instanțe ale obiectului intern standard `Function`.
- Funcțiile pot fi create dinamic folosind constructorul `Function`.
- funcțiile nu sunt „deținute” sau „conținute” de un obiect atunci când sunt metode chiar dacă sunt declarate în obiect sau în afara lui.
- O declarație de funcție începe cu `function` ca și cuvânt cheie. Orice altceva este o expresie de funcție.
- Invocarea unei funcții generează un nou **context de execuție** (TOT ce există și este necesar atunci când funcția se execută).
- Toate variabilele și funcțiile definite în funcție sunt considerate parte a contextului de execuție.
- fiecare argument al unei funcții este de fapt o variabilă locală.
- Variabilele și funcțiile care fac parte din contextul de execuție, sunt memorate în **execution context object**, care este un obiect al motorului JavaScript.
- Când este definită o funcție, aceasta stochează scope chain-ul care era în efect în acel moment.
- Când o funcție este invocată creează un obiect în care stochează propriile variabile și adaugă acel obiect la scope chain.
- Funcțiile anonime nu permit ***recursivitatea***
- Funcțiile care au nume permit referențierea după nume din interiorul ei.
- funcțiile declarate (`function ceva(){}`) se bucură de mecanismul de hoisting.
- funcțiile exprimate (`var ceva = function(){}`) nu se supun hoistingului ceea ce le permite să rețină o copie a variabilelor dn scope-ul în care au fost definite.
- funcțiile exprimate pot fi folosite ca: argumente pentru alte funcții, clojures, IIFEs

# Funcție declarată

**function declaration statement** și **function definition expression**

## Concepte tratate:

### A. declararea funcțiilor cu nume (named function declaration).

```js
function ceva(){};
```

Numirea funcției este obligatorie.

```js
function oFunctie(){              // funcție declarată
  function oFunctieGazduita(){};  // o altă funcție declarată
};
```

### B. funcție exprimată, (function expression).

Sunt funcțiile care sunt parte a unui alt `statement`.

Funcțiile create ca parte a unei expresii, adică a căror expresie literală se va afla în partea dreaptă a unei expresii, se numesc **function expressions**.
Tot function expressions sunt și funcțiile care sunt pasate ca argumente.
GRAMATICA CARE EXPLICĂ: Un **function expression** trebuie întotdeauna încheiat cu `;`. Punct și virgulă indică că motorul JavaScript trebuie să evalueze expresia din stânga egalului și să o atribuie indentificatorului din stânga.

```js
var functie = function(){};
functie(function(){});      // callback-urile sunt function expressions.
functie(function(){
  return function(){};      // funcțiile returnate tot function expressions sunt.
});
(function functie(){})();   // chiar și în cazul unui IFFE, tot despre un function expression vorbim.
```

Expresiile de funcții pot fi pasate ca valori altor funcții ca parametri. Aceste funcții vor putea fi executate din interiorul funcției cărora au fost pasate.

```js
let oActivitate = function ceva(){console.log("O valoare din funcția pasată");};
function fac(ceFac){
  ceFac();
};
fac(oActivitate); // O valoare din funcția pasată
```

Un caz important de studiat este cel al colecțiilor de funcții care pot fi tratate ca o baterie de prelucrare a datelor.

```js
var colectie = [
  function(para) { return para + 2; },
  function(para) { return (para - 1) * 10; },
  function(para) { return para * 2; }
];

var start = 2;

var prelucrare = function(valoare, colectieDeFunctii){
  var lungime = colectieDeFunctii.length;
  for(var i = 0; i < lungime; i++){
  	valoare = colectieDeFunctii.shift()(valoare);
  }
  return valoare;
};
alert(prelucrare(start, colectie)); // alert => 60
```

Funcțiile pot fi stocate într-un array care să determine ordinea de prelucrare a unor date.
Parcurgerea colecției de funcții are drept scope apelarea rând pe rând a fiecărei funcții și pasarea ca parametru ceea ce a returnat anterioara.

#### Funcție exprimată anonimă, (anonymous function expression).

```js
var anonima = function(){};
```

### C. funcție exprimată cu identificator (named function expression).

```js
var test = function ceva(){};
```

### A. DECLARAREA unei funcții cu nume (named function declaration)

#### Q&A

**Întrebare**: Cum DECLARI o funcție în scope (perimetru)?
**Răspuns**:

```js
  function ceva(){};
  // funcției i se dă un identificator în perimetrul (scope) în care există, cu numele ceva
```
*Orice altceva ce nu începe cu `function` este o expresie.*


**Întrebare**: Cum INVOCI o funcție?
**Răspuns**:

```js
ceva();
```

### B. Funcție EXPRIMATĂ (function expression):

```js
function ceva(){};
```

În acest caz funcția este declarată perimetrului (scope)

#### Q&A

**Întrebare**: De ce se numește exprimată?
**Răspuns**: Pentru că invocând-o ajungi la un rezultat, la o valoare (fie aceasta un boolean, număr, șir, obiect).

```js
function ceva(){ return "o valoare" };
```

### C. Funcție EXPRIMATĂ ANONIMĂ (anonymous function expression)

```js
var anonima = function(){};
```
Atenție, nu permite recursivitate.

### D. Funcție EXPRIMATĂ CU IDENTIFICATOR (named function expression):

```js
var test = function ceva(){};
```

În acest caz este declarată o variabilă test în scope.
Numele „ceva” este declarat în scope-ul propriu al funcției. ATENȚIE, nu în scope-ul în care a fost declarat test.

De exemplu:

```js
var test = function ceva(){
  console.log(typeof(ceva));
  return "merge";
};
test(); // function merge
ceva(); // ReferenceError: ceva is not defined
```

- Permite recursivitatea pentru că putem face referință la funcție chiar din interiorul ei.
- Global scope nu este poluat
- Autodocumentează codul în cel mai simplu mod posibil.

## Funcții lambda sau funcțiile de nivel înalt

Orice funcție este, de fapt o valoare.
Dacă o funcție este folosită ca argument sau ca valoare returnată, aceasta este o funcție lambda.

Unele funcții consumă și returnează funcții ca date.

Un exemplu de funcții lambda. `adaugaCifra()` este o funcție lambda care are acces la variabila rezultat.

```js
var suma = function suma() {
  var rezultat = 0;
  [2, 2, 2].forEach(function adaugaCifra(numar) { rezultat += numar; });
  return rezultat; // 6
};
```

Sunt folosite pentru:

- a face operațiuni asupra argumentelor,
- atașarea de event handlers pentru interacțiunea cu DOM-ul,
- pasarea unei funcții callback la încheierea execuției funcției curente,
- pentru a adăuga funcționalitate unei alte funcții. O funcție care adaugă funcționalitate unei alte funcții, se numește `function decorator`,
- preluarea unei funcții care are mulți parametri și returnarea uneia care cere mai puțini,
- returnarea unei funcții dintr-o altă funcție (curring). De exemplu, returnarea unei funcții care ia altă funcție căreia îi aplică un calcul pe argumentele existente.

## Crearea funcțiilor prin constructor

```js
var oFunctie = new Function('arg1', 'arg2', 'return arg1 + arg2;');
oFunnctie(2, 4); // 6
```

### Alonje:

1. Atunci când o funcție va fi folosită ca proprietate a unui obiect, atunci funcția va fi una exprimată cu indentificator (named function expression) întotdeauna.
