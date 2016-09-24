var fs = require('fs');
var path = require('path');

var transform = fs.readFileSync('H2020_versiune_consolidata_adaugata_mai_2016pctvirg.csv', 'utf8')
.trim()
.split("\n")
.map(line => line.split(';'))
.slice(1)
.reduce((proiectele, unProiect) => {

  proiectele[unProiect[0]] = proiectele[unProiect[0]] ||

  [
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
        }
      }
  });

  return proiectele;
},{});

// setează calea și fișierul de ieșire
var outPath = path.join(__dirname, 'fileTest.json');

fs.writeFileSync(outPath, JSON.stringify(transform), 'utf8', function(err){console.log(err);});
