# Operatorul `void`

Acest operator are o sarcină foarte simplă. Ia orice orice valoare pe care o precedă și o evaluează la `undefined`.

```javascript
void 1; // undefined
```

Un exemplu de utilitate ar fi protejarea la poluarea unui scope cu variabile care „scapă” dintr-o funcție.

```javascript
var ceva = 10;
void function () { ceva = 1000;} ();
console.log(ceva); // 1000
```

Tratezi funcția ca o expresie pe care o și execuți.
