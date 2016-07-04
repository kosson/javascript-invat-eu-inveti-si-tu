# Array.prototype.join() - nu afectează array-ul

Concatenează elementele unui array într-un string a cărui carater de separare poate fi setat.

```js
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();      // assigns 'Wind,Rain,Fire' to myVar1
var myVar2 = a.join(', ');  // assigns 'Wind, Rain, Fire' to myVar2
var myVar3 = a.join(' + '); // assigns 'Wind + Rain + Fire' to myVar3
var myVar4 = a.join('');    // assigns 'WindRainFire' to myVar4
```

## Concatenări de stringuri - asamblare de markup

```js
var html = ['<p>a</p>', '<p>b</p>', '<p>c</p>'].join('');

// este mult mai rapid decât concatenarea tradițională
var html = '<p>a</p>' + '<p>b</p>' + '<p>c</p>';
```
