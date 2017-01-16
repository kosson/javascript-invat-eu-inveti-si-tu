# Parcurgerea și manipularea datelor din obiecte

Obiectele care sunt array-like pot fi transformate în array-uri prin folosirea unor metode ale obiectului intern `Array` și prin folosirea operatorului spread `[...identificatorArrayLike]`

```javascript
var colectieDeP = document.body.getElementsByTagName('a');

var arrColectie = Array.prototype.slice.call(colectieDeP, 0);
var arrColectie2 = [].slice.call(colectieDeP, 0);
var arrColectie3 = Array.from(colectieDeP);
var arrColectie4 = [...colectieDeP];
```

## Destructurarea obiectelor

Similar destructurării array-urilor, se poate face același lucru în cazul obiectelor.

Cel mai simplu caz este cel de potrivire unu la unu prin asignarea directă a valorilor.

```javascript
var obi = {unu: 1, doi: 2};
var {unu, doi} = obi;
console.log(unu, doi); // 1 2
```

Trebuie ca numele identificatorilor să fie identic cu cel al proprietăților obiectului din care se face „transferul” valorilor, dar se poate face și cu modificarea numelor variabilelor.

```javascript
var obi = {unu: 1, doi: 2};
var {unu: prima, doi: aDoua} = obi;
console.log(prima, aDoua); 1 2
```

Valori implicite

```javascript
var {unu = 10, doi = 100} = {unu: 1000};
console.log(unu); // 1000
```

Se pot suprascrie valorile unor variable cu valorile proprietăților unui obiect prin destructurare.

```javascript
var obi = {
  unu: 1,
  doi: 2
};
var unu = 10,
    doi = 20;
// si acum destructurezi folosind operatorul ()
({unu, doi} = obi); console.log(unu, doi); // 1 2
// () este nevoie pentru a indica ca {} nu sunt un bloc de cod, ci o expresie
```
