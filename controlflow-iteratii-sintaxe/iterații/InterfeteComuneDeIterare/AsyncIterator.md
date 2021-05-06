# Async iterator

Condițiile pentru ca un obiect să fie un iterator asincron:

- are o metodă `next()`. De fiecare dată când o vei apela, returnează o promisiune care se rezolvă prin obținerea unui obiect care are cheile `done` (`Boolean`) și `value`;
- dacă implementează metoda `@@asyncIterator`, care returnează un *async iterator*.

```javascript
// implementare async iterable
function cronometruInvers (pornire) {
  let următoareaValoare = pornire;
  return {
    // implementarea metodei @@asyncIterator
    [Symbol.asyncIterator] () {
      return {
        // implementare iterator async, metoda next()
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
