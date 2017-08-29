# Definirea unei clase

JavaScript nu are clase așa cum sunt înțelese acestea în alte limbaje de programare. Mă refer la scenariul clasic în care se creează o clasă care reprezintă un plan de construcție pentru viitoarele obiecte care vor fi instanțiate pe baza acestuia. Sintaxa care folosește cuvântul rezervat `class` a fost introdusă în limbaj pentru a le oferi celor noi veniți un punct de conexiune familiar cu ceea ce deja cunosc din alte limbaje.

Ceea ce se intenționează este să se creeaze o clasă pe baza moștenirii prototipale. Este observabil că în funcția internă numită constructor, se vor introduce membrii viitorului obiect. Echivalent lui `constructor(val){}`, este `function Test (val){ this.val = val }`. Urmează o listă a membrilor viitorului obiect care menționează direct identificatorul fără cuvântul cheie `function` și nici folosind formula consacrată `Test.prototype.actiune`.

```javascript
class Test {
  constructor(val){
    this.val = val; // proprietăți interne
  };
  // proprietăți în prototype:
  ecou(){
    console.log(this.val);
  };
};
let unTest = new Test('Salut!');
// câteva verificări
console.log(unTest instanceof Test);    // true
console.log(unTest instanceof Object);  // true
console.log(typeof Test); // function
console.log(typeof Test.prototype.ecou); // function
```

Instanțierea se face folosind operatorul `new`. Atenție, obiectul prototype al clasei va fi read-only. Nu se comportă ca în cazul funcțiilor din modelul clasic în care poți adăuga ulterior în obiectul prototype.

Aplicând toate regulile claselor, `Test` poate fi rescris folosindu-se un IIFE (Immediately Invoked Function Execution).

```javascript
var Test = (
  function(){
    "use strict";
    const Test = function (val) {
      if (typeof new.target === 'undefined') { // te asiguri că e apelat cu new
        throw new Error("Constructorul trebuie apelat cu new");
      };
      this.val = val;
    };
    Object.defineProperty(Test.prototype, "ecou", {
      value: function(){
        if (typeof new.target !== "undefined") {
          throw new Error("Metoda nu poate fi apelată cu new")
        };
        console.log(this.val);
      },
      enumerable: false,
      writable: true,
      configurable: true
    });
    return Test;
  }()
);
var x = new Test('copie!');
x.ecou; // copie
```

## Mantre

- Spre deosebire de funcții, declarația de clasă nu beneficiază de mecanismul de hoisting indiferent că este o declarație sau o expresie de clasă. Deci, până când execuția nu ajunge la locul de declarare, clasa se află în Temporal Dead Zone (TDZ).
- Tot codul din clasă rulează automat în `strict mode`.
- Toate metodele create sunt automat non-enumerabile.
- Apelarea constructorului fără `new` conduce la o stare de eroare.
- Numele clasei nu trebuie folosit în interiorul acesteia pentru o reasignare. Conduce la eroare.
- În cazul folosirii expresiilor de clasă, nu este necesară introducerea unui identificator după cuvântul cheie `class`.
- `super()` setează legătura la `this` în cazul claselor derivate. Dacă folosești constructorul, adu-ți mereu aminte să invoci mai întâi de toate `super()`.
- clasele permit moștenirea din toate obiectele built-in: `class ArraySpecial extends Array {}`.

## Declarare și expresii de clase

Ca și în cazul funcțiilor, clasele pot fi declarate, dar pot fi și expresii.

### Declarație de clasă

```javascript
class Plan {
  constructor(extern){
    this.ceva = extern;
  };
  ecou () {
    console.log(this.ceva);
  };
};
```

Este util să menționăm faptul că în clase sunt acceptate „numele computate” pentru identificatorii proprietăților.

```javascript
var pentruOProprietate = 'metoda x';
var OClasa = class {
  constructor (ceva) {
    this.interna = ceva;
  };
  [pentruOProprietate] () {
    console.log(this.interna);
  };
};
var Una = new OClasa('Inima');
Una['metoda x'](); // Inima
```

### Expresie de clasă

Expresia pentru clase în JavaScript este una din modalitățile prin care se pot declara clasele. Similar funcțiilor, clasele pot să aibe nume sau nu. Dacă poartă nume, acesta este disponibil în blocul de cod al clasei. Testul cu `typeof` va fi întotdeauna `function`.

```javascript
var Plan = class {
  constructor (extern) {
    this.ceva = extern;
  };
  ecou () {
    console.log(this.ceva);
  };
};
```

## Clasele ca valori de prim-rang - first-class citizens

Ca orice valoare de „primă-clasă”, și clasa poate fi pasată drept valoare unei funcții.

```javascript
function creatorDeCeva (ClasaMea) {
  return new ClasaMea();
};
var obi = creatorDeCeva(
  class {
    ecou () {
      console.log('bing-bang!');
    }
  };
);
```

