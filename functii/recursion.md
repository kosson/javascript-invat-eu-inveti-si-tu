# Recursivitate

În literatură recursivitatea mai este numită și **recurență**. Recursivitatea poate fi înțeleasă ca fiind apariția unui lucru în funcție de rezultatul interpretării regulilor acelui lucru.

Recursivitatea este realizată în JavaScript folosind funcțiile. O funcție recursivă este o funcție care se apeleză pe sine însăși. Acest tip de funcții sunt folosite în probleme care necesită o abodare *divide et impera*, adică rezolvarea unei probleme prin divizarea în probleme mai mici.

Funcțiile recursive sunt alternativa la procesele repetitive, la ciclurile iterative realizate cu bucle. Recursivitatea nu implică conceptul de ciclu. Este o funcție care se apelează pe sine însăși până când satisface o condiție limitativă.

Capacitatea unei funcții de a se apela pe sine însăși conduce la efecte interesante atunci când vorbim despre parcurgerea unor calupuri de date. În cel mai simplu scenariu vorbim de faptul că funcția va executa același set de instrucțiuni până la epuizarea unei *condiții de bază*. Dacă nu există o *condiție de bază* sau dacă aceasta este gândită defectuos, se ajunge la o stare de eroare în care întreaga stivă de apeluri este consumată rezultând un *stack overflow*.

## Regulile recursivității

Pentru a scrie o funcție recursivă trebuie mai întâi să stabilești care este *condiția de bază* sau *cazul terminal*. Acest lucru trebuie făcut pentru că funcțiile recursive se vor autoapela până când valoarea returnată satisface *condiția de bază*. În condiția de bază nu trebuie să fie apelată funcția.

În cazul recursivității, fiecare operațiune, adică fiecare nouă apelare este **subordonată** pasului anterior și adaugă un cadru nou de execuție în stiva de apeluri. Un exemplu simplu ar fi afișarea descrescătoare a unei serii de numere pentru care pasezi o limită superioară.

```javascript
function scad (numar) {
  if(numar === 0) return; // condiția de bază
  console.log(numar);
  scad(numar - 1);        // apelare
};
scad(10);
```

Cum funcționează:

1. declari o funcție printr-o expresie care ia un argument;
2. se creează variabila internă `număr` cu valoarea `10`;
3. se testează condiția de ieșire din execuția funcției;
4. dacă condiția nu este satisfăcută, se mai apelează o dată funcția;
5. de această dată la argument se introduce expresia care transformă;
6. este evaluată expresia și noua valoare va fi valoarea lui număr;
7. ciclul inițiat la pasul 3 se reia până când valoarea evaluată la argument satisface condiția;
8. la satisfacerea condiției se iese din execuția primului apel `scad()`.

Funcțiile recursive taxează resursele sistemului (*space complexity cost*) pentru că fiecare apel ocupă stiva. Stiva acumulează aceste apeluri până când cazul de bază este satisfăcut. Din acest motiv, uneori este preferabilă o soluție iterativă.

## Recursivitate unică și cea multiplă

Atunci când chemi recursiv folosind un singur apel din funcția care era în execuție, se numește **recursivitate unică**, iar atunci când apelezi de mai multe ori în corp se numește **recursivitate multiplă**.

Pentru a exemplifica recursivitatea unică, vom factoriza un număr natural pozitiv:

```javascript
// n factorial: n! =  n * (n-1);
function fact (n) {
    if (n == 1) {
        return 1;
    }
    return n * fact(n - 1);
};
fact(4); // 4
```

Recursivitatea multiplă poate fi ilustrată prin calcularea numerelor din secvența Fibonancci.

```javascript
function fibonacci (x) {
  if (x < 2) {
    return x
  }
  return fibonacci (x - 1) + fibonacci (x - 2);
};
```

## Recursivitate tail

Recursivitatea are o mare problemă legată de numărul de frame-uri pe care le putem adăuga în stiva apelurilor. În cazul în care funcția recursivă este apelată de foarte multe ori, este în situația de a depăși limita de memorie alocată stivei apelurilor, fapt care conduce încheierea rulării printr-o eroare legată de *stack overflow*.

Frame-urile se vor adăuga până când *cazul de bază* va fi satisfăcut, moment în care valoarea este returnată rând pe rând frame-urilor care o așteaptă în ordine până la primul. Starea tuturor etapelor până la satisfacea *cazului de bază* este menținută prin înșiruirea frame-urilor. Acesta este cazul apelării recursive generale.

În cazul unei funcții tail recursive, apelul către sine însăși este ultimul lucru care se petrece.

În cazul unui apel tail-recursive, vom pasa funcției executate la fiecare etapă, un *acumulator* care să țină minte starea. Următorul exemplu explorează această optimizare.

