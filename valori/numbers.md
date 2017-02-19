# Numere

Sunt date numerice. Aceste pot fi numere întregi sau zecimale.

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

Numerele pot fi și octale (în bază 8) sau hexazecimale (în baza 16).

```javascript
034; // 28 (octal), 3 de 8 plus 4
0xDF; // 223 (hexa)
```

Numere cu exponent sau notația științifică a numerelor.

```javascript
3E3; // 3000
// poate fi rescris ca
3e+3; // 3000
```

Este 3 ori 10 la puterea a treia. Puterea poate fi specificată cu un număr negativ.

```javascript
2.1e+2; // 210
2.1e-2; // 0,021
```
