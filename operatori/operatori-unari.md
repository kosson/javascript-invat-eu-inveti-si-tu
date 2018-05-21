# Operatorii unari

Un operator unar este un operator care aplică o operațiune asupra unui singur operand sau argument.

Aceștia sunt:

-   `delete`,
-   `void`,
-   `typeof`,
-   `+`,
-   `-`,
-   `~`,
-   `!`
-   `await`

Acest tip de operator se pune înainte sau după operand.

## Operatorul plus `+`

Mai întâi de toate, acest operator încearcă o transformare a operandului într-un număr. Dacă operandul nu poate fi convertit, operatorul va returna `NaN` în cazul în care valoarea nu poate fi folosită la adunare.

```javascript
+10; // 10
+'-100'; // -100
+'23'; // 23
+'0xDF'; // 223
+true; // 1
+false; // 0
+null; // 0
+'Infinity'; // Infinity
+'ceva'; // NaN
+function(){}; // NaN
+{a:10}; // NaN
+{valueOf: function(){return '0xDF';}}; // 223
-10; // -10
-'ten'; // NaN
```

Încă nu am învățat despre obiecte, dar atunci când o vei face, reține că operatorul plus în cazul în care un obiect are o metodă `valueOf` ce returnează o valoare numerică, va face evaluarea metodei (o funcție într-un obiect se numește metodă) returnând rezultatului.

```javascript
10 + 1.1; // 11.1
```

Acest operator mai este folosit și pentru a face concatenări, adică să construiască șiruri de caractere mai mari din fragmente mai mici. Semnalul pentru motorul JavaScript că se dorește o concatenare este acela că valoarea din stânga nu este o valoare numerică. **Pe cea din dreapta sa va încerca să o transforme într-una numerică pentru că acesta este comportamentul său nativ**. Deci, dacă valoarea din stânga nu este un număr, ci orice altceva, va încerca o concatenare.

```javascript
'ceva' + 1;   // "ceva1"
true + 1;     // 2
true + true;  // 2
true + false; // 1
[] + true;    // true (șirul, nu valoarea boolean)
var x = [] + true; typeof x; // string
[] + [];      // '' un șir vid
{} + 1;       // 1
```

După cum se observă, dacă valoarea din stânga a fost evaluată la o valoare numerică aproximativă, adică din `true` în `1`, operațiunea matematică se desfășoară corect. Ceea ce va încerca motorul JavaScript la momentul evaluării codului, este să transforme valoarea din dreapta operatorului plus, fie într-o valoare primitivă, fie într-un număr, fie într-un șir de caractere.

```javascript
+('1'+'2'); //12 (numărul, nu șirul)
typeof +('1'+'2'); // "number"
```

După cum putem observa operatorul plus poate evalua expresii întregi pe care le reduce la un număr.

## Operatorul minus `-`

La fel ca operatorul plus și acest operator încearcă mai întâi o conversie a operandului la o valoare număr.

Minus precedă operandul convertind tipurile de date care nu sunt numere. Spre deosebire de operatorul plus, operatorul minus mai face ceva în plus: neagă rezultatul evaluării.

```javascript
-12;      // -12
-'12';    // -12
-'-10';   // 10
-true;    // -1
-false;   // -0
-null;    // -0
-'Infinity'; // -Infinity
-'ceva';  // NaN
-{valueOf: function(){return '0xDF';}}; // -223
```

## Operatorul logic de negare `!`

Încearcă mai întâi de toate o conversie a operandului la o valoare `Boolean`. Adu-ți mereu aminte faptul că în JavaScript toate expresiile pot fi evaluate la o valoare boolean. **Absolut toate expresiile se reduc la a fi truthy sau falsey**.

```javascript
!true;      // false
!false;     // true
!NaN;       // true
!0;         // true
!null;      // true
!undefined; // true
!'';        // true
!23;        // false
!{};        // false
!'salut';   // false
!!'salut';  // true
```

## Operatorul de incrementare `++`

Adaugă o unitate la valoarea preexistentă a operandului și returnează rezultatul. Acest operator poate fi folosit ca **prefix** sau ca **postfix**.
Ca prefix, operatorul va returna valoarea după incrementare.
Ca postfix, va returna valoarea înaintea incrementării cu o unitate.

Operațiunea de incrementare a unei valori se poate face prin adăugarea explicită a unei valori sau prin utilizarea operatorului `++` ca prefix sau sufix.

Vom porni cu cea care produce un rezultat care de multe ori nedumerește. Folosirea operatorului `++` ca sufix.

