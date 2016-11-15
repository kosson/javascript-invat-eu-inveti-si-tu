„Programarea dictată de evenimente se întâmplă atunci când un sistem este interesat de un set de evenimente, oferă o cale de a fi anunțat atunci când evenimentele se întâmplă și răspunde la acestea folosind callback-uri”. (*Beautiful Javascript*, Jonathan Barronville).

## Mantre

- HTML nu este DOM.
- callback-ul este un clojure a cărui funcție va fi invocată atunci când un anumit eveniment se întâmplă.
- un eveniment este de fapt modificarea la un moment dat a stării unui sistem.

În relația codului JavaScript cu DOM-ul, evenimentele sunt gestionate de așa-numiții „event handlers”.
Pentru ca un eveniment să aibe loc, trebuie să spunem explicit acest lucru browserului prin „înregistrarea” de evenimente. Acest lucru se poate face prin două modalități:
- prin atașarea de funcții unor proprietăți speciale (de ex. `document.body.onclick = function(){};`)
- și prin folosirea metodei interne `addEventListener`.

Un exemplu foarte simplu ar fi cel pe care practica îl indică ca fiind o cerință la momentul în care începi să scrii cod pentru client. Verifici dacă pagina s-a încărcat prin faimoasa secvență:

```js
window.onload = function(){}; // la încărcarea paginii execută funcția
// DOM-ul este pregătit și pe deplin încărcat
```
Și o variantă mai dexvoltată:

```js
function onReady(){
  console.log('Totul s-a încărcat');
}

window.onload = onReady;
```

Se pot atașa funcții direct unor proprietăți, dar această practică poate conduce la erori, suprascrieri de eveniment, ș.a.m.d. Cel mai bine este să se folosească metoda `addEventListener`:

```js
// poți atașa direct
document.body.onclick = function(){};

// sau prin utilizarea metodei dedicate addEventListener
document.body.addEventListener("click", function(){
  var elemCentral = document.getElementById("central");
  oFunctieCareFaceCeva(elemCentral, "S-a dat click");
});
```
