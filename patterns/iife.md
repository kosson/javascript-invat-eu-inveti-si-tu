# IIFE - Immediately Invoked Function Expression

Un IIFE este folosit pentru a crea un scope și pentru a incapsula module.

IIFE permite invocarea imediată a unei funcții și permite crearea de spații de cod executabile separat de global scope.

Scopul parantezelor este de a transforma definirea funcției într-o expresie. Acest lucru se întâmplă pentru că în JavaScript tot ce este între paranteze este tratat ca o expresie. A doua pereche de paranteze face ca funcția să fie executată imediat.

## Dependințe cognitive
- funcții
- clojures


Dacă atribuiți funcția unei variabile, nu trebuie să punem funcția între paranteze deoarece este deja o expresie.

```js
var salutare = function () {
  alert('Salut!');
}();
```

Sunt două variante:

```js
// prima variantă

(function () {
  alert('Salut!');
})();

// a doua variantă

(function () {
  alert('Salut!');
}());
```

IIFE-urile primesc argumente pentru că și un IIFE este o funcție de fapt.

```js
(function (nume, profesia) {
  console.log("Mă cheamă " + nume + ". Și sunt " + profesia + ".");
})("Rică Răducanu", "fotbalist");   // output: Mă cheamă Rică Răducanu. Și sunt fotbalist.
```

## Model

```js
var x = "ceva";

(function(){
    var x = "ceva ascuns";
    console.log(x);
})();

console.log(x);
// => 'ceva ascuns'
// => 'ceva'
```

Când folosești?
- atunci când dorești să ascunzi funcționalități fără a lăsa nicio urmă în GLOBAL sau LOCAL SCOPE
- atunci când construiești Șabloane Modul.

### Ce este?
Este o **_funcție exprimată_** (function expression) Este o funcție exprimată pentru că o îmbraci în paranteze

### Bună practică:
1. dă un nume la IIFE, nu-l lăsa anomim. Beneficiul este că va apărea în call stack.

```js
var x = "ceva";

var iife = (function(){
    var x = "ceva ascuns";
    console.log(x);
})();

console.log(x);
```

IIFE-urile pot primi valori pentru că, de fapt, sunt apeluri de funcție:

```js
var x = "ceva";

var iife = (function(x){
  console.log(x);           // ceva
  var x = "ceva ascuns";    // ceva ascuns
  console.log(x);
})(x);

console.log(x);             // ceva
```

Foarte interesant este cazul în care în IIFE ai marea partea a funcțiilor care trebuie să rămână private, dar ai nevoie să expui câteva în global (de fapt, Șablonul Modul - Module Pattern). Kyle Simpson trimite obiectul window în IIFE și îl denumește în parametru `global`. Pentru a expune ceva din IIFE folosește mai apoi `global.ceva`.

```js
var y = "ceva din global";

var iife = (function(global){
  console.log(global.y);    // ceva din global
  global.y = "ceva ascuns care a modificat in global";
})(window);

console.log(y);             // ceva ascuns care a modificat in global
```

## Practici

Este o practică comună pasarea obiectului global ca argument unui IIFE pentru a fi accesibil în interiorul funcției fără a folosi obiectul window, ceea ce face codul să fie independent de mediul browserului.


## Studiu de caz combinat cu un clojure

```js
function afiseazaFructele(fructe){
  for (var i = 0; i < fructe.length; i++) {
    setTimeout( function(){
      console.log( fructe[i] );
    }, i * 1000 );
  }
}

afiseazaFructele(["mar", "banană", "pere", "struguri"]);

// va afișa undefined de patru ori
```
Acest lucru se întâmplă pentru că execuția celor patru iterații este foarte rapidă, mai rapidă decât răspunsul lui setTimeout care începe cu o secundă. Pentru că un clojure, care face o referință către variabila care ține valoarea, va face o referință către i, care deja este 4 datorită vitezei de execuție comparativ cu cea a timeout-ului.

Pentru a rezolva comportamentul, este nevoie de a fi creat un nou scope pentru fiecare funcție împlicată în buclă și de o variabilă, care să țină minte valoarea lui i.


```js
function afiseazaFructele(fructe){
  for(var i = 0; i < fructe.length; i++){
    (function(){
      var valAcum = i;
      setTimeout(function(){
        console.log(fructe[valAcum]);
      }, valAcum * 1000);
    })();
  };
};

afiseazaFructele(["mar", "banană", "pere", "struguri"]);
```
 și o variantă cu pasarea valorii

 ```js
 function afiseazaFructele(fructe){
   for(var i = 0; i < fructe.length; i++){
     (function(valAcum){
       setTimeout(function(){
         console.log(fructe[valAcum]);
       }, valAcum * 1000);
     })(i);
   };
 };

 afiseazaFructele(["mar", "banană", "pere", "struguri"]);
 ```
