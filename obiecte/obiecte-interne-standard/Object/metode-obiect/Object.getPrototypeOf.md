# Object.getPrototypeOf()

Returnează un obiect sau `null`. Metoda returnează obiectul care oferă proprietățile moștenite. Returnarea valorii `null` indică faptul că obiectul curent nu moștenește nicio proprietate.

```javascript
const obi = {
  prop1: 10,
  prop2: function () {console.log("Salut");}
};
const obi2 = Object.create(obi);
obi2.stare = 100;
Object.getPrototypeOf(obi2);
// Object { prop1: 10, prop2: obi.prop2() }
```
