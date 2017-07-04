# `Object.prototype`

Object.prototype este un obiect care joacă rolul de prototip pentru toate obiectele din JavaScript.

Poți să-l investighezi simplu prin crearea unui obiect simplu, printr-o expresie literală:

```javascript
var object = {a: true};
object.__proto__;
```

Ceea ce se observă în consolă este faptul că pe lângă proprietatea `a`, deodată mai pot fi accesate o sumedenie de alte metode. Acestea sunt cele moștenite din obiectul prototip, care este Object.prototype. Pentru a accesa doar proprietățile din obiectul prototip, se va folosi `__proto__`, care este legătura la obiectul prototip.

Pentru a ajunge la obiectul prototip, poți folosi și `Object.getPrototypeOf(object);`

Poți modifica acest comportament prin anularea moștenirii sau prin redirectarea moștenirii către alt obiect pe care-l desemnezi a fi prototipul.

## Anularea mecanismului de moștenire

```javascript
var obi = Object.create(null);
```

## Proprietăți

### `Object.prototype.constructor`

Returnează funcția care a creat obiectul. De fapt, este returnată chiar acea funcție ca valoare. Ca demonstrație, ai putea referenția funcția cu rol de constructor și apoi ai putea construi cu ea un obiect.

```javascript
var Constr = Object.prototype.constructor; // Object()
var obi = new Constr({a: 10});
console.log(obi); // { a: 10 }
```

Toate obiectele au o proprietate constructor.

### `Object.prototype.__proto__`

Mai întâi de toate, trebuie spus faptul că `__proto__` este un accesor de proprietăți, adică poți obține și seta valori din obiectul prototype.
