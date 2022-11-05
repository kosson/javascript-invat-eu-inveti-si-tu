# Expresii eficiente pe o singură linie

## Generează un șir de caractere aleator

```javascript
const randomstr = () => Math.random().toString(36).substring(7);
// sau 
const randomStr = () => Math.random().toString(36).slice(2);
```

## Obține un număr între două limite

```javascript
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
random(1, 100);
```

## Trunchierea unui număr la o anumită zecimală

```javascript
const round = (n, d) => Number(Math.round(n + "e" + d) + "e-" + d);
round(1.005, 2) //1.01
round(1.555, 2) //1.56
```

## Calcularea perioadei scurse între două date calendaristice

```javascript
const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

diffDays(new Date("2021-11-3"), new Date("2022-2-1"))  // 90
```

## Generator random de culori în hex

```javascript
const randomColor = () => `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;

randomColor() // #9dae4f
randomColor() // #6ef10e
```

## RGB to HEX

```javascript
const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

rgbToHex(255, 255, 255)  // '#ffffff'
```

## Resurse

- https://javascript.plainenglish.io/19-killer-javascript-one-liners-thatll-make-you-look-like-a-pro-fce9b524e45e