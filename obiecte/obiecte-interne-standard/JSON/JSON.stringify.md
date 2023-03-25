# JSON.stringify

Această metodă transformă o valoare JavaScript într-o reprezentare text i.e. JSON string.

## Parametri

Primul parametru este însăși valoarea JavaScript care trebuie serializată.

Al doilea parametru este o funcție *replacer* care modifică rezultatul obținut prin transformarea la text a obiectului JavaScript. Al doilea parametru mai poate fi un array. În acest caz, toate elementele array-ului care nu sunt șiruri de caractere sau numere, vor fi complet ignorate în procedura de inserare în rezultat. Valorile array-ului vor deveni proprietăți ale valorii ce va fi creată în reprezentarea text.

```javascript
function replacer(key, value) {
  // Filtering out properties
  if (typeof value === "string") {
    return undefined;
  }
  return value;
}

const foo = {
  foundation: "Mozilla",
  model: "box",
  week: 45,
  transport: "car",
  month: 7,
};
JSON.stringify(foo, replacer);
// '{"week":45,"month":7}'
```

Al treilea parametru intitulat *space* este un șir de caractere sau un număr care este folosit pentru a fi inserat drept spațiu alb. Aceste caractere sunt introduce din dorința de a crește lizibilitatea rezultatului. Dacă este un număr, acesta indică numărul de caractere spațiu care vor fi inserate, dar nu mai mult de 10. Dacă este un șir de caractere, nu mai mult de 10, acestea vor fi inserate înainte de orice obiect sau array parte a JSON-ului.

## Resurse

- [SJON.stringify() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)