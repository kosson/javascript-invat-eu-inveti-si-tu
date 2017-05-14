# Singleton

Este un model cu ajutorul căruia instanțiezi un obiect care va fi unic pentru aplicația ta și pe care-l vei crea la un moment dat.

## Dependințe cognitive
- funcții
- this
- obiecte
- clojure
- IIFE
- Revealing Module Pattern

## Mantre

- folosit pentru a „conserva” starea unei aplicații și apoi accesa această stare în întreaga aplicație
- este folosit doar la momentul instanțierii, iar după, poate fi doar actualizat, fiind unic în întreaga aplicație
- creează un namespace distinct
- are instanțiere întârziată
- e o interfață globală constantă pentru toți cei care au nevoie să-l folosească
- Modificarea concomitentă a valorilor, va duce la suprascrierea valorilor.
- are o instanțiere întârziată, adică va fi folosit atunci când va fi nevoie de acesta, când va fi instanțiat.

În Javascript, Singleton-urile folosesc la crearea unui spațiu distinct (namespace), care izolează codul implementării de *global scope*. Pentru acest obiect este oferit un singur punct de intrare către metode.

**Moment ZEN**: Un Singleton este doar o structură de organizare a funcționalităților.

Pentru a înțelege cum funcționează, cel mai simplu ar fi să analizăm cum funcționează. Avem o zonă privată și o zonă publică. Zona publică se comportă ca punct de intrare către zona internă.

### 1. declară un IIFE

Pornim prin a construi un modul în sine folosind un IIFE. Acesta creează propriu mediu lexical, ceea ce oferă izolarea de care avem nevoie ca mai apoi să limităm la ceea ce este nevoie accesul din exterior.

```javascript
var unSingleton = (function (){})();
```

În interiorul funcției IFFE, declari o variabilă care va fi referința către obiect la momentul când acesta va fi creat.

```javascript
var unSingleton = (function (){
  var obiectul;
})();
```

### 2. declară o funcție care propriu-zis are misiunea de a creea obiectul.

În interiorul funcției vor fi create toate metodele și toate proprietățile obiectului viitor și va fi returnat acest obiect care poate fi considerat un adevărat API.

```javascript
var unSingleton = (function (){
  var obiectul;
  function generator () {
    // tot ce are nevoie obiectul
    return {};
  };
})();
```

### 3. returneză condițional obiectul constituit

După ce dotezi funcția cu tot ce crezi că ar nevoie obiectului final, vei face un return unui obiect literal care are o unică metodă.
Rolul metodei este să testeze dacă obiectul a fost instanțiat testând valoarea variabilei definite inițial. Dacă valoarea este „undefined”, înseamnă că obiectul încă nu a fost instanțiat niciodată, nu a fost cerut până acum și va fi creat chiar acum. Acest lucru se va face prin atribuirea valorii evaluate prin invocarea funcției `generator`.
Dacă obiectul a fost creat deja, pur și simplu va fi returnat.

O convenție pentru construcția Singleton-urilor spune ca toți identificatorii pentru membrii privați ai obiectului să poarte drept sufix caracterul linie jos.

```javascript
(function (window) {
  var unSingleton = (function (){ // (1)
    var obiectul;
    function generator () { // (2)
      var _valPrivata = 10; // valoare privată
      function _operatiunePrivata (cevaNecesar) {}; // nu este expusă
      function adunare (oValoare) {                 // expusă public
        return oValoare + _valPrivata;
      };
      return {
        adunare: adunare
      };
    };
    return {  // (3)
      creeaza: function () {
        if(!obiectul) {
          obiectul = generator();
        }
        return obiectul;
      }
    };
  })();
})(window);
```

### 4. utilizarea Singleton-ului

IIFE-ul returnează obiectul nostru care se va constitui la invocarea funcției `generator`.

```javascript
var activitate = unSingleton.creeaza();
activitate.adunare(3); // 13
```

Un lucru foarte important este să se facă referință către acel singleton ori de câte ori ai nevoie în cod. Chiar dacă a mai fost instanțiat, nu-i nicio problemă, dar dacă nu, tocmai am atins unul dintre motivele importante pentru care avem nevoie de un Singleton: instanțierea la un anumit moment.

## Un exemplu dintr-o bucată

Atunci când un singur obiect este necesar pentru a coordona șabloanele întregului sistem.

```javascript
var TestSingleton = (function (){
  var obiectul;                       // tine instanta de Singleton la instanțierea cu  new
  function Singleton(inputs) {        // inputs: e obiect de configurare pentru asemanator cu { name: 'ceva', pointX: 5}
    inputs = inputs || {};            // seteaza cu un obiect gol daca nu ai obiect de configurare
    this.name = 'TestSingleton';      // parametru intern: name
    this.coordX = inputs.coordX || 0; // valoare pentru coordonata X
    this.coordY = inputs.coordY || 0; // valoare pentru coordonata Y
  };
  var asaZiseAtribSiMetodeStatice = {
    name: 'TestSingleton',
    creeaza: function (valoriDinAfara){
      if (obiectul === undefined){
        obiectul = new Singleton(valoriDinAfara);
      };
      return obiectul;
    }
  };
  return asaZiseAtribSiMetodeStatice;
})();

var singletonTest = TestSingleton.creeaza({
  coordX: 10, coordY: 20
});

console.log(singletonTest.coordX); // afiseaza 10
```

În cazul folosirii Node, datorită modului în care se face caching-ul, pentru a genera un Singleton este îndejuns să faci: `module.exports = numeFuncție()` sau `module.exports = new numeFunctie()`
