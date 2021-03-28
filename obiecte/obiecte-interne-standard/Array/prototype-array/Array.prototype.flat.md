# Array.prototype.flat()

Să presupunem că ai un array de array-uri pe care ai dori să-l „aplatizezi” creând unul singur cu toate elementele celorlalte drept elemente. Soluția ar fi să folosești un `concat.apply()` pe fiecare element.

```javascript
let arr = [1, 2, [3, 4]];
[].concat.apply([], arr);
```

Noua metodă creează un array concatenând toate elementele până la o anumită adâncime menționată prin parametru.

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
