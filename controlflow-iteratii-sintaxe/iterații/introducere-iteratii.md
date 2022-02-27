# Iterații

Partea cea mai valoroasă a programării este aceea că poți lua un set de date pe care îl poți parcurge element cu element, aplicând transformări sau căutări după anumite criterii, cu scopul de a obține un anumit rezultat dorit. Este ceea ce se poate înțelege prin **ciclu**, adică o mișcare repetitivă sau aplicarea repetată a unor proceduri pe elementele individuale ale unei colecții. De altfel, în practica de zi cu zi, veți auzi interșanjabil termenii de buclă, iterare și uneori ciclare.

Dicționarul explicativ ne dă o definiție foarte utilă pentru iterare: *repetare a unui anumit procedeu de calcul, prin aplicarea lui la rezultatul calculului din etapa precedentă*.

## Bucle

Buclele sunt cel mai la îndemână instrument de a parcurge un set de date.
Folosirea buclelor presupune utilizarea repetată a unei secvențe de instrucțiuni. Îi mai spunem **ciclare** sau **iterare**. În fapt, ceea ce se întâmplă este o repetarea ritmică a unui set de instrucțiuni. Fiecare rezultat al fiecărei iterații este supus verificărilor.
Alternativa la procesele repetitive, la ciclurile iterative realizate cu buclele este **recursivitatea**. Recursivitatea nu implică conceptul de ciclu, ci acela de apel repetat al unei funcții din interiorul său.

## Interfața de iterare

În contextul programării computerelor, un *iterator* este un obiect ce permite prelucrarea/parcurgerea unei structuri de date cum este un array, de exemplu. Iteratorii își au originea în limbajul de programare CLU dezvoltat de Barbara Liskov în 1974 la Massachusetts Institute of Technology (MIT). Interarea se leagă și de conceptul de interfață după cum va urma.

Am menționat deja despre protocoalele de iterare. ECMAScript 2015 (ES6) a introdus un nou mecanism de parcurgere a datelor numit **iterare**. Mai exact, un **protocol de iterare** pentru că iterarea acest concept este în ADN-ul programării.

Conform noii versiuni a standardului (2019), protocolul de iterare s-a transformat într-o adevărată **interfață de iterare**. Textul [ECMAScript 2018](https://www.ecma-international.org/ecma-262/9.0/#sec-control-abstraction-objects) lămurește ce este o interfață, termen care trebuie înțeles de la bun început.

> O interfață este un set de chei a unor proprietăți ale căror valori asociate reprezintă o anumită specificație. Orice obiect care oferă toate proprietățile descrise de specificațiile interfaței este *conform* interfeței. O interfață nu este reprezentată distinct de vreun obiect. În schimb, pot fi multe obiect implementate separat care sunt conforme cu o interfață. Un singur obiect, poate fi conform cu mai multe interfețe.

Termenul cheie aici este această **conformitate**, pe care obiectele care implementează o interfață, trebuie să o respecte. De fapt, conformitatea impune anumite lucruri obiectului care implementează interfața, fie acestea comportamente ori metode specifice.

În anul 1994, patru specialiști în informatică căutau să unifice soluțiile folosite în practica programării computerelor în șabloane ușor de înțeles. Cei patru, Erich Gamma, Richard Helm, Ralph Johnson și John Vlissides, numiți de comunitate *Gang of Four*, investighează în lucrarea *Design Patterns: Elements of Reusable Object-Oriented Software* mai multe soluții uniformizate la nivel abstract prin ceea ce se numește *design patterns*. Unul dintre acestea se numește *Iterator*, fiind catalogat un model comportamental. Intenția acestui model de organizare a funcționalităților era de a:

> oferi o cale pentru a accesa secvențial elementele unui obiect agregat fără a expune reprezentarea sa internă.

Este menționat faptul că acestui șablon i se mai spune și *Cursor* și cea mai importantă mențiune este legată de domeniul de aplicare. Astfel, un șablon `Iterator` este construit pentru *a oferi o interfață uniformă folosită în traversarea diferitelor structuri de agregare*. Trebuie adăugat faptul că iterarea se poate face doar pe structuri sincrone așa cum sunt array-urile. Nu se pot aplica în cazul evenimentelor, care sunt asincrone în natură.

### Cum se face iterarea

Pentru a lămuri aspectele privind iterarea, vom recurge din nou la explicațiile *GoF*, care spun că iterarea este un algoritm de parcurgere (în engleză *traversal*) a unei structuri de date care folosește un *cursor* a cărui sarcină este să țină minte unde a ajuns (să memoreze starea). Dacă acest cursor este acționat cu o comandă `next`, își va modifica starea imediat ce va fi parcurs încă un element al structurii de date.

În parcurgerea unui set de date, atunci când rezultatul unui pas devine valoarea de start pentru următorul, atunci vorbim despre *iterare*. În acest moment avem două concepte centrale care merită atenția noastră deplină:

-   **iterable** fiind structura de date care expune elementele pentru a fi accesate public. Face acest lucru implementând o metodă care returnează un obiect numit *iterator*. Această metodă nu este abstractă, ci poate fi apelată în obiectele care pot fi iterate (`[Symbol.iterator]()`),
-   **iterator** fiind, de fapt, un pointer (în limba română ar fi tradus ca *indicator* sau *cursor*, dar poți să ți-l închipui ca un semn de carte) pentru traversarea elementelor unei structuri de date.

Standardul consideră `Iterable` și `Iterator` a fi **interfețe**.

**Spune standardul**:

> O interfață este un set de chei ale unor proprietăți ale căror valori asociate răspund unei anume specificații. Oricare obiect care pune la dispoziție toate proprietățile așa cum sunt descrise de specificațiile unei interfețe, se conformează acelei interfețe. O interfață nu este reprezentată de un anume obiect distinct. Pot să fie multe obiecte implementate separate care să fie conforme cu orice interfață. Un obiect individual poate fi conform cu mai multe interfețe. [25.1.1Common Iteration Interfaces](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-common-iteration-interfaces)

### Unde apar

Interfețele de iterare sunt întâlnire ori de câte ori avem de-a face cu structuri de cod ce au capacitatea de a parcurge structuri de date organizate ca array-uri, `Map` sau `Set`, ori promisiuni.

-   `for...of`,
-   `Array.from()`,
-   operatorul spread (`...`),
-   constructorul pentru Map `new Map([['varza',1],[2, true]])`,
-   constructorul pentru Set `new Set([1,'doi',false])`,
-   `Promise.all()` și `Promise.race()`,
-   `yield* unObiectIterabil`.

## Dependințe

- funcții,
- obiecte,
- moștenire

## Alonje

- generatoare

## Resurse

- [MDN - Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- [Iterables and iterators](http://exploringjs.com/es6/ch_iteration.html)
- [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns)
- [All you need to know about JavaScript Iterators and Generators](https://jfet97.github.io/JavaScript-Iterators-and-Generators/)
- [Looping over Arrays: for vs. for-in vs. .forEach() vs. for-of](https://2ality.com/2021/01/looping-over-arrays.htm)
- [Iterator | Wikipedia](https://en.wikipedia.org/wiki/Iterator)
- [CLU (programming language)](https://en.wikipedia.org/wiki/CLU_(programming_language))
