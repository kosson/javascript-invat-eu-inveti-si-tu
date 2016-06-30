# Array.prototype.sort() - afectează definitiv

Sortează elementele unui array și returnează acel array.
Dacă nu este pasat un argument, de fapt o funcție care să îndeplinească sortare, aceasta se va face prin compararea codurilor de caractere Unicode.

Pentru șiruri funcția de comparare poate fi astfel:

```js
// atenție, acesta este pseudocod
function compare(primulCaracter, aldoileaCaracter) {
  if (primulCaracter este mai mic decât aldoileaCaracter folosind un criteriu de ordonare) {
    return -1;
  }
  if (primulCaracter este mai mare decât aldoileaCaracter folosind un criteriu de ordonare) {
    return 1;
  }
  // primulCaracter trebuie să fie egal cu aldoileaCaracter
  return 0;
}
["c", "a", "d"].sort(compare);
```

### Compararea și sortarea numerelor

```js
[-23, -2, 102, 3, -54].sort(function(x, y){
  if(x < y){return -1}; // sortează x comparativ cu y, dacă x este mai mic decât y, pune-l pe x pe un index mai mic decât y: se deplasează spre stânga.
  if(x > y){return 1};  // dacă y este mai mic decât x, acordă un index mai mic.
  return 0;             // dacă valorile sunt sortate lasă neschimbată poziția unuia față de celălalt.
});                     // Array [ -54, -23, -2, 3, 102 ]
```

Se poate condensa folosindu-se operatorul ternar:

```js
[-23, -2, 102, 3, -54].sort(function(x, y){
  return x < y ? -1 : ( x > y ? 1 : 0 );
});
```

O altă variantă de comparator pentru numere este pur și simplu scăderea unuia din celălalt:

```js
[-23, -2, 102, 3, -54].sort(function(x,y){
  return x - y;
}); // Array [ -54, -23, -2, 3, 102 ]
```

Și obiectele pot fi sortate dacă este dată o valoare a uneia dintre proprietăți.

```js
var colectie = [
  {nume: 'Gina', valoare: 20},
  {nume: 'Dobrin', valoare: 16},
  {nume: 'Sanda', valoare: -12},
  {nume: 'Nicolae', valoare: 40},
  {nume: 'Pavel', valoare: -6}
];

// sortare după o valoare arbitrară
colectie.sort(function(x,y){
  if(x.valoare > y.valoare){return 1};
  if(x.valoare < y.valoare){return -1};
  return 0;
});

// sortare după o valoare text
colectie.sort(function(x,y){
  var numeX = x.nume.toUpperCase(); // uniformizezi caracterele
  var numeY = y.nume.toUpperCase();
  if(numeX < numeY){return -1};
  if(numeX > numeY){return 1};
  return 0;
});
```
