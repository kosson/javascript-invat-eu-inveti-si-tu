# Event listeners - receptorii

## Oprirea propagării unui eveniment.

După cum știm, un eveniment se propagă de la elementul rădăcină spre elementul căruia îi este adresat. Dacă pe drum exită un „receptor” (event listener) și acest element care are receptor potrivit, va reacționa și acesta.

Dar pe drum, evenimentul poate fi oprit prin utilizarea metodei `stopPropagation()`.

```javascript
function faCevaCuAcestClick(e){
  e.stopPropagation();

  // prelucrează date
};
```

Un exemplu mai apropiat:

```javascript
var element = document.querySelector("#unElemIntermediar");
element.addEventListener('click', opresteEvenimentul, true); // true înseamnă să capturezi evenimentul
function captureazaSiOpreste(e){
  e.stopPropagation();
};
```