O aplicație practică a claselor este crearea din zbor a Singleton-urilor. Acest lucru se poate realiza prin aplicarea directă a lui `new` pe expresia de clasă.

```javascript
let avion = new class {
  constructor(indicativ){
    this.id = indicativ;
  };
  transmite () {
    console.log(this.id);
  };
}('IAR 99');
avion.id();
```

## Clasele permit proprietăți accesor

Cu ajutorul accesorilor se poate comunica direct cu proprietățile obiectului instanțiat pe baza clasei.

```javascript
class AccesibilDeAfara {
  constructor (valoare) {
    this.val = valoare;
  };
  get elem () {
    return this.val;
  };
  set elem (externa) {
    this.val = externa;
  };
};
var obi = new AccesibilDeAfara('miau');
obi.elem; // val: miau
obi['elem'] = 12; // val: 12
```

## Extinderea claselor

Clasele pot fi extinse. Este indicată extinderea unei clase folosindu-se cuvântul cheie `extends`.

```javascript
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

## Clase derivate

Derivarea obiectelor înainte de facilitățile pe care le pune la dispoziție noul standard ES6 era un proces laborios de creare a unui obiect și apoi crearea unui altuia căruia i se seta prototipul îmbogățit al primului.

```javascript
// PRIMUL OBIECT
function Stramos (val) {
  this.statica = val;
};
Stramos.prototype.oriDoi = function () {
  return this.statica * 2;
};

// AL DOILEA
function Copil (deinmultit) {
  Stramos.call(this, deinmultit);
};
Copil.prototype = Object.create(Stramos.prototype, {
  constructor: {
    value: Copil,
    enumerable: true,
    writable: true,
    configurable: true
  }
});
var rezultat = new Copil(2);
console.log(rezultat.oriDoi()); // 4
```

Este observabil cu cât efort s-a realizat acest lucru.
Mai întâi am executat funcția Stramos în contextul lui Copil pasându-i `this`, care este obiectul `this` propriu lui Copil pentru a seta corect contextul de execuție, adică în interiorul lui Copil. Au fost pasate atributele așteptate de Stramos.
A trebuit să „rescriem” obiectul prototip al lui Copil setându-l artificial la cel pe care dorim să-l moștenim folosind această posibilitate oferită prin `Object.create`. A mai trebuit să facem un pas suplimentar setând ca proprietatea constructor să trimită totuși înapoi la `Copil` pentru a consolida originea sa.

În cazul claselor, mare parte din aceste operațiuni complexe sunt rezolvate prin introducerea sintagmei `extends` în declarația funcției care dorești să fie o derivare a alteia. Prototipul este setat automat și poți accesa constructorul folosind metoda `super()`. Pentru a reține mai ușor, `super()` are rolul de a apela constructorul părintelui.
În clasele derivate `super()` trebuie apelat înainte de a folosi `this` în constructor pentru că `super()` este cel care-l setează.


```javascript
class Stramos {
  constructor(val) {
    this.statica = val;
  };
  oriDoi () {
    return this.statica * 2;
  };
};
class Copil extends Stramos {
  constructor (deinmultit) {
    super(deinmultit);
  };
};
var inmultire = new Copil(2);
inmultire.oriDoi(); // 4
console.log(inmultire instanceof Copil); // true
console.log(inmultire instanceof Stramos); // true
```

Clasele care moștenesc de la altele, se numesc clase derivate. Adu-ți mereu aminte de faptul că pentru clasele derivate, în cazul în care dorești să folosești constructorul, trebuie să-l folosești în combinație cu super căruia îi pasezi argumentele pe care le treia constructorul.

Dacă nu dorești să folosești constructoru, adică să formulezi o clasă derivată fără a menționa constructorul, `super()` este apelat automat cu toate argumentele necesare la momentul instanțierii clasei.

## Moștenirea din obiectele interne prin clase derivate

Clasele permit moștenirea din obiectele predefinite intern din JavaScript, ceea ce se poate dovedi foarte util atunci când vei dori niște funcționalități mai speciale pornind de la un obiect intern care este gata construit.

Acest lucru se realizează prin extinderea lor.

```javascript
class ArrayulMeu extends Array {
  // deocamdată nimic
};
var unArraySpecial = new ArrayulMeu('ceva', 'altceva');
console.log(unArraySpecial); //[ "ceva", "altceva" ]
console.log(ArrayulMeu instanceof Array); // false
```

Toate metodele din obiectul prototip al lui Array sunt disponibile noului obiect creat în baza clasei care a derivat obiectul built-in. Responsabil pentru accesul la metodele din prototipul lui `Array` este un simbol `Symbol.species`, un simbol „binecunoscut” (**well-known**).

`Symbol.species` definește o proprietate accesor, care returnează o funcție. Funcția este un contructor gata de a fi utilizat în locul constructorului.
