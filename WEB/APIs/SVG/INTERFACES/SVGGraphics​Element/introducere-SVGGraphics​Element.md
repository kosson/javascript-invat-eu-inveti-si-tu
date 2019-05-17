# SVGGraphics​Element

Moștenirea: `EventTarget` -> `Node` -> `Element` -> `SVGElement` -> `SVGGraphics​Element`

Această interfață este introdusă de SVG2 înlocuind `SVGLocatable` și `SVGTransformable` din SVG1.1.

## Proprietăți

### `SVGGraphicsElement.transform`

Este un `SVGAnimated​Transform​List`, care oferă valorile calculate ale proprietății `transform` dar și atributul `transform` corespondent a unui element dat.

## Metode

Moștenește toate metodele de la părintele `SVG​Element`.

### `SVGGraphicsElement.getBBox()`

Returnează un `DOMRect`, care reprezintă limitele (cutia) calculată a elementului curent.

### `SVGGraphicsElement.getCTM()`

Returnează un `DOMMatrix`, reprezentând matricea care transformă sistemul curent de coordonate al elementului, în sistemul de coordonate al viewport-ului SVG.

### `SVGGraphicsElement.getScreenCTM()`

Returnează un `DOMMatrix`, reprezentând matricea care transformă sistemul curent de coordonate al elementului, în sistemul de coordonate al viewport-ului SVG pentru un fragment al SVG-ului.

CTM este acronimul de la *Current Uset Unit Transformation Matrix*. CTM reprezintă pașii de transformare necesari pentru conversia din sistemul de coordonate al ecranului, în sistemul de coordonate al SVG-ului. Aplicarea matricii de transformare unui punct definit de `x` și `y`, va poziționa corect elementul, raportat la sistemul propriu de coordonate (cel al elementelor SVG).
Elementele SVG nu sunt guvernate de modelul CSS box aplicat elementelor HTML.
