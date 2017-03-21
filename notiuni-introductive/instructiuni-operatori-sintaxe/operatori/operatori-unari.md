# Operatorii unari

Un operator unar este un operator care aplică o operațiune asupra unui singur operand sau argument.

Acest tip de operator se pune înainte sau după operator.

## Operatorul plus `+`

Mai întâi de toate încearcă o transformare a operandului într-un număr. Dacă operandul nu poate fi convertit, operatorul va returna `NaN`.

```javascript
+10; // 10
+'-100'; // -100
+'23'; // 23
+'0xDF'; // 223
+true; // 1
+false; // 0
+null; // 0
+'Infinity'; // Infinity
+function(){}; // NaN
+{a:10}; // NaN
+{valueOf: function(){return '0xDF';}}; // 223
-10; // -10
-'ten'; // NaN
```

După cum este observabil, dacă un obiect are o metodă `valueOf` care returnează o valoare numerică, operatorul va face evaluarea rezultatului.

```javascript
10 + 1.1; // 11.1
```

## Operatorul minus `-`

La fel ca plus încearcă mai întâi o conversie a operandului la număr.

Minus precedă operandul convertind tipurile de date care nu sunt numere. Spre deosebire de operatorul plus, operatorul minus mai face ceva în plus: neagă rezultatul evaluării.

```javascript
-12; // -12
-'12'; // -12
-'-10'; // 10
-true; // -1
-false; // -0
-null; // -0
-'Infinity'; // -Infinity
-'ceva'; // NaN
-{valueOf: function(){return '0xDF';}}; // -223
```

## Operatorul logic de negare `!`

Încearcă mai întâi de toate o conversie a operandului la o valoare `Boolean`.

```javascript
!true; // false
!false; // true
!NaN; // true
!0; //true
!null; // true
!undefined; // true
!''; // true
!23; // false
!{}; // false
!'salut'; // false
!!'salut'; // true
```

## Operatorul de incrementare `++`

Adaugă o unitate la valoarea preexistentă a operandului și returnează rezultatul.

Acest operator poate fi folosit ca prefix sau ca postfix.
Ca prefix, operatorul va returna valoarea după incrementare.
Ca postfix, va returna valoarea înaintea incrementării cu o unitate.

Operațiunea de incrementare a unei valori se poate face prin adăugarea explicită a unei valori sau prin utilizarea operatorului `++` ca prefix sau sufix.

Vom porni cu cea care produce un rezultat neașteptat pentru moment. Folosirea operatorului `++` ca sufix.

```javascript
var x = 1;
x++; // 1
x; // 2
```

Te-ai fi așteptat ca la incrementare să fie returnat rezultatul 2. Ei bine, acest lucru nu s-a întâmplat pentru că valoarea a fost returnată și abia după aceea a fost incrementată.

```javascript
var x = 1;
++x; // 2
```

Când operatorul este folosit ca prefix, incrementarea se face înainte ca operatorul să returneze noua valoare.

## Operatorul de decrementare `--`

Operatorul scade o unitate din valoarea preexistentă a operandului.
Ca prefix, va returna valoarea după scăderea unei unități.
Ca postfix, va returna mai întâi valoarea și abia apoi va opera scăderea unei unități.

## Operatorul bitwise not `~`

Operatorul inversează toți biții valorii operandului și returnează un număr.

```javascript
~'0xDF'; // -224 (+'0xDF' este 223)
```

## Operatorul `typeof`

Returnează un șir de caractere care spune ce este operandul.
Operatorul este poziționat înaintea operandului.

## Operatorul `delete`

Folosindu-l poți șterge un element dintr-un array sau o proprietate a unui obiect.
Returnează `true` când a reușit să șteargă și `false` când nu.

```javascript
var obi = {a: 1, b: 2, 1: 10};
delete obi.a; // true
delete obi[10]; // true
```

Atenție, valorile asignate unui identificator declarat cu `var`, `const` și `let`, nu pot fi șterse cu `delete`.
`delete` se poate folosi și cu array-urile, dar ceea ce se va petrece este că valoarea de la index va fi ștearsă, nu și indexul.

Cu `delete` nu se pot șterge decât proprietățile care chiar aparțin unui obiect, nu și cele de pe lanțul prototipal.
Încercarea de a șterge o proprietate care nu există va returna `true` iar obiectul nu va fi afectat.

## Operatorul `void`

Șterge valoarea returnată a unei expresii, adică expresia va fi evaluată, dar rezultatul evaluării va fi setat la `undefined`.

Operatorul `void` nu trebuie confundat cu o funcție.

```javascript
void 0; // undefined
// setarea la undefined a unei funcții
function faCeva(){return 'salve';};
var x = void (faCeva());
console.log(x); // undefined
```
