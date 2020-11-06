# Obiectul intern Proxy

Acest obiect este utilizat petru a defini un comportament specific, în funcție de anumite nevoi pentru operațiuni comune, precum căutarea proprietăților, atribuirea valorilor, enumerarea proprietăților, invocarea funcțiilor ș.a.m.d.

Semnătura unui proxy ar fi instanțiere cu `new` a constructorului `Proxy` căruia îi sunt pasate ca prim argument obiectul țintă, iar al doilea argument fiind un *obiect* a cărui metode au rol de *handler* - `const proxy = new Proxy(obiect, handler)`. Metodele cu rol de handler au un efect modelator asupra obiectului țintă. Acestea sunt numite în jargon *traps* (*capcane* în lb. română) pentru că pur și simplu se interpun între obiectul țintă și noul obiect `Proxy` facilitând modelarea primului:

- `handler.apply()` - (capcană pentru apelul unei funcții);
- `handler.construct()` - (capcană pentru operatorul `new`);
- `handler.get()` - (capcană pentru obținerea unei proprietăți);
- `handler.has()` - (capcană pentru operatorul `in`);
- `handler.ownKeys()` - (capcană pentru `Object.getOwnPropertyNames` și `Object.getOwnPropertySymbols`);
- `handler.preventExtensions()` - (capcană pentru `Object.preventExtensions`);
- `handler.set()` - (capcană pentru setarea pproprietăților);
- `handler.setPrototypeOf()` - (capcană pentru `Object.setPrototypeOf`);
- `handler.defineProperty()` - (capcană pentru Object.defineProperty);
- `handler.deleteProperty()` - (capcană pentru operatorul `delete`);
- `handler.getOwnPropertyDescriptor()` - (capcană pentru `Object.getOwnPropertyDescriptor`);
- `handler.getPrototypeOf()` - (capcană pentru `Object.getPrototypeOf`);
- `handler.isExtensible()` - (capcană pentru `Object.isExtensible`);

Proxy oferă o modalitate de a „înveli” un obiect pentru a-i intercepta operațiunile de bază. Cam ceea ce se petrece este că obiectul „vechi” este „împachetat” într-unul nou care poate fi augmentat cu noi funcționalități sau le poate modifica pe cele ale obiectului împachetat.

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

## Resurse

- [Meta programming](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Meta_programming)
- [What is Metaprogramming in JavaScript? In English, please.](https://www.freecodecamp.org/news/what-is-metaprogramming-in-javascript-in-english-please/)
