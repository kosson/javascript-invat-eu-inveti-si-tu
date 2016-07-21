# Array.prototype.filter()

Returnează un array care conține valori ce au trecut de verificările unei funcții callback.

## Construiește de la 0 o funcție de filtrare

Înainte de a folosi filter așa cum este deja implementat, este util să vedem cum am construi de la 0 o astfel de funcționalitate.

```js
var colectie = ["prima", "a doua", "a treia", "a doua", "prima"];

function filtrare(array, callback){       // aceasta este o funcție „pură”, adică nu aduce modificări asupra array-ului original
  var colector = [];                      // declari un array care va colecta valorile, dacă acestea sunt găsite
  for(var i = 0; i < array.length; i++){  // ciclezi întregul array
    if(callback(array[i])){               // dacă evaluarea callback-ului returnează un true pentru o valoare care este căutată
      colector.push(array[i]);            // se va încărca colector cu elementele repetate, fiecare dintre acestea fiind valoarea căutată
    };
  };
  return colector;                        // returnează colectorul
};

filtrare(colectie, function(element){  // invocare filtrării se face cu un array și cu un callback. callback-ul are misiunea de a returna un true
  if(element == "prima"){              // testează dacă elem, care, de fapt este un element al array-ului se potrivește cu valoarea căutată
    return true                     // dacă da, atunci ciclarea din funcția filtrare va produce elemente în array-ul colector.
  };                                // dacă nu, atunci va fi returnat un array gol.
});

// Array [ "prima", "prima" ]
```

Cum ar funcționa același procedeu pentru un JSON?

```js
var colectie = [
  {"nume": "ISS", "tip": "stație", "viteza": 27000},
  {"nume": "Soyuz", "tip": "vehicul", "viteza": 21000},
  {"name": "Dragonfly", "tip": "vehicul", "viteza": 24000},
  {"name": "Tiangong", "tip": "stație", "viteza": 25000}
];

var rezultat = filtrare(colectie, function(element){
  return element.viteza > 21000 && element.tip == "stație";
});

console.log(JSON.stringify(rezultat, null, ' '));

// [
//  {
//   "nume": "ISS",
//   "tip": "stație",
//   "viteza": 27000
//  },
//  {
//   "name": "Tiangong",
//   "tip": "stație",
//   "viteza": 25000
//  }
// ]
```

Metoda filter face parte integrantă din metodele lui Array.

Alături de `map()` și `reduce()` face parte integrantă din paradigma „programării funcționale”.

```js
var data = [ "bar", "foo", "", 0 ],
    filtered = data.filter(function( item ){
      return !!item;
    });
console.log( filtered ); // ["bar", "foo"]
```

## Filtrare a valorilor unui array cu obiecte.

De foarte multe ori este necesară parcurgerea unui obiect și extragerea elementelor comune.

```js
var colectie = [
  {nume: "ISS", tip: "statie"},
  {nume: "Soyuz", tip: "vehicul"},
  {nume: "Atlantis", tip: "vehicul"},
  {nume: "Ariane", tip: "propulsor"}
];

var existaElementul = function(element, obiect){
  return obiect.tip === element;
};

var elementeComune = colectie.filter(function(obiect){
  return existaElementul('vehicul', obiect);
});

console.log(JSON.stringify(elementeComune, null, 2));

// [
//   {
//     "nume": "Soyuz",
//     "tip": "vehicul",
//     "viteza": 21000
//   },
//   {
//     "name": "Dragonfly",
//     "tip": "vehicul",
//     "viteza": 24000
//   }
// ]
```

Poate fi folosit cu mare succes și în funcții recursive.
