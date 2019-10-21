# Obiectul global JSON - introducere

JSON este acronimul de la JavaScript Object Notation. JSON este un format de date standardizat de ECMA: ECMA-404 The JSON Data Interchange Standard.

ECMAScript 5 a introdus un nou obiect global JSON cu scopul de a oferi utilitare pentru gestionarea datelor în format JSON. Acest format este independent de limbajul de programare. Standardul oferă metode de serializare și deserializare a datelor în format JSON.

Câteva reguli de redactare a obiectelor JSON:

-   numele proprietăților se vor pune între ghilimele duble.
-   nu sunt admise funcții și `undefined` ca valori
-   într-o structură JSON nu sunt admise comentarii

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

Această metodă primește ca prin argument un obiect JavaScript și atunci când se dorește un al doilea argument acesta este o funcție care prelucrează rezultatul într-un anumit fel.

```javascript
const obi = {
    titlu: 'Craii de Curtea-Veche',
    autor: 'Mateiu Caragiale'
};
let json = JSON.stringify(obi, ['titlu', 'autor']);
```

În cazul în care proprietatea unui obiect are drept valoare un `Map`, `Set` și suratele *weak*, acestea nu vor fi convertite într-un array atunci când se va face o conversie.

```javascript
let obi = {
  nume: 'Mateiu Caragiale',
  titluri: new Set(['Sub pecetea tainei', 'Craii de Curtea-Veche', 'Soborul țațelor'])
};
let transformat = JSON.stringify(obi, (cheie, valoare) =>{
  return valoare instanceof Set ? [...valoare] : valoare;
});
// {"nume":"Mateiu Caragiale","titluri":["Sub pecetea tainei","Craii de Curtea-Veche","Soborul țațelor"]} 
```

În cazul în care ai nevoie de înlocuirea unei valori din obiectul care va fi transformat, poți face ca a doua funcție să facă acest lucru.

```javascript
var opera = {
  titlu: 'Craii de Curtea-Veche'
}
var transformat = JSON.stringify(opera, (cheie, valoare) => {
  cheie === 'titlu' ? 'Sub pecetea tainei' : valoare;
});
// {"titlu":"Sub pecetea tainei"}
```

## Resurse

- [Introducing JSON](http://json.org/)
- [TIL — The power of JSON.stringify replacer parameter](https://pawelgrzybek.com/til-the-power-of-json-stringify-replacer-parameter/)


## Sursă de date

Request:
GET /viaf/search?query=cql.any%20%3D%20%22Caragiale%22&maximumRecords=5&httpAccept=application%2Fjson
