# Șablonul Constructor

Este folosit pentru a creea noi obiecte care au propriul scope.

## Dependințe cognitive
- scope
- funcții
- this
- legături prototipale
- obiecte

## Mantre

- Sunt funcții invocate cu `new` în față, fapt ce le transformă în obiecte.
- O funcție apelată cu ```new``` în fața sa este un constructor,
- Numele funcției devine numele obiectului,
- `this` este un obiect-context: pentru funcții simple este `window`, pentru metode este obiectul în care se execută iar pentru noile obiecte create este chiar noul obiect generat. 
- Constructorii au propriul scope,
- Constructorii creează obiecte cu propriul scope din alte obiecte,
- `this` va reflecta noul obiect creat.
- `this` este returnat automat
- Constructorii sunt folosiți pentru a crea obiecte noi având diverse caracteristici,
- Constructorii pregătesc obiectul pentru utilizare,
- Contructorul poate accepta parametri folosiți pentru a seta valorile membrilor atunci când obiectul este construit prima data.

## Ce se întâmplă când pui cuvântul cheie rezervat new în fața oricărei funcții?

1. Se creează un obiect nou.
2. Se creează o legătură la obiectul prototype al funcției a cărui identificator a fost folosit cu ```new```. Se creează legătura prototipală.
3. Obiectul generat automat este pasat funcției cu rol de constructor ca fiind parametrul `this` și astfel, devine contextul de execuție a funcției constructor invocate (`this` este pasat ca parametru împreună cu `arguments`).
4. Dacă funcția nu returnează ceva, atunci înainte de a se închide blocul („}”), ```this``` va fi returnat automat.

Cea mai simplă formă este exprimată de exemplul de mai jos:

```js
function VehiculSpatial (param1, param2){
  this.nume = param1;
  this.viteza = param2;
  this.getInfo = function(){
    return this.nume + ' zboară cu viteza ' + this.viteza;
  };
};

var StatiaSpatiala = new VehiculSpatial('ISS', 28000);
StatiaSpatiala.getInfo(); // ISS zboară cu viteza 28000
```

Problema în acest exemplu este că ori de câte ori un obiect va fi creat, funcția getInfo va fi instanțiată de fiecare dată.
Pentru a nu instanția de fiecare dată, cel mai bine este să le creezi în prototype, astfel că obiectele copil create vor avea acces la ele fără a duplica funcționalități.

Un exemplu:

```js
var Sarcina = function(numeSarcina){
  this.nume = numeSarcina;
  this.terminat = false;
};

Sarcina.prototype.termin = function () {
  console.log("inchei de facut sarcina „" + this.nume + "”");
  this.terminat = true;
};

Sarcina.prototype.salveaza = function () {
  console.log("salvez Sarcina " + this.nume);
};

var sarcina1 = new Sarcina("creeaza un demo pentru constructor"); // inchei de facut sarcina „creeaza un demo pentru constructor”
var sarcina2 = new Sarcina("creeaza altceva"); // salvez Sarcina creeaza altceva
var sarcina3 = new Sarcina("creeaza boo"); // salvez Sarcina creeaza boo

sarcina1.termin();
sarcina2.salveaza();
sarcina3.salveaza();
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
