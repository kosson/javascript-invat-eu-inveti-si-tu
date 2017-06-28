# `Object.create()`

Este o metodă propusă de Douglas Crockford. Aceasta creează un obiect nou cu un prototip și proprietăți specificate.
Permite atribuirea directă a unui prototip unui obiect eliberând prototipul de legătura cu, constructorul.

Metoda primește doi parametri:
- obiectul la a cărui prototip se va lega obiectul nou creat
- și al doilea, opțional poate primi propritățile pentru noul obiect.

Este returnat un obiect nou care are prototipul setat la obiectul care a fost menționat.

```javascript
var obiect = Object.create(null); // spuf! un obiect nou
var obiect = {};
// declararea unui obiect cu forma literală este
// echivalent cu expresia de mai jos:
var obiect = Object.create(Object.prototype);
```

Adăugarea proprietăților în obiectul nou creat se poate face pasând cel de-al doilea parametru. Acesta este un obiect de configurare a cărui chei vor deveni proprietățile obiectului nostru, iar fiecare cheie are ca valoare câte un obiect descriptor cu setările pentru valoarea viitoarei proprietăți.

TODO: Clarifică exemplul!

```javascript
var obiect = Object.create(Object.prototype, {
  oProprietate : {writable: true, configurable: true, value: 'ceva'},
  oMetoda : {
    configurable : false,
    get : function(){
      return 'rezultatul evaluării metodei: ' + this.oProprietate;
    },
    set : function(ceva){
      console.log('Setarea metodei obiect.oMetoda cu valoarea ', ceva);
    }
  }
});
obiect.oMetoda = "salut";
console.log(obiect.oMetoda); // rezultatul evaluării metodei
```

## Cazul unui constructor

```javascript
function Constructor() {};
var obi = new Constructor();
// este echivalent cu:
var obi = Object.create(Constructor.prototype);
```

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

## Crearea unei clone de obiecte folosind Object.create()

O astfel de construcție este posibilă, dar nu este recomandtă pentru că necesită o complexitate care cu greu își va găsi reflexia în practică.

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
