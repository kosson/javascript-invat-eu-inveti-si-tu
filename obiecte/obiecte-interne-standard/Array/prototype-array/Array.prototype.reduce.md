# `Array.prototype.reduce()`

Această metodă aplică o funcție tuturor entităților dintr-un array, de la stânga la dreapta, iar ceea ce rezultă este introdus într-un alt array sau obiect cu rol de acumulator al rezultatelor. În uzul curent vei mai întâlni și termenul de pliere. Îți poți închipui array-ul original, ca fiind o coală de hârtie pliată, iar fiecare pliu, fiind o entitate. Această metodă, *desface* fiecare pliu, rând pe rând, aplică o operațiune sau un set de operațiuni asupra pliului, și re-pliază. Plierea colii noastre va arăta diferit după forma pe care operațiunile au dat-o.

Spunem că este returnată valoarea rezultată după reducere („pliere”).

Metoda se aplică pe un array și primește ca argumente o funcție callback și o valoare opțională de pornire, dacă se dorește. Trebuie reținut faptul că array-ul pe care se face „reducerea” poate fi constituit din elemente care pot fi orice valoare.

## Mică istorie

Limbajul a avut dintotdeauna enunțul `for`. Poți parcurge foarte ușor un array cu un `for`:

```javascript
var colectie = ["unu", "doi", "trei"];
for (var i = 0; i < colectie.length; i++) {
  console.log(colectie[i]);
};
```

Odată cu versiunea a cincea a standardului, apare `forEach`, ca nouă metodă oferită de prototipul obiectului intern `Array`. Operațiunea de mai sus va avea un nou avatar:

```javascript
var colectie = ["unu", "doi", "trei"];
colectie.forEach(function(element){
  console.log(element);
});
```

Ce-i nou? Faptul că `forEach` gestionează *modelarea* fiecărui element din array prin intermediul unei funcții pasate drept argument (te-ai prins, un *callback*).
Reduce construiește pe ceea ce oferă `forEach` și `map` ducând mai departe capabilitățile de procesare prin utilizarea unei structuri de date cu rol de acumulator și a unor mecanisme ce permit o filtrare a datelor pe măsură ce acestea sunt prelucrate.

## Callback-ul folosit de `reduce`

Funcția callback primește patru argumente și se va aplica pe fiecare element al array-ului:

- `previousValue`: este valoarea acumulată până la momentul unei noi operațiuni. Aceasta este returnată de invocarea anterioară a callback-ului sau inițial este valoarea opțională pasată ca al doilea argument lui reduce,
- `currentValue`: este elementul curent din array care este procesat,
- `currentIndex`: indexul elementului care tocmai este procesat,
- `obiectul`: chiar obiectul care trebuie parcurs.

Pentru a înțelege mai repede reduce, este util să privim la următoarea secvență de cod:

```javascript
['unu', 'doi', 'trei'].reduce(function(acumulator, elementulDeLucru, index){
  return acumulator;
},{});
// este returnată chiar valoarea de pornire: {}
```

## Mantre

- se mai numește și `fold`, adică o funcție care să plieze valori pe rezultatul computat deja,
- este o metodă Array care primește drept argumente un callback și o valoare opțională,
- `[1,2,3].reduce(reducător, valoareInitiala)` este, de fapt, o expresie care va fi evaluată la o singură valoare finală a acumulatorului,
- callback-ul primește patru argumente: `valoareaAnterioara`, `valoareaDeLucru`, `indexCurent`, `array`,
- când este primită ca argument valoarea opțională, aceasta devine `valoareaAnterioara`,
- reduce() trebuie să returneze ceva neapărat,
- când pasezi ca argument opțional un obiect, elementele array-ului devin cheile obiectului nou creat,
- dacă valoarea opțională este un obiect, în acesta se pot specifica criterii de selecție `{varsta: [], sex[]}`.

## Reduce în practică

Pe lângă funcția callback mai poți da o valoare opțională, iar aceasta va fi folosită ca prim argument la prima invocare a callback-ului. Va fi valoarea de la care se pornește. Poate fi un array, un obiect sau o valoare, cum ar fi 0. Depinde de valoarea de la care dorești să pornești.

