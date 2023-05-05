# Array.prototype.findLast()

Această metodă iterativă va parcurge un array în ordine inversă returnând valoarea primului element care satisface condițiile menționate într-o funcție cu rol de callback. În cazul în care nu este găsit niciun element, metoda returnează valoarea `undefined`.

```javascript
let arr = [1,2,3,4];
let găsit = arr.findLast((element) => element > 2); // 4
```

## Parametrii

Primul parametru este funcția cu rol de callback. Dacă rezultatul evaluării este o valoare *truthy*, atunci va fi returnată valoarea din array care a corespuns criteriilor din corpul funcției. La rândul său, funcția cu rol de callback primește trei posibile argumente. Primul este chiar elementul din array care va fi investigat, al doilea este indexul elementului, iar cel de-al treilea este însuși array-ul care este prelucrat.

Al doilea parametru este un obiect la care se dorește să se facă legătura `this`.

## În practică

Exemplele prezentate în MDN prezintă posibilitatea de a combina destructurarea obiectelor cu o metodă iterativă așa cum este și `findLast` pentru a opera mai simplu.

```javascript
let records = [
    {id: 1, nume: "Alina", varsta: 23},
    {id: 2, nume: "Radu", varsta: 19}
];
let rezultat = records.findLast(({varsta}) => varsta < 20); // { id: 2, nume: 'Radu', varsta: 19 }
```

## Resurse

- [findLast | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)