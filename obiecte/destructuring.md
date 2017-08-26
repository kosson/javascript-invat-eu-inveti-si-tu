# Destructurarea obiectelor sau destructuring assignment

ES6 introduce posibilitatea de a transfera valorile cheilor unor variabile care trebuie să respecte o singură cerință: numele identificatorilor să fie aceleași cu cele ale proprietăților. Dacă vrem să privim obiectele ca pe niște depozite de valori identificate prin numele cheilor, atunci cu siguranță că asignarea prin destructurare va fi o binecuvântare.

```javascript
var obi = {a: 4, b: true, c: function y(){return 'salut'}};
var {b, c} = obi;
console.log(a); // undefined
console.log(b); // true
console.log(c()); // salut
```

La fel de bine ar merge și asignarea directă cu singura condiție ca expresia să fie în interiorul unui operator de grupare.

```javascript
({a,b,c} = obi);
```

Dacă nu este introdus între paranteze rotunde, motorul JavaScript va considera acoladele ca un bloc de cod distinct.
Destructurarea funcționează foarte bine și în cazul array-urilor. În acest caz nu mai este necesară respectarea parității numelor ientificatorilor cu cea a cheilor pentru că nu mai avem chei. Potrivirea se va face în ordinea elementelor din array.

```javascript
var arr = [1, true, function y () {return 'salut'}, 10, 20];
var [nr, bool, igrec, ...valori] = arr;
console.log(nr); // 1
console.log(bool); // true
console.log(igrec()); // salut
console.log(valori); //[Array] [10,20]
```

Folosind operatorul spread (...), putem introduce restul valorilor din array într-un array cu identificator prestabilit.
