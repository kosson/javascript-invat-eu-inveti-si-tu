# RegExp.prototype[@@replace]()

Metoda `[@@replace]()` face o înlocuire de caractere și returnează noul șir rezultat după înlocuire. Lucrul cu care se face înlocuirea poate fi un șir sau o funcție a cărei rezultat la evaluare va constitui valoarea de înlocuire. Se observă imediat faptul că avem de-a face cu un symbol. Această metodă va fi apelată și de `String.prototype.replace()`, dacă argumentul ce reprezintă subșirul de căutare, de fapt este un obiect `RegExp`.

```javascript
var sir = 'ceva';
sir = sir.replace(/ev/g, 'an');
console.log(sir); // cana
```

Această metodă poate fi apelată direct așa cum este, dar cel mai adesea este apelată la utilizarea metodei `replace` din obiectul prototype al lui `String`. Dincolo de acest detaliu, metoda este direct apelabilă.

```javascript
/abc/[Symbol.replace]('abcde', 'Ca'); // "Cade"
```

## Cazul String.prototype.replace()

### Înlocuirea cu un alt șir prestabilit

Metoda `replace()` poate folosi un șablon `RegExp` pentru a face o înlocuire.

```javascript
var continut = "Acesta este un text demonstrativ";
var noulContinut = continut.replace(/\w{4,}/ig, '****');
console.log(noulContinut); // **** **** un **** ****
```

#### Folosirea parametrizării

Parametrii nu sunt incluși în standard, dar au fost acceptați de comunitate pentru ajutorul pe care-l oferă. Parametrii care pot fi de la `$1` la `$9`, se *încarcă* cu subșirul găsit în ordinea găsirii lor. Un exemplu util ar fi căutarea și înlocuirea într-o sursă html a unui tag și înlocuirea cu un altul.

```javascript
var sursa = `
<html>
  <head></head>
  <body>
    <p>Lorem ipsum <span>ceva</span> mai mult</p>
  </body>
</html>`;
var modificat = sursa.replace(/<span>(.*)<\/span>/ig, '<strong>$1</strong>');
console.log(modificat);
// <html><head></head><body>
//  <p>Lorem ipsum <strong>ceva</strong> mai mult</p>
// </body></html>
```

Înlocuirea poate eșua pentru motivul că motorul RegExp are un comportament **greedy**.
Să vedem un exemplu care ilustrează cât de *vorace* este motorul. Să presupunem că în fragmentul nostru de cod HTML avem două `span`-uri, pe care dorim să le înlocuim cu altceva.

```javascript
var sursa2 = `
<html>
  <head></head>
  <body>
    <p>Lorem ipsum <span>ceva</span> mai <span>mult</span></p>
  </body>
</html>`;
var modificat2 = sursa2.replace(/<span>(.*)<\/span>/ig, '<strong>$1</strong>');
console.log(modificat2);
```

Rezultatul este unul nedorit: `<p>Lorem ipsum <strong>ceva</span> mai <span>mult</strong></p>`. Comportamentul greedy al motorului a condus la identificarea cu succes a subșirului, când aceasta a apărut prima dată, dar a continuat să parcurgă șirul până l-a epuizat, făcându-ne un ultim serviciu prin înlocuirea ultimului subșir care se potrivea regulilor. Pentru a regla acest comportament, se va adăuga metacaracterul `?`, care va avea ca efect anularea comportamentului greedy.

```javascript
var modificat3 = sursa2.replace(/<span>(.*?)<\/span>/ig, '<strong>$1</strong>');
console.log(modificat3);
// <p>Lorem ipsum <strong>ceva</strong> mai <strong>mult</strong></p>
```

Un alt exemplu interesant este inversarea a două cuvinte.

```javascript
var re = /(\w+)\s(\w+)/;
var str = 'Nume Prenume';
var newstr = str.replace(re, '$2, $1'); // observă faptul că poți modela șirul creat (a fost pusă o virgulă)
console.log(newstr);  // Prenume, Nume
```

#### Folosirea regexurilor pentru a transforma intern un șir (ex: borderTop în border-top; exemplu oferit de MDN)

```javascript
function propCSS(numeProp) {

  // transformarea șirului în minuscule
  function miciSiCuLinie(match) {
    return '-' + match.toLowerCase();
  };

  // identifică caracterele majuscule din
  // întreg șirul și aplică-le funcția de transformare
  return numeProp.replace(/[A-Z]/g, miciSiCuLinie);
}
propCSS("borderTop"); // border-top
```

### Folosirea unei funcții

În locul unui string predefinit, poți introduce o funcție ca un al doilea parametru.
În acest caz, funcția va fi invocată imediat ce a fost găsit un șir care să se potrivească șablonului. Rezultatul funcției, care va fi returnat, va fi folosit ca șir de caractere ce va fi înlocuit. Atenție, funcția va fi invocată ori de câte ori se va găsi șirul căutat după modelul construit de regex. Condiția ca acest lucru să se întâmple este ca obiectul `RegExp` să fie declarat la nivel global (introdu fanionul **g** în regex).

