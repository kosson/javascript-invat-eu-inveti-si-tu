# Dependințe cognitive
- funcții
- this
- legături prototipale

# Constructorii

Sunt funcții. Invocarea cu `new` în față, le transformă în obiecte.

Cea mai simplă formă este exprimată de exemplul de mai jos:

```js
function VehiculSpatial (param1, param2){
  this.nume = param1;
  this.viteza = param2;
  this.getInfo = function(){
    console.log(this.nume + ' zboară cu viteza ' + this.viteza);
  };
};

var StatiaSpatiala = new VehiculSpatial('ISS', 28000);
StatiaSpatiala.getInfo();
```

## ES6 - introducerea lui `class`
Se poate testa în Nodejs 5 cu `'use strict'` iar în browser cu un transpiler precum Babel.

```js
'use strict'

class VehiculSpatial {

  constructor (param1, param2){
    this.nume = param1;
    this.viteza = param2;
  };

  getInfo (){
    console.log(this.nume + ' zboară cu viteza ' + this.viteza);
  }
};

var StatiaSpatiala = new VehiculSpatial('ISS', 28000);
StatiaSpatiala.getInfo();
```

## Șablonul Constructor

Se face folosind cuvântul cheie ```new```.

### Mantre

- O funcție apelată cu ```new``` în fața sa este un constructor,
- Numele funcției devine numele obiectului,
- Constructorii au propriul scope,
- Constructorii creează obiecte cu propriul scope din alte obiecte,
- cuvântul cheie `this` referențiază noul obiect care este creat,
- Constructorii sunt folosiți pentru a crea obiecte noi având diverse caracteristici,
- Constructorii pregătesc obiectul pentru utilizare,
- Contructorul poate accepta parametri folosiți pentru a seta valorile membrilor atunci când obiectul este construit prima data.


## Ce se întâmplă când pui cuvântul cheie rezervat new în fața oricărei funcții?

1. Se creează un obiect nou.
2. Se creează o legătură la obiectul prototype al funcției a cărui identificator a fost folosit cu ```new```. Se creează legătura prototipală.
3. Creează un nou ```this``` pe care-l leagă la scope-ul obiectul abia creat. Contextul este setat la ```this``` pentru obiectul abia creat prin ```new```.
4. Dacă funcția nu returnează ceva, atunci înainte de a se închide blocul („}”), ```this``` va fi returnat automat.

Pentru a nu repeta metodele, cel mai bine este să le creezi în prototype, astfel că obiectele copil create vor avea acces la ele fără a duplica funcționalități.

Un exemplu:

```js
var Task = function(name){
  this.name = name;
  this.completed = false;
};

Task.prototype.complete = function () {
  console.log("completing task " + this.name);
  this.completed = true;
};

Task.prototype.save = function () {
  console.log("saving Task " + this.name);
};

var task1 = new Task("creeaza un demo pentru constructor");
var task2 = new Task("creeaza altceva");
var task3 = new Task("creeaza boo");


task1.complete();
task2.save();
task3.save();
```
