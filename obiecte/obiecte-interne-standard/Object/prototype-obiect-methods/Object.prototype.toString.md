# Object.prototype.toString()

Este o metodă folosită pentru a obține o reprezentare a obiectului ca text. Metoda este moștenită de toate obiectele care moștenesc de la `Object`. metoda returnează un șir `"[object tipul_obiectului]"`, unde `tipul_obiectului` indică tipul de obiect.

## Mantre

- fiecare obiect are o metodă `toString`, care este apelată automat atunci când un obiect trebuie reprezentat ca o valoare textuală sau când se apelează obiectul pentru a fi reprezentat ca string.
- metoda returnează `[object type]`, unde `type` este tipul de obiect.
- metoda poate fi suprascrisă

```javascript
var obiect = new Object();
obiect.toString(); // este returnat [object Object]
```

Folosirea lui `Object.prototype.toString()` cu `Function.prototype.call()` sau `Function.prototype.apply()`, permite identificarea tipului de obiect pentru care se face investigația.

```javascript
Object.prototype.toString.call(new Date);   // "[object Date]"
Object.prototype.toString.call(new String); // "[object String]"
Object.prototype.toString.call(Math);       // "[object Math]"

Object.prototype.toString.call({a: true});  // "[object Object]"
var x = Object.prototype.toString.call({a: true});  // "[object Object]"
console.log(x); // "[object Object]"
```

## Utilizarea în cazul numerelor

Metoda `toString()` pote fi folosită și pe valori numerice sau `BigInt`. În acest caz, acceptă un al doilea parametru prin care este precizată rădăcina. Valoarea rădăcinii se poate afla între `2` și `36`. Ceea ce realizezi este o transformare a numerelor zecimale (baza 10) în numere care au altă bază.

```javascript
let număr = 100;
console.log(număr.toString(2)); // 1100100
```

În exemplul prezentat am făcut o transformare a numărului 100 din baza zece, în bază 2, adică am obținut o reprezentare binară a sa. Bazele sunt următoarele:
- 2 (binar),
- 8 (octal),
- 10 (zecimal),
- 16 (hexazecimal).

## Resurse

- [Object.prototype.toString() | MDN Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
