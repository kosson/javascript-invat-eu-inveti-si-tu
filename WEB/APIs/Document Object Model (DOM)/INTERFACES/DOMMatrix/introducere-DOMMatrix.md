# DOMMatrix

Este o matrice matematică 4x4 care poate fi folosită pentru operațiuni de transformare în spații 2D și 3D. Această matrice oferă translarea și moștenește de la interfața read only `DOMMatrixReadOnly`.

## Constructorul DOMMatrix()

`DOMMatrix()` generează un obiect `DOMMatrix`.

## Proprietăți

Această interfață moștenește proprietăți de la `DOMMatrixReadOnly`.

### is2D

### isIdentity

### Proprietățile spațiului 3D

`m11`, `m12`, `m13`, `m14`, 
`m21`, `m22`, `m23`, `m24`, 
`m31`, `m32`, `m33`, `m34`, 
`m41`, `m42`, `m43`, `m44`.

Acestea sunt proprietăți read-only. Sunt numere în format `double` și reprezintă fiecare componentă a matricii de 4x4. Aceleași proprietăți, dar implementate de interfața `DOMMatrix`, nu sunt read-only.

### Proprietățile spațiului 2D

`a`, `b`, `c`, `d`, `e`, `f`

Sunt tot numere în format `double`, care descriu poziția într-un plan 2D. Echivalențele cu spațiul 3D sunt următoarele:

- a : m11;
- b : m12;
- c : m21;
- d : m22;
- e : m41;
- f : m42;

Adunci când avem valoare 0 sau -0 pentru `m13`, `m14`, `m23`, `m24`, `m31`, `m32`, `m34`, `m43`, vorbim despre un spațiu 2D.
Matricea ar fi:

`m11`   ,    `m12`, `m13(0)`  , `m14(0)`  , 
`m21`   ,    `m22`, `m23(0)`  , `m24(0)`  , 
`m31(0)`, `m32(0)`, `m33(>=1)`, `m34(0)`  , 
`m41`   ,    `m42`, `m43(0)`  , `m44(>=1)`.

```javascript
var matrice2D = new DOMMatrix([1,0,0,1,0,0]);
```

## Metode

### DOMMatrixReadOnly.multiplySelf()

### DOMMatrixReadOnly.preMultiplySelf()

### DOMMatrix.translateSelf()

### DOMMatrix.scaleSelf()

### DOMMatrix.scale3dSelf()

### DOMMatrix.scaleNonUniformSelf()

### DOMMatrix.rotateSelf()

### DOMMatrix.rotateFromVectorSelf()

### DOMMatrix.rotateAxisAngleSelf()

### DOMMatrix.skewXSelf()

### DOMMatrix.skewYSelf()

### DOMMatrix.invertSelf()

### DOMMatrix.setMatrixValue()

## Referințe

- [Geometry Interfaces Module Level 1](https://drafts.fxtf.org/geometry/#dom-dommatrix)