# Symbol.asyncIterator

Este un `Symbol` *bine-cunoscut* care permite accesul la metoda `@@asyncIterator` a unui obiect. Acest obiect generat va putea fi folosit într-un enunț `for...await...of`. Pentru ca un obiect să fie unul async iterabil, trebuie să aibă o cheie `Symbol.asyncIterator`. Acesta nu este *enumerable*, *writable* și nici *configurable*. În acest moment nu există obiecte *built-in* care să aibă această cheie setată din start.

```javascript
const asyncItParticularizat = {
  async* [Symbol.asyncIterator]() {
    yield 'Primo';
    yield 'Secundo';
  }
}
(async () => {
  let text;
  for await (text of asyncItParticularizat) {
    console.log(text);
  }
})();
```

Iterabilii asincroni sunt intrumente foarte bune pentru prelucrarea datelor așa cum sunt listele sau stream-urile.

Putem introduce acest `Symbol` în construcții care să opereze cu promisiuni.

```javascript
const iteratorParticularizat = () => ({
  [Symbol.iterator]: () => ({
    kontor: 0,
    next() {
      let avans = this.kontor++;

      if (this.kontor > 10) {
        return Promise.resolve({
          done: true,
          value: this.kontor
        });
      }
      return Promise.resolve({
        done: false,
        value: avans
      });
    }
  })
});
```

## Aplicație de citire a fișierelor cu NodeJS

```javascript
const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const fișiere = ['./primul.txt'. './alDoilea.txt'];

// construiește un iterator specific
const fileIterator = files => ({
  [Symbol.asyncIterator]: () => ({
    kontor: 0,
    next () {
      if (this.kontor >= files.length) {
        return Promise.resolve({done: true});
      }
      let file = files[this.kontor++];
      return readFile(file, "utf8").then(data => ({
        done: false,
        value: data
      }));
    }
  })
});

// Array cu fișierele care trebuie exploatate
const fișiereArr = ['./primul.txt', './alDoilea.txt'];

// exploatează iteratorul
(async () => {
  let f;
  for await (f of fileIterator(fișiereArr)) {
    // fă ceva cu, conținutul fiecărui fișier
    console.log(f);
  }
})();
```

## Resurse

- [Symbol.asyncIterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator)
