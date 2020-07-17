## Clase în JavaScript

JavaScript este un limbaj de programare bazat pe obiecte pe care nu le instanțiază în baza unei clase. Pentru că pot juca rol de constructori, funcțiile au oferit calea către implementarea claselor.

```javascript
// expresia unei declarații de funcție
let x = function () {}; // constructor.name -> Function
// expresia declarației de clasă
let Y = class {}; // constructor.name -> Function
```

Ce a rezolvat implementarea claselor odată cu versiunea ES6? Primul și cel mai important lucru este posibilitatea ca o *funcție obiect* să moștenească de la altă *funcție obiect*. Acest comportament a permis ca o funcție constructor să poată moșteni din altă funcție constructor. Nu uitați faptul că funcțiile sunt și ele obiecte în JavaScript.

```javascript
// Limitările ES5
function X () {};
X.metoda = function () { console.log('Salut!') };

function Y () {};
Y.prototype = Object.create(X.prototype);

Y.metoda; // undefined
Y.metoda(); // Y.metoda is not a function
```

Acest lucru se întâmplă pentru că `Object.create()` creează doar obiecte simple, nu poate crea *funcții obiecte*. Clasele rezolvă această moștenire.

```javascript
class X {
  static  metoda () {
    console.log('Salut!');
  }
}
class Y extends X {}
Y.metoda(); // Salut!
```

O altă problemă pe care o rezolvă clasele este posibilitatea de a extinde constructorii interni limbajului (*built-in*). Unii dintre aceștia sunt obiecte *exotice* și acum numai prin mecanismului claselor pot fi extinse.

Totuși clasele au câteva detalii, care le departajează de funcții. Nu pot fi apelate simplu fără operatorul `new`. Metodele, adică funcțiile declarate intern nu creează propriile obiecte `prototype`. Prototipul unei clase nu poate fi reatribuit.

### Drumul către clase - studiu

Modelarea unei clase rudimentare se poate realiza prin introducerea de funcționalități și date în obiectul indicat prin `this` pentru o funcție. Adu-ți aminte că la executarea unei funcții constructor, folosind operatorul `new`, primul lucru pe care-l face motorul este să creeze un obiect în contextul căruia să execute corpul funcției.

```javascript
function VehiculSpatial (identificator) {
  this.id = identificator;
  this.functie = '';
  this.an = '';
  this.prezentare = function afisez () {
    return this.id + " " + this.an;
  };
};
const Santinel = new VehiculSpatial('Santinel');
Santinel.functie = 'satelit';
Santinel.an = 2015;
console.log(Santinel.prezentare());
// ca deficiență, funcția care joaca rol de metodă, este recreată
// ori de câte ori este creat un nou obiect prin new
```

Partea deficitară a unei astfel de soluții este că funcțiile care joacă rol de metode (obiectul context în care va rula funcția când va fi apelată cu `new`), vor fi recreate ori de câte ori este creat un nou obiect. Acest fapt implică probleme de performanță a codului ocupând memoria cu aceeași funcție recreată ori de câte ori este instanțiat un nou obiect.

Modelarea unei clase rudimentare se poate realiza și prin introducerea de funcționalități și date în obiectul prototip al funcției. Astfel, prin mecanismul de moștenire prototipală, toate obiectele instanțiate cu `new`, vor beneficia de acces direct la toți membrii obiectului prototip.

```javascript
function VehiculSpatial(identificator){
  this.id = identificator;
  this.functie = '';
  this.an = '';
};
VehiculSpatial.prototype.prezentare = function () {
  return this.id + " " + this.an;
};
const Santinel = new VehiculSpatial('Santinel');
Santinel.functie = 'satelit';
Santinel.an = 2015;
console.log(Santinel.prezentare());
```

Este rapid observabil faptul că simularea clasei s-a realizat prin introducerea de proprietăți în obiectul funcție folosind legătura `this`, care permite accesul la acesta, dar și în obiectul prototipal `prototype`.

