# Potrivirea proprietăților a două obiecte distincte

Sunt cazuri în care ai nevoie să parcurgi un array cu obiecte pentru a căuta o proprietate pe care vrei să o regăsești și în alt array de obiecte sau un singur obiect. Dacă regula de căutare descoperă un rezultat, acesta să fie baza constituirii altei structuri de date.

Răspunsul cel mai facil ar fi realizarea unei iterări, iar pentru fiecare element/obiect să se facă o iterare în structura pentru care se dorește potrivirea.

```javascript
for ( var i = 0; i< returnedData.length; i++) {

    for ( var keys in obj ) {
      if ( obj.hasOwnProperty(keys) ) {
        for (var propname in obj[keys].people) {
          if (obj[keys].people.hasOwnProperty(propname)) {

            if ( obj[keys].people[propname].name === returnedData[i].name ) {

                // when you find a match, add 'data' property and append data object.
                obj[keys].people[propname].data = returnedData[i];
            }

          }
        } // end for-in
      }
    }  // end for-in
}  // end for
```

Ceea ce se dorește este o intersecție a subseturilor, o reuniune și o diferență.

## Intersecție

O intersecție este un set care conține elementele comune ale altor două pe care se face operațiunea. Pentru două array-uri simple, o intersecție se poate realiza folosind metoda `filter` și metoda `includes`.

```javascript
let intersectie = A.filter(x => B.includes(x));
```

## Diferență

Pentru a constitui un array ce conține elementele necomune, se va folosi o combinație `filter` cu `includes`, precum în exemplul:

```javascript
let diferenta = A.filter(x => !B.includes(x));
```

## Diferență simetrică

Pentru a realiza un array al elementelor necomune din ambele array-uri, vom folosi `filter`, `includes` și `concat`.

```javascript
let diferenta_simetrica = A.filter(x => !B.includes(x)).concat(B.filter(x => !A.includes(x)));
```

## Reuniune

Sintaxa spread oferă posibilitatea de a face reuniunea a două array-uri cu mențiunea că în cazul elementelor comune, vor fi dublate în array-ul rezultat.

```javascript
let reuniune = [...A, ...B];
```

Pentru a realiza reuniunea a două seturi, va trebui să avem doar elemente unice în array-ul rezultat. Pentru a realiza acest lucru, se va apela la `Set`, care nu va permite intrarea unui duplicat.

```javascript
let reuniune = [...new Set([...A, ...B])];
```

## Componente

Vom investiga o serie de metode care ar putea conduce la realizarea unui astfel de instrument util. Primul pas ar fi să stabilești care sunt criteriile după care vrei să faci potrivirea.

### Filtrare după valoarea unei proprietăți

Filtrarea va constitui un subset al obiectelor care se potrivesc cerinței enunțate în funcția aplicată.

```javascript
let rezultat = arrayCuObiecte.filter((obiect) => {
  return obiect.ceva = 10;
});
```

Să presupunem că avem nevoie de valoarea unei proprietăți a unui obiect care trebuie identificat după existența unei anumite proprietăți, cum ar fi valoarea unui identificator. Mențiunea este că obiectele din array descriu entități unice fiecare având propriul identificator. Căutarea o faci cu metoda `find` căutând o egalitate strictă a valorilor identificatorilor. În exemplul de mai jos ne bazăm pe operatorul `||` (OR). Rezultatul operațiunii `undefined || {}` are drept rezultat un obiect gol. Dar dacă obiectul există pentru că testul a fost trecut în callback-ul lui `find`, atunci vom avea `{id: 1, titlu: 'Aici, acum'} || {}`, care va avea drept rezultat obiectul găsit. Dacă obiectul nu este găsit, rezultatul este un obiect gol pentru care se cere proprietatea `titlu`, ceea ce va rezulta `undefined`. În ultima oprațiune OR, va fi returnat mesajul precizat.

