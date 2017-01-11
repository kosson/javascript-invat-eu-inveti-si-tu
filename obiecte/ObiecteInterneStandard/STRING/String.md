# Obiectul intern String

TODO: Sparge documentul pe metode precum celelalte obiecte interne.

Este un constructor pentru string-uri.

Stăpânirea consolidată prin practică a șirurilor de caractere va permite manipularea datelor de tip `.txt, .csv, .json, etc.`. Combinarea lucrului pe șiruri de caractere cu lucrul pe array-uri, va permite transformări dintr-un format în altul, de manipulare la transferomare, de îmbogățire și de segmentare a datelor.

Obiectul global String este un constructor de șiruri de caractere.

Stringurile pot fi create direct cu `String(ceva)`, în care `ceva` este orice ar putea fi convertit la string.

## Dependințe cognitive
- primitiva string
- Expresii Regulate
- Obiecte
- Obiectul intern RegExp

JavaScript nu face diferență între string-urile între ghilimele și cele duble.

## Mantre
- Pentru a concatena se folosește operatorul `+`.
- JavaScript face o diferență foarte clară între obiectul String și primitiva șir. Același lucru se aplică și în cazul obiectelor Boolean și Number cu ale lor corespondențe la primitive.
- JavaScript face automat conversia de la primitiva șir la obiectul String. Astfel este posibilă aplicarea metodelor obiectului.
- șirurile în JavaScript sunt imuabile (nu se modifică șirul original),
- șirurile sunt „consumate” de JavaScript de la stânga la dreapta,
- din moment ce un caracter a fost „consumat”, acesta nu mai este folosit,
- JavaScript convertește automat primitivele șir în obiecte String, fiind astfel posibilă folosirea metodelor obiectului String pentru primitivele string,
- pentru a te asigura că poți face căutarea fără a te lovi de posibilele majuscule, mai întâi convertește toate caracterele șirului în minuscule folosind toLowerCase(). De exemplu: `var sir = "Acesta este un SIR"; sir.toLowerCase().startsWith("acesta"); // true`.

Caracterele speciale vor putea fi menționate în string-uri folosindu-se notația escape:

| NULL | ghilimele simple | ghilimele duble | backslash | linie nouă | carriage return | tab vertical | tab | backspace | form feed | Unicode | Latin-1 |
|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|
| `\0` | `\'` | `\"` | `\\` | `\n` | `\r` | `\v` | `\t` | `\b` | `\f` | `\uXXXX` | `\xXX` |

## Crearea obiectelor String

### Folosind constructorul: `new String()`
```js
var str = new String("test");
```

## Proprietăți

String.length și String.prototype

## Metode statice

String.fromCharCode() și String.fromCodePoint()

## Lista metodelor disponibile stringurilor

| obiectul în sine      | to                 | formatare    | identificare  | extragere     | evenimente    | manipulare    |
| :------------         | :------------      | :------------| :-------------| :-------------| :-------------| :-------------|
| constructor()         | toLocalLowerCase() | anchor()     | charAt()      | slice()       | watch()       | concat()      |
| isPrototypeOf()       | toLocalString()    | * big()      | charCodeAt()  | substr()      | unwatch()     | repeat()      |
| propertyIsEnumerable()| toLocalUppperCase()| * bold()     | codePointAt() | substring()   |               | replace()     |
| hasOwnProperty()      | toLowerCase()      | * fontsize() | indexOf()     | trim()        |               | split()       |
|                       | toSource()         | textcolor()  | lastIndexOf() | trimLeft()    |               | localCompare()|
|                       | toString()         | italics()    | length()      | trimRight()   |
|                       | toUpperCase()      | link()       | search()      |
|                       |                    | * small()    | endsWith()    |
|                       |                    | * strike()   | startsWith()  |
|                       |                    | * sup()      | valueof()     |
|                       |                    | * blink()    | contains()    |
|                       |                    | * sub()      | inludes()     |
|                       |                    | * fixed()    | match()       |
|                       |                    | * normalize()|

( * nu mai sunt suportate de standard )

## Anatomia unui șir de caractere

