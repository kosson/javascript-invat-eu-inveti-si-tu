# Builder

Scopul acestui șablon este acela de a separa obiectele complexe de reprezentarea lor. Pe baza obiectului complex ar trebui să se poată crea diferite reprezentări.


```javascript
function VehiculSpatial () {
  this.reactor = 'ataseaza un reactor';
};

VehiculSpatial.prototype.ghideaza = function () {
  this.inclinatie = 0;
  this.ajustare = function () {
    if(inclinatie !== 0) {
      console.log('ajustez ');
    }
  };
};

function CreeazaStatieOrbitala () {
  this.ISS = new VehiculSpatial();
};
```
