# Factory

Este un șablon folosit pentru a simplifica crearea obiectelor. Este o funcție care creează și returnează un obiect.

**Moment Zen**: Un factory este o funcție.

## Dependințe cognitive

- obiecte
- funcții
- closures

## Mantre

 - JavaScript nu are clase
 - Un factory (o fabrică de obiecte) creează și returnează câte un obiect la fiecare invocare
 - Un factory se comportă precum o interfață

Cel mai simplu exemplu este o funcție care preia niște date prin argumente, are niște date interne și la final este returnat un obiect care oferă acces la mediul lexical al funcției pentru care s-a făcut un closure la momentul returnării.

```javascript
var persoana = function oPersoana (nume, prenume) {
  var _ceva = 10;
  return {
    nume: nume,
    prenume: prenume,
    salutare: function salut (porecla) {
      return 'Salut sunt ' + porecla + ' pentru ' + this.nume + ' ' + this.prenume + ' și sunt de nota ' + _ceva;
    }
  }
};
var instanta = persoana('Ion', 'Vintilă');
instanta.salutare('Caloianu');
```

Pentru că începând cu ES6 avem la îndemână prescurtarea sintaxei, vom rescrie exemplul de mai sus pentru a vedea diferențele.

```javascript
var persoana = function oPersoana (nume, prenume) {
  var _ceva = 10;
  return {
    nume,
    prenume,
    salut (porecla) {
      return 'Salut sunt ' + porecla + ' pentru ' + this.nume + ' ' + this.prenume + ' și sunt de nota ' + _ceva;
    }
  }
};
var instanta = persoana('Ion', 'Vintilă');
instanta.salut('Caloianu');
```

Acest șablon este foarte util pentru că se comportă ca o interfață la un mecanism de generare a unor obiecte. Același „tipar” îl poți aplica pentru inițializarea unor obiecte în baza unor valori diferite de lucru.

Este observabil că putem folosi date din două surse. Una este obiectul returnat folosind `this.proprietate`, dar pentru că se creează un closure pe mediul lexical creat de funcția care returnează obiectul, putem accesa din metodele obiectului returnat, direct valori din funcție.

## Disecția unui factory

Mai întâi, hai să creăm un cadru de test. Pentru asta vom folosi o pagină HTML, CSS pentru a lucra cu ceva palpabil și un fișier JS cu tot codul de test.

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

Fișierul nostru de JavaScript va fi încărcat ca sursă externă.

```javascript
/* FACTORY */
var fragmentBun = function fragBun () {
  var loc = document.getElementById('repetitor'); // ancorare în DOM
  this.gand = document.createElement('p');     // creezi elem p
  this.gand.setAttribute('class','bun');       // atașezi clasa bun
  this.gand.appendChild(document.createTextNode("Gandul bun")); // ceva text
  loc.appendChild(this.gand);  // adaugă nodul copil la elementul ancoră
  return loc;
},
fragmentRau = function fragRau () {
  var loc = document.getElementById('repetitor');
  this.gand = document.createElement('p');
  this.gand.setAttribute('class','rau');
  this.gand.appendChild(document.createTextNode("Gandul rau"));
  loc.appendChild(this.gand);
  return loc;
},
ganduriFactory = function injector () {
  this.creeaza = function (gand) {
    if (gand === 'bun') {
      return new fragmentBun();
    } else {
      return new fragmentRau();
    };
  };
};
/* Cuplajul cu SINGLETON */
var distribuitorGanduri = ( function spuffer () {
  var obiect = null;

  function creator () {
    var generatorGanduri = new ganduriFactory();
    function afiseazaGandul (gand) {
      return generatorGanduri.creeaza(gand);
    };
    return {
      afiseazaGandul
    };
  };

  return {
    ignition: function builder () {
      if (obiect === null) {
        obiect = creator();
        return obiect;
      } else {
        return obiect;
      }
    }
  };
})();

/* IMPLEMENTAREA aplicației */
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    var ancora = document.getElementsByTagName('body')[0];
    console.log(ancora);
    ancora.addEventListener('click', function () {
      var instanta = distribuitorGanduri.ignition();
      var culegeGandul = prompt('Ce gând ai? „bun” sau „rau”?');
      instanta.afiseazaGandul(culegeGandul);
    });
  }
};
```
