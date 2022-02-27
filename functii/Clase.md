## Clase în JavaScript

JavaScript este un limbaj de programare bazat pe obiecte pe care nu le instanțiază în baza unei clase. Prin modul lor de lucru, funcțiile au oferit calea către implementarea claselor. Ce a rezolvat implementarea claselor odată cu versiunea ES6? Primul și cel mai important lucru este posibilitatea ca o *funcție obiect* să moștenească de la altă *funcție obiect*. Acest comportament a permis ca o funcție constructor să poată moșteni din altă funcție constructor.

```javascript
// Limitările ES5
function X () {};
X.metoda = function () { console.log('Salut!') };

function Y () {};
Y.prototype = Object.create(X.prototype);

Y.metoda; // undefined
Y.metoda(); // Y.metoda is not a function
```

După cum se observă în exemplu, acest lucru se întâmplă pentru că `Object.create()` creează doar obiecte simple, nu poate crea *funcții obiect*. Introducerea claselor rezolvă această moștenire.

```javascript
class X {
  static metoda () {
    console.log('Salut!');
  }
}
class Y extends X {}
Y.metoda(); // Salut!
```

O altă problemă pe care o rezolvă clasele este posibilitatea de a extinde constructorii interni ai limbajului (*built-in*). Unii dintre aceștia sunt obiecte *exotice*. Pentru a le extinde se pot folosi numai clasele.

Totuși clasele au câteva detalii, care le departajează de funcții. Nu pot fi apelate simplu fără operatorul `new`. Metodele, adică funcțiile declarate intern nu creează propriile obiecte `prototype`. Prototipul unei clase nu poate fi reatribuit unei alte funcții.

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

Problema acestei soluții este că funcțiile cu rol de metode (obiectul context în care va rula funcția când va fi apelată cu `new`), vor fi recreate în memorie ori de câte ori este creat un nou obiect. Ori de câte ori este instanțiat un nou obiect se ocupă memoria inutil.

Modelarea unei clase rudimentare se poate realiza și prin introducerea de funcționalități, precum și a unor date în obiectul prototip al funcției. Astfel, prin mecanismul de moștenire prototipală, toate obiectele instanțiate cu `new`, vor beneficia de acces direct la toți membrii obiectului prototip.

```javascript
function VehiculSpatial (identificator) {
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

Prin introducerea noii sintaxe, se intenționează *crearea claselor pe baza moștenirii prototipale*. Sintaxa prezintă câteva particularități. Proprietățile viitorului obiect se introduc în metoda constructor. Metodele se introduc fără să fie precedate de cuvântul cheie `function` și nici nu vor fi despărțite prin virgulă. Accesarea proprietăților și metodelor se va face prin intermediul legăturii `this`. Funcția cu rol de clasă nu creează o legătură `this`.

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

// Legăturile prototipale
console.log('Obiectul prototipal al instanțelor în baza clasei este ', Test.prototype); // un obiect {constructor: f, ecou: f}
console.log('Obiectul prototipal al clasei este', Test.__proto__); // function()
console.log('Constructorul clasei este', Test.__proto__.constructor); // Function()

console.log('Obiectul prototipal al obiectului instanțiat este: ', unTest.prototype); // undefined
console.log('Obiectul prototipal de la care moștenește este: ', unTest.__proto__); // {constructor: f, ecou: f}
console.log('Obiectul prototipal de la care moștenește este: ', unTest.__proto__.constructor); // class Test {...}
```

Pentru a înțelege modelul de investigare din exemplu, trebuie aduse următoarele lămuriri:

- `__proto__` este o proprietate prin care afli care este obiectul prototipal de la care moștenete un obiect.
- `.prototype` indică obiectul creat de la care vor moșteni toate instanțele, nu obiectul prototipal al clasei.

**Moment ZEN**: O clasă generează un obiect care va fi prototipul de la care vor moșteni toate instanțele create.

O clasă poate avea o singură metodă `constructor` care este opțională. Instanțierea se face folosind operatorul `new`. Atenție, obiectul `prototype` al clasei va fi protejat la scriere (**read-only**). Nu se comportă ca în cazul funcțiilor din modelul clasic în care poți adăuga ulterior în obiectul `prototype` proprietăți și metode.

