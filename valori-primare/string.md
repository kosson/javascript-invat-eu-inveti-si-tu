# String - șir

## Mantre

- JavaScript convertește automat primarele în obiecte String, fiind astfel posibilă folosirea metodelor obiectului String pentru primarele string. De fapt ceea ce se întâmplă este o „ambalare” a primarei string în obiectul global aferent.
- String este un obiect iterabil pentru că obiectul prototip are o metodă @@iterator (precum Array, TypedArray, Map și Set).

```js
"test".length; // 4
```

este echivalent cu

```js
new String("test").length;
```

Crearea unui wrapper object pentru o valoare primară nu este recomandabilă.

```javascript
var sir = new String('ceva'); // nu se recomandă
typeof sir;     // "object"
typeof 'ceva';  // "string"
```

## String ca obiect iterabil

```js
var someString = "hi";
var iterator = someString[Symbol.iterator]();

iterator.next(); // Object { value: "h", done: false }
iterator.next(); // Object { value: "i", done: false }

```
