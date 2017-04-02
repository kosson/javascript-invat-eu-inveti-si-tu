# Interfața `Element`

Este un obiect al interfeței `Document`. Această interfață cuprinde metode și proprietăți comune tuturor tipurilor de elemente.
Există alte interfețe care moștenesc metodele și proprietățile oferite de `Element`, dar care implementează seturi de funcționalități specifice.
De exemplu, interfața `HTMLElement` este baza tuturor elementelor HTML. Sau interfața `SVGElement`, care aduce suport pentru elementele SVG.

Moștenește din interfața părinte `Node` și prin extensie din interfața părinte a lui `Node` care este `EventTarget`.

Implementează proprietățile din `ParentNode`, `ChildNode`, `NonDocumentTypeChildNode` și `Animatable`.
