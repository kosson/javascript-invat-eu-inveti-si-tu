# SVGElement

Este o interfață care moștenește de la `Element`.

Moștenirea: `EventTarget` -> `Node` -> `Element` -> `SVGElement`

## Proprietăți

### `SVGElement.dataset`

Este un obiect de tip `DOMStringMap`, care oferă o listă de perechi cheie/valoare de atribute de date identificabile printr-un nume. Aceste corespund diferitelor atribute de date care sunt atașate elementului. Acestea pot fi introduse într-un element SVG folosind atributele de forma `data-*`, în care ceea ce va fi pus în locul steluței este numele cheii elementelor din obiect. Această proprietate funcționează perecum proprietatea `HTMLElement.dataset` și atributul global al HTML `data`.

### `SVGElement.id`

### `SVGElement.xmlbase`

### `SVGElement.ownerSVGElement`

### `SVGElement.viewportElement`


## Metode

Interfața moștenește metodele lui `Element`, neavând propriile metode.

## Evenimente

Elementele SVG permit ascultarea de evenimente, care au fost specificate prin `addEventListener()` sau folosindu-se sintaxa cu `on...` definită de `GlobalEventHandlers` sau `WindowEventHandlers`.

### `abort`

### `error`

### `load`

### `resize`

### `scroll`

### `unload`

## Referințe

- [SVGElement, MDN](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement)
