# Interfața `Element`

Este un obiect al interfeței `Document`. Această interfață cuprinde metode și proprietăți comune tuturor elementelor din DOM.
Există alte interfețe care moștenesc metodele și proprietățile oferite de `Element`, dar care implementează seturi de funcționalități specifice.
De exemplu, interfața `HTMLElement` este baza tuturor elementelor HTML. Sau interfața `SVGElement`, care aduce suport pentru elementele SVG.

Moștenește din interfața părinte `Node` și prin extensie din interfața părinte a lui `Node` care este `EventTarget`.

Implementează proprietățile din `ParentNode`, `ChildNode`, `NonDocumentTypeChildNode` și `Animatable`.

Nodurile `Elements` sunt pur și simplu cunoscute sub denumirea de `elements`.
Elementele au asociate:

- un namespace
- un prefix de namespace și
- un nume local

Chiar dacă namespace-ul și prefixul pot să nu fie specificate, fiind în acest caz `null`, numele trebuie dat.
Elementele și câte o listă de atribute care sunt ordonate. Dacă nu sunt întroduse atribute, lista acestora va fi goală.

## Referințe
https://www.w3.org/TR/domcore/#concept-element
