# Proprietăți și metode de lucru cu Node

## Proprietăți Node

### `childNodes`

### `firstChild`

### `lastChild`

### `nextSibling`

### `nodeName`

### `nodeType`

Este o proprietate utilă pentru a determina dacă nodul este de un anumit tip sau nu. Proprietatea va indica o valoare numerică ce corespunde tipului de nod.

```javascript
// <a href="#">un link</a>
console.log(
  document.querySelector('a').nodeName, // A
  document.querySelector('a').nodeType  // 1
);
console.log(document.querySelector('a').nodeType === Node.ELEMENT_NODE); // true
```

### `nodeValue`

Folosind această proprietate poți obține valoarea nodului.

```javascript
// <a href="#">un link</a>
console.log(document.querySelector('a').firstChild.nodeValue); // un link
```

### `parentNode`

Este o proprietate cu ajutorul căreia poți lucra cu părintele unui element în scopul aducerii de modificări în structura acestuia. Scenariul cel mai des întâlnit este cel al adăugării sau eliminării de elemente.

```javascript
var elementReferință = document.querySelect("#cineva");
elementReferință.parentNode.removeChild(elementReferință.parentNode.firstChild);
// va șterge primul element copil din părintele lui elementReferință
```

Cu ajutorul acestei proprietăți poți verifica dacă elementul părinte al celui curent are o anumită clasă sau dacă are date introduse prin atributul `data-*`.

```javascript
if (element.parentNode.classList.contains('suntgalben')) {
  console.log('Sunt un element galben');
}
```

Proprietatea `parentNode` este chainable, adică permite mișcarea pe DOM în sus și în jos.

```javascript
console.log(elementReferință.parentNode.parentNode.nodeName);
```

Poți insera cu precizie un alt element lângă unul țintit.

```javascript
var elementNou = document.createElement('p');
var elementReferință = document.querySelect('#suntreferinta');
elementReferință.parentNode.insertBefore(elementNou, elementReferință.nextSibling);
```

Elementele care încă nu au fost introduse în DOM, nu au proprietatea `parentNode`. În cazul acesta, proprietatea `parentNode` va avea valoarea `null`.

### `previousSibling`

## Metode ale lui Node

### `appendChild()`

### `cloneNode()`

### `compareDocumentPosition()`

### `contains()`

### `hasChildNodes()`

### `insertBefore()`

### `isEqualNode()`

### `removeChild()`

### `replaceChild()`
