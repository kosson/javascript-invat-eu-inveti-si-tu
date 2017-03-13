# RegExp

Creează un obiect pentru o expresie regulată cu scopul de a realiza găsi o secvență de caractere.

```javascript
var ceCaut = /xy/i,
    cheieObiect = new RegExp('xy','g');
console.log(cheieObiect.test('xyz')); // true
console.log(ceCaut.test('xyz'));  // true
```

După cum se observă, sintaxa este: `/pattern/flags`.

`pattern`: este textul expresiei regulate.
`flags`:
- `g` - global match;
- `i` - ignore case;
- `m` - multiline - tratează caracterele ^ și $ ca și când ar lucra pe mai multe linii (adică potrivirea pe începutul și finalul fiecărei linii delimitate de \n și \r, nu numai la începutul și finalul întregului șir de caractere);
- `u` - unicode - tratează secvența ca puncte de cod în unicode;
- `y` - sticky face potrivirea numai după indexul indicat prin proprietatea `lastIndex` a expresiei regulate în șir.

```javascript
var sirCaractere = 'A fost odată',
    regex = /fost/y;

regex.lastIndex = 2;
regex.test(sirCaractere); // true
```

Există două feluri prin care se poate crea un obiect RegExp: notația literală și prin constructor.

Obiectul `RegExp` se poate crea prin introducerea directă a șablonului:

```javascript
/xyz/i;
```

sau folosind constructorul:

```javascript
new RegExp('/xyz/', 'i');
new RegExp(/xyz/, 'i');
```

## Proprietăți ale obiectului RegExp.

- `RegExp.prototype.constructor` - function RegExp()
- `RegExp.prototype.flags` - returnează un string cu fanioanele (flags) pentru obiectul curent
- `RegExp.prototype.global` - dacă fanionul `g` a fost ridicat, valoarea este `true`.
- `RegExp.prototype.ignoreCase` - dacă fanionul `i` a fost ridicat, valoarea este `true`.
- `RegExp.prototype.multiline` - dacă fanionul `m` a fost ridicat, valoarea este `true`.
- `RegExp.prototype.source` returnează varianta text a obiectului.
- `RegExp.prototype.sticky` - dacă fanionul `y` a fost ridicat, valoarea este `true`.
- `RegExp.prototype.unicode` - dacă fanionul `u` a fost ridicat, valoarea este `true`.


Obiectul RegExp nu are propriile metode.
