# Array.prototype.forEach()

Execută o funcție pentru fiecare element din array.

Funcția care va fi executată poate avea trei argumente:
- currentValue; elementul din array care este procesat,
- index; indexul elementului din array care este procesat,
- array; array-ul pentru care se aplică forEach().

Opțional se mai poate pasa o valoare care să reprezinte ``this`` la executarea callback-ului.

***Este implementarea naturală a ES5 pentru utilitățile _.each și $.each din Underscore și jQuery.***

Metoda nu poate fi înlănțuită (chainable).
Spre deosebire de map() și reduce(), forEach() returnează întotdeauna ``undefined``.

```js
function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element);
}

// A se nota faptul că index 2 este sărit pentru că
// nu există element la acea poziție în array.
[2, 5, , 9].forEach(logArrayElements);
// logs:
// a[0] = 2
// a[1] = 5
// a[3] = 9
```
