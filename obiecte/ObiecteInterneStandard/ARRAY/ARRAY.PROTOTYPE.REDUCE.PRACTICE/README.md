# CSV to JSON

Acesta este un exemplu practic de folosirea a lui reduce pentru a transforma datele dintr-un CSV într-un JSON.
Fișierul de lucru este constituit din date privind proiectele de cercetare științifică finanțate prin Orizont 2020 în care sunt și parteneri români.

Datele acestui fișier sunt structurate în rânduri. Datele privind un proiect se repetă pentru fiecare participant.
Ceea ce este nevoie, este o structură care să adune datele privind partenerii sub un singur proiect cu descrierea aferentă.

O subset exploratoriu arată astfel:

```csv
Grant Agreement Number;Project Acronym;Project Title;Call ID;Start Date;End Date;Data Pilot;Discipline;Organization;Country;Role;Person Name;Person Second Names;Person Email;site;site local
643316;PROSME-INN;PROSME SME- Improving management of innovation processes in SMEs;H2020-Adhoc-2014-20;01.07.2014;01.01.2015;false;Horizon 2020 Framework Programme;ASOCIATIA ROMANA PENTRU INDUSTRIA ELECTRONICA SI SOFTWARE;RO;p;vezi Monica Motoaca;;;;
643316;PROSME-INN;PROSME SME- Improving management of innovation processes in SMEs;H2020-Adhoc-2014-20;01.07.2014;01.01.2015;false;Horizon 2020 Framework Programme;FUNDATIA CENTRUL ROMAN PENTRU INTREPRINDERI MICI SI MIJLOCII;RO;coordinator;Monica MOTOACA;;mnicola@imm.ro;;
```

Este observabilă repetiția supărătoare a datelor de identificare a proiectului, dat fiind faptul că structura tabelară era oriectată către evidența participanților și nu pe structurarea după proiect.

Reordonarea are drept țintă generarea unei structuri reprezentată de un obiect JSON pentru fiecare proiect în parte. Modelul este indicat mai jos:

```js
{
  "643316": [{
      "project": {
          "acronym": "PROSME-INN",
          "name": "PROSME SME- Improving management of innovation processes in SMEs",
          "idCall": "H2020-Adhoc-2014-20",
          "framework": "Horizon 2020 Framework Programme",
          "period": {
              "start": "01.07.2014",
              "end": "01.01.2015"
          },
          "opening": {
              "dataPilot": "false"
          },
          "website": {
              "global": "",
              "local": ""
          }
      }
  }, {
      "legalentity": {
          "country": "RO",
          "body": "ASOCIATIA ROMANA PENTRU INDUSTRIA ELECTRONICA SI SOFTWARE",
          "quality": "p",
          "contact": {
              "name": "vezi Monica Motoaca",
              "surname": "",
              "email": ""
          },
          "longlat": []
      }
  }, {
      "legalentity": {
          "country": "RO",
          "body": "FUNDATIA CENTRUL ROMAN PENTRU INTREPRINDERI MICI SI MIJLOCII",
          "quality": "coordinator",
          "contact": {
              "name": "Monica MOTOACA",
              "surname": "",
              "email": "mnicola@imm.ro"
          },
          "longlat": []
      }
  }]
}
```

Pentru a face această transformare, vom folosi Node.js pentru a creea cadrul și următoarea miniaplicație:

```js
var fs = require('fs');
var path = require('path');

var transform = fs.readFileSync('H2020_versiune_consolidata_adaugata_mai_2016pctvirg.csv', 'utf8')
.trim()
.split("\n")
.map(line => line.split(';'))
.slice(1)
.reduce((proiectele, unProiect) => {

  proiectele[unProiect[0]] = proiectele[unProiect[0]] || [
    {
      "project": {
        "acronym": unProiect[1], "name": unProiect[2],
        "idCall": unProiect[3], "framework": unProiect[7],
        "period": {"start": unProiect[4], "end": unProiect[5]},
        "opening": {"dataPilot": unProiect[6]},
        "website": {"global": unProiect[14], "local": unProiect[15]}
      }
    }
  ];
  proiectele[unProiect[0]].push({
      "legalentity":{
        "country": unProiect[9], "body":  unProiect[8], "quality": unProiect[10],
        "contact": {
          "name": unProiect[11], "surname": unProiect[12], "email": unProiect[13]
        },
        "longlat": []
      }
  });

  return proiectele;
},{});

// setează calea și fișierul de ieșire
var outPath = path.join(__dirname, 'fileTest.json');

fs.writeFileSync(outPath, JSON.stringify(transform), 'utf8', function(err){console.log(err);});
```

Variabila transform, la final conține rezultatul transformării cu reduce. Acest rezultat va fi scris într-un fișier.
Pentru o mai bună înțelegere a întregii proceduri, vom descrie fiecare etapă aplicată:

