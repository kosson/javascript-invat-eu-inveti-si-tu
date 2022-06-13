# Promise.any

Această metodă ia un obiect iterabil constituit din obiecte `Promise` și imediat ce una dintre promisiuni este rezolvată, va fi returnată o singură promisiune care se rezolvă chiar cu valoarea aceleia.
Dacă nicio promisiune nu se rezolvă, atunci promisiunea returnată va fi rejected cu un `AggregateError`, care este o nouă subclasă a obiectului `Error`. `AggregateError`, având rolul de a grupa erorile individuale.

Poți considera această metodă opusul lui `Promise.all`.

Metoda își dovedește utilitatea în cazul în care ai nevoie de date din mai multe API-uri. Chiar dacă unele vor eșua, totuși vei obține un rezultat.

```javascript
const APIs = [
    'https://undeva.ro/apiv1/23',
    'https://departe.ro/apiv2/4',
    'https://altundeva.ro/apiv3/32',
];
let aduDate = async api => {
    const raspuns = await fetch(api);
    return response.ok ? response.json() : Promise.reject("API-ul nu răspunde!");
};
const resursele = () => Promise.any(APIs.map(api => aduDate(api)));

resursele().then(rezultat => {
    //... fă ceva cu rezutatul
}).catch((error) => console.error);
```

Metoda face reject doar atunci când toate promisiunile pasate sunt rezolvate cu reject.