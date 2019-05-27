# `Parent​Node`

Este un mixin care extinde interfața `Document`.
Conține metodele și proprietățile care sunt comune tuturor obiectelor de tip `Node`, care pot avea noduri copil.

Această interfață este implementată de `Element`, `Document` și `DocumentFragment`.

## Proprietăți

### `ParentNode.childElementCount` - read-only

Returnează numărul de elemente copil a lui `ParentNode` care sunt elemente.

### `ParentNode.children` - read-only

Returnează o colecție `HTMLCollection` vie (*live*), care conține toate obiectele `Element`, copii ai lui `ParentNode` curent. Vor fi omise toate nodurile care nu sunt elemente.

### `ParentNode.firstElementChild` - read-only

Returnează primul nod care este copil al lui `ParentNode`, fiind un `Element`. Va returna `null`, dacă nu există niciunul.

### `ParentNode.lastElementChild` - read-only

Returnează ultimul nod al lui `ParentNode`, fiind un `Element`.  Va returna `null`, dacă nu există niciunul.