Echivalent lui `constructor (val) {}`, este `function Test (val) { this.val = val }`. Urmează o listă a membrilor viitorului obiect, care menționează direct identificatorul fără cuvântul cheie `function`. Nu a fost folosită nici formula consacrată `Test.prototype.actiune`, rolul acesteia fiind preluat de funcția `constructor`. O clasă poate avea o singură metodă `constructor` care este opțională. Instanțierea se face folosind operatorul `new`. Atenție, obiectul `prototype` al clasei va fi protejat la scriere (**read-only**). Nu se comportă ca în cazul funcțiilor din modelul clasic în care poți adăuga ulterior în obiectul `prototype` proprietăți și metode.

Legătura `this` are un rol central pentru clase pentru că numai așa vei putea accesa metodele și proprietățile clasei. Tot `this` permite înlănțuirea (*chaining* în limba engleză) metodelor unei clase pe obiectul instanțiat. Să te asiguri că acele clase pe care dorești să le înlănțuiești, `this` să fie returnat din metodă la final. Acest lucru trebuie făcut pentru a actualiza valorile obiectului generat cu `new`.

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

**Moment ZEN**: O clasă este o funcție.

Chiar dacă nu ai declarat o funcție `constructor`, aceasta va fi generată din oficiu. Poți verifica acest lucru interogând obiectul prototip al clasei. Posibilitatea de a adăuga proprietăți direct în obiectul prototip încă este posibilă, dar nu este recomandabilă.

### Declarații și expresii de clase

Precum în cazul funcțiilor, clasele pot fi declarate, dar pot fi și expresii. Există un detaliu important care separă declarația claselor de cea a funcțiilor cu rol de constructor: clasele nu beneficiază de hoisting.

#### Declarații și expresii de clasă

##### Declarații de clasă

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

După cum se observă, datele necesare inițializării obiectului sunt pasate clasei prin argumentele constructorului și sunt inițializare apoi în corpul acestuia, prin setarea de variabile interne. Acestea vor deveni tot atâtea proprietăți ale obiectului la momentul instanțierii.

##### Expresie de clasă

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

#### Câmpuri publice ale clasei

Modelul existent care permite popularea cu date a viitorului obiect este prin intemediul constructorului, care, fie primește datele prin argumente, fie aceste câmpuri cu date sunt definite în corpul său.

```javascript
class ButonAcces extends HTMLElement {
  constructor() {
    super();
    this.color = "magenta";
    this._clicked = false;
  }
}

const butonul = new ButonAcces();
// Valorile câmpurilor noului obiect sunt accesibile și pot fi modificate
button.color = "blue";
// chiar și cele care sunt marcate prin convenție ca fiind private
button._clicked = true;
```

De curând, prin ES2022, poți declara variabilele direct în capul clasei, precum în exemplul de mai jos.

```javascript
class ButonAcces extends HTMLElement {
	color = "magenta";
  _clicked = false;
}
```

Câmpurile pot fi declarate a fi statice atunci când dorești ca o anumită proprietate să existe doar în obiectul prototipal, dar nu și în instanțele clasei. Acest lucru poate fi făcut, impunând o proprietate după ce clasa a fost declarată.

```javascript
class Ceva {}
Ceva.campStatic = 42;
```

Mai nou putem face acestă declarație în definiția clasei.

```java
class Ceva {
    static campStatic = 42;
}
```

Dacă dorești ca aceste proprietăți să fie protejate și astfel accesibile doar din interiorul clasei, le vei prefixa cu diez.

```javascript
class Ceva {
    static #campStatic = 42;
}
```

#### Protejarea datelor clasei și noile câmpuri private ale clasei

Prin convenție, programatorii au prefixat proprietățile pe care doreau să le protejeze cu un caracter *underscore* pentru a semnala celorlalți că acea proprietate nu trebuie modificată. Aceasta este doar o indicație, pentru că așa cum se vede din exemplu, proprietățile sunt accesibile instanțelor prin mecanismul de moștenire.

