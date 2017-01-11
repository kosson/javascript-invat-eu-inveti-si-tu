# Rest parameters

Această sintaxă generează un Array adevărat, nu un array-like așa cum este `arguments`. Parametrii rest sunt singurii cărora nu le-a fost dat un nume. Totuși `arguments` îi conține pe toți.

Intenția introducerii prin ECMAScript a parametrilor rest, a fost accea de a înlocui `arguments`. Motivul a fost necesitatea de a putea introduce un număr nelmitat de argumente.

Sintaxa este reprezentată prin trei puncte urmate de un identificator. Regula privind `rest parameters` este că trebuie să fie ultimul parametru.

Înainte de ES6, singura metodă de a transforma `arguments` într-un array era prin folosirea unui artificiu des întâlnit:

```javascript
function lucru(a, b){
  Array.prototype.slice.call(arguments, lucru.length);
  // cod funcție
};
```

fiind echivalent cu:

```javascript
function lucru(a, b, ...argumente){
  // cod funcție
};
```

Obiectul `arguments` a reflecta fidel numărul argumentelor, chiar dacă acestea sunt constituite prin folosirea lui rest.

Parametrii rest trebuie să stea ca ultimul argument atunci când este pasat funcției.

Parametrii rest nu pot fi utilizați atunci când se creează obiecte a căror proprietăți sunt introduse folosind `object literal setters`. Acest lucru se petrece pentru că setarea în acest mod a proprietăților se poate face doar cu un singur argument iar parametrii rest pot seta o mulțime de parametri.

```javascript
var x = {
  set facCeva(...argumente){}
};
```