Literele dintr-un `șir` se așează într-o ordine de la stânga la dreapta iar fiecare caracter este indexat purtând câte un număr începând de la 0.
Un șir de caractere are o lungime care poate fi aflată printr-un simplu `var sir = 'cateva caractere'; sir.length;`.
Numărul de index al ultimului caracter se poate afla prin determinarea lungimii șirului din care se scade o unitate: `var sir = 'cateva caractere'; sir.length - 1;`. Acea unitate se scade pentru că numerotarea se începe, de fapt de la 0. Dacă ai 16 caractere, numărul de index al ultimului caracter este 15.

### Lungimea unui șir

Poate fi aflată prin invocarea proprietății .length direct pe șir:

```js
'cevatext'.length; // 8
```

`'cevatext'.length` este echivalent cu `'cevatext'.lastIndexOf(''); // 8`

`String.length` returnează valoarea 1, iar când stringul este gol este returnată valoarea 0 (`''.length; // 0`)

### Lucrul cu indexul

Este esențială înțelegerea indexului pentru că acesta poate fi considerat ca o adresă a caracterului. Închipuiește-ți că ești în fața unui perete, pe care sunt înșiruite tablouri, numai că în loc de eticheta cu autorul sau descrierea conținutului, este numărul de inventar care pornește de la 0.

Metodele indexOf() și lastIndexOf() pot fi utilizate pentru căutarea unui substing într-un string. ```indexOf("substring")``` returnează valoarea indexului de la care începe substringul pasat ca argument.
`indexOf()` și `lastIndexOf()` pot primi un al doilea parametru care indică indexul de la care să pornească căutarea. Dacă al doilea parametru nu este menționat, căutarea se va face de la index 0. Dacă nu este este găsit substringul, va fi returnată valoarea -1.

### Extragerea substringurilor

| t | e | s | t | e |   | d | e |   | s | t | r | i | n | g | u | r | i |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 |


```js
var str = "teste de stringuri";

str.substr(11, 3); // => "rin"

str.substring(11, 14); // => "rin"

str.slice(11, 14); // => "rin"

str.substring(11, 3); // => "te de st"
```

#### `String.prototype.slice()`

Taie un segment de caractere dintr-un șir de la indexul menționat ca prim argument, până la indexul menționat ca limită dar care nu include și valoarea de la acel index.

Este asemănătoare metodei cu același nume aplicată Array-urilor.

Acceptă două argumente care delimitează marginile de tăiere. Primul argument delimitează de unde începe extragerea segementului iar dacă este negativ, atunci se va face de la nume_array.legth -valoare_numar_negativ.

#### `String.prototype.indexOf()`

Este o metodă care returnează indexul unde apare pentru prima dată un fragment de text. Este returnat -1 dacă fragmentul nu este găsit. Atenție, dacă o parte a fragmentului este corectă și s-a greșit, fie și numai un caracter, nu se face identificarea și este returnat -1. Deci, trebuie să fie fix ceea ce este în textul în care se face căutare.

##### Cazuistică indexOf()

```js
// Caracterul sau fragmentul a fost identificat și se returnează valoarea de index al primei apariții în string
'cevatext'.indexOf('x'); // 6

// Caracterul sau fragmentul nu a fost identificat, căutare începută de la indexul specificat
'cevatext'.indexOf('x', 7); // -1

// Caracterul sau fragmentul nu a fost identificat
'cevatext'.indexOf('y'); // -1

// Returnarea numărului total de caractere
'cevatext'.indexOf('', 20); // 7 returnează numărul de caractere. Parametrul trebuie să fie cu mult peste lungimea șirului
```

##### Utilitate

***Acul în carul cu fân***

Poți verifica rapid dacă o secvență de text există într-un șir:

```js
'Rosinante era o mârțoagă, dar și identificatorul emis de un transponder'.indexOf('era o ') !== -1; // true
```

##### Reține:

`indexOf()` este case sensitive!: `'Ceva Mare'.indexOf('mare'); // -1`

#### `String.prototype.lastIndexOf()`