Prin introducerea noii sintaxe, se intenționează *crearea claselor pe baza moștenirii prototipale*. Sintaxa prezintă câteva particularități. Proprietățile viitorului obiect se introduc în metoda constructor. Metodele se introduc fără să fie precedate de cuvântul cheie `function` și nici nu vor fi despărțite prin virgulă. Accesarea proprietăților și metodelor se va face prin intermediul legăturii `this`. Însăși funcția clasă nu creează o legătură `this`.

```javascript
class Test {
  constructor (val) {
    this.val = val; // proprietăți interne
  }
  // proprietăți în prototype:
  ecou () {
    console.log(this.val);
  }
};
const unTest = new Test('Salut!');
// câteva verificări
console.log(unTest instanceof Test);     // true
console.log(unTest instanceof Object);   // true
console.log(typeof Test);                // function
console.log(typeof Test.prototype.ecou); // function
```

Echivalent lui `constructor (val) {}`, este `function Test (val) { this.val = val }`. Urmează o listă a membrilor viitorului obiect, care menționează direct identificatorul fără cuvântul cheie `function`. Nu a fost folosită nici formula consacrată `Test.prototype.actiune`, rolul acesteia fiind preluat de funcția `constructor`. O clasă poate avea o singură metodă `constructor` care este opțională. Instanțierea se face folosind operatorul `new`. Atenție, obiectul `prototype` al clasei va fi protejat la scriere (**read-only**). Nu se comportă ca în cazul funcțiilor din modelul clasic în care poți adăuga ulterior în obiectul `prototype` proprietăți și metode.

Legătura `this` are un rol central pentru clase pentru că numai așa vei putea accesa metodele și proprietățile clasei. Tot `this` permite înlănțuirea (*chaining* în limba engleză) metodelor unei clase pe obiectul instanțiat câtă vreme `this` este returnat la final din metodă. Acest lucru trebuie făcut pentru a actualiza valorile obiectului generat cu `new`.

```javascript
class Ceva {
  meto1 (val1) {
    this.val1 = val1;
    return this;
  }
  meto2 (val2) {
    this.val2 = val2 + this.val1;
    return this;
  }
}
const obi = new Ceva();
obi.meto1(10).meto2(2);
// poți face chaining
for(let prop in obi) {
  console.log(prop);
}; // undefined
```

Spre deosebire de constructorii declarați cu `function`, clasele nu pot fi instanțiate fără operatorul `new`. Reține faptul că o clasă tot o funcție este de fapt. În JavaScript nu există entități clase. Toate metodele din obiectul `prototype` sunt setate cu `false` la `enumerable`. Acest lucru înseamnă că obiectul nu va afișa metodele clasei într-un `for...in`.

Chiar dacă nu ai declarat o funcție `constructor`, aceasta va fi generată din oficiu. Poți verifica acest lucru interogând obiectul prototip al clasei. Posibilitatea de a adăuga proprietăți direct în obiectul prototip încă este posibilă, dar nu este recomandabilă.

### Declarații și expresii de clase

Precum în cazul funcțiilor, clasele pot fi declarate, dar pot fi și expresii. Există un detaliu important care separă declarația claselor de cea a funcțiilor cu rol de constructor: clasele nu beneficiază de hoisting.

#### Declarație de clasă

Clasele pot fi declarate direct apelând la sintaxa `class NumeClasă {...}`. Ceea ce se petrece la declararea unei clase este că se constituie variabila cu numele clasei. Variabila este inițializată cu o funcție. În obiectul `prototype` al funcției este referită funcția constructor, purtând denumirea clasei, precum și toate metodele.

```javascript
class Ceva {
  constructor(extern){
    this.ceva = extern;
  }
  ecou () {
    console.log(this.ceva);
  }

  ["ceva" + "bun"] () {
    console.log(Object.getOwnPropertyNames(this));
  }
};
Ceva === Ceva.prototype.constructor; // true
Object.getOwnPropertyNames(Ceva.prototype); // [ "constructor", "ecou", "cevabun" ]
```

Este util să menționăm faptul că în clase sunt acceptate *numele computate* pentru identificatorii proprietăților. În acest caz, trebuie folosită sintaxa cu paranteze pătrate.

