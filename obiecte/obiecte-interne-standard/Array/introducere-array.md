# Array

Este un obiect intern care are și rol de constructor. În literatura românească de specialitate veți întâlni adesea denumirea de *tablou*. Pentru că este mai simplu și în obișnuința multor programatori români să folosească termenul din engleză ca neologism acceptat de practica curentă, vom folosi și în acest material neologismul **array**. În comunitatea profesională array-ul mai este întâlnit și sub denumirea de *listă* sau *vector*.

Array-urile sunt o bornă centrală a programării, indiferent de limbaj. Acestea permit stocarea temporară a unor valori într-o formă ușor accesibilă folosind indecși, dar cel mai important aspect este bogăția metodelor puse la dispoziție de obiectul intern `Array` pentru a prelucra, aranja, rearanja și filtra elementele conținute de array-uri. Ori de câte ori veți lucra cu valori primare veți folosi cu siguranță array-urile. Array-urile mai pot fi folosite și ca structuri de *depozitare* a obiectelor și funcțiilor. De exemplu, poți constitui un registru pentru elemente DOM cărora le asociezi câte un un eveniment sau alte funcționalități oferite de API-ul browserului. Array-ul este cel mai des întâlnit mecanism de a *prelua* date care vin ca efect a evaluării unei funcții sau a unei metode.

Această structură capabilă să țină valori este cea mai utilizată atunci când suntem confruntați cu nevoia de a prelucra fragmente de date sau pentru a *memora* temporar valorile utile unui anumit context în care se execută codul.

**Spune standardul**:

> Valoarea slotului intern [\[Prototype\]\] al constructorului `Array` este obiectul prototype al obiectul intern `Function`. Obiectul prototype al lui `Function` este în sine un obiect-funcție intern.

## Natura unui array

### Descriere

Array-urile conțin mai multe valori numite `elemente`, care sunt ordonate cu niște chei de identificare numite indecși. Numărătoarea elementelor pornește de la `0`. Tipologic vorbind, un array este un obiect (verifică cu `typeof`).

```javascript
typeof []; // "object"
```

Pentru a verifica dacă un identificator este o referință către un obiect array, vom folosi metoda `isArray()`.

```javascript
let colectie = [1, 2, 3];
Array.isArray(colectie); // true
// o curiozitate, obiectul prototipal
// este confirmat de această metodă
// ca array
Array.isArray(Array.prototype); // true
```

Un array este o structură care poate „agrega” date indiferent de tipul lor. Indecșii nu trebuie menționați explicit fiind o atribuire automată. Numărul maxim de elemente este `2^23 - 1`.

Pentru a introduce o valoare la un anumit index dorit, se va folosi sintaxa cu paranteze pătrate.

```javascript
var colectie = [];
colectie[0] = 'el1';
colectie[1] = 'el2';
colectie[2] = 'el3';
```

Structura generată arată astfel:

| valoare | el1 | el2 | el3 |
|---------|:---:|:---:|:---:|
| index   |  0  |  1  |  2  |

Acest lucru conduce la concluzia logică că numărul elementelor unui array va fi valoarea ultimului index plus unu. Poți afla dimensiunea unui array utilizând proprietatea `length`, iar valoarea ultimului index este `length - 1`.

```javascript
[1, 2, 3].length; // 3
```

### Ce poți introduce în array

Am lămurit deja faptul că un array este un obiect care ordinează elementele folosind un index. Pe cale de consecință, putem introduce orice valoare într-un array. Valorile simple vor fi pasate direct, iar valorile care sunt obiecte, vor fi pasate prin referință. Dacă ai nevoie de o structură a cărei elemente să răspundă propriei tale scheme de adresare, vei folosi obiectele în mod direct. Pentru că standardul a evoluat, acum avem suplimentar o nouă structură de agregare a datelor numită `Map`. Ce aduce nou față de array-uri și obiectele simple? Posibilitatea de a avea perechi cheie - valoare cu diferența îmbucurătoare că pentru chei poți folosi, fie valori primitive, fie obiecte.
Array-ul își păstrează valoarea pentru că oferă o structură de adresare organizată din start prin structura fixă a indecșilor.

