# Declarația `class`

Creează o clasă pe baza moștenirii prototipale.

```js
class test {
  constructor(){}
  actiune(){}
}
```

Spre deosebire de funcții, declarația de clasă nu beneficiază de mecanismul de hoisting așa cum se întâmplă în cazul funcțiilor.

Clasele pot fi extinse. Este indicată extinderea unei clase folosindu-se cuvântul cheie `extends`.

```js
'use strict'
class Ceva {
  constructor(primo, secundo){
    this.ceva = 'o proprietate';
    this.altceva = 'alte proprietăți';
    this.primo = primo;
    this.secundo = secundo;
  }
}

class Altceva extends Ceva {
  constructor(terzo) {
    super(primo, secundo);
    this.ceva = 'Halal';
  }
}
```

În clasele derivate `super()` trebuie apelat înainte de a folosi `this`.

`super()` are rolul de a apela constructorul părintelui.


# Expresia `class`

Expresia pentru clase în JavaScript este una din modalitățile prin care se pot declara clasele. Similar funcțiilor, clasele pot să aibe nume sau nu. Dacă poartă nume, acesta este disponibil în blocul de cod al clasei. Testul cu `typeof` va fi întotdeauna `function`.

```js
'use strict'
var Test = class {};
typeof Test; // "function"

Test instanceof Object;   // true
Test instanceof Function; // true
```

Un exemplu de clasă simplă:

```js
var Test = class test{
  constructor(){}
  salve(){
    return "Salut, sunt o clasă!";
  }
  identificare(){
    return test.name;
  }
};

var instanta = new Test();

instanta.salve();         // "Salut, sunt o clasă!"
instanta.identificare();  // "test"
```
