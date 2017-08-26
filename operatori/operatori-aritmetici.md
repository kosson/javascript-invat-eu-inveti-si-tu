# Operatorii aritmetici

Sunt clasicii operatori aritmetici cu care suntem obișnuiți de la clasele primare: adunare, scădere, înmulțire, împărțire, ridicarea la putere și modulo.

## Plus - +

Este operatorul cu jutorul căruia facem adunări. Adunăm expresii constituite din valori numerice.

Există un caz în care operatorul plus este folosit pentru a concatena șiruri de caractere. Operațiunea în sine se numește concatenare și se întâmplă ori de câte ori unul din operanzii unei expresii este un șir text.

```javascript
var text = 2 + "8";
console.log(text); //28
typeof text; //"string"
```

## Minus - „-”

Este operatorul cu care facem scăderi.
Există situația în care dorești să precizezi că valoarea este pe axa negativă și în acest caz, minusul se va comporta precum un operator unar.

```javascript
var valoare = 2;
var negativ = -valoare;
negativ; // -2
```

Dacă valoarea pe care o prefixează nu este o valoare numerică, operatorul va încerca o conversie.

```javascript
var valoare = "2";
var negativ = -valoare; // -2
```

În JavaScript poți face operațiuni cu valori negative. Reține faptul că operațiunea unară se face înaintea scăderii.

```javascript
var rezult = 10 - -2; // 12
```

Rezultatul va fi adunarea valorilor. Adu-ți aminte regula matematică care evaluează - cu - la plus.

## Împărțire - „/”

```javascript
5 / 2; // 2.5
```

Reține faptul că JavaScript desfășoară operațiuni matematice care pot avea drept rezultat numere fracționare (doubles).

## Înmulțire - „*”

```javascript
5 * 2; // 10
```

## Restul împărțirii (modulo)

```javascript
9 % 2; // 1
```