### Mediile lexicale

Dincolo de simplitatea adăugării unui element, ar fi necesar să vedem cum se petrece acest lucru în cazul mediilor lexicale (*scope*) create de funcții. Avem un prim caz, unde, în mediul lexical format de o funcție, se face o reatribuire a identificatorului (în engleză îi spune *rebounding*). Până la momentul reatribuirii, trimitea tot către **arr**. Ceea ce s-a petrecut este o schimbare la nivel de funcție a referinței. Chiar dacă a fost trimis drept argument array-ul `arr`, prin atribuirea identificatorului `a`, care este intern funcției, cu un alt array, s-a pierdut referința la cel pasat.

```javascript
let arr = [1, 2, 3];
(function (a) {
  a = [2, 3, 4];
})(arr);
console.log(arr); // [1, 2, 3]
```

Dacă dorești, poți modifica valoarea elementelor interne ale array-ului extern funcției, folosind sufixul `[]`. În acest caz, referința este păstrată către obiectul array original. Nu va mai fi creat un nou obiect array în mediul lexical al funcției.

```javascript
var arr = [1, 2, 3];
(function (a) {
  a[0] = 10;
})(arr); console.log(arr);
// [ 10, 2, 3 ]
```

În cazul array-urilor, valorile sunt copiate prin referință pentru că array-urile sunt, de fapt obiecte. Din acest fapt putem trage câteva concluzii utile. Cu ajutorul unei funcții externe array-ului poți modifica valorile interne ale unui array. Pasarea unui array unei funcții drept argument, conduce la crearea unei referințe în mediul lexical către acel obiect array. Un alt lucru util de reținut este faptul că un array poate fi foarte bine o colecție de funcții. Acestea, de fapt sunt referințe către obiectele funcții, nu sunt funcțiile în sine. Singurul lucru care face diferența este modul de acces la funcțiile respective folosindu-se sintaxa specifică array-ului.

```javascript
function faCeva () {
  return function () {
    console.log('salut');
  };
};
var actiune = faCeva();
// actiune este funcția returnată
var arr = [actiune];
// acum testul
arr[0] === actiune; // true
```

Rezultatul este `true` pentru că valoarea evaluată a expresiei `arr[0]` este `actiune`, care la rândul său ține valoarea evaluată a invocării lui `faCeva()`.

### Lanțul prototipal al unui array

Uneori este necesar să afli care este prototipul unei colecții de care nu ești sigur că este array curat sau array-like (*asemănător-cu-array*) - o entitate care are caracteristici apropiate de un array.

```javascript
let tablou = ['prima', 'a doua', 1, 2];
let protoTablou = Object.getPrototypeOf(tablou);
protoTablou; // Array [  ]
let protoLaProtoTablou = Object.getPrototypeOf(protoTablou);
protoLaProtoTablou; // Object { , 15 more… }
Object.getPrototypeOf(protoLaProtoTablou); // null
```

Structura lanțului ar fi: `array` --> `Array.prototype` --> `Object.prototype` --> `null`.

Colecțiile care sunt **asemănătoare-cu-array-urile** (array-like), vor avea un lanț mult mai scurt care-l indică la capăt pe `Object`.

Structura lanțului ar fi: `arrayLike` --> `Object.prototype` --> `null`.

## Manipulare elemente

### Modificarea elementelor

Array-urile sunt structuri care își pot modifica componența, chiar dacă identitatea rămâne neschimbată și spunem că pot suferi *mutații*. Am folosit parentezele pătrate pentru a introduce noi elemente la indexul dorit, dar putem folosi același sufix (`[]`) pentru a modifica aceste elemente interne.

```javascript
let arr = [1, 2];
arr[1] = 5; console.log(arr); // [1, 5]
```

### Ștergerea elementelor din array

Această metodă creează *goluri* în array. Proprietatea `length` nu va fi afectată.

