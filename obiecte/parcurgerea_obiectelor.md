# Parcurgere și iterare a obiectelor

Obiectele pot fi considerate a fi colecții de date

```js
"use strict";
var obiect = { unu: "primul", doi: "al doilea" },
    cheie;
for( cheie in obiect ){
  console.log( cheie, obiect[cheie] );
};
/*
unu primul
doi al doilea
 */
```

Dacă o bibliotecă de cod ar introduce o proprietate nouă în prototipul obiectului general `Object`, atunci la parcurgerea obiectului, vom avea o proprietate suplimentară care apare.

```js
"use strict";
var obiect = { unu: "primul", doi: "al doilea" },
    cheie;
for( cheie in obiect ){
  console.log( cheie, obiect[cheie] );
};
Object.prototype.trei = "al treilea";
/*
unu primul
doi al doilea
 */
 for( cheie in obiect ){
   console.log( cheie, obiect[cheie] );
 };
 /*
 unu primul
 doi al doilea
 baz baz
  */
```

## Object.prototype.hasOwnProperty

Pentru a testa doar cheile care aparțin obiectului contruit fără proprietățile moștenite prin prototip se va testa dacă obiectul are proprietăți ale sale folosind `Object.prototype.hasOwnProperty`.

```js
"use strict";
var obiect = { unu: "primul", doi: "al doilea" },
    cheie;
Object.prototype.trei = "al treilea";
for( cheie in obiect ){
  if(obiect.hasOwnProperty(cheie)){       // verificarea se face pentru fiecare cheie. Taxează performanța
    console.log( cheie, obiect[cheie] );
  }
};
/*
unu primul
doi al doilea
 */
```
## Object.keys

Metoda `Object.keys` extrage toate cheile proprii (nu moștenit) ale unui obiect iterabil.

Această metodă ne oferă un array de chei, care poate fi iterat prin metode așa cum este `Array.prototype.forEach`.
Performanțele folosind această metodă sunt net superioare lui `hasOwnProperty`.

```js
"use strict";
var obiect = { unu: "primul", doi: "al doilea" };

Object.keys(obiect).forEach(function(cheie){
  console.log( cheie, obiect[cheie] );
});
```

## Tratarea obiectelor care seamănă cu array-uri

Cel mai la îndemână exemplu sunt nodurile DOM. Parcurgerea (traversing) DOM-ului se numește „walking the DOM”.
DOM-ul este o colecție de noduri. Cel mai ades pentru accesarea informației din nodurile de interes, mai întâi acestea trebuie identificate. Se folosesc clasicele:
- document.getElementById("#idfolosit"),
- document.getElementsByTagName,
- document.querySelector (pot fi tag-uri, class, id-uri, attributes, pseudoclase, elemente).

```js
"use strict";
var noduriDOM = document.querySelectorAll("div"),   // se constituie o colecție array-like
    arrayLike = Array.prototype.slice.call(noduriDOM);    // transformarea într-un array-like

arrayLike.forEach(function(element){
  console.log(element);
});
```

Cu o simplificare:

```js
var noduriDOM = document.querySelectorAll("div"),   // se constituie o colecție array-like
    arrayLike = [].slice.call(noduriDOM);           // transformarea într-un array-like

arrayLike.forEach(function(element){
  console.log(element);
});
```
Atenție, pentru că o țintire a elementelor de interes cu ajutorul lui querySelector poate fi confuză uneori, cel mai bine este să fie folosit atributul de selecție „data-ceva="formular"”.

```html
<ul data-target="lista">
  <li data-target="element">unu</li>
  <li data-target="element">doi</li>
  <li data-target="element">trei</li>
</ul>
```

Țintele de selecție devin mult mai clare nefiind afectate de schimbările posibile aduse elementelor DOM sau CSS

```js
var lista = document.querySelector('[data-target=\"lista\"]');
var colectia = document.querySelectorAll('[data-target=\"element\"]');

var caAr = [].slice.call(colectia);
console.log(caAr);            // Array[li, li, li]
caAr.forEach(function(elem){
  console.log(elem);          // <li data-target="element">
});
```

Elementele găsite sunt de fapt o colecție de noduri, care este dinamică în sensul că de fiecare dată când DOM-ul va suferi o modificare, se va actualiza și aceasta.

În ES6 există o aceeași abordare: `arrayLike = Array.from(nodes)`. ES6 introduce un nou tip de obiecte iterabile - obiecte ale căror elemente pot fi extrase rând pe rând.
