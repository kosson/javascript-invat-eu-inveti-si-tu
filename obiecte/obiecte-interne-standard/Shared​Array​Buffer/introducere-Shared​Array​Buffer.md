# Shared​Array​Buffer

Acest obiect este folosit pentru a reprezenta un buffer raw de o dimensiune fixă. Este similar lui `ArrayBuffer`.

```javascript
var buffer = new SharedArrayBuffer(8); // dimesiunea în bytes este 8
console.log(buffer.byteLength); // 8
```

Pentru a folosi aceleași buffere din memorie, folosind obiecte `SharedArrayBuffer` între diferiți agenți, se va folosi `postMessage` (`Worker​.post​Message()`) și algoritmul de clonare structurată (*structured clone algorithm*). Algoritmul de clonare structurată este parte a specificațiilor HTML5 pentru a se putea copia obiecte JavaScript complexe. Acest algoritm este ceea ce folosesc workerii pentru a transfera date folosind `postMessage()`.

Algoritmii de clonare structurată acceptă `SharedArrayBuffers` și `TypedArrays` mapați pe `SharedArrayBuffers`.

```javascript
var sab = new SharedArrayBuffer(1024);
worker.postMessage(sab);
```

## Referințe

- [24.2SharedArrayBuffer Objects, ECMAScript 2017](https://www.ecma-international.org/ecma-262/8.0/#sec-sharedarraybuffer-objects)
- [2.9. Safe passing of structured data](http://w3c.github.io/html/infrastructure.html#safe-passing-of-structured-data)
- [SharedArrayBuffer, MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)