```javascript
let arrayObiuri = [{id: 1, titlu: 'Aici, acum'}, {id: 2, titlu: 'Marea brambureală'}];
let obiCautarea = {id: 1, prop: 'ceva'};
let proprietateRezultata = (arrayObiuri.find(obi => obi.id === obiCautare.id) || {}).titlu || 'Nu există!';
```

O altă opțiune ar fi realizarea unui ternar similar cu următorul exemplu.

```javascript
let proprietateRezultata = arrayObiuri.some(obi => obi.id === obiCautare.id) ? arrayObiuri.find(obi => obi.id === obiCautare.id).titlu : 'Nu există!';
```

Am putea merge mai departe să creăm un utilitare de căutare.

```javascript
function search(propDeCautat){
  const res = arrayObiuri.find(({id}) => id === propDeCautat);
  return res ? res.titlu : "Nu există";
}
```

Loop și filter?

```javascript
const obA = [
  {
    propX: {
      ceva: 100,
      undeva: 'Adjud'
    },
    altceva: 1
  },
  {
    propY: {
      ceva: 30,
      undeva: 'Adjud',
      testare: {
        ada: {
          adancime: 4
        }
      }
    },
    altceva: 'o prop'
  },
  {
    propX: {
      ceva: 20,
      undeva: 'Hunedoara'
    },
    altceva: true
  },
  {
    propX: {
      exista: false,
      localitati: [{undeva: 'Adjud'}, {undeva: 'Hunedoara'}]
    },
    altceva: true
  }
];
const obB = [
  {
    propA: {
      undeva: 'Adjud'
    }
  },
  {
    propB: {
      undeva: 'Crasna'
    console.log(Array.isArray(obi));
    }
  }
];
```

## Căutări recursive în obiecte

Pentru a reuși căutarea într-un arbore așa cum sunt obiectele complexe, este necesară implementarea unei formule de căutare în respectivul obiect. Această structură implică o buclă care parcurge obiectul.
    console.log(Array.isArray(obi));

### Căutarea numelui unei chei

Atunci când ai nevoie să cauți o cheie.

```javascript
function searchKeyInObj (val, obj, result = []) {
  Object.keys(obj).forEach((key) => {
    if (key === val) {
      result.push(obj[key]);
      return result;
    }
    if (typeof obj[key] === 'object') {
      searchKeyInObj(val, obj[key], result);
    }
  });
  return result;
}

let a;
for (a of obA) {
  console.log(...searchKeyInObj('undeva', a));
}
```

### Căutare adâncă

Uneori ai nevoie să faci căutări în adâncimea obiectelor pentru a vedea dacă o anumită valoare există.

#### Căutare până la găsirea primului rezultat

Următorul exemplu permite căutarea folosind o funcție care testează existența valorii pentru o anumită cheie. Este returnat primului obiect descoperit, fie acesta cel rădăcină, fie un obiect din adâncime. Următorul exemplu prezintă o funcție care are capacitatea să parcurgă structuri complexe de date grație utilizării caracteristicii funcțiilor de a fi pasate altor funcții drept valori și a unei construcții recursive care are paramtri care țin minte starea.

```javascript
const cautareUnicaInAdancime = (f, obj = {}) => {
  // Dacă este pasat un obiect sau un array
  if (Object(obj) === obj) {
    // Dacă evaluarea funcției pasate este true,
    // returnează primul obiect găsit care corespunde testului
    if (f(obj) === true) {
      // Atenție, este obiectul curent de pe ramură pornind cu rădăcina
      return obj;
    }
    // tratăm fiecare ramură (obiect în adâncime)
    let k, v;
    for ([k, v] of Object.entries(obj)) {
      // constituie un array de array-uri și pentru fiecare valoare care este obiect
      const res = cautareUnicaInAdancime(f, v); // aplică din nou funcția
      // dacă rezultatul evaluării funcției este o valoare validă
      if (res !== undefined) {
        // return res; // este returnat obiectul de pe ramură
        return {idxDataSet: k, resultObj: res};
      }
    }
  }
  return undefined;
}

console.log(cautareUnicaInAdancime (x => x.undeva === 'Adjud', obA)); // {ceva: 100, undeva: 'Adjud'}
console.log(cautareUnicaInAdancime (x => {
  return Array.isArray(x.localitati);
}, obA)); // { exista: false, localitati: [{undeva: 'Adjud'}, {undeva: 'Hunedoara'}]}
console.log(cautareUnicaInAdancime(x => x.ada && x.ada.adancime === 4, obA)); // {ada: {adancime: 4}}, undefined
```