```javascript
var x = 1;
x++;  // după incrementare încă are valoarea 1
x;    // abia la următoarea utilizarea a
      // identificatorului acesta va indica noua valoare
```

Te-ai fi așteptat ca la incrementare să fie returnat 2 fără dubiu.

Acest lucru nu s-a întâmplat pentru că valoarea variabilei a fost returnată la momentul când a fost evaluat operatorul `++`, care returnează noua valoare.

Acest moment în timp este foarte important de reținut pentru că este cel imediat ce *cursorul* motorului a trecut de identificator și a *dat peste* operatorul de incrementare. După ce a trecut *cursorul* și de operator, acesta returnează valoarea operandului, dar nu la valoarea incrementată. Ceea ce s-a petrecut este că mediul de rulare reține în continuare valoarea anterioară, dar nu și pe cea nouă, cea actualizată după trecerea cursorului de operator și incrementarea în urma evaluării care s-a făcut. Abia după ce mai „citim” - **evaluăm** o dată identificatorul `x`, acesta indică valoarea actualizată. În cazul utilizării ca prefix, operatorul face mai întâi incrementarea. Astfel, vom avea la dispoziție valoarea actualizată fără a mai fi necesară citirea valorii identificatorului, care tot o operațiune de evaluare este.

Reține acest comportament pentru că acest tip de incrementare este folosită în mod curent la realizarea buclelor cu enunțul `for`, când dorești să parcurgi o listă de valori. Cam așa arată: `for(var i = 0; i < listă.length; i++) { // operațiunea aplicată rând pe rând fiecărui element din listă}`. Îl vei mai folosi de multe ori și în calcule matematice.

Înainte de a vedea comportamentul din poziția de prefix, pune o ancoră de memorie pe acest comportament pentru că uneori conduce la situații inexplicabile sau chiar erori - valoarea nu există, nu pentru că nu a fost incrementată, ci pentru că nu a mai fost evaluat (*citit*) identificatorul o dată și alte multe asemenea. Prima dată când vom folosi în vreo expresie respectiva variabilă, atunci valoarea va fi cea incrementată. Până atunci, motorul are memorie scurtă și în dinamica evaluării, până când nu va fi silit să citească din nou variabila, va folosi valoarea veche.

Când operatorul este folosit ca prefix, incrementarea se face înainte ca operatorul să returneze noua valoare.

```javascript
var x = 1;
++x; // 2
```

## Operatorul de decrementare `--`

Operatorul scade o unitate din valoarea preexistentă a operandului.
Ca prefix, va returna valoarea după scăderea unei unități.
Ca postfix, va returna mai întâi valoarea și abia apoi va opera scăderea unei unități.

## Operatorul bitwise not `~`

Operatorul inversează toți biții care reprezintă valoarea operandului și returnează un număr.

```javascript
~'0xDF'; // -224 (+'0xDF' este 223)
```

## Operatorul `typeof`

Returnează un șir de caractere care spune ce tip este valoarea operandului.
Operatorul este poziționat înaintea operandului.

## Operatorul `delete`

Folosindu-l poți șterge un element dintr-un array sau o proprietate a unui obiect sau chiar obiectul cu totul.
Returnează `true` când a reușit să șteargă și `false` când nu.

```javascript
var obi = {a: 1, b: 2, 1: 10};
delete obi.a; // true
delete obi[10]; // true
delete obi;
```

Atenție, valorile asignate unui identificator declarat cu `var`, `const` și `let`, nu pot fi șterse cu `delete`. Atenție, există o singură excepție. Dacă variabila nu a fost declarată explicit, aceasta poate fi ștearsă.

```javascript
x = 10; delete x; // true
```

`delete` se poate folosi și cu array-urile, dar ceea ce se va petrece este că valoarea de la index va fi ștearsă, nu și indexul. Pe cale de consecință, proprietatea `length` a array-ului nu va fi afectată.

```javascript
var colectie = ['ceva', 'altceva'];
delete colectie[1];
colectie.length; // 2
colectie[1]; // undefined
```

Cu `delete` nu se pot șterge decât proprietățile care chiar aparțin unui obiect, nu și cele de pe lanțul prototipal.
Încercarea de a șterge o proprietate care nu există va returna `true` iar obiectul nu va fi afectat.

## Operatorul `void`

Șterge valoarea returnată a unei expresii, adică expresia va fi evaluată, dar rezultatul evaluării va fi setat la `undefined`.

Operatorul `void` nu trebuie confundat cu o funcție.

```javascript
void 0; // undefined
// setarea la undefined a unei funcții
function faCeva () {return 'salve';};
var x = void (faCeva());
console.log(x); // undefined
```
