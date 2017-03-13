# Funcții unare

Aceste funcții au rolul de a prelua o altă funcție pentru a o forța să ia fix un singur argument.

Spre exemplu, folosirea unui map pe un array.

```javascript
[10, 20, 30].map(parseFloat); // [10, 20, 30]
```

Dar o funcție `parseInt` are și un al doilea argument care preia baza în care se face transformarea valorii.

Din nefericire, map are la rândul sau doi parametri suplimentari pasați la fiecare aplicare a funcției: indexul elementului cu care se lucrează și întreg array-ul. Ei bine, `parseInt`, va confunda indexul pasat automat a lui map cu cel de-al doilea argument necesar sieși, ceea ce se va solda cu returnarea doar a primei valori iar restul vor fi NaN.

```javascript
[10, 20, 30].map(function(element, index, array){ });
[10, 20, 30].map(parseInt); // [ 10, NaN, NaN ]
```

Cea mai rapidă soluție este să folosim un fat arrow care să preia doar primul parametru.

```javascript
[10, 20, 30].map((element) => parseInt(element));
```

O altă abordare ar fi construirea unei funcții care să facă o astfel de transformare.

```javascript
var unArgument = (functie) =>
  functie.length === 1
    ? functie
    : function (element) {
      return functie.call(this, element);
    }
```

Cu un astfel de instrument se poate face un mapping aplicând funcții ce preiau un singur argument.

```javascript
[10, 20, 30].map(unArgument(parseInt));
```

# Funcție Tap

Este o funcție de combinare. I se spune și combinatorul K (i se mai spune „kestrel”).

Pe scurt, ai două valori care intră într-o combinație. Prima valoare va fi returnată oricum sau dacă se dorește poate fi păstrată. Dacă a doua valoare din combinație este o funcție, aceasta se va aplica pe prima valoare care va fi luată drept argument.

## Cum funcționează

O funcție se aplică pe un argument: x și returnează altă funcție.
Funcția returnată se aplică și ea pe un alt parametru: y, dar returnează parametrul gazdei, pe x. Deci, face un closing pe x-ul gazdei și memorizează propriul parametru, pe y.

```javascript
function K (x) {
  return function (y) { return x; };
};
```

Rescris în ES6 ar fi:

```javascript
const K = (x) => (y) => x;
```

Utilitatea unei astfel de construcții ar fi prelucrarea unei valori pentru a produce un rezultat, dar în același timp să fie păstrată și valoarea originală a funcției. Lucrurile devin foarte interesante atunci când valoarea este o funcție (adu-ți aminte că funcțiile sunt valori).

```javascript
function k (valoare) {
  return function (facCeva) {
    // dacă facCeva este o funcție, aplică pe valoare
    if (typeof(facCeva) === 'function') {
      facCeva(valoare);
    };
    // dacă este valoare sau nu, oricum se va returna valoarea
    return valoare;
  };
};
// aplicarea lui k cu o valoare, setează valoarea internă de lucru
var kestrel = k('ceva'); // valoare este legat de 'ceva'

// apelarea fără valoare va returna valoarea setată
kestrel(); // "ceva"
// apelarea cu o valoare va returna valoarea setată
kestrel('giurumea'); // "ceva"

// funcția care va juca rol de valoare
function actiune (valoarea) { console.log(valoarea + ' plus ceva'); };
// aplicarea pe un argument care este o funcție
kestrel(actiune);
/*
ceva plus ceva
"ceva"
 */
```

Urmând sintaxa ES6 aranjamentul codului devine mai clar:

```javascript
const k = (valoare) =>
            (facCeva) =>
              ( typeof(facCeva) === 'function' && facCeva(valoare), valoare );
// funcția care va juca rol de valoare
function actiune (valoarea) { console.log(valoarea + ' plus ceva'); };
k('ceva')(actiune);
/*ceva plus ceva
"ceva"*/
k()(actiune);
/*undefined plus ceva
undefined*/
k('nimic')();
```

Rețeta de tap de mai sus este o implementare care folosește curring-ul.
Curring-ul poate fi aplicat cu succes pentru simplificarea apelării funcției cu cei doi „operanzi”.

```javascript
function tap (valoare, functie) {
  // daca functie este undefined
  if (functie === void 0) {
    return fnCurried;
  } else {
    return fnCurried(functie);
  };
  function fnCurried (functie) {
    if (typeof(functie) === 'function') {
      functie(valoare);
    };
    return valoare;
  };
};
```

În acest moment poți folosi invocarea cu doi parametri.

```javascript
tap('ceva', function (val) { console.log(`Acum, ${val}`); });
// sau clasicul
tap('ceva')(function (val) { console.log(`Acum, ${val}`); });
```

Putem reformula folosind ES6.

```javascript
const tap = (valoare, functie) => {
  const fnCurried = (functie) => (
    typeof(functie) === 'function' && functie(valoare),
    valoare
  );
  return functie === undefined
          ? fnCurried
          : fnCurried(functie);
};
tap('ceva', (val) => {console.log(`Acum, ${val}`); });
//sau
tap('ceva')((val) => {console.log(`Acum, ${val}`); });
/*
Acum, ceva
"ceva"
 */
```

Care ar fi utilitățile unei astfel de funcții:
- ca mic debugger
- pentru lucrul cu metodele obiectelor sau ale instanțierilor
