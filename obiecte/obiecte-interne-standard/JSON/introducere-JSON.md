# Obiectul global JSON - introducere

JSON este acronimul de la JavaScript Object Notation. JSON este un formate de date standardizat de ECMA: ECMA-404 The JSON Data Interchange Standard.

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
          "text": "Cariagiale, Ion Luca, 1853-1912",
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

## Metoda JSON.stingify() - serializarea

Această metodă primește ca prin argument un obiect JavaScript și atunci când se dorește un al doilea argument acesta este o funcție care prelucrează rezultatul într-un anumit fel.

```javascript
const obi = {
    titlu: 'Craii de Curtea-Veche',
    autor: 'Mateiu Caragiale'
};
let json = JSON.stringify(obi, ['titlu', 'autor']);
//  "{\"titlu\":\"Craii de Curtea-Veche\",\"autor\":\"Mateiu Caragiale\"}"
```

## Resurse

-   [Introducing JSON](http://json.org/)


## Sursă de date

Request:
GET /viaf/search?query=cql.any%20%3D%20%22Caragiale%22&maximumRecords=5&httpAccept=application%2Fjson
