# Folosirea lui `var` și `let`

`let` oferă scoping la nivel de bloc de cod - `{}`.

Drept exemplu, vom executa o funcție care are drept scop încărcarea unui array cu funcții. Acest array va fi `mapat` pentru a executa fiecare dintre ele. Se dorește obținerea unei serii de numere naturale.

```js
var apeluri = [];

(function(){
  for (var x = 0; x < 5; x++){
    apeluri.push(function(){
      return x;
    });
  }
})();

console.log(apeluri.map(function(callback){
  return callback();
})); // Array [ 5, 5, 5, 5, 5 ]
```

Ceea ce s-a întâmplat este că înainte de a se rula mappingul, variabila x a fost supusă deja mecanismului de hoisting însemnând că este în scope-ul format de funcție, nu cel al lui `for`.
În concluzie fiecare dintre funcțiile rulate vor returna valoarea fixă finală de 5.

Folosind în locul lui var, let, vom limita variabila la scope-ul blocului de cod în care a fost declarată.

```js
var apeluri = [];

(function(){
  for (let x = 0; x < 5; x++){
    apeluri.push(function(){
      return x;
    });
  }
})();

console.log(apeluri.map(function(callback){
  return callback();
})); // Array [ 0, 1, 2, 3, 4 ]
```

În cazul folosirii lui `let`, variabila va fi accesibilă la nivelul buclei, ceea ce înseamnă, de fapt că pentru fiecare iterație se va folosi o instanță separată a lui `x`. Nu se va mai rescrie cu fiecare iterație valoarea lui x.
