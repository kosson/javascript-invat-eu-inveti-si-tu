# Namespaces - Domenii de nume

## Izolarea de Global Space

Cel mai simplu este de a „îmbrăca” codul într-o funcție anonimă autoexecutabilă.

```js
(function(){
  // cod izolat de global scope.
})();
```

În obiectul creat astfel, se pot trimite referințe către alte obiecte de care este nevoie.

```js
(function(window, document, jQuery){
  // cod izolat de global scope.
})(window, document, jQuery);
```

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

## Concepte tratate
A. namespaces - domenii de nume

```js
var domeniu = domeniu || {};

var domeniu.Obiect = function mamifer(caracteristica){};
```
