# BigInt

BigInt este un obiect intern care poate reprezenta numere mai mari de 2<sup>53</sup>-1, acesta fiind cel mai mare număr obținut cu `Number` (`Number.MAX_SAFE_INTEGER`).

Nu poate fi folosit cu metode ale obiectului intern `Math` și nici în operațiuni cu numere `Number`. Pentru a putea opera în astfel de scenariii, trebuie convertite (coerciție).

Pentru a identifica un număr `BigInt`, acesta are atașat la final un `n`: `9007199254740991n` (anterior cel mai are `Number`).

```javascript
typeof(10n); // bigint
```

Numerele `BigInt` folosesc operatorii matematici cunoscuți. Pot fi folosiți și operatorii `Bitwise` mai puțin `>>>`. Nu există suport pentru unarul `+`.

Rezultatele vor fi rotunjite spre zero ceea ce înseamnă că nu vor fi returnate fracțiuni.

```javascript
5n / 2n; // 2 nu 2,5
```

Comparația strictă cu un `Number` va returna `false`, nu și cea fără restricție.

```javascript
3n === 3; // false
3n == 3; //true
```
