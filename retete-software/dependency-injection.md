# Injectarea dependințelor

În tratarea acestui subiect vom porni de la premisa că avem deja cunoștințe despre cum funcționează funcțiile.

O dependință este un identificator al unei funcții creată de tine sau care aparține unui API care este pasat ca argument unei funcții. Funcția care primește argumentul, va avea nevoie de acea funcție pentru a-și duce la bună împlinire evaluarea propriului cod. Spunem că depinde de alta.

```javascript
function facCeva (numeDependință, x = 1) {
  return numeDependință(x);
};

function utilitar (a) {
  console.log(++a);
};

facCeva(utilitar); // 2
```
