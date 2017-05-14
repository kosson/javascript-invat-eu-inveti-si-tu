# Factory

Este un șablon folosit pentru a simplifica crearea obiectelor.
Folosit și la crearea de obiecte în baza unor necesități.
Este o funcție care creează și returnează un obiect.

## Mantre
 - creează și returnează un obiect
 - se comportă precum o interfață

```javascript
var persoana = function(nume, prenume){
  return {
    nume: nume,
    prenume: prenume,
    salutare: function(nume){
      return "Salut sunt " + this.nume;
    }
  }
};
```

Este util pentru că se comportă ca o interfață. Poți genera o sumedenie de obiecte care să folosească același „tipar”.

## Disecția unui factory

Mai întâi, hai să creăm un cadru de test. Pentru asta vom folosi o pagină HTML, CSS pentru efectul vizual și un fișier JS cu tot codul de test.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Test Factory</title>
    <script src="factory00.js" charset="utf-8"></script>
    <style media="screen">
      .bun {color: green;}
      .rau {color: red;}
    </style>
  </head>
  <body>
    <div id="repetitor"></div>
  </body>
</html>
```

Fișierul nostru de javascript va fi încărcat ca sursă externă.

```javascript
var libx = (function (window) {
  /* FACTORY */
  var fragmentBun = function () {
    var loc = document.getElementById('repetitor'); // ancorare în DOM
    this.gand = document.createElement('p');     // creezi elem p
    this.gand.setAttribute('class','bun');       // atașezi clasa bun
    this.gand.appendChild(document.createTextNode("Gandul bun")); // ceva text
    loc.appendChild(this.gand);  // adaugă nodul copil la elementul ancoră
  },
  fragmentRau = function () {
    var loc = document.getElementById('repetitor');
    this.gand = document.createElement('p');
    this.gand.setAttribute('class','rau');
    this.gand.appendChild(document.createTextNode("Gandul rau"));
    loc.appendChild(this.gand);
  },
  injectorFactory = function () {
    this.creeaza = function (gand) {
      if (gand === 'bun') {
        return new fragmentBun();
      } else {
        return new fragmentRau();
      };
    };
  };
  /* Cuplajul cu SINGLETON */
  var distribuitorGanduri = (function () {
    var obiect;
    function creator () {
      var _injFactory = new injectorFactory();
      function afiseazaGanduri () {
        var gand = _injFactory.creeaza().gand;
        return gand;
      };
      return {
        afiseazaGanduri: afiseazaGanduri
      };
    };
    return {
      creeaza: function () {
        if(!obiect) {
          obiect = creator();
        } else {
          return obiect;
        };
      }
    };
  })();
  /* IMPLEMENTAREA aplicației */
  window.document.ready(function () {
    var ancora = document.getElementByTag('body');
    ancora.click(function(e){
      var distribuitorSingleton = distribuitorGanduri.creeaza();
      distribuitorGanduri.afiseazaGanduri();
    });
  });
})(window);
```
