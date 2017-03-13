# `String.prototype.anchor()`

Pasezi acestei funcții un string care va deveni numele atributului unui tag anchor în DOM.

```js
var continut = "Ceva";
document.body.innerHTML = continut.anchor('numele_meu');
```

Se va genera:

```html
<a name="numele_meu">Ceva</a>
```
