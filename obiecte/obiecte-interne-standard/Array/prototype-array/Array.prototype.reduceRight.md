# Array.prototype.reduceRight()

Este o metodă iterativă care folosește o funcție cu rol de callback aplicată fiecărui element al unui array, iar rezultatul este adăugat unei structuri cu rol de acumulator.

```javascript
let arr = [['ceva', 'necesar'], ['altceva', 'util']];
const rezultat = arr.reduceRight((acumulator, valoareCurenta) => acumulator.concat(valoareCurenta));
// [ 'altceva', 'util', 'ceva', 'necesar' ]
```

Funcția va returna valoarea acumulatorului care va fi folosit la următoarea invocare. La ultima invocare, rezultatul va fi cel care va fi returnat de metodă. Funția cu rol de callback primește patru parametri posibili. Primul este acumulatorul, al doilea este valoarea curentă care este prelucrată, index-ul și ultimul chiar array-ul pentru care s-a invocat metoda.

Ceea ce trebuie observat este faptul că nu este este permis și un obiect care să joace rolul de context (legătura la care se face prin `this`). Totuși, al doilea parametru pasat metodei este valoarea care va juca rolul de acumulator. În cazul în care nu este pasată această valoare, ultimul element al array-ului va fi folosit și apoi se va sări peste aceasta. În cazul în care este pasat un array gol și nu este pasată o valoare inițială, va fi returnat `TypeError`.

## Resurse

- [reduceRight | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)