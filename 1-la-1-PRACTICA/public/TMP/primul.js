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
        var culegeGandul = prompt('Ce gând ai? Bun sau rău?');
        instanta.afiseazaGandul(culegeGandul);
      });
    }
  };
