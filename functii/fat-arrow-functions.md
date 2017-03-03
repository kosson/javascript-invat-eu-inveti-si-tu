# Funcții ***fat arrow***

Acest nou tip de funcții au fost introduse de ECMAScript 2015.

Semnul care dă și denumirea de fat arrow este `=>` ceea ce înseamnă că funcția returnează rezultatul evaluării codului din funcție.

Sunt soluția perfectă pentru funcțiile anonime, care la rândul lor sunt cel mai des folosite ca și callback-uri. De fapt, asta a fost și gândirea din spatele deciziei de a introduce această sintaxă.

Funcțiile fat arrows la momentul execuție preia `this` și `arguments` de la mediul lexical găzduitor. Nu creează legăturile proprii la `this` sau la `arguments`, ci, pur și simplu, le folosește pe cele ale gazdei.

Drept corp al funcției poate fi direct o expresie ce trebuie evaluată sau blocuri de cod convenționale ca în cazul funcțiilor declarate prin cuvântul cheie `function`.

Formule sintactice achivalente:

```javascript
var oriDoi = (valoare) => valoare * valoare;
// este echivalent cu
var oriDoi = (valoare) => {return valoare * valoare};
```

Cel mai clar exemplu pe care l-am găsit și care „a aprins lumina” este cel oferit de Reg “raganwald” Braithwaite în ***JavaScript Allongé, the "Six" Edition***.

```javascript
(function () {
  return (function () { return arguments[0]; })('oaspete');
})('gazdă'); // "oaspete"
```

Acum, în cazul folosirii funcțiilor „fat arrow”, `arguments` va fi creat de funcția gazdă.

```javascript
(function () {
  return (() => arguments[0])('oaspete');
})('gazdă'); // "gazdă"
```

Funcțiile ***fat-arrow*** își au originile în expresiile lambda ale programării bazate pe funcții.

## Mantre

- Fat arrow sunt funcții.
- Funcțiile fat arrows sunt legate la scope-ul lexical. Nu mai este nevoie de trucul `var self = this` pentru a accesa contextul.
- Nu au funcție internă [[Construct]] și astfel, nu pot crea obiecte cu `new`.
- Nu exisă `this`, nici `arguments` și nici `super` sau `new.target`. Valorile pentru `this`, `super`, `arguments` și `new target` sunt luate de la funcția în interiorul căreia este definit fat arrow-ul.
- Nu are proprietatea `prototype`.
- Nu poate modifica `this`-ul funcției gazdă.
- Nu poți folosi un fat arrow ca generator.
- Lucrează cu un `this` fix, cel al funcției gazdă, fiind astfel eliminate multe surse de eroare. Dacă nu este într-o funcție gazdă, `this` va fi `undefined`.

## Mică anatomie

Un **fat arrow** este o funcție foarte simplă care nu poate fi folosită ca și constructor și care nu are propriul `this` și nici `arguments`.

Aceste funcții nu au nume.

```javascript
(function faCeva (ceva) {
  var dinGazda = 10;
  ((x) => {
    console.log(this);     // window
    console.log(arguments);// { 0: 1000, 2 more… }
    console.log(prototype);// ReferenceError: prototype is not defined
    console.log(dinGazda); // 10
    console.log(x);        // true
  })(true);
})(1000);
```

În funcție de scenariul de utilizare, un fat arrow poate fi scris în câteva moduri diferite.

## Un singur argument

Pentru un singur argument poți să nu mai pui parantezele:

```javascript
var x = valoare => valoare; x(1); // 1
```

## Zero, două sau mai multe argumente folosesc parantezele:

```javascript
var zero = () => 'sunt zero argumente'; zero();
var y = (unu, doi) => unu + doi; y(2, 5); // 7
```

## Parametrii rest folosesc parantezele:

```javascript
var z = [];
var w = (...z) => z;
w(2, 2); // Array [ 2, 2 ]
```

O funcție declarată clasic:

```js
[1,2,3].map(function (numar) { return numar * 2; });  // Array [ 2, 4, 6 ]
```

Funcția anonimă folosită de `map`, se poate rescrie folosind „fat arrow” astfel:

```js
[1,2,3].map( numar => numar * 2 );
```

Pentru a declara mai multe argumente se vor folosi parantezele:

```js
[1,2,3].map( (numar, index) => numar * 2 + index );
```

Dacă este nevoie de mai multe expresii, nu numai să returnezi ceva simplu:

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

## Se aplică `call()`, `apply()` și `bind()`

Nu trebuie uitat faptul că fat arrows sunt funcții iar acestea moștenesc metodele lui `Function`.

```javascript
var x = (unu, doi) => unu + doi;
console.log(x.call(null, 1, 2)); // 3
console.log(x.apply(null, [1, 2])); // 3
var maLegLaObiectNull = x.bind(null, 1, 2);
maLegLaObiectNull(); // 3
```

## Recursivitate

Fat arrows pot fi utilizate recursiv dacă sunt declarate ca o expresie. Nu uita faptul că mediul lexical stabilit de funcția gazdă cuprinde funcția **fat arrow**.

```javascript
var faOScadere = (valoare) => {
  if (valoare < 0) return false;
  console.log(valoare);
  return faOScadere(valoare - 1);
}; faOScadere(5);
```

## Referințe

[Reg “raganwald” Braithwaite , JavaScript Allongé, the "Six" Edition](https://leanpub.com/javascriptallongesix)
