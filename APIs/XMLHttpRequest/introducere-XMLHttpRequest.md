# XMLHttpRequest API

XMLHttpRequest oferă tot ce este nevoie pentru a transfera date de la un server la un client.

Cel mai important lucru este faptul că `XMLHttpRequest` aduce datele fără a face un refresh la pagină. Acesta este și motivul pentru care Microsoft l-a introdus în API-urile browserului, fiind preluat și de ceilalți implementatori.

XMLHttpRequest este baza pentru [AJAX](https://developer.mozilla.org/en-US/docs/AJAX) - Asynchronous JavaScript + XML. Chiar dacă acest model a fost gândit să folosească date în XML, în acest moment se folosește pe scară largă JSON, care preferat pentru apropierea de JavaScript printre motivele principale.

XMLHttpRequest este un standard în continuă dezvoltare și poate fi consultat la pagina dedicată a Web Hypertext Application Technology Working Group ([WHATWG](https://whatwg.org/)):  [https://xhr.spec.whatwg.org/](https://xhr.spec.whatwg.org/)

## Constructorul `XMLHttpRequest()`

```javascript
var client = new XMLHttpRequest();
```

Invocarea cu `new` a constructorului `XMLHttpRequest` are ca efect crearea unui obiect.

Un exemplu de utilizare este cel al aducerii unor date dintr-un API la distanță. Pentru acest exemplu vom folosi API-ul pus la dispoziție de Europeana.

```javascript
var adresa = "https://www.europeana.eu/api/v2/search.json?wskey=XXXXXXXXX&query=The%20Fraternity%20between%20Romanian%20and%20French%20Army";

// înlocuiește cheia API din link, cu una personală
// wskey=XXXXXXXXX
// dacă nu introduci cheia personală vei avea o eroare
// Cross-Origin Request Blocked

var xhr = new XMLHttpRequest();
xhr.open('GET', adresa);
xhr.responseType = 'json';

xhr.onload = function() {
  console.log(xhr.response);
};

xhr.onerror = function() {
  console.log("A apărut o eroare");
};

xhr.send();
```

## Resurse

- [XMLHttpRequest. Living Standard](https://xhr.spec.whatwg.org/)
