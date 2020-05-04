# Symbol.asyncIterator

Este un `Symbol` *bine-cunoscut* care specifică `AsyncIterator`-ul unui obiect. De fapt, permite accesul la metoda `@@asyncIterator`. Acest obiect generat va putea fi folosit într-un enunț `for await...of`.

```javascript
const asyncItParticularizat = {
  async* [Symbol.asyncIterator]() {
    yield 'Primo';
    yield 'Secundo';
  }
}
```

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
