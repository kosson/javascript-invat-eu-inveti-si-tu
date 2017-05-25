var libx = (function (window) {
  /* FACTORY */
  var fragmentBun = function () {
    var loc = document.getElementById('repetitor'); // ancorare în DOM
    this.gand = document.createElement('p');     // creezi elem p
    this.gand.setAttribute('class','bun');       // atașezi clasa bun
    this.gand.appendChild(document.createTextNode("Gandul bun")); // ceva text
    loc.appendChild(this.gand);  // adaugă nodul copil la elementul ancoră
    return loc;
  },
  fragmentRau = function () {
    var loc = document.getElementById('repetitor');
    this.gand = document.createElement('p');
    this.gand.setAttribute('class','rau');
    this.gand.appendChild(document.createTextNode("Gandul rau"));
    loc.appendChild(this.gand);
    return loc;
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
  document.onreadystatechange = function () {
    var ancora = null;
    if (document.readyState === "complete") {
      ancora = document.getElementById('container');
      ancora.onclick = function () {
          var distribuitorSingleton = distribuitorGanduri.creeaza();
          console.log(distribuitorSingleton);
          distribuitorGanduri.afiseazaGanduri();
      };
      // onclick este obiect și este null

      // ancora.addEventListener("click", function (e) {
      //   e.target.textContent = "click count: " + e.detail;
      //   var distribuitorSingleton = distribuitorGanduri.creeaza();
      //   distribuitorGanduri.afiseazaGanduri();
      // }, false);
    };
  };
})(window);