Pentru ușurință, am putea crea o altă funcție de ajutor, care să facă căutarea unei simple valori.

```javascript
function cautareValOData (decautat = '', obi) {
  return cautareUnicaInAdancime(o => Object.values(o).some(v => String(v) === v && v.includes(decautat)), obi);
}
console.log(cautareValOData('Hune', obA)); // {ceva: 20, undeva: 'Hunedoara'}
```

#### Căutarea tuturor rezultatelor

```javascript
const cautareMultiplaInAdancime = function* (f, obj = {}) {
    // Dacă este pasat un obiect sau un array
  if (Object(obj) === obj) {
    // Dacă evaluarea funcției pasate este true,
    // returnează primul obiect găsit care corespunde testului
    if (f(obj) === true) {
      // Atenție, este obiectul curent de pe ramură pornind cu rădăcina
      yield obj;
    }
    // tratăm fiecare ramură (obiect în adâncime)
    let k, v;
    for ([k, v] of Object.entries(obj)) {
      // constituie un array de array-uri și pentru fiecare valoare care este obiect
      yield* cautareMultiplaInAdancime (f, v);
    }
  }
};

const cautareMultiplaAVal = (decautat = '', obi = {}) => {
  // Array.from(cautareMultiplaInAdancime(o => Object.values(o).some(v => String(v) === v && v.includes(decautat)), obi)); // căutare case sensitive
  Array.from(cautareMultiplaInAdancime(o => Object.values(o).some(v => String(v) === v && v.toLowerCase().includes(decautat)), obi)); // căutare case insensitive
}
```

