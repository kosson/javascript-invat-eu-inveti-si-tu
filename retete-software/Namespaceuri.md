# Crearea de namespace-uri

Pentru a evita coliziuni cu numele date unor constructori sau funcții care aparțin altor biblioteci de cod, se vor constitui „spații” destinate rulării codului propriu.

## Constituirea unor „namespaceuri” pentru propriile obiecte

```javascript
var zonaMea = zonaMea || {}; // constituirea zonei în care va trăi obiectul creat

zonaMea.primulObi = zonaMea.primulObi || {};
```

Raționamentul este următorul:

Dacă obiectul `zonaMea` nu există, te rog, creează un obiect gol. Dacă acest obiect există deja, atunci `zonaMea` să fie obiectul care deja există.

## Folosirea funcțiilor pentru a crea namespace-uri

Motivul este că funcțiile au capacitatea de a crea, de a generea noi medii lexicale, pe scurt cunoscutele scope-uri.

Cel mai la îndemână exemplu ar fi crearea unei funcții printr-un function expression și rularea la asignare (în right hand side).

```javascript
var modul = function x(){
  let ceva = 10;
  console.log(ceva);
}();
```

Apoi și mai bine este izolarea completă a codului propriu prin rularea într-o funcție care se autoexecută.

```javascript
(function facCeva(){
  let x = 10;
  return x;
})(); // 10
```

## Tratarea obiectelor ca interfețe

```javascript
let facCeva = function (){
  let ceva = 10;
  function adunare(termen){
    return ceva + termen;
  };
  return {
    adunare: adunare
  };
}();
console.log(facCeva.adunare(10)); // 20
```

În exemplu este returnat un obiect care se comportă ca o interfață de lucru cu funcția autoexecutabilă.

## Obiecte ca interfețe pasate ca argument

```javascript
(function(exports){})(this.conector = {});
```

Primul pasa este declararea unui funcții autoexecutabile care să primească drept argument un obiect intitulat în exemplul nostru `conector` și care este accesat în interiorul funcției prin intermediul parametrului numit din obișnuință `exports`.

```javascript
(function(exports){
  let ceva = 10;
  let colectie = [20, 30, 40];
  exports.adunare = function(termen){
    return termen + ceva;
  };
  exports.alege = function(alegere){
    return colectie[alegere];
  };
})(this.opDeBaza = {});

console.log(opDeBaza.adunare(opDeBaza.alege(2))); // 50
```

La final, ai acces la un obiect care are metode care expun atât cât este necesar.
