# Array.prototype.forEach

Această metodă a fost introdusă odată cu versiunea ES5 a standardului în anul 2011. Are drept element transformator o funcție, ceea ce permite o paletă largă de operațiuni asupra datelor prelucrate. Pe scurt, aplică o funcție fiecărui element din array.
În practică vei întâlni cazuri în care elementele unei colecții sunt obiecte la rândul lor, iar funcția callback pe care o vei executa, vei dori să ruleze în contextul acestora.

Dacă ai înțeles modul de funcționare al buclelor cu `for` și din curiozitate ai ajuns aici pentru a trage cu ochiul la un pas înainte privind prelucrarea datelor. Mai întâi de toate, asigură-te că ai înțeles în adâncime funcțiile, cum se realizează un closure și cum este folosită o funcție în rolul de callback. Pentru a înțelege în adâncime metoda `forEach()`, cel mai bine ar fi să o reconstruim folosind `for`.

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

## Argumentele callback-ului

Funcția care va fi executată poate avea trei argumente:

-   `currentValue`; elementul din array care este procesat,
-   `index`; indexul elementului din array care este procesat,
-   `array`; array-ul pentru care se aplică `forEach()`.

Opțional se mai poate pasa o valoare care să reprezinte `this` la executarea callback-ului.

```javascript
function logElementeArray (element, index, array) {
  console.log('a[' + index + '] = ' + element + this);
};
// A se nota faptul că index 2 este sărit pentru că
// nu există element la acea poziție în array.
[2, 5, , 9].forEach(logElementeArray); // sparse
// a[0] = 2
// a[1] = 5
// a[3] = 9
```

Spre deosebire de `map()` și `reduce()`, metoda `forEach()` returnează întotdeauna `undefined`.

## Pasarea explicită a legăturii this

Este posibil ca în anumite scenarii să ai un obiect al cărui proprietăți să dorești să le actualizezi cu rezultatele obținute după prelucrarea unei colecții. Pentru a face acest lucru posibil, poți pasa obiectul pe care dorești să-l modifici drept `this`.

```javascript
const obi = { ceva: 1 };
let colecție = ['a', 'b'];
obi.mod = function (colecție) {
  colecție.forEach(function (element) {
    this.ceva += element;
  }, obi);
};
obi.mod(colecție);
// Object { ceva: "1ab", mod: mod() }
```

În cazul folosirii unui arrow function drept callback, parametrul care indică legătura la `this` se va omite pentru că se face automat la mediul lexical gazdă.
Devine foarte utilă folosirea lui `forEach` atunci când lucrezi cu datele unui `Map`. Acest lucru este posibil pentru că un `Map` implementează protocoalele de iterare.

```javascript
const map = new Map(), obi = {a: 1};
map.set('ceva', obi);
map.forEach(function (valoare, cheie) {
  console.log(`Cheia este ${cheie} și valoarea este ${valoare}`);  
}, map);
// Cheia este ceva și valoarea este [object Object]
```

## Reguli de utilizare

Metoda nu poate fi înlănțuită (în limba engleză *chainable*). Callback-ul nu va fi apelat pentru proprietăți ale unor indecși care au fost șterși sau care nu sunt inițializați - *sparse arrays*.

În cazul în care avem de-a face cu un array dinamic, la care se adaugă elemente chiar în moment ce este executat `forEach()`, cele noi nu vor fi prelucrate. Dacă în momentul prelucrării cu `forEach()` sunt modificate valorile array-ului, metoda le va folosi pe cele găsite la momentul *trecerii*.

Un `forEach` nu poate fi oprit in execuție decât prin semnalizarea unei erori.
