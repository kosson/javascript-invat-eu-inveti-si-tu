# const

Declararea unei constante nu indică faptul că valoarea asignată va fi permanentă, ci, mai degrabă că legătura stabilită cu valoarea va fi una permanentă.

```js
const a = {};

a.test = 'ceva';

// dar

a = 'bubu'; // TypeError: invalid assignment to const `a'
```

## Utilitate

- Când dorești să protejezi o valoare scalară să nu fie modificată accidental
- Devine o bună practică folosirea lui const atunci când ceri module în Node.js pentru ca variabila care identifică modulul să nu fie accidental reasignată.