```javascript
class Bonificatie {
  constructor (valoare) {
    this._valoare = valoare;
    this._limită = 3;
  }
  incrementor () {
    this._valoare += 1;
    if (this._valoare >= this._limită) {
      console.log('Bravo, ai trei giurumele!');
    }
  }
}

var instanță = new Bonificatie(3);
instanță.incrementor(); // Bravo, ai trei giurumele!

console.log(Object.keys(instanță)); // ["_valoare", "_limită"]
```

O altă metodă întâlnită este protejarea datelor folosind un `WeakMap` pentru fiecare dintre ele.

```javascript
const _valori = new WeakMap();
const _faCeva = new WeakMap();

class Bonificatie {
  constructor (valoare, faCeva) {
    _valori.set(this, valoare);
    _faCeva.set(this, faCeva);
  }
  incrementor () {
    let valoare = _valori.get(this);
    valoare += 1;
    _valori.set(this, valoare);
    if (valoare >= 3) {
      _faCeva.get(this)();
    }
  }
}

function facCeva () {
  console.log('Felicitări pentru giurumele!');
}

var instanță = new Bonificație(3, facCeva);
instanță.incrementor(); // Felicitări pentru giurumele!

console.log(Object.keys(instanță)); // []
```

Noile modificări ale standardului prevăd posibilitatea de a crea câmpuri **private**. Declararea acestora se face prin prefixarea identificatorului cu un diez (`#`).

```javascript
class ButonAcces extends HTMLElement {
  color = "magenta";
  #clicked = false;
}
const butonul = new ButonAcces();
butonul.#clicked = true; // Cannot be assigned a value from outside
```

O astfel de protecție se poate aplica și la metode, precum și accesorilor.

```javascript
class ButonAcces extends HTMLElement {
    color = "magenta";
    #contor = 0;
    #mesaj = "Bine ai venit!";

    get #contor() {return #contor}
    set #contor(valoare) {this.#contor = valoare}

    get #mesaj() {return #mesaj.toUpperCase()}
  	set #mesaj(text) {this.#mesaj = text.trim()}

    constructor () {
        super();
        this.onmouseover = this.#mouseover.bind(this);
    }

  	#mouseover() {
    	this.#contor = this.#contor++;
    	this.#mesaj = `Ai accesat de ${this.#contor} ori.`
  	}
}
const butonul = new ButonAcces();
```

#### Clasele sunt valori de prim-rang

Clasele pot fi pasate drept valori funcțiilor. Funcțiile pot returna clase ca adevărate factory-uri (*Factory* este un șablon care *fabrică* obiecte).

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

### Metodele unui clase

În interiorul clasei pot fi declarate funcții care joacă rolul metodelor în momentul în care se creează o instanță, adică un nou obiect. Metodele sunt create folosind numele identificatorului fără a mai fi necesar să menționezi cuvântul cheie `function`.

#### Folosirea unei metode în alt context

În momentul când ai nevoie de a folosi o metodă care oferă o anumită modalitate de a prelucra datele, dar într-un alt context, „desprinderea” de obiect conduce la pierderea legăturii la acesta prin `this`. Să examinăm următorul exemplu:

```javascript
class Cineva {
  constructor (nume) {
    this.nume = nume;
  }
  cineSunt() {
    console.log(this.nume);
  }
}
const Alina = new Cineva('Alina');
```

Dacă vom „reutiliza” metoda `cineSunt` a noului obiect `Alina`, într-un context diferit, de exemplu, din postura de *callback*, `this` nu va indica mediul obiectului așa cum poate că logica ar dicta-o.

```javascript
setTimeout(Alina.cineSunt, 1000); // returnează `undefined`
```

Pentru a face o „reconectare”, trebuie folosit `bind()`. Adu-ți mereu aminte de faptul că funcțiile sunt etități distincte care se execută în contexte diferite. Ele nu *aparțin* unui obiect chiar dacă au fost definite ca metode ale acestuia.

```javascript
setTimeout(Alina.cineSunt.bind(Alina), 1000);
```

#### Metodele statice

Metodele statice există doar în corpul clasei și nu pot fi apelabile din obiectele create. O metodă statică este echivalentul adăugării unei metode unei funcții.

```javascript
function Ceva () {};
Ceva.oMetodaStatica = function () {};
```

**Moment ZEN**: Metodele statice nu sunt disponibile în obiectele instanțiate.

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

Dacă dorești ca aceste proprietăți să fie protejate și astfel accesibile doar din interiorul clasei, le vei prefixa cu diez.

```javascript
class Ceva {
    static #facUnCalcul (val) {
    	return 42 - val;
	};
	static altCalcul (val) {
    	return #facUnCalcul(val);
	}
}
console.log(Ceva.altCalcul(10)); // 32
```

#### Accesori și încapsulare

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

##### Getteri și setteri

Cu ajutorul accesorilor se poate comunica direct cu proprietățile obiectului instanțiat în baza clasei.

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
const obi = new AccesibilDeAfara('miau');
obi.elem; // val: miau
obi['elem'] = 12; // val: 12
```

