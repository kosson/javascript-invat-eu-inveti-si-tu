# Promise.all(obiectIterabil)

Metoda poate returna o promisiune nouă dacă toate promisiunile pasate ca un obiect iterabil, au fost soluționate. Acestei metode i se mai pot pasa și expresii care nu sunt promisiuni, fie că sunt valori, fie că vor fi evaluate și vor returna o valoare.

Dacă această promisiune pe care o returnează, se va soluționa cu un reject, acest reject vine de la prima promisiune care a fost soluționată cu reject din obiectul iterabil.

Pe scurt, ai mai multe promisiuni sau expresii și încerci să le rezolvi pe toate odată.

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

Metoda primește drept argument un obiect iterabil.

În cazul în care iterabilul nu conține niciun element, promisiunea returnată va fi deja rezolvată. Dacă iterabilul are elemente, câtă vreme aceste sunt soluționate la rândul lor, promisiunea returnată va fi în `pending`.
