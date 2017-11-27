# Funcții *fat arrow*

Acest nou tip de funcții au fost introduse de ECMAScript 2015. Este tot un obiect-funcție.

Semnul care dă și denumirea de fat arrow este un egal urmat de semnul mai mare ca: `=>`, ceea ce trimite vizual la ideea că funcția returnează rezultatul evaluării codului din funcție, adică a expresiei. Corpul funcției este numit și „concis”, ceea ce implică faptul că doar expresiile pot constitui corpul funcției.
Adu-ți aminte mereu faptul că în cazul unui bloc de cod, trebuie să scrii `return` pentru a scoate ceva din funcție. Doar în cazul expresiilor simple, precum un literal, beneficiem de un return implicit.

Sunt considerate a fi soluția perfectă pentru funcțiile anonime, care la rândul lor sunt cel mai des folosite ca și callback-uri. De fapt, asta a fost și gândirea din spatele deciziei de a introduce această sintaxă. Există totuși cazul în care o funcție arrow, capătă un nume:

```javascript
var faCeva = x => x * 2;
faCeva.name; "faCeva"
```

Funcțiile fat arrows la momentul execuției preiau `this` și `arguments` de la mediul lexical găzduitor. Nu creează legăturile proprii la `this` sau la `arguments`, ci, pur și simplu, le folosește pe cele ale gazdei. La ce bun acest lucru? În primul rând la evitarea problemelor de referențiere a lui `this` și evitarea folosirii utilitarului `bind` pentru a fixa totuși o referință către `this`.

```javascript
var o = {
  info: 'pi',
  iese: function scoate() {
    setTimeout ( () => console.log(this.info) );
  }
};
o.iese(); // pi

// versus vechea rutină

var obi = {
  info: 'pi',
  iese: function iese() {
    setTimeout ( function () {
      console.log(this.info);
    }.bind(this), 1000);
  }
};
obi.iese(); // pi

// versus și mai vechea rutină
// cu puntea lexicală urâtă self = this

var ob = {
  info: 'pi',
  iese: function iese() {
    var self = this;
    setTimeout ( function () {
      console.log(self.info);
    }, 1000);
  }
};
ob.iese(); // pi
```

Drept corp al funcției poate fi direct o expresie ce trebuie evaluată sau blocuri de cod convenționale ca în cazul funcțiilor declarate prin cuvântul cheie `function`.

Formule sintactice echivalente:

```javascript
var oriDoi = (valoare) => valoare * valoare;
// este echivalent cu
var oriDoi = (valoare) => { return valoare * valoare };
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
- În cazul unui bloc de cod, trebuie menționat return; acesta nu mai este implicit.
- Ceea ce se returnează este evaluarea unei expresii, nu a unui enunț.
- Funcțiile fat arrows sunt legate la scope-ul lexical. Nu mai este nevoie de trucul `var self = this` pentru a accesa contextul.
- Nu au funcție internă [[Construct]] și astfel, nu pot crea obiecte cu `new`.
- Nu exisă `this`, nici `arguments` și nici `super` sau `new.target`. Valorile pentru `this`, `super`, `arguments` și `new target` sunt luate de la funcția în interiorul căreia este definit fat arrow-ul.
- Nu are proprietatea `prototype`.
- Nu poate modifica `this`-ul funcției gazdă.
- Nu poți folosi un fat arrow ca generator.
- Lucrează cu un `this` fix, cel al funcției gazdă, fiind astfel eliminate multe surse de eroare. Dacă nu este într-o funcție gazdă, `this` va fi `undefined`.

## Mică anatomie

Un **fat arrow** este o funcție foarte simplă care nu poate fi folosită ca și constructor și care nu are propriul `this` și nici `arguments`.

Aceste funcții nu au nume. Dacă ții neapărat, poți totuși să legi un identificator la ele precum în: `var x = () => 10;`.

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

O funcție declarată clasic într-o prelucrare cu map():

```javascript
[1,2,3].map(function (numar) { return numar * 2; });  // Array [ 2, 4, 6 ]
```

Funcția anonimă folosită de `map`, se poate rescrie folosind „fat arrow” astfel:

```javascript
[1,2,3].map( numar => numar * 2 );
```

Pentru a declara mai multe argumente se vor folosi parantezele:

```javascript
[1,2,3].map( (numar, index) => numar * 2 + index );
```

Că tot veni vorba de argumente, în cazul fat arrows sunt permise și **default parameter values**, adică parametri cărora să le atribui valori din start.

```javascript
var ceva = (a = 10 * 2) => ++a; // 21
```

Dacă este nevoie de mai multe expresii, nu numai să returnezi ceva simplu, folosești acoladele:

```javascript
[1,2,3].map( numar => {
  var multiplicare = 2 + numar;
  return numar * multiplicare;
}); // Array [ 3, 8, 15 ]
```

Pentru a returna un obiect trebuie întotdeauna să-l introduci între paranteze rotunde. Acest lucru este necesar pentru că altfel perechea de acolade ar fi considerată un bloc de cod.

```javascript
[1,2,3].map( (numar, index) => ( {numar: numar, indexul: index} ) );
```

Arrow functions fac bindingul la contextul lexical imaginat de programator. Acest lucru este binevenit în lucrul cu DOM-ul.

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

Adu-ți mereu aminte că fat arrows sunt funcții, iar acestea moștenesc metodele lui `Function`. În concluzie, metodele obiectului fundamental `Function` sunt disponibile.

```javascript
var x = (unu, doi) => unu + doi;
console.log(x.call(null, 1, 2)); // 3
console.log(x.apply(null, [1, 2])); // 3
var maLegLaObiectNull = x.bind(null, 1, 2);
maLegLaObiectNull(); // 3
```

Dar în același timp, adu-ți mereu aminte că legătura la `this` este cea la mediul lexical al gazdei pentru că un fat arrow nu formează this. Dacă vei avea un fat arrow într-un fat arrow, `this`-ul va fi cel al obiectului gazdă al primului fat arrow. Un truc ar fi ca primul fat arrow să aibe drept corp concis o expresie de funcție normală, care, după cum bine știm formează propriul mediu lexical. Și astfel, cumva vom putea spune că al doilea fat arrow se va lega la mediul lexical (`this`-ul) al gazdei care este tot un fat arrow. Face sens?!

```javascript
var ceva = () => function obPlus(primeste) {
  var obi = { a: 1000, b: primeste};
  return obi;
};
var injectare = ceva();
var operatiune = injectare.call(null, [3,5]);
console.log(operatiune);
// Object { a: 1000, b: Array[2] }
```

## Recursivitate

Fat arrows pot fi utilizate recursiv dacă sunt declarate ca o expresie. Mediul lexical stabilit de funcția gazdă cuprinde funcția **fat arrow**.

```javascript
var faOScadere = (valoare) => {
  if (valoare < 0) return false;
  console.log(valoare);
  return faOScadere(valoare - 1);
}; faOScadere(5);
```

Sunt câteva cazuri de utilizare a „fat arrows” care necesită un ochi ager și atenție.

Să presupunem că pentru un motiv sau altul, ai nevoie să returnezi un enunț cum este „try {...} catch(error) {...}”. Cum faci? Pentru că sintaxa unui fat arrow este foarte concisă și nu prea permite variații. Singura metodă ar fi să introduci enunțul într-un bloc de acolade, care, după cum bine știm marchează limitele unui bloc de cod.

```javascript
var facCeva = () => { try {...} catch(error) {...} };
```

De la Kyle Simpson includ câteva informații privind obișnuințele de programare din jurul funcțiilor arrow functions, iar una mai interesantă implică scrierea corpului concis al funcției ca o înșiruire de expresii separate prin operatorul virgulă.

```javascript
((oValPosibilă, altăValPosibilă) => (
    oValPosibilă = 10,
    altăValPosibilă = 5,
    oValPosibilă * altăValPosibilă
  )
)(); // 30
```

Magia rezidă din faptul că poți declara variabilele prin introducerea lor ca argumente care nu vor primi valoarea.

Trebuie precizat că utilizarea unei astfel de sintaxe beneficiare a evaluării operatorului virgulă, trebuie întotdeuna introdusă între paranteze rotunde, care grupează și forțează evaluarea tuturor expresiilor. Altfel, dacă am folosi expresiile fără paranteze rotunde, va fi evaluată doar expresia de dinaintea primului operator virgulă, iar celelalte vor fi ignorate complet. Este foarte important să-ți aduci mereu aminte acest lucru.
Un lucru foarte interesant este că poți folosi ternarul în caz că ai nevoie de vreun if. Ternarul, după cum bine știm este o expresie, iar fat arrows folosește numai expresii. Nu poate folosi enunțuri.

Dacă dorești să introduci o funcție ca fiind corpul concis al unei funcții arrow, trebuie să folosești cuvântul rezervat „function”. Această funcție va fi o expresie de funcție, preferabil cu nume (*named function expression* în lb. engleză).

```javascript
var x = (a, b) => function ceva() {
  return a + b;
};
```

În acest caz ai nevoie să returnezi. Returnarea nu se va face implicit.

În cazul folosiri cu map a unei funcții arrow, aici se poate apela la un truc foarte fain, care face uz de sintaxa unei expresii pentru a atribui și numi în același timp funcția pe post de callback.

```javascript
unArray.map( numeFuncție = valoare =>
  valoare !== null ? ++valoare : numeFuncție( valoare = 0 )
);
```

Se observă cum numirea funcției callback care folosește un fat arrow, a permis referențierea mai târziu. Expresia de atribuire a fat arrow-ului se va solda cu atribuirea valorii evaluate în urma execuției fat arrow-ului, ceea ce constituie un artificiu foarte elegant. Numele dat funcției mai servește și mecanismului de recursivitate la care s-a apelat ulterior.

## Referințe

[Reg “raganwald” Braithwaite , JavaScript Allongé, the "Six" Edition](https://leanpub.com/javascriptallongesix)

[You Don't Know JS: ES6 & Beyond](https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20%26%20beyond)
