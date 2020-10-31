# Funcții fat arrow

Acest nou tip de funcții au fost introduse de ECMAScript 2015. Este tot un obiect-funcție. Cea mai simplă semnătură este `parametru => expresie`. Observă faptul că nu folosim cuvântul cheie `function`.

Semnul care dă și denumirea de *fat arrow* (în română ar fi *săgeată groasă*) este un egal urmat de semnul mai mare ca: `=>`. O altă denumire acceptată este *funcție săgeată* (*arrow function*). Corpul funcției este numit și „concis”, implicând faptul că doar expresiile pot constitui corpul funcției.

Adu-ți aminte mereu faptul că în cazul unui bloc de cod al unui *fat arrow*, trebuie să scrii `return` pentru a scoate rezultatul. Altfel, în cazul expresiilor simple sau al unui literal, beneficiem de un return implicit (*implicit return*), fără a mai fi nevoie de acoladele ce indică corpul funcției: `let a = () => 10`.

Sunt considerate a fi soluția perfectă pentru funcțiile anonime, care la rândul lor sunt preferate în rolul de callback-uri. De fapt, asta a fost și gândirea din spatele deciziei de a introduce această sintaxă. Mai există și avantajul preluării `this` al callback-ului, fără a mai fi nevoie să legi cu `bind()`. Există totuși cazul în care o funcție arrow, capătă un nume acesta fiind sub forma unei expresii de funcție cu nume.

```javascript
let faCeva = x => x * 2;
faCeva.name; "faCeva"
```

Funcțiile *fat arrows* la momentul execuției preiau `this` și `arguments` de la mediul lexical găzduitor. Nu creează propria legătură `this` și nici nu se constituie obiectul `arguments`, folosindu-le pe cele ale gazdei. Contextul de execuție este moștenit de la funcția sau obiectul în care sunt definite. La ce este bun acest lucru? Sunt evitate problemele legate de legătura realizată prin `this`.

```javascript
// noua rutină
const obi = {
  info: 'pi',
  scot: function () {
    setTimeout ( () => console.log(this.info), 1000 );
  }
};
obi.scot(); // pi

// versus vechea rutină
const obi = {
  info: 'pi',
  scot: function () {
    setTimeout ( function () {
      console.log(this.info);
    }.bind(this), 1000);
  }
};
obi.scot(); // pi

// versus și mai vechea rutină
// cu puntea lexicală urâtă self = this
var obi = {
  info: 'pi',
  scot: function () {
    var self = this;
    setTimeout ( function () {
      console.log(self.info);
    }, 1000);
  }
};
obi.scot(); // pi
```

Drept corp al funcției poate fi direct o expresie ce trebuie evaluată sau blocuri de cod convenționale precum în cazul funcțiilor „normale”. Hai să vedem câteva formule sintactice echivalente:

```javascript
let oriDoi = valoare => valoare * valoare;
// este echivalent cu
let oriDoi = (valoare) => { return valoare * valoare };
```

Un exemplu excelent este cel oferit de Reg *raganwald* Braithwaite în **JavaScript Allongé, the "Six" Edition**. Pornim de la o funcție autoexecutabilă. Acesteia îi trimitem o valoare string arbitrară. Știind că funcțiile convenționale generează `arguments` și legătură `this`, la momentul returnării, vom evalua o altă expresie de funcție. Aceasta la rândul său va primi o valoare arbitrară. Am trimis aceste valori pentru a popula obiectele `arguments` ale ambelor funcții. Astfel pe poziția `arguments[0]` vom avea valori în cazul ambelor funcții.

```javascript
(function () {
  return (function () {
    return arguments[0];
  })('oaspete');
})('gazdă'); // "oaspete"
```

Prin contrast, în cazul folosirii funcțiilor *fat arrow*, va fi utilizat obiectul `arguments` creat de funcția gazdă. Chiar dacă am împacheta *funcția săgeată* între paranteze rotunde cu scopul de a-i trimite un argument, acesta nu va fi utilizat pentru că nu există vreun mecanism dedicat stocării lor.

