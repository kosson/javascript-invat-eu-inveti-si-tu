Obiectul global String este un constructor de șiruri de caractere

Stringurile pot fi create direct cu `String(ceva)`, în care `ceva` este orice ar putea fi convertit la string.

## Mantre

-  JavaScript convertește automat primitivele în obiecte String, fiind astfel posibilă folosirea metodelor obiectului String pentru primitivele string.

Începând cu ECMAScript 2015, stringurile literale pot fi numite și „Stringuri șablon” - Template strings. Un simplu exemplu:

```js
var a = 5;
var b = 10;

console.log("Cinsprezece este suma " + (a + b) + " și\nnu " + (2 * a + b) + ".");
// este echivalent cu:
console.log(`Cinsprezece este suma ${a + b} și\nnu ${2 * a + b}.`);
```
O formă și mai avansată de template-uri literale este cea numită `tagged template literals`. Un simplu exemplu:

```js
var a = 5;
var b = 10;

function tag(strings, ...values) {
  console.log(strings[0]); // "Hello "
  console.log(strings[1]); // " world "
  console.log(strings[2]); // ""
  console.log(values[0]);  // 15
  console.log(values[1]);  // 50

  return "Bazinga!";
}

tag`Hello ${ a + b } world ${ a * b }`;
// "Bazinga!"
```

Mai multe detalii la: [Mozilla Developer Network - Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
