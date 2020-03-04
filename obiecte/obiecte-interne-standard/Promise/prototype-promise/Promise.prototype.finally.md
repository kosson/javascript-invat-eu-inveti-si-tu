# Promise.prototype.finally()

Metoda se folosește atunci când vrei să execuți o funcție care urmare a încheierii unei promisiuni indiferent de rezultat.

Această metodă returnează la rândul său o promisiune. La momentul în care această ultimă promisiune a fost rezolvată, va fi executată funcția pasată drept callback. Această metodă oferă posibilitatea de a executa în continuare codul indiferent de rezultatul promisiunii, fie acesta *rejected* sau *fulfilled*.

Metoda primește o funcție cu rol de callback.

```javascript
fetch('https://swapi.co/api/people/1')
  .then(răspuns => {
    return răspuns.json();
  })
  .then(json_data => {
    console.log(json_data);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    console.log('Acesta este ultima etapă înainte de a termina');
  });
```
