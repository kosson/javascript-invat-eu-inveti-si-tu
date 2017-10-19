# `Object.prototype.valueOf`

Metoda convertește o valoare la obiectul wrapper corespondent.

Cel mai des caz de utilizare este în combinație cu metoda `call`, folosită pentru a seta `this` la cel al valorii care trebuie transformată urmată de aplicarea metodei. Standardul ne spune că în spatele acestei metode se află algoritmul `ToObject(argument)`.

Dacă încerci să evaluezi valorile `undefined` sau `null`, vei primi drept răspuns o excepție TypeError. Pentru restul valorilor, sunt returnate obiectele de împachetare a valorilor.

```javascript
var obi1 = Object.prototype.valueOf.call("az");
obi[0]; // a
obi[1]; // z
var obi2 = Object.prototype.valueOf.call(new String("az"));
```

Chiar dacă poți folosi această metodă pentru o conversie, nu uita că atunci când folosești `Object` ca pe o funcție, nu ca pe un constructor, obții același rezultat: obiectul de împachetare corespondent.
