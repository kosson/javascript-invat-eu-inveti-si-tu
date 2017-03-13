# `String.prototype.replace()`

Metoda returnează un nou șir care a incorporat modificări a unor părți care s-au potrivit criteriilor de căutare sub forma unui alt string sau al unui `RegExp` și care sunt înlocuite de un alt șir sau de rezultatul execuției unei funcții.

Pe scurt, ai un șir, faci o căutare după un alt șir sau RegExp și înlocuiești ceea ce ai găsit cu un alt șir sau rezultatul unei funcții.

```js
var continut = "Eu am fost trimis în lume";
var deinlocuit = "parasutat";

var noulcontinut = continut.replace("trimis", deinlocuit);
console.log(noulcontinut); // Eu am fost parasutat în lume
```
##### Folosirea unui regex pentru a găsi un fragment și înlocuirea cu un alt șir prestabilit

replace() poate folosi un regex pentru a face o înlocuire.

```js
var continut = "Acesta este un text demonstrativ";
var noulContinut = continut.replace(/\w{4,}/ig, '****');
console.log(noulContinut); // **** **** un **** ****
```

Un exemplu util ar fi căutarea și înlocuirea într-o sursă html a unui tag și înlocuirea cu un altul.

```js
var sursa = '<html><head></head><body><p>Lorem ipsum <span>ceva</span> mai mult</p></body></html>';
var modificat = sursa.replace(/<span>(.*)<\/span>/ig, '<strong>$1</strong>');
console.log(modificat);
// <html><head></head><body><p>Lorem ipsum <strong>ceva</strong> mai mult</p></body></html>

// cazul in care ai două spanuri
var sursa2 = '<html><head></head><body><p>Lorem ipsum <span>ceva</span> mai <span>mult</span></p></body></html>';
var modificat2 = sursa2.replace(/<span>(.*)<\/span>/ig, '<strong>$1</strong>');
console.log(modificat2);
// <html><head></head><body><p>Lorem ipsum <strong>ceva</span> mai <span>mult</strong></p></body></html>
// <strong>ceva</span> mai <span>mult</strong> se întâmplă tocmai că regexul este greedy, adică pornește de la prima identificare și include până după ultima din șir

// Pentru a-l face lazy, pui un semnul întrebării în grup
var modificat3 = sursa2.replace(/<span>(.*?)<\/span>/ig, '<strong>$1</strong>');
console.log(modificat3);
// <html><head></head><body><p>Lorem ipsum <strong>ceva</strong> mai <strong>mult</strong></p></body></html>
```

##### Folosirea regexurilor pentru a inversa două cuvinte

```js
var re = /(\w+)\s(\w+)/;
var str = 'Nume Prenume';
var newstr = str.replace(re, '$2, $1'); // observă faptul că poți modela șirul creat (a fost pusă o virgulă)
console.log(newstr);  // Prenume, Nume
```

Pentru a înțelege ce este cu $1 și $2, vezi capitolul dedicat **Expresiilor Regulate**.

##### Folosirea regexurilor pentru a transforma intern un șir (ex: borderTop în border-top; exemplu oferit de MDN)

```js
function styleHyphenFormat(propertyName) {

  // transformarea șirului în lowercase
  function upperToHyphenLower(match) {
    return '-' + match.toLowerCase(); // returnează caracterul majuscul identificat cu o liniuță în față
  }

  // identifică caracterele majuscule din întreg șirul și aplică-le funcția de transformare
  return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
}
styleHyphenFormat("borderTop"); // border-top
```

##### Folosirea unui regex pentru a găsi un fragment și înlocuirea cu ce returnează o funcție

În locul unui string predefinit, poți introduce o funcție ca un al doilea parametru, care să folosească un obiect `RegExp`.
În acest caz, funcția va fi invocată imediat ce a fost găsit un șir care să se potrivească regex-ului. Rezultatul funcției, care va fi returnat, va fi folosit ca șir de caractere ce va fi înlocuit. ATENȚIE! Funcția va fi invocată ori de câte ori se va găsi șirul căutat după modelul construit de regex. Condiția ca acest lucru să se întâmple este ca obiectul `RegExp` să fie declarat la nivel global (introdu switch-ul g în regex).

Argumentele pe care le poate lua o funcție sunt după cum urmează:

| Posibilă denumire a parametrului | Valoarea introdusă                     |
|:---------------------------------|:---------------------------------------|
| match (de ex: /(\a+)(\b+)/ )     | șirul după care se face căutarea       |
| p1, p2, ș.a.m.d.                 | bucata de șir de căutare* dintre paranteze la formarea șablonului RegExp|
| offset                           | este indexul de la care să pornească căutarea |
| string                           | indică faptul că se va face căutare în tot șirul |

Mai jos este exemplul propus de Mozilla Developer Network pentru  [replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) .

```js
function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString); // abc - 12345 - #$*%
```

Un alt exemplu oferit de MDN este cel al transformării gradelor Celsius în grade Fahrenheit.

```js
function f2c(x) {

  function convert(str, p1, offset, s) {
    return ((p1 - 32) * 5/9);
  }

  var test = /(-?\d+(?:\.\d*)?)F\b/g;
  // identifică dacă e un minus, identifică unul sau mai mulți digiți
  // se face grup -> ?: spune că va face identificarea unui grup pentru care nu se va face captură
  // identifică dacă există vreun punct
  // identifică toți digiții - se închide grupul
  // ? identifică dacă ceea ce este în grup există o singură dată

  return x.replace(test, convert);
}
var nr = f2c('250.23F'); // 121.238888888888
console.log(nr);
console.log(Math.floor(nr)); // 121
 //
```

##### Folosirea unui regex cu replace pentru a evita folosirea unei bucle `for`

Am putea presupune că avem un dispozitiv, o funcție, etc., care produce semnale sau chiar scrie fragmente de text care să indice o stare.
Exemplul de mai jos este preluat de la MDN, dar este adaptat.

```js
// va prelua un șir
// va genera un array, care va converti informația brută din șir în informație descrisă
var sir = "0100111010001";
var arr = [];
sir.replace(/(0+)|(1+)/g, function(match, p1, p2, string){
  if(p1){arr.push({semnal: false, frecvență: p1.length});};
  if(p2){arr.push({semnal: true, frecvență: p2.length});};
});
console.log(JSON.stringify(arr));
// [{"semnal":false,"frecvență":1},{"semnal":true,"frecvență":1},{"semnal":false,"frecvență":2},{"semnal":true,"frecvență":3},{"semnal":false,"frecvență":1},{"semnal":true,"frecvență":1},{"semnal":false,"frecvență":3},{"semnal":true,"frecvență":1}]
```
