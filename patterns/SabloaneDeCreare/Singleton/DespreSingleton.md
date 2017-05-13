# Singleton

Este un model cu ajutorul căruia instanțiezi un obiect unic la un moment anume.
Îi spune Singleton (pe filieră Java) pentru că, ipotetic, nu poți să ai decât o singură instanță a acestui obiect.

## Dependințe cognitive
- funcții
- this
- obiecte
- clojure
- IIFE
- Revealing Module Pattern

## Mantre

- folosit pentru a „conserva” starea unei aplicații și apoi accesa această stare în întreaga aplicație
- este folosit doar la momentul instanțierii, iar după, poate fi doar actualizat
- creează un namespace distinct
- are instanțiere întârziată
- obiectul este unic în întreaga aplicație
- e o interfață globală constantă pentru toți cei care au nevoie să-l folosească
- Modificarea concomitentă a valorilor, va duce la suprascrierea valorilor.
- are o instanțiere întârziată, adică va fi folosit atunci când va fi nevoie de acesta, când va fi instanțiat.

În Javascript, Singleton-urile folosesc la crearea unui spațiu distinct (namespace), care izolează codul implementării de *global scope*. Pentru acest obiect este oferit un singur punct de intrare către metode.

Un Singleton este doar o structură. Pentru a înțelege cum funcționează, cel mai simplu ar fi să analizăm cum funcționează. Avem o zonă privată și o zonă publică. Zona publică se comportă ca punct de intrare către zona internă.

### 1. declară un IIFE

Pornim prin a construi un modul în sine folosind un IIFE. Acesta creează propriu mediu lexical, ceea ce oferă izolarea de care avem nevoie ca mai apoi să limităm la ceea ce este nevoie accesul din exterior.

```javascript
var unSingleton = (function (){})();
```

În interiorul funcției IFFE, declari o variabilă care va fi referința către obiectul generat la momentul când acesta va fi creat.

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

După ce dotezi funcția cu tot ce crezi că ar nevoie obiectului final, vei face un return unui obiect literal care are o unică metodă.
Rolul metodei este să testeze dacă obiectul a fost instanțiat testând valoarea variabilei definite inițial. Dacă valoarea este „undefined”, înseamnă că obiectul încă nu a fost instanțiat niciodată, nu a fost cerut până acum și va fi creat chiar acum. Acest lucru se va face prin atribuirea valorii evaluate prin invocarea funcției `generator`.
Dacă obiectul a fost creat deja, pur și simplu va fi returnat.

```javascript
var unSingleton = (function (){
  var obiectul;
  function generator () {
    // tot ce are nevoie obiectul
  };
  return {
    if(!obiectul) {
      obiectul = generator();
    }
    return obiectul;
  };
})();
```

## Folosirea în practică

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