```javascript
var valoriNoi = [1, 2, 3].reduce(function (acumulator, valoarea) {
  acumulator += valoarea;
  return acumulator;
}, 0);
console.log(valoriNoi); // 6
```

Am pornit de la 0, așa cum am specificat ca al doilea argument după callback. La prima iterație lui 0 i s-a adunat valoarea 1. Valoarea acumulatorului este returnată și astfel, valoarea variabilei `valoriNoi`, devine 1. La a doua iterație,acumulatorului i se adăugă valoarea 2 și astfel acumulatorul devine 3. Valoarea acumulatorului este returnată și astfel, variabila `valoriNoi` devine 3. La ultima iterație, valorii 3 pe care o are acumulatorul, i s-a adăugat valoarea 3, ceea ce a rezultat un acumulator care a finalizat parcurgerea array-ului cu valoarea de 6. Acumulatorul este returnat și astfel, valoarea variabilei `valoriNoi` este suprascrisă cu 6. După cum ai observat, în cazul nostru, variabila `valoriNoi` este suprascrisă de fiecare dată când o iterație s-a încheiat.

**Dacă nu este dată o valoare opțională de start ca al doilea argument după callback, `previousValue`, acumulatorul va fi prima valoare din array-ul nou format iar `currentValue` va fi cea de-a doua.**

```javascript
['unu', 'doi', 'trei'].reduce(function(a, b){ return ceva; },{});
// Prima dată, a va fi obiectul opțional {}, iar b va fi array[0], adică primul element din array
// A doua oară, a va fi rezultatul returnat de funcție, iar b va fi array[1]
// A treia oară, a va fi rezultatul returnat de funcție, iar b ca fi array[2]
```

## Reduce pe array-uri

Un exemplu de calcul pentru generarea unui obiect care să conțină pentru fiecare valoare a elementelor din array, pătratul lor:

```javascript
[1,2,3,4,5].reduce(function(a, b){
  a[b] = b * b;
  return a;
},{});
// { 1: 1, 2: 4, 3: 9, 4: 16, 5: 25 }
```

| [1,2,3,4,5]       | previousValue                      | currentValue  | currentIndex  | valoarea returnată                 |
| :---------------- | :--------------------------------- | :------------ | :------------ | :--------------------------------- |
| prima invocare    | {}                                 | 1             | 0             | { 1: 1 }                           |
| a doua invocare   | { 1: 1 }                           | 2             | 1             | { 1: 1, 2: 4 }                     |
| a treia invocare  | { 1: 1, 2: 4 }                     | 3             | 2             | { 1: 1, 2: 4, 3: 9 }               |
| a patra invocare  | { 1: 1, 2: 4, 3: 9 }               | 4             | 3             | { 1: 1, 2: 4, 3: 9, 4: 16 }        |
| a cincea invocare | { 1: 1, 2: 4, 3: 9, 4: 16 }        | 5             | 4             | { 1: 1, 2: 4, 3: 9, 4: 16, 5: 25 } |

### Numără de câte ori apare un cuvânt

Exemplul de mai jos ia un array și returnează un obiect. Se observă că fiecare element de array devine cheie în noile perechi create în obiect.

```javascript
var colectie = ['mânătărci', 'bureți', 'gălbiori', 'ghebe', 'mânătărci', 'bureți', 'gălbiori', 'mânătărci'];

/** 1. Varianta defalcată */
var valoareaDeStart = {};
var reducator = function(acumulator, cuvant){
  if(!acumulator[cuvant]){
    acumulator[cuvant] = 1;
  }else{
    // acumulator[cuvant] = acumulator[cuvant] + 1;
    acumulator[cuvant] += 1;
  };
  return acumulator;
};
var rezultat = colectie.reduce(reducator, valoareaDeStart);
console.log(rezultat);

/** 2. Varianta contrasă */
function numaraDuplicatele(){
  return colectie.reduce(function(acumulator, element){
    acumulator[element] = (acumulator[element] + 1) || 1;
    // adaugă un element in obiectul construit având cheia
    // tot[element] cu valoarea 1 pentru un element unic
    // dacă elementul este întâlnit și a doua oară este
    // suprascrisă valoarea de la cheia găsită din nou tot[element] + 1)
    return tot;
  },{});
};
numaraDuplicatele();
//{ mânătărci: 3, bureți: 2, gălbiori: 2, ghebe: 1 }
```

