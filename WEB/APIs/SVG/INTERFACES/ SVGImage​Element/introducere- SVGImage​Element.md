#  SVGImage​Element

Interfața `SVGImage​Element` corespunde elementului `<image>`.

**Moștenire**:
EventTarget -> Node -> Element -> SVGElement -> `SVGGraphicsElement` <- SVGImageElement

## Proprietăți

### SVGImageElement.crossOrigin

Este un `DOMString` ce corespunde atributului `crossorigin` pentru elementul `<image>`.

### SVGImageElement.decoding

Este un `DOMString` care oferă un indiciu privind cum ai putea decoda imaginea.

### SVGImageElement.height (read-only)

Este un `SVGAnimatedLength` ce corespunde atributului înălțimii pentru elementul `<image>`.

### SVGImageElement.preserveAspectRatio (read-only)

Este un `SVGAnimatedPreserveAspectRatio` care corespunde atributului `preserveAspectRatio` al elementului `<image>` dat.

### SVGImageElement.width (read-only)

Este un `SVGAnimatedLength` ce corespunde cu atributul `width` al unui element `<image>`.

### SVGImageElement.x (read-only)

Este un `SVGAnimatedLength` care corespunde atributului `x` al elementului `<image>`.

### SVGImageElement.y (read-only)

Este un `SVGAnimatedLength` care corespunde atributului `y` al elementului `<image>`.

## Metode

Interfața moștenește toate metodele de la `SVGGraphicsElement`.

### SVGImageElement.decode()

metoda inițiază decodarea datelor de imagine. Returnează un `promise` care poate fi considerat rezolvat atunci când datele sunt gata de a fi folosite.