```javascript
let tablou = [1, 2, 3, 4];
delete tablou[2];
console.log(tablou);
// Array [ 1, 2, <1 empty slot>, 4 ]
```

### Șterge toate elementele

Dacă este necesar, putem șterge toate valorile din array, reasignând identificatorul inițial cu un array gol.

```javascript
let colectie = [1, 2];
console.log(colectie);
colectie = [];
console.log(colectie);
```

În regulă, ai introdus sau ai deja un array cu valori, dar ai nevoie să ștergi din acest array o valoare. Pentru acest lucru există un operator dedicat: `delete`.

```javascript
delete colectie[2];
```

Uneori array-urile sunt compuse de elemente, care la rândul lor sunt array-uri. În acest caz vorbim de array-uri multidimensionale.

```javascript
var multidimensional = [[23, 10, 4],['a','b']];
```

Întrebarea care se pune în acest moment este cum accesezi o valoare dintr-un array care este de fapt un element al unui array? Pentru a răspunde acestei întrebări trebuie să ne imaginăm locația unei valori ca pe o adresă: *Botoșani, Str. Uverturii, Nr. 90*. Ce-ar fi dacă am transcrie adresa ca pe o interogare într-un array în JavaScript? Ar fi așa: `adresa[Botoșani][Uverturii][90]`. Nu fi păcălit de structura liniară a sintaxei. De fapt, se face o accesare în adâncime a unei locații, ca și cum am desface o păpușă rusească Matrioșca.

```javascript
var multidimensional = [['unu','doi',[1, 2]], true];
multidimensional[0][2][1]; // 2
```

Un bun exemplu, care să dovedească utilitatea unui array multidimensional, ar fi sistemul de coordonate cartezian. Dacă am asemui array-urile cu matricile, am găsi că array-urile multidimensionale seamănă cu matricile de matrici.

Un array poate conține și expresii care **vor fi evaluate** înainte vreme ca array-ul să fie folosit.

```javascript
var arr = [1 + 2, 4, (2 - 1) + 2]; console.log(arr); // [ 3, 4, 3 ]
```

**Moment Zen**: fiecare array este în sine o entitate distinctă pentru că fiecare array este un obiect.

```javascript
[1, 2, 3] === [1, 2, 3]; // false
['a', 'b', 'c'] === ['a', 'b', 'c']; // false
```

![](ArrayMap.png)

### Indecșii negativi

Indecșii care sunt numere negative vor fi considerați chei pentru valorile introduse în obiectul `Array`. Acestlucru este posibil pentru că natura unui array este a unui obiect.

```javascript
var tablou = [];
tablou[-1] = 'ceva în afară';
console.log(tablou); // Array [ ]
tablou[-1];          // ceva în afară
```

## Verificări și căutări

Am indicat mai sus faptul că verificarea unui array cu `typeof` are drept rezultat tipul obiect. Deci este clară natura adâncă a acestui tip de structură. Ar fi foarte util de verificat în lucrul cu array-uri dacă există un anume index și mai ales care este valoarea indexului pentru o anumită valoare?

### Existența unui index

Pentru a verifica dacă un index există în array, poți folosi operatorul `in` pentru că un array, de fapt, este un obiect, iar indecșii sunt cheile lui. Operatorul `in` detectează dacă pentru un anumit index, există o valoare în array.

```javascript
var tablou = [0, 1, , 2, 4, "unu"];
3 in tablou; // true
2 in tablou; // false
```

### Existența unei valori

Pentru aceeași verificare poți folosi și metoda dedicată `includes()`. Acesteia îi pasezi la argumente valoarea pe care o cauți. Răspunsul va fi `true` sau `false`.

```javascript
['a', 'b', 'c'].includes('b'); // true
```

### Indexul unui element cunoscut

Apoi dacă ai verificat că o cheie există, poți obține indexul pentru o valoare știută. Elementele array-ului sunt parcurse secvențial până la găsirea valorii pentru care se dorește obținerea indexului.

```javascript
['a', 'b', 'c'].indexOf('b'); // 1
```

### Căutări de valori sau index

Pentru a face căutări avem la dispoziție două metode:

