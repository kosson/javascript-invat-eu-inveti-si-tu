# Extinderea obiectelor

Obiectelor li se pot adăuga proprietăți și metode pentru a le extinde funcționalitatea.

## Ce este un „mixin”?

Este un obiect care îmbogățește obiectul `this` cu funcții și obiecte aparținând altor obiecte. La final, rezultă un obiect nou care este o variantă „extinsă” a obiectului original. Atenție, obiectul rezultat va îngloba referințe, nu obiectele în sine, care vor continua să existe separat.

Pornești de la un obiect pe care vrei să-l „mixezi” cu un altul.

```javascript
var functiiCerc = {
  arie: function () { return Math.PI * this.raza * this.raza; },
  creste: function () { this.raza++; },
  descreste: function () { this.raza--; }
};
```

Pentru a simplifica adăugarea metodelor și proprietăților, se poate scrie o funcție specializată:

```javascript
function extinde (obi, obiSursa) {
  for (var x in obiSursa) {
    if ( obiSursa.hasOwnProperty(x) ) { obi[x] = obiSursa[x]; };
  };
  return obi;
};
```

Această funcție poate fi invocată pentru a extinde funcționalitatea prototipului unui alt obiect. O schiță pentru o astfel de extindere ar fi:

```javascript
var ElementRotund = function (raza, identificator) {
  this.raza = raza;
  this.identificator = identificator;
};
extinde(ElementRotund.prototype, functiiCerc);
```

O altă variantă pentru funcția de extindere:

```javascript
function extinde (proprietati) {
  var prop, obi;
  obi = Object.create(this);
  for(prop in proprietati) {
    if(proprietati.hasOwnProperty(prop)) {
        obi[prop] = proprietati[prop];
    }
  }
  return obj;
};
```
În acest caz se creează un nou obiect cu `this` (de fapt, face o copie a lui însuși), la care bucla `for` adaugă proprietățile de la obiectul care se dorește a fi integrat. De fapt, din punct de vedere tehnic, se face o copie a referințelor către funcțiile și obiectele obiectului de integrat ca extindere a obiectului original.

Dacă funcțiile definite de un mixin sunt destinate a fi folosite de un alt obiect, se pune întrebarea dacă nu ar fi mai simplă apelarea mixinului într-un `call()`.

```javascript
var functiiCerc = function (){
  this.arie = function () { return Math.PI * this.raza * this.raza; };
  this.creste = function() { this.raza++; };
  this.descreste = function() { this.raza--; };
  return this;
};
var ElementRotund = function(raza) { this.raza = raza; };
functiiCerc.call(ElementRotund.prototype);
var cerc1 = new ElementRotund(10);
cerc1.arie(); //
```

## Lista resurselor consultate:

1. [A fresh look at JavaScript Mixins, de  Angus Croll](https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/)
