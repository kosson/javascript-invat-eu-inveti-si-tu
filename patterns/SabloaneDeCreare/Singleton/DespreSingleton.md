## Dependințe cognitive
- funcții
- this
- obiecte

Îi spune Singleton (pe filieră Java) pentru că, ipotetic, nu poți să ai decât o singură instanță a acestui obiect.
În JavaScript toate obiectele sunt Singleton pentru că JavaScript nu are clase.

## Mantre

- creează un namespace distinct
- Modificarea concomitentă a valorilor, va duce la suprascrierea valorilor.

În Javascript, singleton-urile folosesc la crearea unui namespace distinct care izolează codul implementării de global scope oferind un singur punct de intrare pentru funcții.

Un Singleton este doar o structură.

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

Structura simpla de mai sus poate fi extinsă prin adăugare de membri și metode private prin incapsularea declarațiilor de variabile și funcții într-un clojure.

```js
var unSingleton = function(){
  /**
   * ZONA PRIVATA
   */
  var oVariabilaPrivata = 'ceva care nu poate fi accesat din afara';

  function arataVariabila(){
    console.log(oVariabilaPrivata);
  };

  /**
   * ZONA PUBLICĂ
   */
  return {

    metodaPublica: function(){
      arataVariabila();
    }

    publicVar: 'publicul poate vedea asta';
  };
};

var unSingle = unSingleton();
unSingle.metodaPublica();         // ceva care nu poate fi accesat din afara
console.log(unSingle.publicVar);  // publicul poate vedea asta
```

Codul de instanțiere al unui Singleton se poate pune într-o altă funcție constructor după cum urmează:

### 1. declară un IIFE

```js
var unSingleton = (function (){})();
```

### 2. declară o funcție init care, de fapt cuprinde Singleton-ul

Pe scurt:
1. Faci o referință către o funcție anonimă.
2. Funcția anonimă are o metodă init ce returnează un obiect care poartă tot ce este public (atribute și metode).
3. În funcție mai este o variabilă ține instanța Singleton-ului.
4. La final, funcția returnează un obiect cu o metodă care odată apelată ulterior, va încărca variabila cu o instanță a Singleton-ului, dacă aceasta nu există deja. Aceeași metodă, după instanțiere, returnează variabila purtătoare a instanței.
5. Ajungi la atributele și metodele Singleton prin apelarea funcției returnate, care la rândul său returnează Singleton-ul instațiat deja.

```js
var unSingleton = (function (){

  var activ;                    // poarta instanta de Singleton

  function init (){             // returnează obiectul care este Singleton-ul

    // se returnează obiectul
    return {
      metodaPublica: function (){
        console.log('Salutare!');
      },
      proprietatePublica: 'ceva'
    };

  };

  return {
    getInstance: function (){   // metoda care obține instanța obiectului Singleton
      if(!activ){               // verifica daca activ poarta instanta
        activ = init();         // daca nu, instanțiază obiectul Singleton
      }
      return activ;             // returnează instanța
    }
  };

})();

// apelarea metodei publice
unSingleton.getInstance().metodaPublica();
```

## Folosirea în practică

Atunci când un singur obiect este necesar pentru a coordona șabloanele întregului sistem.

```js
var TestSingleton = (function (){

  function Singleton(inputs) {        // inputs: e obiect de configurare pentru asemanator cu { name: 'ceva', pointX: 5}

    inputs = inputs || {};            // seteaza cu un obiect gol daca nu ai obiect de configurare

    this.name = 'TestSingleton';      // parametru intern: name
    this.coordX = inputs.coordX || 0; // valoare pentru coordonata X
    this.coordY = inputs.coordY || 0; // valoare pentru coordonata Y
  };

  var instance;                       // tine instanta de Singleton la instanțierea cu  new

  var asaZiseAtribSiMetodeStatice = {

    name: 'TestSingleton',
    getInstance: function (options){

      if (instance === undefined){
        instance = new Singleton(options);
      }

      return instance;
    }
  };

  return asaZiseAtribSiMetodeStatice;

})();

var singletonTest = TestSingleton.getInstance({
  coordX: 10, coordY: 20
});

console.log(singletonTest.coordX); // afiseaza 10

```

În cazul folosirii Node, datorită modului în care se face caching-ul, pentru a beneficia de un Singleton este îndejuns să faci:

module.exports = numeFuncție()
sau
module.exports = new numeFunctie()
