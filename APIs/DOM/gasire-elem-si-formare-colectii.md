# Găsirea elementelor în DOM și colecții de elemente

Pentru a găsi anumite elemente în DOM, trebuie gândită mai întâi o strategie de căutare care să facă uz de metodele puse la dispoziție.

Spre exemplu, cum să accesezi textul primului paragraf din body:
`var text = document.body.getElementsByTagName('p')[0]`.

Colecțiile de noduri pe care le poți constitui folosind diversele metode la dispoziție, va crea o colecție care este dinamică, care poate suferi modificări în orice moment. Pentru a extrage un fragment și pentru a transforma fragmentul, colecția țintită, de fapt, trebuie să transformi obiectul array-like într-un adevărat array.

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

## Metoda `querySelector`

Această metodă primește un argument care este selectorul CSS după care se face căutarea în DOM. Atenție, lucrăm asupra unui singur, unic identificabil selector CSS.

```javascript
var elementCautat = document.querySelector('#tinta > p.fragment');
```

Poți verifica și dacă un selector este într-un obiect DOM asignat unei variabile deja.

```javascript
elementCautat.matches('p.fragment') === true;
```

### Optimizarea căutării

Pentru a face o căutare optimizată după un element care știi că este copilul altuia, cel mai bine este să referențiezi părintele și apoi să referențiezi copilul.

```javascript
var elementCautat = document.querySelector('.formular');
var copilulElementului = elementCautat.querySelector('input[type="submit"]');
```

Evită o referențiere de genul

```javascript
var tinta = document.querySelector('#mesaj > form.formular input[type="submit"]');
```

## Metoda `querySelectorAll`

Este o metodă care permite „colectarea” tuturor nodurilor DOM specificate de tagul ales care este pasat drept argument. Totuși, trebuie spus faptul că este o colectare care se face o singură dată ceea ce înseamnă că nu se va actualiza dinamic dacă sunt introduse sau scoase noduri pe parcurs. În schimb, `getElementsByTagName` va răspunde dinamic actualizând colecția.

```javascript
var colectie1 = document.querySelectorAll('div');
var colectie2 = document.getElementsByTagName('div');

var nodNou = document.createElement('div');
document.body.appendChild(nodNou);

colectie1.length === colectie2.length; // false
```

Încă un lucru de care trebuie să ținem seama atunci când lucrăm cu `querySelectorAll`. Nu putem aplica metode specifice nodurilor DOM, ci trebuie să iterăm rezultatul pentru a aplica rând pe rând pe fiecare element. Ține minte că pentru acest lucru, rezultatul trebuie transformat într-un array.

```javascript
var noduriDOM = document.querySelectorAll("div"),   // se constituie o colecție array-like
    arrayLike = [].slice.call(noduriDOM);           // transformarea într-un array-like

arrayLike.forEach(function(element){
  console.log(element);
});
```

Un aspect util al elementelor este că fiecare dintre acestea au câteva proprietăți statice care s-ar putea dovedi foarte utile:

- element.children
- element.firstElementChild
- element.lastElementChild
- element.previousElementSibling
- element.nextElementSibling

Atenție, pentru că o țintire a elementelor de interes cu ajutorul lui `querySelector` poate fi confuză uneori, cel mai bine este să fie folosit atributul de selecție „data-ceva="formular"”.

```html
<ul data-target="lista">
  <li data-target="element">unu</li>
  <li data-target="element">doi</li>
  <li data-target="element">trei</li>
</ul>
```

Țintele de selecție devin mult mai clare nefiind afectate de schimbările posibile aduse elementelor DOM sau CSS

```javascript
var lista = document.querySelector('[data-target=\"lista\"]');
var colectia = document.querySelectorAll('[data-target=\"element\"]');

var caAr = [].slice.call(colectia);
console.log(caAr);            // Array[li, li, li]
caAr.forEach(function(elem){
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
