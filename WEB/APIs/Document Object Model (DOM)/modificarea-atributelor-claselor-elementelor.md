# Modificarea atributelor

Într-un document HTML, elementele pot avea atribute (`nume = "valoare"`). În momentul în care ai selectat un element, se pot aplica metode pentru a obține informații despre atribute, pentru setarea și obținerea valorii, cât și pentru eliminarea de atribute.

Hai să pornim făcând câteva verificări pentru un element înainte de a prelucra valorile care reprezintă clasele. Pentru a face acest lucru, avem la îndemână câteva metode de verificare.

```html
<div id="primul">
  <p class="verde">Primul</p>
  <p class="verde ceva">Al doilea</p>
</div>
<script>
  let bloc = document.getElementById('primul');
  let colectieP = document.getElementsByTagName('p');
  let colectieC = document.getElementsByClassName('verde');
  bloc.hasAttributes(); // true
  let para = document.querySelector('.ceva');
  para.hasAttribute('class','ceva'); //true
  para.getAttribute('class'); // "verde ceva"
  para.setAttribute('altceva'); // este modificată clasa
  para.removeAttribute('class'); // șterge atributul class
  let attrs = bloc.attributes; // colecție NameNodeMap
  attrs['class'].value; // "bau" - accesare după numele atributului
  attrs[1].name; // "class" - accesarea după index
</script>
```

Poți colecta atributele unui element prin constituirea unei colecții ale acestora de tip `NameNodeMap`. Acest tip de colecție permite accesarea informațiilor privind atributele, fie după numele atributului, dar utilizând indexarea, fie accesarea valorii unui atribut, menționând numele atributului.

## Modificarea directă a claselor

Există două proprietăți care folosite în JavaScript permit modificarea claselor folosite pentru un anume element:

-   `className` - care se bucură de o largă compatibilitate în ceea ce privește suportul browserelor și
-   `classList` - care este introdus ceva mai recent și mai ușor de folosit.

Aceste proprietăți sunt puse la dispoziție de interfața `Element`. Proprietatea `className` poate fi folosită atunci când suntem siguri că un element are o singură clasă. În caz contrar, existența mai multor clase impune folosirea lui `classList`.

```javascript
let elem = document.querySelector('.top-sites');
elem.classList.add('bau'); // adăugarea unei clase
elem.classList.remove('bau'); // ștergerea unei clase
elem.classList.toggle('bau');
// dacă ai clasa returnează false și șterge clasa
// dacă nu este clasa, o intruduce și returnează true.
elem.classList.contains('bau'); // dacă există returnează true
elem.classList.replace('bau', 'baubau'); // înlocuiește o clasă
```

## Adăugarea unei clase folosind `className`

Să studiem cum s-ar putea scrie o funcție care să adauge o clasă la elemente într-o deplină compatibilitate și cu browserele Internet Explorer până la versiunea 8.

```javascript
function adaugaClasa (elementele, clasa) {
  if (!elementele) {
    return;
  };                           // #0
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
  for (var i = 0; i < elementele.length; i++) {
    elements[i].classList.add(clasa);
  };
};
```

\# 1: Folosind `querySelectorAll` aduci toate elementele care se încadrează criteriului de selecție, adică selectorul pasat prin argumentul `elementele`.

Acum ar fi util și reversul: eliminarea unei clase.

```javascript
function eliminaClasa (elementele, clasa) {
  if (!elementele) {
    return;
  };
  if (typeof(elementele) === 'string') {
    elementele = document.querySelectorAll(elementele);
  };
  if (elementele.tagName) {
    elementele = [elementele]
  };
 var sablon = new RegExp('(^| )'+ clasa +'($| )','g'); // #1
 for (var i = 0; i < elementele.length; i++) {
   elementele[i].className = elementele[i].className.replace(sablon, ' '); // #2
 };
};
```

Este aceeași funcție ca și la adăugarea clasei numai că la momentul parcurgerii colecției de elemente și modificarea element cu element, vom folosi un șablon **RegExp** pentru a face un `replace` acolo unde este identificat.

Folosind noua metodă `remove` a lui `classList` ajung la următoarea simplificare a funcției de mai sus:

```javascript
function eliminaClasa (elementele, clasa) {
  elementele = document.querySelectorAll(elementele);
  for (var i = 0; i < elementele.length; i++) {
    elements[i].classList.remove(clasa);
  };
};
```

## Atributele `data-*`

Odată cu versiunea 5 a HTML, există posibilitatea de a introduce în elemente atribute care conțin date folosind această sintaxă care începe cu `data-` și apoi poți introduce o denumire a câmpului de date pentru care vei introduce o valoare.

```html
<p id="254" data-titlu="Apus de soare" data-isbn="143-432342" data-exemplare="3">O altă lectură care a plutit în vacanțele elevilor.</p>
```

Atributele de acest tip formează o colecție care poate fi accesată folosind proprietatea `dataset`. Aceasta returnează un obiect de tipul `DOMStringMap`. Cheile acestui obiect vor fi numele atributelor, iar valorile, vor fi cele introduse.

Ceea ce se realizează astfel este o comunicare de date între pagina web și DOM.

## Referințe

-   [Quick Tip: Add or Remove a CSS Class with Vanilla JavaScript](https://www.sitepoint.com/add-remove-css-class-vanilla-js/)
