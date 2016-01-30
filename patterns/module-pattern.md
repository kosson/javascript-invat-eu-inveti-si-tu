# Module pattern

## Dependințe cognitive
- funcții anonime
- Clojures
- Immediately Invoked Function Expressions - IIFE

## Ce face?
Returnează un obiect

## Model

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

### Cerințe petru a avea modelul clasic

- o funcție externă container care să se execute. Nu este neapărat necesar să fie un IIFE.
- una sau mai multe funcții interne, care sunt returnate la apelarea acelei funcții și care realizează un clojure peste scope-ul intern al funcției container.

Rezultatul execuției nu este stocat în variailă pentru că funcția anonimă, deja a fost executată.
Variabila menține o referință către obiectul returnat.

Astfel, pot fi ascunse toate detaliile de implementare și prin returnare (ca în cazul API-urilor), sunt expuse părțile care sunt necesare.

## Modelul oferit de Kyle Simpson - urmărește logica unui API.

```js
var foo = (function(){
  var publicAPI = {
    bar: function(){
      publicAPI.baz();
    },
    baz: function(){
      console.log("baz");
    }
  };
  return publicAPI;
})();
foo.bar();
```

La momentul rulării acest model permite modificări. Modelul anterior, clasic, nu permite modificări. `foo` și `publicAPI` sunt referințe către același obiect.
