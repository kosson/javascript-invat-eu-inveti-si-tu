# `ArrayBuffer
`
Acest obiect este folosit pentru a reprezenta un buffer de date brute în format binar care are o dimensiune prestabilită. Conținutul unui `ArrayBuffer` nu poate fi manipulat direct fiind necesar un obiect `typed array` sau un `data view`, care oferă reprezentarea într-un anume format. Alegerea formatului permite operațiunile de scriere-citire a conținutului bufferului.

```javascript
var buffer = new ArrayBuffer(8); // ArrayBuffer { byteLength: 8 }
var fereastra = new Int32Array(buffer); // Int32Array [ 0, 0 ]
```

## Mantre

- Are o metodă `TypedArray.prototype[@@iterator]()`.
