# Introducere

Tipuri în JavaScript

- undefined,
- string,
- number,
- boolean,
- object,

și mai sunt:

**function** și **null**

## Cum verifici pentru a afla ce este ceva în JS?

R: folosind typeof

```js
typeof ceva;          // "undefined"
typeof "ceva";        // "string"
typeof 123;           // "number"
typeof true;          // "boolean"
typeof {x: 1};        // "object"
typeof function(){};  // "function"
typeof null;          // "object" ESTE UN BUG! NU ESTE UN OBIECT
```

Function este un fel de subtip al lui object, de fapt o funcție este un „obiect callable”.


## Operațiuni abstracte

## ToString

- null      => "null"
- undefined => "undefined"
- true      => "true"
- false     => "false"
- 3.14159   => "3.14159"
- 0         => "0"
- -0        => "0"
