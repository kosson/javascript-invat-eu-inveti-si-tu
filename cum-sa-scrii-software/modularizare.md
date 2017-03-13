# Modularizarea codului

Pentru a înțelege mai simplu modularizarea ar fi necesar să înțelegem fiecare componentă ca o valoare. Aceste valori la rândul lor pot fi puse împreună într-un singur obiect sau pot fi incapsulate frin efectele pe care le are un closure.

Modulele sunt colecții de funcții care au elemente ce țin de zona internă pe care ar trebui să le percepem a fi private și elemente externe, care permit interacțiunea.

O posibilă structură ar fi:

```javascript
var lansareInSpatiu = (function (primescDate) {
  // mecanismul de expunere a metodelor publice
  return {
    pregatire: pregatire,
    preFlight: preFlight,
    lansare: lansare
  };

  // metode publice
  function pregatire (verifRampa, combustibil) { console.log('Totul OK!'); };
  function preFlight (sisteme, subsisteme) { console.log('Verificare finală'); };
  function lansare (ghidaj, presiune) { console.log('Lansare!'); };

  // metode interne - helpers
  function egalizarePresiune (com, senzorA) { console.log('presiune egalizată');}
})(primescDate);
```

Cu ajutorul closure-urilor se poate scrie cod care să ruleze într-un mediu izolat, adică într-un closure. Acest closure, acest model de incapsulare a funcționalităților, durează câtă vreme rulează aplicația și oferă o zonă privată, care poate memora o stare. Un exemplu este o funcție anonimă executată imediat.

Cel mai simplu este de a „îmbrăca” codul într-o funcție anonimă autoexecutabilă, care are drept efect izolarea de Global space. Acest model stă la baza șablonului Module.

```js
// exemplu de closure anonim, adică Imediately Invoked Function Expressions - IIFE
(function () {
	// toate variabilele și funcțiile se află doar în acest scope
	// se pot accesa toate variabilele globale
}());
```

Pornind de la acest model, se poat rula cod extern:

```js
(function($, Mootools){
  // acum ai acces la globalele jQuery ca prescurtarea $ și la Mootools
}(jQuery, Mootools));
```

Se pot trimite referințe către alte obiecte de care este nevoie cum ar fi chiar `window`.

```js
(function(window, document, jQuery){
  // cod izolat de global scope.
})(window, document, jQuery);
```

## Construcția de APIuri

Motivul pentru care ai dori să trimiți window este pentru că ai dori să construiești un API chiar în window:

```js
(function(window, document, jQuery){
  // cod izolat de global scope.

  var UnModul = (function(){
    var instanta;
    var init = function(){var element = 'ceva'; return element;};
    return {
      getInstance: function(){
        if(!instanta){
          instanta = init();
        }
        return instanta;
      }
    };
  })();

  if(!window.UnModul ) window.UnModul = UnModul;
  // astfel, realizezi un mic API în window. De fapt, controlezi accesul la global scope
})(window, document, jQuery, UnAltObiectCreat);

// mai apoi poți testa dacă UnModule s-a încărcat pentru ca aplicația să lucreze.
console.log(window.UnModul);

// poți trimite orice obiect pentru a lucra cu el.
```
