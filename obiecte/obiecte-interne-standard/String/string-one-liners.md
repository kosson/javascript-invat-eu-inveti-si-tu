# Expresii eficiente pe o singură linie

## Inversarea unui string

Dacă ai nevoie de o inversare rapidă a caracterelor unui string.

```javascript
const inverseazaString = str => str.split("").reverse().join("");
```

## Pune majusculă la începutul șirului de caractere

```javascript
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
```

## Pune majusculă fiecărui cuvânt din șir

```javascript
const uppercaseWords = (str) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
uppercaseWords('cineva de undeva'); // 'Cineva De Undeva'
```

## Convertește șirul la cammelCase

```javascript
const toCamelCase = (str) => str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));

toCamelCase('background-color'); // backgroundColor
toCamelCase('-webkit-scrollbar-thumb'); // WebkitScrollbarThumb
toCamelCase('_salut_lume'); // SalutLume
toCamelCase('salut_lume'); // salutLume
```

## HTML escaping pentru XSS

```javascript
const escape = (str) => str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
escape('<div class="important">Salut popor</div>'); // &lt;div class=&quot;important&quot;&gt;Salut popor&lt;/div&gt;
```