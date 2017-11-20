# `Array.prototype.join()`

Nu afectează array-ul.

Concatenează elementele unui array într-un string a cărui carater de separare poate fi setat.

```javascript
var a = ['Ceva', 'Altceva', 'Altundeva'];
var text = a.join();      // atribuie lui text 'Ceva,Altceva,Altundeva'
var text = a.join(', ');  // atribuie lui text 'Ceva, Altceva, Altundeva'
var text = a.join(' + '); // atribuie lui text 'Ceva + Altceva + Altundeva'
var text = a.join('');    // atribuie lui text 'CevaAltcevaAltundeva'
```

## Concatenări de stringuri - asamblare de markup

```javascript
var html = ['<p>a</p>', '<p>b</p>', '<p>c</p>'].join('');

// este mult mai rapid decât concatenarea tradițională
var html = '<p>a</p>' + '<p>b</p>' + '<p>c</p>';
```
