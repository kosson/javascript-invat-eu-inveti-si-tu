# Expresii eficiente pe o singură linie

## Șapte zile în array

Poți constitui un array cu ultimele șapte zile care au trecut.

```javascript
const ultimaSaptamana = [...Array(7).keys()].map(zile => new Date(Date.now() - 86400000 * zile));
```

Dacă pui plus în loc de minus, vei obține un array cu următoarele șapte zile. Numărul de 86400000 reprezintă milisecundele unei zile.

## Obține numărul de zile între două date

```javascript
const dayDif = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);
```
