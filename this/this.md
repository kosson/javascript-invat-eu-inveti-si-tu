# this

`this` este o legătură către un obiect, un obiect-context, care se formeză în funcție de contextul de execuție.
`this` este cuvânt cheie rezervat.
`this` este o legătură care se face pentru fiecare invocare a vreunei funcții pe baza call-site-ului.
Referința `this` va fi folosită pe durata execuției funcției.
`this` NU ESTE O REFERINȚĂ CĂTRE FUNCȚIA ÎN SINE.
`this` NU ESTE O REFERINȚĂ CĂTRE SCOPE-ul LEXICAL AL FUNCȚIEI.

Legătura (binding-ul) la `this` DEPINDE DE OBIECTUL specificat la call-site.

Folosit pentru a lua un obiect și pentru a-i îmbogăți și/sau prelucra valorile membrilor după care poate fi returnat și folosit mai departe.

## Mantre

- funcțiile sunt obiecte!
- `this` este un obiect-context.
- Obiectul `this` se constituie la execuția codului, nu la momentul scrierii lui.
- **this** este o referință către contextul de execuție curent în timp ce funcția se execută.
- `this` nu se referă în niciun caz la **lexical scope**.
- `this` este un binding pentru fiecare invocare a unei funcții care se bazează pe de-antregul pe call-site
- Funcțiile și obiectele sunt REFERENȚIATE, nu sunt deținute atunci când atribui IDENTIFICATORUL într-o expresie sau ca valoarea a unei metode.
- Call-site (locul din cod unde este apelată o funcție) determină formarea lui `this`.
- Modul de invocare influiențează felul în care obiectul este constituit (către care face referință `this`).
- Toate funcțiile au la dispoziția lor un set de utilități preexistent, care poate fi apelat prin `[[Prototype]]`. Cele mai evidente sunt call(), apply().
- Atunci când există un obiect-context (folosit de o funcție prin apelare cu apply() sau call()), regula de bază a binding-ului spune că obiectul-context va fi cel la care se face bindingul this.
- în contextul de execuție tot ce este cu `this.ceva` devine membru al obiectului generat.
- Bindingul primar se face la obiectul global.
- Bindingul implicit se face la contextul de execuție al unei funcții sau al unei metode.

## Regulile de binding - de generare a obiectului this

### Binding primar
Este prima regulă și este cazul simplei invocării a funcției. Atunci când nicio altă regulă nu se aplică, aceasta se aplică din start. Funcționează dacă nu este rulat codul sub „use strict”.

```js
var test = 2;

function faceva(){
  console.log(this.test); // this.test rezolvă la variabila globală test
}

faceva(); // 2
```

Bindingul primar se face la global object (Window).

### Binding implicit

Îi spun atașat pentru că bindingul se face la obiectul în care este invocată funcția (call site), ca metodă.
Bindingul implicit constă într-o funcție pe care o „împrumuți” contextului unui obiect.

Regula este că obiectul în contextul căruia se execută funcția ca metodă este folosit de către funcție pentru a face binding la `this`.

```js
var obiectLiteral = {
  ceva: 2,
  metoda: faceva
};

function faceva(){
  this.test = 1001; // introduce în obj test
  this.ceva = 50;   // modifica existent
  console.log( this.ceva ); // 50
}

obiectLiteral.metoda();
console.log(obiectLiteral.test); // 1001
console.log(obiectLiteral.ceva); // 50
```

Pentru că obiectLiteral este `this` pentru invocarea faceva(), atunci **this.ceva** este fix același lucru cu cu **obj.ceva**.

Următoarea secvență de cod este asemănătoare.

```js
var obiectLiteral = {
  proprietate: "ceva",
  metoda: function(){
    console.log(this.proprietate);
  }
};

obiectLiteral.metoda(); // ceva

var obiectLiteral2 = {
  proprietate: "altceva",
  metoda: obiectLiteral.metoda
}

obiectLiteral2.metoda(); // altceva

var proprietate = "valoarea proprietății obiectului global";  // proprietate a obiectului global
var metoda = obiectLiteral.metoda;                            // metodă a obiectului global
metoda(); // => valoarea proprietății obiectului global; echivalent cu window.metoda()
```

Bindingul implicit poate fi pierdut atunci când faci referință către metodă, când nu o și execuți. De fapt, nu faci referința către metodă, căci însăși metoda este o referință către funcție.

```js
var obiectStudiu = {
  ceva: 1001,
  metoda: function special(){
    console.log(this.ceva);
  }
};

var ceva = 2002;

var referinta = obiectStudiu.metoda; // e doar o referință, nu este valoarea funcției.

referinta(); // 2002  call-site pentru care se aplică regula 1 - binding primar.
```

Ceea ce s-a întâmplat, de fapt este că a fost „împrumutată” (invocată) funcția în contextul obiectului global. În acest caz se aplică regula bindingului primar. Dacă funcția nu ar fi fost numită, în call stack ar fi apărut cu numele referinței (obiectStudiu.metoda).