Un alt lucru important pe care getteri și setterii îl pot oferi este o încărcare a valorilor care rezultă dintr-o computație ce taxează resursele. Vorbim de un adevărat mecanism de încărcare întârziată (*lazy-loading property pattern*). Pentru valorile care apar în urma unei computații, nu este util să introduci în constructor taxarea. Motivul este legat de faptul că proprietățile care se vor reflecta în obiectele care vor fi instanțiate, este posibil să nu fie folosite, dar efortul de calcul a fost deja făcut.

```javascript
class Test {
  constructor () {
    this.valoareComputată = oFunctieCareFaceIO(); // ineficient
  }
}
```

Rezolvarea este folosirea getterilor și setterilor. Vom explora o soluție pe care o propune Nicholas C. Zakas privind *amânarea* momentului computației până când valoarea este solicitată. Zacas explică faptul că un pas înainte față de calcularea valorii în constructor, ar fi obținerea acestei doar când valoarea este cerută printr-un getter.

```javascript
class Test {
  get valoarea() {
    return oFunctieCareFaceIO();
  }
}
```

Chiar și așa, dacă valoarea este cerută destul de des, se va performa același calcul și acest lucru conduce la necesitatea creării unui pas suplimentar. Acest pas constă în crearea unui mecanism de caching din care să fie servită valoarea la momentul ulterioarelor cereri.

```javascript
class Test {
  get date() {
    const dateComputate = oFunctieCareFaceIO();
    // caching
    Object.defineProperty(this, 'date', {
      value:        dateComputate,
      writable:     false,
      configurable: false,
      enumerable:   false
    });
    return dateComputate;
  }
}
const obiect = new Test();
let date1 = obiect.date(); // apelează getter-ul
let date2 = obiect.date(); // citește din cache valoarea
```

Ceea ce se petrece este că după prima calculare a valorii proprietății `date`, la următoarea solicitare, este oferită valoarea care deja a fost calculată stocată în proprietatea creată. O problemă a acestui model este că proprietatea `data` este creată ca non-enumerable, dar la primul apel, devine `enumerable`.

```javascript
const obiect = new Test();
console.log(object.hasOwnProperty("date")); // false

let date1 = obiect.date(); // apelează getter-ul
console.log(object.hasOwnProperty("date")); // true
```

Mai există cazul în care dorești ca proprietatea calculată să existe doar în instanță.

```javascript
class Test {
  constructor () {
    // referință către obiect
    const instanță = this;

    // Mecanism de caching la nivel de instanță!!!
    Object.defineProperty(this, 'date', {
      // definire accesor
      get () {
        const dateComputate = oFunctieCareFaceIO();
        // redefinirea proprietății `date` la nivelul obiectului instanțiat
        Object.defineProperty(instanță, 'date', {
          value:        dateComputate,
          writable:     false,
          configurable: false
        });
        return dateComputate;
      },
      configurable: true,
      enumerable:   true
    });
  }
}
```

Constructorul creează proprietatea accesor `date`. Această proprietate este creată la nivelul instanței, fiind folosită legătura `this`. Proprietatea de la nivelul instanței este creată folosind `Object.defineProperty`, dar fiind atenți să permitem configurarea plus enumerable. Faptul că setăm proprietatea a fi `configurable`, ne va permite să o *configurăm* mai departe aplicând `Object.defineProperty`.

