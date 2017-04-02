# Interfața Node - fundamentală

Este considerată a fi o interfață fundamentală.
În DOM, Node-ul este unitatea de bază pentru a accesa datele. Este un reper fix.

Node este o interfață de la care moștenesc o serie de tipuri DOM printre care Document, Element, CharacterData (din care moștenesc la rându lor Text, Comment, and CDATASection), ProcessingInstruction, DocumentFragment, DocumentType, Notation, Entity, EntityReference.

Standardul spune că această interfață este „tipul de dată primar pentru întreg DOM-ul”.

Atenție, nu toate nodurile pot avea copii.

## Mantre

- Dintre toate proprietățile doar două pot fi și scrise, nu numai să fie citite. Restul pot fi doar citite. Acestea sunt: `Node.nodeValue` și `Node.textContent`.

## Proprietățile Node

### `Node.baseURI`

### `Node.childNodes`

### `Node.firstChild`

### `Node.lastChild`

### `Node.nextSibling`

### `Node.nodeName`

### `Node.nodeType`

Returnează un număr care desemnează tipul nodului.

| Nume | Valoare|
|:-|:-|
|ELEMENT_NODE| 1 |
|ATTRIBUTE_NODE| 2 |
|TEXT_NODE| 3 |
|CDATA_SECTION_NODE| 4 |
|ENTITY_REFERENCE_NODE| 5 |
|ENTITY_NODE| 6 |
|PROCESSING_INSTRUCTION_NODE| 7 |
|COMMENT_NODE| 8 |
|DOCUMENT_NODE| 9 |
|DOCUMENT_TYPE_NODE| 10 |
|DOCUMENT_FRAGMENT_NODE| 11 |
|NOTATION_NODE| 12 |

### `Node.nodeValue`

Setează valoarea sau extrage valoarea nodului. Această valoare este un șir de caractere care se află în nod, dacă acestea există. Pentru document în sine, nodeValue returnează `null`. Pentru text, comment și noduri CDATA, `nodeValues` returnează conținutul nodului. Pentru nodurile atribut va fi returnată valoarea acestuia.

### `Node.ownerDocument`

### `Node.parentNode`

Returnează elementul care este părintele nodului curent. Dacă nu are părinte, valoarea va fi `null`.

### `Node.parentElement`

### `Node.previousSibling`

Returnează nodul anterior din arbore sau `null`, dacă nu există.

### `Node.rootNode`

Returnează primul nod al arborelui. Ajungi la acest nod din Node.parentElement în Node.parentElement până când ultimul este, de fapt, rootNode.

### `Node.textContent`

Returnează sau setează conținutul de tip text al unui element și a tuturor descendenților acestora.

## Metode ale Node.

### `Node.appendChild()`

Această metodă primește ca argument numele elementului. Acest nod va fi creat ca lastChild în ramura în care a fost creat. Dacă argumentul referențiază un nod deja existent, acesta va fi desprins din poziția sa și reatașat în noua poziție (lastchild).

### `Node.cloneNode()`

Clonează un nod iar dacă se dorește chiar și conținutul lui. Default-ul clonează și conținutul.

### `Node.compareDocumentPosition()`

### `Node.contains()`

### `Node.getRootNode()`

### `Node.hasChildNodes()`

Indică printr-un Boolean dacă un element are copii sau nu.

### `Node.insertBefore()`

### `Node.isDefaultNamespace()`

### `Node.isEqualNode()`

### `Node.isSameNode()`

### `Node.lookupPrefix()`

### `Node.lookupNamespaceURI()`

### `Node.normalize()`

### `Node.removeChild()`

### `Node.replaceChild()`
