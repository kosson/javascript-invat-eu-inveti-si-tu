# Iterații

Partea cea mai valoroasă a programării este aceea că poate prelua un set de date pe care le poate parcurge element cu element, aplicând transformări sau căutări după anumite criterii, cu scopul de a obține un anumit rezultat dorit. Este ceea ce se poate înțelege prin ciclu, adică o mișcare repetitivă sau aplicarea repetată a unor proceduri pe elementele individuale ale unei colecții. De altfel, în practica de zi cu zi, veți auzi interșanjabil termenii de buclă, iterare și ciclare. Când vine vorba despre iterare, aceasta este tot o ciclare, dar care se face în baza unor protocoale special prevăzute de standardul ECMAScript.

Dicționarul explicativ ne dă o definiție foarte utilă pentru iterare: *repetare a unui anumit procedeu de calcul, prin aplicarea lui la rezultatul calculului din etapa precedentă*.

## Bucle

Buclele sunt cel mai la îndemână instrument de a parcurge un set de date.
Folosirea buclelor presupune utilizarea repetată a unei secvențe de instrucțiuni. Îi mai spunem **ciclare** sau **iterare**. În fapt, ceea ce se întâmplă este o repetarea ritmică a unui set de instrucțiuni. Fiecare rezultat al fiecărei iterații este supus verificările.

## Recursivitatea

Alternativa la procesele repetitive, la ciclurile iterative realizate cu buclele este recursivitatea. Recursivitatea nu implică conceptul de ciclu, ci acela de apel repetat al unei funcții din interiorul său.

## Protocoale de iterare

Am menționat deja despre protocoalele de iterare. ECMAScript 2015 (ES6) a introdus un nou mecanism de parcurgere a datelor numit **iterare**. Mai exact, un **protocol de iterare** pentru că iterarea ca și concept este în ADN-ul programării.

### Ce înseamnă iterare

Atunci când rezultatul unui pas devine valoarea de start pentru următorul, atunci vorbim despre iterare. În acest moment avem două concepte centrale care merită atenția noastră deplină:

-   **iterable** fiind structura de date ce expune elementele pentru a fi accesate public. Face acest lucru implementând o metodă care returnează un obiect numit *iterator*. Această metodă nu este abstractă, ci poate fi apelată în obiectele care pot fi iterate (`[Symbol.iterator]()`)
-   **iterator** fiind, de fapt, un pointer (în limba română ar fi tradus ca *indicator* sau *cursor*, dar poți să ți-l închipui ca pe un semn de carte) pentru traversarea elementelor unei structuri de date.

### Cazuri în care se folosește iterarea

-   `for..of`,
-   `Array.from()`,
-   operatorul spread (`...`),
-   constructorul pentru Map `new Map([['varza',1],[2, true]])`,
-   constructorul pentru Set `new Set([1,'doi',false])`,
-   `Promise.all()` și `Promise.race()`,
-   `yield* unObiectIterabil`.

Există două protocoale:

-   Iterable protocol - protocolul aplicat unei structuri de date care este iterabilă și
-   Iterator protocol - protocolul de iterare, care se va aplica acelei structuri de date.

## Iterable

Acest protocol permite obiectelor să-și definească sau să-și particularizeze comportamentul la momentul iterării, adică ce valori vor fi generate cu un enunț `for..of`.

Bucla `for..of` poate itera prin următoarele obiecte care respectă **protocolul iterator**:

-   `Array`,
-   `Map`,
-   `Set`,
-   `String`,
-   `TypedArray`,
-   `arguments`

Pentru a fi iterabil, un obiect trebuie să aibă implementată la nivelul obiectului intern de la care moștenește metoda `@@iterator`. Acest lucru înseamnă că obiectul (sau unul din obiectele din lanțul prototipal), trebuie să aibă o proprietate cu o cheie `[Symbol.iterator]`. Valoarea sa este o funcție fără argumente ce returnează un obiect. Acest obiect returnat se conformează protocolului de interare (**iterator protocol**), ceea ce îl face pretabil unei prelucrări cu `for..of`, de exemplu.

Amețită deja? Hai să aruncăm un ochi mai aproape.

Să luăm un exemplu care se bazează pe moștenirea de la obiectul intern `String`. Acest obiect intern este un exemplu de obiect iterabil construit în limbaj.

```javascript
let unSir = "un sir de caractere";
typeof unSir[Symbol.iterator]; // "function"
```

De fapt, această metodă este o fabrică (un șablon de programare numit în domeniu: **factory**) pentru iteratori. Ori de câte ori un obiect trebuie să fie iterat, este invocată metoda `@@iterator` fără nici un argument. Este creat și returnat un obiect iterabil. Folosind metoda `next()` obții un obiect care are propritățile `value` și `done`. Cheia `value` are valoarea elementului la care a ajuns *cursorul* în parcurgerea obiectului iterabil, iar `done` prin valoarea boolean confirmă parcurgerea integrală a obiectului iterabil.

