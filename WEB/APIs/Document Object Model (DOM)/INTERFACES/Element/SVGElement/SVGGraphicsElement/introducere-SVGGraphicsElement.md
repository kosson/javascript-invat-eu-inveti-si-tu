# Interfața SVGGraphicsElement

Această interfață a fost introdusă în SVG 2.0 înlocuind interfețele SVGLocatable și SVGTransformable din SVG 1.1.
Reprezintă elementele SVG ale căror scop primar este să randeze grafica dintr-un grup. Această interfață moștenește proprietăți din cea părinte: `SVGElement`. Moștenește și din `DOMMatrix`, de exemplu `inverse()`.

```javascript
element.getScreenCTM().inverse();
// inverse
```

## Proprietăți

### SVGGraphicsElement.transform

Are o valoare `SVGAnimatedTransformList` care reflectă valoarea calculată a proprietății `transform` și a atributului corespondent `transform` (vezi transform al CSS) pentru acel element.

## Metode

### SVGGraphicsElement.getBBox()

Returnează un `DOMRect` care reprezintă limitele calculate ale elementului curent în raport cu cele ale întregului element SVG.
BBox înseamnă [bounding box](https://svgwg.org/svg2-draft/coords.html#BoundingBoxes).

### SVGGraphicsElement.getCTM()

Returnează un `DOMMatrix` care reprezintă matricea care transformă sistemul de coordonate al elementului curent în funcție de sistemul de coordonate al viewport-ului SVG-ului celui mai apropiat.

### SVGGraphicsElement.getScreenCTM()

Returnează un `DOMMatrix` ce reprezintă matricea care transformă sistemul de coordonate al elementului curent în funcție de sistemul de coordonate al viewport-ului SVG-ului, dar pentru fragmentul de document SVG.

## Exemple

### Bounding box

Sursa exemplului: https://stackoverflow.com/questions/53862125/svg-why-does-getboundingclientrect-return-190-when-y-attribute-is-200

```javascript
var textBox = document.querySelector('#textBox1 rect');
var svg = document.querySelector('#rootBox');
var point = svg.createSVGPoint();

var local = textBox.getBBox();
point.x = local.x, point.y = local.y;
console.log("local: ", local.x, local.y);

var nearest = textBox.getCTM();
var point2 = point.matrixTransform(nearest);
console.log("nearest viewport: ", point2.x, point2.y);

var screen = textBox.getScreenCTM();
var point3 = point.matrixTransform(screen);
console.log("screen viewport: ", point3.x, point3.y);
```

și 

```xhtml
<svg id="rootBox" width="500" height="800" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

    <rect x="0%" y="0%" width="100%" height="100%" fill="beige" />

    <svg id="textBox1" x="0%" y="200" width="100%" height="25%">
      <rect class="background" x="0%" y="0%" width="100%" height="100%" fill="gray" fill-opacity="0.5" />
      <text class="textGroup" x="0" y="0"><tspan x="50%" dy="-0.25em" text-anchor="middle">tspan line 0</tspan><tspan x="50%" dy="1.5em" text-anchor="middle">tspan line 1</tspan><tspan x="50%" dy="1.5em" text-anchor="middle">tspan line 2</tspan></text>
    </svg>
</svg>
```