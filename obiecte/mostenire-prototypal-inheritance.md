# Moștenirea prototipală

JavaScript nu are un mecanism clasic de moștenire așa cum este așteptat în cazul tipic al moștenirii unei clase copil a caracteristicilor clasei părinte. O copiere a caracteristicilor, după care nu mai există nicio relație la instanțierea într-un obiect, nu există în JavaScript. Mereu va exista o legătură în Javascript între obiecte.

De fapt, se poate vorbi de o „delegare comportamentală” și nu de o moștenire în sensul clasic. Obiectele stabilesc legături prototipale prin care se pot face delegări pe lanțul prototipal.

## Spune standardul

Toate obiectele comune au „un slot intern” numit `[[Prototype]]`.

Valoarea acestui slot poate fi `null` sau un obiect care realizează moștenirea prototipală.

`Object.getPrototypeOf()` returnează valoarea din proprietatea internă `[[Prototype]]` iar `Object.setPrototypeOf()` o schimbă.

Toate obiectele comune au „un slot intern” numit `[[Extensible]]`, care controlează dacă pot fi adăugate sau nu proprietăți la obiect. Dacă valoarea acestui slot este `false`, atunci nu se mai pot adăuga proprietăți noi.

Legătura cu `[[Prototype]]` este aceea că în cazul unui `[[Extensible]]` cu valoare `false`, valoarea slotului intern `[[Prototype]]` a obiectului, nu poate fi modificată. În plus, de vreme ce a fost pusă pe `false`, nu o mai poți modifica la `true`.

## Mantre

- [[Prototype]], adică proprietatea .prototype este o legătură care se stabilește de la un obiect la altul.
- Legătura prototipală se obține legătura prin Object.create() și are două efecte:
  1. **creează un obiect**,
  2. **stabilește legătura prototipală**.
- Legătura prototipală se obține și prin efectul al doilea al folosirii cuvântului cheie `new`.
- Legătura prototipală creează un lanț de delegare pentru cazurile în care nu găsești o proprietate sau o metodă într-un anumit context de execuție.
- Mecanismul pe care-l realizează `prototype` este unul de delegare a cererii pentru referința unei proprietăți sau metode către un obiect mai sus pe lanțul prototipal către un alt obiect.
- relațiile prototipale pot cauza probleme atunci când este nevoie de enumerarea proprietăților obiectelor. Crockford recomandă „ambalarea” conținutului buclei de ciclare într-o funcție de verificare `hasOwnPropery()`;

## Inspecție și inventar

1. Află dacă un obiect este prototipul unui altuia: `ObiectInvestigat.prototype.isPrototypeOf(obiectulBanuitAFiPrototipul)`.
2. Află care obiect este prototipul pentru cel investigat: `ObiectDeLucru.__proto__` sau folosind `Object.getPrototypeOf(ObiectDeLucru)`.

## Moștenirea prototipală cu exemple

### Prototip gol

Crearea unui obiect al cărui prototip este gol.

```javascript
let matrita = Object.create({}, {ceva: {value: 1}});

Object.getPrototypeOf(obiect); // Object {  } prototipul este gol

// Obiectele care vor fi create în baza lui matrita, var avea un prototip gol
var obiect2 = Object.create(
  Object.getPrototypeOf(matrita),
  Object.getOwnPropertyDescriptors(matrita)
);

Object.getPrototypeOf(obiect2); // Object {  } prototipul este gol
```

### Crearea unui obiect literal

Prin crearea directă a unui obiect literal, se generează o legătură automată către prototipul impus de `Object.prototype`

```javascript
let matrita = {ceva: 1};
Object.getPrototypeOf(matrita); // Object { , 15 more… }
Object.getPrototypeOf(matrita) === Object.prototype; // true
```

### Clonarea obiectelor și moștenirea prototipului de către clonă

```javascript
let obiect = {
  ceva: 10,
  faCeva: function(){
    console.log('Salut!');
  }
};
Object.getPrototypeOf(obiect2); // Object { , 15 more… } de fapt Object.prototype

let obiect2 = Object.create(
  Object.getPrototypeOf(obiect),
  Object.getOwnPropertyDescriptors(obiect)
);

Object.getPrototypeOf(obiect2); // Object { , 15 more… }
Object.getPrototypeOf(obiect2) === Object.prototype; // true
```

## Apelarea unei metode din `prototype`

```javascript
Object.getPrototypeOf(this).numeMetodaDinPrototip.call(this); // varianta ES5
super.numeMetodaDinPrototip() // varianta ES6
```

