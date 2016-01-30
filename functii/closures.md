# Clojures

## Definiție

    Clojure este atunci când o FUNCȚIE ține minte scope-ul lexical chiar și atunci când este executată în afara acelui scope lexical (Kyle Simpson).

## Analiză

Un clojure este creat atunci când salvezi o funcție care are acces la contextul de execuție curent și o salvezi într-o variabilă în afara contextului de execuție curent


## Mantre
- JavaScript are un **scope lexical** generat la faza de compilare.
- Clojures generează doar funcțiile.
- de fiecare dată când funcția externă este apelată, funcția internă este definită din nou. Codul funcției interne va fi identic, dar scope chain-ul asociat va fi diferit.
- un clojure nu poate accesa `this` al funcției container. În acest scop se folosește salvarea lui this într-o variabilă ```var self = this;`` `

Exemplu de referințe către obiecte care nu este un clojure (prezentat de Kyle Simpson):

```js

var obiect = (function(){
  var o = {test: "test"};
  return {obj: o} // obj ține o referință către obiectul o
})();

console.log(obiect.obj.test); // => test
```

## Utilitate

Este baza lui MODULE PATTERN
