# SVGPathElement

Această interfață corespunde elementului `path`.

## Atribute

### `pathLength`

Această proprietate returnează un obiect de tip `SVGAnimatedNumber`.

```javascript
var frame = svg.querySelector('#marca'); // este un path
console.log(frame.pathLength);
/*
SVGAnimatedNumber​
    animVal: 0​
    baseVal: 0​
    <prototype>: SVGAnimatedNumberPrototype​​
        animVal: undefined​​
        baseVal: undefined​​
        constructor: function ()​​
        <get animVal()>: function animVal()​​
        <get baseVal()>: function baseVal()​​
        <set baseVal()>: function baseVal()​​
        <prototype>: Object { … }
*/
```

## Operațiuni

### `getTotalLength()`

Această metodă returnează valoarea calculată a întregului `path`.

### `getPointAtLength(distanțaInNrFloat)`

Returnează coordonatele x, y a unui punct pe un path aflat la distanța specificată de numărul pasat drept parametru.

### `getPathSegAtLength(distanțaInNrFloat)`

Returnează indexul dintr-un `pathSegList` pentru distanța menționată la parametru. Este returnat segmentul în care apare distanța menționată.

### `createSVGPathSegClosePath()`

Returnează un obiect `SVGPathSegClosePath` fără paranteze.

### `createSVGPathSegMovetoAbs(x, y)`

Returnează un obiect `SVGPathSegMovetoAbs` fără paranteze.

### `createSVGPathSegLinetoAbs(x, y)`

Returnează un obiect `SVGPathSegLinetoAbs` fără paranteze.

### `createSVGPathSegLinetoRel(x, y)`

Returnează un obiect `SVGPathSegLinetoRel` fără paranteze.

### `createSVGPathSegCurvetoCubicAbs(in float x, in float y, in float x1, in float y1, in float x2, in float y2)`

Returnează un obiect `SVGPathSegCurvetoCubicAbs`.

### `createSVGPathSegCurvetoCubicRel(in float x, in float y, in float x1, in float y1, in float x2, in float y2)`

Returnează un obiect `SVGPathSegCurvetoCubicRel`.

### `createSVGPathSegCurvetoQuadraticAbs(in float x, in float y, in float x1, in float y1)`

Returnează un obiect `SVGPathSegCurvetoQuadraticAbs`.

### `createSVGPathSegCurvetoQuadraticRel(in float x, in float y, in float x1, in float y1)`

Returnează un obiect `SVGPathSegCurvetoQuadraticRel`.

### `createSVGPathSegArcAbs(in float x, in float y, in float r1, in float r2, in float angle, in boolean largeArcFlag, in boolean sweepFlag)`

### `createSVGPathSegArcRel(in float x, in float y, in float r1, in float r2, in float angle, in boolean largeArcFlag, in boolean sweepFlag)`

### `createSVGPathSegLinetoHorizontalAbs(in float x)`

### `createSVGPathSegLinetoHorizontalRel(in float x)`

### `createSVGPathSegLinetoVerticalAbs(in float y)`

### `createSVGPathSegLinetoVerticalRel(in float y)`

### `createSVGPathSegCurvetoCubicSmoothAbs(in float x, in float y, in float x2, in float y2)`

### `createSVGPathSegCurvetoCubicSmoothRel(in float x, in float y, in float x2, in float y2)`

### `createSVGPathSegCurvetoQuadraticSmoothAbs(in float x, in float y)`

### `createSVGPathSegCurvetoQuadraticSmoothRel(in float x, in float y)`

## Referințe

- [8 Paths, SVG 1.1 (Second Edition) – 16 August 2011](https://www.w3.org/TR/SVG11/paths.html)