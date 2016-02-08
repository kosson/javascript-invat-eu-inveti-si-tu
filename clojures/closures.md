# Clojures
---

## Definiții

Clojure este atunci când o FUNCȚIE ține minte scope-ul lexical chiar și atunci când este executată în afara acelui scope lexical (Kyle Simpson).

Un clojure este un obiect special care combină două lucruri: o funcție și mediul în care aceasta a fost declarată. Mediul, adică scope-ul lexical constă din toate variabilele locale care erau în-scope la momentul în care s-a creat clojure-ul.

## Mantre
- JavaScript are un **scope lexical** generat la faza de compilare.
- Clojure-uri generează doar funcțiile.
- Un clojure permite accesarea variabilelor definite în funcția container.
- de fiecare dată când funcția externă este apelată, funcția internă este definită din nou. Codul funcției interne va fi identic, dar scope chain-ul asociat va fi diferit.
- un clojure nu poate accesa `this` al funcției container. În acest scop se folosește salvarea lui this într-o variabilă ```var self = this;``

## Analiză

Un clojure este creat atunci când salvezi o funcție care are acces la contextul de execuție curent și o salvezi într-o variabilă în afara contextului de execuție curent.

```js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
console.log(add5(2));  // 7
```
makeAdder() este cazul prezentat de Mozilla. Este perfect pentru a înțelege felul în care clojure-ul se formează în primă fază returnându-se funcția internă iar aceasta la rândul său returnând variabilele din mediu.
- makeAdder() generează scope-ul iar parametrul x devine variabilă locală atribuindu-se valoarea 5 la momentul invocării;
- makeAdder returnează o funcție iar variabila add5 devine referință către funcția internă. Astfel, add5 este o funcție a cărui parametru y devine variabilă locală în scope-ul creat de ea.
- add5(2) atribuie variabilei interne valoarea 2 și returnează suma dintre variabila locală și variabila peste care s-a făcut clojure din funcția container.

Spune documentația Mozilla că „în esență, makeAdder este o fabrică de funcții”.

Exemplu de referințe către obiecte care nu este un clojure (prezentat de Kyle Simpson):

```js

var obiect = (function(){
  var o = {test: "test"};
  return {obj: o} // obj ține o referință către obiectul o
})();

console.log(obiect.obj.test); // => test
```

## Utilitate

Este baza lui MODULE PATTERN prin care se realizează încapsularea și/sau ascunderea datelor.

## Erori
Este considerată a fi o eroare crearea de clojure-uri în bucle.