Returnează indexul ultimei apariții a fragmentului pentru care se face căutarea. Dacă valoarea nu este găsită, este returnat -1.
Opțional se poate menționa de unde să se înceapă căutarea prin specificarea unui index de la care să se pornească. Valoarea din oficiu pentru parametru este `str.length - 1`.

##### Reține:

Căutarea se face fix după caracterul sau fragmentul specificat. Atenție la caracterele mari, la spații și diacritice.
`lastIndexOf()` este case sensitive!
Căutările se fac în sens invers, de la dreapta spre stânga, având punctul de origine valoarea parametrului suplimentar iar atunci când acesta nu este specificat, cu valoarea de index a ultimului caracter din șir.
`'cevatext'.length` este echivalent cu `'cevatext'.lastIndexOf(''); // 8`

##### Cazuistică lastIndexOf()

```js
// Caracterul sau fragmentul a fost identificat și se returnează valoarea de index al ultimei apariții în string
'cevatext'.lastIndexOf('e');       // 5

// Caracterul sau fragmentul nu a fost găsit
'cevatext'.lastIndexOf('x', 2);    // -1 : Căutarea s-a făcut de la caracterul v spre stânga

// Când cauți un caracter sau un fragment cu care începe șirul, dar nu este acela
'cevatext'.lastIndexOf('x', 0);    // -1 : x nu este primul caracter din string
'cevatext'.lastIndexOf('x', -1);   // -1 : x nu este primul caracter din string

// Când cauți un caracter sau un fragment cu care începe șirul și știi care este caracterul sau fragmentul
'cevatext'.lastIndexOf('cev', -1); // 0 : deci, șirul începe cu fragmentul căutat
'cevatext'.lastIndexOf('c', 0);    // 0 : deci, șirul începe cu fragmentul căutat

// Caracterul sau fragmentul nu există sau este eronat scris (conține litere mari, mai multe spații, etc).
'cevatext'.lastIndexOf('y');       // -1

// Returnarea dimensiunii șirului
'cevatext'.lastIndexOf('');        // 8 fiind echivalent cu 'cevatext'.length
```

O combinație între substr și lastIndexOf.

```js
var fileName = window.location.href;
fileName = fileName.substr(fileName.lastIndexOf("/") + 1);
document.write("The file name of this page is " + fileName);
```

### Lucrul direct pe caractere și fragmente

#### UTF-16, câteva precizări utile.

UTF (Uniform Transformation Format) este un sistem de codare numerică a caracterelor. Aceste coduri pot fi percepute ca niște identificatori unici pentru caractere.
Codarea adresează ceea ce este numit un „code unit” și se face prin „code points”, codurile de identificare despre care vorbeam. UTF-16 oferă coduri până la limita de 2<sup>16</sup>, valori ce se înscriu în așa-numitul Basic Multilingual Plane (BMP) iar codurile care depășesc această limită sunt codificate prin două coduri de identificare care formează o pereche. Această stare de fapt poate conduce la erori în ceea ce privește manipularea caracterelor în JavaScript.

```javascript
let exemplu = '𝒥';
console.log(exemplu.length); // lungimea textului este 2 în loc de 1 așteptat
console.log(exemplu.charCodeAt(0)); // 55349
console.log(exemplu.charCodeAt(1)); // 56485
```

Regăsirea folosind regex-urile nu se va putea face. Nici `charAt()` nu va funcționa corect iar `charCodeAt()` va aduce codul pentru fiecare code unit separat așa cum arată și exemplu.

- `String.fromCharCode()` este o metodă statică a obiectului String, care transformă secvențe de numere Unicode în caractere.
- `String.fromCodePoint()` este o metodă statică a obiectului String, care transformă un o secvență de caractere considerată a fi un cod al unui caracter (a fost adăugată în ECMAScript 6).
- `String.prototype.charAt()` este o metodă aplicabilă direct pe string, care returnează caracterul căutat la indexul specificat ca argument.
- `String.prototype.charCodeAt()` returnează un număr care reprezintă codul UTF-16 a caracterului de la indexul specificat.
- `String.prototype.concat()`
- `String.prototype.endsWith()`

