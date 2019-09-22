## Interfața `Iterator`

O interfață `Iterator` trebuie să includă o proprietate `next()`, care este o funcție ce returnează un obiect `IteratorResult`, care trebuie să fie conform interfeței `IteratorResult`.

Definește o modalitate standard pentru a produce o secvență de valori finite sau infinite. Se comportă ca un pointer.

**Moment Zen**: Un obiect este un iterator atunci când implementează metoda `next()`.

Metoda `next()` este o funcție care nu primește argumente, dar care returnează un obiect cu două proprietăți:

-   `done` care este un `Boolean` cu cele două alternative: dacă `true`, atunci iteratorul a trecut de finalul secvenței pe care a avut-o de parcurs; dacă `false` înseamnă că a produs următoarea valoare din secvență;
-   `value` care este valoarea returnată de iterator. Se poate omite atunci când `done` este `true`.

Pentru exemplificare, vom constitui un iterator cu scopul de a parcurge un array.

```javascript
const unArray = ['a', 'b', 'c'];
const iteratorNou = unArray[Symbol.iterator]();
iteratorNou.next(); // {value: "a", done: false}
iteratorNou.next(); // {value: "b", done: false}
iteratorNou.next(); // {value: "c", done: false}
iteratorNou.next(); // {value: undefined, done: true}
```

Opțional mai sunt două proprietăți disponibile:

- `return`, care este o funcție ce returnează un obiect `IteratorResult`, indicând obiectului `Iterator` că nu se dorește să se mai facă apeluri la metoda `next`. În acest caz, valoarea `done` a obiectului returnat va fi `true`, iar `value` va fi valoarea pasată drept argument metodei `return`.
- `throw`, care este o funcție ce returnează un obiect `IteratorResult`, indicând obiectului `Iterator` că a fost detectată condiția unei erori. Argumentul acestei funcții va fi un obiect de eroare.

Standardul indică faptul că înainte de a folosi aceste metode opționale, cel mai bine ar fi să verifici dacă acestea sunt puse la dispoziție.

```javascript
const ObiectIterabilNou = {
    // îl facem iterabil prin introducerea metodei specifice
    [Symbol.iterator] () {
        return Iterator;
    }
    next () {
      return unIteratorResult;
    }
    return () {
      return unIteratorResult;
    }
    throw (eroare) {
      throw(eroare)
    }
}
```

Dacă este nevoie, poți converti un obiect simplu în unul iterabil. Tot ce trebuie să faci este să adaugi o metodă `[Symbol.iterator]` pentru a adăuga protocolul de iterare.

```javascript
let colectie = [11, 22, 33]; // este obiectul
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

După cum se observă, am generat un obiect în baza unei clase, care prelucrează o colecție. Exemplul folosește un array, care este un obiect. Array-ul implementează deja protocolul iterator, dar am făcut acest exercițiu pentru a ilustra mecanismul intern al unui iterator. La nevoie poți transforma un obiect creat printr-o expresie literală într-un iterator.

```javascript
function scotNr () {
  let nr = Math.random() * 10;
  return nr;
};

const obiect = {
  // un factory de iteratoare
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

Pentru a înțelege că generatoarele sunt doar un adaos sintactic pentru iteratoare, putem reformula factory-ul de iteratoare într-un generator.

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

## Aplicarea unui callback pe elementele unei colecții

În cazul în care ai nevoie să faci niște trasformări deosebite unei colecții, poți construi o funcție specializată folosind iteratorii.

```javascript
function faIterare (iterabil, cb) {
    // dacă obiectul pasat ca iterabil nu este unul, va apărea o eroare.
    const iterator = iterabil[Symbol.iterator]();
    // variabilă care va avea valoarea de la fiecare pas al iterației
    let iteratorResult;
    // iterație declanșată prin apelarea prima dată a lui `next()`
    iteratorResult = iterator.next();
    // continuă iterarea câtă vreme valoarea lui done este false
    while(!iteratorResult.done) {
        // trimite callback-ului valoarea de la fiecare pas
        cb(iteratorResult.value);
        // continuă iterarea dacă done este false
        iteratorResult = iterator.next();
    };
    // pune iteratorul să facă curat la finalizarea iterării
    iterator.return && iterator.return();
}
faIterare(['a', 'b', 'c'], console.log);
```

## Iteratoare infinite

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
