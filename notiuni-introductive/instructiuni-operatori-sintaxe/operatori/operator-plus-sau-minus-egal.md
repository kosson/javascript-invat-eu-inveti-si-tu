## Operatorul `+=`

Închipuiește-ți următoarea situație: ai nevoie să adaugi o valoare la una preexistentă. Cel mai simplu este să folosești operatorul plus simplu.

```javascript
var x = 1; x + 1; // 2
```

Problema apare atunci când dorești să operezi cu șiruri. Este situația unui șir preexistent la care adaugi rând pe rând alte șiruri.

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

## Operatorul `-=`

Este un operator pe care-l folosești pentru a scădea o valoare dintr-una preexistentă.

```javascript
var x = 10; x -= 5; // 5
```
