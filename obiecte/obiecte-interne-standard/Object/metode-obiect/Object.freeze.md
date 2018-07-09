# Object.freeze

Această funcție controlează o proprietate a obiectului care se referă la posibilitatea ca un obiect să-i fie suprascrise proprietățile. Astfel, folosind această funcție, se poate preveni modificarea stării unui obiect.

```javascript
var test = {
  prop1: 10,
  prop2: function() {
    return prop1;
  }
};
Object.freeze(test);
Object.isFrozen(test); // true
delete test.prop1; // false
Object.defineProperty(test, 'prop3', {value: 6000}); // TypeError: can't define property "prop3": Object is not extensible
```

`Object.freeze` nu protejează obiectele care sunt proprietăți în obiectul înghețat. Înghețarea totală a unui obiect se poate face prin intermediul unei funcții dedicate:

```javascript
function deepFreeze(obj){
  // Adu numele proprietăților care sunt definite numai de obiect
  var propNames = Object.getOwnPropertyNames(obj);
  propNames.forEach( function(name) {
    var prop = obj[name];
    // îngheață recursiv pentru toate obiectele conținute
    if (typeof prop == 'object' && prop !== null){
      deepFreeze(prop);
    }
  });
  return Object.freeze(obj);
};
```
