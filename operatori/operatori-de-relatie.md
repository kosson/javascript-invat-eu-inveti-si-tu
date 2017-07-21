# Operatorii de relație

Acești operatori compară operanții și returnează o valoare Boolean în funcție de rezultatul comparației.

## Operatorul `in`

Prin acest operator testezi dacă o valoare există într-un obiect. În cazul array-urilor vorbim despre căutarea dacă un index cu valoarea specificată există. Reține, căutăm dacă există indexul, nu căutăm valoarea în sine.

```javascript
2 in ['ceva', true, 3, 4]; // true
```

Interesant este că și `length` va returna `true`. De ce? Pentru că este o proprietate directă a obiectului `Array` la care ai acces prin moștenire.

```javascript
'length' in [1, 2, 3, 4]; // true
```

În cazul obiectelor se poate folosirea lui `in` este relevantă pentru a căuta după numele cheii.

```javascript
var obi = {a: 1, b: 2};
'b' in obi; // true
```

## Operatorul `instanceof`

Acest operator testează dacă în lanțul prototipal al unui obiect se află proprietatea `prototype` a unui constructor. Începând cu ECMAScript 6, operatorul `instanceof` este o prescurtare care apelează metoda `hasInstance` a constructorului `Symbol`. Toate funcțiile au o metodă `Symbol.hasInstance` cu ajutorul căreia se poate verifica dacă un anume obiect este sau nu o instanță a acelei funcții.

```javascript
function EX () {};
var obiX = new EX();

Object.getPrototypeOf(obiX); // prototype este Object
console.log(EX.prototype); // prototype este tot Object

Object.getPrototypeOf(obiX) === EX.prototype; // true

obiX instanceof EX;     // true
obiX instanceof Object; // true

EX.prototype instanceof Object; // true
EX.prototype; // răspunde cu Object, dar, atenție, nu este Object.prototype
EX.prototype instanceof Object.prototype; // false
```

Dacă este nevoie poți seta proprietatea `prototype` la un obiect diferit de cel implicit care este `Object` ce conține doar constructorul.

```javascript
EX.prototype = {};
```

Adu-ți mereu aminte că prototipul unui obiect se mai poate seta și cu `Object.setPrototypeOf(obiectul)`.

## Mantre

- Un obiect literal are prototype `undefined`. Cu toate acestea la interogare cu instanceof trimite la Object.
- `instanceof` este o prescurtare care apelează metoda `hasInstance` a constructorului `Symbol`.
