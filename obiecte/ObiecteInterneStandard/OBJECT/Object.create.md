# Object.create()

Este o metodă care creează un obiect nou cu un prototip și proprietăți specificate.
Permite atribuirea directă a unui prototip unui obiect eliberând prototipul de legătura cu, constructorul.

Metoda primește doi parametri:
- obiectul la a cărui prototip se va lega obiectul nou creat
- opțional poate primi și parametri pentru noul obiect.

Este returnat un obiect noi care are prototipul setat la obiectul care a fost menționat.

```js
var obiect = Object.create(null); // are drept efect crearea unui obiect nou.
// Object.getPrototypeOf(produs2) => null. Atenție! Prototipul este null

var obiect = {};
// declararea unui obiect cu forma literală este echivalent cu expresia de mai jos care are același efect:
var obiect = Object.create(Object.prototype);
```

Adăugarea proprietăților în obiectul nou creat se poate face pasând cel de-al doilea parametru:

```js
var obiect = Object.create(Object.prototype, {
  oProprietate : {writable: true, configurable: true, value: 'ceva'},
  oMetoda : {
    configurable : false,
    get : function(){return 'rezultatul evaluării metodei'},
    set : function(ceva){console.log('Setarea metodei obiect.oMetoda cu valoarea ', ceva);}
  }
});
```

## Cazul unui constructor

```js
function Constructor() {};

var object = new Constructor();
// este echivalent cu:
var object = Object.create(Constructor.prototype);
```

Din start, nicio proprietate nu este nici `writable`, nici `enumerable` și nici `configurable`:

```js
var obi = Object.create({},{
  x : {value: 1000}
});

obi.x; // 1000
obi.x = 2000;
obi.x; // 1000
delete obi.x; // false

// pentru a putea opera cu valorile
var obi = Object.create({},{
  x : {
    value: 1000,
    writable: true,
    configurable: true,
    enumerable: true
  }
});
```

Cu ajutorul lui Object.create poți face legătura directă la prototipul unui obiect. Este șablonul propus de Kyle Simpson - Object Linked To Other Objects

```js
var Foo = {};

var Bar = Object.create(Foo);

var Far = Object.create(Bar);
```

## Crearea unei clone de obiecte folosind Object.create()

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
