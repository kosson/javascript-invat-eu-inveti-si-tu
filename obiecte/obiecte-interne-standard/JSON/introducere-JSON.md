# Obiectul global JSON - introducere

JSON este acronimul de la JavaScript Object Notation. JSON este un format de date standardizat de ECMA: ECMA-404 The JSON Data Interchange Standard.

ECMAScript 5 a introdus un nou obiect global JSON cu scopul de a oferi utilitare pentru gestionarea datelor în format JSON. Acest format este independent de limbajul de programare. Standardul oferă metode de serializare și deserializare a datelor în format JSON.

Câteva reguli de redactare a obiectelor JSON:

- numele proprietăților se vor pune între ghilimele duble,
- nu sunt admise funcții și `undefined` ca valori,
- într-o structură JSON nu sunt admise comentarii.

Mai multe precizări pot fi găsite în conținutul RFC-ului 8259 pentru [The JavaScript Object Notation (JSON) Data Interchange Format](https://datatracker.ietf.org/doc/html/rfc8259).
În Introducerea RFC-ului avem chiar și o definiție care lămurește natura acestui format de date: *JavaScript Object Notation (JSON) este un format text pentru serializarea datelor structurate*
## Metoda JSON.parse() - deserializarea

Această metodă primește drept argument un șir de caractere care este reprezentarea unui JSON. Șirul de caractere este transformat într-un obiect JavaScript care poate fi utilizat în propriile programe.

```javascript
let json = `{
    "record": {
      "recordSchema": "http://viaf.org/VIAFCluster",
      "recordPacking": "json",
      "mainHeadings": {
        "data": {
          "text": "Caragiale, Ion Luca, 1853-1912",
          "sources": {
            "s": "BNCHL"
          }
        }
      },
    "publishers": {
      "data": {
        "text": "Editura Muzeul Literaturii Române",
        "sources": {
          "s": "LC"
        }
      }
    }
  }
}`;
const obi = JSON.parse(json);
```

## Metoda JSON.stringify() - serializarea

Această metodă primește ca prin argument un obiect JavaScript. Când este introdus un al doilea argument, acesta este o funcție care prelucrează rezultatul într-un anumit fel.

```javascript
const obi = {
    titlu: 'Craii de Curtea-Veche',
    autor: 'Mateiu Caragiale'
};
let json = JSON.stringify(obi, ['titlu', 'autor']);
```

În cazul în care proprietatea unui obiect are drept valoare un `Map`, `Set` și suratele *weak*, acestea nu vor fi convertite într-un array atunci când se va face o conversie. În acest caz, este nevoie de funcția callback care să facă anumite transformări ale datelor pentru a se conforma regulilor de construcție ale unui JSON.

```javascript
let obi = {
  nume: 'Mateiu Caragiale',
  titluri: new Set(['Sub pecetea tainei', 'Craii de Curtea-Veche', 'Soborul țațelor'])
};
let transformat = JSON.stringify(obi, (cheie, valoare) => {
  return valoare instanceof Set ? [...valoare] : valoare;
});
// {"nume":"Mateiu Caragiale","titluri":["Sub pecetea tainei","Craii de Curtea-Veche","Soborul țațelor"]} 
```

În cazul în care ai nevoie de înlocuirea unei valori din obiectul, vei folosi din nou funcția cu rol de callback.

```javascript
var opera = {
  titlu: 'Craii de Curtea-Veche'
}
var transformat = JSON.stringify(opera, (cheie, valoare) => {
  cheie === 'titlu' ? 'Sub pecetea tainei' : valoare;
});
// {"titlu":"Sub pecetea tainei"}
```

### Tratarea valorilor pe care JSON nu le acceptă

În cazul în care transformi un obiect care poate conține valori precum `undefined`, `Function` și `Symbol`, vor fi omise respectivele proprietăți în rezultat sau vor apărea cu valoarea `null`, dacă sunt întâlnite în array-uri.
Proprietățile a căror cheie sunt un `Symbol` vor fi ignorate chiar dacă încerci o transformare folosind funcția de callback.
Valorile `Infinity` și `NaN`, precum și `null` sunt considerate a fi `null`.
Dacă o cheie a obiectului are o metodă `toJSON()`, aceasta va fi responsabilă cu definirea/transformarea datelor care vor fi serializate.

```javascript
let obi = {
  ceva: 'hortensie',
  timp: Date.now().toJSON(),
  toJSON () {
    return 'ceva util în obiectul serializat'
  }
}
console.log(JSON.stringify(obi));
```

O reimplementare a metodei este oferită de fatfish.

```javascript

const jsonstringify = (data) => {
  // Check if an object has a circular reference
  const isCyclic = (obj) => {
  // Use the Set data type to store detected objects
  let stackSet = new Set()
  let detected = false

  const detect = (obj) => {
    // If it is not an object type, you can skip it directly
    if (obj && typeof obj != 'object') {
      return
    }
    // When the object to be checked already exists in the stackSet, it means that there is a circular reference
    if (stackSet.has(obj)) {
      return detected = true
    }
    // Save the current obj as a stackSet
    stackSet.add(obj)

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        detect(obj[key])
      }
    }
    // After the level detection is completed, delete the current object to prevent misjudgment
    /*
      For example:
      an object's attribute points to the same reference.
      If it is not deleted, it will be regarded as a circular reference
      let tempObj = {
        name: 'fatfish'
      }
      let obj4 = {
        obj1: tempObj,
        obj2: tempObj
      }
    */
    stackSet.delete(obj)
  }

  detect(obj)

  return detected
}

  // 7#:
  // Executing this method on an object that contains a circular reference throws an error.

  if (isCyclic(data)) {
    throw new TypeError('Converting circular structure to JSON')
  }

  // 9#: An error is thrown when trying to convert a value of type BigInt
  // An error is thrown when trying to convert a value of type bigint
  if (typeof data === 'bigint') {
    throw new TypeError('Do not know how to serialize a BigInt')
  }

  const type = typeof data
  const commonKeys1 = ['undefined', 'function', 'symbol']
  const getType = (s) => {
    return Object.prototype.toString.call(s).replace(/\[object (.*?)\]/, '$1').toLowerCase()
  }

  // not an object
  if (type !== 'object' || data === null) {
    let result = data
    // 4#：The numbers Infinity and NaN, as well as the value null, are all considered null.
    if ([NaN, Infinity, null].includes(data)) {
      result = 'null'
      // 1#：undefined, Function, and Symbol are not valid JSON values.
      // If any such values are encountered during conversion they are either omitted (when found in an object) or changed to null (when found in an array).
      // JSON.stringify() can return undefined when passing in "pure" values like JSON.stringify(function() {}) or JSON.stringify(undefined).
    } else if (commonKeys1.includes(type)) {
      return undefined
    } else if (type === 'string') {
      result = '"' + data + '"'
    }

    return String(result)
  } else if (type === 'object') {
    // 5#: If the value has a toJSON() method, it's responsible to define what data will be serialized.
    // 6#: The instances of Date implement the toJSON() function by returning a string (the same as date.toISOString()).
    // Thus, they are treated as strings.
    if (typeof data.toJSON === 'function') {
      return jsonstringify(data.toJSON())
    } else if (Array.isArray(data)) {
      let result = data.map((it) => {
        // 1#: If any such values are encountered during conversion they are either omitted (when found in an object) or changed to null (when found in an array).
        return commonKeys1.includes(typeof it) ? 'null' : jsonstringify(it)
      })

      return `[${result}]`.replace(/'/g, '"')
    } else {
      // 2#：Boolean, Number, and String objects are converted to the corresponding primitive values during stringification, in accord with the traditional conversion semantics.
      if (['boolean', 'number'].includes(getType(data))) {
        return String(data)
      } else if (getType(data) === 'string') {
        return '"' + data + '"'
      } else {
        let result = []
        // 8#: All the other Object instances (including Map, Set, WeakMap, and WeakSet) will have only their enumerable properties serialized.
        Object.keys(data).forEach((key) => {
          // 3#: All Symbol-keyed properties will be completely ignored, even when using the replacer function.
          if (typeof key !== 'symbol') {
            const value = data[key]
            // 1#: undefined, Function, and Symbol are not valid JSON values.
            if (!commonKeys1.includes(typeof value)) {
              result.push(`"${key}":${jsonstringify(value)}`)
            }
          }
        })

        return `{${result}}`.replace(/'/, '"')
      }
    }
  }
}
```

## Resurse

- [Introducing JSON](http://json.org/)
- [TIL — The power of JSON.stringify replacer parameter](https://pawelgrzybek.com/til-the-power-of-json-stringify-replacer-parameter/)
- [I Almost Lost My Year-End Bonus Because of JSON.stringify | fatfish | Feb 23, 2022](https://javascript.plainenglish.io/i-almost-lost-my-year-end-bonus-because-of-json-stringify-a715c54559bb)


## Sursă de date

Folosește un manager de apeluri precum Postman

```text
Request:
GET /viaf/search?query=cql.any%20%3D%20%22Caragiale%22&maximumRecords=5&httpAccept=application%2Fjson
```
