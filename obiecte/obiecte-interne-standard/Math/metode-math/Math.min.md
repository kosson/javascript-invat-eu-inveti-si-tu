# Math.min()

Metoda este folosită pentru a găsi valoarea cea mai mică dintr-o listă de numere pasată drept argument.

```javascript
Math.min(10, 100, 1000, 234); // 10
```

Atunci când este nevoie să afli care este valoarea cea mai mică dintr-un array, poți folosi `apply()` pe array-ul vizat cu menționarea obiectului funcție `Math` drept obiect la care se face legătura `this`.

```javascript
Math.min.apply(Math, [10, 100, 1000, 234]);
```

Drept obiect context poate fi și `null` și vom obține aceleași rezultate.

```javascript
Math.min.apply(null, [10, 100, 1000, 234]);
```

Odată cu apariția operatorului spread, lucrurile au devenit ceva mai simple.

```javascript
var setnr = [10, 100, 1000, 234];
Math.min(...setnr);
```

Operatorul va *alimenta* argumentele metodei cu valorile din array.
