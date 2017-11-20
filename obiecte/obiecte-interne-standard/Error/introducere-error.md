# Constructorul `Error`

Cu ajutorul acestui constructor poți crea un obiect cu ajutorul căruia să poți gestiona erorile.

```javascript
var tipEroare = new Error('Aceasta este o eroare, prietene');
console.log(tipEroare);
// Error: Aceasta este o eroare, prietene
tipEroare.name; // 'Error'
tipEroare.message; // 'Aceasta este o eroare, prietene'
```

În obiectul prototip al lui `Error` sunt doi membri:
- `name`, fiind numele care a fost ales pentru a identifica eroarea,
- `message`, fiind mesajul care a fost ales pentru a lămuri detaliile erorii.

Obiectul intern `Error` este complementat de alte câteva pe care le veți vedea apărând pe măsură ce veți scrie cod și veți avea erori:

- EvalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

De cele mai multe ori erorile vor fi capturate folosind enunțului `try..catch`.
