# Promise.any

Această metodă ia un obiect iterabil constituit din obiecte `Promise` și imediat ce una dintre promisiuni este rezolvată, va fi returnată o singură promisiune care se rezolvă chiar cu valoarea aceleia.
Dacă nicio promisiune nu se rezolvă, atunci promisiunea returnată va fi rejected cu un `AggregateError`, care este o nouă subclasă a obiectului `Error`. `AggregateError` are rolul de a grupa erorile individuale.

Poți consitera această metodă opusul lui `Promise.all`.