Argumentele pe care le poate lua o funcție sunt după cum urmează:

#### Primul argument: un șablon

Primul argument al funcției este un șablon `RegExp`. Ca acesta să funcționeze, acesta trebuie constituit din grupuri. Spuneam atunci când discutam grupurile că, de fapt un grup este o expresie secundară care poate fi considerată a fi o unitate distinctă. Ținând cont de acest lucru, șablonul se va constitui din grupuri, cărora, mai târziu, li se vor putea atașa un parametru. Acesta va referi subșirurile descoperite.

#### Al doilea până la parametrul n

Începând cu al doilea parametru ne confruntăm cu parametrizări ale grupurilor setate în șablon. Câte grupuri au fost constituite, tot atâția parametri vor urma care vor prelua valorile descoperite în șir prin potrivirea cu regulile fiecărui grup în ordinea în care au fost introduse în șablon. Să presupunem că în șablon avem trei grupuri: `/(ab)(cd)(ef)/`. Pentru fiecare dintre ele se va adăuga un parametru după șablon, identificând în ordine fiecare dintre ele. Acești parametri sunt redactați după următoarea regulă de scriere: semnul dollar urmat de o cifră. De exemplu, o serie de astfel de parametri ar fi redactați astfel: `$1, $2, $3`. Observă că numărătoarea pornește de la `1`.

În acest context voi aminti și alte formule, care aduc alte valori din șir la momentul în care se face `replace`-ul:

-   **$$**, va avea ca efect inserarea chiar a lui `$`,
-   **$\&**, va insera subșirul care a fost găsit,
-   **$`**, va insera chiar porțiunea de șir care precedă subșirul găsit,
-   **$'**, va introduce un fragment din șirul după fragmentul identificat.

#### Penultimul parametru

Acesta va fi identificatorul pentru valoarea numerică a indexului de la care să pornească căutarea în șir.

#### Ultimul parametru

Este chiar întregul șir care va fi parcurs.

Mai jos este exemplul propus de Mozilla Developer Network pentru  [replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) .

```javascript
function inlocuitor(șablon, p1, p2, p3, idxStart, șir) {
  // p1 fiind litere, p2 cifre și p3 orice altceva
  return [p1, p2, p3].join(' - ');
}
var noulȘir = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, inlocuitor);
console.log(noulȘir); // abc - 12345 - #$*%
```

Un alt exemplu oferit de MDN este cel al transformării gradelor Celsius în grade Fahrenheit.

```javascript
function f2c(x) {
  function convert(str, p1, offset, s) {
    return ((p1 - 32) * 5/9);
  };
  var test = /(-?\d+(?:\.\d*)?)F\b/g;
  // identifică dacă e un minus, identifică unul sau mai mulți digiți
  // se face grup -> ?: spune că va face identificarea unui grup pentru care nu se va face captură
  // identifică dacă există vreun punct
  // identifică toți digiții - se închide grupul
  // ? identifică dacă ceea ce este în grup există o singură dată

  return x.replace(test, convert);
};
var nr = f2c('250.23F'); // 121.238888888888
console.log(nr);
console.log(Math.floor(nr)); // 121
```

### Evitarea unei bucle for printr-un replace

Am putea presupune că avem un dispozitiv, o funcție, etc., care produce semnale sau chiar scrie fragmente de text care să indice o stare.
Exemplul de mai jos este preluat de la MDN, dar este adaptat.

```javascript
// va prelua un șir
// va genera un array, care va converti
// informația brută din șir în informație descrisă
var sir = "0100111010001";
var arr = [];
sir.replace(/(0+)|(1+)/g, function(match, p1, p2, string){
  if(p1){arr.push({semnal: false, frecvență: p1.length});};
  if(p2){arr.push({semnal: true, frecvență: p2.length});};
});
console.log(JSON.stringify(arr));
// [{"semnal":false,"frecvență":1},{"semnal":true,"frecvență":1},{"semnal":false,"frecvență":2},{"semnal":true,"frecvență":3},{"semnal":false,"frecvență":1},{"semnal":true,"frecvență":1},{"semnal":false,"frecvență":3},{"semnal":true,"frecvență":1}]
```







```javascript
var uri = 'http://joergkrause.de/index.php?cat=113&prod=2605&query=apress';
var queryString = {};
uri.replace( /([^?=&]+)(=([^&]*))?/g, function($0, $1, $2, $3) { queryString[$1] = $3; });
console.log(queryString);
for (var i in queryString){
  if (!queryString[i]) continue;
  console.log(i + " = " + queryString[i]);
}
```


```javascript
var geojson = `{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "nume": "Universitatea de Arhitectură și Urmanism „Ion Mincu”"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          26.101128458976746,
          44.436246646715695
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "nume": "Universitatea din București"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          26.101160645484924,
          44.43588659224198
        ]
      }
    }
  ]
}`; // constituit cu geojson.io
```