### Ordonarea cuvintelor după litera cu care încep - dicționar

```javascript
var colectie = ["Constanța", "Bărcănești", "Sinaia", "Călimănești", "Bacău", "Oradea", "Cluj", "Baia Mare"];
var alfabetic = colectie.reduce(function(acumulator, cuvant){
  if(!acumulator[cuvant[0]]){
    acumulator[cuvant[0]] = [];
  }
  acumulator[cuvant[0]].push(cuvant);
  return acumulator;
},{});
// Object { C: Array[3], B: Array[3], S: Array[1], O: Array[1] }
```

## Reduce pe obiecte

### Reduce pentru selectare după criterii specificate printr-un obiect opțional.

```javascript
var colectie = [
  {clasa: 'cervide', sex: 'masculin', varsta: 10},
  {clasa: 'cervide', sex: 'masculin', varsta: 8},
  {clasa: 'cervide', sex: 'masculin', varsta: 12},
  {clasa: 'cervide', sex: 'feminin', varsta: 4},
  {clasa: 'cervide', sex: 'feminin', varsta: 2},
];
colectie.reduce(function(colectie, element, index){
  colectie[element.sex].push(element) ;
  return colectie;
},{masculin: [], feminin: []});
// Object { masculin: Array[3], feminin: Array[2] } --> fiecare array conține obiectele
```

Dacă array-ul este gol și nu este dată o valoare de pornire initialValue, atunci va fi emisă o eroare TypeError.
Dacă array-ul are o singură valoare indiferent de poziția acesteia și nu este oferită o valoare initialValue sau dacă initialValue este dată, dar array-ul este gol, atunci valoarea unică va fi returnată fără a fi invocat callback-ul.

```javascript
[0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, currentIndex, array) {
  return previousValue + currentValue;
}); // 10
```

|                  | previousValue | currentValue  | currentIndex  | array           | valoarea returnată  |
| :--------------- | :------------ | :------------ | :------------ | :-------------- | :------------------ |
| prima invocare   | 0             | 1             | 1             | [0, 1, 2, 3, 4] | 1                   |
| a doua invocare  | 1             | 2             | 2             | [0, 1, 2, 3, 4] | 3                   |
| a treia invocare | 3             | 3             | 3             | [0, 1, 2, 3, 4] | 6                   |
| a patra invocare | 6             | 4             | 4             | [0, 1, 2, 3, 4] | 10                  |

Rezultatul lui reduce este la final 10.
Varianta ES6 a aceleiași funcții reduce arată astfel:

```javascript
[0, 1, 2, 3, 4].reduce( (prev, curr) => prev + curr );
```

Dacă s-ar oferi o valoare inițială ca al doilea argument:

```javascript
[0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, currentIndex, array) {
  return previousValue + currentValue;
}, 10);
```
|                  | previousValue | currentValue  | previousIndex | array           | valoarea returnată  |
| :--------------- | :------------ | :------------ | :------------ | :-------------- | :------------------ |
| prima invocare   | 10            | 0             | 0             | [0, 1, 2, 3, 4] | 10                  |
| a doua invocare  | 10            | 1             | 1             | [0, 1, 2, 3, 4] | 11                  |
| a treia invocare | 11            | 2             | 2             | [0, 1, 2, 3, 4] | 13                  |
| a patra invocare | 13            | 3             | 3             | [0, 1, 2, 3, 4] | 16                  |
| a patra invocare | 16            | 4             | 4             | [0, 1, 2, 3, 4] | 20                  |

### Însumarea valorilor dintr-un array:

```javascript
var total = [0, 1, 2, 3].reduce(function(a, b) {
  return a + b;
}); // total 6
```

### Aplatizarea unui array de array-uri:

```javascript
var plat = [[0, 1], [2, 3], [4, 5]].reduce(function(previousValue, currentValue) {
  return previousValue.concat(currentValue);
}, []);
// flattened is [0, 1, 2, 3, 4, 5]
```

