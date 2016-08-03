# Closures în bucle

Acesta este un caz de closure care ilustrează cel mai bine felul în care se manifestă și efectele manifestate.

Cazul a fost preluat de la resursa online „js by example”: [Closures in loop](https://github.com/bmkmanoj/js-by-examples/blob/master/examples/closures_in_loop.md "Link către resursa originală Closures in loop")

```js
var data = [0, 1, 2];
var funcs = [];

function init() {                       // 0
    for (var i = 0; i < 3; i++) {

        var x = data[i];                // 1
        var innerFunc = function() {    // 2
            return x;
        };

        funcs.push(innerFunc);          // 3
    }
}

function run() {                        // 4
    for (var i = 0; i < 3; i++) {
        console.log(data[i] + ", " +  funcs[i]());   // 5
    }
}

init();
run();

// 0, 2
// 1, 2
// 2, 2
```
![Ilustrație pentru Closures in loop](closuresInLoop.svg)

## init()
init() ciclează de 3 ori iar x va rămâne după finalizarea buclei la valoarea 2.
innerFunction face „enclosing” (circumscrie) variabila x.

La momentul execuției sunt introduse în array-ul funcs trei referințe către funcția internă a lui init(), astfel, făcânduse un clojure pe funcția internă.

## run()
la execuție, run(), va executa rând pe rând funcțiile din funcs[]. Toate returnează aceeași valoare, adică ultima rezultată din excuția buclei.

## PROBLEMA
Variabilele din funcțiile interne cu același identificator (x în cazul nostru) sunt legate de aceeași variabilă cu cea din funcția container. Acest lucru se întâmplă pentru că variabilele au același scope stabilit de funcția container. Variabilele nu sunt block scoped, adică limitate la scope-ul creat de funcția internă.


```js
var data = [0, 1, 2];
var funcs = [];

function init() {
    for (var i = 0; i < 3; i++) {

        var x = data[i];
        var innerFunc = function() {
            var temp = x;
            return function() {
                return temp;
            };
        }();

        funcs.push(innerFunc);
    }
}

function run() {
    for (var i = 0; i < 3; i++) {
        console.log(data[i] + ", " +  funcs[i]());
    }
}

init();
run();

// 0, 0
// 1, 1
// 2, 2

```
![Scopping făcut la nivel de funcție internă care ține minte mediul pentru fiecare iterație](closureInLoops.png)
