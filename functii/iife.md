# IIFE - Immediately Invoked Function Expression

IIFE permite invocarea imediată a unei funcții anonime fără a salva o referință. Permite crearea de spații de cod executabile separat de global scope. Un IIFE este folosit pentru a crea un scope și pentru a încapsula module.

Scopul parantezelor, adică a operatorului de grupare, este de a transforma definirea funcției într-o expresie. Acest lucru se întâmplă pentru că în JavaScript tot ce este între paranteze este tratat ca o expresie. A doua pereche de paranteze face ca funcția să fie executată imediat.

## Dependințe cognitive

-   funcții
-   clojures

Dacă atribuiți funcția unei variabile, nu trebuie să punem funcția între paranteze deoarece este deja o expresie.

```javascript
var salutare = function () {
  alert('Salut!');
}();
```

Sunt două moduri de a scrie IIFE-urile și aici este o chestiune de gust:

```javascript
// prima variantă
(function () { alert('Salut!'); })();

// a doua variantă
(function () { alert('Salut!'); }());
```

IIFE-urile primesc argumente pentru că nu trebuie uitat că un IIFE este o funcție de fapt. Buna practică spune că un IIFE-urile trebuie să fie referențiate.

```javascript
var x = (function (nume, profesia) {
  console.log("Mă cheamă " + nume + ". Și sunt " + profesia + ".");
})("Rică Răducanu", "zeu"); //Mă cheamă Rică Răducanu. Și sunt fotbalist.
```

Pentru a realiza IIFE-uri se pot folosi și arrow functions.

```javascript
var y = ((nume, profesie) => {
  console.log(`Sunt ${nume} și sunt ${profesie}`);
})('Gică Hagi', 'rege'); // Sunt Gică Hagi și sunt rege
```

## Model

```javascript
var x = "ceva";

(function () {
  var x = "ceva ascuns";
  console.log(x);
})();

console.log(x);
// => 'ceva ascuns'
// => 'ceva'
```

## Când folosești?

-   atunci când dorești să ascunzi funcționalități fără a lăsa nicio urmă în GLOBAL sau LOCAL SCOPE
-   atunci când construiești Șabloane Modul.

### Ce este un IIFE pentru limbaj?

Este o **expresie de funcție** (*function expression*). Este o funcție exprimată pentru că o îmbraci în paranteze, ceea ce grupează toate expresiile iar în cazul nostru avem una singură: funcția.

### Construcții cu IIFE - uri

#### Execuția unui funcții fără a returna nimic

Să pornim cu cel mai simplu exemplu, dar, din capul locului, buna practică spune să declarăm o variabilă care să referențieze IIFE-ul. Nu-l lăsa anonim. Beneficiul este că va apărea în call-stack (stiva de execuție) atunci când din diferite motive codul dă erori.
Cel mai simplu exemplu este cel al unei funcții care se autoexecută instant pentru că motorul are nevoie să atribuie identificatorului valoarea evaluată a funcției. Îți readuc aminte că toate funcțiile sunt valori și că operatorul `()` declanșează execuția funcției ceea ce conduce la evaluarea tuturor expresiilor din interior. Și nu te las să uiți faptul că, de fapt, un IIFE este rezultatul evaluării expresiei din partea dreaptă a operatorului egal.

```javascript
var iife = (function () {
  var x = "ceva ascuns";
  console.log(x);
})();
console.log(iife); // undefined
```

De ce valoarea finală a identificatorului este `undefined`? Da, ai intuit bine, funcția s-a executat fără a returna nimic. Și-a produs efectele și atât. Nu a returnat nicio valoare.

#### Execuția unei funcții care primește valori din exterior prin argumente fără a returna

IIFE-urile pot primi valori pentru că, de fapt, este un apel al unei funcții care se aplică unor posibile argumente. Aceasta este baza pentru înțelegerea modularității codului JavaScript. Folosirea IIFE-urilor este o practică comună pentru foarte multe biblioteci de cod.

```javascript
var x = "ceva";
var iife = (function (x) {
  console.log(x);           // ceva
  var x = "ceva ascuns";    // ceva ascuns
  console.log(x);
})(x);
```

Foarte interesant este cazul în care în IIFE ai marea parte a funcțiilor care trebuie să rămână private, dar ai nevoie să expui câteva în global (de fapt, este modelul șablonului *Modul* - **Module Pattern**). Poți trimite obiectul window în IIFE și îl denumește în parametru `global`. Pentru a expune ceva din IIFE folosește mai apoi `global.ceva`.

```javascript
var y = "ceva din global";
var iife = (function (global) {
  console.log(global.y);    // ceva din global
  global.y = "ceva ascuns care a modificat in global";
})(window);
console.log(y); // ceva ascuns care a modificat in global
```

Este o practică comună pasarea obiectului global ca argument unui IIFE pentru a fi accesibil în interiorul funcției fără a folosi obiectul `window`, ceea ce face codul să fie independent de mediul browserului.

#### Pasarea unui obiect de lucru ca argument sau a unuia gol dacă nu există deja

Există cazul în care fie ai nevoie să lucrezi cu un obiect populat deja și pe care să-l prelucrezi intern, fie dacă acest obiect nu există și dorești crearea unuia gol pe care să-l folosești intern.

```javascript
var obiect;
var iife = (function (obi) {
  obi['spot'] = true;
  return obi;
})(obiect || (obiect = {}));
console.log(iife); // {"spot":true}
```

#### Sunt acceptate mai multe niveluri de imbricare

Dacă este necesar, IIFE-urile pot conține alte IIFE-uri în caz de necesitate.

```javascript
var racheta;
(function (racheta) {
  var propulsor = racheta.propulsor;
  (function (propulsor) {
    var amestec = (function () {
      function Valva (oxidant) {
        this.oxidant = oxidant;
      };
      Valva.prototype.injecteaza = function () {
        console.log('Injectez ' + this.oxidant);
      };
      return Valva;
    })();
    propulsor.amestec = amestec;
  })(racheta.propulsor || (racheta.propulsor = {}));
})(racheta || (racheta = {}));
```

## Studiu de caz combinat cu un closure

```javascript
function afiseazaFructele(fructe){
  for (var i = 0; i < fructe.length; i++) {
    setTimeout( function(){
      console.log( fructe[i] );
    }, i * 1000 );
  }
};
afiseazaFructele(["mar", "banană", "pere", "struguri"]);
// va afișa undefined de patru ori
```

Acest lucru se întâmplă pentru că execuția celor patru iterații este foarte rapidă, mai rapidă decât răspunsul lui `setTimeout` care începe cu o secundă. Pentru că un closure, care face o referință către variabila care ține valoarea, va face o referință către `i`, care deja este 4 datorită vitezei de execuție comparativ cu cea a timeout-ului.

Pentru a rezolva comportamentul, este nevoie de a fi creat un nou scope pentru fiecare funcție implicată în buclă și de o variabilă, care să țină minte valoarea lui `i`.

```javascript
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

 ```javascript
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
