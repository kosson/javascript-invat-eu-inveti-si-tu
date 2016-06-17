Javascript are un model de execuție foarte flexibil. Toate funcțiile beneficiază de metoda `apply()`, care permite apelarea funcției cu un array ca și cum elementele din array ar fi argumentele funcției.

## Definiții

Functional programming -- programarea bazată pe funcții constă în folosirea funcțiilor pentru a transforma valorile în unități de abstractizare, care mai apoi sunt folosite pentru a construi software. (Michael Fogus, „Functional Javascript”).

## Descriere

Ascunderea datelor și a comportamentelor este felul în care pot fi privite funcțiile ca unități de abstractizare.

## Mantre

- Orice funcție poate fi apelată cu oricâte argumente de orice tip în orice moment.
- Funcțiile care returnează un Boolean, se numesc predicate.

Un exemplu este o funcție care primește o funcție ca argument și returnează o altă funcție.

```js
function oFunctie (functie_primita){
  return function (array){
    return functie_primita.apply(null, array); // null setează obiectul context la global object (window, de regulă)
  }
};

var faOAdunare = oFunctie(function(unu, doi){return unu + doi;});

faOAdunare([2, 3]); // 5
```

## Puritatea funcțiilor

Înseamnă că o funcție este:
- testabilă
- portabilă
- memoizabilă
- paralelizabilă

O funcție pură este ușor de recunoscut dacă nu schimbă nimic în afara scope-ului său și care nu depinde de nimic din afara scope-ului său.
O funcție pură oferă același rezultat dacă folosește aceiați parametri. Ceea ce se înțelege este faptul că funcția este independentă de starea sistemului/programului.

## Funcțiile în JavaScript sunt de primă clasă

Un exemplu care arată ce înseamnă ca o funcție să fie de primă clasă (first-class).

```js
var oFunctie = function(x,y){
  return x + y;
};

var demoFunctie = function(oFunctie, z, w){
  return oFunctie(z, w);
};

demoFunctie(oFunctie, 2, 3); // 5
```

## Funcțiile pot returna alte funcții

Cel mai ușor de exemplficat este un currying:

```js
var oFunctie = function(x,y){
  return x + y;
};

var demoFunctie = function(oFunctie, z){
  return function(w){
    return oFunctie(z, w);
  };
};

var primo = demoFunctie(oFunctie, 2);

var secundo = primo(3);

secundo // 5
```

Un alt exemplu care implică și mapping:

```js
var colectie = [
  {ceva: 'Jenifer'},
  {ceva: 'dude'},
  {ceva: 'ciocan'}
];

// #1 varianta clasica de a scoate valorile
function scoateCeva(colectie){
  return colectie['ceva'];
};

var cevauri = colectie.map(scoateCeva);
console.log(cevauri); // Array [ "Jenifer", "dude", "ciocan" ]

// #2 variantă folosind currying
var scoateDoarCheile = function(key, obi){
  return function(obi){
    return obi[key];
  };
};

var scoateCheiDinObiect = scoateDoarCheile('ceva');
console.log(scoateCheiDinObiect1); // function scoateDoarCheile

var scoateNume = colectie.map(scoateCheiDinObiect);
console.log(scoateNume); // Array [ "Jenifer", "dude", "ciocan" ]
```

## Functor-ii

Sunt obiecte care au o metodă map. Functor-ul este obiectul care implementează `map()`. Deci, putem spune că, de fapt, `Array` este un fanctor pentru că are o metodă `map()`.

Regulile pe care le îndeplinește Array prin metoda sa map:
- transformă conținutul
- menține structura
- valoare pe care o returneză map trebuie să fie un functor de același tip. Adică poți face chaining cu map (.map(//cod).map(// cod).map(// cod)).

```js
var colectie = [
  {nume: 'Tereza', chestie: 'expertă în HTML'},
  {nume: 'Ciprian', chestie: 'foarte bun cu CSS-ul'},
  {nume: 'Gina', chestie: 'junior în JavaScript'}
];

var colectieDeNume = colectie.map(colaborator => colaborator.nume); // colaborator => colaborator.nume este funcția de transformare
console.log(colectieDeNume); // Array [ "Tereza", "Ciprian", "Gina" ]
```

Promisiunile sunt implementate și ele ca functori. ECMAScript 2015 nu are o metodă map, dar alte biblioteci de cod au.
Streamurile sunt și ele implementatori ai lui `map()`. 


## Funcțiile map(), filter(), reduce()

Sunt o colecție nucleu pentru lucrul cu funcții de ordin înalt (higher order). Constituie instrumentarul pentru programarea funcțională pentru că iau o funcție drept input și returnează un rezultat care nu are efect.

Aceste metode lucrează cu array-uri. Aceste metode aplică un callback pentru fiecare element dintr-un array, pe care nu-l modifică și returnează un alt array cu rezultatele pentru fiecare element asupra căruia a acționat respectivul callback.
