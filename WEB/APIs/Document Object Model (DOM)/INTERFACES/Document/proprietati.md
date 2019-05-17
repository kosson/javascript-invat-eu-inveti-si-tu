# Proprietăți ale interfeței `Document`

## Document.characterSet

Proprietatea returnează schema de codare a caracterelor pentru documentul încărcat.

```javascript
console.log(document.characterSet);
```

## Document.doctype

Proprietatea returnează DTD-ul (Document Type Declaration) asociat cu documentul curent.

```javascript
var dtdul = document.doctype;
console.log(dtdul);
```

## Document.documentElement

Este o proprietate care în cazul documentelor HTML, va returna primul element copil, care este `<html>`. Fii foarte atent pentru că în cazul documentelor XML, pot exista mai mulți copii rădăcină.

Folosește această metodă pentru a ținti nodul `html` și nu utiliza `document.firstChild`.

```javascript
var radacina = document.documentElement;
var copiiLuiHtml = radacina.childNodes;
// În acest moment ai toate nodurile documentului
```
