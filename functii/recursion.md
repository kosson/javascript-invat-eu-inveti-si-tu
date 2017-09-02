# Recursivitate

Alternativa la procesele repetitive, la ciclurile iterative realizate cu buclele este recursivitatea. Recursivitatea nu implică conceptul de ciclu. Este o funcție care se apelează pe sine însăși până când lovește o limită.

Capacitatea unei funcții de a se apela pe sine însăși conduce la efecte interesante atunci când vorbim despre parcurgerea unor calupuri de date. În cel mai simplu scenariu vorbim de faptul că funcția va executa același set de instrucțiuni până la epuizarea unei condiții setată în apel.

O posibilă reprezentare mentală ar fi un olar zăpăcit care se pune la roată să facă un vas. Începe să rotească roata, începe modelatul lutului, dar ajunge la concluzia că nu poate termina pentru că nu mai are lut. În acest moment, se ridică de la roată, dă o fugă la magazie, mai ia un căuș de lut și se întoarce. Se pune la roată din nou, adaugă lutul adus peste cel existent și pornește din nou modelarea. Ajunge din nou în situația să mai aducă lut pentru a termina. Se ridică de la roată, merge la magazie, aduce lutul pentru a completa și așezându-se la roată, după o nouă sesiune de modelare, ajunge la rezultatul final.
Să-i spunem olarului nostru Ilieș. Dacă lui Ilieș îi place să vorbească cu sine atunci când lucrează, fie în gând, fie cu glas tare, cu siguranță am remarca că atunci când constata lipsa lutului, își spunea sie: „Ilieș, ia de te scoală și mergi la cămară de mai adu lut”.
Cam așa e și cu recursivitatea. E ca Ilieș care se apelează singur să facă ceva.

Ține minte că în cazul recursivității, fiecare operațiune, adică fiecare nouă apelare este **subordonată** pasului anterior.

Exemplu simplu:

```javascript
var scad = function(numar){
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
2. se evaluează condiția și firul merge pe true (ciclul `#1`)
3. se va evalua expresia `(functie recursiva, functie de executat pentru fiecare ciclu)`
4. se intră în evaluarea expresiei și se va evalua de la stânga la dreapta operanzii operatorului virgulă. Acest lucru conduce la execuția funcției din stânga virgulei
5. execuția primului apel a lui decrementor este suspendată în stivă ceea ce va conduce ca apelul `functie(numar)` să nu mai fie făcut acum
6. **controlul** este preluat de un nou apel `decrementor(numar - 1, functie)`
7. `numar` primește valoarea 2, iar `functie` primește ca valoare callbackul
8. se evaluează condiția și firul merge pe true (ciclul `#2`)
9. se va evalua expresia `(functie recursiva, functie de executat pentru fiecare ciclu)`
10. se intră în evaluarea expresiei și se va evalua de la stânga la dreapta operanzii operatorului virgulă. Acest lucru conduce la execuția funcției din stânga virgulei
11. execuția celui de-al doilea apel a lui decrementor este suspendată în stivă ceea ce va conduce ca apelul `functie(numar)` să nu mai fie făcut acum
12. **controlul** este preluat de un nou apel `decrementor(numar - 1, functie)`
13. `numar` primește valoarea 1, iar `functie` primește ca valoare callbackul
14. se evaluează condiția și firul merge pe true (ciclul `#3`)
15. se va evalua expresia `(functie recursivă, functie de executat pentru fiecare ciclu)`
16. se intră în evaluarea expresiei și se va evalua de la stânga la dreapta operanzii operatorului virgulă. Acest lucru conduce la execuția funcției din stânga virgulei
17. execuția celui de-al treilea apel a lui decrementor este suspendată în stivă ceea ce va conduce ca apelul `functie(numar)` să nu mai fie făcut acum
18. **controlul** este preluat de un nou apel `decrementor(numar - 1, functie)`
19. `numar` primește valoarea 0, iar `functie` primește ca valoare callbackul
20. se evaluează condiția și firul merge pe false
21. în acest moment, este returnat `undefined`
22. controlul este redat execuției apelului de la ciclul `#3`. Chiar acum este executată expresia din partea dreaptă a virgulei. Valoarea lui `numar` este 1 și se va returna rezultatul evaluării acestei expresii. Se va afișa mesajul în consolă `Am ajuns la 1`.
23. după returnarea anterioară, evaluarea s-a încheiat iar controlul este redat apelului de la ciclul `#2`. Valoarea lui `numar` este 2 și se va returna rezultatul evaluării acestei expresii. Se va afișa mesajul în consolă `Am ajuns la 2`.
24. după returnarea anterioară, evaluarea s-a încheiat iar controlul este redat apelului de la ciclul `#1`. Valoarea lui `numar` este 3 și se va returna rezultatul evaluării acestei expresii. Se va afișa mesajul în consolă `Am ajuns la 3`.
25. Se încheie execuția.

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

console.log(JSON.stringify(generator(colectie, null), null,2)); // apeleaza generatorul pasand colectia si elementul radacina, cel care are părintele null
```

## Simularea lui map

Poți folosi principiul recursivității pentru a reconstrui funcționalitatea lui `Array.prototype.map`:

```javascript
let arr = [1, 2, 3], func = (el) => ++el ;
function mapper(func, arr){
  if(arr.length === 0){return [];};
  return [func([arr[0]])].concat(mapper(func, arr.slice(1)));
}; mapper(func, arr); // [ 2, 3, 4 ]
```