-   metoda `find()` și
-   metoda `indexOf()`.

În cazul utilizării lui `find()`, dacă elementul există în array, metoda returnează chiar elementul folosind o funcție callback, iar în caz contrar, returnează `undefined`. Cazul metodei `indexOf()` este în oglindă cu diferența că este returnat indexul la care se află valoarea.

```javascript
const colecție = ['a', 'b', 'c'];
let căutare = colecție.find(function (valoarea) {
    if (valoarea === 'b') {
      return valoarea;
    };
});
console.log(căutare); // b
// variantă cu funcție fat arrow
let cautC = colecție.find( (elem) => elem === 'c');
console.log(cautC);
```

În cazul în care elementul nu este găsit, este returnat `undefined`.

## Crearea array-urilor

Obiectele array oferă programatorului o flexibilitate extraordinară, care permite crearea nuanțată a acestor structuri în funcție de necesități și de conjuncturi. Vom trece în revistă câteva dintre modalitățile de a crea array-uri de la generarea unuia gol, gata să primească date, până la array-uri care sunt create cu anumite constrângeri de performanță și / sau utilitate.

### Crearea unui array literal

Cel mai adesea vei întâlni array-uri create prin forma literală mult mai simplă ca practică (`[]`).

```javascript
let colectie = [];
```

Este practică curentă ca un programator să *captureze* valorile rezultate dintr-o iterație, de exemplu într-un array gol. Astfel, de foarte multe ori veți vedea array-uri goale lângă structuri de iterare. Acestea sunt acolo pentru a fi *îndesate* cu valorile rezultate.

Uneori, din motive practice de inițializare a unei structuri de procesare a datelor cu valori de test (fi și numai o funcție simplă), sunt create array-uri literale care vor servi drept colecții de lucru.

```javascript
let colectie = [1, 2, 3];
```

Dacă nu sunt menționate elementele array-ului, acesta va fi constituit din locuri goale, exact ca o sală de teatru goală. Toate scaunele poartă un număr, dar nu este nimeni așezat pe ele. Pentru introducerea elementelor într-un array, se va folosi metoda `push(elemVal)`, care va „împinge” valorile.

```javascript
let colectie = [];
colectie.push('el1');
colectie.push('el2');
colectie.push('el3');
```

### Folosind constructorul: `new Array()`

Alternativa la folosirea formei literale este oferită de constructor. Să nu uităm nicio clipă faptul că `Array` este un constructor, de fapt. Din motive de performanță, această practică este evitată în lucrul de zi cu zi. L-am amintit pentru că este însuși contructorul.

```javascript
var tablou = new Array('abc','def');
console.log(tablou); // Array [ "abc", "def" ]
```

Dacă ai ales o astfel de practică, cea a lucrului cu funcția constructor, poți să-l folosești pentru a prestabili dimensiunea array-ul. Dacă se poate, acest lucru conduce la eficientizarea alocării memoriei pentru array-uri. Mai poți face acest lucru specificând dimensiunea cu ajutorul proprietății `length`, precum în `colecție.length = 5`. Mai departe, vom vedea că o soluție, care ar trebui să primeze, este aceea a utilizării metodei `fill()`. Dar să vedem contructorul la lucru:

```javascript
var test = new Array(5);
console.log(test);
```

S-a creat astfel un array cu cinci spații goale. Efectul este crearea unui array cu un număr fix de elemente, ceea ce ar fi de dorit ca și practică generală din motive de optimizare a performanțelor codului la momentul execuției. Preferabil, fă acest lucru prin utilizarea lui `fill()`.

Mai este un caz al folosirii constructorului în ceea ce privește crearea unui array. Când ai nevoie de un array cu valori prestabilite. Spunem că un astfel de array prepopulat este unul *dens*.

![](operatiuniArrayuri.svg)

### Array-uri dense cu `apply()`

