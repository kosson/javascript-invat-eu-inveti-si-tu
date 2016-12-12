# Găsirea elementelor în DOM

Pentru a găsi anumite elemente în DOM, trebuie gândită mai întâi o strategie de căutare care să facă uz de metodele puse la dispoziție.

Spre exemplu, cum să accesezi textul primului paragraf din body:
`var text = document.body.getElementsByTagName('p')[0]`.

Colecțiile de noduri pe care le poți constitui folosind diversele metode la dispoziție, va crea o colecție care este dinamică, care poate suferi modificări în orice moment. Pentru a extrage un fragment și pentru a tranforma fragmentul, colecția țintită, de fapt, trebuie să transformi obiectul array-like într-un adevărat array.

```javascript
var colectieDeP = document.body.getElementsByTagName('p');
var arrColectie = Array.prototype.slice.call(colectieDeP, 0); // acum un array!
arrColectie.forEach(function(element){
  console.log(element);
});
```

În acest moment se poate folosi mai rapid operatorul spread sau Array.from()

```javascript
var colectieDeP = document.body.getElementsByTagName('a');
var arrColectie = [...colectieDeP];
var arrColectie2 = Array.from(colectieDeP);
```

## Metoda `getElementsByTagName`

Această metodă este disponibilă pentru toate nodurile și are drept rezultat constituirea unui obiect care are caracteristicile unui array pentru toate elementele care au fost specificate la argument.

Constituirea acestui obiect poate porni din orice punct al DOM-ului.

## Metoda `querySelectorAll`

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
