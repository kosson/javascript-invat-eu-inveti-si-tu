# JavaScript nu are clase

Pentru cei care doresc forțarea conceptului de clasă, se pot folosi de funcții.

## Modul de a crea o clasă - studiu

### Funcție simplă

```js
function VehiculSpatial(identificator){
  this.id = identificator;
  this.functie = '';
  this.an = '';
  this.prezentare = function(){
    return this.id + " " + this.an;
  };
};

var Santinel = new VehiculSpatial('Santinel');

Santinel.functie = 'satelit';
Santinel.an = 2015;
console.log(Santinel.prezentare());

// ca deficiență, funcția care joaca rol de metodă, este recreată
// ori de câte ori este creat un nou obiect prin new
```

### Funcție simplă care are metode adăugate direct la prototip

```js
function VehiculSpatial(identificator){
  this.id = identificator;
  this.functie = '';
  this.an = '';
};

VehiculSpatial.prototype.prezentare = function(){
  return this.id + " " + this.an;
};

var Santinel = new VehiculSpatial('Santinel');

Santinel.functie = 'satelit';
Santinel.an = 2015;
console.log(Santinel.prezentare());
```

### Folosirea unui obiect literal (în fapt, un Singleton)

```js
var VehiculSpatial = {
  id: '',
  functie: '',
  an: '',
  prezentare: function(){
    return this.id + " " + this.an;
  }
};
VehiculSpatial.id = 'Santinel';
VehiculSpatial.functie = 'satelit';
VehiculSpatial.an = 2015;
console.log(VehiculSpatial.prezentare());
```