Acesta este un truc pentru a genera array-uri de o dimensiune fixă, dar care, în loc de elemente vide la inițiere, va fi populat cu valori `undefined`. Se folosește `Function.prototype.apply()`, care se poate invoca direct pe `Array` pentru că și `Array`, de fapt este o funcție. Cu rol de contructor, dar o funcție fără niciun dubiu, având acces la `apply()`. Pentru aceasta, contextul va fi obiectul global (în cazul browserului este `window`) sau la `null`. Drept argumente, va fi invocat `apply()` pasându-i-se numărul de elemente dorit:

```javascript
Array.apply(window, Array(5));
// Array [ undefined, undefined, undefined, undefined, undefined ] echivalent cu Array(5).fill()
Array.apply(null, Array(5));
// Array [ undefined, undefined, undefined, undefined, undefined ]
Array.apply(window, [1,,3]);
// Array [ 1, undefined, 3 ]

Array.apply(window, Array(5)).map(function (x, y) {
  return y + 1;
}); // [1, 2, 3, 4, 5]
Array.apply(null, Array(5)).map(Function.prototype.call.bind(Number)); // [0,1,2,3,4,5]

Array.apply(window, Array(26))
     .map( function (x,y){ return String.fromCharCode(y + 65); })
     .join(''); // "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// si versiunea ECMAScript 2015
[ for (i of Array.apply(window, Array(26)).map((x, y) => y))String.fromCharCode(65 + i) ].join(''); // "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
```