```javascript
function tailRecursive (val) {
  function executant (val, acumulator) {
    // condiția ieșirii din recursivitate
    if (val === 0) return acumulator + 'sferă';
    // sarcina de lucru în care acumulatorul se îmbogățește ținând astfel în viață starea.
    // console.log(acumulator);
    //#3
    return executant(val - 1, acumulator + "sferă într-o "); // se află în tail position pentru că este ultimul lucru pe care-l execută
  }

  //#2
  return executant(val, "O sferă cu o "); // al doilea parametru este „cazul de bază”, adică valoarea inițială a acumulatorului
}

console.log(tailRecursive(5)); //#1
// O sferă cu o sferă într-o sferă într-o sferă într-o sferă într-o sferă într-o sferă
// sau comandă în Node.js
const numarExecutii = parseInt(process.argv[2]);
console.log(tailRecursive(numarExecutii)); // node nume_fisier.js 70000
```

Un *Tail Call Optimisation* este un apel al unei funcții (*tail recursive function*) la încheierea evaluării codului gazdei după care nimic nu mai trebuie evaluat. De fapt, este chiar ultimul lucru pe care funcția trebuie să-l facă.

Acest lucru implică faptul că ar fi posibil să apelezi o funcție dintr-o altă funcție fără ca stiva apelurilor să crească. Folosind exemplul de mai sus, primul frame va fi cel al apelului lui `tailRecursive` (`#1`) căruia îi pasăm limita și valoarea inițială a acumulatorului. Funcția va executa `executant` (`#2`) pasând limita și acumulatorul și astfel, se va crea cel de-al doilea frame în call stack. În acest moment, la finalul execuției lui `executant`, pentru că nu a fost întrunită condiția ieșirii din recursivitate, se va face return-ul, care va proceda la apelarea din nou ceea ce va crea al treilea frame în stiva apelurilor (`#3`). În acest moment, când execuția se va termina, pentru că funcția `executant`  (`#2`) a returnat, va fi eliminată din stack frame. Adu-ți aminte că o funcție care a returnat își încheie existența și memoria este eliberată. Cu ceea ce rămâi este un singur apel, ultimul care se face prin `return`, iar starea între etape este menținută de acumulator.

```javascript
function suntApelata (x) {
  return x;
}
function euApelez (y) {
  return suntApelata(y * 2); // TCO
}
function altApelant () {
  return 2 + suntApelata(2); // nu e TCO
}
```

Din nefericire, nu toate motoarele de JavaScript sunt optimizate pentru a oferi TCO. În acest moment, chiar dacă folosim TCO, vom lovi pragurile setate de call stack în cazul în care motorul nu are TCO.

Ne vom folosi de exemplul calculării seriei de numere Fibonancci, dar vom avea grijă să apelăm chiar la final funcția recursivă.

```javascript
// n factorial: n! =  n * (n-1);
function fact (numar, rezultat = 1) {
  console.trace();
  if (numar === 0) return rezultat;
  return fact(numar - 1, numar * rezultat); // Tail Call Optimisation
};
fact(4); // 24
```

Pentru a verifica dacă browserul are suport pentru TCO, verifică cu https://kangax.github.io/compat-table/es6/.

## Mantre

- O funcție pentru a putea fi recursivă, trebuie să conțină o condiție care să oprească ciclul de apeluri din corpul său. Dacă nu există o astfel de condiție, evaluarea va continua la infinit sau până la semnalarea unei erori `Stack overflow`.
- în cazul existenței parametrilor aceștia vor fi memorați în contextul de execuție pentru cei transmiși prin valoare (primitive), iar pentru cei transmiși prin referință (obiecte), se va memora adresa lor.

Un alt exemplu permite și o prelucrare a unor valori la fiecare apelare recursivă.
Aceasta folosește un ternar pentru test, un callback, iar atunci când testul nu este satisfăcut, se va evalua o întreagă expresie de forma `(functie recursivă, funcție de executat pentru fiecare ciclu)`, Ambele componente despărțite de virgulă vor fi evaluate la rândul lor, fiind returnată doar valoarea din partea dreaptă a virgulei conform efectului pe care-l are operatorul virgulă.

```javascript
const decrementor = (numar, functie) =>
  (numar > 0)
    ? (decrementor(numar - 1, functie), functie(numar))
    : undefined;
decrementor(3, function (x) {
  console.log(`Am ajuns la ${x}`);
});
```

