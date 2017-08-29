# Operatorii de atribuire

Au drept sarcină asignarea unei valori operandului din partea stângă iar această atribuire se face în funcție de rezultatul la care s-a ajuns în urma evaluării operandului din partea dreaptă.

## Operatorul egal - `=`

Este operatorul de bază pentru atribuirea valorilor.
Operatorul egal poate fi implicat în înlănțuiri de atribuiri. În acest caz, toți identificatorii vor trimite către valoarea rezultată din evaluarea expresiei din extremitatea dreaptă.

```javascript
var a = 1, b = 2, c = 3;
a = b = c; // a, b și c vor avea 3
```

## Operatorul `+=` (adunare la preexistent și asignare)

Are înțelesul de `a = a + expresie;`

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

Hai să vedem cum se face acest lucru într-un flux dictat de parcurgerea unei colecții de fragmente care trebuie adăugate la unul preexistent. Dacă nu știi cum funcționează buclele, nu te îngrijora, încearcă să intuiești cum funcționează.

```javascript
var fragmente = ['<html>','<head>','</head>','<body>','</body>','</html>'],
    intreg = '';
for(element of fragmente){
  intreg += element;
}; console.log(intreg);
```

La exemplul oferit mai sus există un lucru de care trebuie să ții cont. Atunci când faci operațiuni pe șiruri, operatorul plus se transformă într-unul de concatenare. Ce înseamnă acest lucru? Operatorul plus nu mai încearcă o transformare a șirului într-o valoare numerică. Da, acesta este comportamentul implicit al operatorului plus.

## Operatorul `-=` (scădere din preexistent și asignare)

Este un operator pe care-l folosești pentru a scădea o valoare dintr-una preexistentă.

```javascript
var x = 10; x -= 5; // 5
```

## Operatorul `*=` (înmulțirea preexistentului cu o valoare)

În cazul utilizării acestui operator, se va face operațiunea de înmulțire și apoi se va atribui variabilei valoarea rezultată.

```javascript
var inm = 2;
inm *= 2; //4
```

## Operatorul `/=` (diviziunea preexistentului cu o valoare)

Folosind operatorul se va efectua diviziunea cu valoarea specificată și se va atribui rezultatul.

```javascript
var imp = 4;
imp /= 3; // 1.33333333
```
