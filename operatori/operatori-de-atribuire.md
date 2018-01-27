# Operatorii de atribuire

Au drept sarcină asignarea unei valori operandului din partea stângă iar această atribuire se face în funcție de rezultatul la care s-a ajuns în urma evaluării operandului din partea dreaptă.

## Operatorul egal `=`

Este operatorul de bază pentru atribuirea valorilor.
Operatorul egal poate fi implicat în înlănțuiri de atribuiri. În acest caz, toți identificatorii vor trimite către valoarea rezultată din evaluarea expresiei din extremitatea dreaptă.

```javascript
var a = 1, b = 2, c = 3;
a = b = c; // a, b și c vor avea 3
```

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

## Operatorul `-=` (scădere din preexistent și asignare)

Similar ceui de adunare și atribuire, este un operator pe care-l folosești pentru a scădea o valoare dintr-una preexistentă.

```javascript
var x = 10; x -= 5; // 5
```

## Operatorul `*=` (înmulțirea preexistentului cu o valoare)

Face operațiunea de înmulțire și apoi va atribui variabilei noua valoare rezultată.

```javascript
var inm = 2;
inm *= 2; //4
```

## Operatorul `/=` (diviziunea preexistentului cu o valoare)

Operatorul va efectua diviziunea cu valoarea specificată și va atribui rezultatul.

```javascript
var imp = 4;
imp /= 3; // 1.33333333
```
