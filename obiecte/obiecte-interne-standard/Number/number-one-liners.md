# Expresii eficiente pe o singură linie

## Rotunjirea zecimalelor la un număr precizat

```javascript
//comportamentul bizar datorită aritmeticii în virgulă mobilă
Number((2.935).toFixed(2)) //2.94
Number((12.349345).toFixed(4)) //12.2493
Number((2.5398).toFixed(3)) //2.540

Number((1.005).toFixed(2)) //returnează 1 în loc de 1.01
Number((1.555).toFixed(2)) //returnează 1.55 în șoc de 1.56
```

Pentru a obține rezultatele dorite.

```javascript
const rotunjire = (n, d) => Number(Math.round(n + "e" + d) + "e-" + d);

rotunjire(1.005, 2) //1.01
rotunjire(1.555, 2) //1.56
```
