Sunt folosite pentru a crea obiecte noi din funcții.

## Șablonul Constructor

Este folosit pentru a crea noi obiecte cu propriul scope din alte obiecte.

Se face folosind cuvântul cheie ```new```.

### Mantre

- O funcție apelată cu ```new``` în fața sa este un constructor.
- Numele funției devine numele obiectului.

Ce se întâmplă când pui cuvântul cheie rezervat new în fața oricărei funcții?
1. Se creează un obiect nou.
2. Se creează o legătură la obiectul prototype al funcției a cărui identificator a fost folosit cu ```new```. Se creează legătura prototipală.
3. Creează un noi ```this``` pe care-l leagă la scope-ul obiectul abia creat. Contextul este setat la ```this``` pentru obiectul abia creat prin ```new```.
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
