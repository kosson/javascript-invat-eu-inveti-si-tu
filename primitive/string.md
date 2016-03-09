# String - șir

## Mantre

- String este un obiect iterabil pentru că obiectul prototip are o metodă @@iterator (precum Array, TypedArray, Map și Set).

Este o primitivă.

```js
"test".length; // 4
```

este echivalent cu

```js
new String("test").length;
```

Crearea unui wrapper object pentru o valoare primară nu este recomandabilă.


## String ca obiect iterabil

```js
var someString = "hi";
var iterator = someString[Symbol.iterator]();

iterator.next(); // Object { value: "h", done: false }
iterator.next(); // Object { value: "i", done: false }

```
