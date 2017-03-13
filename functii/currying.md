# Currying

Currying descrie o funcție care este apelată cu mai puține argumente decât așteaptă și returnează o funcție care primește restul argumentelor. Cea nouă la rândul ei returnează rezultatul operațiunii asupra parametrilor.

Tehnica de a introduce câteva argumente unei funcții cu returnarea uneia noi se numește `currying`.

Ceea ce oferă un currying este faptul că o funcție poate fi apelată cu un argument și returnează o altă funcție căruia îi putem pasa un alt argument la un moment ulterior.

Reține faptul că atunci când o variabilă are același nume ca o variabilă din mediul părinte, putem spune că suprascrie („shadowing”) valoarea din **mediul lexical** părinte.

```javascript
function a (x) {
  return function b (x, y) {
    return x + y;
  };
};
var prima = a(10); console.log(prima); // function b()
var aDoua = prima(20, 21); console.log(aDoua); // 41
```

și acum mai simplu, mai curat folosind fat arrow:

```javascript
((x) =>
  (x, y) => x + y)(10)(20, 21); // 41
```

## Dependințe cognitive

- funcții
- closure

## Aspecte practice

Cazul unei funcții care returnează altă funcție făcând o operațiune de currying:

```js
var inmultire = function (a){
  return function(b){
    return a*b;
  };
};
var oInmultire = inmultire(10);
oInmultire(2); // 20
```

O funcție cu argumente care returnează o funcție care face closure peste parametrii funcției container. Aceasta face ceva cu datele iar apoi returnează rezultatul.

```js
var colectie = [
  {
    objId: 1,
    denumire: "vehicul de explorare spatiala",
    tip: "vehicul"
  },
  {
    objId: 2,
    denumire: "baterie solară",
    tip: "panou"
  },
  {
    objId: 3,
    denumire: "captator radiație infraroșie",
    tip: "panou"
  },
  {
    objId: 4,
    denumire: "vehicul de explorare spatiala",
    tip: "costum"
  }
];

// metoda clasică de a face un filtru pe aceste date
colectie.filter(obiect => obiect.tip === "panou"); // Array [ Object, Object ]
// problema este că datele sunt cuplate strâns cu acțiunea de filtrare
// o alternativă este
var tipul = function(tip){
  return function(dispozitiv){
    return dispozitiv.tip === tip;
  };
};

colectie.filter(tipul("panou")); // Array [ Object, Object ]
```

sau poți folosi `fat arrow`:

```js
var tipul = tip => dispozitiv => dispozitiv.tip === tip; // Array [ Object, Object ]
```

pentru un aranjament vizual care explică mai bine lucrurile se poate scrie și astfel:

```js
var tipul =
      tip =>
        dispozitiv =>
          dispozitiv.tip === tip;
```

Câștigul la currying este acela că lucrurile sunt segmentate pe responsabilități și se evită nebunia încercării de a determina starea sistemului.

Un alt exemplu mai simplu de „curring” este cel de folosire a noii sintaxe „fat arrow”, care introduce mai mare claritate și simplitate.

```javascript
((a) =>
  (b) =>
    (c) => a + b + c)(1)(2)(3); // 6
```

## Alonje

- funcții de tip tap.
