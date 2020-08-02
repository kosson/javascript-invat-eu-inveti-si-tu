# String.prototype.replace()

Metoda returnează un nou șir care a incorporat modificări ale unor părți ce s-au potrivit criteriilor de căutare sub forma unui alt șir sau al unui șablon `RegExp`. Când este folosit un șablon `RegExp`, va fi apelată automat metoda obiectului `RegExp`: `RegExp.prototype[@@replace]`.
Înlocuirile se fac cu un alt șir sau cu rezultatul execuției unei funcții.

```javascript
var continut = "Eu am fost trimis în lume";
var deinlocuit = "parașutat";

var noulcontinut = continut.replace("trimis", deinlocuit);
console.log(noulcontinut); // Eu am fost parașutat în lume
```

Uneori pentru a extrage toate *capturing groups* fără a mai apela la metoda `exec()` al `RegExp` renunți la rezultat și folosești un callback. Această soluție a fost adusă în atenție de Lea Verou.

```javascript
let elementeUnice = new Set();
unFragmentDeText.replace(/\/\*# sourceMappingURL=(.+?) \*\//g, ($0, url) => {
  elementeUnice.add(url);
});
```

Pentru exemplele ce vizează folosirea de șabloane `RegExp`, te îndrept să consulți materialul de la `RegExp.prototype[@@replace]`.
