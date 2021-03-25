const obA = [
  {
    propX: {
      ceva: 100,
      undeva: 'Adjud',
      testare: {
        ada: {
          adancime: 4
        }
      }
    },
    lista1: ['haba', 'baba'],
    altceva: 1
  },
  {
    propX: {
      exista: false,
      localitati: [{undeva: 'Adjud'}, {undeva: 'Hunedoara', lista: ['Galați', 'Adjud']}]
    },
    altceva: true
  }
];

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

function* cautareMultiplaInAdancime (f_getBranchObjs, obj = {}) {
    // Dacă este pasat un obiect sau un arrayv
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
      // constituie un array de array-uri și pentru fiecare valoare care este obiect
      yield* cautareMultiplaInAdancime (f_getBranchObjs, v);
    }
  }
};

function oriceString (f_x) {
  function getBranchObjs (arrOfobj) {
    let arrValChei = Object.values(arrOfobj);
    let someVals = arrValChei.some((v, i) => {
      return String(v) === v && f_x(v);
    });
    return someVals;
  };
  return getBranchObjs;
};

function cautaCaseInsensitive (fragment, decautat) {
  return fragment.toLowerCase().includes(decautat.toLowerCase());
};

function cautareMultiplaAVal (decautat = '', obi = {}) {
  function x (fragment) {
    return cautaCaseInsensitive(fragment, decautat);
  };
  return Array.from(cautareMultiplaInAdancime(oriceString(x), obi));
};

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
  key: string;v
  pathToKey?: string;
} */
function findPathsToKey(options) {
  const results = [];

  (function findKey({key, obj, pathToKey}) {
    // baza căii
    let oldPath = `${pathToKey ? pathToKey + "." : ""}`; // daca exista calea deja, completeaz-o, dacă nu ia-o de la zero

    // adaugarea cheii
    if (obj.hasOwnProperty(key)) {exp
      results.push(`${oldPath}${key}`); // dacă proprietatea este a obiectului, atunci, introdu în array-ul rezultatelor noua cheie.
    }

    //doar dacă obiectul exista && este de tip obiect && nu este array
    if (obj !== null && typeof obj === "object" && !Array.isArray(obj)) {
      let k, j;
      //#1 prima bucla
      for (k in obj) {
        // testez dacă proprietatea aparține obiectului
        if (obj.hasOwnProperty(k)) {
// baza căii
          // testez daca nu cumva proprietatea este un array
          if (Array.isArray(obj[k])) {
            //#2 a doua bucla
            for (j = 0; j < obj[k].length; j++) {
              findKey({
                obj: obj[k][j],
                key,
                pathToKey: `${oldPath}${k}[${j}]`,
              });
            };
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

 // findPathsToKey({obj: myObjWithDupl, key: 'd'}); //?

/* ------------------------------ */

/*
Funcție helper pentru a determina daca o valoare poate
fi convertita cu succes la un numar
*/
function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function addpath2O (entity, path = '') {
  let k, v, newpath;
  let arrOfarr = Object.entries(entity);
  // fiecare v este un obiect al array-ului sau o valoare simpla
  for ([k, v] of arrOfarr) {
    // newpath = path + (Number(k) === Number(k) ? `[${Number(k)}]` : `['${k}']`);
    newpath = path + (isNumeric(k) ? `[${+k}]` : `['${k}']`);
    // cazul obiect => obiecte si array-uri
    if(Object(v) === v){
      addpath2O(v, newpath);
      // array
      if(Array.isArray(v)) {
        v.push(newpath);
      }
      // obiect
      v.path = newpath;
    }
  }
  return entity;
}

let newO = addpath2O(obA);
console.log(JSON.stringify(newO, null, 2)); //?

/* =============================================================== */

/**
Funcția transformă structura de date primită într-un generator
*/
function* makeGen (data) {
  if (Array.isArray(data)) {
    let elem;
    for (elem of data) {
      yield elem;
    }
  } else {
    yield* data;
  }
}
