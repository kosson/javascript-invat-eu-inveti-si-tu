# Array.prototype.filter()

Această metodă poate fi înțeleasă ca un test aplicat fiecărui element dintr-un array. Testarea se face după anumite criterii introduse de o funcție callback. Funcția callback returnează o valoare de adevăr pentru elementul curent supus analizei. Dacă un element trece testul, acesta este adăugat unui nou array care se construiește din elementele primului care au trecut testul. Array-ul original nu este modificat.

```javascript
const colectie = [23, 34, 2, 10];
colectie.filter((element) => element > 20);
// Array [ 23, 34 ]
```

Metoda `filter()` face parte integrantă din metodele obiectului intern `Array`. Alături de `map()` și `reduce()` face parte integrantă din paradigma *programării funcționale*.
Această funcționalitate intră pe lanțurile de prelucrare ale datelor.

```javascript
let carti = [
    {id:1, nume: "De veghe în lanul de secară", împrumutată: true},
    {id:2, nume: "Cel mai iubit dintre pământeni", împrumutată: false}
];
function stergeTitlu(id){
    carti = carti.filter(exemplar => exemplar.id !== id);
}
stergeTitlu(2);
console.log(carti);
//[ { id: 1, nume: 'De veghe în lanul de secară', 'împrumutată': true } ]
```

## Construiește de la 0 o funcție de filtrare

Înainte de a folosi `filter()` așa cum este deja implementat, este util să vedem cum am construi de la `0` o astfel de funcționalitate.

```javascript
const colectie = ["prima", "a doua", "a treia", "a doua", "prima"];

function filtrare (array, callback) {     // este o funcție „pură”, adică nu modifică array-ului original
  let colector = [];                      // declari un array care va colecta valorile, dacă sunt găsite
  for (let i = 0; i < array.length; i++) {  // ciclezi întregul array
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

Un exemplu de filtrare pentru valorile care sunt truthy, care conțin ceva.

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

## Căutarea valorilor corespondente din două array-uri

Uneori este necesară căutarea a unor valori care există într-un array, în alt array. Pe scurt, ai nevoie să găsești corespondențele în două seturi de valori.

```javascript
let roles = ["user", "ceva", "intern", "tester"];
let reqvals = ["user", "intern","ceva", "tester"];

function checkRoles () {
    return reqvals.filter((rol) => roles.includes(rol));
};
console.log(checkRoles()); // [ 'user', 'intern', 'ceva', 'tester' ]
```
