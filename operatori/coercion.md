# Coercion - transformare

Coercion în limba engleză înseamnă constrângere. Ceea ce se petrece este o „transformare” pe care o face un operator asupra unei valori date la momentul evaluării expresiei. Pe parcursul lucrării vom folosi interșanjabil termenul care exprimă ceea ce se petrece cu cel în limba engleză.

**Moment ZEN**: Totul în JavaScript este evaluat în final la o valoare boolean, fie ceva care poate fi considerată a fi o valoare **adevărată**, fie ceva care poate fi considerat a fi o valoare **falsă** - *truthy* și *falsy*, cum am spune în engleză.

Coercion este absolut necesar în JavaScript pentru că acest limbaj de programare nu precizează strict, de la bun început valorile cu care operează. JavaScript este ceea ce numim limbaj **loosely typed**, adică valorile nu au nevoie să le fie precizat strict tipul (**strongly typed**) înainte de a opera cu ele. Totuși, interpretorul va face automat conversiile respectând anumite reguli. Acesta este un mare avantaj care conferă o flezibilitate nemaiîntâlnită, dar pe de altă parte trebuie să existe un mecanism prin care să putem duce la bun sfârșit operațiunile de evaluare a expresiilor. Putem să ne gândim că JavaScript permite să adunăm mere cu pere, dar ca să ajungă la un rezultat, perele vor fi transformate, constrânse să devină mere. Acest lucru este asigurat prin regulile de coercion.

Valoarea `null` și un șir vid ('') vor fi transformate întotdeauna în `0`. Dacă am un șir de caractere care reprezintă un număr, acesta va fi transformat chiar în număr.

```javascript
null + 2; // 2 (echivalent 0 + 2)
3 - '';   // 3 (number)
'23' > 1; // true
```

Sunt și alte transformări care se petrec, dar acestea sunt determinate de acțiunea operatorilor unari așa cum este `+` și `-`, de exemplu, când aceștia „se uită” la operandul din dreapta și în funcție de ce este în stânga încearcă să-l transforme pentru a obține ceva din acea expresie.

Există câteva valori care vor fi întotdeauna reduse la `false` în evaluările expresiilor: `0` (ce poate fi mai evident?), `''` un șir vid, valoarea `undefined` și `NaN`, încheind cu faimosul `null`. Aici adăugăm o mențiune foarte utilă pe termen lung: restul valorilor se reduc la `truthy`. Dacă ai nevoie să transformi explicit în valoarea de adevăr o valoare, te poți folosi de operatorul de negare, care pentru a nega ceva, mai întâi are nevoie să transforme acea valoare la echivalentul Boolean. Odată negat, îl mai negi odată ca să revii la valoarea sa de adevăr originală.

```javascript
!!0; // false
!!''; // false
!!undefined; // false
!!NaN; // false
!!null; // false
// câteva curiozități
!!(true); // true
!!(1); // true
```

## Transformarea unui șir de caractere

Uneori datele vin ca șiruri de caractere, chiar și cele numerice. Adu-ți mereu aminte că poți investiga cu ce valori ai de-a face, dacă folosești operatorul `typeof valoare`.

Atunci când ai nevoie să faci o operațiune matematică, ai nevoie de un mecanism care să le transforme din forma lor textuală în cea numerică, de care este nevoie.

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
10 + '10'; // 1010 (sir de caractere)
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

Sau mai rapid folosind obiectul intern `String` prin apelare directă. Aici nu mai vorbim despre coercion, ci despre o conversie a tipului de valoare. În engleză este termenul de **casting**, care are sensul explicit de a transforma un tip de valoare în alt tip. De exemplu, poți folosi obiectele interne pentru a returna valoarea transformată.

```javascript
String(10); // "10"
```

## Transformarea șirurilor în numere

Cel mai simplu mod de a face acest lucru este să folosești operatorul plus pe care-l pui înaintea valorii pe care o dorești a fi transformată în număr.

```javascript
+'10'; // 10 (number)
```

La același rezultat poți ajunge folosind obiectul intern `Number` sau metode ale acestuia cum ar fi `Number.parseInt()` și `Number.parseFloat()`.

```javascript
Number('10'); // 10
Number.parseInt('20'); // 20
Number.parseFloat('30'); // 30
```

Există o metodă prin care poți transforma un număr într-o bază la alegere. De exemplu, din zecimal în binar.

```javascript
5..toString(2); // "101"
// să-l convertești înapoi
parseInt('101',2); // 5
```

## Transformări implicite și explicite

Până acum am discutat doar despre transformările care se petrec la momentul evaluării codului. Acestea se numersc transformări implicite. Dacă este nevoie, poți face și transformări explicite ale valorilor folosind obiectele interne ale limbajului. Acestea sunt niște constructori și, ca oricare alt contructor, o funcție. Apelarea strictă ca funcție pasând o valoare, va avea drept efect transformarea explicită a acelei valori la tipul constructorului folosit. Mai sus, am strecurat deja câteva exemple.

În încheiere, atrag atenția asupra acestor transformări care se petrec automat la momentul evaluării expresiilor. Uneori, mecanismul de transformarea automată, dacă nu este înțeles pe deplin poate conduce la erori și situații aparent inexplicabile. Întelegerea transformărilor este strâns legată de înțelegerea operatorilor și efectelor pe care aceștia le au asupra operanzilor la momentul evaluării.
