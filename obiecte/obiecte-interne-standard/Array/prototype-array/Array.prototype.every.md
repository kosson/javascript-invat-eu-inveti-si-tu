# Array.prototype.every()

Metoda testează dacă absolut toate elementele din array trec un test, care se face printr-un callback. Atenție, fiecare element, rând pe rând, trebuie să treacă testul pentru ca `every()` să returneze `true`.

Funcția de test poate primi trei argumente:

- valoarea curentă (obligatoriu) - elementul care este procesat,
- indexul (opțional) - indexul elementului care este procesat,
- array-ul pentru care `every` a fost invocat.

Pe lângă argumente, poate seta un `this` diferit.

Metoda `every` execută callback-ul pentru fiecare element al array-ului până când returnează o valoare cu valoare de `false` (falsey - valoare care transformată în Boolean este false). Odată întâlnit un astfel de element, `every` va returna `false` imediat. Callback-ul va fi invocat doar pentru elementele care au valori.

Această metodă nu modifică array-ul pentru care este apelată.

```javascript
function treceLimita(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(treceLimita);   // false
[12, 54, 18, 130, 44].every(treceLimita); // true
```

Un caz interesant de aplicare ar fi să verifici dacă elementele unui array au aceeași valoare.

```javascript
const colectie = [5,5,5];
colectie.every((val, idx, arr) => val === arr[0]);   // true
// sau
colectie.every((val, idx, arr) => {
  return val === arr[0];
}); // true
// sau
colectie.every(function (val, idx, arr) {
  return val === arr[0];
}); // true
```

Funcția callback verifică pentru fiecare element și returnează valoarea de adevăr pentru fiecare verificare. Și o variantă *onw liner*:

```javascript
const suntEgaleIntreEle = arr => arr.length > 0 && arr.every(item => item === arr[0]);
```

Variantă *one liner* pentru a verifica dacă toate elementele sunt identice cu o valoare după care se face căutarea.

```javascript
const suntEgaleCuElementDat = (arr, value) => arr.every(item => item === value);
```

## Resurse

- [Check if all array elements are equal to a given value](https://1loc.dev/#check-if-all-array-elements-are-equal-to-a-given-value)
- [Check if all items in an array are equal](https://1loc.dev/#check-if-all-items-in-an-array-are-equal)