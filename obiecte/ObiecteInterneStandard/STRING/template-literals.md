# Template Literals - Stringuri șablon - string patterns

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
var a = 0.5;
var b = 10;

var stranse = `Adunarea este: ${ (a+b).toFixed(2) },înmulțirea este: ${ a*b }`;
console.log(stranse);
```

Se pot inculca template-urile precum în următorul exemplu:

```javascript
var oParte = 'o parte de text';
var altaParte = `Ce voi face este ${ `să unesc ${oParte}` }`;
console.log(altaParte); // Ce voi face este să unesc o parte de text
```

### Template tag

```javascript
var ceva = etichetare`Un text`;
```

`etichetare` este o funcție care este apelată cu datele template-ului literal care este procesat. Funcția primește datele din template ca bucăți individuale și trebuie să le combine pentru a creea rezultatul. Primul argument este chiar un array iar cel de-al doilea este un `rest arguments`.

```javascript

let atribut = 'foarte bun',
    procent = '100',
    ceva = eticheta`Un text ${atribut} cu ${procent}% suspans pentru ${(procent*0.23).toFixed(4)} emoții.`;

function eticheta(corp, ...inputuri){
  console.log(corp, inputuri);
};

//Array [ "Un text ", " cu ", "% suspans pentru ", " emoții." ] Array [ "foarte bun", "100", "23.0000" ]
```

Funcția `etichetare` primește următoarele argumente:
- un array identificat prin `corp` care conține următoarele:
  - șirul de caractere de dinaintea primei înlocuiri (în cazul în care se ăncepe cu o înlocuire acesta este un șir gol `""`),
  - șirul de caractere de după prima înlocuire,
  - și în continuare șirurile de după fiecare înlocuire dacă ar mai fi.
- și un array `inputuri`, care conține valorile care vor fi evaluate pentru a fi inserate în șablon
  - primul element este `foarte bun`,
  - al doilea este `100`
  - iar al treilea este valoarea evaluată pentru `(procent*0.23).toFixed(4)`, care este 23.0000

Avantajul folosirii acestor șabloane interactive este că permit recombinarea rapidă a șirurilor în interiorul funcției cu rol de etichetă pentru șablon. În interiorul funcției, având acces la toate părțile componente ale șirului, acestea pot fi recombinate după nevoie.

Trebuie reținut faptul că în funcția etichetă, intră valorile evaluate deja ale expresiilor din șablon.
