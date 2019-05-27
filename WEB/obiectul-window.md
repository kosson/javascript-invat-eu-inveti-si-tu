# Obiectul `window`

Este o reprezentare a obiectului `window`. Toate proprietățile și metodele acestui obiect constituie Browser Object Model.
Obiectul care gestionează documentul în sine este `document`.

## Proprietăți

### `ParentNode.childElementCount` - read-only

Returnează numărul de elemente copil ale lui `ParentNode` curent.

### `ParentNode.children` - read-only

Returnează o colecție dinamică (*live*) `HTMLCollection`, care conține toate obiectele `Element` care sunt copii lui `ParentNode`. Vor fi omise toate nodurile care nu sunt elemente.

### `ParentNode.firstElementChild` - read-only

Returnează primul nod care este copil al lui `ParentNode`, fiind un `Element`. Dacă nu există niciunul, va fi returnat `null`.

### `ParentNode.lastElementChild` - read-only

Returnează ultimul nod copil al lui `ParentNode`, fiind un `Element`. Dacă nu există niciunul, va fi returnat `null`.

## Metode

### `ParentNode.querySelector()`

Motoda returnează primul `Element` al elementului curent, care este considerat rădăcina de lucru. Între paranteze va fi pasat drept parametru, un selector după care se va face căutarea.

### `ParentNode.querySelectorAll()`

Metoda returnează un `NodeList`, care reprezintă o listă de elemente. Rădăcina este considerată a fi elementul curent. Între paranteze va fi pasat drept parametru, un selector după care se va face căutarea.
