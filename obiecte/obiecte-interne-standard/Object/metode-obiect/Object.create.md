# Object.create()

Este o metodă propusă de Douglas Crockford. Aceasta creează un obiect nou cu un prototip și proprietăți specificate.
Permite atribuirea directă a unui prototip unui obiect eliberând prototipul de legătura cu, constructorul.

Metoda primește doi parametri:

- obiectul la a cărui prototip se va lega obiectul nou creat
- și al doilea, opțional poate primi proprietățile pentru noul obiect, dacă un acest scenariu este urmărit de programator.

Este returnat un obiect nou care are prototipul setat la obiectul care a fost menționat.

```javascript
var obiect = Object.create(null);
// spuf! un obiect nou fără moștenire
var obiect = {};
// zbang! alt obiect, dar care are moștenire
// declararea unui obiect cu forma literală este
// echivalent cu expresia de mai jos:
var obiect = Object.create(Object.prototype);
```

O formulă echivalentă în realizarea unui obiect față de ceea ce face operatorul `new` este posibilă prin menționarea drept obiect prototipal a obiectului prototipal al unui alt constructor.

```javascript
function Constructor() {};
var obi = new Constructor();
// este echivalent cu:
var obi = Object.create(Constructor.prototype);
```

Folosind metoda, poți chiar modifica obiectul de la care se va face moștenirea proprietăților dorite a fi preluate.

```javascript
var obi = {x: 'ceva'};
var o = Object.create(obi);
o.__proto__; // { x: "ceva" }
```

Ba chiar poți face o clonă după un obiect.O astfel de construcție este posibilă, dar nu este recomandată pentru că implică complexități greu justificabile în practică.

```javascript
let obi = {
  prima: 10,
  aDoua: function(){console.log("Salut!");}
};
var obi2 = Object.create(
  Object.getPrototypeOf(obi),
  Object.getOwnPropertyDescriptors(obi)
);
```

## Definirea proprietăților cu set și get

Dacă ai nevoie de un control în cele mai mici detalii a procesului de construcție a unui obiect, metoda `Object.create()` oferă această posibilitate. Pentru aceasta, vei folosi unui obiect specializat în descrierea detaliilor proprietăților dorite. Acest obiect este opțional, dar este același pe care îl vei folosi atunci când dorești utilizarea lui `Object.defineProperties`.

Mai întâi de toate, trebuie să povestim despre practica de **incapsulare**, care este principiul de bază al lucrului cu obiectele. De cele mai multe ori, proprietățile unui obiect trebuie să permită o flexibilitate în ceea ce privește valorile sale, adică, limbajul să pună la îndemâna programatorului instrumentele de a introduce o valoare și de a o accesa prompt. Hai să pornim de la un exemplu simplu. Să presupunem că avem o funcție care va îndeplini rolul unui constructor. Acest constructor are două proprietăți. Una care primește o valoare la instanțierea obiectului și alta care are nevoie să fie actualizată constant.

```javascript
function Vehicul (acceleratie) {
  var _acceleratie = acceleratie, _viteza = 0;
  this.getViteza = function () { return _viteza; };
  this.setViteza = function (valoare) { _viteza = valoare };
};
var automobil = new Vehicul(10);
```

Observă faptul că proprietățile `_acceleratie` și `_viteza` sunt pur și simplu **ascunse** atunci când ai generat obiectul. Dar ai creat mijloacele de a le accesa. Chiar există o notație specifică întărită prin convenții de practică: un caracter underscore (`_`) în fața identificatorului înseamnă că ai de-a face cu o variabilă privată.

Pentru a rezolva mai elegant, ne-a fost pus la dispoziție posibilitatea de a specifica mecanismul de actualizare și de extragere a valorii printr-un obiect descriptiv de accesare a unei proprietăți (**accessor descriptor**). Știind aceste detalii, să vedem cum arată exemplul nostru.

```javascript
var obi = Object.create(Object.prototype, {
  _acceleratie: {writable: true, configurable: true, value: 0},
  acceleratie: {
    configurable: false,
    get: function () { return this._acceleratie},
    set: function (valoare) { this._acceleratie = valoare }
  }
});
```

Ceea ce este ușor de observat este faptul că am pasat drept prim parametru obiectul cu rol de prototip. Am specificat înadins obiectul prototip al lui `Object`, ceea ce va asigura moștenirea prototipală de la acesta ca și în cazul unui obiect literal așa cum am văzut într-un exemplu mai sus.
Am transformat un câmp de date al unui obiect într-o proprietate, care are viață, care este dinamică. Ceea ce trebuie adăugat este faptul că funcțiile menționate la `set` și la `get` pot fi dezvoltate mai mult decât elemente de acționare a datelor. Poate fi dezvoltată logică transformatoare a datelor la intrare și la ieșirea din proprietate.

În această poveste faină există o mică problemă. Ce se întâmplă în momentul în care dorești să actualizezi o proprietate, dar din grabă scrii greșit numele proprietății? Răspunsul neplăcut este că se creează una nouă cu numele celei scrise greșit. O rezolvare ar fi sigilarea obiectului cu `Object.seal`.

Din start, nicio proprietate nu este nici `writable`, nici `enumerable` și nici `configurable`:

```javascript
var obi = Object.create({},{
  x : {value: 1000}
});

obi.x; // 1000
obi.x = 2000;
obi.x; // 1000
delete obi.x; // false
```

Pentru a opera totuși cu valorile proprietăților, va trebui să menționăm explicit valorile de adevăr ale cheilor obiectelor cu rol de descriptor.

```javascript
var obi = Object.create({},{
  x : {
    value: 1000,
    writable: true,
    configurable: true,
    enumerable: true
  }
});
```

Trebuie făcută o mențiune aici că poți realiza același lucru folosind și metoda `Object.defineProperty`, care este și mai granulară privind modul de setare al descriptorilor, fie aceștia date, fie accesori (get / set).

Cu ajutorul lui `Object.create` poți face legătura directă la prototipul unui obiect. Este șablonul propus de Kyle Simpson - Object Linked To Other Objects

```javascript
var Foo = {};
var Bar = Object.create(Foo);
var Far = Object.create(Bar);
```

## Referințe

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
https://nemisj.com/why-getterssetters-is-a-bad-idea-in-javascript/
https://stackoverflow.com/questions/18524652/how-to-use-javascript-object-defineproperty
