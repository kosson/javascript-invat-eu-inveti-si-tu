# Extinderea obiectelor

Obiectelor li se pot adăuga proprietăți și metode pentru a extinde funcționalitatea.

## Ce este un „mixin”?

Este un mecanism care primește pe this, apoi în îmbogățește cu funcții și obiecte ale unui alt obiect și care la final returnează this - o variantă „extinsă” a obiectului original. Atenție, obiectul original va îngloba referințe, nu obiectele în sine.

Pornești de la un obiect pe care vrei să-l „mixezi” cu un altul.

```js
var functiiCerc = {
  arie: function() {
    return Math.PI * this.radius * this.radius;
  },
  creste: function() {
    this.radius++;
  },
  descreste: function() {
    this.radius--;
  }
};
```

Pentru a simplifica adăugarea metodelor și a proprietăților, se poate scrie o funcție specializată:

```js
function extend(destinatie, sursa) {
  for (var k in sursa) {
    if (sursa.hasOwnProperty(k)) {
      destinatie[k] = sursa[k];
    }
  }
  return destination;
}
```

Această funcție poate fi invocată pentru a extinde funcționalitatea prototipului unui alt obiect.
O schiță pentru o astfel de extindere ar fi:

```js
var ElementRotund = function(raza, eticheta) {
  this.raza = raza;
  this.eticheta = eticheta;
};

extend(ElementRotund.prototype, functiiCerc);
```

O altă variantă pentru funcția de extindere:

```js
extend: function(props) {
  var prop, obj;
  obj = Object.create(this);
  for(prop in props) {
    if(props.hasOwnProperty(prop)) {
        obj[prop] = props[prop];
    }
  }
  return obj;
},
```
În acest caz se creează un nou obiect cu this (de fapt, face o copie a lui însuși) la care bucla adaugă proprietățile de la obiectul care se dorește a fi integrat. De fapt, din punct de vedere tehnic, se face o copie a referințelor către funcțiile și obiectele obiectului de integrat ca extindere a obiectului original.

Dacă funcțiile definite de un mixin sunt destinate a fi folosite de un alt obiect, se pune întrebarea dacă nu ar fi mai simplă apelarea mixinului într-un call().

```js
var functiiCerc = function(){
  this.arie = function() {
    return Math.PI * this.raza * this.raza;
  };
  this.creste = function() {
    this.raza++;
  };
  this.descreste = function() {
    this.raza--;
  };
  return this;
};

var ElementRotund = function(raza) {
  this.raza = raza;
};

functiiCerc.call(ElementRotund.prototype);

var cerc1 = new ElementRotund(10);

cerc1.arie(); //
```

## Lista resurselor consultate:

1. [A fresh look at JavaScript Mixins, de  Angus Croll](https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/)
