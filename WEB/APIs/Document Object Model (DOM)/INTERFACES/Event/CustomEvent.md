# CustomEvent

Acesta este un constructor cu ajutorul căruia poți crea evenimente personalizate. Aceste evenimente trebuie activate cu obiectele țintă.

```javascript
let evenimentNou = new CustomEvent('baubau', {
  detail: {
    oProprietate: 'Salut!'
  }
});

let elementTinta = document.querySelector('#unId');
elementTinta.addEventListener('baubau',  event => {
  console.log(event.detail);
});
elementTinta.dispatchEvent(evenimentNou);
```

Ceea ce este ușor de observat este că sunt trei faze prin care trebuie să trecem dacă dorim să creăm un eveniment nou.

-   instanțiem un nou obiect, iar constructorului îi pasăm ca prim parametru numele noului eveniment,
-   adăugăm evenimentul și o funcție receptor la un element țintă
-   facem un dispatch pentru a declanșa aceste eveniment.

La obiectul eveniment care se crează, ne este oferită posibilitatea să adăugăm date suplimentare prin constituirea unei proprietăți numită `detail` și care este un obiect care va avea valorile suplimentare dorite.
