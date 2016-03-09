# Argumentele funcțiilor

Pe scurt, este ceea ce pasezi funcțiilor.

## Setarea unei valori implicite pentru un argument

```js
var test = function(ceva){
  return ceva || 'Valoare implicită';
};

console.log(test('CEVA')); // CEVA
console.log(test());       // Valoare implicită
```

Acesta este un șablon de lucru foarte important care permite utilizarea de valori prestabilite atunci când nimic nu este pasat funcției.

Acest mic șablon se va schimba odată cu folosirea ECMAScript6, când se va putea seta valoarea implicită chiar la pasarea argumentelor:

```js
var test = function(ceva = "Valoare implicită"){
  return ceva;
};
```