1. Folosești utilitarul Node.js `fs` pentru a citi fișierul csv: `fs.readFileSync('H2020_versiune_consolidata_adaugata_mai_2016pctvirg.csv', 'utf8')`
2. trim() este o metodă a obiectului String care elimină de la capetele fișierului CSV „spațile goale”.
3. split("\n"), o metodă a lui String, va sparge șirul cursiv din fișierul CSV la întâlnirea caracterului special CR (`carriage return`). Acum avem un array în care fiecare element este o linie din fișierul CSV.
4. map ia fiecare element din array-ul abia constituit și returnează un array nou care va conține array-uri generate din valorile conținute în elementele prin folosirea lui split, care va sparge la întâlnirea caracterului `;`.
5. vom „șterge” primul element, adică array-ul care conținea denumirile coloanelor. Se va folosi metoda slice a lui Array (vezi Array.prototype.slice()).
6. Aplicăm metoda reduce care necesită propriul set de explicații.

Mecanismul reduce explicat:

Prima iterație:
**proiectele** (currentValue) este {} menționat ca al doilea argument al lui reduce.
**unProiect** (nextValue) este primul element din array-ul prelucrat. Acesta este la rândul lui un array.

Se va genera un obiect în care se va introduce o cheie - `proiectele[unProiect[0]]`. Valoarea primei chei a obiectului va fi prima valoare din array-ul prelucrat - `unProiect[0]` (numărul de identificare a proiectului). Toate cheile noului obiect creat, de fapt, vor fi prima valoare a fiecărui array care va fi prelucrat.
Structura realizată va arăta similar:

```js
{
  "633085": [],
  "633297": [],
  // ... ș.a.m.d.
}
```

## Acum se face ceea ce se numește pliere. 

Trebuie să amintim structura CSV-ului, unde fiecare rând repeta elementele descriptive ale proiectului. Ceea ce dorim să realizăm, este să introducem prima cheie din obiect cu valoarea primei chei din array-ul prelucrat. În acest moment, unde vor exista mai multe array-uri care conțin aceeași valoare pentru prima cheie, aceasta va fi „comparată” cu cea existentă. Magia este că în cazul în care acestea corespund, nu se va crea o cheie nouă în obiect, ci se va adăuga informație la cel obiectul cu aceeași cheie preexistent. În cod, secvența magică este: `proiectele[unProiect[0]] = proiectele[unProiect[0]] || [...]`. Se înțelege ușor faptul că în cazul în care cheia nu există va fi introdusă și se va scrie informația care va sta ca valoare în rezultatul final. Adică un array care va conține: descriere proiect, partener1, partener2, etc. Această procedură se va repeta pentru toate array-urile care sunt elementele array-ului mare.

În cazul partenerilor, trebuie aplicat alt truc. La inițierea cheii (numărul de identificare a proiectului), aceasta trebuie să genereze array-ul care va conține descrierea și rând pe rând partenerii, acestea ca obiecte distincte. Acestea vor trebui „injectate” în array-ul generat la constituirea cheii pe măsură ce array-ul este procesat.

La final, este returnat întregul obiect construit.

```js
"633297":
  [
    {
    "project": {
        "acronym": "R4H1415",
        "name": "RESEARCHERS FOR HUMANITY",
        "idCall": "H2020-MSCA-NIGHT-2014",
        "framework": "Horizon 2020 Framework Programme",
        "period": {
          "start": "01.05.2014",
          "end": "01.11.2015"
        },
        "opening": {
          "dataPilot": "false"
        },
        "website": {
          "global": "http://r4h.ro/",
          "local": ""
        }
      }
    },
    {
    "legalentity": {
      "country": "RO",
      "body": "ASOCIATIA INVENIO",
      "quality": "coordinator",
      "contact": {
        "name": "Oana",
        "surname": "CALIN",
        "email": "oanamaria@yahoo.com"
        }
      }
    },
    {
    "legalentity": {
        "country": "RO",
        "body": "CENTRUL PENTRU STUDII COMPLEXE",
        "quality": "p",
        "contact": {
            "name": "",
            "surname": "",
            "email": "office@complexity.ro"
        },
        "longlat": []
      }
    },
    {
    "legalentity": {
        "country": "RO",
        "body": "Institutul National de Cercetare pentru Sport",
        "quality": "p",
        "contact": {
            "name": "",
            "surname": "",
            "email": ""
        },
        "longlat": []
      }
    },
    {
    "legalentity": {
        "country": "RO",
        "body": "TARGET ACTIVE TRAINING",
        "quality": "p",
        "contact": {
            "name": "",
            "surname": "",
            "email": ""
        },
        "longlat": []
    }
}]
```
