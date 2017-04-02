# Programarea orientată pe obiecte în JavaScript

Trebuie reținut faptul că în JS mai totul este un obiect.

Pentru a acoperi câteva concepte importante ale programării orientate pe obiecte, vom imagina o aplicație care preia câteva informații dintr-un array din care afișează pe ecran ultimele 5 câte una la 2 secunde.

```javascript
var domeniulMeu = domeniulMeu || {};
domeniulMeu.Date = domeniulMeu.Data || {};
domeniulMeu.Date.evenimente = ['ceva important', 'mondenități', 'eveniment politic'];

var domeniulMeu.Broadcaster = function (){
  this.version = '1.0';
};

domeniulMeu.Broadcaster.prototype.afiseaza = function (){
  var carlig = document.getElementById('retine');
  for(elemidx in domeniulMeu.Date.evenimente){
    var pel = document.createElement("p");
    var pelcont = document.createTextNode(domeniulMeu.Date.evenimente[elemidx]);
    pel.appendChild(pelcont);
    carlig.appendChild(pel);
  };
};
```