#### Expresie de clasă

Sunt permise expresiile de clase. Similar funcțiilor, clasele pot să aibă nume sau nu. Dacă poartă nume, acesta este disponibil în blocul de cod al clasei. Testul cu `typeof` va fi întotdeauna `function`.

```javascript
const Plan = class OClasă {
  constructor (extern) {
    this.ceva = extern;
  };
  ecou () {
    console.log(this.ceva);
    console.log(OClasă);
  };
};
const obi = new Plan('Salut!');
obi.ecou(); // Salut! function OClasă()
```

În cazul expresiilor, poți avea un nume atașat clasei, dar apelarea acelui nume va fi posibilă doar din interiorul clasei.

#### Clasele sunt valori de prim-rang

Clasele pot fi pasate drept valori funcțiilor. Funcțiile pot returna clase ca adevărate factory-uri.

```javascript
function creatorDeCeva (ClasaMea) {
  return new ClasaMea();
};
let obi = creatorDeCeva (
  class {
    ecou () {
      console.log('bing-bang!');
    }
  };
);
```

O aplicație practică a claselor este crearea din zbor a Singleton-urilor (acestea sunt obiecte unice în economia unei aplicații - un singur obiect de acest fel poate exista la un moment dat). Acest lucru se poate realiza prin aplicarea directă a lui `new` pe expresia de clasă.

```javascript
const Avion = new class {
  constructor (indicativ) {
    this.id = indicativ;
  };
  transmite () {
    console.log(this.id);
  };
}('IAR 99');
Avion.id();
```

### Metodele statice

Metodele statice există doar în corpul clasei și nu pot fi apelabile din obiectele create. O metodă statică este echivalentul adăugării unei metode unei funcții. Reține faptul că metodele statice nu sunt disponibile în obiectele instanțiate.

```javascript
function Ceva () {};
Ceva.oMetodaStatica = function () {};
```

Metodele statice sunt folosite adesea pentru a crea funcții cu rol de utilitar și sunt folosite exclusiv pentru a prelucra date în clasă, nu în obiectele create. Poți apela o metodă statică din altă metodă statică folosind `this`.

```javascript
class Test {
  constructor (val) {
    this.val = val;
  }
  static ceva () {
    return 'ceva';
  }
  static altceva () {
    return this.ceva() + ' din alt apel static';
  }
};
Test.ceva(); // "ceva"
Test.altceva(); // "ceva din alt apel static"
```

Metodele statice nu pot fi accesate folosind `this` din metodele non-statice. După cum se observă în exemplu, pot fi accesate cu sintaxa `nume_clasă.nume_metodă_statică()`. În metodele statice poți defini alte proprietăți funcției clasă. Acestea sunt apelate cu numele funcției și nu cu `this`.

```javascript
class Ceva () {
  static metoda () {
    Ceva._cevaPrivat = new Date.now();
  }
  constructor (data) {
    this.expun = Ceva._cevaPrivat;
    this.dataCalendaristica = data;
  }
}
```

Uneori aceste metode statice sunt folosite pentru a crea obiecte pe care le returnează, dar care folosesc date diferite de cele din constructor.

```javascript
const obi = {titlu: "Margareta", autor: "Ion Fotiade"}
class Fișă {
  constructor (titlu, autor) {
    this.titlu = titlu,
    this.autor = autor
  }
  static Altceva (titlu, autor) {
    return new Fișă(titlu, autor);
  }
}
const fișăNouă = new Fișă('100 de ani', 'Ioan Fotiade');
const fișăExt = Fișă.Altceva(obi.titlu, obi.autor);
console.log(fișăExt);
```

Reține faptul că metodele statice nu sunt moștenite de obiectele create.

### Accesori și încapsulare

În JavaScript singura posibilitate de a atinge **încapsularea** prin care înțelegem protejarea datelor prin variabile private este să realizăm closure-uri. Clasele permit realizarea unei încapsulări dacă datele protejate le introducem în constructor și apoi le utilizăm prin accesori.