```javascript
(function () {
  return (() => arguments[0])('oaspete');
})('gazdă'); // "gazdă"
```

În cazul nostru, funcția *externă* va fi cea care va oferi valoarea de pe poziția `0` a propriului `arguments`.
Funcțiile **fat arrow** își au originile în expresiile lambda ale programării funcționale. Un **fat arrow** este o funcție foarte simplă care nu poate fi folosită drept constructor. Aceste funcții nu au nume. Poți să le atribui un identificator prin formularea unei expresii de funcție, precum în: `let x = () => 10;`.

```javascript
(function faCeva (ceva) {
  let dinGazda = 10;
  ((x) => {
    console.log(this);     // window
    console.log(arguments);// { 0: 1000, 2 more… }
    console.log(prototype);// ReferenceError: prototype is not defined
    console.log(dinGazda); // 10
    console.log(x);        // true
  })(true);
})(1000);
```

## Sintaxa fat arrow

În funcție de scenariul de utilizare, un *fat arrow* poate fi scris în câteva moduri diferite.

### Un singur argument

Pentru un singur argument poți să nu mai pui parantezele:

```javascript
var x = valoare => valoare; x(1); // 1
```

### Zero, două sau mai multe argumente folosesc parantezele:

```javascript
var zero = () => 'sunt zero argumente'; zero();
var y = (unu, doi) => unu + doi; y(2, 5); // 7
```

### Parametrii rest

Pentru acomodarea de *rest parameters* se folosesc parantezele rotunde neapărat. Folosirea acestora este cel mai apropiat lucru de obiectul `arguments`.

```javascript
var z = [];
var w = (...z) => z;
w(2, 2); // Array [ 2, 2 ]
```

Un exemplu rapid ar fi prelucrarea datelor folosind o funcție de mapping. Iată o funcție declarată clasic într-o prelucrare cu `map()`:

```javascript
[1,2,3].map(function (numar) { return numar * 2 });  // Array [ 2, 4, 6 ]
```

Funcția anonimă folosită de `map()`, se poate rescrie folosind *fat arrow* astfel:

```javascript
[1,2,3].map( numar => numar * 2 );
```

Pentru a declara mai multe argumente se vor folosi parantezele:

```javascript
[1,2,3].map( (numar, index) => numar * 2 + index );
```

Că tot veni vorba de argumente, în cazul fat arrows sunt permise și **default parameter values**, adică parametri cărora să le atribui valori din start.

```javascript
let ceva = (a = 10 * 2) => ++a; // 21
```

### Expresii multiple de evaluat

Dacă este nevoie de mai multe expresii, nu numai să returnezi ceva simplu, folosești acoladele:

```javascript
[1, 2, 3].map( numar => {
  let multiplicare = 2 + numar;
  return numar * multiplicare;
}); // Array [ 3, 8, 15 ]
```

Pentru a returna un obiect trebuie întotdeauna să-l introduci între paranteze rotunde. Acest lucru este necesar pentru că altfel perechea de acolade ar fi considerată un bloc de cod.

```javascript
[1, 2, 3].map( (numar, index) => ( {numar: numar, indexul: index} ) );
```

### Fat arrows și this

Funcțiile săgeată sunt opțiunea naturală pentru callback-uri. Reamintim faptul că un callback este o funcție care este definită sau primită într-un parametru și este rulată în interiorul funcției „gazdă”. Ar mai putea fi cazul în care definim un fat arrow în corpul funcției pentru un motiv bine întemeiat.

