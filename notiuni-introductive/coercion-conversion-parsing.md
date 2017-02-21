# Introducere

Coercion în limba engleză înseamnă constrângere. Ceea ce se petrece este o „transformare” pe care o face un operator asupra unei valori date în încercarea de a face operațiunea. Vom folosi termenul de transformare pentru a înțelege rapid ceea ce se petrece.

Ține minte faptul că unii operatori, cum ar fi plus, mai întâi face o transformare a valorii operandului la echivalentul numeric și abia apoi se face operațiunea matematică.

## Transformarea unui șir de caractere

Uneori datele vin ca șiruri de caracte, chiar și cele numerice. Atunci când ai nevoie să faci o operațiune matematică, ai nevoie de un mecanism care să le transforme din forma lor textuală în cea numerică, de care este nevoie.

Cea mai simplă transformare este aceea de a pune minus sau plus înaintea unui șir de caractere. Exemple sunt oferite la descrierea operatorilor unari.

```javascript
+'10'; // 10
+true; // 1
-false; // -0
-null; // -0
```

Chiar în cazul operațiunilor matematice se fac transformările de care este nevoie.

```javascript
2 * "3"; //
```
Dacă am aplica același raționament pentru operatorul plus, vom remarca ceva interesant. Rezultatul nu va fi o transformare a șirului la număr, ci va rezulta o concatenare a celor doi operanzi ca și când ar fi amândoi șiruri de caractere.

```javascript
10 + '10'; // 1010
```

Această situație se poate schimba prin transformarea aplicată de apelarea obiectului intern `Number` ca și funcție căruia îi pasăm drept argument șirul. Va fi returnată valoarea numerică.

```javascript
10 + Number("10"); // 20
```

`Number` a făcut o conversie a tipului („type conversion”), ceea ce a permis operația matematică. Aici nu este vorba despre coercion.

## Transformarea numerelor în șiruri

Uneori este nevoie să se facă transformarea unui număr în caracter sau într-un șir. Acest lucru se face prin adăugarea unui șir vid.

```javascript
10 + ''; // "10"
```

Sau mai rapid folosind obiectul intern `String` prin apelare directă. Aici nu mai vorbim despre coercion, ci despre o conversie a tipului de dată.

```javascript
String(10); // "10"
```

Există o metodă prin care poți transforma un număr într-o bază la alegere. De exemplu, din zecimal în binar.

```javascript
5..toString(2); // "101"
// să-l convertești înapoi
parseInt('101',2); // 5
```

## Egalități cu ==

Reprezentarea a fost reprodusă după materialul de la http://dorey.github.io/JavaScript-Equality-Table/


|           |`true`|`false`|`1`| `0` | `-1` |`"true"`|`"false"`|`"1"`|`"0"`|`"-1"`|`""`|`null`|`undefined`|`Infinity`|`-Infinity`|`[]`|`{}`|`[[]]`|`[0]`|`[1]`|`NaN`|
|:--------- |:---- |:----- |:- |:--- |:---- |:------ |:------- |:--- |:--- |:---- |:-- |:---- |:--------- |:-------- |:--------- |:-- |:-- |:---- |:--- |:--- |:--- |
|`true`     |  X   |       | X |     |      |        |         |  X  |     |      |    |      |           |          |           |    |    |      |     |  X  |     |
|`false`    |      |   X   |   |  X  |      |        |         |     |  X  |      | X  |      |           |          |           | X  |    |  X   |  X  |     |     |
|  `1`      |  X   |       | X |     |      |        |         |  X  |     |      |    |      |           |          |           |    |    |      |     |  X  |     |
|  `0`      |      |   X   |   |  X  |      |        |         |     |  X  |      | X  |      |           |          |           | X  |    |  X   |  X  |     |     |
|  `-1`     |      |       |   |     |   X  |        |         |     |     |  X   |    |      |           |          |           |    |    |      |     |     |     |
|`"true"`   |      |       |   |     |      |    X   |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`"false"`  |      |       |   |     |      |        |    X    |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`"1"`      |  X   |       | X |     |      |        |         |  X  |     |      |    |      |           |          |           |    |    |      |     |  X  |     |
|`"0"`      |      |   X   |   |  X  |      |        |         |     |  X  |      |    |      |           |          |           |    |    |      |  X  |     |     |
|`"-1"`     |      |       |   |     |  X   |        |         |     |     |  X   |    |      |           |          |           |    |    |      |     |     |     |
|`""`       |      |   X   |   |  X  |      |        |         |     |     |      | X  |      |           |          |           |  X |    |  X   |     |     |     |
|`null`     |      |       |   |     |      |        |         |     |     |      |    |   X  |    X      |          |           |    |    |      |     |     |     |
|`undefined`|      |       |   |     |      |        |         |     |     |      |    |   X  |    X      |          |           |    |    |      |     |     |     |
|`Infinity` |      |       |   |     |      |        |         |     |     |      |    |      |           |     X    |           |    |    |      |     |     |     |
|`-Infinity`|      |       |   |     |      |        |         |     |     |      |    |      |           |          |     X     |    |    |      |     |     |     |
|`[]`       |      |   X   |   |  X  |      |        |         |     |     |      |  X |      |           |          |           |    |    |      |     |     |     |
|`{}`       |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`[[]]`     |      |   X   |   |  X  |      |        |         |     |     |      |  X |      |           |          |           |    |    |      |     |     |     |
|`[0]`      |      |   X   |   |  X  |      |        |         |     |  X  |      |    |      |           |          |           |    |    |      |     |     |     |
|`[1]`      |  X   |       | X |     |      |        |         |  X  |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`NaN`      |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |

