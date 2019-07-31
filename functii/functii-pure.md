# Funcții pure

Sunt acele funcții care fiind aplicate pe aceiași parametri, va produce același rezultat fără a avea *efecte secundare*.

Motivul care dorești să folosești funcții pure este acea că dorești să eviți orice dependință de starea programului (*shared state* în limba engleză).

Orice funcție care depinde de evenimente I/O, nu este o funcție pură.

La momentul în care interacționezi cu rețeaua sau resurse disk la momentul returnării, conduce la concluzia că acea funcție nu este una pură. Chiar și mutația datelor primite așa cum ar fi un array, de exemplu, este considerată a fi un *side-efect*, un efect secundar. Pentru ca acest lucru să nu se petreacă, ce este de făcut, e crearea unui nou obiect care să fie returnat, obiect care va reflecta modificările celui original pasat.

```javascript
let unaPura = (obi1, obi2) => Object.assign({}, obi1, {obi2}); 
```

## Resurse

- [Free Sample Lesson: Pure Functions, Eric Elliot](https://ericelliottjs.com/premium-content/lesson-pure-functions)
