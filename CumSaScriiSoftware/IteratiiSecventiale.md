# Iterare secvențială

Reprezintă aplicarea unei operații asincrone pentru fiecare element dintr-o colecție. În acest caz, executarea unei secvențe de sarcini nu mai este o soluție.

Un șablon de generalizare este propus de Mario Casciaro și Luciano Mammino în Node.js Design Patterns

```js

// funcția cu rol de iterator
function itereaza(index) {

  if(index === sarcini.length){   // testează dacă indexul pasat este același cu lungimea colecției
    return final();              // dacă da, înseamnă că s-a parcurs întreaga colecție și în consecință faci ceva
  }
                                  // dacă lungimea colecției este diferită de valoarea indexului
  const sarcina = sarcini[index]; // inițializare sarcină cu valoarea de la index 0 din colecție

  lucreaza( function() {          // lucreaza care primește un callback ce asigură recursivitatea.
    itereaza(index + 1);           // recursiv se parcurge întreaga colecție de sarcini
  });
}

function final() {
  // s-a încheiat parcurgerea colecției, afișează ceva sau atașează o operațiune nouă
}

itereaza(0);
```

Atenție! lucreaza() este cu adevărat recursiv doar dacă funcția este una sincronă. În acest caz există pericolul să se atingă limita de stivă pentru că nu se poate procesa și curășa stiva.