#### `String.fromCharCode()`

Este o metodă care returnează un string, nu un obiect String. Parametrii sunt secvențe de numere care sunt valori Unicode.

Returnează un string:

```js
String.fromCharCode(65, 66, 67);  // "ABC"
```

#### `String.prototype.charAt()`

Este o metodă care o aplici direct pe string. Acceptă un parametru numeric, care este de fapt indexul la care se află caracterul ce urmează a fi returnat.

##### Reține:
- indexarea se face de la stânga la dreapta;
- indexul începe de la 0;
- indexul se termină cu `identificatorSir.length - 1`;
- dacă indexul este mai mare decât cel al șirului, va fi returnat un șir gol.

```js
var sir = "Acesta este un șir";

sir.charAt(2); // "e"
sir.charAt(100); // ""
```

#### String.prototype.charCodeAt()

```js
'ABC'.charCodeAt(0); // returnează 65
'ABC'.charCodeAt(5); // NaN
```

##### Reține:
- `charCodeAt()` returnează NaN dacă indexul specificat este mai mic de 0 sau este egal cu lungimea șirului.

#### String.prototype.concat()

Combină textul din două sau mai multe stringuri și returnează un string nou.

```js
var nucleu = "Salutare, ";
console.log(nucleu.concat('prietene,', ' ce mai faci?')); // Salutare, prietene, ce mai faci?
```

Același efect poate fi obținut cu următoarea secvență de cod, care de această dată construiește o funcție concat și care operează asupra array-like-ului `arguments`:

```js
function concat () {
  return Array.prototype.slice.call(arguments).join(' ');
}
var sirNou = concat('ceva', 'text', 'pentru', 'a', 'fi', 'unit')
console.log(sirNou); // ceva text pentru a fi unit
```

Folosirea `rest parameters`, adică o sintaxă ce permite extragerea unui Array din argumentele pasate unei funcții. Această sintaxă constă din adăugarea unui nume de parametru prefixat de trei puncte de suspensie. Această sintaxă generează un Array adevărat, nu un array-like așa cum este `arguments`.

```js
function concat (...argumentePasate){
  return argumentePasate.join(' ');
};
var reunite = concat("Aceste", "cuvinte", "vor", "fi", "un", "șir!");
console.log(reunite); // Aceste cuvinte vor fi un șir!
```
Ce se întâmplă:
- parametrul rest obține `arguments`, care este pasat la apelarea funcției
- de fiecare dată când un parametru este adăugat la stânga, este ca și cum s-ar face `argumentePasate.shift()`

#### `String.prototype.startsWith()`

Stabilește dacă un șir de caractere începe cu un anumit subșir specificat. Dacă da este returnat `true`, dacă nu `false`.
Poate primi si numărul de caractere de la care să stabilească o nouă falsă dimensiune a șirului pe care să facă căutarea.

```js
var continut = "Acesta este o mostră de test";
console.log(continut.startsWith("Acesta")); // true
console.log(continut.startsWith("este", 7)); // true
```

#### `String.prototype.endsWith()`

Stabilește dacă un șir de caractere se încheie cu un alt șir specificat. Dacă da este returnat `true`, dacă nu `false`.
Poate primi și un număr de caractere care definește o falsă nouă dimensiune a șirului pe care să se facă căutarea.

```js
var continut = "Acesta este o mostră de test";
console.log(continut.endsWith("test")); // true
console.log(continut.endsWith("este", 11)); // true
```

#### `String.prototype.includes()`

Este o metodă introdusă recent. Înainte de aceasta era folosită `String.prototype.indexOf()`.

Determină dacă un șir căutat se află într-un altul. Dacă nu găsește șirul este returnat `false`.
Poate primi un număr de caractere care indică de unde se va începe căutarea.

```js
var continut = "Acesta este o mostră de test";
console.log(continut.includes("test")); // true
console.log(continut.includes("este", 7)); // true
```

#### `String.prototype.repeat()`

Construiește și returnează un string nou făcut din concatenarea a câte ori a fost specificat prin parametru

