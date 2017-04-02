Tuturor funcțiilor le este pasat parametrul `arguments`.

## Mantre

- parametrul `arguments` nu este referința către un array adevărat.
- Acest parametru oferă posibilitatea de a gestiona orice număr de argumente care ar fi pasate.
- Chiar dacă definim un număr limitat de parametri, vom putea accesa toate argumentele pasate prin intermediul parametrului `arguments`.

Un exemplu ar fi fuzionarea datelor a două obiecte distincte:

```javascript
var obiect1 = {nume: 'ISS'};
var obiect2 = {tip: 'vehicul spațial', viteza: '270000', actiune: function(){console.log('ceva din obiect');}};

function fuzioneazaObiecte(date){
  // #1 treci prin valorile lui arguments și pornește de la index 1, pentru că pentru 0 este primimul argument
  for(var i = 1; i < arguments.length; i++){
    // #2 treci prin valorile fiecăruia dintre argumentele suplimentare pasate
    for(var key in arguments[i]){
      // refaci date adăugându-i perechile cheie-valoare ale argumentelor suplimentar pasate.
      date[key] = arguments[i][key];
    }
  }
  // #3 returnezi obiectul recompus
  return date;
};

var obiectCompus = fuzioneazaObiecte(obiect1, obiect2);
```

## Overloading făcut pe baza numărului de argumente pasat funcției.

Ținta este să realizezi ceva diferit ori de câte ori numărul argumentelor este de o anumită valoare.

```javascript
var obiectCuMetodeConstruiteDinamic = {};

var adaugMetoda = function(obiect, nume, functie){
  // #1. Stochezi funcția care exista deja ca metodă pentru că o vom chema dacă funcția pasată nu are numărul așteptat de argumente
  var preExistent = obiect[nume];

  // #2 Creezi o funcție anonimă care va deveni metoda obiectului
  obiect[nume] = function(){
    if (functie.length == arguments.length){
      // #3 dacă numărul de parametrilor este egal cu cel al argumentelor, atunci funcția pasată este invocată
      return functie.apply(this, arguments);
    } else if (typeof preExistent == 'function') {
      // #4 invocă funcția preexistentă dacă funcția pasată nu satisface condiția.
      return preExistent.apply(this, arguments);
    }
  };
};

adaugMetoda(obiectCuMetodeConstruiteDinamic, 'actiune', function(){console.log('eu nu am niciun argument');});
adaugMetoda(obiectCuMetodeConstruiteDinamic, 'actiune', function(a){console.log('eu am un argument');});
adaugMetoda(obiectCuMetodeConstruiteDinamic, 'actiune', function(a,b){console.log('eu am două argumente');});

console.log(obiectCuMetodeConstruiteDinamic.actiune()); // "eu nu am niciun argument"
console.log(obiectCuMetodeConstruiteDinamic.actiune(1)); // "eu am un argument"
console.log(obiectCuMetodeConstruiteDinamic.actiune(1,2)); // "eu am două argumente"
```
