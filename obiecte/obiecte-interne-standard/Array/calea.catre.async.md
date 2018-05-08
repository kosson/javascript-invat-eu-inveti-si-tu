# Calea către async

## forEach()

Primul pas este înțelegerea prelucrării array-urilor fără a folosi bucle.

```javascript
[1,2,3].forEach( elem => console.log(elem) );
```

## map()

```javascript
console.log([1,2,3].map( elem => ++elem )); // [2, 3, 4]
```
