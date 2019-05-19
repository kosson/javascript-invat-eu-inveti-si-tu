# Selecția elementelor în DOM și colecții de elemente

Atunci când lucrezi cu paginile web trebuie să înțelegi că lucrezi cu o structură arborescentă de noduri, care pot fi acționate de utilizator, ceea ce produce un eveniment. Pentru a modifica o pagină web, ai nevoie de mecanismele care să permită manipularea nodurilor. Uneori ai nevoie de colecții de noduri care corespund unor criterii. Aceste criterii sunt tot atâtea mecanisme de selectare în spatele cărora stau metode specifice. O colecție va fi la rândul eu un obiect care reprezintă o listă de noduri DOM. Colecțiile pe care le vom constitui sunt formate din elemente. Aceste elemente sunt reprezentările HTML ale nodurilor DOM.

```javascript
colectie = document.getElementsByTagName('p');
// selectează toate elementele paragraf ale paginii
```

Pentru a căuta anumite elemente în DOM, trebuie gândită mai întâi o strategie care va implica metodele puse la dispoziție de obiectul `document`. Obiectul `document` implementează toate metodele interfeței `Document`. Acest lucru înseamnă că poți face o căutare după:

-   numele tagurilor HTML (`document.getElementsByTagName('p')`), fiind returnat un `HTMLCollection`,
-   valoarea atributului `class` al unor elemente (`document.getElementsByClassName('rosii')`), fiind returnată o colecție `HTMLCollection`,
-   identificatorii unici (`document.getElementById('suntUnic')`), fiind returnat un singur element (o valoare de tip `Element`), dar mai poți folosi și `querySelector('#id')`
-   o anumită clasă atașată unui element (`document.querySelectorAll('.oClasa')`), fiind returnat un `NodeList` care este o fotografie la momentul selecției (nu se actualizează dinamic)

Spre exemplu, cum să accesezi textul primului paragraf din `body`: `var text = document.body.getElementsByTagName('p')[0]`.

Colecțiile de noduri pe care le poți constitui folosind diversele metode la dispoziție sunt dinamice. Acestea pot suferi modificări în orice moment. Pentru a extrage un fragment și pentru a transforma fragmentul, colecția țintită, de fapt, trebuie să transformi obiectul array-like într-un adevărat array.

```javascript
var colectieDeP = document.body.getElementsByTagName('p');
var arrColectie = Array.prototype.slice.call(colectieDeP, 0); // acum un array!
arrColectie.forEach(function(element){
  console.log(element);
});
```

În acest moment se poate folosi mai rapid operatorul spread sau `Array.from()`.

```javascript
var colectieDeP = document.body.getElementsByTagName('a');
var arrColectie = [...colectieDeP];
var arrColectie2 = Array.from(colectieDeP);
```

## Metoda `getElementsByTagName`

Această metodă este disponibilă pentru toate nodurile și are drept rezultat constituirea unui obiect care are caracteristicile unui array pentru toate elementele care au fost specificate la argument.

Constituirea acestui obiect poate porni din orice punct al DOM-ului.

## Metoda `querySelector()`

Această metodă primește un argument care este selectorul CSS după care se face căutarea în DOM. Atenție, lucrăm asupra unui singur selector CSS, care este unic identificabil.

```javascript
var elementCautat = document.querySelector('#tinta > p.fragment');
```

Poți verifica și dacă un selector este într-un obiect DOM atribuit unei variabile deja.

```javascript
elementCautat.matches('p.fragment') === true;
```

### Optimizarea căutării

Pentru a face o căutare optimizată după un element care știi că este copilul altuia, cel mai bine este să faci o referință către părinte și abia apoi către copil.

```javascript
var elementCautat = document.querySelector('.formular');
var copilulElementului = elementCautat.querySelector('input[type="submit"]');
```

Evită o referință de genul

```javascript
var tinta = document.querySelector('#mesaj > form.formular input[type="submit"]');
```

## Metoda `querySelectorAll('nume')`

Este o metodă care permite *colectarea* tuturor nodurilor DOM specificate de tagul ales, care este pasat drept argument. Totuși, trebuie spus faptul că este o colectare care se face o singură dată ceea ce înseamnă că nu se va actualiza dinamic dacă sunt introduse sau scoase noduri pe parcurs. În schimb, `getElementsByTagName` va răspunde dinamic actualizând colecția.

```javascript
var colectie1 = document.querySelectorAll('div'); // returnează un NodeList
var colectie2 = document.getElementsByTagName('div'); // returnează o colecție HTMLCollection

var nodNou = document.createElement('div');
document.body.appendChild(nodNou);

colectie1.length === colectie2.length; // false
```

Încă un lucru de care trebuie să ținem seama atunci când lucrăm cu `querySelectorAll`. Nu putem aplica metode specifice nodurilor DOM, ci trebuie să iterăm rezultatul pentru a aplica rând pe rând pe fiecare element. Ține minte că pentru acest lucru, rezultatul trebuie transformat într-un array.

```javascript
var noduriDOM = document.querySelectorAll("div"),   // se constituie o colecție array-like (NodeList)
    arrayLike = [].slice.call(noduriDOM);           // transformarea într-un array-like

arrayLike.forEach(function(element){
  console.log(element);
});
```

Un aspect util al elementelor este că fiecare dintre acestea au câteva proprietăți statice care s-ar putea dovedi foarte utile în selectarea nodurilor apropiate:

-   element.`children`,
-   element.`firstElementChild`,
-   element.`lastElementChild`,
-   element.`previousElementSibling`,
-   element.`nextElementSibling`.

Atenție, pentru că o țintire a elementelor de interes cu ajutorul lui `querySelector` poate fi confuză uneori, cel mai bine este să fie folosit atributul de selecție **data-ceva="formular"**.

```html
<ul data-target="lista">
  <li data-target="element">unu</li>
  <li data-target="element">doi</li>
  <li data-target="element">trei</li>
</ul>
```

Țintele de selecție devin mult mai clare nefiind afectate de schimbările posibile aduse elementelor DOM sau CSS.

```javascript
var lista = document.querySelector('[data-target=\"lista\"]');
var colectia = document.querySelectorAll('[data-target=\"element\"]');

var caArr = [].slice.call(colectia);
console.log(caArr);            // Array[li, li, li]
caArr.forEach(function(elem){
  console.log(elem);          // <li data-target="element">
});
```

## Constituirea unei colecții de elemente DOM

Acest lucru este posibil pentru că `NodeList` permite protocolul de iterare. Efectul este convertirea unui `NodeList` într-un Array.

```javascript
function colectDivs(){
  return [...document.querySelectorAll('div')];
};

// sau:
var divuri = [...document.querySelectorAll('div')];

// ca alternativă folosim Array.from
var divuri = Array.from(document.querySelectorAll('div'));
```

## Colecțiile NodeList și cele HTMLCollection pot fi iterate

După ce ai constituit colecția, cel mai adesea ai nevoie să o iterezi pentru a face ceva cu elementele. Poți itera colecțiile folosind `for...of`.
În plus, pentru că un `NodeList` nu se modifică dinamic, ci este o fotografiere la momentul colectării nodurilor, este permisă și prelucrarea cu `forEach`. Acest lucru l-ai putea face și în cazul colecțiilor `HTMLCollection` respectând condiția de transformare într-un array. Poți folosi în acest sens `Array.of(colecție)`, `Array.from(colecție)` sau folosind operatorul spread.