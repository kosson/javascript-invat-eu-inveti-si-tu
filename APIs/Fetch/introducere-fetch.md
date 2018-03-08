# Fetch

Scopul este acela de a unifica componentele folosite pentru a aduce resurse pe web.

`fetch()` este o metodă a obiectului global sau a unui **worker** care returnează o promisiune.

```javascript
fetch('x');
// Promise { <state>: "rejected", <reason>: TypeError }
fetch('x').then(raspuns => console.log('am primit raspuns'));
// Promise { <state>: "pending" }
```

Un exemplu complet de utilizarea a lui fetch pentru a accesa o înregistrare.

```javascript
var adresa = "https://www.europeana.eu/api/v2/search.json?wskey=XXXXXXXXX&query=The%20Fraternity%20between%20Romanian%20and%20French%20Army";

// înlocuiește cheia API din link, cu una personală
// wskey=XXXXXXXXX
// dacă nu introduci cheia personală vei avea o eroare
// Cross-Origin Request Blocked

fetch(adresa)
  .then( function(raspuns) {
    if (raspuns.headers.get('Content-Type') === 'application/json') {
      return raspuns.json();
    }
    return raspuns.text();
  }).then(function(dateleAduse) {
    console.log(dateleAduse);
  }).catch(function() {
    console.log("A apărut o eroare");
  });
```

## Referințe

- [Standardul fetch](https://fetch.spec.whatwg.org/)
- [Fetch - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [ Working with the Fetch API ](https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api)
