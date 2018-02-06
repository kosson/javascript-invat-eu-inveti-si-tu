# Iterații

Partea cea mai valoroasă a programării este aceea că poate prelua un set de date pe care le poate parcurge element cu element, aplicând transformări sau căutări după anumite criterii, cu scopul de a obține un anumit rezultat dorit. Este ceea ce se poate înțelege prin ciclu, adică o mișcare repetitivă sau aplicarea repetată a unor proceduri pe elementele individuale ale unei colecții. De altfel, în practica de zi cu zi, veți auzi și de ciclare: *... ciclezi array-ul ăla și obții rezultatele*, ar suna un fragment de conversație din biroul unor programatori. Când vine vorba despre iterare, aceasta este tot o ciclare, dar care poate fi percepută că se face în baza unui protocol, cum este cazul JavaScript.
Dicționarul explicativ ne dă o definiție foarte utilă: *repetare a unui anumit procedeu de calcul, prin aplicarea lui la rezultatul calculului din etapa precedentă*.

## Protocoale de iterare

ECMAScript 2015 (ES6) a introdus un nou mecanism de parcurgere a datelor numit **iterare**. Mai exact, un **protocol de iterare** pentru că iterarea ca și concept este în ADN-ul programării.

### Ce înseamnă **iterare**?

Atunci când rezultatul unui pas devine valoarea de start pentru următorul, atunci vorbim despre iterare.

În acest moment avem două concepte centrale care merită atenția noastră deplină:

- **iterable** , care este structura de date ce expune elementele pentru a fi accesate public. Face acest lucru implementând o metodă care returnează un obiect numit *iterator* și
- **iterator** fiind, de fapt, un pointer (în limba română ar fi tradus ca indicator, dar poți să ți-l închipui ca pe un semn de carte) pentru traversarea elementelor unei structuri de date.

## Cazuri în care se folosește iterarea

- `for..of`,
- `Array.from()`,
- operatorul spread (`...`),
- constructorul pentru `Map (new Map([['varza',1],[2, true]]))`,
- constructorul pentru `Set (new Set([1,'doi',false]))`,
- `Promise.all()` și `Promise.race()`,
- `yield* unIterabil`.

Există două protocoale:

- Iterable protocol - protocolul aplicat unei structuri de date care este iterabilă și
- Iterator protocol - protocolul de iterare, care se va aplica acelei structuri de date.

## Iterable

Permite obiectelor să-și definească sau să-și particularizeze comportamentul la iterare: ce valori vor fi în bucla generată cu un construct `for..of`.

`for..of` poate itera prin următoarele obiecte care respectă **protocolul iterator**:

- `Array`,
- `Map`,
- `Set`,
- `String`,
- `TypedArray`,
- `arguments`

Pentru a fi iterabil, un obiect trebuie să aibe implementată la nivelul obiectului intern de la care moștenește,  metoda `@@iterator`, ceea ce înseamnă că obiectul (sau unul din obiectele din lanțul prototipal), trebuie să aibă o proprietate cu o cheie `Symbol.iterator`. Aceasta trebuie să aibă drept valoare o funcție fără argumente ce returnează un obiect. Acest obiect returnat se conformează protocolului de interare (**iterator protocol**).

Amețită deja? Hai să aruncăm un ochi mai aproape.

Să luăm un exemplu care se bazează pe moștenirea de la obiectul intern `String`. Acest obiect intern este un exemplu de obiect iterabil construit în limbaj.

```javascript
var unSir = "un sir de caractere";
typeof unSir[Symbol.iterator]; // "function"
```

De fapt, această metodă este o fabrică (**factory**) pentru iteratori..

Ori de câte ori un obiect trebuie să fie iterat, este invocată metoda `@@iterator` fără nici un argument, iar iteratorul returnat este folosit **pentru a obține valorile care trebuie iterate** mai departe.

## Iterator

Definește o modalitate standard pentru a produce o secvență de valori finite sau infinite. Se comportă ca un pointer.

**Un obiect este un iterator atunci când implementează metoda next()**

**`next()`** este o funcție care nu primește argumente, dar care returnează un obiect cu două proprietăți:
- `done` care este un Boolean
  - dacă `true`, atunci iteratorul a trecut de finalul secvenței pe care a avut-o de parcurs.
  - dacă `false` înseamnă că a produs următoarea valoare din secvență
- `value` care este valoarea returnată de Iterator. Se poate omite atunci când `done` este `true`.

Te vei întreba la ce folosește această informație. Răspunsul este legat de evoluția limbajului JavaScript în dorința de a fi mereu modern și mai ales de înțelegerea adâncă a mecanismelor angajate de mototul JavaScript atunci când parcurgi date. Vom vedea de îndată la `for`.

Aceste protocoale implementate cu ajutorul simbolurilor, permit parcurgerea, permit prelucrarea datelor care au fost introduse în valori ce moștenesc automat de la tipurile de obiecte interne corespondente. La ce mă refer este faptul că indiferent de natura datelor, că este text, că este un array, că este un „dicționar”, aceste aparent simple structuri, de îndată ce controlul motorului va începe execuția, vor fi „ambalate” automat în obiectul intern corespondent. Acesta este și motivul pentru care poți aplica metode ale obiectelor interne direct pe valoarea identificată de o variabilă. Pe lângă tot bagajul genetic cu care sunt dotate datele

## Resurse

[MDN - Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
[Iterables and iterators](http://exploringjs.com/es6/ch_iteration.html)
