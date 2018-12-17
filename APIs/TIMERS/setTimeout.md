# setTimeout()

Este o metodă a obiectului `window`, care execută o funcție după ce timpul menționat în al doilea parametru introdus a expirat.

În loc de o funcție care va fi invocată, poate primi și cod JavaScript, care va fi compilat și executat la scurgerea timpului. Această practică nu este recomandată, fiind încadrată la riscuri.

Metoda returnează un identificator, care poate fi folosit pentru a întrerupe scurgerea timpului menționat.

```javascript
let id = setTimeout(function () {
    return 'ceva';
}, 3000);
console.log(id); // 1
```
