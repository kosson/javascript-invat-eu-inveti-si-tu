

# Protocoale de iterare

Există două protocoale:

- Iterable protocol - **protocolul pentru iterabil** și
- Iterator protocol - **protocol de iterare**

## Iterable

Permite obiectelor să-și definească sau să-și particularizeze comportamentul la iterare: ce valori vor fi în bucla generată cu un construct `for...of`.

`for...of` poate itera prin următoarele obiecte care respectă ***protocolul iterator***:
- Array
- Map
- Set
- String
- TypedArray
- arguments

Pentru a fi iterabil, un obiect trebuie să implementeze metoda `@@iterator`, ceea ce înseamnă că obiectul (sau unul din obiectele din lanțul prototipal), trebuie să aibe o proprietate cu o cheie `Symbol.iterator`, care să aibe drept valoare o funcție fără argumente ce returnează un obiect. Acest obiect returnat se conformează lui `iterator protocol`.

Exemplu pe `String` care este un exemplu de obiect iterabil construit în limbaj.

```js
var unSir = "un sir de caractere";
typeof unSir[Symbol.iterator]; // "function"
```

De fapt această metodă este ***un factory pentru iteratori***.

Ori de câte ori un obiect trebuie să fie iterat, este invocată metoda `@@iterator` fără nici un argument iar iteratorul returnat este folosit **pentru a obține valorile care trebuie iterate**.

## Iterator

Definește o modalitate standard pentru a produce o secvență de valori finite sau infinite. Se comportă ca un pointer.

**Un obiect este un iterator atunci când implementează metoda next()**

**`next()`** este o funcție care nu primește argumente, dar care returnează un obiect cu două proprietăți:
- `done` care este un Boolean
  - dacă `true`, atunci iteratorul a trecut de finalul secvenței pe care a avut-o de parcurs.
  - dacă `false` înseamnă că a produs următoarea valoare din secvență
- `value` care este valoarea returnată de Iterator. Se poate omite atunci când `done` este `true`.

## Resurse de documentare

[MDN - Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
[Iterables and iterators](http://exploringjs.com/es6/ch_iteration.html)
