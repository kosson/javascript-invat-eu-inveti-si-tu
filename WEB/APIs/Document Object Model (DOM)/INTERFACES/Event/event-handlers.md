# Event handlers - gestionari de evenimente

În relația codului JavaScript cu DOM-ul, evenimentele sunt gestionate prin așa-numiții „event handlers” - **gestionari de evenimente** în limba română, dacă dorești.

## Spune standardul

Unele obiecte pot primi „semnale” (`events`), care trebuie gestionate intern de acestea. Aceste „semnale” (`events`) sunt „ascultate” de *receptorii de evenimente* (`event listeners`), fără ca aceste evenimente (semnale), să fie capturate/reținute de obiectele cărora le sunt destinate.

Un „gestionar de evenimente” (`event handler`) are un nume ușor de deosebit pentru că începe cu `on`, fiind urmat de numele explicit al evenimentului. Un „gestionar de evenimente” are o valoare care este fie `null`, fie este un obiect callback sau poate fi chiar o secvență de cod brută, necompilată.

Gestionarii de evenimente sunt „expuși” în două moduri:

-   un mod comun tuturor gestionarilor (event handlers) este ca atribut IDL al event handler-ului. Numele atributului IDL este chiar numele evenimentului (`onclick`, `onclose`).
-   ca atribut de conținut al gestionarului de evenimente; de fapt numele unei funcții JavaScript.

Pentru ca un eveniment să aibă loc, trebuie să spunem explicit acest lucru browserului prin „înregistrarea” de evenimente. Acest lucru se poate face prin două modalități:

-   prin atașarea de funcții unor proprietăți speciale (de ex. `document.body.onclick = function () {};`)
-   și prin folosirea metodei interne `addEventListener()`.

Un exemplu foarte simplu ar fi cel pe care practica îl indică ca fiind o cerință la momentul în care începi să scrii cod pentru client. Verifici dacă pagina s-a încărcat prin faimoasa secvență:

```javascript
window.onload = function () {}; // la încărcarea paginii execută funcția
// DOM-ul este pregătit și pe deplin încărcat
```

Și o variantă mai dezvoltată:

```javascript
function onReady (){
  console.log('Totul s-a încărcat');
};
window.onload = onReady;
```

Se pot atașa funcții direct unor proprietăți, dar această practică poate conduce la erori, suprascrieri de eveniment, ș.a.m.d. Cel mai bine este să se folosească metoda `addEventListener()`:

```javascript
// poți atașa direct
document.body.onclick = function () {};

// sau prin utilizarea metodei dedicate addEventListener
document.body.addEventListener("click", function(){
  var elemCentral = document.getElementById("central");
  oFunctieCareFaceCeva(elemCentral, "S-a dat click");
});
```

## Resurse

[Event handlers](https://html.spec.whatwg.org/multipage/webappapis.html#event-handlers)
