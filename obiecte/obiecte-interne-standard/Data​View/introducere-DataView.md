# DataView

`DataView` este o interfață care poate fi utilizată în scopul scrierii și citirii de numere folosindu-se un `ArrayBuffer`.

Un `DataView` nu poate opera decât în tandem cu un `ArrayBuffer`.

```javascript
var buffer = new ArrayBuffer(16);
var reprezentare = new DataView(buffer);
```

## Constructorul `DataView(buffer [, byteOffset[, byteLength]])`

Constructorul va returna un obiect care reprezintă buffer-ul de date generat de `ArrayBuffer`.

### Parametrii

#### `buffer`

Este un `ArrayBuffer`, care există deja și care va juca rolul de mijloc de stocare pentru obiectul `DataView`.

#### `byteOffset`

Este un parametru opțional, care menționează la care byte din `ArrayBuffer` se va face referința. În cazul în care nu este specificată nicio valoare, buffer-ul va porni de la primul byte.

#### `byteLength`

Oferă numărul de bytes din array-ul `ArrayBuffer`. Dacă nu este specificat, dimensiunea ferestrei prin care sunt privite datele, va avea aceeași dimensiune cu cea a buffer-ului constituit prin `ArrayBuffer`.