Motivul pentru care este alegerea „naturală” este pentru că folosește legătura `this` stabilită de gazdă. Nu face acea deturnare a legăturii la obiectul global așa cum s-ar întâmpla în cazul funcțiilor definite cu `function`. Acest comportament elimină necesitatea din trecut de a face o legătură cu `bind()`, precum în `fnCallback.bind(this)` sau de a face artificiul lexical `let self = this;`. Reține faptul că legătura `this` a unei funcții „normale” se realizează **dinamic** în funcție de locul în care este apelată, dar legătura `this` a unei funcții săgeată va fi rezolvată **lexical** la cine este `this` al funcție gazdă. Dacă nu există o funcție gazdă, dacă nu rulăm codul sub regula `"use strict";`, `this` va fi obiectul global, iar în caz contrar, va fi `undefined`.

 Acest lucru este binevenit în lucrul cu obiectele DOM. Uneori ai nevoie să faci prelucrări de date într-un obiect creat de tine. În acest scop, va trebui să faci legătura la contextul obiectului tău pentru a executa o funcție drept răspuns la un eveniment. Pentru că atașarea unei funcții de răspuns la un eveniment are drept efect rularea funcției în contextul obiectului DOM pentru care se ascultă un eveniment, trebuie să găsim un mecanism de schimbare a contextului.

```html
<button type="button" name="button" id="test">Testeaza this</button>
<script type="text/javascript">
  // creezi obiectul propriu în care faci prelucrări
  function Apasa () {
    this.stare = false;
    this.schimba = () => {
      this.stare = true;
    };
  };
  const ruptor = new Apasa();
  // se crează un obiect DOM
  const element = document.getElementById('test');
  element.addEventListener('click', ruptor.schimba);
</script>
```

În acest moment contextul de execuție al metodei `schimbă` nu este obiectul creat de noi, ci obiectul generat de secția cu selectorul `getElementById`. Acest obiect nu are vreo proprietate `ruptor`. Avem nevoie să schimbăm cumva contextul. În trecut, se împacheta funcția de răspuns între paranteze rotunde și se folosea `bind()` pentru a face legătura la contextul corect.

```javascript
element.addEventListener('click', (ruptor.schimba).bind(ruptor));
```

### Schimbă contextul folosind call(), apply() și bind()

Adu-ți mereu aminte că *fat arrows* sunt funcții, iar acestea moștenesc metodele lui `Function`. În concluzie, metodele obiectului fundamental `Function` sunt disponibile.

```javascript
let x = (unu, doi) => unu + doi;
console.log(x.call(null, 1, 2)); // 3
console.log(x.apply(null, [1, 2])); // 3
var maLegLaObiectNull = x.bind(null, 1, 2);
maLegLaObiectNull(); // 3
```

Dar în același timp, adu-ți mereu aminte că legătura la `this` este cea la mediul lexical al gazdei pentru că un *fat arrow* nu generează propriul obiect `this`. Dacă vei avea un *fat arrow* într-un *fat arrow*, `this`-ul va fi cel al obiectului gazdă al primului *fat arrow*. Un truc ar fi ca primul *fat arrow* să aibă drept *corp concis* o expresie de funcție normală, care, după cum bine știm formează propriul mediu lexical. Și astfel, cumva vom putea spune că al doilea *fat arrow* se va lega la mediul lexical (`this`-ul) al gazdei care este tot un *fat arrow*. Are sens?!

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

Fat arrows pot fi utilizate recursiv dacă sunt declarate ca o expresie. Mediul lexical stabilit de funcția gazdă cuprinde funcția *fat arrow*.

```javascript
var faOScadere = (valoare) => {
  if (valoare < 0) return false;
  console.log(valoare);
  return faOScadere(valoare - 1);
}; faOScadere(5);
```

Sunt câteva cazuri de utilizare *fat arrows* care necesită un ochi ager și atenție.

Să presupunem că pentru un motiv sau altul, ai nevoie să folosești un enunț cum este *try {...} catch(error) {...}*. Cum faci? Pentru că sintaxa unui *fat arrow* este foarte concisă și nu prea permite variații. Singura metodă ar fi să introduci enunțul într-un bloc de acolade, care, după cum bine știm marchează limitele unui bloc de cod.

```javascript
var facCeva = () => {
  try {
  //...
  } catch(error) {
  //...
  }
};
```

