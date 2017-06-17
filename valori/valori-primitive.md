# Valorile primitive în JavaScript

Valorile primitive sunt *tipuri* (**built-in types**) de date ale limbajului.

Valorile primitive în JavaScript formează nucleul lucrului cu datele.
Valorile sunt expresii. De fapt, expresiile sunt o posibilă reprezentare a valorii pentru că sunt reduse la o valoare.

Primitivele sunt valori în sine și sunt egale cu ele însele.

```javascript
10 === 10; // true
'ceva' === 'ceva'; // true
// prin contrast, un array,
[] === []; // false
// sau un obiect generat de o funcție
(function () {}) === (function () {}); // false
```

Aceste valori sunt cele pe care diferitele structuri de prelucrare sau de stocare permanentă ori temporară, le vor organiza și manipula. Sunt baza structurilor de date, dacă vrei, atomii substanței cu care lucrăm în programare.

JavaScript are șase valori primitive:

- `Boolean`,
- `Number`,
- `String`,
- `Null`,
- `Undefined` și
- `Symbol`

Atunci când nu ești sigur de valoarea reprezentată de un identificator, există un operator la îndemână care să te ajute să verifici ce este: `typeof`.

```javascript
var a = 10,
    b = 'ceva',
    c = true,
    d = undefined,
    e = Symbol('descriere'),
    f = null;
typeof a; // number
typeof b; // string
typeof c; // boolean
typeof d; // undefined
typeof e; // symbol
typeof f; // object
```

Atenție! `typeof null`, returnează `object`. Acest lucru se întâmplă pentru că standardul ECMAScript spune că `null` este un tip distinct în sine.

Simbolurile au fost introduse de ES6. Pentru a crea un simbol se va folosi constructorul `Symbol` apelându-l ca pe o funcție, nu cu `new`. De fapt, chiar standardul spune că nu trebuie folosit cu `new`.

```javascript
var simbol = Symbol('o descriere');
typeof simbol; //"symbol"
```

Valorile primitive și obiectele au proprietăți și metode. Primitivele beneficiază de acestea prin „împachetarea” valorii în obiectul corespondent pentru că pentru fiecare primitivă există un obiect intern. Împachetarea (wrapping-ul) se face fără știrea sau intervenția utilizatorului și astfel, pare că și primitivele au metode.

Poți verifica acest lucru prin accesarea uneia dintre cele mai utile proprietăți a unui șir de caractere: `length`.

```javascript
'ceva'.length; // 4
// sau
var x = 'ceva'; x['length']; // 4
```

Veți observa mai departe, când veți studia array-urile câteva similarități cu acestea pentru operațiunile pe care le puteți face pe șirurile de caractere.

## Mantre

- Obiectele wrapper corespondente nu au același comportament cu primara în sine atunci când se fac comparații.
- Setarea și apelarea proprietăților pentru o primară, are ca efect crearea obiectului wrapper.
