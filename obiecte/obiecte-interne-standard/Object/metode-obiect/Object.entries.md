# `Object.entries`

Este o metodă introdusă de ECMAScript 2017.

Returnează un array de array-uri având drept valori numele tuturor proprităților unui obiect sub formă de perechi în câte un array dedicat, care sunt enumerabile și care aparțin obiectului respectiv.

```javascript
var obi =  {a: 10, b: true, c: function(){return 'ceva'}};
var colectie = Object.entries(obi);
console.log(colectie); // [["a",10],["b",true],["c",null]]
```

După cum se observă, această metodă este folositoare câtă vreme obiectul nostru este un set de date, de fapt. În cazul metodelor, valorile lor vor fi reduse la `null`.
