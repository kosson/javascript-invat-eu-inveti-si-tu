# String.prototype.codePointAt()

Aceasta este o metodă care returnează un cod Unicode care identifică un caracter.

```javascript
'xyz'.codePointAt(1); // 121
'𝒥𝒶𝓋𝒶𝓈𝒸𝓇𝒾𝓅𝓉'.codePointAt(0); // 119973
console.log(String.fromCodePoint(119973)); // 𝒥
```
