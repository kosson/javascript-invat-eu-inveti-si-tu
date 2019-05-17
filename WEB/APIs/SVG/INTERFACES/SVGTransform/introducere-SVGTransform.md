# SVGTransform

Este o componentă de transformare folosită în obiectul `SVGTransformList`.
Acest lucru înseamnă că `SVGTransform` corespunde câte unei componente ale atributului `transform` (de exemplu, `scale()` sau `matrix()`).

## Metode

### setMatrix(matrice)

Drept paramtru primește un `SVGMatrix`.

### setTranslate(tx, ty)

Valorile lui `tx` și `ty` trebuie să fie tip `float`.

### setScale(sx, sy)

Valorile lui `sx` și `sy` trebuie să fie tip `float`.

### setRotate(angle, cx, cy)

Valorile lui `angle`, `sx` și `sy` trebuie să fie tip `float`.

### setSkewX(angle)

Valoarea lui `angle` trebuie să fie tip `float`.

### setSkewY(angle)

Valoarea lui `angle` trebuie să fie tip `float`.

## Referințe

- [Transformation matrix, Wikipedia](https://en.wikipedia.org/wiki/Transformation_matrix)
- [Affine transformation](https://en.wikipedia.org/wiki/Affine_transformation)
- [7 Coordinate Systems, Transformations and Units, SVGTiny12](https://www.w3.org/TR/SVGTiny12/coords.html)
- [Flattening SVG matrix transforms in Inkscape, stackoverflow](https://stackoverflow.com/questions/14684846/flattening-svg-matrix-transforms-in-inkscape)
- [Chapter 8: Coordinate Systems, Transformations and Units](https://www.w3.org/TR/SVG/coords.html#TransformMatrixDefined)
- [Understanding SVG Coordinate Systems and Transformations (Part 2) — The transform Attribute](https://www.sarasoueidan.com/blog/svg-transformations/)