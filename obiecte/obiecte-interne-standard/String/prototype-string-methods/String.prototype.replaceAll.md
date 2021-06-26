# String.prototype.replaceAll()

Această metodă returnează un șir nou de caractere în care s-a operat înlocuirea tuturor fragmentelor sau a cuvintelor indicate în primul argument, care este un șir de caractere sau un RegExp.

```javascript
'a'.replace('', '_'); // '_a'
'aaa'.replace(/(?:)/g, '_'); // '_a_a_a_'

// simplificarea pe care o aduce:
'aaa'.replaceAll('', '_'); // '_a_a_a_'
```

Șirul de caractere original nu va fi modificat.

```javascript
let fragment = "Cineva interesant care este agasant."
const deCăutatCuRegExp = /ant/gi;
const deCăutatCuȘir = 'at';
console.log(fragment.replaceAll(deCăutatCuRegExp, 'at'));
console.log(fragment.replaceAll(deCăutatCuRegExp, deCăutatCuȘir));
```

Metoda poate primi doi parametri. Primul este poate fi un șir de caractere sau un RegExp, iar al doilea poate fi un fragment de caractere sau o funcție care returnează un șir de caractere.
Dacă se folosește RegExp-ul, acesta trebuie să aibă setat fanionul „global”. În caz contrar, va fi returnată următoarea eroare: `TypeError: replaceAll must be called with a global RegExp`.

## Resurse

- [21.1.3.18 String.prototype.replaceAll | ECMAScript® 2021 Language Specification](https://tc39.es/ecma262/#sec-string.prototype.replaceall)
- [String.prototype.replaceAll() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
