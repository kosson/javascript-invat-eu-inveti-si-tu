# String.prototype.codePointAt(index)

Este o metodă introdusă de ECMAScript 6 pentru a realiza conformitatea cu UTF-16.
Metoda returnează un **code point** Unicode, care identifică un caracter.

```javascript
'xyz'.codePointAt(1); // 121
'𝒥𝒶𝓋𝒶𝓈𝒸𝓇𝒾𝓅𝓉'.codePointAt(0); // 119973
console.log(String.fromCodePoint(119973)); // 𝒥
```

Parametrul pasat indică poziția **code point**-ului, nu cea a caracterului. Adu-ți aminte mereu de faptul că unele caractere au nevoie de o pereche de code point-uri pentru a fi reprezentate numeric.