Pentru că în interiorul funcției `get`, legătura `this` se face la obiectul în care a fost declarată, nu la cel instanțiat în baza clasei. Din acest motiv avem nevoie de puntea lexicală `const instanță = this;`. Ceea ce se întâmplă este o redefinire a proprietății `date` care are acum o valoare fixă ce nu poate fi suprascrisă sau configurată pentru a o proteja. Prima dată când valoarea este cerută, este calculată și apoi servită ori de câte ori este necesar.

Ceea ce este foarte util este faptul că proprietățile vor aparține doar instanțelor.

```javascript
const obiect = new Test();
console.log(object.hasOwnProperty("date")); // true

let date1 = obiect.date(); // apelează getter-ul
console.log(object.hasOwnProperty("date")); // true
```

### Mediul lexical

Clasele creează propriul mediu lexical la fel cum o fac și funcțiile.

```javascript
var externa = {
  cici: 10
};
var fixă = 'piatră';

class Ceva {
  constructor () {
    this.martor = 10000;
    this.x = externa;
    this.y = fixă;
  }
  // get x () {
  //   return this.x;
  // }
  // set x (val) {
  //   this.x = val;
  // }
}

let a = new Ceva();
// console.log(a.x); //?
console.log("interna `martor` este ", a.martor, " iar `externa` este: ", a.x);
externa.cici = 'bau', fixă = 'apă';
console.log("`x` este ", a.x, " iar `y` este: ", a.y);
```

