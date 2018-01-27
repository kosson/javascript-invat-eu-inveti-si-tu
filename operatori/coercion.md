# Coercion - transformare

Coercion în limba engleză înseamnă constrângere. Ceea ce se petrece este o „transformare” pe care o face un operator asupra unei valori date în încercarea de a face evaluarea expresiei. Pe parcursul lucrării vom folosi interșanjabil termenul care exprimă ceea ce se petrece cu cel în limba engleză.

**Moment ZEN**: Totul în JavaScript este evaluat în final la o valoare boolean, fie ceva care poate fi considerată a fi o valoare **adevărată**, fie ceva care poate fi considerat a fi o valoare **falsă** - *truthy* și *falsy*, cum am spune în engleză.

Unii operatori, cum ar fi, de exemplu, plus, mai întâi fac o transformare a valorii operandului la echivalentul numeric și abia apoi face operațiunea matematică.

## Transformarea unui șir de caractere

Uneori datele vin ca șiruri de caractere, chiar și cele numerice. Atunci când ai nevoie să faci o operațiune matematică, ai nevoie de un mecanism care să le transforme din forma lor textuală în cea numerică, de care este nevoie.

Cea mai simplă transformare este aceea de a pune minus sau plus înaintea unui șir de caractere. Exemplele sunt oferite la descrierea operatorilor unari.

```javascript
+'10';  // 10
+true;  // 1
-false; // -0
-null;  // -0
```

În cazul tuturor operațiunilor matematice se fac transformările de care este nevoie.

```javascript
2 * "3"; // 6
```

Dacă am aplica același raționament pentru operatorul plus, vom remarca ceva interesant. Rezultatul nu va fi o transformare a șirului la număr, ci va rezulta o concatenare a celor doi operanzi ca și când ar fi amândoi șiruri de caractere.

```javascript
10 + '10'; // 1010
```

Această situație se poate schimba prin transformarea aplicată de apelarea obiectului intern `Number` ca și funcție căruia îi pasăm drept argument șirul. Va fi returnată valoarea numerică.

```javascript
10 + Number("10"); // 20
```

`Number` a făcut o conversie a tipului (în engleză îi spune „type conversion”), ceea ce a permis operația matematică. Aici nu este vorba despre coercion.

## Transformarea numerelor în șiruri

Uneori este nevoie să se facă transformarea unui număr în caracter sau într-un șir. Acest lucru se face prin adăugarea unui șir vid.

```javascript
10 + ''; // "10"
```

Sau mai rapid folosind obiectul intern `String` prin apelare directă. Aici nu mai vorbim despre coercion, ci despre o conversie a tipului de valoare.

```javascript
String(10); // "10"
```

Există o metodă prin care poți transforma un număr într-o bază la alegere. De exemplu, din zecimal în binar.

```javascript
5..toString(2); // "101"
// să-l convertești înapoi
parseInt('101',2); // 5
```

## Evaluarea condiției if

|           `true`/`false`                        |
|:------------------------------------------------|
| if (true) { /* execută codul */ }`              |
| `if (false) { /* nu execută codul */ }`         |
| `if (1) { /* execută codul */ }`                |
| `if (0) { /* nu execută codul */ }`             |
| `if (-1) { /* execută codul */ }`               |
| `if (-1) { /* execută codul */ }`               |
| `if ("false") { /* execută codul */ }`          |
| `if ("1") { /* execută codul */ }`              |
| `if ("0") { /* execută codul */ }`              |
| `if ("-1") { /* execută codul */ }`             |
| `if ("") { /* nu execută codul */ }`            |
| `if (null) { /* nu execută codul */ }`          |
| `if (undefined) { /* nu execută codul */ }`     |
| `if (Infinity) { /* execută codul */ }`         |
| `if (-Infinity) { /* execută codul */ }`        |
| `if ([]) { /* execută codul */ }`               |
| `if ({}) { /* execută codul */ }`               |
| `if ([[]]) { /* execută codul */ }`             |
| `if ([0]) { /* execută codul */ }`              |
| `if ([1]) { /* execută codul */ }`              |
| `if (NaN) { /* nu execută codul */ }`           |
