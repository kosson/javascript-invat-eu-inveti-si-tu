# Comenzile `try...catch`

Această combinație este folosită pentru a testa prin evaluarea un fragment de cod. Dacă apar erori, acestea vor fi raportate prin `throw` (a arunca, dar aici traduse pentru a fi înțeles mai bine: a fi raportate).

În această construcție, va exista o singură comandă `try` urmată de una sau mai multe `catch` sau `finally`.

- `try...catch`
- `try...finally`
- `try...catch...finally`

Secvența catch conține acțiunile care vor fi întreprinse în caz că din blocul `try` sunt „raportate” - `thrown` excepții. Dacă nu există excepții, `catch` este ignorat.

```javascript
try {
  var x = false;
  if (x !== true) { throw 'Bre, e nasol!'}
} catch (e) {
  console.log(e);
} finally {
  console.log('Hai salut, am terminat');
};  // Bre, e nasol!  // Hai salut, am terminat
```

Extinderea obiectului `Error`

```javascript
function EroarePersonalizata(mesaj){
  this.mesaj = mesaj || 'Mesaj șablon';
  this.stiva = (new Error()).stack;
};
EroarePersonalizata.prototype = Object.create(Error.prototype);
EroarePersonalizata.constructor = EroarePersonalizata;

try{
  throw new EroarePersonalizata();
}catch(e){
  console.log(e.mesaj);
}; // Mesaj șablon

try{
  throw new EroarePersonalizata('Mesaj trimis');
}catch(e){
  console.log(e.mesaj);
}; // Mesaj trimis
```
