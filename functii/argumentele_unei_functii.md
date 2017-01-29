# Argumentele și parametrii funcțiilor

Pe scurt, argumentele sunt ceea ce pasezi funcțiilor. Numărul de argumente pasate unei funcții se numește în jargonul programatorilor „arity”.
Fiecare argument trebuie pasat funcției în ordinea corectă.

Mai jos este dat un exemplu care ilustrează afirmația: o funcție este o rutină aplicată pe argumentele sale. Exemplul se bazează pe `Function.prototype.apply`.

```javascript
function oFunctie(x, y, z) {
  console.log([].slice.call(arguments)); // Array [ 0, 1, 2 ]
  console.log(...arguments); // 0 1 2
};
var argumentele = [0, 1, 2];
oFunctie.apply(null, argumentele); // argumentele sunt aplicate literalmente funcției.
```

Acest exemplu ilustrează în adâncime ceea ce se petrece cu argumentele unei funcții. Am folosit soluția practică `Array.prototype.slice.call(arguments)` pentru a transforma obiectul arguments într-un array. Se pot obține valorile direct folosind noua sintaxă ES6: `...arguments`.

Pentru că am menționat sintaxa spread introdusă de ES6, hai să vedem același exemplu dar folosind această nouă sintaxă:

```javascript
function oFunctie(x, y, z){console.log([].slice.call(arguments));};
var argumente = [4, 5, 6];
oFunctie(...argumente); // Array [ 4, 5, 6 ]
```

Ceea se declară în interiorul funcției se numește **parametru**. Parametrii preiau valorile pasate prin intermediul argumentelor.

```js
function demo(param1, param2){ return param1 + param2 }; // parametrii sunt declarațiile din funcție

demo(1, 2); // argumentele este ceea ce pasezi funcției la invocare.
```

La nevoie poți specifica strict numărul argumentelor primite:

```js
function faCeva(a,b){
  if(arguments.length !== 2){
    throw new Error('Trebuie musai doar două argumente');
  };
};
faCeva(1, 3, 4); // Error: Trebuie musai doar două argumente
```

Există un obiect `arguments` care este pasat funcției și care permite accesul la toți parametrii, fără a fi necesar să-i definești în interiorul funcției.

## Mantre

- Valoarea parametrilor unei funcții este din start `undefined`.
- Evaluarea parametrilor se face la momentul invocării funcției.
- Argumentele pasate funcțiilor pot avea echivalență în numărul parametrilor declarați sau nu.
- O funcție are o proprietate `length`, care nu trebuie confundată cu proprietatea cu același nume a parametrului `arguments`. `nume_funcție.length` returnează câți parametri care au un nume au fost declarați.
- Obiectul `arguments` este actualizat în permanență când codul nu-i `strict` și poți modifica în interiorul funcției valoarea parametrilor.
- `arguments` are caracteristicile unui array, zicem că este array-like.
- pentru o funcție poți vedea câți parametri au fost declarați (`nume_functie.length`) și câte argumente i-au fost pasate (`arguments.length`).
- Parametrii cu valori inițiale trebuie să aibe valori primitive. Asta chiar dacă este o funcție invocată, aceasta trebuie să returneze o primitivă.

## Ce este `arguments`?

Sfatul lui Crockford: tratează `arguments` ca pe o structură read-only, pentru că, altfel, poți modifica valorile și ordinea parametrilor funcției.

`arguments` este un obiect.

```javascript
function testX(unu, doi){
  console.log(typeof arguments);      // object
  console.log(arguments.constructor); // function Object()
  console.log(arguments.__proto__);   // Object { , 15 more… }
  console.log(arguments.prototype);   // undefined
}; testX(10, 1000);
```

Parametrii funcției au propriul lor scope (lexical environment), care este separat de cel al funcției.

```javascript
function testX(unu, doi){
  console.log(this.unu === arguments[0]); // false
  console.log(this.unu === this.arguments[0]); // false
}; testX(10, 1000);
```

Unui obiect `arguments` i se pot seta proprietăți: `arguments[3] = 'trei'`.

```javascript
function ex(unu, doi){
  console.log(this);  // Window
  this.trei = 3;      // se creează prop trei: window.trei care este 3
  console.log(ex.arguments); // Arguments {0:1,1:2,calee:ex(),length:2,__proto__:Object}
  function intern(patru, cinci){
    console.log(this.trei);    // 3
    console.log(ex.arguments); // Arguments {0:1,1:2,calee:ex(),length:2,__proto__:Object}
  };
  intern();
}; ex(1,2);
console.log(window.trei);
```

## Transformarea lui `arguments` într-un array

Se folosește metoda slice a lui Array:

```javascript
function convertireArgs(a, b){
  var arr = Array.prototype.slice.call(arguments);
  // sau
  var arr = [].slice.call(arguments);
  // se poate folosi și Array.from()
  var arr = Array.from(arguments);
  // dar și spread operator
  var arr = [...arguments];
};
```

