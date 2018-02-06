# Clase și atribute

## `className` și `classList`

Există două proprietăți care folosite în JavaScript permit modificarea claselor folosite pentru un anume element:

- `className` - care se bucură de o largă compatibilitate în ceea ce privește suportul browserelor și
- `classList` - care este introdus ceva mai recent și mai ușor de folosit.


## Adăugarea unei clase folosind `className`

Să studiem cum s-ar putea scrie o funcție care să adauge o clasă la elemente într-o deplină compatibilitate și cu browserele Internet Explorer până la versiunea 8.

```javascript
function adaugaClasa (elementele, clasa) {
  if (!elementele) {return;};                           // #0
  if (typeof(elementele) === 'string') {                // #1
    elementele = document.querySelectorAll(elementele); // #2
  };
  if (elementele.tagName) {                             // #3
    elementele = [elementele];                          // #4
  };
  for (var i = 0; i<elementele.length; i++) {           // #5
    if ( (' '+ elementele[i].className + ' ').indexOf('' + clasa + ' ') < 0 ) { // #6
      elementele[i].className += ' ' + clasa;           // #7
    };
  };
};
```

\# 0: dacă nu este precizat vreun selector, pur și simplu ieși din execuție cu un `return`;
\# 1: dacă există vreun selector menționat,
\# 2: încarcă variabila `elementele` cu o colecție a celor găsite pentru acel selector;
\# 3: dacă există vreo proprietate `tagName` a elementelor, asta înseamnă că a fost găsit un singur element pentru selectorul precizat.
\# 4: în acest caz, transformă obiectul `elementele` într-un array pentru a lucra simplu cu el.
\# 5: Pentru fiecare dintre elementele găsite,
\# 6: Dacă între clasele elementului NU apare și cel venit ca al doilea parametru,
\# 7: atunci adaugă clasa la cele existente.

Hai să vedem și o integrare completă:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">
      .atenție {
        background: red;
      }
      .memorează {
        background: green;
      }
    </style>
    <script src = "test.js"></script>
  </head>
  <body>
    <div id = "primul" class = "orice">Concentrează-te!</div>
    <div class = "ceva">Fii</div>
    <div class = "ceva">foarte</div>
    <div class = "ceva">atent!</div>
  </body>
</html>
```

După încărcare, testează din consolă prin câteva apeluri:

```javascript
adaugaClasa('#primul','atenție');
adaugaClasa('.ceva','memorează');
// sau poți pur si simplu face cautare
adaugaClasa(document.getElementById('#primul'), 'atenție');
adaugaClasa(document.querySelector('.ceva'), 'memorează');
adaugaClasa(document.querySelectorAll('.ceva'), 'memorează');
```

Folosind `classList`, codul se simplifică astfel:

```javascript
function adaugaClasa (elementele, clasa) {
  elementele = document.querySelectorAll(elementele); // #1
  for (var i=0; i<elementele.length; i++) {
    elements[i].classList.add(clasa);
  };
};
```

\# 1: Folosind querySelectorAll aduci toate elementele care se încadrează criteriului de selecție, adică selectorul pasat prin argumentul `elementele`.


Acum ar fi util și reversul: eliminarea unei clase.

```javascript
function eliminaClasa (elementele, clasa) {
  if (!elementele) {return;};
  if (typeof(elementele) === 'string') {
    elementele = document.querySelectorAll(elementele);
  };
  if (elementele.tagName) {
    elementele = [elementele]
  };
 var sablon = new RegExp('(^| )'+ clasa +'($| )','g'); // #1
 for (var i = 0; i<elementele.length; i++) {
   elementele[i].className = elementele[i].className.replace(sablon, ' '); // #2
 };
};
```

Este aceeași funcție ca și la adăugarea clasei numai că la momentul parcurgerii colecției de elemente și modificarea element cu element, vom folosi un șablon **RegExp** pentru a face un `replace` acolo unde este identificat.

Folosind noua metodă `remove` a lui `classList` ajung la următoarea simplificare a funcției de mai sus:

```javascript
function eliminaClasa (elementele, clasa) {
  elementele = document.querySelectorAll(elementele);
  for (var i=0; i<elementele.length; i++) {
    elements[i].classList.remove(clasa);
  };
};
```

## Referințe

https://www.sitepoint.com/add-remove-css-class-vanilla-js/