```js
'abc'.repeat(-1);   // RangeError
'abc'.repeat(0);    // ''
'abc'.repeat(1);    // 'abc'
'abc'.repeat(2);    // 'abcabc'
'abc'.repeat(3.5);  // 'abcabcabc' (se va converti la integer)
'abc'.repeat(1/0);  // RangeError
```

#### `String.prototype.split()`

Metoda pur și simplu sparge șirul construind un array cu fragemntele șirului. Poate accepta doi parametri: un separator și o limită.
Separatorul este un caracter sau o **expresie regulată**.

Dacă este omis separatorul, arrayul returnat va conține un singur element care va fi întregul șir.
Dacă separatorul este un șir vid, atunci șirul este convertit la un array de caractere.
Dacă separatorul este o expresie regulată care conține paranteze de captură, atunci de fiecare dată când când se face identificare, rezultatele (chiar și undefined) sunt introduce prin slicing în arrayul rezultat.

Setarea limitei este opțională. Este un număr întreg, care indică de câte ori va fi spart șirul.

```js
var arr = "unu,doi,trei,patru,cinci".split(",");
console.log(arr); // Array [ "unu", "doi", "trei", "patru", "cinci" ]
```

ATENȚIE! Operațiunea inversă este `concat()`.

### Metode care folosesc regexuri

#### `String.prototype.match()`

Faci o căutare într-un string după un Regex. Regexurile sunt șabloane care spun ce trebuie găsit într-un șir de caractere.

```js
var continut = 'Acesta este un text demonstrativ versiunea 0.0.1';
var reg = /demonstrativ (versiunea \d+(\.\d*))/i;
var ceAgasit = continut.match(reg);

console.log(ceAgasit); // Array [ "demonstrativ versiunea 0.0", "versiunea 0.0", ".0" ]
```

A fost generat acest array pentru că regexul conține criterii de căutare grupate prin `()`.


#### `String.prototype.replace()`

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

#### `String.prototype.search()`

Face o căutare pe șir după un regex.
Atunci când reușește o identificare, funcția returnează indexul primei identificări. Dacă nu face nicio identificare, returnează -1.

Pentru a înțelege pe deplin acest mod de operare cu replace, trebuie stăpânită sintaxa în baza căreia se construiesc șabloane de căutare: regex-urile. Un punct de pornire este chiar documentul dedicat obiectului intern RegExp.
Un alt document important este cel dedicat (expresiilor regulate)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions] de la MDN.

### Construcție de elemente DOM

#### String.prototype.anchor()

Pasezi acestei funcții un string care va deveni numele atributului unui tag anchor în DOM.

```js
var continut = "Ceva";
document.body.innerHTML = continut.anchor('numele_meu');
```

Se va genera:

```html
<a name="numele_meu">Ceva</a>
```

#### `String.prototype.link()`

Se folosește pentru a creea un snippet pentru un hiperlink HTML. Stringul returnat poate fi adăugat obiectului prin intermediul document.write() sau element.innerHTML. Linkrurile create astfel se adaugă array-ului de linkuri document.links.

```js
var hotText = 'MDN';
var URL = 'https://developer.mozilla.org/';

console.log('Click to return to ' + hotText.link(URL));
```

## Fluxuri de lucru

### Rețetar

1. Aflarea dimensiunii în caractere a stringului:

`'string'.length;` sau
`'string'.lastIndexOf('');` sau
`'string'.indexOf('', 9999);` pentru care știi că al doilea parametru depășește cu mult lungimea șirului.

efectul este același: este returnat 6, adică numărul total de caractere din șir

2. Lucrul cu indexul

  A. Care este prima apariție în șirul de caractere:

    a. **a unui caracter de la index 0**:

  `'fragmente'.indexOf('e'); // 5 este returnat indexul la care apare prima dată caracterul căutat`

    b. **a unui fragment de text de la index maxim**:

  `'fragmente de text'.indexOf('de t'); // 10`

  B. Care este ultima apariție în șirul de caractere:

    a. unui caracter sau fragment:

    `'fragmente'.lastIndexOf('nt'); // 6`

## Resurse

[Mozilla Developer Network - Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