### Binding explicit

`call()` și `apply()` sunt utilități disponibile prin `[[Prototype]]` tuturor funcțiilor, care sunt de fapt la rândul lor obiecte.

Bindingul explicit se realizează prin intermediul lui call() și apply(). Ambele iau ca prim parametru un obiect care va fi folosit pentru `this` și apoi va invoca funcția cu acel `this` deja specificat. Pentru că este afirmat în mod direct unde dorești să fie this, numim aceasta binding explicit.

How do these utilities work? They both take, as their first parameter, an object to use for the `this`, and then invoke the function with that `this` specified. Since you are directly stating what you want the `this` to be, we call it *explicit binding*.


```js
var proprietate = "ceva din global"; // este proprietate a obiectului global

var obiectLiteral = {
  proprietate: "ceva"
};

var faceva = function maner(){
  console.log(this.proprietate);
}

faceva.call(obiectLiteral); // Spune: foloseste objectLiteral ca this. => ceva
faceva(); // => ceva din global

```

call() modifică contextul.
Dacă vrei să pasezi argumente funcției, acestea vor urma referinței către noul context

De exemplu:

```js
var obiect = {
  proprietate: 1000,
  metoda: function(unu, doi, trei){
    console.log(this.proprietate);
  }
}

var proprietate = 4000;

obiect.metoda(); // => 1000

obiect.metoda.call(window); // 4000

obiect.metoda.call(window, 1, 2, 3);
obiect.metoda.apply(window, [1,2,3]); //acelasi lucru ca si call numai ca paseaza params ca array
```
---

### Binding puternic (hard binding)

Este modul în care te asiguri întotdeauna că ```this``` este predictibil și nu alunecă în global scope.

Hardbinding ```this``` în obiectul care se dorește a fi contextul. Este un cuplaj forțat între o funcție care trebuie să ruleze musai în contextul unui obiect.

Începând cu ES5 bind() a fost introdusă ca metodă în prototipul oricărei funcții.
Vezi și documentația MDN pentru bind la:  [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

#### Mantre

- bind() creează o nouă funcție, care atunci când este apelată va avea ```this``` setat la valoarea introdusă ca paramentru împreună cu o serie de argumente.

Exemplul de la MDN

```js
this.x = 9;

var modul = {
  x: 81,
  getX: function() { return this.x; }
};

modul.getX(); // 81

var retrieveX = modul.getX;

retrieveX(); // 9, deoarece "this" face referință la obiectul global. Funcția este doar „împrumutată” din metoda obiectului

// Creează o nouă funcție cu this bound la modul
var boundGetX = retrieveX.bind(modul);
boundGetX(); // 81
```

bind() va fi găsit în funcția __proto__ al oricărui obiect generat de o funcție alături de call() și apply().

## Binding cu `new`

Poți pune în fața oricărei funcții ```new``` și o transformi astfel într-un apel către un Constructor. Atenție, aici trebuie precizat faptul că JavaScript nu are clase.

### Mantra
- O funcție apelată cu ```new``` în fața sa este un constructor.
- new este mai puternic decât hard binding.

Ceea ce va face la instanțiere este exact ceea ce a fost proiectată funcția la care se adaugă patru comportamente nevăzute.

Ce se întâmplă când pui cuvântul cheie rezervat new în fața oricărei funcții?
1. Se creează un obiect nou.
2. Se creează o legătură la obiectul prototype al funcției a cărui identificator a fost folosit cu ```new```. Se creează legătura prototipală.
3. Creează un noi ```this``` pe care-l leagă la scope-ul obiectul abia creat. Contextul este setat la ```this``` pentru obiectul abia creat prin ```new```.
4. Dacă funcția nu returnează ceva, atunci înainte de a se închide blocul („}”), ```this``` va fi returnat automat.

```js
function test2(){
  this.x = "ceva din obiectul test2";
}

console.log(test2.x);

/* Dacă generezi un obiect din funcție */
var start = new test2();

/* Atunci ai acces la proprietatea x
*  pentru că este returnat obiectul la
*  care start face referință */
console.log(start.x); //
```
## Precedența regulilor

În funcție de call-site pot activa una sau mai multe reguli de binding. Există modalități de a stabili care reguli de binding se aplică pentru ```this```.

Întrebări de verificare cheie în call-site pentru a determina la ce este făcut bindingul prin ```this``` :

1. A fost chemată funcția cu ```new```? Dacă da, folosește acel obiect.
2. A fost apelată prin call() sau apply()? Dacă da, folosește acel obiect pentru context.
3. A fost apelată funcția într-un obiect care conține referința sau o deține (context).
4. Global object (cu excepția rulării în `use strict`)

## Menționarea resurselor folosite pentru documentare:
[MDN>Web technology for developers>JavaScript>JavaScript reference>Expressions and operators>this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
