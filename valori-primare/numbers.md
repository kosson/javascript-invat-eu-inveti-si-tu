# Numere

Sunt date numerice.

```javascript
typeof 5;     // "number"
typeof 10.1;  // "number"
```

Reprezentarea numerelor în JavaScript respectă standardul IEEE 754.
Numerele întregi pot fi reprezentate cu o acuratețe de 53 de biți. Concluzia este că JavaScript poate reprezenta numere întregi chiar dacă nu are un tip de primară `integer` așa cum are, de exemplu, Java.

Atenție la coercion:

```javascript
3 + 1;    // 4
3 + true; // 4
3 + "1";  // "31"
3 + 1 + "1";  // "41"
3 + "1" + 1;  // "311"
```
