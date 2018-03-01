# Fetch

Scopul este acela de a unifica componentele folosite pentru a aduce resurse pe web.

`fetch()` este o metodă a obiectului global sau a unui worker care returnează o promisiune.

```javascript
fetch('x');
// Promise { <state>: "rejected", <reason>: TypeError }
fetch('x').then(raspuns => console.log('am primit raspuns'));
// Promise { <state>: "pending" }
```

TODO: Completează și documentează fetch()

## Referințe

- [Standardul fetch](https://fetch.spec.whatwg.org/)
- [Fetch - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [ Working with the Fetch API ](https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api)