1. declari o funcție fat arrow folosind o expresie. Funcția primește o valoare și un callback și returnează evaluarea unui ternar;
2. `numar` primește valoarea 3, iar `functie` primește ca valoare callback-ul;
3. se evaluează condiția și firul merge pe true (ciclul `#1`);
4. se va evalua expresia `(funcție recursivă, funcție de executat pentru fiecare ciclu)`;
5. se intră în evaluarea expresiei și se va evalua de la stânga la dreapta operanzii operatorului virgulă. Acest lucru conduce la execuția funcției din stânga virgulei;
6. execuția primului apel a lui decrementor este suspendată în stivă ceea ce va conduce ca apelul `functie(numar)` să nu mai fie făcut acum;
7. **controlul** este preluat de un nou apel `decrementor(numar - 1, functie)`;
8. `numar` primește valoarea 2, iar `functie` primește ca valoare callbackul;
9. se evaluează condiția și firul merge pe true (ciclul `#2`);
10. se va evalua expresia `(functie recursiva, functie de executat pentru fiecare ciclu)`;
11. se intră în evaluarea expresiei și se va evalua de la stânga la dreapta operanzii operatorului virgulă. Acest lucru conduce la execuția funcției din stânga virgulei;
12. execuția celui de-al doilea apel a lui decrementor este suspendată în stivă ceea ce va conduce ca apelul `functie(numar)` să nu mai fie făcut acum;
13. **controlul** este preluat de un nou apel `decrementor(numar - 1, functie)`;
14. `numar` primește valoarea `1`, iar `functie` primește ca valoare callbackul;
15. se evaluează condiția și firul merge pe true (ciclul `#3`);
16. se va evalua expresia `(functie recursivă, functie de executat pentru fiecare ciclu)`;
17. se intră în evaluarea expresiei și se va evalua de la stânga la dreapta operanzii operatorului virgulă. Acest lucru conduce la execuția funcției din stânga virgulei;
18. execuția celui de-al treilea apel a lui decrementor este suspendată în stivă ceea ce va conduce ca apelul `functie(numar)` să nu mai fie făcut acum;
19. **controlul** este preluat de un nou apel `decrementor(numar - 1, functie)`;
20. `numar` primește valoarea 0, iar `functie` primește ca valoare callbackul;
21. se evaluează condiția și firul merge pe `false`;
22. în acest moment, este returnat `undefined`;
23. controlul este redat execuției apelului de la ciclul `#3`. Chiar acum este executată expresia din partea dreaptă a virgulei. Valoarea lui `numar` este 1 și se va returna rezultatul evaluării acestei expresii. Se va afișa mesajul în consolă `Am ajuns la 1`;
24. după returnarea anterioară, evaluarea s-a încheiat iar controlul este redat apelului de la ciclul `#2`. Valoarea lui `numar` este 2 și se va returna rezultatul evaluării acestei expresii. Se va afișa mesajul în consolă `Am ajuns la 2`;
25. după returnarea anterioară, evaluarea s-a încheiat iar controlul este redat apelului de la ciclul `#1`. Valoarea lui `numar` este 3 și se va returna rezultatul evaluării acestei expresii. Se va afișa mesajul în consolă `Am ajuns la 3`;
26. se încheie execuția.

## Exemple de utilizare

Un exemplu ceva mai complex, care construiește un arbore de categorii și subcategorii dintr-o structură liniară. Exemplul a fost adaptat după cel oferit de **mpj** (Mattias Petter Johansson) în al său mic tutorial video: [Recursion - Part 7 of Functional Programming in JavaScript](https://www.youtube.com/watch?v=k7-N8R0-KY4)

```javascript
var colectie = [
  {cat: 'trunchi', parinte: null},
  {cat: 'ramura1', parinte: 'trunchi'},
  {cat: 'ramura2', parinte: 'trunchi'},
  {cat: 'frunza', parinte: 'ramura1'}
];

// #1 definirea unei funcții cu rol de a construi
// o structura arborescentă ce este returnată
var generator = function (colectie, parinte) {
  // #2 declara obiectul care va fi returnat
  var nod = {};

  // #3 filtram colectia și căutăm elementul rădăcină mai întâi
  colectie
    .filter(function (obi) {
      return obi.parinte === parinte; // daca parinte este null, (true)
    })                                // returnează obiectul cu parinte: null
    .forEach(function (obi) {         // pe obiectul returnat {cat: 'trunchi', parinte: null} fă un forEach
      return nod[obi.cat] = generator(colectie, obi.cat); // introdu în obiectul nod numele categoriei și aplică din nou funcție
    });                               // de aceasta dată pasand originea, adica parintele, numele categoriei din obiectul provenit prin filter

  return nod;
};

console.log(JSON.stringify(generator(colectie, null), null, 2)); // apelează generatorul pasând colecția si elementul radacină, cel care are părintele null
```

## Simularea unei metode map

Poți folosi principiul recursivității pentru a reconstrui funcționalitatea lui `Array.prototype.map`:

```javascript
let arr = [1, 2, 3], func = (el) => ++el ;
function mapper (func, arr) {
  if(arr.length === 0){
    return [];
  };
  return [func([arr[0]])].concat(mapper(func, arr.slice(1)));
};
mapper(func, arr); // [ 2, 3, 4 ]
```

## Resurse

-   [Programming Loops vs Recursion - Computerphile](https://www.youtube.com/watch?v=HXNhEYqFo0o)
-   [What on Earth is Recursion? - Computerphile](https://www.youtube.com/watch?v=Mv9NEXX1VHc)
-   [The Most Difficult Program to Compute? - Computerphile](https://www.youtube.com/watch?v=i7sm9dzFtEI)
-   [Recursion, Iteration, and JavaScript: A Love Story - Anjana Vakil | JSHeroes 2018](https://www.youtube.com/watch?v=FmiQr4nfoPQ)
-   [Improve Your Recursions Performance With Tail Call Optimization](https://ireadyoulearn.info/2020/09/19/improve-your-recursions-performance-with-tail-call-optimizations/)
