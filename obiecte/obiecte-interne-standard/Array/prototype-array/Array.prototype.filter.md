# Array.prototype.filter()

Funcția de filtrare păstrează valorile dintr-o colecție pe care o parcurge în funcție de anumite criterii care sunt expresii ale unei funcții callback. Principiul de bază este acela ca funcția callback să returneze o valoare de adevăr pentru elementul curent supus analizei. La final, este returnat un alt array care conține valorile pentru care funcția callback a returnat o valoare de adevăr. Array-ul original nu este modificat.

```javascript
const colectie = [23, 34, 2, 10];
colectie.filter((element) => element > 20);
// Array [ 23, 34 ]
```

Pentru că această funcționalitate intră pe lanțurile de prelucrare a datelor, vom intra în mai multe detalii privind modul de funcționare a filtrărilor.

## Construiește de la 0 o funcție de filtrare

Înainte de a folosi `filter()` așa cum este deja implementat, este util să vedem cum am construi de la 0 o astfel de funcționalitate.

```javascript
const colectie = ["prima", "a doua", "a treia", "a doua", "prima"];

function filtrare (array, callback) {     // este o funcție „pură”, adică nu modifică array-ului original
  let colector = [];                      // declari un array care va colecta valorile, dacă sunt găsite
  for(let i = 0; i < array.length; i++){  // ciclezi întregul array
    if( callback(array[i]) ) {            // dacă evaluarea callback-ului returnează true pentru valoarea căutată
      colector.push(array[i]);            // se încărcă colector cu elementele repetate, fiecare fiind valoarea
    };
  };
  return colector;                        // returnează colectorul
};

filtrare(colectie, function (element) {   // invoci filtrarea cu un array și callback. callback-ul caută true
  if(element == "prima"){                 // testează dacă elem se potrivește cu valoarea căutată
    return true;                    // dacă da, atunci ciclarea va produce elemente în array-ul colector.
  };                                // dacă nu, atunci va fi returnat un array gol.
});

// Array [ "prima", "prima" ]
```

Funcția cu rol de callback are rolul precis de a returna o valoare de adevăr în urma evaluării diferitelor expresii din interiorul său.

Cum ar funcționa același procedeu pentru un JSON?

```javascript
const colectie = [
  {"nume": "ISS", "tip": "stație", "viteza": 27000},
  {"nume": "Soyuz", "tip": "vehicul", "viteza": 21000},
  {"name": "Dragonfly", "tip": "vehicul", "viteza": 24000},
  {"name": "Tiangong", "tip": "stație", "viteza": 25000}
];

let rezultat = filtrare (colectie, function (element) {
  return element.viteza > 21000 && element.tip == "stație";
});

console.log(JSON.stringify(rezultat, null, ' '));
```

Metoda `filter()` face parte integrantă din metodele obiectului intern `Array`. Alături de `map()` și `reduce()` face parte integrantă din paradigma „programării funcționale”. Un exemplu de filtrare pentru valorile care sunt truthy, care conțin ceva.

```javascript
const data = [ "bar", "foo", "", 0 ];
let filtered = data.filter(function ( item ) {
      return !!item; // sunt returnate valorile „truthy”
    });
console.log( filtered ); // ["bar", "foo"]
```

## Filtrarea valorilor unui array cu obiecte.

De foarte multe ori este necesară parcurgerea unui obiect și extragerea elementelor comune.

```javascript
const colectie = [
  {nume: "ISS", tip: "statie"},
  {nume: "Soyuz", tip: "vehicul"},
  {nume: "Atlantis", tip: "vehicul"},
  {nume: "Ariane", tip: "propulsor"}
];

let existaElementul = function (element, obiect) {
  return obiect.tip === element;
};

let elementeComune = colectie.filter(function (obiect) {
  return existaElementul('vehicul', obiect);
});

console.log(JSON.stringify(elementeComune, null, 2));
```

Poate fi folosit cu mare succes și în funcții recursive.
