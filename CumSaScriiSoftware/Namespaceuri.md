# Crearea de namespace-uri

Pentru a evita coliziuni cu numele date unor constructori sau funcții care aparțin altor biblioteci de cod, se vor constitui „spații” destinate rulării codului propriu.

## Constituirea unor „namespaceuri” pentru propriile obiecte

```js
var zonaMea = zonaMea || {}; // constituirea zonei în care va trăi obiectul creat

zonaMea.primulObi = zonaMea.primulObi || {};
```

Raționamentul este următorul:

Dacă obiectul `zonaMea` nu există, te rog, creează un obiect gol. Dacă acest obiect există deja, atunci `zonaMea` să fie obiectul care deja există.
