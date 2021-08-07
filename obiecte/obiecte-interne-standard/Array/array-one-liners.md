# Expresii eficiente pe o singură linie

## Medie aritmetică

```javascript
const media = arr => arr.reduce((a, b) => a + b) / arr.length;
```

## Elimină dublurile valorilor unui array

```javascript
const eliminaDuplicate = (arr) => [...new Set(arr)];
```
