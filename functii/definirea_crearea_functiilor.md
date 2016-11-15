# Definirea funcțiilor

Funcțiile pot fi definite („create”) în trei feluri:

- prin intermediul unei `function expression`: `var adunare = function demo(param1, param2){ return param1 + param2; };`. Este cazul unei `named function expression`
- prin declararea funcției: `function demo(param1, param2){ return param1 + param2; };`
- Prin folosirea constructorului `new Function()`
- Prin folosirea lui „fat arrow” pentru a defini o funcție: `argument => argument++`. **Fat arrow** este introdus de EcmaScript 2015 (ES6).
- Prin folosirea funcțiilor „generator”: `function* generator(){ yield true; };`, fiind introdus de EcmaScript 2015 (ES6).

## Mantre
- Funcțiile sunt obiecte.
- Toate funcțiile sunt instanțe ale obiectului intern standard `Function`.
- Funcțiile pot fi create dinamic folosind constructorul `Function`.
- funcțiile nu sunt „deținute” sau „conținute” de un obiect atunci când sunt metode chiar dacă sunt declarate în obiect sau în afara lui.

## Crearea funcțiilor prin constructor

```js
var oFunctie = new Function('arg1', 'arg2', 'return arg1 + arg2;');
oFunnctie(2, 4); // 6
```

## Function declaration

Numirea funcției este obligatorie.

```js
function oFunctie(){              // funcție declarată
  function oFunctieGazduita(){};  // o altă funcție declarată
};
```

## Function expressions

Sunt funcțiile care sunt parte a unui alt statement.

Funcțiile create ca parte a unei expresii, adică a căror expresie literală se va afla în partea dreaptă a unei expresii, se numesc **function expressions**. Tot function expressions sunt și funcțiile care sunt pasate ca argumente.

```js
var functie = function(){};
functie(function(){});      // callback-urile sunt function expressions.
functie(function(){
  return function(){};      // funcțiile returnate tot function expressions sunt.
});
(function functie(){})();   // chiar și în cazul unui IFFE, tot despre un function expression vorbim.
```
tar -xzf /home/kosson/domains/rrbsi.kosson.ro/public_html/ojs-3.0.0.tar.gz
