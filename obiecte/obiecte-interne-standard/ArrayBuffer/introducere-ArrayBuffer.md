# ArrayBuffer

Acest obiect permite lucrul cu date binare. Începând cu ES6, acest lucru este posibil.

În fond, `ArrayBuffer` este un obiect care are un slot intern `[[ArrayBufferData]]` și unul `[[ArrayBufferByteLength]]`.

Acest obiect este folosit pentru a reprezenta un buffer de date brute în format binar care are o dimensiune prestabilită. Conținutul unui `ArrayBuffer` nu poate fi manipulat direct fiind necesar un obiect `typed array` sau un `data view`, care oferă reprezentarea într-un anume format. Alegerea formatului permite operațiunile de scriere-citire a conținutului bufferului.

```javascript
var buffer    = new ArrayBuffer(8);     // ArrayBuffer { byteLength: 8 }
var fereastra = new Int32Array(buffer); // Int32Array [ 0, 0 ]
```

În primul exemplu, am creat un tampon de date de 64 de biți, adică 8 bytes. Concluzia este că `buffer` este limitat la a ține doi bytes. Pentru a manipula aceste date, am creat *o ferestră către date*. Orice modificare sau manipularea a datelor va trebui făcută folosind fereastra.

De exemplu, dacă dorim să introducem în fereastră codurile numerice pentru două caractere, să spunem 10 și 23, le vom adăuga array-ului ferestrei și aceasta va reprezenta pe 32 de biți numele.

```javascript
fereastra[0] = 10;
fereastra[1] = 23;
console.log(fereastra); // { [Iterator]  0: 10, 1: 23 }​​​​​
```

## Mantre

- Are o metodă `TypedArray.prototype[@@iterator]()`.

## Referințe

- [24.1ArrayBuffer Objects, ECMAScript 2017](https://www.ecma-international.org/ecma-262/8.0/#sec-arraybuffer-objects)
