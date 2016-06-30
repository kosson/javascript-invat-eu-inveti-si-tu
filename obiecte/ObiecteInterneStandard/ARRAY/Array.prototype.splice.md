# Array.prototype.splice() - afectează definitiv

Elimină elementele din intervalul de indecși menționat și opțional introduce ceva între.

Dacă indexul de start este negativ, acesta se va scădea din length pentru a determina valoare indexului de start. De exemplu, dacă indexul este -1, atunci operațiunea de splicing începe de la array.length - 1, adică chiar ultimul element în acest caz. Dacă al doilea argument care indică câte elemente să fie scoase este omis, atunci se vor scoate toate elementele pornind cu indexul de start inclusiv.

```js
var tablou = ["unu", "doi", "trei", "patru", "cinci"];
tablou.splice(-2);   // Array [ "patru", "cinci"]
console.log(tablou); // Array ["unu", "doi", "trei"]
```

![](splicingArrayuri.svg)
