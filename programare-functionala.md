# Programarea funcțională

Conceptele programării funcționale sunt necesare pentru a înțelege cum se face *descompunerea* (*decomposing*) unei funcții ceea ce conduce la o mai bună înțelegere a felului în care trebuie scris software în JavaScript. Este vorba și despre cum să denumești părțile la nivel individual pentru ca la momentul *compunerii* lor să stabilească relații între entități care să fie ușor de modelat.

JavaScript are un model de execuție foarte flexibil. Toate funcțiile beneficiază de metoda `apply()`, care permite apelarea funcției cu un array ca și cum elementele din array ar fi argumentele funcției.

Diferențele între paradigma orientată pe obiecte și cea funcțională se rezumă la faptul că obiectele prin proprietățile sale au posibilitatea de a înregistra și păstra o stare.
În cazul obiectelor avem metodele, care pot transforma și lucra cu starea obiectului exprimată prin legătura `this`. Obiectul este la nivel mai jos o referință către o zonă de memorie. Pasarea unui obiect în diferitele faze de rulare ale unei aplicații este pasarea unei referințe către un obiect. Toate aceste faze, pot modifica valorile proprietăților obiectului.

```javascript
var obi = {a: 1};
function modificator1 (obiect) {
  obiect.a = 100;
  return obiect;
};
function modificator2 () {
  this.nou = 'salve';
};
modificator1(obi);
obi.a; // 100
modificator2.call(obi);
console.log(obi); // { a: 100, nou: 'salve' }
```

Ceea ce se observă este capacitatea obiectelor de a încapsula starea și de a o transmite mai departe în lanțul de prelucrare. În paradigma funcțională, obiectul poate fi pasat ca argument, ca date.

## Imutabilitatea

Imutabilitatea este un concept cheie pentru programarea funcțională.

## Definiții

Functional programming -- programarea bazată pe funcții constă în folosirea funcțiilor pentru a transforma valorile în unități de abstractizare, care mai apoi sunt folosite pentru a construi software. (Michael Fogus, *Functional Javascript*).

## Descriere

Ascunderea datelor și a comportamentelor este felul în care pot fi privite funcțiile ca unități de abstractizare.

## Mantre

- Funcțiile care sunt folosite pentru a crea alte funcții se numesc *de ordin înalt*.
- Orice funcție poate fi apelată cu oricâte argumente de orice tip în orice moment.
- Funcțiile care returnează un Boolean, se numesc **predicate**.

Un exemplu este o funcție care primește o funcție ca argument și returnează o altă funcție.

```javascript
function oFunctie (functie_primita){
  return function (array){
    return functie_primita.apply(null, array); // null setează obiectul context la global object (window, de regulă)
  }
};

var faOAdunare = oFunctie(function(unu, doi){return unu + doi;});

faOAdunare([2, 3]); // 5
```

## Puritatea funcțiilor

O funcție pură nu va face nimic altceva în plus peste evaluarea codului și returnarea unui rezultat. Ideea este ca funcția să nu modifice valori externe, cum ar fi în global scope, de exemplu. O funcție pură trebuie înșeleasă ca o unitate de execuție a codului intern care nu va modifica nimic din afara sa. Tot ce trebuie să facă este să returneze rezultatul unei evaluări a corpului. Aceasta trebuie să fie singura consecință a execuției funcției.

Purtate înseamnă că o funcție este:

- testabilă,
- portabilă,
- memoizabilă,
- paralelizabilă.

O funcție pură este ușor de recunoscut dacă nu schimbă nimic în afara scope-ului său și care nu depinde de nimic din afara scope-ului său.

O funcție pură oferă același rezultat dacă folosește aceiași parametri. Ceea ce se înțelege este faptul că funcția este independentă de starea sistemului/programului.

## Funcțiile în JavaScript sunt de primă clasă

Un exemplu care arată ce înseamnă ca o funcție să fie de primă clasă (first-class).

```javascript
var oFunctie = function(x,y){
  return x + y;
};

var demoFunctie = function(oFunctie, z, w){
  return oFunctie(z, w);
};

demoFunctie(oFunctie, 2, 3); // 5
```

## Funcțiile pot returna alte funcții

Cel mai ușor de exemplificat este un currying:

```javascript
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

```javascript
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

Sunt obiecte care au o metodă map. Functor-ul este obiectul care implementează `map()`. Deci, putem spune că, de fapt, `Array` este un functor pentru că are o metodă `map()`.

Regulile pe care le îndeplinește Array prin metoda sa map:

- transformă conținutul,
- menține structura,
- valoarea pe care o returnează map trebuie să fie un functor de același tip. Adică poți face chaining cu map (`.map(//cod).map(// cod).map(// cod)`).

```javascript
var colectie = [
  {nume: 'Tereza', chestie: 'expertă în HTML'},
  {nume: 'Ciprian', chestie: 'foarte bun cu CSS-ul'},
  {nume: 'Gina', chestie: 'junior în JavaScript'}
];

var colectieDeNume = colectie.map(colaborator => colaborator.nume); // colaborator => colaborator.nume este funcția de transformare
console.log(colectieDeNume); // Array [ "Tereza", "Ciprian", "Gina" ]
```

Promisiunile sunt implementate și ele ca functori. ECMAScript 2015 nu are o metodă map, dar alte biblioteci de cod au.
Stream-urile sunt și ele implementatori ai lui `map()`.

## Funcțiile map(), filter(), reduce()

Sunt o colecție nucleu pentru lucrul cu funcții de ordin înalt (higher order). Constituie instrumentarul pentru programarea funcțională pentru că iau o funcție drept input și returnează un rezultat care nu are efect.

Aceste metode lucrează cu array-uri. Aceste metode aplică un callback pentru fiecare element dintr-un array, pe care nu-l modifică și returnează un alt array cu rezultatele pentru fiecare element asupra căruia a acționat respectivul callback.

## Resurse

- [Functional Programming Jargon | Hemanth](git@github.com:hemanth/functional-programming-jargon.git)