# Promise.allSettled()

Metoda returnează o promisiune care se rezolvă după ce au fost soluționate toate promisiunile care au fost pasate sub formă de array indiferent de felul în care s-au rezolvat acestea. Metoda se dovedește foarte utilă dacă rezolvăm promisiuni care reprezintă tot atâtea sarcini care nu au legătură unele cu celelalte.

```javascript
const promisiuni = [promisiune1, promisiune2];
Promise.allSettled(promisiuni).then((rezultate) => reszultate.forEach((rezultat) => console.log(rezultat.status)));
```

Metoda primește drept parametru un obiect iterabil a cărui elemente sunt promisiuni.