## Câte argumente sunt?

Acest lucru este posibil pentru că `arguments` este array-like și astfel, oferă o proprietate `length` pe care orice array o oferă.

```js
function cateSunt(){
  return arguments['length'];
};
cateSunt(1); // 1
cateSunt(23, 10, 5, 'aha'); // 4
```

## Argumente, parametri și modificarea acestora

În interiorul unei funcții, pentru că un parametru poate fi modificat, el fiind parte din mediul lexical format la execuția funcției, obiectul „arguments” este și el actualizat. Acest comportament este atunci când codul rulează fără restricția „`"use strict";`”. Dar când codul este rulat în `strict mode`, valorile inițiale din „arguments” rămân neschimbate.

```javascript
function demoArgs(unu){
  console.log(unu === arguments[0]); // true
  unu = 100;
  console.log(unu === arguments[0]); // true
};
demoArgs(10);

function demoArgs(unu){
  "use strict";
  console.log(unu === arguments[0]); // true
  unu = 100;
  console.log(unu === arguments[0]); // false
  console.log(arguments[0]); // 10
};
demoArgs(10);
```

## Numărul argumentelor la invocare față de numărul parametrilor la declarare

Argumentele pasate unei funcții la momentul invocării trebuie să se potrivească numărului de parametri specificați în declarația funcției și în acceași ordine.
Sunt cazuri în care numărul argumentelor este mai mare decât cel al parametrilor, precum și cazuri în care numărul argumentelor este mai mic decât cel al parametrilor. Trebuie reținut faptul că JavaScript nu va da vreo eroare atunci când sunt diferențe.

## Argumente care variază ca număr

Până la standardul ECMAScript 2015, JavaScript nu permitea colectarea unui număr variabil de argumente într-un singur parametru. Pentru a face acest lucru, se recurgea la un truc care exploata argumentul pasat automat `arguments`:

```js
function test(){
  var primulArg = arguments[0],
      alDoileaA = [].slice.call(arguments, 1);
  // restul codului
};

// alternativa oferită de ECMAScript 2015

function test(primulArg, ...restulArgs){
  // cod
  console.log(restulArgs); // Array [ 2, 3, 4, 5 ]
};
```

### Numărul argumentelor este mai mare decât al parametrilor

Valorile „în plus” nu vor fi atribuite identificatorilor parametrilor deja menționați.

### Numărul argumentelor este mai mic decât al parametrilor

Valorile corespondente vor fi atribuite iar parametrii care nu au valori, vor fi setați la `undefined`.

## Setarea unei valori implicite pentru un argument

În anumite cazuri este nevoie de a inițializa un parametru cu o anumită valoare prestabilită și nu `undefined` așa cum este comportamentul standard al ECMAScript.

Până la noua versiune a ECMAScript, mai întâi se verifica în funcție dacă un anumit parametru este `undefined` iar dacă acesta era cazul, se inițializa cu o valoare. Acest lucru este posibil dacă ne readucem aminte faptul că și parametrii sunt identificatori în scope-ul funcției (`lexical environment`).

```js
var test = function(ceva){
  return ceva || 'Valoare implicită';
};

console.log(test('CEVA')); // CEVA
console.log(test());       // Valoare implicită

// Sau se mai proceda așa
function faCeva(a, b){
  if(typeof b === 'undefined'){ b = 5 };
  return a * b;
};
faCeva(1);

// o altă alternativă mai era
function faCeva(a, b){
  b = (typeof b !== 'undefined') ? b : 10;
  return a * b;
};

faCeva(12);
```

Acesta este un șablon de lucru foarte important care permite utilizarea de valori prestabilite atunci când nimic nu este pasat funcției.

Acest mic șablon se va schimba odată cu folosirea ECMAScript6, când se va putea seta valoarea implicită chiar la pasarea argumentelor:

```js
function test(ceva = "Valoare implicită"){
  return ceva;
};
test();
```

## Parametri pot avea valori inițiale

Odată cu apariția noii versiuni a standardului ES6, parametrii pot avea valori inițiale ceea ce făcea ca invocarea cu acești parametri să fie opțională. În ES5, acest lucru se putea face folosind operatorul `||`.

```javascript
function faUnBloc(inaltime, latime, lungime, timpCoacere){
  inaltime = inaltime || 100;
  latime = latime || 80;
  timpCoacere = timpCoacere || 85000;
  console.log(inaltime, latime, lungime, timpCoacere);
};
faUnBloc('','',150,0); // 100 80 150 85000
```

În cazul acestei abordări, există o eroare indusă de comportamentul de evaluare a motorului de JS, care nu poate fi corectată decât dacă se va verifica și tipul argumentului. În exemplul de mai sus, pentru ultima valoare, care este una validă pentru timp (`0`), motorul a redus-o la o valoare `falsy` și a preferat valoarea inițială.

