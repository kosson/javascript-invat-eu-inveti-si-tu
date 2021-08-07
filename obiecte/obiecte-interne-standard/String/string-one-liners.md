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