```javascript
class Ceva {
  constructor (privata) {
    let _privata = privata;
    this.getPrivata = function () {
      return _privata;
    }
  }
}
```

#### Getteri și setteri

Cu ajutorul accesorilor se poate comunica direct cu proprietățile obiectului instanțiat în baza clasei.

```javascript
class AccesibilDeAfara {
  constructor (valoare) {
    this.val = valoare;
  };
  // getter și setter
  get elem () {
    return this.val;
  };
  set elem (externa) {
    this.val = externa;
  };
};
const obi = new AccesibilDeAfara('miau');
obi.elem; // val: miau
obi['elem'] = 12; // val: 12
```

### Extinderea claselor

Clasele pot fi extinse. Este indicată extinderea unei clase folosindu-se cuvântul cheie `extends`. În tratarea acestui subiect, legitim este să răspundem la întrebarea de ce? De ce avem nevoie să derivăm obiectele? Răspunsul vine din necesitatea de a putea avea acces la proprietățile și metodele unui obiect existent deja, pe care să nu le mai scriem din nou într-o nouă clasă, dar care să permită îmbogățirea sau modificarea acestora.

```javascript
class Ceva {
  constructor (primo, secundo) {
    this.ceva = 'o proprietate';
    this.altceva = 'alte proprietăți';
    this.primo = primo;
    this.secundo = secundo;
  }
};

class Altceva extends Ceva {
  constructor (terzo) {
    super(primo, secundo);
    this.ceva = 'Halal';
  }
};
```

Derivarea obiectelor înainte de clasele introduse de noul standard ES6 era un proces laborios de creare a unui obiect și apoi crearea unui altuia căruia îi era setat prototipul îmbogățit al primului. Clasele care moștenesc de la altele, se numesc *clase derivate*. Acest lucru înseamnă că toate proprietățile și metodele clasei derivate vor fi moștenite din clasa părinte.

#### Modelul istoric

Mai jos este modelul istoric comparat cu ceea ce propune `extends`. Să pornim de la modelul istoric.

```javascript
function Părinte (val) {
  this.statica = val;
};
Parinte.prototype.oriDoi = function () {
  return this.statica * 2;
};
function Copil (deinmultit) {
  Parinte.call(this, deinmultit);
};
Copil.prototype = Object.create( Parinte.prototype, {
    constructor: {
      value: Copil,
      enumerable: true,
      writable: true,
      configurable: true
    }
  }
);
let rezultat = new Copil(2);
console.log(rezultat.oriDoi()); // 4
```

Este observabil cu cât efort s-a realizat acest lucru. Mai întâi am executat funcția `Părinte` în contextul lui `Copil`, pasându-i `this` pentru a seta corect contextul de execuție, adică în interiorul lui `Copil`. Au fost pasate atributele așteptate de `Părinte`. A trebuit să *rescriem* obiectul prototip al lui `Copil`, setându-l artificial la cel pe care dorim să-l moștenim folosind `Object.create()` în acest sens. A trebuit să facem un pas suplimentar setând proprietatea `constructor` să trimită înapoi la `Copil` pentru a consolida originea sa.

#### extends și super

În cazul claselor, mare parte din operațiunile complexe ale derivării sunt rezolvate prin introducerea sintagmei `extends` în declarația clasei pe care o dorești a fi derivata alteia. Ceea ce realizează este și abstractizarea funcționalităților unei clase, care va fi privită de cele derivate din ea ca un model de urmat privind comportamentele de bază. Similar copiilor care privesc și copiază comportamentele părinților, clasele, care extind altele, vor avea acces la metodele și proprietățile părintelui prin mecanismul de moștenire, care se va stabili automat. Putem afirma despre o clasă de la care se derivează că se comportă ca o interfață. O interfață fiind setul de date și funcționalități disponibil tuturor copiilor, dar care poate fi modificat de aceștia.

