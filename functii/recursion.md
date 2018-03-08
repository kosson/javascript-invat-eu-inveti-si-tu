# Recursivitate

În literatură recursivitatea mai este numită și **recurență**.

Alternativa la procesele repetitive, la ciclurile iterative realizate cu buclele este **recursivitatea**. Recursivitatea nu implică conceptul de ciclu. Este o funcție care se apelează pe sine însăși până când lovește o limită.

Capacitatea unei funcții de a se apela pe sine însăși conduce la efecte interesante atunci când vorbim despre parcurgerea unor calupuri de date. În cel mai simplu scenariu vorbim de faptul că funcția va executa același set de instrucțiuni până la epuizarea unei condiții setată în apel.

Ține minte că în cazul recursivității, fiecare operațiune, adică fiecare nouă apelare este **subordonată** pasului anterior și creează un cadru nou de execuție în stiva de apeluri.

Exemplu simplu:

```javascript
function scad (numar) {
  if(numar === 0) return; // limita de repetare a apelului
  console.log(numar);     // ce face efectiv funcția
  scad(numar - 1);        // mecanismul de tip contor
}; scad(10);
```

Cum funcționează:

1. declari o funcție printr-o expresie care ia un argument
2. se creează variabila internă „număr” cu valoarea 10
3. se testează condiția de ieșire din execuția funcției
4. dacă condiția nu este satisfăcută, se mai aplează o dată funcția
5. de aceasă dată la argument se introduce expresia care transformă
6. este evaluată expresia și noua valoare va fi valoarea lui număr
7. Ciclul inițiat la pasul 3 se reia până când valoarea evaluată la argument satisface condiția.
8. La satisfacerea condiției se iese din execuția primului apel scad()

Varianta ECMAScript 2015 folosind un *fat arrow*:

```javascript
var scad = (numar) => {
  if(numar === 0) return;
  console.log(numar);
  scad(numar - 1);
}; scad(10);
```

Atunci când chemi recursiv folosind un singur apel din funcția care era în execuție, se numește **recursivitate unică**, iar atunci când în primul apel apelezi de mai multe ori în corp se numește **recursivitate multiplă**.

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
  return fibonacci (x - 1) + fibonacci (n - 2)
};
```

Primul contact cu această secvență de cod a fost atunci când ți-am atâțat curiozitatea la iterațiile cu `for`. Pentru că o funcție decursivă poate fi rezolvată și printr-o procedură iterativă se numește **recursivitate primitivă**.

## Mantre

- O funcție pentru a putea fi recursivă, trebuie să conțină o condiție care să oprească ciclul de apeluri din corpul său. Dacă nu există o astfel de condiție, evaluarea va continua la infinit sau până la semnalarea unei erori `Stack overflow`.
- în cazul existenței parametrilor aceștia vor fi memorați în contextul de execuție pentru cei trasmiși prin valoare (primitive), iar pentru cei transmiși prin referință (obiecte), se va memora adresa lor.

Un alt exemplu permite și o prelucrare a unor valori la fiecare apelare recursivă.
Aceasta folosește un ternar pentru test, un callback, iar atunci când testul nu este satisfăcut, se va evalua o întreagă expresie de forma `(functie recursiva, functie de executat pentru fiecare ciclu)`, Ambele componente despărțite de virgulă vor fi evaluate la rândul lor, fiind returnată doar valoarea din partea dreaptă a virgulei conform efectului pe care-l are operatorul virgulă.

```javascript
const decrementor = (numar, functie) =>
  (numar > 0)
    ? (decrementor(numar - 1, functie), functie(numar))
    : undefined;