```javascript
let iterator = [1, 2, 3][Symbol.iterator](),
    element;
while( !(element = iterator.next()).done ) {
  console.log(element.value);
};
```

Odată cu ECMAScript 2015, beneficiem de enunțul `for..of`, care va face exact ce am realizat mai sus construind obiectul iterator. Array-urile sunt obiecte care implementează protocolul de iterare.

```javascript
for(let x of [1, 2, 3]){
  console.log(x);
};
```

Parcurgerea se face automat, rezultatele fiind oferite la încheierea iterării. Ce te faci în momentul în care dorești să ai acces secvențial la valorile unei colecții? În acest caz, vom apela la funcțiile generator.

## Iterator

Definește o modalitate standard pentru a produce o secvență de valori finite sau infinite. Se comportă ca un pointer.

**Moment Zen**: Un obiect este un iterator atunci când implementează metoda `next()`.

Metoda `next()` este o funcție care nu primește argumente, dar care returnează un obiect cu două proprietăți:

-   `done` care este un `Boolean` cu cele două alternative:
  -dacă `true`, atunci iteratorul a trecut de finalul secvenței pe care a avut-o de parcurs,
  -dacă `false` înseamnă că a produs următoarea valoare din secvență.
-   `value` care este valoarea returnată de Iterator. Se poate omite atunci când `done` este `true`.

Aceste protocoale implementate cu ajutorul simbolurilor, permit parcurgerea și prelucrarea datelor care au fost introduse în valori ce moștenesc automat de la tipurile de obiecte interne corespondente. La ce mă refer este faptul că indiferent de natura datelor, text sau un array, ori un obiect *dicționar*, vor fi „ambalate” automat în obiectul intern corespondent. Acesta este și motivul pentru care poți aplica metode ale obiectelor interne direct pe valoarea identificată de o variabilă.

Dacă este nevoie, poți converti un obiect simplu în unul iterabil. Tot ce trebuie să faci este să adaugi o metodă `[Symbol.iterator]` pentru a adăuga protocolul de iterare.

```javascript
let colectie = [11, 22, 33];
class Transformat {
  constructor (colectie) {
    this.colectie = colectie;
    this.idx = 0;
  }

  [Symbol.iterator] () {
    return this;
  }

  next () {
    if (this.idx <= this.colectie.length) {
      let obi = {value: colectie[this.idx], done: false};
      this.idx++;
      return obi;
    }
    return {value: undefined, done: true}
  }
}

let iterator = new Transformat(colectie);
iterator.next();
```

După cum se observă, am generat un obiect în baza unei clase, care prelucrează o colecție. Exemplul folosește un array care este un obiect. Acesta deja implementează protocolul iterator, dar am făcut acest exercițiu pentru a ilustra mecanismul intern al unui iterator.

La nevoie poți transforma un obiect obișnuit creat printr-o expresie literală într-un iterator.

```javascript
function scotNr () {
  let nr = Math.random() * 10;
  return nr;
};

const obiect = {
  // un factory de iteratorare
  [Symbol.iterator]: () => {
    return {
      next: () => {
        let numar = scotNr() > 3;
        if(!numar) {
          return {
            value: scotNr(),
            done: false
          }
        }
        return { done: true }
      }
    }
  }
}
for (let rezultat of obiect) {
  console.log(rezultat);
};
```

Pentru a înțelege faptul că generatoarele sunt doar un adaos sintactic pentru iteratoare, putem reformula factory-ul de iteratoare într-un generator.

```javascript
function scotNr () {
  let nr = Math.random() * 10;
  return nr;
};
const obiect = {
  // un factory de iteratorare
  [Symbol.iterator]: function* () {
    while(true) {
      let numar = scotNr() > 3;
      if(numar) {
        return;
      }
      yield scotNr();
    }
  }
}
for (let rezultat of obiect) {
  console.log(rezultat);
};
```

## Iteratori particularizați

### Iteratori infiniți

Poți construi obiecte iterator care să genereze la infinit un anumit rezultat pentru că `done` nu va fi niciodată `false`.

```javascript
class UnGenerator {
  [Symbol.iterator](){
    return this;
  }
  next () {
    return {
      value: Math.random(),
      done: false
    };
  }
}

let obi = new UnGenerator(),
    contor = 0;

for (let valoare of obi) {
  console.log(valoare.toFixed(4));
  if (5 == ++contor) {
    break;
  }
};
```

Iteratorul a fost întrerupt brusc și o reutilizare ar conduce la rezultate neașteptate. Pentru a preveni acest lucru, se va implementa o metodă care va seta `done` la `true`.

```javascript
class UnGenerator {
  [Symbol.iterator](){
    return this;
  }
  next () {
    if (this.done) {
      return {value: undefined, done: true}
    }
    return {value: Math.random(), done: this.done}
  }
  return () {
    this.done = true;
    return {done: true}
  }
}
```

## Resurse

-   [MDN - Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
-   [Iterables and iterators](http://exploringjs.com/es6/ch_iteration.html)