Acesta este un pont de la Brandon Benvie descoperit prin intermediul articolului lui Ariya Hidayat, [Sequences using JavaScript Array](https://ariya.io/2013/07/sequences-using-javascript-array).

Să facem pasul în perioada modernă a limbajului nostru. Ultima iterație a standardului oferă metoda `fill()` pentru a crea array-uri dense (vezi `Array.prototype.fill()`). Cu `fill()` se pot crea array-uri dense care să conțină valori prestabilite, dacă se dorește:

```javascript
[1, 2, 3].fill();
// Array [ undefined, undefined, undefined ]
// echivalent cu Array(3).fill()
Array(3).fill(4); // [4, 4, 4]
[].fill.call({ length:2, ceva:1 }, `0` + `1`);
// {'0':'01', '1':'01', length: 2, ceva: 1}
```

Ultimul caz din seria de exemple de mai sus, se poate dovedi foarte util în practică. Să presupunem că dorești să generezi un obiect prepopulat cu valori. Acest obiect va avea la bază, printre alți membri, o pereche cheie:valoare, care va fi folosit drept indicator al dimensiunii array-ului. Ceea ce se va petrece este că aplicarea lui `fill`, care este aplicat obiectului sămânță în care găsește valoarea dimensiunii viitorului array, va conduce la „umplerea” obiectului cu tot atâția noi membri câți au fost specificați de `length`. Singura limitare este că identificatorii cheilor vor fi indecșii. Valorile care vor popula cheile obiectului, pot fi expresii sau valori simple.

### Crearea unui array multidimensional

Realizarea array-urilor multidimensionale sau ceea ce în literatură se mai numește array de array-uri. Putem porni de la un array gol și folosind o structură iterativă imbricată (în interiorul primei, mai introducem una), populăm array-ul cu valori.

```javascript
var arrDeArr = [];                                                   // array-ul care le va conține pe celelalte (un array de array-uri)
for(var contorRanduri = 0; contorRanduri < 3; contorRanduri++) {     // adaugă în array-ul randuri
    arrDeArr[contorRanduri] = [];                                    // cate un array
    for (var contorColoane=0; contorColoane < 3; contorColoane++) {  // generat de bucla interna (ruleaza de 3 ori pentru fiecare iteratie externa)
      arrDeArr[contorRanduri][contorColoane] = '0';
      // cu indexul setat de bucla externă (o singura valoare pentru 3 iteratii interne)
      // și cu 3 indexuri generate intern pentru care atribuie o valoare
    }
};
arrDeArr[0][2] = 'X';  // Arata ca o adresă [rând][coloană]
arrDeArr.forEach(function (arrDeArr) {
  console.log(arrDeArr.join(' '));
});
```

Exemplul de mai sus este perfect echivalent cu următoarea structură de cod introdusă cu un literal.

```javascript
var arrDeArr = [ ['0','0','X'], ['0','0','0'], ['0','0','0'] ];
```

### Copierea unui array

Știm faptul că array-urile sunt obiecte. Obiectele sunt pasate prin referință, însemnând că nu poți copia un array pur și simplu atribuindu-l altui identificator.

```javascript
let colectie = [1, 2];
let alta = colectie;
console.log(colectie === alta);
```

Totuși, dacă se dorește o copiere verbatim a unui array, soluția este constituirea unui nou prin utilizarea metodei `slice()` aplicată array-ului pe care dorești să-l copiezi.

```javascript
let colectie = ["a", "b"];
let alta = colectie.slice();
console.log(alta);
```

Dacă un array are obiecte drept elemente dacă am copia acel array, de fapt am face o copie la referințele către obiecte. În limba engleză vom întâlni această situație cu denumirea *shallow copy* - **copie subțire**.

## Manipularea dimensiunii

### Folosirea proprietății `length`

Proprietatea `length` numără toate elementele array-ului, chiar dacă acestea au și goluri.

```javascript
let tablou = [0, 1, , 3]; // conține un element lipsă
tablou.length;            // 4
```

Pentru a număra câte elemente chiar există în array se poate scrie o funcție specializată:

```javascript
let tablou = [0, 1, , 3];
function numaraElementeReale (date) {
  let contor = 0;
  date.forEach( function () {
    contor++;
  });
  return contor;
};
numaraElementeReale(tablou); // 3
```

### Creșterea lungimii array-ului

```javascript
const tablou = ['x', 'y'];
tablou.length = 3;
```

În acest moment ceea ce s-a întâmplat este că a fost introdus un slot gol în array.

### Scăderea dimensiunii unui array menționând `length`

Se poate face simplu prin:

```javascript
const tablou = ['unu', 'doi', 'trei', 'patru'];
tablou.length;        // 4
tablou.length = 2;
tablou.length;        // 2
console.log(tablou);  // Array [ "unu", "doi" ]
```

### Curățarea unui array cu resetarea sa la zero.

Versatilitatea lui `length` merge mai departe, oferind posibilitatea de a reseta la `0` un array.

```javascript
var tablou = ['unu', 'doi', 'trei', 'patru'];
tablou.length;        // 4
tablou.length = 0;
console.log(tablou);  // Array [  ]
// mai simplu este suprascrierea cu un array gol
tablou = [];
```

Resetarea array-urilor la `0` - cele referite de altele. Există o variantă distructivă și una nedistructivă.
Resetarea la `0` a array-urilor, dacă se face cu `length`, va avea același efect și pentru toate referințele la acel array. Cine va accesa o referință, va descoperi uimit că este `0`.

```javascript
var tablou = ['prima', 'a doua'];
var altTablou = tablou;
tablou.length = 0; // distructiv!
tablou; // []
altTablou; // []
```

Folosirea resetării prin inițializarea variabilei cu un array gol, nu afectează alte referințe. Acestea vor păstra array-ul preexistent pentru că prin al doilea identificator se păstrează legătura la zona de memorie unde este obiectul array. Primul identificator va conduce acum către un nou obiect dintr-o altă zonă de memorie.

```javascript
var tablou = ['prima', 'a doua', 1, 2];
var altTablou = tablou;
tablou = [];
tablou; // []
altTablou; // Array [ "prima", "a doua", 1, 2 ]
```

## Operațiuni cu datele

Dacă privești la gradul de populare, unele array-uri pot fi socotite **sparse** (în limba română: *cu goluri*), iar altele fără goluri catalogate a fi **dense**.

```javascript
// array sparce
let arrayCuGoluri = [1, , 3, 4];
// array dense
let arrayDens = [1, 2, 3, 4];
Array(4).fill();
// Array [undefined, undefined, undefined, undefined]
```

### Ocolirea golurilor

Uneori este necesară trecerea peste goluri pentru a prelucra restul datelor din array.

#### A. Cu metoda forEach()

```javascript
['prima', , 1, 2].forEach(function (element, index) {
  console.log(index + ' -> ' + element);
});
// 0 -> prima
// 2 -> 1
// 3 -> 2
```

#### B. Cu metoda every() se trece peste goluri.
#### C. Cu metoda some() se trece peste goluri.
#### D. Cu metoda map()

Efectul este că se face un salt peste goluri, dar acestea sunt păstrate în array-ul rezultat.

```javascript
['prima',, 1, 2].map(function(currentValue, index){
  return currentValue + ' -> ' + index;
});
// Array [ "prima -> 0", <1 empty slot>, "1 -> 2", "2 -> 3" ]
```

#### E. Folosind metoda filter()

Folosirea metodei are ca efect obținerea unui nou array din care sunt eliminate golurile.

```javascript
['prima', , 1, 2].filter( function (x) {
  return true;
});
Array ["prima", 1, 2 ];
```

#### F. Metoda join()

Aceasta convertește golurile, iar valorile `undefined` și `null` la stringul pasat în join.

```javascript
['prima',,1,2].join('X');
// "primaXX1X2"
```

#### G. Metoda sort() păstrează golurile.

#### H. Bucla for...in

Ciclarea cu `for...in` listează cheile array-ului (acestea sunt un superset al indicilor array-ului).

```javascript
for (let key in ['prima',,1,2]){
  console.log(key);
}; // 0 2 3
```

#### I. Folosirea lui `apply()`

Completarea unui array existent se poate face aplicând metoda `push()` pe primul array pentru că, de fapt, transformi primul array ca fiind obiect context pentru execuția metodei. Acest lucru permite injectarea celui de-al doilea obiect în primul.

```javascript
let primul = [1, 2, 3];
let alDoilea = [4, 5, 6];
Array.prototype.push.apply(primul, alDoilea);
console.log(primul); // Array [ 1, 2, 3, 4, 5, 6 ]
```

O altă soluție dar foarte complexă.

```javascript
let a = [1, 2, 3, 7, 8, 9],
    b = [4, 5, 6],
    insertIndex = 3;
a.splice.apply(a, Array.concat(insertIndex, 0, b));
```

Cu `a.splice`, de fapt generezi un nou array asupra căruia faci un `apply()`.

### Sortarea valorilor

De cele mai multe ori vom avea nevoie să facem o sortare după valorile elementelor unui array. Scenariile pot fi multiple, de la ordonarea unor valori numerice, până la ordonarea alfabetică a unor temeni. Pentru a realiza ordonarea, se va utiliza metoda `sort()`, care va utiliza o funcție cu rol de callback.

```javascript
[-23, -2, 102, 3, -54].sort( function (x, y) {
  if (x < y) {
    return -1;
  };
  // dacă true pune x pe un index mai mic decât y: deplasare stânga.
  if (x > y) {
    return 1;
  };
  // dacă y este mai mic decât x, acordă un index mai mic.
  return 0;
  // dacă valorile sunt sortate lasă neschimbată poziția unuia față de celălalt.
}); // Array [ -54, -23, -2, 3, 102 ]
```

### Accesarea pe sărite a elementelor unui array

Uneori se poate dovedi utilă amestecarea la întâmplare a elementelor dintr-un array. Vă puteți duce cu gândul la scenariul unui joc. Realizezi acest lucru folosind metoda `sort()` în combinație cu `Math.random()` apelat în funcția callback.

```javascript
var colectie = [1, 2, 3, 'unu', 'doi', 'trei'];
colectie = colectie.sort( function () {
  return Math.random() - 0.5;
});
colectie; // Array [ 3, 1, "doi", 2, "unu", "trei" ]
```

### Reducerea la șir de caractere - aplatizare

Mai sunt și metode general accesibile pe care le poți aplica (vezi metodele obiectului intern `Array`), iar cel mai rapid exemplu, care vă va fi util adesea, este metoda globală `toString()`. Aceasta transformă un array într-un șir de fragmente de text despărțite prin virgule. În practică astfel de practici de reducere la nivel de șir a unui set de valori se numește aplatizare, în engleză *flatenning*.

```javascript
['a', 'b', 'c'].toString(); // "a, b, c"
```

### Destructurarea

Destructurarea este un procedeu care are drept scop extragerea sau manipularea valorilor asignându-le unor variabile.

```javascript
var arr = ['unu', 'doi'];
var [unu, doi] = arr;
console.log(unu, doi);
// 'unu' 'doi'
```

### Potrivire *unu-la-unu*

```javascript
var unu, doi, trei;
[unu, doi, trei] = [1, 2, 3];
console.log(unu, doi, trei);
// 1 2 3
```

### Inversarea valorilor

Destructurarea poate fi folosită cu succes pentru a inversa valorile între două variabile.

```javascript
var x = 10, y = 20;
[x, y] = [y, x];
console.log(x, y);
```

### Potrivirea unu-la-unu cu unu array returnat

```javascript
function genArray(){
  return ['unu', 'doi', 'trei'];
};
[x, y, z] = genArray();
console.log(x, y, z);
// unu doi trei
```

### Valori implicite

```javascript
var x, y, z;
[x = 1, y = 2, z = 3] = [1000];
console.log(x, y, z); // 1000 2 3
```

### Folosirea cu `Regex`

```javascript
let [data, an, luna, zi] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('1912-12-3');
```

Ceea ce s-a întâmplat este că ai scăpat de sarcina de a crea un array intermediar din care să extragi indice cu indice.

### Folosirea operatorului rest (...)

```javascript
var [x, ...restop] = [1, 2, 3];
console.log(x, restop); // 1 și Array [ 2, 3 ]
```

Tot ce generează un array, folosindu-se această sintaxă, se poate transforma în legături la identificatori, adică valorile array-ului se pot asigna unor variabile ce sunt elementele unui alt array.

## Curiozități

### [] egal cu ![]

```javascript
[] == ![] // este true
```

Funcționează pentru că operatorul `!` face o conversie la Boolean și dacă conversia este evaluată la valoarea `true`, cea la care se reduce un obiect. Aceasta va fi inversată la `false`, care este interpretat de operatorul `==` ca `0`.

## Obiectul intern Array

Tot ce am povestit mai sus abia a reușit să facă un tablou generic al posibilităților de lucru cu datele. Pentru a vedea o paletă mult mai largă de posibilități, vom studia proprietățile și metodele obiectului intern `Array`, precum și metodele oferite de obiectul prototip al acestuia. Abia acum vom vedea întreaga putere pe care o aveți la îndemână pentru a stoca și prelucra date cu ajutorul array-urilor.

Obiectul nostru are trei metode și două proprietăți. Una dintre proprietăți este referința către obiectul prototip, care la rândul său oferă o serie de proprietăți pe care le-am grupat după sfera de aplicare și relația pe care o stabilesc. Vom debuta cu metodele.

Explicații:

-   [logical-not-operator](https://www.ecma-international.org/ecma-262/#sec-logical-not-operator)
-   [abstract-equality-comparison](https://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison)

## Mantre

-   Atunci când `Array` este apelat ca funcție și nu ca un constructor, va creea și va inițializa un nou obiect `Array`.
-   Are metodă internă `@@iterator`.
-   `Array`-urile sunt **obiecte** și poți adăuga proprietăți în array folosind notația dot `var a = [1,2]; a.i = 23; a.i // 23`. Valorile sunt adăugate indiferent că array-ul are un index numeric prestabilit. Ele sunt acolo.
-   Orice obiect `Array` are o proprietate `length`.
-   cheia unei proprietăți al unui array se numește `index` al unui array (valorile dintre paranteze pătrate sunt convertite la string).
-   o proprietate într-un array care este identificată printr-un index este numită `element`.
-   `Array` este un obiect intern limbajului JavaScript. Acesta este folosit pentru crearea array-urilor.
-   `Array` este un obiect iterabil pentru că obiectul prototip are o metodă @@iterator (precum String, TypedArray, Map și Set).

## Resurse

-   [MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray)
