# DOMMatrixReadOnly

Este o matrice 4x4 care poate fi folosită pentru operațiuni 2D și 3D. Această matrice este folosită pentru a descrie orice translație și rotație în 3D.

## Proprietăți

### Proprietățile spațiului 3D

`m11`, `m21`, `m31`, `m41`, 
`m12`, `m22`, `m32`, `m42`, 
`m13`, `m23`, `m33`, `m43`, 
`m14`, `m24`, `m34`, `m44`.

![Matrice 4x4](4x4matrix.png)

Acestea sunt proprietăți read-only. Sunt numere în format `double` și reprezintă fiecare componentă a matricii de 4x4. Aceleași proprietăți, dar implementate de interfața `DOMMatrix`, nu sunt read-only.

### Proprietățile spațiului 2D

`a`, `b`, `c`, `d`, `e`, `f`

![matrice](matrix.png)

Sunt tot numere în format `double`, care descriu poziția într-un plan 2D. Echivalențele cu spațiul 3D sunt următoarele:

- a : m11;
- b : m12;
- c : m21;
- d : m22;
- e : m41;
- f : m42;

`a`,   `c`,   `m31`, `e`, 
`b`,   `d`,   `m32`, `f`, 
`m13`, `m23`, `m33`, `m43`, 
`m14`, `m24`, `m34`, `m44`.

### DOMMatrixReadOnly.is2D

Este o valoare `Boolean`, care indică dacă matricea este una caracteristică spațiului 2D.

### DOMMatrixReadOnly.isIdentity 

Este o valoare `Boolean`, care indică o anumită caracteristică a matricii. O matrice care are 1 în vreo componentă, iar restul este 0, este una diagonală.

## Metode

### DOMMatrixReadOnly.flipX()

### DOMMatrixReadOnly.flipY()

### DOMMatrixReadOnly.inverse()

### DOMMatrixReadOnly.multiply()

### DOMMatrixReadOnly.rotateAxisAngle()

### DOMMatrixReadOnly.rotate()

### DOMMatrixReadOnly.rotateFromVector()

### DOMMatrixReadOnly.scale()

### DOMMatrixReadOnly.scale3d()

### DOMMatrixReadOnly.scaleNonUniform()

### DOMMatrixReadOnly.skewX()

### DOMMatrixReadOnly.skewY()

### DOMMatrixReadOnly.toFloat32Array()

### DOMMatrixReadOnly.toFloat64Array()

### DOMMatrixReadOnly.toJSON()

### DOMMatrixReadOnly.toString()

### DOMMatrixReadOnly.transformPoint()

### DOMMatrixReadOnly.translate()

## Referințe

- [interface DOMMatrixReadOnly](https://drafts.fxtf.org/geometry/#dommatrixreadonly)