decrementor(3, function (x) {
  console.log(`Am ajuns la ${x}`);
});
```

1. declari o funcție fat arrow folosind o expresie. Funcția primește o valoare și un callback și returnează evaluarea unui ternar
2. `numar` primește valoarea 3, iar `functie` primește ca valoare callbackul
3. se evaluează condiția și firul merge pe true (ciclul `#1`)
4. se va evalua expresia `(functie recursiva, functie de executat pentru fiecare ciclu)`
5. se intră în evaluarea expresiei și se va evalua de la stânga la dreapta operanzii operatorului virgulă. Acest lucru conduce la execuția funcției din stânga virgulei
6. execuția primului apel a lui decrementor este suspendată în stivă ceea ce va conduce ca apelul `functie(numar)` să nu mai fie făcut acum
7. **controlul** este preluat de un nou apel `decrementor(numar - 1, functie)`
8. `numar` primește valoarea 2, iar `functie` primește ca valoare callbackul
9. se evaluează condiția și firul merge pe true (ciclul `#2`)
10. se va evalua expresia `(functie recursiva, functie de executat pentru fiecare ciclu)`
11. se intră în evaluarea expresiei și se va evalua de la stânga la dreapta operanzii operatorului virgulă. Acest lucru conduce la execuția funcției din stânga virgulei
12. execuția celui de-al doilea apel a lui decrementor este suspendată în stivă ceea ce va conduce ca apelul `functie(numar)` să nu mai fie făcut acum
13. **controlul** este preluat de un nou apel `decrementor(numar - 1, functie)`
14. `numar` primește valoarea `1`, iar `functie` primește ca valoare callbackul
15. se evaluează condiția și firul merge pe true (ciclul `#3`)
16. se va evalua expresia `(functie recursivă, functie de executat pentru fiecare ciclu)`
17. se intră în evaluarea expresiei și se va evalua de la stânga la dreapta operanzii operatorului virgulă. Acest lucru conduce la execuția funcției din stânga virgulei
18. execuția celui de-al treilea apel a lui decrementor este suspendată în stivă ceea ce va conduce ca apelul `functie(numar)` să nu mai fie făcut acum
19. **controlul** este preluat de un nou apel `decrementor(numar - 1, functie)`
20. `numar` primește valoarea 0, iar `functie` primește ca valoare callbackul
21. se evaluează condiția și firul merge pe false
22. în acest moment, este returnat `undefined`
23. controlul este redat execuției apelului de la ciclul `#3`. Chiar acum este executată expresia din partea dreaptă a virgulei. Valoarea lui `numar` este 1 și se va returna rezultatul evaluării acestei expresii. Se va afișa mesajul în consolă `Am ajuns la 1`.
24. după returnarea anterioară, evaluarea s-a încheiat iar controlul este redat apelului de la ciclul `#2`. Valoarea lui `numar` este 2 și se va returna rezultatul evaluării acestei expresii. Se va afișa mesajul în consolă `Am ajuns la 2`.
25. după returnarea anterioară, evaluarea s-a încheiat iar controlul este redat apelului de la ciclul `#1`. Valoarea lui `numar` este 3 și se va returna rezultatul evaluării acestei expresii. Se va afișa mesajul în consolă `Am ajuns la 3`.
26. Se încheie execuția.

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
var generator = function(colectie, parinte){
  // #2 declara obiectul care va fi returnat
  var nod = {};

  // #3 filtram colectia și căutăm elementul rădăcină mai întâi
  colectie
    .filter(function(obi){
      return obi.parinte === parinte; // daca parinte este null, (true)
    })                                // returnează obiectul cu parinte: null
    .forEach(function(obi){           // pe obiectul returnat {cat: 'trunchi', parinte: null} fă un forEach
      return nod[obi.cat] = generator(colectie, obi.cat); // introdu în obiectul nod numele categoriei și aplică din nou funcție
    });                               // de aceasta dată pasand originea, adica parintele, numele categoriei din obiectul provenit prin filter

  return nod;
};

console.log(JSON.stringify(generator(colectie, null), null, 2)); // apeleaza generatorul pasand colectia si elementul radacina, cel care are părintele null
```

## Simularea lui map

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

- [Programming Loops vs Recursion - Computerphile](https://www.youtube.com/watch?v=HXNhEYqFo0o)
- [What on Earth is Recursion? - Computerphile](https://www.youtube.com/watch?v=Mv9NEXX1VHc)
- [The Most Difficult Program to Compute? - Computerphile](https://www.youtube.com/watch?v=i7sm9dzFtEI)