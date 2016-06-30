# Array.prototype.reduce()

Este o metodă care returnează produsul valorilor dintr-un array. Metodei i se dă un array, o funcție callback și o valoare opțională pentru a fi folosită la prima invocare.

Funcția callback primește patru argumente și se va aplica pe fiecare element al array-ului:
- `previousValue`: este valoarea returnată de invocarea anterioară a callback-ului. Poate fi valoarea de la care se pornește dacă o astfel de valoare este dată (initialValue).
- `currentValue`: este elementul curent din array care este procesat.
- `currentIndex`: indexul elementului care tocmai este procesat.
- `obiectul`: chiar obiectul care trebuie parcurs.

Pe lângă callback mai poți da o valoare opțională, iar aceasta va fi folosită ca prim argment la prima invocare a callback-ului. Va fi valoarea de la care se pornește.

**Dacă nu este dată o valoare inițială previousValue va fi prima valoare din array iar currentValue va fi cea de-a doua din array. Numai dacă este dată initialValue, aceasta devine previousValue.**

Dacă array-ul este gol și nu este dată o valoare de pornire initialValue, atunci va fi emisă o eroare TypeError.
Dacă array-ul are o singură valoare indiferent de poziția acesteia și nu este oferită o valoare initialValue sau dacă initialValue este dată, dar array-ul este gol, atunci valoarea unică va fi returnată fără a fi invocat callback-ul.

```js
[0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, currentIndex, array) {
  return previousValue + currentValue;
}); // 10
```

|                  | previousValue | currentValue  | previousIndex | array           | valoarea returnată  |
| :--------------- | :------------ | :------------ | :------------ | :-------------- | :------------------ |
| prima invocare   | 0             | 1             | 1             | [0, 1, 2, 3, 4] | 1                   |
| a doua invocare  | 1             | 2             | 2             | [0, 1, 2, 3, 4] | 3                   |
| a treia invocare | 3             | 3             | 3             | [0, 1, 2, 3, 4] | 6                   |
| a patra invocare | 6             | 4             | 4             | [0, 1, 2, 3, 4] | 10                  |

Rezultatul lui reduce este la final 10.

Varianta ES6 a aceleiași funcții reduce arată astfel:

```js
[0, 1, 2, 3, 4].reduce( (prev, curr) => prev + curr );
```

Dacă s-ar oferi o valoare inițială ca al doilea argument:

```js
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

Însumarea valorilor dintr-un array:

```js
var total = [0, 1, 2, 3].reduce(function(a, b) {
  return a + b;
}); // total 6
```

## Aplatizarea unui array de array-uri:

```js
var plat = [[0, 1], [2, 3], [4, 5]].reduce(function(previousValue, currentValue) {
  return previousValue.concat(currentValue);
}, []);
// flattened is [0, 1, 2, 3, 4, 5]
```

```js
var texte = [["Gică", "Georgică"], "Abramburica", ["Nadia", "Ana"]].reduce(function(previousValue, currentValue, currentIndex, array){
  return previousValue.concat(currentValue);
}, []);
texte ; // Array [ "Gică", "Georgică", "Abramburica", "Nadia", "Ana" ]
```

Există în ECMAScript 2015 conceptul de `rest parameters`, adică o sintaxă ce permite extragerea unui Array din argumentele pasate unei funcții. Această sintaxă constă în adăugarea unui nume de parametru prefixat de trei puncte de suspensie. Această sintaxă generează un Array adevărat, nu un array-like așa cum este `arguments`.

Un exemplu de transformare a funcționalității unei funcții construite clasic, care face suma tuturor argumentelor (`arguments`) cu excepția primului, care va fi folosit drept multiplicator pentru suma obținută. Acest exemplu este oferit de Nicolás, un consultant JavaScript din Buenos Aires, Argentina în explicarea conceptelor noi pe care le introduce ECMAScript 2015 - [ES6 Spread and Butter in Depth](https://ponyfoo.com/articles/es6-spread-and-butter-in-depth)

```js
function faSumaSiDubleaza(){

  var setNumere = Array.prototype.slice.call(arguments); // constituie array-ul transformand arguments; slice „taie” de la 0 până la capăt

  var multiplicator = setNumere.shift();                 // setarea cifrei care va reprezenta multiplicatorul
  var referinta = setNumere.shift();                     // reținerea primei cifre din array

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
- inițiezi o variabilă contor
- inițiezi o variabilă care va ține valoarea celui mai mare șir
- contorul să fie mai mic decât valoarea dimensiunii array-ului
- preincrementezi contorul înainte de orice ai face pe fiecare ciclu

\#2. Testezi dacă dimensiunea șirului (element al array-ului) este mai mare decât dimensiunea șirului găsit anterior.
- DA -> atunci valoarea lui `celMaiLung` este suprascrisă cu noua valoare.
- NU -> returnează valoarea lui celMaiLung
- Aceeași operațiune de comparare se face pentru toate elementele array-ului cu valoarea găsită anterior până când este păstrată cea mai mare.

```js
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

```js
function cautaSirLung(colectie){
  return colectie.reduce(function(celMaiLung, valoareCurenta){
    return valoareCurenta.length > celMaiLung.length ? valoareCurenta : celMaiLung;
  }, '');
};

cautaSirLung(colectie); // telejurnal
```

Acum ar fi util să cunoaștem indexul celui mai lung șir de caractere.

```js
function cautaSirLung(colectie){
  return colectie.reduce(function(celMaiLung, valoareCurenta, index){
    return valoareCurenta.length > celMaiLung.valoare.length ? {index: index, valoare: valoareCurenta} : celMaiLung;
  }, {index: -1, valoare: ''});
};

cautaSirLung(colectie); // Object { index: 2, valoare: "telejurnal" }
```
