# Currying

Currying descrie o funcție care este apelată cu mai puține argumente decâte așteaptă și returnează o funcție care primește restul argumentelor.

Tehnica de a introduce câteva argumente unei funcții cu returnarea uneia noi se numește `currying`.

## Dependințe cognitive

- funcții
- closure

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

O funcție cu argumente care returnează o funcție care face closure peste parametrii funcției container și care face ceva cu datele iar apoi returnează rezultatul.

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

// sau poți folosi fat arrow
var tipul = tip => dispozitiv => dispozitiv.tip === tip; // Array [ Object, Object ]
```

Câștigul la currying este acela că lucrurile sunt segmentate pe responsabilități și se evită nebunia încercării de a determina starea.
