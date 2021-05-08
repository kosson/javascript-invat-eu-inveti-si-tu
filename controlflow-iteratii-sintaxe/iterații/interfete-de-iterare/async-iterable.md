# Obiecte iterabile asincrone

Atunci când valorile apar într-o manieră asincronă, pentru a parcurge obiectul cu astfel de comportament, va trebui ca respectivul obiect să implementeze un `Symbol.asyncIterator` ca metodă, devenind astfel metoda `@@asyncIterator` (vezi și obiectul intern `AsyncFunction`).

**Moment ZEN**: Un obiect este async iterable dacă implementează metoda `@@asyncIterator`.

O declarație `async function nume () {}` va genera un obiect `AsyncFunction`. Invocarea unei funcții `async` se va solda cu returnarea unui `Promise`.

Metoda `next()` va trebui să returneze o promisiune care va avea drept valoare în starea *fulfilled* ceea ce aduce `next()`.
Parcurgerea unui astfel de obiect se face utilizând sintaxa `for await...of`.

Diferențele dintre iteratorii simpli și cei asincroni poate fi întărită explorând următorul tabel.

||Iteratori|Iteratori asincroni|
|:-|:-|:-|
|Metoda obiectului care-l transformă în iterator|`Symbol.iterator`|`Symbol.asyncIterator`|
|Valoare lui `next()` este|orice valoare|un `Promise`|
|enunț pentru iterare|`for...of`|`await for...of`|

O altă diferență notabilă între obiectele iterator sincrone și cele asincrone este faptul că cele sincrone nu pot fi fi parcurse decât prin `for...of`, iar cele asincrone nu pot fi utilizate cu operatorul spread.

Să investigăm un exemplu desfășurat pentru o implementare. Avem o funcție care returnează un obiect ce poate fi iterat folosind `for await...of`.

```javascript
// implementare async iterable
function cronometruInvers (pornire) {
  let următoareaValoare = pornire;
  return {
    [Symbol.asyncIterator] () {
      return {
        // implementare iterator async
        async next () {
          // rezolvă promisiunea
          await new Promise(function (resolve, reject) {
            setTimeout(resolve, 1000);
          });

          if (următoareaValoare < 0) {
            return { done: true };
          }

          return {
            done: false,
            value: următoareaValoare--
          };
        }
      }
    }
  };
};
const timpRămas = cronometruInvers(3);
let valoare;
for await (valoare of timpRămas) {
  console.log(valoare);
}
```

Este observabil faptul că funcția returnează un obiect ce implementează o metodă `@@asyncIterator` prin `[Symbol.asyncIterator]`. Această metodă este declarația care spune că obiectul rezultat este un *async iterator*.

Pentru brevitate, am putea face uz de funcțiile generator.

```javascript
// implementare async iterable
function cronometruInvers (pornire, delay = 1000) {
  return {
    [Symbol.asyncIterator]: async function * () {
      let următoareaValoare;
      for (următoareaValoare = pornire; următoareaValoare >= 0; următoareaValoare--) {
        await new Promise(function (resolve, reject) {
          setTimeout(resolve, delay);
        });
        yield următoareaValoare;
      }
    }
  };
};
const timpRămas = cronometruInvers(3);
let valoare;
for await (valoare of timpRămas) {
  console.log(valoare);
}
```
