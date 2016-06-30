# Array.prototype.concat() - nu afectează array-ul

Realizează o „copie simplă” (shallow copy) formată din elementele array-ului asupra căruia se invocă metoda și elementele care se doresc a fi adăugate.

Elementele array-urilor originale sunt copiate în noul array format respectându-se următoarele reguli:
- în cazul obiectelor sunt copiate referințe către acestea, nu obiectele în sine. Dacă un obiect referențiat este modificat, se va reflecta în array-ul original și cel nou format.
- în cazul șirurilor și numerelor, acestea vor fi copiate în noul array. Modificarea valorilor din array-urile originale nu se vor răsfrânge în cel nou constituit.

![Array.prototype.concat()](ArrayConcat.svg)

Se poate chiar construi o funcție concat folosind slice, dar care să facă concat pe argumentele pasate.

```js

function concat () {
  return Array.prototype.slice.call(arguments).join(' ');
};

var sirNou = concat('ceva', 'text', 'pentru', 'a', 'fi', 'unit');

console.log(sirNou);
```
