# `Object.getOwnPropertyNames(obiectul)`

Metoda returnează un array al tuturor proprietăților indiferent că acestea sunt enumerabile sau nu.

```javascript
let obi = {
  prima: 10,
  aDoua: function(){console.log("Salut!");}
};
Object.getOwnPropertyNames(obi);
// Array [ "prima", "aDoua" ]
```

Ordinea numelor proprietăților este acceași ca aceea pe care o oferă o buclă `for...in` sau `Object.keys()`.

```javascript
let colectie = ['unu', 'doi', 'trei'];
Object.getOwnPropertyNames(colectie); // Array [ "0", "1", "2", "length" ]
```
