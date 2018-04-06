# Promise.prototype.catch()

Această metodă returnează un obiect promisiune în situația în care apare starea `reject`. De fapt, în spate se va face un apel `then(undefined, onRejected)`.

```javascript
const promisiune = new Promise(function(resolve, reject) {
  throw 'Ceva rău s-a petrecut';
});
promisiune.catch(error => console.log(error));
```

Cel mai adesea veți vedea `catch()` la lucru când se înlănțuiesc mai multe `then()` iar la final există un `catch()` care *prinde* toate erorile.

Atenție, erorile ridicate la evaluarea codului unei funcții asincrone, nu sunt *prinse* de `catch`.
