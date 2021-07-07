# Optional chaining `?.`

Acest operator permite citirea unei proprietăți aflate în adâncimea unui obiect fără a mai testa dacă referințele sunt valide pentru respectiva cale. Acest operator este similar celui de înlănțuire (punct - `.`), cu diferența că în cazul în care proprietatea nu există (`null` sau `undefined`), va fi returnat `undefined`.

```javascript
const cevaInteresant = {
  mesaj: "salutare",
  detalii: {
    loc: "Costinești",
    scor: "5"
  }
}
let este = cevaInteresant?.detalii?.personal;
console.log(este); // undefined
// Poți combina cu nullish coalescing
let alternativEste = cevaInteresant?.detalii ?? "satisfăcător";
// Sau poți folosi cu un Map
const unMap = new Map();
unMap.set("cheie0", {ceva: 10});
let existaCeva = unMap.get("cheie0")?.ceva;
```

Dacă am privi înlănțuirea de referințe către o valoare dorită ca pe o cale, operatorul rezolvă necesitatea de a valida existența proprietăților intermediare. Putem privi acest operator ca pe o optimizare în testarea cât mai timpurie a existenței unei proprietăți.

Un alt caz în care operatorul *optional chaining* poate fi folosit este cel al primirii unui obiect JSON, pe care îl deserializezi și dorești să obții valoarea dintr-o cale în adâncime. Ai putea folosi ca până acum operatorul `&&`.

```javascript
let cine =
  obiect &&
  obiect.persoana &&
  obiect.persoana.alias
```

Poți folosi chiar un lanț de `if`-uri pentru a testa fiecare proprietate, dar odată cu acest operator, soluția este mult mai simplă. 

## Chaining opțional pentru metode

Chaining-ul opțional poate fi folosit atunci când se încearcă apelarea unei metode care nu există sau despre care nu se cunoaște date că ar fi disponibilă.

```javascript
let cauMetoda = oInterfață.numeMetodă?.();
```

## Chaining în cazul callback-urilor

În cazul în care folosești callback-uri în logica programelor, poți folosi optional chaining pentru a testa dacă funcția cu rol de callback a fost pasată.

```javascript
function facCeva (unArg, callback) {
  try {
    // fac ceva cu datele primite.
  } catch (e) {
    callback?.(e.message); // în cazul în care callback nu este definită, nu este ridicată nicio excepție.
    // înlocuiește testarea dacă funcția a fost pasată
  }
}
```

## Folosirea cu expresii

Poți folosi operatorul și cu expresii care îi urmează.

```javascript
let cevaÎnAdâncime = unObiect?.['nume' + 'proprietate'];
```

## Testarea existenței unei valori dintr-un array

```javascript
let valoreE = numeArray?.[20];
```

## Scurtcircuit al evaluării

În cazul în care operandul din stânga este `null` sau `undefined`, expresia din dreapta nu va mai fi evaluată.

```javascript
let ceva = null;
let contor = 0;
let actualizată = ceva?.[contor++];
// valoarea lui contor nu va fi incrementată
```
