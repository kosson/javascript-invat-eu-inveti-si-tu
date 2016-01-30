# this
## Acumulări rapide
**this** este un cuvânt cheie.

**this** este o referință către contextul de execuție curent în timp ce funcția se execută.

`this` este un binding pentru fiecare invocare a unei funcții care se bazează pe de-antregul pe call-site

## Mantre

- Funcția de bază este de a permite obiectului să se poată autoreferenția din interiorul metodelor.
- Funcțiile și obiectele sunt REFERENȚIATE, nu sunt deținute atunci când atribui IDENTIFICATORUL într-o expresie sau ca valoarea a unei metode.
- Call-site (locul din cod unde este apelată o funcție) determină ce este ```this```.
- ```this``` este o referință către contextul de execuție a fiecărei funcții care se execută curent.
- La ce face trimitere ```this``` este definit de modul în care funcția este declarată, ci de modul în care este invocată.
- Valoarea lui ```this``` este context.
- Atunci când există un obiect-context, regula de bază a binding-ului spune că obiectul-context va fi cel la care se face bindingul this.



## Regulile de binding

### Binding primar
Este prima regulă și este cazul simplei invocării a funcției. Atunci când nicio altă regulă nu se aplică, aceasta se aplică din start. Funcționează dacă nu este rulat codul sub „use strict”.

```js
var test = 2;

function faceva(){
  console.log(this.test); // this.test rezolvă la variabila globală test
}

faceva(); // 2
```
dacă codul este rulat sub ``` 'use strict' ```, răspunsul la rulare este ```this is undefined```

```js
'use strict';

var test = 2;

function faceva(){
  console.log(this.test);
}

faceva(); // 2
```

Bindingul primar se face la global object (Window).

---

### Binding implicit - eu îi spun „binding atașat implicit”
Îi spun atașat pentru că bindingul se face la obiectul în care este invocată funcția (call site), fie ca metodă, fie ca funcție.

#### Mantra
- Bindingul implicit constă într-o funcție pe care o „împrumuți” contextului unui obiect.

```js
var obiectLiteral = {
  ceva: 2,
  metoda: faceva
};

function faceva(){
  console.log( this.ceva );
}

obiectLiteral.metoda();
```
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
---

### Binding explicit - eu îi spun „binding atașat explicit”

Se realizează prin intermediul lui call() și apply(). Ambele iau ca prim parametru un obiect care va fi folosit pentru this și apoi va invoca funcția. Pentru că este afirmat în mod direct unde dorești să fie this, numim aceasta binding explicit.

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
retrieveX(); // 9, deoarece "this" face referință la obiectul global

// Creează o nouă funcție cu this bound la modul
var boundGetX = retrieveX.bind(modul);
boundGetX(); // 81
```

bind() va fi găsit în funcția __proto__ al oricărui obiect generat de o funcție alături de call() și apply().

## Binding cu `new`

Poți pune în fața oricărei funcții new și o transformi astfel într-un apel pentru un Constructor. Atenție, aici trebuie precizat faptul că JavaScript nu are clase.

### Mantra
- O funcție apelată cu ```new``` în fața sa este un constructor.
- new este mai puternic decât hard binding.

Ceea ce va face la instanțiere este exact ceea ce a fost proiectată funcția la care se adaugă patru comportamente nevăzute.

Ce se întâmplă când pui cuvântul cheie rezervat new în fața oricărei funcții?
1. Se creează un obiect nou.
2. Se creează o legătură la obiectul prototype al funcției a cărui identificator a fost folosit cu ```new```. Se creează legătura prototipală.
3. ```this``` se leagă la obiectul abia creat. Contextul este setat la ```this``` pentru obiectul abia creat prin ```new```.
4. Dacă funcția nu returnează ceva, atunci înainte de a se închide blocul („}”), se va returna automat ```this```.

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
