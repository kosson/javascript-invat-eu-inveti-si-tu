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

O altă abordate ar fi construirea unei funcții care să facă o astfel de transformare.

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
