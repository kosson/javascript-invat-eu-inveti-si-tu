# Promise.all(obiectIterabil)

Metoda va returna o promisiune nouă în starea `pending`, care se va soluționa dacă toate promisiunile pasate ca obiect iterabil au fost soluționate la rândul lor sau dacă iterabilul pasat nu conține promisiuni. La final, promisiunea pe care o returnează metoda poate fi rezolvată asincron de îndată ce stiva este liberă. Ordinea valorilor returnate, va fi cea a elementelor din iterabil indiferent de ordinea de rezolvare.

Dacă această promisiune pe care o returnează, se va soluționa cu un reject, acest reject vine de la prima promisiune care a fost soluționată cu reject din obiectul iterabil (*fail fast*). Dacă iterabilul nu are promisiuni, atunci de la o evaluare pentru care apare o eroare. Acest comportament indică un fel de subordonare a sarcinilor. Dacă una dintre aceste sarcini eșuează, întregul proces eșuează.

```javascript
const p1 = Promise.resolve(1000);
const p2 = 10;
const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'Hai, că am terminat!');
});
Promise.all([p1, p2, p3]).then(function clbkPall (rezultatele) {
  console.log(rezultatele);
}).catch(error => {
  console.error(error.message)
}); // [ 1000, 10, "Hai, că am terminat!" ]
```

Fii foarte atent că în cazul în care una dintre promisiuni generează o eroare (reject) celelate promisiuni vor continua să lucreze. Totuși, rezultatul va fi un reject.

În cazul în care iterabilul nu conține niciun element, promisiunea returnată va fi deja rezolvată. Dacă iterabilul are elemente, câtă vreme aceste sunt soluționate la rândul lor, promisiunea returnată va fi în `pending`.
