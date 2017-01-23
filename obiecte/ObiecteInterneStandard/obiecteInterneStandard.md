# Obiecte interne standard

O structură a acestor obiecte este oferită chiar de standardul ECMAScript care le subîmparte pe următoarele linii de funcționalitate:

- obiecte care sunt esențiale pentru rularea programelor includ `Object`, `Function`, `Boolean`, `Symbol` și `Error`,
- obiectele care reprezintă și manipulează valorile numerice includ `Math`, `Number` și `Date`,
- obiectele care prelucrează șiruri de caractere includ `String` și `RegExp`,
- obiecte care sunt de fapt colecții indexate de valori care includ `Array`, colecții cheie-valoare precum `Map` și `Set`,
- obiecte care suprtă date structurate așa cum este obiectul `JSON`, `ArrayBuffer` și `DataView`,
- obiecte care oferă abstracțiuni de control așa cum sunt funcțiile generator și obiectele `Promise`,
- obiecte care oferă reflexie așa cum sunt `Proxy` și `Reflect`.

Multe dintre obiectele interne sunt funcții de fapt. Acestea pot fi invocate cu argumente. O parte dintre acestea sunt constructori și sunt menite să fie invocate cu `new`.

Dacă nu este prevăzut altfel, toate funcțiile interne și toți constructorii au acces la obiectul prototype al lui Function, care este valoarea lui `Function.prototype`.

## Mantre

- Constructorul lui `Function` este chiar o funcție. În schimb, `Function` este constructor pentru Object.
- Toate obiectele au un slot intern `[[Prototype]]` prin care se realizează moștenirea.
- Dacă nu este specificat altfel, obiectele interne sunt extensibile.
- Fiecare obiect intern are memorat Realm-ul pentru care setul de obiecte interne a fost generat.
- Multe dintre obiectele interne sunt funcții care pot fi invocate cu argumente. O parte din acestea sunt concepute pentru a fi constructori, adică pentru a fi folosite cu `new`.
- Nu trebuie confundate cu obiectul global.
- Obiectele interne (`built-in`) includ `global object`.
- Obiectul global este creat înainte de a se crea vreun context de execuție.

Standardul spune că fiecare funcție internă și fiecare constructor oferit de motor are obiectul prototipal al lui Function, care este valoarea inițială a expresiei Function.prototype. Această valoarea va fi valoarea slotului intern [[Prototype]] și este o simplă funcție. Acest lucru se întâmplă pentru că Function nu are o metodă internă `[[Construct]]`.

În ceea ce privește oricare obiect care servește drept prototip, are ca valoare pe cea pe care o are `Object.prototype`, cu excepția obiectului prototip a lui Object.

## Obiectul global

Pentru DOM al HTML, obiectul global este proprietatea `window` a obiectului global, care este obiectul global în sine.

`eval()` este o proprietate a obiectului global.

# Resurse

[ECMAScript® 2017 Language Specification](https://tc39.github.io/ecma262/)
[Global Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
