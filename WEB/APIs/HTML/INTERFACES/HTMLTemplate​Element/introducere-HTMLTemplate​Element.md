# HTMLTemplate​Element

Această interfață permite accesul la conținutul elementului HTML `<template>`.

## Linia de moștenire:

`EventTarget` <- `Node` <- `Element` <- `HTMLElement` <- `HTMLTemplate​Element`

## Proprietăți

### `HTMLTemplateElement.content`

Returnează elementele din elementul `<template>`.

```javascript
var templateElement = document.querySelector("#foo");
var documentFragment = templateElement.content.cloneNode(true);
```

## Metode

Toate metodele sunt moștenite de la `HTMLElement`.