```javascript
function masoaraTimp(timpCoacere, rasuceste){
  timpCoacere = (typeof timpCoacere !== 'undefined') ? timpCoacere : 85000;
  rasuceste = (typeof rasuceste !== 'undefined') ? rasuceste : (function(){
    if(timpCoacere > 100000){
      alert('Răsucesc!');
    } else { alert('Mai coc!'); };
  })(); // o funcție care se execută automat dacă nu este oferită altă funcție.
  console.log(timpCoacere);
};
masoaraTimp(0); // Mai coc! Comportamentul este corect de această dată.
masoaraTimp(150000); // Răsucesc!
```

În exemplul oferit mai sus, această verificare a existenței unei valori este des întâlnită în practica de zi cu zi a codului conform ES5. Este un șablon des întâlnit.
ES6 permite introducerea valorilor inițiale direct în zona argumentelor.

```javascript
function masoaraTimp(timpCoacere = 85000, rasuceste = function(){ alert('') }){
  // cod funcție
};
```

Obiectul „arguments” în cazul parametrilor presetați are comportamentul rulării conform ES5 cu `"use strict";`. Pur și simplu, când motorul „vede” parametri cu valori inițiale, aplică comportamentul de izolare asupra obiectului `arguments`.

```javascript
function demoArgs(unu, doi = 2){
  console.log(doi === arguments[1]); // false
  doi = 10; console.log(doi == arguments[1]); // false
  console.log(arguments[0]); // 1000
}; demoArgs(1000);
```

`console.log(doi === arguments[1]);` returnează `false` pentru că doar un singur argument a fost pasat funcției. Acest lucru poate fi demonstrat prin valoare 1 a lui `arguments.length` iar `arguments[1]` va fi `undefined`, ceea ce este și firesc pentru că doar un singur argument a fost pasat.

Reține faptul că `arguments` reflectă starea inițială și că trebuie să fie numai valori primitive, chiar dacă acestea sunt rezultatul evaluării unei alte funcții - trebuie să invoci funcție, nu să pasezi o referință către aceasta.

```javascript
function demoArgs(unu, doi = doi()){
  // cod funcție
};
```

## Parametrii cu valori inițiale pot servi valori celor care urmează

```javascript
function demoArgs(unu, doi = unu + 1){
  console.log(doi);
};
demoArgs(10); // 11
```

Mai mult, chiar poți pasa un parametru anterior ca argument în evaluarea unei funcții ce va returna o valoare penru un altul care-i urmează. Este exact ceea ce ai face în interiorul funcției cu diferența că o faci în zona argumentelor. Atenție, nu poți folosi un parametru înainte ca acesta să fi fost inițializat. Este același caz ca și pentru `let`. Fii atent!

## Evaluarea parametrilor se face la momentul invocării funcției

Trebuie să ne aducem aminte faptul că de fiecare dată când este invocată o funcție, un nou obiect este creat. La invocare abia este evaluat codul din funcție și se generează și scope-ul (lexical environment-ul) local, adică cel al funcției. Parametrii fac parte din acest scope local. Un exemplu în acest sens este următorul:

```javascript
function adaugaInColectie(valoare, array = []){
  array.push(valoare);
  return array;
};
adaugaInColectie(10);
```

Este valabil și pentru funcții, care sunt evaluate la rândul lor și rezultatul devine valoarea parametrului la momentul invocării.

```javascript
function oFunctie(){
  return "ceva din funcția pasată ca argument";
};

function exemplu(x = oFunctie()){
  return x;
};

exemplu();
```

Pe măsură ce parametrii sunt evaluați, aceștia se fac disponibili parametrilor evaluați ulterior ca în cazul următor:

```javascript
function exemplu(una, alta = una + 2, cateva = alta + ' mere'){
  return [ alta, cateva ];
};
exemplu(2); // Array [ 4, "4 mere" ]
```

## `arguments` ca instrument de prelucrare a unui obiect

Dacă trimitem unei funcții un argument care are drept valoare un obiect, putem constitui un alt obiect subset pe care să-l returnăm.

```javascript
var vehicul = {
  nume: 'Tesla S',
  masa: 1200,
  autonomie: 250
};

function peAlese(obi){
  let transformat = {};

  for(let x = 1, lungime = arguments.length; x < lungime; x++ ){
    transformat[arguments[x]] = obi[arguments[x]];
  }; // pornești de la index pentru că la 0 este chiar obiectul

  return transformat;
};

let masina = peAlese(vehicul, 'nume', 'autonomie');
console.log(masina); // Object { nume: "Tesla S", autonomie: 250 }

// și varianta folosind rest parameters
function peAlese(obi, ...chei){
  var transformat = {};
  for(let x = 0, lungime = chei.length; x < lungime; x++){
    transformat[chei[x]] = obi[chei[x]];
  };
  return transformat;
}; // chei conține toți parametrii de după primul.
```
