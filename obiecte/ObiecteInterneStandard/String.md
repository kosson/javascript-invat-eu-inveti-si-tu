# String - obiectul global

Stăpânirea consolidată prin practică a șirurilor de caractere va permite manipularea datelor de tip `.txt, .csv, .json, etc.`. Combinarea lucrului pe șiruri de caractere cu lucrul pe array-uri, va permite transformări dintr-un format în altul, de manipulare la transferomare, de îmbogățire și de segmentare a datelor.

Obiectul global String este un constructor de șiruri de caractere.

Stringurile pot fi create direct cu `String(ceva)`, în care `ceva` este orice ar putea fi convertit la string.

## Mantre

-  JavaScript convertește automat primitivele în obiecte String, fiind astfel posibilă folosirea metodelor obiectului String pentru primitivele string.

Începând cu ECMAScript 2015, stringurile literale pot fi numite și „Stringuri șablon” - Template strings. Un simplu exemplu:

```js
var a = 5;
var b = 10;

console.log("Cinsprezece este suma " + (a + b) + " și\nnu " + (2 * a + b) + ".");
// este echivalent cu:
console.log(`Cinsprezece este suma ${a + b} și\nnu ${2 * a + b}.`);
```
O formă și mai avansată de template-uri literale este cea numită `tagged template literals`. Un simplu exemplu:

```js
var a = 5;
var b = 10;

function tag(strings, ...values) {
  console.log(strings[0]); // "Hello "
  console.log(strings[1]); // " world "
  console.log(strings[2]); // ""
  console.log(values[0]);  // 15
  console.log(values[1]);  // 50

  return "Bazinga!";
}

tag`Hello ${ a + b } world ${ a * b }`;
// "Bazinga!"
```

Mai multe detalii la: [Mozilla Developer Network - Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

## Proprietăți

String.length și String.prototype

## Metode statice

String.fromCharCode() și String.fromCodePoint()

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

#### String.prototype.indexOf()

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
'Rosinante era o mîrțoagă, dar și ce emitea un transponder'.indexOf('era o ') !== -1; // true
```

##### Reține:
`indexOf()` este case sensitive!: `'Ceva Mare'.indexOf('mare'); // -1`


#### String.prototype.lastIndexOf()

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

### Lucrul direct pe caractere și fragmente

- String.fromCharCode() este o metodă statică a obiectului String, care transformă secvențe de numere Unicode în caractere.
- String.fromCodePoint() este o metodă statică a obiectului String, care transformă un o secvență de caractere considerată a fi un cod al unui caracter (a fost adăugată în ECMAScript 6).
- String.prototype.charAt() este o metodă aplicabilă direct pe string, care returnează caracterul căutat la indexul specificat ca argument.
- String.prototype.charCodeAt() returnează un număr care reprezintă codul UTF-16 a caracterului de la indexul specificat.
- String.prototype.concat()
- String.prototype.endsWith()

#### String.fromCharCode()

Este o metodă care returnează un string, nu un obiect String. Parametrii sunt secvențe de numere care sunt valori Unicode.

Returnează un string:

```js
String.fromCharCode(65, 66, 67);  // "ABC"
```

#### String.prototype.charAt()

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
- charCodeAt() returnează NaN dacă indexul specificat este mai mic de 0 sau este egal cu lungimea șirului.

#### String.prototype.concat()

Combină textul din două sau mai multe stringuri și returnează un string nou.

```js
var nucleu = "Salutare, ";
console.log(nucleu.concat('prietene,', ' ce mai faci?')); // Salutare, prietene, ce mai faci?
```

#### String.prototype.startsWith()

Stabilește dacă un șir de caractere începe cu un anumit șir specificat.
Poate primi si numărul de caractere de la care să stabilească o nouă falsă dimensiune a șirului pe care să facă căutarea.

```js
var continut = "Acesta este o mostră de test";
console.log(continut.startsWith("Acesta")); // true
console.log(continut.startsWith("este", 7)); // true
```

#### String.prototype.endsWith()

Stabilește dacă un șir de caractere se încheie cu un alt șir specificat.
Poate primi și un număr de caractere care definește o falsă nouă dimensiune a șirului pe care să se facă căutarea.

```js
var continut = "Acesta este o mostră de test";
console.log(continut.endsWith("test")); // true
console.log(continut.endsWith("este", 11)); // true
```

#### String.prototype.includes()

Determină dacă un șir căutat se află într-un altul.
Poate primi un număr de caractere care indică de unde se va incepe căutarea.

```js
var continut = "Acesta este o mostră de test";
console.log(continut.includes("test")); // true
console.log(continut.includes("este", 7)); // true
```

#### String.prototype.match()

Faci o căutare într-un string după un Regex

```js
var continut = 'For more information, see Chapter 3.4.5.1';
var reg = /see (chapter \d+(\.\d)*)/i;
var ceagasit = continut.match(reg);

console.log(ceagasit);
```

#### String.prototype.repeat()

Construiește și returnează un string nou făcut din concatenarea a câte ori a fost specificat prin parametru

```js
'abc'.repeat(-1);   // RangeError
'abc'.repeat(0);    // ''
'abc'.repeat(1);    // 'abc'
'abc'.repeat(2);    // 'abcabc'
'abc'.repeat(3.5);  // 'abcabcabc' (se va converti la integer)
'abc'.repeat(1/0);  // RangeError
```

#### String.prototype.replace()

Metoda returnează un nou șir care a incorporat modificări a unor părți care s-au potrivit criteriilor de căutare sub forma unui alt string sau al unui `RegExp` și care sunt înlocuite de un alt șir sau de rezultatul execuției unei funcții.

Pe scurt, ai un șir, faci o căutare după un alt șir sau RegExp și înlocuiești ceea ce ai găsit cu un alt șir sau rezultatul unei funcții.

```js
var continut = "Eu am fost trimis în lume";
var deinlocuit = "parasutat";

var noulcontinut = continut.replace("trimis", deinlocuit);
console.log(noulcontinut); // Eu am fost parasutat în lume
```

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

#### String.prototype.link()

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
