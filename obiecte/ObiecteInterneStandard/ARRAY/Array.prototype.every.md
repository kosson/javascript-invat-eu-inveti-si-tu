# Array.prototype.every()

Metoda testează dacă elementele din array trec un test care se face printr-un callback.

Funcția de test poate primi trei argumente:
- valoarea curentă (obligatoriu) - elementul care este procesat,
- indexul (opțional) - indexul elementului care este procesat,
- array-ul pentru care ``every`` a fost invocat.

Pe lângă argumente, poate seta ``this`` diferit.

Metoda every execută callback-ul pentru fiecare element al array-ului până când returnează o valoare cu valoare de fals (falsy - valoare care transformată în Boolean este false). Odată întâlnit un astfel de element, every va returna ``false`` imediat. Callback-ul va fi invocat doar pentru elementele care au valori.

``every`` nu modifică array-ul pentru care este apelată.

```js
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
```
