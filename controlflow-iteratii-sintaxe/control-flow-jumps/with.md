# Enunțul `with`

Este utilizat pentru a modifica lanțul mediilor lexicale pentru un anumit bloc de cod.

Există un comportament pentru momentul în care accesezi o variabilă. Dacă aceasta nu există în mediul lexical în care a fost solicitată valoarea legată de ea, se face o căutare în mediul lexical de deasupra și tot așa până la obiectul global.

Ceea ce face width este să ia un obiect pe care să-l plaseze în cel mai de sus nivel al mediilor lexicale, asigurându-se de faptul că ultimul interogat pentru un anume identificator este obiectul vizat de noi. După ce se face interogarea, se revine la mediul lexical de unde s-a plecat.

Reține faptul că în `"strict mode";` este interzisă utilizarea lui `with`. Chiar este considerată o practică eronată folosirea sa.

```javascript
with (object) {
  // enunțuri
};
```

Un exemplu simplu ar fi forțarea strictă a operațiunilor pentru cadrul restrâns al unui singur obiect:

```javascript
with (String) {
  console.log('ceva'.length);
}; // 4
```
