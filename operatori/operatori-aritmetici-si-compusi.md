# Operatorii aritmetici

Sunt clasicii operatori aritmetici cu care suntem obișnuiți de la clasele primare: adunare, scădere, înmulțire, împărțire, ridicarea la putere și modulo.

## Exponent `**`

Acest operator returnează rezultatul ridicării la putere a primului operand la exponentul menționat de al doilea operator.

```javascript
3 ** 2; // 9
```

## Plus `+`

Este operatorul cu ajutorul căruia facem adunări. Adunăm expresii constituite din valori numerice.

Există un caz în care operatorul plus este folosit pentru a concatena șiruri de caractere. Operațiunea în sine se numește **concatenare** și se întâmplă ori de câte ori unul din operanzii unei expresii este un șir text.

```javascript
var text = 2 + "8";
console.log(text); // 28
typeof text; // "string"
```

Uneori ai nevoie să transformi o valoare într-un șir de caractere. De cele mai multe ori este folosit acest truc pentru a *constrânge*, pentru a *transforma* valoarea primită de un parametru. Operatorul plus oferă prin natura sa această posibilitate. Singurul lucru pe care trebuie să-l faci este să pui valoarea pe care o dorești transformată în string într-o expresie în care în partea stângă ai un șir vid. Astfel, indiferent ce vine în partea dreaptă a operatorului, expresia după evaluare va oferi un șir de caractere.

```javascript
var ceva = '' + 2; // '2' (șirul vid este convertit la 0)
ceva; // '2'
typeof ceva; // 'string'
undefined + 100; // NaN
```

Există câteva situații specifice pentru care înțelegerea se leagă de receptarea operatorului plus ca fiind unul unar, adică își exercită efectele asupra operandului din drepta sa. Pentru mai multe detalii, vezi rolul lui plus la operatorii unari.

## Operatorul plus-egal `+=` (adunare la preexistent și asignare)

Acest operator compune într-un singur simbol două operațiuni prima este de a lua valoare existentă și a-i adăuga valoarea dorită, iar a doua este de a reatribui identificatorului noua valoare.
Are înțelesul următor exprimat prin cod: `a = a + expresie;`

Închipuiește-ți următoarea situație: ai nevoie să adaugi o valoare la una preexistentă. Cel mai simplu este să folosești operatorul plus simplu.

```javascript
var x = 1; x = x + 1; // 2
// mai simplu ar fi
var x = 1; x += 1; // 2
```

Problema apare atunci când dorești să operezi cu șiruri de caractere. Este situația unui șir preexistent la care adaugi rând pe rând alte șiruri.

```javascript
var x = 'ceva', y = ' plus altceva';
console.log( x += y ); // ceva plus altceva
```

Hai să vedem cum se face acest lucru într-un flux dictat de parcurgerea unei colecții de fragmente care trebuie adăugate la unul preexistent. Dacă nu știi cum funcționează buclele, nu te îngrijora, încearcă să intuiești cum funcționează având în vedere că `for` caută `element` în lista cu valori text `fragmente`.

```javascript
var fragmente = ['<html>','<head>','</head>','<body>','</body>','</html>'],
    intreg = '';
for(element of fragmente){
  intreg += element;
}; console.log(intreg);
```

La exemplul oferit mai sus există un lucru de care trebuie să ții cont. Atunci când faci operațiuni pe șiruri de caractere, operatorul plus se transformă într-unul de concatenare. Ce înseamnă acest lucru? Operatorul plus nu mai încearcă o transformare a șirului într-o valoare numerică. Da, acesta este comportamentul implicit al operatorului plus și vom vedea în mai mare detaliu aceste transformări la momentul când vom vorbi despre ceea ce numim **coercion** (contrângeri sau transformări în limba română).

## Minus `-`

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

Rezultatul va fi adunarea valorilor. Adu-ți aminte regula matematică care evaluează `-` cu `-` la plus.

## Operatorul `-=` (scădere din preexistent și asignare)

Similar ceui de adunare și atribuire, este un operator pe care-l folosești pentru a scădea o valoare dintr-una preexistentă.

```javascript
var x = 10; x -= 5; // 5
```

## Diviziune `/`

```javascript
5 / 2; // 2.5
```

Reține faptul că JavaScript desfășoară operațiuni matematice care pot avea drept rezultat numere fracționare (doubles). Câteva situații mai speciale:

```javascript
1 / 0; // Infinity
5 / 0; // Infinity
```

## Operatorul `/=` (diviziunea preexistentului cu o valoare)

Operatorul va efectua diviziunea cu valoarea specificată și va atribui rezultatul.

```javascript
var imp = 4;
imp /= 3; // 1.33333333
```


## Înmulțire `*`

```javascript
5 * 2; // 10
```

## Operatorul `*=` (înmulțirea preexistentului cu o valoare)

Face operațiunea de înmulțire și apoi va atribui variabilei noua valoare rezultată.

```javascript
var inm = 2;
inm *= 2; //4
```

## Restul împărțirii (modulo) `%`

```javascript
9 % 2; // 1
```
