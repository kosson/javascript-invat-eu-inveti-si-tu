Javascript are un model de execuție foarte flexibil. Toate funcțiile beneficiază de metoda apply(), care permite apelarea funcției cu un array ca și cum elementele din array ar fi argumentele funcției.

## Definiții

Functional programming -- programarea bazată pe funcții constă în folosirea funcțiilor pentur a transforma valorile în unități de abstractizare, care mai apoi sunt folosite pentru a construi software. (Michael Fogus, „Functional Javascript”).

## Descriere

Ascunderea datelor și a comportamentelor este felul în care poate fi privite funcțiile ca unități de abstractizare.

## Mantre

- Orice funcție poate fi apelată cu oricâte argumente de orice tip în orice moment.
- Funcțiile care returnează un Boolean, se numesc predicate.

Un exemplu este o funcție care primește o funcție ca argument și returnează o altă funcție.

```js
function oFunctie (functie_primita){
  return function (array){
    return functie_primita.apply(null, array); // null setează obiectul context la global object (window, de regulă)
  }
};

var faOAdunare = oFunctie(function(unu, doi){return unu + doi;});

faOAdunare([2, 3]); // 5
```
