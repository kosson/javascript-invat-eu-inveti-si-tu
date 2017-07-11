# Obiectul intern Proxy

Acest obiect este utilizat petru a defini un comportament specific, în funcție de anumite nevoi pentru operațiuni comune precum căutarea proprietăților, atribuirea valorilor, enumerarea proprietăților, invocarea funcțiilor ș.a.m.d.

Proxy oferă o modalitate de a „înveli” un obiect pentru a-i intercepta operațiunile de bază.

```javascript
const obi = {x: 1, y: 2},
      invelis = {
        get (obiect, proprietate) {
          const valoarea = obiect[proprietate];
          console.log(`Am extras ${proprietate} cu valoarea ${valoarea}`);
          return valoarea;
        }
      },
      interceptor = new Proxy(obi, invelis);
console.log(interceptor.x); // 1
// Am extras x cu valoarea 1
```
