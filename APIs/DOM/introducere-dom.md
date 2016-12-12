# Document Object Model

Fiecare obiect nod al DOM-ului are o proprietate `nodeType` care conține un cod sub forma unui număr care identifică tipul nodului. Elementele comune au valoarea 1, o valoare pe care o poartă constanta ca proprietate `document.ELEMENT_NODE`.

Nodurile care sunt de text au valoarea 3 pentru constanta `document.TEXT_NODE`.

`document.documentElement` este rădăcina tuturor elementelor.
`document.body` este rădăcina întregului body.

![Modelul Simplu al nodurilor DOM](ModelSimpluDOM.svg)

## childNodes

Este un obiect array-like.
De exemplu, poți afla numărul de elemente: `document.body.childNodes.length`

## `firstChild` și `lastChild`

Pentru nodurile care nu au copii, valoarea acestora este `null`.

## `previousSibling` și `nextSibling`

Aceste proprietăți trimit la nodurile învecinate.
Pentru `firstChild` a primului nod copil, valoarea este `null`.
