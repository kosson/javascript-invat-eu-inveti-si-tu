# Dependințe cognitive

- Immediately Invoked Function Expressions - IIFE
- Șablonul Module - Module Pattern

Este o versiune îmbunătățită a lui Module.

Pe scurt, definești toate variabilele și funcțiile în scope privat și returnezi un obiect anonim la finalul modulului care conține pointeri către variabilele și funcțiile anonime pe care dorești să le faci publice.

Avantajul este că sintaxa prezintă mult mai multă consistentă.

## Cum se construiește?

La bază poate fi și un object literal:

```js
var Modul = {
  var metoda1: function(){},
  var metoda2: function(){}
}
```

Folosirea unei funcții permite declararea de „variabile private”.

```js
var Module = function(){
  var privat = "Sunt variabilă privată";
  return {
    metoda1: function(){},
    metoda2: function(){}
  };
};
```

Construirea acestui șablon pentru a returna selectiv:

```js
var Module = function(){

  var privat = "Sunt variabilă privată";

  var metoda1 = function(){};
  var metoda2 = function(){};

  return {
    metoda1: metoda1,
    metoda2: metoda2
  }
};
```

## Modelul „clasic” (Module) - funcție - nu permite modificarea

```js
var modul = (function(){

  var obiectIntern = {prop: "ceva"};

  return {
    metodaApelabila: function(){
      console.log(obiectIntern.prop);
    }
  };
})();
modul.metodaApelabila(); // => ceva
```

## Analiză

### Cerințe pentru a avea modelul clasic

- o funcție container care să se execute. Nu este neapărat necesar să fie un IIFE.
- una sau mai multe funcții interne, care sunt returnate la apelarea acelei funcții și care realizează un clojure peste scope-ul intern al funcției container.

### Cum funcționează

A. O funcție anonimă împachetează mai multe funcții interne. Aceasta creează un scope distinct care izolează interiorul de global.
B. Funcția anonimă „conține” toate celelalte funcții, care, de fapt sunt funcționalitățile modulului.
C. Rezultatul execuției nu este stocat în variabilă pentru că funcția anonimă deja a fost executată.
D. În „interior” (scope) se construiește un obiect cu referințe către funcțiile care vor fi „publice”, adică vor putea fi invocate.
E. În „interior” (scope) pot exista și alte funcționalități auxiliare care să fie de ajutor.
F. Se construiește un obiect care „strânge” toate referințele către funcțiile din scope-ul funcției container.
G. Obiectul este returnat.
H. Variabila căreia îi este atribuit IFFE-ul, de fapt, menține o referință către obiectul returnat, care la rândul său este o colecție de referințe.

Astfel, pot fi ascunse toate detaliile de implementare și prin returnare (ca în cazul API-urilor), sunt expuse părțile care sunt necesare.

## Șablonul Module urmărește logica unui API.

```js
// oferit de Kyle Simpson
var foo = (function(){
  var publicAPI = {

    bar: function(){ publicAPI.baz(); },

    baz: function(){ console.log("baz"); }

  };
  return publicAPI;
})();
foo.bar(); // baz
```

La momentul rulării, acest model permite modificări. Modelul anterior, clasic, nu permite modificări. `foo` și `publicAPI` sunt referințe către același obiect, obiectul returnat. Există o diferență totuși: referința către obiectul din modul, nu poate fi utilizată în exteriorul modulului. Modulul care poate fi referit din exterior este numele variabilei, în cazul nostru foo.

Un modul poate avea puncte de legătură cu mediul înconjurător prin pasarea în IIFE a unor referințe către alte obiecte.

```js
(function($, Backbone){
  // codul modulului
}(jQuery, Backbone));
```

### Cum faci un mic plugin?

```js
var modul = (function(){
  var obiectDeReturnat = {
    membru: 'un membru public'
  };
  return obiectDeReturnat;
}());

var plugin = (function(modul){
  modul.membruDinPlugin = 'membru inserat în modul de plugin';
}(modul || {}));
```

Instantaneu ceea ce se întâmplă este că plugin introduce în obiectul modul un nou membru.

Dezavantajul major acestui șablon este acela că în cazul în care o funcție internă face o referință către o funcție publică, acea funcție publică nu poate fi suprascrisă dacă este nevoie de o corectură.
