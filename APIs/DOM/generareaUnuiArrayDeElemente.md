# Constituirea unei colecții de elemente DOM

Acest lucru este posibil pentru că `NodeList` permite protocolul de iterare. Efectul este convertirea unui `NodeList` într-un Array.

```js
function colectDivs(){
  return [...document.querySelectorAll('div')];
};

// sau:
var divuri = [...document.querySelectorAll('div')];

// ca alternativă folosim Array.from
var divuri = Array.from(document.querySelectorAll('div'));
```