Mergem mai departe pe firul exemplului oferit de utilizatorul [Thank you](https://stackoverflow.com/users/633183/thank-you) de la (javascript - In an array of objects, returns objects where ANY value matches a specific string | stack overflow)[https://stackoverflow.com/questions/50538060/javascript-in-an-array-of-objects-returns-objects-where-any-value-matches-a-s/50538352#50538352] și vom abstractiza în funcții separate.

```javascript
const oriceString = f => obi => Object.values(obi).some(v => String(v) === v && f(v));
const cautaCaseInsensitive = (x, y) => x.toLowerCase().includes(y.toLowerCase());
const cautareMultiplaAVal = (decautat = '', obi = {}) => {
  return Array.from(cautareMultiplaInAdancime(oriceString(v => cautaCaseInsensitive(v, decautat)), obi));
};
// sau cazul căutării unice
const cautareValOData = (decautat = '', obi) => {
  return cautareUnicaInAdancime(oriceString(v => cautaCaseInsensitive(v, decautat)), obi);
}
```

Și o varianta ES5

```javascript
function* cautareMultiplaInAdancime (f_getBranchObjs, obj = {}) {
    // Dacă este pasat un obiect sau un array
  if (Object(obj) === obj) {
    // Dacă evaluarea funcției pasate este true,
    // returnează primul obiect găsit care corespunde testului
    if (f_getBranchObjs(obj) === true) {
      // Atenție, este obiectul curent de pe ramură pornind cu rădăcina
      yield obj;
    }
    // tratăm fiecare ramură (obiect în adâncime)
    let k, v;
    for ([k, v] of Object.entries(obj)) {

      if (Number(k) !== 'NaN') {
        v['idxDataSet'] = Number(k);
      }
      // constituie un array de array-uri și pentru fiecare valoare care este obiect
      yield* cautareMultiplaInAdancime (f_getBranchObjs, v);
    }
  }
};

function oriceString (f_x) {
  function getBranchObjs (arrOfobj) {
    let arrValChei = Object.values(arrOfobj); //?
    let someVals = arrValChei.some((v, i) => {
      return String(v) === v && f_x(v);
    });
    return someVals;
  };
  return getBranchObjs;
};

function cautaCaseInsensitive (fragment, decautat) {
  return fragment.toLowerCase().includes(decautat.toLowerCase()); //?
};

function cautareMultiplaAVal (decautat = '', obi = {}) {
  function x (fragment) {
    return cautaCaseInsensitive(fragment, decautat); //?
  };
  return Array.from(cautareMultiplaInAdancime(oriceString(x), obi));
};
```

## Căutarea căii unei anumite valori

Pentru că uneori este nevoie să mergi inapoi pe fir și să descoperi calea în obiect unde se află o anumită valoare, am ales două exemple de la https://stackoverflow.com/questions/25403781/how-to-get-the-path-from-javascript-object-from-key-and-value.

O primă variantă pentru a descoperi prima apariție.

```javascript
function getPath(obj, value, path) {
  try {
    if (typeof obj !== 'object') {
      return;
    }
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var t = path;
        var v = obj[key];
        if (!path) {
          newPath = key;
        } else {
          newPath = path + '.' + key;
        }
        if (v === value) {
          return newPath;
        } else if (typeof v !== 'object') {
          newPath = t;
        }
        var res = getPath(v, value, newPath);
        if (res) {
          return res;
        }
      }
    }
  } catch (e) {
    console.log(e.message);
  }
}

getPath(obA, 'Adjud');
```

O altă variantă pentru a descoperi toate aparițiile

```javascript
const myObjWithDupl = {
  parentKey: {
    someImportantStuff: "134",
		arr: [
      {a:1, b: 2, c: { d: "D VLAUE"}, yy: "bla" },
      {a:1, b: 2, c: { d: "D VLAUE"}, yy: "bla" },
      {a:1, b: 2, c: { d: "D VLAUE"}, xxx: "bla" },
    ],
  },
  f: "hello",
  x: {
    y: "y_value",
  }
}

/* interface FindKeysArguments {
  obj: { [key: string]: any };
  key: string;
  pathToKey?: string;
} */

function findPathsToKey(options) {
  const results = [];

  (function findKey({
    key,
    obj,
    pathToKey,
  }) {
    const oldPath = `${pathToKey ? pathToKey + "." : ""}`;
    if (obj.hasOwnProperty(key)) {
      results.push(`${oldPath}${key}`);
    }

    if (obj !== null && typeof obj === "object" && !Array.isArray(obj)) {
      for (const k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (Array.isArray(obj[k])) {
            for (let j = 0; j < obj[k].length; j++) {
              findKey({
                obj: obj[k][j],
                key,
                pathToKey: `${oldPath}${k}[${j}]`,
              });
            }
          }

          if (obj[k] !== null && typeof obj[k] === "object") {
            findKey({
              obj: obj[k],
              key,
              pathToKey: `${oldPath}${k}`,
            });
          }

          continue;
        }
      }
    }
  })(options);

  return results;
}

 findPathsToKey({obj: myObjWithDupl, key: 'd'});
```

#### Resurse

https://stackoverflow.com/questions/50448968/find-object-in-array-with-subarray-checking-an-property/50456572#50456572
https://stackoverflow.com/questions/50538060/javascript-in-an-array-of-objects-returns-objects-where-any-value-matches-a-s/50538352#50538352
https://www.npmjs.com/package/object-scan

## Resurse

- [Array intersection, difference, and union in ES6](https://medium.com/@alvaro.saburido/set-theory-for-arrays-in-es6-eb2f20a61848)
