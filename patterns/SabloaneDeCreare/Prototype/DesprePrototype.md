# Prototype pattern - șablonul prototype

Este folosit pentru a crea obiecte pe baza unui șablon a unui obiect deja existent folosind lanțul prototipal.
Sunt create obiecte care devin prototipuri pentru alte obiecte. Obiectul prototip în sine este un plan de construcție a noului obiect.

## Dependințe cognitive
- funcții
- obiecte
- lanț prototipal / delegare prototipală

## Mantre

- atunci când definim o funcție într-un obiect, acestea sunt, de fapt, referințe (toate obiectele copil, vor pointa către aceleași funcții)
- Nu există decât un singur lanț prototipal pe care se face delegarea. Un obiect nu poate delega decât către un singur utilitar.
- Nu mai există constructori în acest model. Totul se deleagă la utilitar.

Implementarea lui șablonului Prototype fără a folosi Object.create().

```js
var prototipDeVehicul = {
  init: function (model) {
    this.model = model;
  },
  getModel: function () {
    console.log('Modelul este ' + this.model);
  }
};

function vehicul(model) {
  function F() {};
  F.prototype = prototipDeVehicul;
  var f = new F();
};

f.init(model);
return f;

var car = vehicul('Ford Escort');
car.getModel();
```

Implementarea șablonului Prototype folosind Object.create().

```js
var vehicul = {
  getModel: function () {
    console.log('Modelul este: ' + this.model);
  }
};

var car = Object.create(vehicul, {
  // Sintaxa este similară cu Object.defineProperties și Object.defineProperty
  'id': {
    value: 'ISS - 01',
    enumerable: true
    // writable:false, configurable:false by default
  },
  'model': {
    value: 'Stație spațială',
    enumerable: true
  }
});

car.getModel(); // Modelul este: Stație spațială
```
