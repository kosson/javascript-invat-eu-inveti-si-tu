# Funcții fat arrow

Sunt introduse odată cu ECMAScript 2015.
Funcțiile fat-arrow își au originile în expresiile lambda ale programării bazate pe funcții.

## Mantre

- Funcțiile fat arrows sunt legate la scope-ul lexical. Nu mai este nevoie de trucul `var self = this` pentru a accesa contextul.

O funcție declarată clasic:

```js
[1,2,3].map(function(numar){ return numar * 2; });  // Array [ 2, 4, 6 ]
```

Funcția anonimă folosită de map, se poate rescrie folosind „fat arrow functions” astfel:

```js
[1,2,3].map( numar => numar * 2 );
```

Pentru a declara mai multe argumente se vor folosi parantezele:

```js
[1,2,3].map( (numar, index) => numar * 2 + index);
```

Dacă este nevoie de mai multe expresii nu numai să returnezi ceva simplu:

```js
[1,2,3].map( numar => {
  var multiplicare = 2 + numar;
  return numar * multiplicare;
} ); // Array [ 3, 8, 15 ]
```

Pentru a returna un obiect:

```js
[1,2,3].map( (numar, index) => ({numar: numar, indexul: index}) );
```

Arrow functions fac bindingul la contextul lexical stabilit.

```html
<button type="button" name="button" id="test">Testeaza this</button>
<script type="text/javascript">
  function Apasa(){
    this.stare = false;
    this.schimba = () => {
      this.stare = true;
    };
  };
  var ruptor = new Apasa();
  var element = document.getElementById('test');
  element.addEventListener('click', ruptor.schimba);
</script>
```