```javascript
var texte = [["Gică", "Georgică"], "Abramburica", ["Nadia", "Ana"]].reduce(function(previousValue, currentValue, currentIndex, array){
  return previousValue.concat(currentValue);
}, []);
texte ; // Array [ "Gică", "Georgică", "Abramburica", "Nadia", "Ana" ]
```

#### Contopirea a două array-uri variantă cu functor

```javascript
var colectii = [["unul", "altul", "cineva"], ["munte", "șes", "podiș"]];
// var secundo = ;
var aplatizare = function(colectii) {
  return colectii.reduce( function(tot, element){
    return tot.concat(element);
  });
};
aplatizare(colectii); // Array [ "unul", "altul", "cineva", "munte", "șes", "podiș" ]
```

Folosirea de `rest parameters`, adică o sintaxă ce permite extragerea unui Array din argumentele pasate unei funcții simplifică mult operațiunile. Această sintaxă constă în adăugarea unui nume de parametru prefixat de trei puncte de suspensie. Această sintaxă generează un Array adevărat, nu un array-like așa cum este `arguments`.

Un exemplu de transformare a funcționalității unei funcții construite clasic, care face suma tuturor argumentelor (`arguments`) cu excepția primului, care va fi folosit drept multiplicator pentru suma obținută. Acest exemplu este oferit de Nicolás, un consultant JavaScript din Buenos Aires, Argentina în explicarea conceptelor noi pe care le introduce ECMAScript 2015 - [ES6 Spread and Butter in Depth](https://ponyfoo.com/articles/es6-spread-and-butter-in-depth)

```javascript
function faSumaSiDubleaza(){
  var setNumere = Array.prototype.slice.call(arguments);
  // constituie array-ul transformand arguments; slice „taie” de la 0 până la capăt
  var multiplicator = setNumere.shift();
  // setarea cifrei care va reprezenta multiplicatorul
  var referinta = setNumere.shift();
  // reținerea primei cifre din array
  var insumare = setNumere.reduce( (previousValue, currentValue) => previousValue + currentValue, referinta );
  return multiplicator * insumare;
};
var total = faSumaSiDubleaza(34,10,2,30,12);
console.log(total); // 1836
```

## Căutarea celui mai lung string dintr-un array de șiruri.

Varianta clasică ar fi următoarea:

\#1. faci o funcție care trece în buclă fiecare element al array-ului căreia îi pasezi array-ul cu șiruri.
Condiții:
- inițiezi o variabilă contor,
- inițiezi o variabilă care va ține valoarea celui mai mare șir,
- contorul să fie mai mic decât valoarea dimensiunii array-ului,
- preincrementezi contorul înainte de orice ai face pe fiecare ciclu.

\#2. Testezi dacă dimensiunea șirului (element al array-ului) este mai mare decât dimensiunea șirului găsit anterior.
- DA -> atunci valoarea lui `celMaiLung` este suprascrisă cu noua valoare;
- NU -> returnează valoarea lui celMaiLung;
- Aceeași operațiune de comparare se face pentru toate elementele array-ului cu valoarea găsită anterior până când este păstrată cea mai mare.

```javascript
var colectie = ['ceva', 'altceva', 'telejurnal', 'agave'];
function cautaSirLung(colectie){
  for(var i = 0, celMaiLung = ''; i < colectie.length; ++i){
    if(colectie[i].length > celMaiLung.length){
      celMaiLung = colectie[i];
    }else{
      return celMaiLung;
    };
  };
};
cautaSirLung(colectie); // telejurnal
```

Varianta folosind reduce:

```javascript
function cautaSirLung(colectie){
  return colectie.reduce(function(celMaiLung, valoareCurenta){
    return valoareCurenta.length > celMaiLung.length ? valoareCurenta : celMaiLung;
  }, '');
};
cautaSirLung(colectie); // telejurnal
```

Acum ar fi util să cunoaștem indexul celui mai lung șir de caractere.

```javascript
function cautaSirLung(colectie){
  return colectie.reduce(function(celMaiLung, valoareCurenta, index){
    return valoareCurenta.length > celMaiLung.valoare.length ? {index: index, valoare: valoareCurenta} : celMaiLung;
  }, {index: -1, valoare: ''});
};
cautaSirLung(colectie); // Object { index: 2, valoare: "telejurnal" }
```
Malpractice statement ”, “ Policy screening plagiat ”
