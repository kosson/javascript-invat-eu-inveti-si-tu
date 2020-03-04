# Promise.allSettled()

Metoda returnează o promisiune care se rezolvă după ce au fost soluționate toate promisiunile care ai fost pasate sub formă de array indiferent de rezolvarea acestora.

```javascript
const promisiuni = [promisiune1, promisiune2];
Promise.allSettled(promisiuni).then((rezultate) => reszultate.forEach((rezultat) => console.log(rezultat.status)));
```

Metoda primește drept parametru un obiect iterabil a cărui elemente sunt promisiuni.
