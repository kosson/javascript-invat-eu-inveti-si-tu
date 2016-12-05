# Valorile primare în JavaScript

JavaScript are șase valori primare:

- Boolean,
- Number,
- String,
- Null
- Undefined și
- Symbol

## Mantre

- Obiectele wrapper corespondente nu au același comportament cu primara în sine atunci când se fac comparații.
- Setarea și apelarea proprietăților pentru o primară, are ca efect crearea obiectului wrapper.

Atenție! `typeof null`, returnează `object`. Acest lucru se întâmplă pentru că standardul ECMAScript spune că null este un tip distinct în sine.

Există și constructori care „împachetează” primarele în obiectul corespondent.

De exemplu:

```javascript
var sir = new String('ceva');
typeof sir;     // "object"
typeof 'ceva';  // "string"
```

Constructorii sunt utili pentru metodele tip utilitar pe care le pun la dispoziție.

```javascript
"ceva".toUpperCase(); // "CEVA"
```

Ceea ce s-a întâmplat este că `ceva` a fost „împachetat” în obiectul corespondent primarei. Acest obiect are în prototipul său metoda `toUpperCase()`.
