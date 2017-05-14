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
