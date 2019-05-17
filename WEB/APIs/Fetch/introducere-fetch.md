# Fetch

Scopul este acela de a unifica componentele folosite pentru a aduce resurse pe web. `Fetch` este deja disponibil ca parte al API-ului browserului și nu necesită un pas suplimentar pentru a-l accesa.

`fetch()` este o metodă a obiectului global sau a unui **worker** care returnează o promisiune.

```javascript
fetch('x');
// Promise { <state>: "rejected", <reason>: TypeError }
fetch('x').then(raspuns => console.log('am primit raspuns'));
// Promise { <state>: "pending" }
```

## Exemple practice

Să presupunem că lucrezi cu API-ul Europeana.eu. Putem foarte simplu să construim un exemplu complet de utilizarea a lui `fetch` pentru a accesa o înregistrare unică.

```javascript
var adresa = "https://www.europeana.eu/api/v2/search.json?wskey=XXXXXXXXX&query=The%20Fraternity%20between%20Romanian%20and%20French%20Army";

// înlocuiește cheia API din link, cu una personală
// wskey=XXXXXXXXX
// dacă nu introduci cheia personală vei avea o eroare
// Cross-Origin Request Blocked

fetch(adresa)
  .then( function aduRes (raspuns) {
    if (raspuns.headers.get('Content-Type') === 'application/json') {
      return raspuns.json();
    }
    return raspuns.text();
  }).then(function vizualizeaza (dateleAduse) {
    console.log(dateleAduse);
  }).catch(function () {
    console.log("A apărut o eroare");
  });
```

## Referințe

-   [Standardul fetch](https://fetch.spec.whatwg.org/),
-   [Fetch - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
-   [Working with the Fetch API](https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api)
-   [Fetch API (100 Days of Google Dev)](https://www.youtube.com/watch?v=g6-ZwZmRncs)