De la Kyle Simpson includ câteva informații privind obișnuințele de programare privind arrow functions. Una mai interesantă implică scrierea corpului concis al funcției ca o înșiruire de expresii separate prin operatorul virgulă.

```javascript
((oValPosibilă, altăValPosibilă) => (
    oValPosibilă = 10,
    altăValPosibilă = 5,
    oValPosibilă * altăValPosibilă
  )
)(); // 30
```

Magia rezidă din faptul că poți declara variabilele prin introducerea lor ca argumente care nu vor primi valoarea.

Trebuie precizat că utilizarea unei astfel de sintaxe beneficiare a evaluării folosind operatorului virgulă, trebuie întotdeuna introdusă între paranteze rotunde, care grupează și forțează evaluarea tuturor expresiilor. Altfel, dacă am folosi expresiile fără paranteze rotunde, va fi evaluată doar expresia de dinaintea primului operator virgulă, iar celelalte vor fi ignorate complet. Este foarte important să-ți aduci mereu aminte acest lucru.
Un lucru foarte interesant este că poți folosi ternarul în caz că ai nevoie de vreun `if`. Ternarul, după cum bine știm este o expresie, iar *fat arrows* folosește numai expresii. Nu poate folosi enunțuri.

Dacă dorești să introduci o funcție ca fiind corpul concis al unei funcții arrow, trebuie să folosești cuvântul rezervat „function”. Această funcție va fi o expresie de funcție, preferabil cu nume (*named function expression* în lb. engleză).

```javascript
var x = (a, b) => function ceva () {
  return a + b;
};
```

În acest caz ai nevoie să returnezi. Returnarea nu se va face implicit.

În cazul folosiri cu `map()` a unei funcții arrow, aici se poate apela la un truc foarte fain, care face uz de sintaxa unei expresii pentru a atribui și numi în același timp funcția pe post de callback.

```javascript
unArray.map( numeFuncție = valoare =>
  valoare !== null ? ++valoare : numeFuncție( valoare = 0 )
);
```

Se observă cum numirea funcției callback care folosește un fat arrow, a permis referențierea mai târziu. Expresia de atribuire a fat arrow-ului se va solda cu atribuirea valorii evaluate în urma execuției fat arrow-ului, ceea ce constituie un artificiu foarte elegant. Numele dat funcției mai servește și mecanismului de recursivitate la care s-a apelat ulterior.

## Arrow functions și clasele

Pentru că funcțiile săgeată rezolvă legătura `this` lexical, o astfel de funcție nu poate sta la baza construcției unei clase. Încercarea de instanțiere cu `new` a unei astfel de funcții, se va solda cu o eroare.

## Mantre

-   Fat arrow sunt funcții.
-   În cazul unui bloc de cod, trebuie menționat return; acesta nu mai este implicit.
-   Ceea ce se returnează este evaluarea unei expresii, nu a unui enunț.
-   Funcțiile fat arrows sunt legate la scope-ul lexical. Nu mai este nevoie de trucul `var self = this` pentru a accesa contextul.
-   Nu au funcție internă \[\[Construct]] și astfel, nu pot crea obiecte cu `new`.
-   Nu există `this`, nici `arguments` și nici `super` sau `new.target`. Valorile pentru `this`, `super`, `arguments` și `new target` sunt luate de la funcția în interiorul căreia este definit fat arrow-ul.
-   Nu are proprietatea `prototype`.
-   Nu poate modifica `this`-ul funcției gazdă.
-   Nu poți folosi un fat arrow ca generator.
-   Lucrează cu un `this` fix, cel al funcției gazdă, fiind astfel eliminate multe surse de eroare. Dacă nu este într-o funcție gazdă, `this` va fi `undefined`.

## Referințe

-   [Reg “raganwald” Braithwaite , JavaScript Allongé, the "Six" Edition](https://leanpub.com/javascriptallongesix)
-   [You Don't Know JS: ES6 & Beyond](https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20%26%20beyond)
