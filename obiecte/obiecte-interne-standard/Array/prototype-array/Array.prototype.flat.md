# Array.prototype.flat()

Această metodă creează un array nou concatenând toate elementele până la o anumită adâncime menționată prin parametru.
Ceea ce se petrece este o adevărată ***aplatizare*** a unui array care printre elemente poate avea și alte array-uri.

```javascript
let arr = [4, 345, [12, 84]];
let apl = arr.flat(); // [ 4, 345, 12, 84 ]
```

Pentru array-uri imbricate pe mai multe niveluri, se vor aplatiza pe nivelul unu și vor fi păstrate cele de pe nivel 2 sau mai multe. Dacă și acelea au la rândul lor alte array-uri, își păstrează structura.

```javascript
let arr = [4, 345, [12, 84, ['unu', 'doi', ['trei']]]];
let apl = arr.flat();
console.log(apl); //[ 4, 345, 12, 84, [ 'unu', 'doi', [ 'trei' ] ] ]
```

Dacă este pasat nivelul de adâncime pentru care să fie făcută aplatizarea, toate array-urile imbricate, vor fi aplatizate.

```javascript
let arr = [4, 345, [12, 84, ['unu', 'doi', ['trei']]]];
let apl = arr.flat(2);
console.log(apl); // [ 4, 345, 12, 84, 'unu', 'doi', [ 'trei' ] ]
```

Motoda elimină sloturi goale la momentul în care se produce aplatizarea.

```javascript
let arr = ['a', , 'c'];
let apl = arr.flat(); // ['a', 'c']
```