Am stabilit faptul că prototipul este setat automat la obiectul prototip al constructorului părinte. Constructorul părintelui poate fi accesat folosind metoda `super()`. În clasele derivate, `super()` trebuie apelat înainte de a folosi `this` în funcția constructor a copilului. Acest lucru trebuie făcut pentru a seta o linie directă de moștenire cu proprietățile constructorului clasei părinte. Regula ar fi ca datele necesare alimentării părintelui pentru operațiunile sale interne, să le trimiți prin `super(arg1, arg2, etc)`. Ce este necesar copilului, setezi prin `this`. Nu uita, că prin moștenire vei avea mereu acces la datele și metodele părintelui.

```javascript
class Parinte {
  constructor (val) {
    this.ceva = val;
  }
  oriDoi () {
    return this.ceva * 2;
  }
}

class Copil extends Parinte {
  constructor (val) {
    super(val);
    this.altceva = 10;
  }
}
const inmultire = new Copil(2);
inmultire.oriDoi(); // 4
console.log(inmultire instanceof Copil);   // true
console.log(inmultire instanceof Părinte); // true
```

Dacă nu declari constructorul, adică formulezi o clasă derivată fără a menționa constructorul, acesta oricum este constituit în spate de motor, iar `super()` este apelat automat.

Folosind `super` poți apela metode ale clasei părinte.

```javascript
class Parinte {
  constructor (valoare) {
    this.valoare = valoare;
  }
  adauga () {
    this.valoare++;
    console.log(this.valoare);
  }
}
class Copil extends Parinte {
  constructor (valoare) {
    super(valoare);
  }
  afiseaza () {
    super.adauga();
  }
}
const obi = new Copil(10);
obi.afiseaza();
```

Atunci când este nevoie, ai posibilitatea de a extinde și constructori care nu sunt clase.

```javascript
function Parinte () {};
Parinte.prototype.unu = 10;

class Copil extends Parinte {
  aduValoare () {
    console.log(this.unu);
  }
}
const obi = new Copil();
obi.aduValoare(); // 10
```

#### Suprascrierea metodelor

Menționam mai devreme faptul că unul din motivele pentru care avem clase este simplificarea extinderii uneia, fiind posibilă modificarea celor moștenite pentru a servi scopurilor pentru care se face extinderea.

```javascript
class Parinte {
  constructor (valoare) {
    this.valoare = valoare;
  }
  afișare () {
    console.log(this.valoare);
  }
}

class Copil extends Parinte {
  constructor (ceva, altceva) {
    super(ceva); // se invocă constructorul părintelui
    this.altceva = altceva;
  }
  afișare () {
    super.afișare();
  }
}
```

### Moștenirea din obiectele interne prin clase derivate

Clasele permit moștenirea din obiectele predefinite intern din JavaScript, ceea ce se poate dovedi foarte util atunci când vei dori niște funcționalități mai speciale pornind de la un obiect intern al limbajului. Acest lucru se realizează prin extinderea lor.

```javascript
class ArrayulMeu extends Array {
  // deocamdată nimic
};
var unArraySpecial = new ArrayulMeu('ceva', 'altceva');
console.log(unArraySpecial); //[ "ceva", "altceva" ]
console.log(ArrayulMeu instanceof Array); // false
```

Toate metodele din obiectul prototip al lui Array sunt disponibile noului obiect creat în baza clasei care a derivat obiectul built-in. Responsabil pentru accesul la metodele din prototipul lui `Array` este un simbol `Symbol.species`, un simbol *bine-cunoscut* (*well-known* în limba engleză). Pentru a înțelege, trage un ochi la `Symbol`.

`Symbol.species` definește o proprietate accesor, care returnează o funcție. Funcția este un constructor gata de a fi utilizat în locul constructorului.

### Proprietăți simboluri

În utilizarea claselor se poate dovedi utilă folosirea simbolurilor drept identificatori. Adu-ți aminte faptul că simbolurile nu pot fi modificate și unice.

```javascript
const facCeva = Symbo('facCeva');
class OClasa {
  [facCeva] () {
    console.log('Am folosit un simbol aici');
    return 10;
  }
  // accesarea internă
  adunValori (x = 1) {
    return this[facCeva]() + x;
  }
}
```
