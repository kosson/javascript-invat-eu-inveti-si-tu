# String - șir

## Mantre

- JavaScript convertește automat primarele în obiecte String, fiind astfel posibilă folosirea metodelor obiectului String pentru primarele string. De fapt ceea ce se întâmplă este o „ambalare” a primarei string în obiectul global aferent.
- String este un obiect iterabil pentru că obiectul prototip are o metodă @@iterator (precum Array, TypedArray, Map și Set).

```javascript
"test".length; // 4
```

este echivalent cu

```javascript
new String("test").length;
```

Crearea unui wrapper object pentru o valoare primară, nu este o practică recomandabilă.

```javascript
var sir = new String('ceva'); // nu se recomandă
typeof sir;     // "object"
typeof 'ceva';  // "string"
```

## String ca obiect iterabil

```javescript
var someString = "hi";
var iterator = someString[Symbol.iterator]();

iterator.next(); // Object { value: "h", done: false }
iterator.next(); // Object { value: "i", done: false }
```

Pentru a vedea toate metodele care pot fi aplicate unui șir de caractere, vă invit să mergeți la informațiile despre obiectul intern String.

## Concatenarea șirurilor de caractere

Șirurile pot fi „legate” unele de altele pentru a forma alte șiruri de caractere.

Se poate folosi `concat()` sau operatorul plus (`+`).

```javascript
'ceva plus '.concat('altceva'); // ceva plus altceva
// sau
'ceva plus ' + 'altceva'; // ceva plus altceva
```
