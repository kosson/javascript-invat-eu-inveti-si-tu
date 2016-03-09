# Module pattern
---

## Dependințe cognitive
- funcții anonime
- Clojures
- Immediately Invoked Function Expressions - IIFE

## Ce este?
O cale simplă de a incapsula metode. Poate fi considerat o cutie cu scule.

## Ce face?
**Returnează un obiect**

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

Mai există un mod de a construi acest șablon pentru a returna selectiv și se numește Revealing Module Pattern

```js
var Module = function(){

  var privat = "Sunt variabilă privată";

  var metoda1 = function(){},
  var metoda2 = function(){},

  return {
    metoda1: metoda1,
    metoda2: metoda2
  };
};
```

## Modelul „clasic” - funcție - nu permite modificarea

```js

var modul = (function(){

  var obiectIntern = {prop: "ceva"};

  return { metodaApelabila: function(){ console.log(obiectIntern.prop); } };
})();
modul.metodaApelabila(); // => ceva

```

## Analiză

### Cerințe pentru a avea modelul clasic

- o funcție externă container care să se execute. Nu este neapărat necesar să fie un IIFE.
- una sau mai multe funcții interne, care sunt returnate la apelarea acelei funcții și care realizează un clojure peste scope-ul intern al funcției container.

Rezultatul execuției nu este stocat în variabilă pentru că funcția anonimă deja a fost executată.
Variabila menține o referință către obiectul returnat.

Astfel, pot fi ascunse toate detaliile de implementare și prin returnare (ca în cazul API-urilor), sunt expuse părțile care sunt necesare.

## Modelul oferit de Kyle Simpson - urmărește logica unui API.

```js
var foo = (function(){
  var publicAPI = {

    bar: function(){ publicAPI.baz(); },

    baz: function(){ console.log("baz");}

  };
  return publicAPI;
})();
foo.bar();
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