### Cazul constructorilor

Pentru a realiza tu un prototip după care vei contrui alte obiecte ce vor „moșteni” proprietăți, te vei folosi de o funcție. În `this` al funcției vei introduce proprietățile pe care dorești să fie moștenite mai departe. Este cazul constructorului.

```javascript
let Matrita = function(){
  this.ceva = 10;
  this.faCeva = function(){
    console.log('Fac ceva!');
  };
};
// Object.getPrototypeOf(Matrita) => Object { , 15 more… }
// Matrita.__proto__ => Object { , 15 more… }

let produs = new Matrita(); // typeof produs => "object"

Matrita.prototype.isPrototypeOf(produs); // true
Object.getPrototypeOf(produs); // Object { , 1 more… }
```

### Introducerea de proprietăți în prototipul unui obiect gol - obiect literal

Acesta este cazul simplu de moștenire care se poate realiza. Dacă avem un obiect, folosești metoda create a obiectului intern Object.

```javascript
let obiect = {};
Object.getPrototypeOf(obiect);

Object.setPrototypeOf(obiect, {ceva: 10});
// Object.getPrototypeOf(produs2) => Object { ceva: 10 }
```

### Folosirea unui constructor și adăugarea direct în `prototype`

```javascript
let Matrita = function(date){
  this.ceva = 10;
  this.date = date;
};

let obiect = new Matrita("ceva date"); // Object { ceva: 10, date: "ceva date" }
// în acest moment prototipul lui obiect este Object.prototype (Object { , 15 more… })

Object.setPrototypeOf(obiect, {surpriza: true});
// în acest moment Object.getPrototypeOf(object) este Object { surpriza: true }
```

Atenție! Este preferabilă folosirea lui `Object.create` pentru a crea un obiect și pentru a seta prototipul.

### Setarea directă a prototipului unui obiect generat cu un constructor

#### Cazul simplu - modificarea obiectului prototype

```javascript
function BenziDesenate(titlu){
  this.tip = "aventuri";
  this.titlu = titlu;
  this.identificare = function(){
    return `Acum citești ${titlu}, care este de ${this.tip}`
  };
};

let rahan = new BenziDesenate("Rahan");

console.log(rahan.identificare()); // Acum citești Rahan, care este aventuri

BenziDesenate.prototype.apreciere = function () {
  return `Sunt un mare fan ${this.titlu}`;
};

rahan.apreciere();
```

#### Cazul în care o funcție cu rol de constructor la invocarea cu new devine obiect, dare este setat drept prototipul altui obiect.

```javascript
function Matrita(){
  this.vesela = true;
  this.faCeva = function(){
    console.log('Obiecte de veselă');
  };
}; // Object.getPrototypeOf(Matrita) => function ()
// Matrita.prototype.__proto__ => Object { , 15 more… } (adica Object.prototype)

function obiect(material){
  this.dimensiune = 10;
}; // Object.getPrototypeOf(obiect) => function ()

obiect.prototype = new Matrita(); // setezi prototipul la valoarea obiectului generat de constructor
obiect.prototype.contructor = obiect;
// obiect.prototype => Object { vesela: true, faCeva: Matrita/this.faCeva(), contructor: obiect() }

let farfurie = new obiect('porțelan');
console.log(farfurie.vesela); // true
// farfurie.__proto__ => Object { vesela: true, faCeva: Matrita/this.faCeva(), contructor: obiect() }
```

Atenție! Valorile din prototip nu pot fi modificate, dar pot fi suprascrise în obiectul care le moștenește pentru că, de fapt, devin a lor.

Prototipul obiectului șablon poate fi modificat pentru ca toate obiectele moștenite să aibă acces la noile proprietăți.

În final, avem exemplul propus de Kyle Simpson care este ceva mai elaborat.

```js
function Foo(who){
  this.me = who;
}

Foo.prototype.identify = function(){
  return "Eu sunt " + this.me;
}

function Bar(who){
  Foo.call(this, who);
}

Bar.prototype = Object.create(Foo.prototype);
// se creează legătura între prototipuri
// .constructor dispare și delegarea pentru .contructor se face la Foo()

Bar.prototype.speak = function(){
  alert("Salut " + this.identify() + ".");
}

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak();
b2.speak();
```

## Lanțul prototipal

![Delegare comportamentală simplă](Prototype.svg "Lanțul prototipal")

## Delegarea comportamentală

![Modelul delegării comportamentale](PrototypeExtindere.svg "Delegare comportamentală simplă")