În exemplul de mai sus este observabil faptul că o clasă instanțiată creează un obiect care încă va fi conectat la mediul lexical al funcției cu rol de clasă. Ceea ce trebuie reținut este că valorile atribuite direct unei variabile, vor păstra valoarea așa cum era la momentul instanțierii obiectului. Orice modificare ulterioară nefiind oglindită prin modificarea valorii interne. Totuși, dacă se face legătura la un obiect, valorile proprietăților acestuia pot fi modificate. Aceste modificări se vor reflecta și în valorile referințelor din obiect.

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
Părinte.prototype.oriDoi = function () {
  return this.statica * 2;
};
function Copil (deinmultit) {
  Părinte.call(this, deinmultit);
};
Copil.prototype = Object.create( Părinte.prototype, {
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

Am stabilit faptul că prototipul este setat automat la obiectul prototip al constructorului părinte. Constructorul părintelui poate fi accesat folosind metoda `super()`. În clasele derivate, `super()` trebuie apelat înainte de a folosi `this` în funcția constructor a copilului. Acest lucru trebuie făcut pentru a seta o linie directă de moștenire cu proprietățile constructorului clasei părinte. Regula ar fi ca datele necesare alimentării părintelui pentru operațiunile sale interne, să le trimiți prin `super(arg1, arg2, etc)`. Ce este nevoie copilului, setezi prin `this`. Adu-ți mereu aminte că prin moștenire vei avea mereu acces la datele și metodele părintelui.

```javascript
class Parinte {
  constructor (val) {
    this.ceva = val;
  }

  oriDoi () {
    return this.ceva * 2;
  }
};

class Copil extends Parinte {
  constructor (val) {
    super(val);
    this.altceva = 10;
  }
};
const inmultire = new Copil(2);
inmultire.oriDoi(); // 4
console.log(inmultire instanceof Copil);   // "true"
console.log(inmultire instanceof Părinte); // "true"
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

let copil1 = new Copil("banane", "pere");
copil1.afișare();

class AltCopil extends Parinte {
  constructor (undeva, cândva){
    super("România");
    this.undeva = undeva;
    this.cândva = cândva;
  }
  afișare () {
    return this.cândva + " voi merge la " + this.undeva + ", " + this.valoare;
  }
}

let copil2 = new AltCopil("Bacău","în iarnă");
```

### Accesarea din părinte a proprietăților copiilor

Să presupunem că avem drept scenariu un obiect copil care pe lângă proprietățile părintelor la care are acces, va declara propriile proprietăți. Uneori vom avea clase părinte care să aibă declarate metode sau operațiuni de evaluare în care să intre proprietăți ale copiilor în cazul în care acestea există. Este și cazul exemplului de mai jos, unde părintele are acces la valorile proprietăților declarate în copil și poate face evaluarea expresiei fără probleme. În `super` alimentezi cu valori păritele conform semnăturii constructorului său. Ce este suplimentar, va fi declarat în mod obișnuit cu `this.numeProprietateNouă`.

```javascript
class Ceva {
  constructor({a, b}) {
    this.a = a;
    this.b = b;
    this.h = {salut: "Sunt părintele!"}
    this.x = "setată în părinte"
  }
  accesez () {
    console.log(this.a, this.b, this.c, this.x, this.h); // 10 20 {x: 1000} 'devine ceva al copilului'
    return `${this.a}, ${this.b}, ${this.c.x}, ${this.x}, ${JSON.stringify(this.h)}`;
  }
}

class Altceva extends Ceva {
  constructor ({a, b, c}) {
    super({
      a: a,
      b: b
    });
    this.c = c;
    this.x = "devine ceva al copilului"
    this.h.bau = "Eu sunt copchilul";
  }
}

let obi = {
  a: 10,
  b: 20,
  c: {x: 1000}
}

let eAltceva = new Altceva(obi);
console.log(eAltceva.accesez()); // 10, 20, 1000, devine ceva al copilului {"salut":"Sunt părintele!","bau":"Eu sunt copchilul"}
```

Un astfel de scenariu este util atunci când lucrezi cu obiecte care sunt setate conform unor obiecte simple de configurare pe care le pasezi la momentul instanțierii copiilor.

### Moștenirea din obiecte simple

Când este necesar, se poate seta obiectul prototipal al clasei la un obiect preexistent pentru a se putea moșteni proprietăți ale acestuia.

```javascript
const Părinte = {
  ceva: 10,
  măPrezint () {
    return `Sunt ${this.nume}, un animățuț de nota ${this.ceva}`;
  }
};

class Iepuraș {
  constructor (nume) {
    this.nume = nume;
  }
}

// Aici preluăm proprietțile lui `Părinte`
Object.setPrototypeOf(Iepuraș.prototype, Părinte);

let unIepuraș = new Iepuraș("Cici");
console.log(unIepuraș.măPrezint());
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

În utilizarea claselor se poate dovedi utilă folosirea simbolurilor drept identificatori. Adu-ți aminte faptul că simbolurile nu pot fi modificate și sunt unice.

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

## Mantre

-   Spre deosebire de funcții, declarația de clasă nu beneficiază de mecanismul de hoisting indiferent că este o declarație sau o expresie de clasă. Deci, până când execuția nu ajunge la locul declarației, clasa se află în Temporal Dead Zone (TDZ).
-   Tot codul din clasă rulează automat în `strict mode`.
-   Toate metodele create sunt automat non-enumerabile.
-   Apelarea constructorului fără `new` conduce la o stare de eroare.
-   Numele clasei nu trebuie folosit în interiorul acesteia pentru o reatribuire. Conduce la eroare.
-   În cazul folosirii expresiilor de clasă, nu este necesară introducerea unui identificator după cuvântul cheie `class`.
-   `super()` setează legătura la `this` în cazul claselor derivate. Dacă folosești constructorul, adu-ți mereu aminte să invoci mai întâi de toate `super()`.
-   clasele permit moștenirea din toate obiectele built-in: `class ArraySpecial extends Array {}`.

## Resurse

- [14.6 Class Definitions | ECMAScript® 2021 Language Specification | Draft ECMA-262 / September 7, 2020](https://tc39.es/ecma262/#sec-class-definitions)
- [Classes | JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [JS classes are not “just syntactic sugar” | Andrea Giammarchi | medium.com](https://webreflection.medium.com/js-classes-are-not-just-syntactic-sugar-28690fedf078)
- [The lazy-loading property pattern in JavaScript | Nicholas C. Zakas | humanwhocodes.com](https://humanwhocodes.com/blog/2021/04/lazy-loading-property-pattern-javascript/)
- [Private class features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
- [Working with private class features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_With_Private_Class_Features)
- [SOLID | Wikipedia](https://en.wikipedia.org/wiki/SOLID)
- [Barbara Liskov | Wikipedia](https://en.wikipedia.org/wiki/Barbara_Liskov)
- [Abstract data type | Wikipedia](https://en.wikipedia.org/wiki/Abstract_data_type)
