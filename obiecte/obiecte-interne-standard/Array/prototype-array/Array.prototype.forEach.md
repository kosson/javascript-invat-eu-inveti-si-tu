# `Array.prototype.forEach()`

Această metodă a fost introdusă odată cu a cincea iterație a standardului. Are drept element de transformare o funcție, ceea ce permite o paletă largă de operațiuni asupra datelor prelucrate. Pe scurt, execută o funcție pentru fiecare element din array.
***Este implementarea naturală a ES5 pentru utilitățile _.each și $.each din Underscore și jQuery.***

Funcția care va fi executată poate avea trei argumente:

- `currentValue`; elementul din array care este procesat,
- `index`; indexul elementului din array care este procesat,
- `array`; array-ul pentru care se aplică forEach().

Opțional se mai poate pasa o valoare care să reprezinte `this` la executarea callback-ului.

Metoda nu poate fi înlănțuită (chainable).
Spre deosebire de `map()` și `reduce()`, `forEach()` returnează întotdeauna `undefined`.

```javascript
function logElementeArray (element, index, array) {
  console.log('a[' + index + '] = ' + element);
}

// A se nota faptul că index 2 este sărit pentru că
// nu există element la acea poziție în array.
[2, 5, , 9].forEach(logElementeArray);
// logs:
// a[0] = 2
// a[1] = 5
// a[3] = 9
```