## Egalități cu ===

Reproducere a materialului de la http://dorey.github.io/JavaScript-Equality-Table/

|           |`true`|`false`|`1`| `0` | `-1` |`"true"`|`"false"`|`"1"`|`"0"`|`"-1"`|`""`|`null`|`undefined`|`Infinity`|`-Infinity`|`[]`|`{}`|`[[]]`|`[0]`|`[1]`|`NaN`|
|:--------- |:---- |:----- |:- |:--- |:---- |:------ |:------- |:--- |:--- |:---- |:-- |:---- |:--------- |:-------- |:--------- |:-- |:-- |:---- |:--- |:--- |:--- |
|`true`     |  X   |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`false`    |      |   X   |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|  `1`      |      |       | X |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|  `0`      |      |       |   |  X  |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|  `-1`     |      |       |   |     |   X  |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`"true"`   |      |       |   |     |      |    X   |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`"false"`  |      |       |   |     |      |        |    X    |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`"1"`      |      |       |   |     |      |        |         |  X  |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`"0"`      |      |       |   |     |      |        |         |     |  X  |      |    |      |           |          |           |    |    |      |     |     |     |
|`"-1"`     |      |       |   |     |      |        |         |     |     |  X   |    |      |           |          |           |    |    |      |     |     |     |
|`""`       |      |       |   |     |      |        |         |     |     |      | X  |      |           |          |           |    |    |      |     |     |     |
|`null`     |      |       |   |     |      |        |         |     |     |      |    |   X  |           |          |           |    |    |      |     |     |     |
|`undefined`|      |       |   |     |      |        |         |     |     |      |    |      |    X      |          |           |    |    |      |     |     |     |
|`Infinity` |      |       |   |     |      |        |         |     |     |      |    |      |           |     X    |           |    |    |      |     |     |     |
|`-Infinity`|      |       |   |     |      |        |         |     |     |      |    |      |           |          |     X     |    |    |      |     |     |     |
|`[]`       |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`{}`       |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`[[]]`     |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`[0]`      |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`[1]`      |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |
|`NaN`      |      |       |   |     |      |        |         |     |     |      |    |      |           |          |           |    |    |      |     |     |     |

## Evaluarea condiției if

Reproducere după materialul de la http://dorey.github.io/JavaScript-Equality-Table/

|           `true`/`false`                  |
|:------------------------------------------|
|if (true) { /* executes */ }`              |
|`if (false) { /* does not execute */ }`    |
|`if (1) { /* executes */ }`                |
|`if (0) { /* does not execute */ }`        |
|`if (-1) { /* executes */ }`               |
|if (-1) { /* executes */ }`                |
|if ("false") { /* executes */ }`           |
|`if ("1") { /* executes */ }`              |
|`if ("0") { /* executes */ }`              |
|`if ("-1") { /* executes */ }`             |
|`if ("") { /* does not execute */ }`       |
|`if (null) { /* does not execute */ }`     |
|`if (undefined) { /* does not execute */ }`|
|`if (Infinity) { /* executes */ }`         |
|`if (-Infinity) { /* executes */ }`        |
|`if ([]) { /* executes */ }`               |
|`if ({}) { /* executes */ }`               |
|`if ([[]]) { /* executes */ }`             |
|`if ([0]) { /* executes */ }`              |
|`if ([1]) { /* executes */ }`              |
|`if (NaN) { /* does not execute */ }`      |
