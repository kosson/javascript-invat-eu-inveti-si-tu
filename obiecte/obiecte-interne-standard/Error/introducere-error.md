# Constructorul Error

Cu ajutorul acestui constructor poți crea un obiect cu ajutorul căruia să poți gestiona erorile.

```javascript
var tipEroare = new Error('Aceasta este o eroare, prietene');
console.log(tipEroare);
// Error: Aceasta este o eroare, prietene
tipEroare.name; // 'Error'
tipEroare.message; // 'Aceasta este o eroare, prietene'
```

În obiectul prototip al lui `Error` sunt doi membri:

-   `name`, fiind numele care a fost ales pentru a identifica eroarea,
-   `message`, fiind mesajul care a fost ales pentru a lămuri detaliile erorii.

Obiectul intern `Error` este complementat de alte câteva pe care le veți vedea apărând pe măsură ce veți scrie cod și veți avea erori:

-   EvalError
-   RangeError
-   ReferenceError
-   SyntaxError
-   TypeError
-   URIError

De cele mai multe ori erorile vor fi capturate folosind enunțului `try...catch`.

Atunci când este oportun, poți întrerupe execuția unei funcții dacă o eroare apare folosind cuvântul cheie `throw` urmat de instanțierea unei obiect eroare.

```javascript
function test (val) {
  if (val % 2 === 0) {
    console.log('Par');
  } else {
    throw new Error('Impar! Am ieșit');
  }
  console.log('Apar doar dacă e par');
}
test(3);
```

În momentul în care folosești `throw`, execuția programului se va opri. Odată instanțiat, obiectul `Error` oferă acces la propriile proprietăți și metode.

## Metoda prototipală `toString()`

Metoda returnează o reprezentare text a obiectului `Error`. Această metodă suprascrie pe cea moștenită din obiectul prototipal `Object`.

## Proprietatea `name`

Aceasta este valoarea numelui erorii. Valaorea sa din oficiu este `Error`. Dacă-i setezi o valoare nouă, aceasta va apărea doar dacă se transformă obiectul de eroare la `toString()`.

## Proprietatea `message`

Aceasta este o descriere a erorii ușor de citit de programator.

## Extinderea obiectului

```javascript
class BazaDeDateEroare extends Error {
  constructor(message) {
    super(message)
    this.name = 'Eroare de conectare la bază';
    this.detalii = 'Ceva s-a petrece în momentul în care a fost încercată o conectare la bază';
  }
}
```
