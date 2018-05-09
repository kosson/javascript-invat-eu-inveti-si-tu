# Calea către async

## for() - ECMAScript 1 (1997)

## forEach() - ECMAScript 5.1 (2011 - JavaScript 1.6)

Primul pas este înțelegerea prelucrării array-urilor fără a folosi bucle.

```javascript
[1,2,3].forEach( elem => console.log(elem) );
```

Extragerea de valori dintr-un set de obiecte.

```javascript
let obi = [
        {
            "id": "/9200101/BibliographicResource_1000126630143",
            "edmDatasetName": ["9200101_Ag_EU_TEL_Europeana_Libraries_a1012"],
            "title": ["La configuración del espacio en la obra de Mateiu Caragiale"],
            "dcDescription": [
                "por José María Pallás Ruiz ; bajo la dirección de, Eugenia Popeanga.",
                "Tesis de la Universidad Complutense de Madrid, Facultad de Filología, Departamento de Filología Románica, leída el 06-05-2003.",
                "Audience: Specialized"
            ],
            "dcCreator": ["José María. Pallás Ruiz"],
            "provider": ["The European Library"],
            "timestamp": 1525330536669,
            "year": [
                "2006",
                "2003"
            ],
            "language": ["es"],
            "guid": "http://www.europeana.eu/portal/record/9200101/BibliographicResource_1000126630143.html?utm_source=api&utm_medium=api&utm_campaign=MH8g7bXXX",
            "link": "http://www.europeana.eu/api/v2/record/9200101/BibliographicResource_1000126630143.json?wskey=MH8g7bXXX"
        },
        {
            "id": "/9200102/BibliographicResource_2000081692756",
            "edmDatasetName": ["9200102_Ag_EU_TEL_Europeana_Libraries_a1002"],
            "title": ["Conocer Bucarest a través de Mateiu Ion Caragiale (I)"],
            "dcDescription": [
                "Mateiu Ion Caragiale offers us in his novel Craii de Curtea Veche (1929) a literary presentation of the city of Bucharest. This urban space is the main protagonist of the novel, and the directory of real places mentioned and characterized, enable the reconstruction of the image of the city at the beginning of the 20th century. The movements of the characters, organized according to the four routes that make up the piece, have been sketchy, and is cited in Spanish and Romanian a fragment of the work in which are mentioned. The most important and representative spaces are explained briefly, and when possible are illustrated with pictures.",
                "Mateiu Ion Caragiale nos ofrece en su novela Craii de Curtea-veche (1929) una presentación literaria de la ciudad de Bucarest. Este espacio urbano es el gran protagonista de la novela, y el repertorio de lugares reales citados y caracterizados permite reconstruir la imagen de la ciudad a principios del siglo XX. Los desplazamientos de los personajes, organizados en función de los cuatro itinerarios de que consta la pieza, han sido esquematizados, y se citan en español y en rumano fragmentos de la obra en que son mencionados. Los espacios más importantes y representativos se explican brevemente y, cuando ha sido posible, se han ilustrado con imágenes."
            ],
            "dcCreator": ["Pallás Ruiz, José María"],
            "provider": ["The European Library"],
            "timestamp": 1501884922790,
            "year": ["2012"],
            "language": ["es"],
            "guid": "http://www.europeana.eu/portal/record/9200102/BibliographicResource_2000081692756.html?utm_source=api&utm_medium=api&utm_campaign=MH8g7bXXX",
            "link": "http://www.europeana.eu/api/v2/record/9200102/BibliographicResource_2000081692756.json?wskey=MH8g7bXXX"
        },
        {
            "id": "/2051917/data_euscreenXL_EUS_6FEF8EEFD8799D2A0F8F26B751B04F0A",
            "edmDatasetName": ["2051917_Ag_EU_EUscreenXLCore_1023"],
            "title": [
                "The Book 24/05/2004",
                "Cartea 24/05/2004",
                "SERIES TITLE: "
            ],
            "dcDescription": [
                "Reinterpretations of classic Romanian writers- Mateiu Caragiale- \"Rereadings\", Mircea Braga- \"Interpretative folding back\", Liviu Rebreanu- \"Ciuleandra\", \"Adam and Eva\".",
                "Original language summary: <br/>\nReinterpretari ale scriitorilor romani fundamentali- Mateiu Caragiale \"Recitiri\", Mircea Braga - \"Replieri interpretative\", Liviu Rebreanu- \"Ciuleandra\", \"Adam si Eva\".",
                "Information:\nThis programme is presented by Ion Bogdan Lefter, poet and essayist, literary and historian critic"
            ],
            "provider": ["EUscreen"],
            "timestamp": 1501856490868,
            "year": ["2004"],
            "language": ["mul"],
            "guid": "http://www.europeana.eu/portal/record/2051917/data_euscreenXL_EUS_6FEF8EEFD8799D2A0F8F26B751B04F0A.html?utm_source=api&utm_medium=api&utm_campaign=MH8g7bXXX",
            "link": "http://www.europeana.eu/api/v2/record/2051917/data_euscreenXL_EUS_6FEF8EEFD8799D2A0F8F26B751B04F0A.json?wskey=MH8g7bXXX"
        }
    ];
function filter (obi) {
  let rezultat = [];
  obi.forEach(function (elem) {
    if(elem.language == "es") {
      rezultat.push({id: elem.id, title: elem.title});
    };
  });
  return rezultat;
};
let x = filter(obi);
console.log(x);
```

## map()

```javascript
console.log([1,2,3].map( elem => ++elem )); // [2, 3, 4]
```
