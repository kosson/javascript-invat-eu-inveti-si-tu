# Array.prototype.forEach()

Această metodă a fost introdusă odată cu versiunea ES5 a standardului. Are drept element transformator o funcție, ceea ce permite o paletă largă de operațiuni asupra datelor prelucrate. Pe scurt, execută o funcție pentru fiecare element din array.
În practică vei întâlni cazuri în care elementele unei colecții sunt obiecte la rândul lor.

Dacă ai înțeles modul de funcționare a buclelor cu `for`, din curiozitate ai ajuns aici pentru a trage cu ochiul la un pas înainte privind prelucrarea datelor. Mai întâi de toate, asigură-te că ai înțeles în adâncime funcțiile, cum se realizează un closure și cum este folosită o funcție în rolul de callback. Pentru a înțelege în adâncime metoda `forEach()`, cel mai bine ar fi să o reconstruim folosind `for`.

```javascript
const colecție = [
  {titlu: 'JS învăț eu, înveți și tu', an: 2018},
  {titlu: 'Prelucrarea datelor cu JS', an: 2019}
];
function forEach (colectie, callback) {
  for (let index = 0; index < colectie.length; index++) {
    callback.call(colectie[index], index);
  };
};
forEach(colecție, function (index) {
  console.log(`Am publicat ${colecție[index].titlu} în anul ${colecție[index].an}`);
});
// Am publicat JS învăț eu, înveți și tu în anul 2018
// Am publicat Prelucrarea datelor cu JS în anul 2019
```

Mecanismul este simplu. Pur și simplu aplici callback-ul apelându-l prin `call()` setând drept obiect context înregistrarea din colecție plus indexul. Acest exemplu nu se pretează practicii, având deja utilitarul de-a gata, dar este un bun exercițiu pentru a înțelege în adâncime ceea ce se petrece la prelucrarea fiecărui element printr-o funcție callback. Elementul devine contextul de execuție al callback-ului. Această concluzie este una foarte importantă pentru a înțelege mai departe cum funcționează `map()`, `filter()` și `reduce()`.
Folosind utilitarul `forEach()` lucrurile se simplifică semnificativ folosind același exemplu de mai sus.

```javascript
colecție.forEach( function (element) {
  console.log(`Am publicat ${element.titlu} în anul ${element.an}`);
});
```

Și acum același exemplu folosind sintaxa ES6.

```javascript
colecție.forEach( element => console.log(`Am publicat ${element.titlu} în anul ${element.an}`) );
```

Funcția care va fi executată poate avea trei argumente:

-   `currentValue`; elementul din array care este procesat,
-   `index`; indexul elementului din array care este procesat,
-   `array`; array-ul pentru care se aplică forEach().

Opțional se mai poate pasa o valoare care să reprezinte `this` la executarea callback-ului.

Metoda nu poate fi înlănțuită (chainable).
Spre deosebire de `map()` și `reduce()`, `forEach()` returnează întotdeauna `undefined`.

```javascript
function logElementeArray (element, index, array) {
  console.log('a[' + index + '] = ' + element);
};
// A se nota faptul că index 2 este sărit pentru că
// nu există element la acea poziție în array.
[2, 5, , 9].forEach(logElementeArray);
// a[0] = 2
// a[1] = 5
// a[3] = 9
```
